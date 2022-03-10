namespace API.DataLayer.DTOs;

public class CreateChat
{
    public string[] UserNames { get; set; } = Array.Empty<string>();

    public string Title { get; set; } = "";
    public string Description { get; set; } = "";

    public string ChatLink { get; set; } = "";

    public ChatTypes ChatType { get; set; } = ChatTypes.Pv;

    public bool IsOpen { get; set; } = false;

    public string CreatorUserName { get; set; } = "";

    public Chat MapToChat(User creator,List<User> users)
    {
        var usersToAdd = new List<User>() { creator };
        var admins  = new List<User>() { creator };
        if(ChatType == ChatTypes.Pv) admins.Add(users[0]);
        usersToAdd.AddRange(users);
        return new Chat
        {
             ChatId = Guid.NewGuid(),
             Title = Title,
             Description = Description,
             CreatedAt = DateTime.UtcNow,
             ChatLink = ChatLink,
             Type = ChatTypes.Pv,
             Users = usersToAdd,
             Admins = admins,
             Creator = creator,
             CreatorId = creator.UserId,
             Messages = new List<Message>() { },
             IsOpen = IsOpen
        };
    }

}
