namespace API.DataLayer.DTOs;

public class OutTweet
{
    public Guid TweetId { get; set; }
    public TweetTypes ReTweetType { get; set; } = TweetTypes.Tweet;
    public string? Title { get; set; }
    public string? Content { get; set; }
    public List<string>? Images { get; set; }
    public string? Video { get; set; }

    public long? LikesCount { get; set; } = 0;
    public DateTime CreatedAt { get; set; }
    public List<string>? Hashtags { get; set; }
    public OutUser? Sender { get; set; }

    public OutTweet? BaseTweet { get; set; }

    public static OutTweet MapToOutTweet(Tweet tweet)
    {
        var haveBaseTweet = tweet.BaseTweet != null && tweet.BaseTweet.Content != null && tweet.BaseTweet.Content.Length > 0;
        return new OutTweet
        {
            TweetId = tweet.TweetId,
            Title = tweet.Title,
            Content = tweet.Content,
            CreatedAt = tweet.CreatedAt,
            Hashtags = tweet.Hashtags,
            Images = tweet.Images,
            LikesCount = tweet.LikesCount,
            ReTweetType = tweet.ReTweetType,
            BaseTweet = haveBaseTweet ? MapToOutTweet(tweet.BaseTweet!) : null,
            Sender = OutUser.MapToOutUser(tweet.Sender),
            Video = tweet.Video,
        };
    }
}

public class FullOutTweet:OutTweet
{
    public List<OutTweet> Replies { get; set; } = new List<OutTweet>();

    public static FullOutTweet MapToOutTweetWithReplies(Tweet tweet)
    {
        var haveBaseTweet = tweet.BaseTweet != null && tweet.BaseTweet.Content != null && tweet.BaseTweet.Content.Length > 0;
        return new FullOutTweet
        {
            TweetId = tweet.TweetId,
            Title = tweet.Title,
            Content = tweet.Content,
            CreatedAt = tweet.CreatedAt,
            Hashtags = tweet.Hashtags,
            Images = tweet.Images,
            LikesCount = tweet.LikesCount,
            ReTweetType = tweet.ReTweetType,
            BaseTweet = haveBaseTweet ? MapToOutTweet(tweet.BaseTweet!) : null,
            Sender = OutUser.MapToOutUser(tweet.Sender),
            Video = tweet.Video,
            Replies = tweet.Replies != null ? tweet.Replies.Select( t => MapToOutTweet(t)).ToList() : new List<OutTweet>() { }
        };
    }
}