namespace API.DataLayer.Services;

public class TweetsRepository:Repository<Tweet>,ITweetsRepository
{
    public TweetsRepository(MainContext context):base(context)
    {

    }

    public List<OutTweet>? GetUserFeedTweets(User user)
    {
        var res = _set.Select(x => OutTweet.MapToOutTweet(x)).ToList();
        return res;
    }
}
