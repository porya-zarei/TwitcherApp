namespace API.DataLayer.Interfaces;

public interface IChatsRepository : IRepository<Chat>
{
    Task<Chat?> GetFullChat(Guid chatId);
    Task<List<OutChat>> GetUserChats(string userName);
}
