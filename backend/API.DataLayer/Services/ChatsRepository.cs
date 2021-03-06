namespace API.DataLayer.Services;

public class ChatsRepository : Repository<Chat>, IChatsRepository
{
    public ChatsRepository(MainContext context) : base(context)
    {
    }

    public async Task<Chat?> GetFullChat(Guid chatId,bool? tracking = false)
    {
        var query = _set
            .Include(c => c.Messages)
            .Include(c => c.Users)
            .Include(c => c.Admins)
            .Include(c => c.Creator)
            .AsSplitQuery();
        if (tracking != null && (bool)!tracking)
            query.AsNoTracking();
        var chat = await query
            .FirstOrDefaultAsync(c => c.ChatId == chatId);
        return chat;
    }

    public async Task<List<OutChat>> GetUserChats(string userName)
    {
        var chats = await _set
            .Include(c => c.Messages)
            .Include(c => c.Users)
            .Include(c => c.Admins)
            .Include( c => c.Creator)
            .AsSplitQuery()
            .Where(c => c.Users.Select(u => u.UserName).Contains(userName))
            .Select(c => OutChat.MapToOutChat(c))
            .AsNoTracking()
            .ToListAsync();
        return chats ?? new List<OutChat>();
    }
}
