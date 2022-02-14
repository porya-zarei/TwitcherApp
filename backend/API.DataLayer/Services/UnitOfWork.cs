namespace API.DataLayer.Services;

public class UnitOfWork
{
    public readonly IUsersRepository usersRepository;
    public readonly ITweetsRepository tweetsRepository;
    public UnitOfWork(MainContext context)
    {
        usersRepository = new UsersRepository(context);
        tweetsRepository = new TweetsRepository(context);
    }
}
