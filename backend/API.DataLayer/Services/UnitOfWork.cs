namespace API.DataLayer.Services;

public class UnitOfWork
{
    public readonly IUsersRepository usersRepository;
    public readonly ITweetsRepository tweetsRepository;
    public readonly IChatsRepository chatsRepository;
    public readonly IMessagesRepository messagesRepository;
    public UnitOfWork(MainContext context)
    {
        usersRepository = new UsersRepository(context);
        tweetsRepository = new TweetsRepository(context);
        chatsRepository = new ChatsRepository(context);
        messagesRepository = new MessagesRepository(context);
    }
}
