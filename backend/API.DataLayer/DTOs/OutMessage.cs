namespace API.DataLayer.DTOs;

public class OutMessage
{
    public Guid MessageId { get; set; }

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

    public Guid? ChatId { get; set; }

    public OutUser? Sender { get; set; }

    public DateTime SendedAt { get; set; }

    public static OutMessage MapToOutMessage(Message message)
    {
        return new OutMessage
        {
            MessageId = message.MessageId,
            MessageStatus = message.MessageStatus,
            Content = message.Content,
            File = message.File,
            Voice = message.Voice,
            Video = message.Video,
            VideoSize = message.VideoSize,
            VoiceSize = message.VoiceSize,
            Image = message.Image,
            ImageSize = message.ImageSize,
            FileSize = message.FileSize,
            SendedAt = message.SendedAt,
            Sender = OutUser.MapToOutUser(message.Sender),
            ChatId = message.Chat?.ChatId
        };
    }
}
