using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DataLayer.Commands.Tweets
{
    public class CreateRetweetCommand:IRequest<APIResult<OutTweet?>>
    {
        public Guid? TweetId { get; set; }
        public string userName { get; set; } = "";
    }
    public class CreateRetweetCommandHandler : IRequestHandler<CreateRetweetCommand, APIResult<OutTweet?>>
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IHubContext<UsersHub> _usersHub;
        public CreateRetweetCommandHandler(MainContext context, IHubContext<UsersHub> usersHub)
        {
            _unitOfWork = new UnitOfWork(context);
            _usersHub = usersHub;
        }
        public async Task<APIResult<OutTweet?>> Handle(CreateRetweetCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var baseTweet = _unitOfWork.tweetsRepository.GetEntry(request.TweetId ?? new Guid());
                var user = await _unitOfWork.usersRepository.GetUserWithUserName(request.userName);
                if (baseTweet != null && user != null)
                {
                    var newTweet = new Tweet
                    {
                        TweetId = Guid.NewGuid(),
                        BaseTweetId = baseTweet.TweetId,
                        BaseTweet = baseTweet,
                        Content = "nothing",
                        CreatedAt = DateTime.UtcNow,
                        Hashtags = { },
                        Images = { },
                        ReTweetType = TweetTypes.ReTweet,
                        SenderId = user.UserId,
                        Sender = user,
                        Title = "",
                        Replies = { },
                    };
                    var res = await _unitOfWork.tweetsRepository.AddEntryAsync(newTweet);
                    await _unitOfWork.tweetsRepository.AddReplyToTweet(baseTweet, res);
                    var result = new APIResult<OutTweet?>
                    {
                        Message = "Retweet successful",
                        Result = OutTweet.MapToOutTweet(res),
                        Ok = true,
                        Status = 201,
                    };
                    await _usersHub.Clients.All.SendAsync(UsersHubEvents.TweetCreated, result,cancellationToken);
                    return result;
                }
                return new APIResult<OutTweet?>
                {
                    Ok = false,
                    Status = 400,
                    Message = "tweetId is not valid"
                };
            }
            catch (Exception error)
            {
                return new APIResult<OutTweet?>
                {
                    Ok = false,
                    Status = 400,
                    Message = error.Message,
                };
            }
        }
    }
}
