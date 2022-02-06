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
    public Tweet? BaseTweet { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<string>? Hashtags { get; set; }
    public OutUser? Sender { get; set; }

    public static OutTweet MapToOutTweet(Tweet tweet)
    {
        return new OutTweet
        {
            TweetId = tweet.TweetId,
            Title = tweet.Title,
            Content = tweet.Content,
            BaseTweet = tweet.BaseTweet,
            CreatedAt = tweet.CreatedAt,
            Hashtags = tweet.Hashtags,
            Images = tweet.Images,
            LikesCount = tweet.LikesCount,
            ReTweetType = tweet.ReTweetType,
            Sender = OutUser.MapToOutUser(tweet.Sender),
            Video = tweet.Video,
        };
    }
}
