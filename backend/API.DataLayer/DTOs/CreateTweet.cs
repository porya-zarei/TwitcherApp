namespace API.DataLayer.DTOs;

public class CreateTweet
{
    public TweetTypes ReTweetType { get; set; } = TweetTypes.Tweet;
    public string? Title { get; set; } = "";
    [Required]
    public string Content { get; set; } = "";

    public IFormFile[]? Images { get; set; }
    public IFormFile? Video { get; set; }
    public Guid? BaseTweetId { get; set; }

    public string? SenderUserName { get; set; }

    public Tweet MapToTweet(User sender,Tweet baseTweet,List<string> ImagesName,string VideoName,List<string> hashtags)
    {
        return new Tweet
        {
            TweetId = Guid.NewGuid(),
            Title = Title,
            Content = Content,
            Images = ImagesName,
            Video = VideoName,
            CreatedAt = DateTime.UtcNow,
            SenderId = sender.UserId,
            Sender = sender,
            BaseTweetId = BaseTweetId,
            BaseTweet = baseTweet,
            ReTweetType = ReTweetType,
            Hashtags = hashtags,
        };
    }
}
