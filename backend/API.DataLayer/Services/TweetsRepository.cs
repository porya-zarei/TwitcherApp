namespace API.DataLayer.Services;

public class TweetsRepository:Repository<Tweet>,ITweetsRepository
{
    public TweetsRepository(MainContext context):base(context)
    {

    }

    public List<OutTweet>? GetUserFeedTweets(User user)
    {
        var res = _set.Include(t => t.Sender).Select(x => OutTweet.MapToOutTweet(x)).ToList();
        return res;
    }
}
