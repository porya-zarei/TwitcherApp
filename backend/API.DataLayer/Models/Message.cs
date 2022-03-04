namespace API.DataLayer.Models;

public class Message
{
    [Key]
    public Guid MessageId { get; set; }

    [Required]
    public string Text { get; set; } = "";

    public string Image { get; set; } = "";
    public string File { get; set; } = "";
    public string Voice { get; set; } = "";
    public string Video { get; set; } = "";
    public long FileSize { get; set; } = 0;
    public long ImageSize { get; set; } = 0;
    public long VoiceSize { get; set; } = 0;
    public long VideoSize { get; set; } = 0;

    public ChatStatus ChatStatus { get; set; } = ChatStatus.NotSended;

    public Guid ChatId { get; set; }
    public Chat? Chat { get; set; }

    [Required]
    public DateTime SendingTime { get; set; }
}

public enum ChatStatus
{
    NotSended = 0,
    SendedNotSeened = 1,
    sendedAndSeened = 2
}