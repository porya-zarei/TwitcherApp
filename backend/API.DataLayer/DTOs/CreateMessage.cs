namespace API.DataLayer.DTOs;

public class CreateMessage
{
    public string Content { get; set; } = "";

    public IFormFile? Image { get; set; }
    public IFormFile? File { get; set; }
    public IFormFile? Voice { get; set; }
    public IFormFile? Video { get; set; }

    public MessageStatus MessageStatus { get; set; } = MessageStatus.NotSended;

    public Guid ChatId { get; set; }

    public string SenderUserName { get; set; } = "";

    public Message MapToMessage(User sender,Chat chat,string image,string file,string video,string voice)
    {
        return new Message
        {
            MessageId = Guid.NewGuid(),
            Content = Content,
            SendedAt = DateTime.UtcNow,
            Image = image,
            File = file,
            Voice = voice,
            Video = video,
            ChatId = chat.ChatId,
            Chat = chat,
            FileSize = File?.Length??0,
            ImageSize = Image?.Length??0,
            Sender = sender,
            SenderId = sender.UserId,
            VideoSize = Video?.Length??0,
            VoiceSize = Voice?.Length??0,
        };
    }
}
