namespace API.DataLayer.Interfaces;

public interface ITweetsRepository : IRepository<Tweet>
{
    List<OutTweet>? GetUserFeedTweets(User user);
}
