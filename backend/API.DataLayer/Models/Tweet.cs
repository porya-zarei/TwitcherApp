namespace API.DataLayer.Models;

public class Tweet
{
    [Key]
    public Guid TweetId { get; set; } = Guid.NewGuid();
    public TweetTypes ReTweetType { get; set; } = TweetTypes.Tweet;

    public bool IsDeleted { get; set; } = false;
    public string? Title { get; set; } = string.Empty;
    [Required]
    public string Content { get; set; } = string.Empty;

    public List<string>? Images { get; set; } = new List<string>();
    public string? Video {get;set;} = string.Empty;

    public long? LikesCount { get; set;} = 0;
    public Guid? BaseTweetId { get; set; }
    public Tweet? BaseTweet { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<string>? Hashtags { get; set; } = new List<string>();

    [Required]
    public Guid? SenderId { get; set; } = Guid.NewGuid();
    [JsonIgnore]
    public User? Sender { get; set; } = new ();
    [JsonIgnore]
    public ICollection<Tweet>? Replies { get; set; } =  new List<Tweet>();

    public bool IsNull() => string.IsNullOrEmpty(Content);

}

public enum TweetTypes
{
    Tweet=0,
    ReTweet,
    QouteTweet,
    Replay
}