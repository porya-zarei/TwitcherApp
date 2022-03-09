namespace API.DataLayer.Models;

public class Chat
{
    [Key]
    public Guid ChatId { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; }

    public ICollection<Message> Messages { get; set; } = new List<Message>() { };
    public ICollection<User> Users { get; set; } = new List<User>() { };
}
