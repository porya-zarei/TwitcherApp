namespace API.DataLayer.DTOs;

public class OutChat
{
    public Guid ChatId { get; set; }

    public string Title { get; set; } = "";

    public string Description { get; set; } = "";

    public string ChatLink { get; set; } = "";

    public DateTime CreatedAt { get; set; }

    public bool IsOpen { get; set; } = false;

    public List<OutMessage> Messages { get; set; } = new List<OutMessage>() { };
    public List<OutUser> Users { get; set; } = new List<OutUser>() { };

    public List<OutUser> Admins { get; set; } = new List<OutUser>() { };

    public ChatTypes Type { get; set; } = ChatTypes.Pv;

    public OutUser? Creator { get; set; }

    public static OutChat MapToOutChat(Chat? chat)
    {
        return chat != null ? new OutChat
        {
            ChatId = chat.ChatId,
            Title = chat.Title,
            Description = chat.Description,
            ChatLink = chat.ChatLink,
            CreatedAt = chat.CreatedAt,
            Admins = chat.Admins.Select(u => OutUser.MapToOutUser(u)?? new OutUser()).ToList(),
            Creator = OutUser.MapToOutUser(chat.Creator),
            IsOpen = chat.IsOpen,
            Messages = chat.Messages.Select(m => OutMessage.MapToOutMessage(m)).ToList(),
            Type = chat.Type,
            Users = chat.Users.Select(u => OutUser.MapToOutUser(u) ?? new OutUser()).ToList(),

        } : new OutChat { };
    }
}
