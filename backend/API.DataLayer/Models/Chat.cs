namespace API.DataLayer.Models;

public class Chat
{
    [Key]
    public Guid ChatId { get; set; }

    public string Title { get; set; } = "";

    public string Description { get; set; } = "";

    public string ChatLink { get; set; } = "";

    [Required]
    public DateTime CreatedAt { get; set; }

    public bool IsOpen { get; set; } = false;

    public ICollection<Message> Messages { get; set; } = new List<Message>() { };
    public ICollection<User> Users { get; set; } = new List<User>() { };

    public ICollection<User> Admins { get; set; } = new List<User>() { };

    public ChatTypes Type { get; set; } = ChatTypes.Pv;

    public Guid CreatorId { get; set; }
    [Required]
    public User? Creator { get; set; }
}

public enum ChatTypes
{
    Pv,
    EncryptedPv,
    Group,
    Channel
}