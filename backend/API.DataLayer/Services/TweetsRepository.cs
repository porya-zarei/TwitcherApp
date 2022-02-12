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

    //public List<OutTweet>? GetUserFeedTweets(User user,int itemsPerPage,int pageNumber = 0)
    //{
    //    var res = _set.Where(t => t.Content != null && t.Content.Length > 0)
    //        .Include(t => t.Sender)
    //        .Include(t => t.BaseTweet)
    //        .Skip(pageNumber * itemsPerPage)
    //        .Take(itemsPerPage)
    //        .Select(t => OutTweet.MapToOutTweet(t))
    //        .OrderBy(t => t.CreatedAt.Second)
    //        .ToList();
    //    return res;
    //}

    public async Task<List<OutTweet>?> GetUserFeedTweets(User user, int itemsPerPage, int pageNumber = 0)
    {
        var res = await _set.Where(t => t.Content != null && t.Content.Length > 0)
            .Include(t => t.Sender)
            .Include(t => t.BaseTweet)
            .OrderByDescending(t => t.CreatedAt)
            .Skip(pageNumber * itemsPerPage)
            .Take(itemsPerPage)
            .Select(t => OutTweet.MapToOutTweet(t))
            .ToListAsync();
        return res;
    }

    public async Task<bool> AddReplyToTweet(Guid baseTweetId,Tweet reply)
    {

        var baseTweet = await _set.FindAsync(baseTweetId);
        if (baseTweet != null)
        {
            if (baseTweet.Replies != null)
            {
                baseTweet.Replies.Add(reply);
            }
            else
            {
                baseTweet.Replies = new List<Tweet>() { };
                baseTweet.Replies.Add(reply);
            }
            await SaveAsync();
            return true;
        }
        return false;
    }

    public async Task<bool> AddReplyToTweet(Tweet baseTweet, Tweet reply)
    {
        if (baseTweet != null && reply != null)
        {
            if (baseTweet.Replies != null)
            {
                baseTweet.Replies.Add(reply);
            }
            else
            {
                baseTweet.Replies = new List<Tweet>() { };
                baseTweet.Replies.Add(reply);
            }
            await SaveAsync();
            return true;
        }
        return false;
    }
}
