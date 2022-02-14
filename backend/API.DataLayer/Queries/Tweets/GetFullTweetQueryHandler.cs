namespace API.DataLayer.Queries.Tweets;

public class GetFullTweetQuery : IRequest<APIResult<FullOutTweet?>>
{
    public Guid? TweetId { get; set; }
}

public class GetFullTweetQueryHandler : IRequestHandler<GetFullTweetQuery, APIResult<FullOutTweet?>>
{
    private readonly UnitOfWork _unitOfWork;
    public GetFullTweetQueryHandler(MainContext context)
    {
        _unitOfWork = new UnitOfWork(context);
    }
    public async Task<APIResult<FullOutTweet?>> Handle(GetFullTweetQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _unitOfWork.tweetsRepository.GetFullOutTweet(request.TweetId??Guid.NewGuid());
            return new APIResult<FullOutTweet?>
            {
                Message = "Full Tweet",
                Result = res,
                Status = 200
            };
        }
        catch (Exception error)
        {
            return new APIResult<FullOutTweet?>
            {
                Errors = new List<string>(){ error?.InnerException?.Message ?? "" },
                Message = error?.Message ?? "",
                Status = 400,
                Ok = false
            };
        }
    }
}
