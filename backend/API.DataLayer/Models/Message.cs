namespace API.DataLayer.Models;

public class Message
{
    [Key]
    public Guid MessageId { get; set; }

    [Required]
    public string Content { get; set; } = "";

    public string Image { get; set; } = "";
    public string File { get; set; } = "";
    public string Voice { get; set; } = "";
    public string Video { get; set; } = "";
    public long FileSize { get; set; } = 0;
    public long ImageSize { get; set; } = 0;
    public long VoiceSize { get; set; } = 0;
    public long VideoSize { get; set; } = 0;

    public MessageStatus MessageStatus { get; set; } = MessageStatus.NotSended;

    public Guid ChatId { get; set; }
    public Chat? Chat { get; set; }

    public Guid SenderId { get; set; }
    public User? Sender { get; set; }

    [Required]
    public DateTime SendedAt { get; set; }
}

public enum MessageStatus
{
    NotSended = 0,
    SendedNotSeened = 1,
    SendedAndSeened = 2
}