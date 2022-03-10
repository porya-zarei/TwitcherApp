namespace API.DataLayer.Services;

public class MessagesRepository : Repository<Message>, IMessagesRepository
{
    public MessagesRepository(MainContext context) : base(context)
    {
    }
}
