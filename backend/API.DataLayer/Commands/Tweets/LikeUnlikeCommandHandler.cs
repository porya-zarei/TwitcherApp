namespace API.DataLayer.Commands.Tweets;

public class LikeUnlikeCommand : IRequest<APIResult<TweetLiked?>>
{
    public string UserName { get; set; } = "";
    public Guid TweetId { get; set; }
    public bool IsLiked { get; set; }
}

public class LikeUnlikeCommandHandler : IRequestHandler<LikeUnlikeCommand, APIResult<TweetLiked?>>
{
    private readonly UnitOfWork _unitOfWork;
    private readonly IHubContext<UsersHub> _usersHub;
    public LikeUnlikeCommandHandler(MainContext context,IHubContext<UsersHub> hubContext)
    {
        _unitOfWork = new UnitOfWork(context);
        _usersHub = hubContext;
    }
    public async Task<APIResult<TweetLiked?>> Handle(LikeUnlikeCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var user = await _unitOfWork.usersRepository.GetUserWithUserName(request.UserName);
            var (res,isLiked) = await _unitOfWork.tweetsRepository.LikeUnlike(request.TweetId, user, request.IsLiked);
            var result = new APIResult<TweetLiked?>
            {
                Result = TweetLiked.MapToTweetLiked(request.TweetId,res,isLiked),
                Message = isLiked? "Liked" : "Unliked",
                Status = 200
            };
            await _usersHub.Clients.All.SendAsync(UsersHubEvents.TweetLiked, result,cancellationToken);
            return result;

        }
        catch (Exception error)
        {
            return new APIResult<TweetLiked?>
            {
                Message = error.Message,
                Status = 200,
                Ok = false,
            };
        }
    }
}
