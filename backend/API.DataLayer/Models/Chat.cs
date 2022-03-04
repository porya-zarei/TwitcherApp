namespace API.DataLayer.Models;

public class Chat
{
    [Key]
    public Guid ChatID { get; set; }

    [Required]
    public Guid SenderId { get; set; }

    public User? Sender { get; set; }

    [Required]
    public Guid ReceiverId { get; set; }

    public User? Receiver { get; set; }

    [Required]
    public DateTime CreateDate { get; set; }

    public ICollection<Message> Messages { get; set; } = new List<Message>() { };
}
