namespace API.DataLayer.Services;

public class TweetsRepository:Repository<Tweet>,ITweetsRepository
{
    public TweetsRepository(MainContext context):base(context)
    {

    }

    public List<OutTweet>? GetUserFeedTweets(User user)
    {
        var res = _set.Where(t => t.Content != null && t.Content.Length > 0)
            .Include(t => t.Sender)
            .Include(t => t.BaseTweet)
            .Where(t => t.BaseTweet != null && t.BaseTweet.Content.Length > 0)
            .Select(x => OutTweet.MapToOutTweet(x))
            .ToList();
        return res;
    }

    public List<OutTweet>? GetUserFeedTweets(User user,int itemsPerPage,int pageNumber = 0)
    {
        var res = _set.Where(t => t.Content != null && t.Content.Length > 0)
            .Include(t => t.Sender)
            .Include(t => t.BaseTweet)
            .Skip(pageNumber * itemsPerPage)
            .Take(itemsPerPage)
            .Select(x => OutTweet.MapToOutTweet(x))
            .ToList();
        return res;
    }
}
