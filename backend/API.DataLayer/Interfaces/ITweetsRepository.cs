namespace API.DataLayer.Interfaces;

public interface ITweetsRepository : IRepository<Tweet>
{
    List<OutTweet>? GetUserFeedTweets(User user);
    List<OutTweet>? GetUserFeedTweets(User user, int itemsPerPage, int pageNumber = 0);
}
