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
            .Include(t => t.Likers)
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

    public async Task<FullOutTweet?> GetFullOutTweet(Guid tweetId)
    {
        var tweet = await _set
            .Include(t => t.Sender)
            .Include(t => t.Replies.Where(t => t.ReTweetType == TweetTypes.Reply))
            .Include(t => t.Likers)
            .Include(t => t.BaseTweet)
            .FirstOrDefaultAsync(t => t.TweetId == tweetId);
        if (tweet != null)
        {
            return FullOutTweet.MapToOutTweetWithReplies(tweet);
        }
        return null;
    }

    public async Task<Tuple<long, bool>> LikeUnlike(Guid tweetId,User? user,bool isLike)
    {
        var tweet = await _set.FindAsync(tweetId);
        if (tweet != null && user != null)
        {
            if (isLike && !tweet.Likers.Contains(user)) tweet.Likers.Add(user);
            else if(tweet.Likers.Contains(user)) tweet.Likers.Remove(user);

            await SaveAsync();

            return Tuple.Create((long)tweet.Likers.Count,isLike);
        }
        else
        {
            return Tuple.Create((long)0,!isLike);
        }
    }
}
