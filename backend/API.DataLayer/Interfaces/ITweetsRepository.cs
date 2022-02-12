namespace API.DataLayer.Interfaces;

public interface ITweetsRepository : IRepository<Tweet>
{
    Task<bool> AddReplyToTweet(Guid baseTweetId, Tweet reply);
    Task<bool> AddReplyToTweet(Tweet baseTweet, Tweet reply);
    List<OutTweet>? GetUserFeedTweets(User user);
    Task<List<OutTweet>?> GetUserFeedTweets(User user, int itemsPerPage, int pageNumber = 0);
}
