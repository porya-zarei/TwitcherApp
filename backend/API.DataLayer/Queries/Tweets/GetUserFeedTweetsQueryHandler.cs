namespace API.DataLayer.Queries.Tweets;
public class GetUserFeedTweetsQuery : IRequest<APIResult<List<OutTweet>?>>
{
    public string UserName { get; set; } = string.Empty;
}

public class GetUserFeedTweetsQueryHandler : IRequestHandler<GetUserFeedTweetsQuery, APIResult<List<OutTweet>?>>
{
    private readonly IUsersRepository _usersRepository;
    private readonly ITweetsRepository _tweetsRepository;

    public GetUserFeedTweetsQueryHandler(MainContext context)
    {
        _tweetsRepository = new TweetsRepository(context);
        _usersRepository = new UsersRepository(context);  
    }
    public async Task<APIResult<List<OutTweet>?>> Handle(GetUserFeedTweetsQuery request, CancellationToken cancellationToken)
    {
        APIResult<List<OutTweet>?> result;
        try
        {
            var user = await _usersRepository.GetUserWithUserName(request.UserName);
            if (user != null)
            {
                var res = _tweetsRepository.GetUserFeedTweets(user);
                result = new()
                {
                    Result = res,
                    Status = 200
                };
                return result;
            }
            result = new()
            {
                Message = "please use valid username",
                Ok = false,
                Result = null,
                Status = 400
            };
            return result;
        }
        catch (Exception error)
        {

            result = new()
            {
                Errors = error.Data.Values.Cast<string>().ToList(),
                Message = error.Message,
                Ok = false,
            };
            return result;
        }
        
    }
}
