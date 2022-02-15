namespace API.DataLayer.Interfaces;

public interface ITweetsRepository : IRepository<Tweet>
{
    Task<bool> AddReplyToTweet(Guid baseTweetId, Tweet reply);
    Task<bool> AddReplyToTweet(Tweet baseTweet, Tweet reply);
    Task<FullOutTweet?> GetFullOutTweet(Guid tweetId);
    List<OutTweet>? GetUserFeedTweets(User user);
    Task<List<OutTweet>?> GetUserFeedTweets(User user, int itemsPerPage, int pageNumber = 0);
    Task<Tuple<long,bool>> LikeUnlike(Guid tweetId, User? user, bool isLike);
}
