namespace API.DataLayer.Commands.Tweets;

public class CreateTweetCommand : IRequest<APIResult<OutTweet>>
{
    public CreateTweet CreateTweet { get; set; }
}

internal class CreateTweetCommandHandler : IRequestHandler<CreateTweetCommand, APIResult<OutTweet>?>
{
    private readonly ITweetsRepository _tweetsRepository;
    private readonly IUsersRepository _usersRepository;
    private readonly IHostingEnvironment _env;
    public CreateTweetCommandHandler(MainContext context,IHostingEnvironment env)
    {
        _tweetsRepository = new TweetsRepository(context);
        _usersRepository = new UsersRepository(context);
        _env = env;
    }
    public async Task<APIResult<OutTweet>?> Handle(CreateTweetCommand request, CancellationToken cancellationToken)
    {
        APIResult<OutTweet> result;
        try
        {
            var imagesName = new List<string>();
            var videoName = string.Empty;
            User sender = new();
            Tweet baseTweet = new();
            List<string> hashtags = new();
            if (request.CreateTweet.Images != null && request?.CreateTweet?.Images?.Count != 0)
            {
                var res = await Uploader.UploadImages(request?.CreateTweet.Images, _env.WebRootPath);
                if (res != null) imagesName.AddRange(res);
            }
            if (request?.CreateTweet.Video != null)
            {
                var res = await Uploader.UploadVideo(request?.CreateTweet?.Video, _env.WebRootPath);
                if (res != null) videoName = res;
            }
            if (request?.CreateTweet?.SenderUserName != null)
            {
                var res = await _usersRepository.GetUserWithUserName(request.CreateTweet.SenderUserName);
                if (res != null) sender = res;
            }
            if (request?.CreateTweet?.BaseTweetId != null)
            {
                var res = _tweetsRepository.GetEntry(request.CreateTweet.BaseTweetId ?? Guid.NewGuid());
                if (res != null) baseTweet = res;
            }
            if (request?.CreateTweet?.Content != null)
            {
                var res = TextHelpers.GetHashtags(request?.CreateTweet?.Content);
                if (res != null) hashtags = res;
            }

            var tweet = request?.CreateTweet.MapToTweet(sender, baseTweet, imagesName, videoName, hashtags);
            if (tweet != null)
            {
                var res = await _tweetsRepository.AddEntryAsync(tweet);
                if (res != null)
                {
                    var outTweet = OutTweet.MapToOutTweet(tweet);
                    result = new()
                    {
                        Result = outTweet,
                        Message = "Created Successfuly"
                    };
                    return result;
                }

            }
            result = new()
            {
                Message = "please send valid data",
                Ok = false,
                Status = 400
            };
            return result;
        }
        catch (Exception error)
        {
            result = new()
            {
                Message = error.Message,
                Ok = false,
                Status = 400,
                Result = null,
                Errors = error.Data.Values.Cast<string>().ToList()
            };
            return result;
        }
    }
}
