namespace API.DataLayer.Models;

public class ChatMessage:Message
{
    [Required]
    public Guid ChatId { get; set; }

    [Required]
    public Guid SenderId { get; set; }

    public User? Sender { get; set; }

    public Guid ReceiverId { get; set; }

    public User? Receiver { get; set; }
}


