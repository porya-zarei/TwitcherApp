namespace API.DataLayer.DTOs;

public class LikeTweet
{
    public Guid TweetId { get; set; }
    public bool IsLiked { get; set; } = true;
}

public class TweetLiked
{
    public Guid TweetId { get; set; }
    public long LikesCount { get; set; } = 0;

    public bool IsLiked { get; set; } = true;

    public static TweetLiked MapToTweetLiked(Guid tweetId,long likes,bool isLiked)
    {
        return new TweetLiked
        {
            TweetId = tweetId,
            LikesCount = likes,
            IsLiked = isLiked
        };
    }
}
