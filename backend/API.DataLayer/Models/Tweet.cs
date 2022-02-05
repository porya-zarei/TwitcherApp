namespace API.DataLayer.Models;

public class Tweet
{
    [Key]
    public Guid TweetId { get; set; }
    public TweetTypes ReTweetType { get; set; } = TweetTypes.Tweet;

    public bool IsDeleted { get; set; } = false;

    [Required]
    public string? Title { get; set; }
    [Required]
    public string? Content { get; set; }

    public List<string>? Images { get; set; }
    public string? Video {get;set;}

    public long? LikesCount { get; set;}
    public Guid? BaseTweetId { get; set; }
    public Tweet? BaseTweet { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<string>? Hashtags { get; set; }
    
    [Required]
    public Guid SenderId { get; set; }
    public User? Sender { get; set; }

    public ICollection<Tweet>? Replies { get; set; }

}

public enum TweetTypes
{
    Tweet=0,
    ReTweet,
    QouteTweet,
    Replay
}