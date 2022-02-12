namespace API.DataLayer.Hubs.Users;

public class UsersHub:Hub
{
    private readonly IUsersRepository _usersRepository;

    public UsersHub(MainContext context)
    {
            _usersRepository = new UsersRepository(context);
    }
    public override Task OnConnectedAsync()
    {
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        return base.OnDisconnectedAsync(exception);
    }

    public async Task NotifyUser(string senderUserName, string receiverUserName)
    {
        var receiver = await _usersRepository.GetUserWithUserName(receiverUserName);
        var sender = await _usersRepository.GetUserWithUserName(senderUserName);
        if (sender != null && receiver != null)
        {
            string notification = $"user {sender.FirstName} {sender.LastName} : see my messages !";
            await Clients.Client(receiver.ConnectionId).SendAsync("GetNotification", notification);
        }
    }

    public async Task<string> ChackConnection(string userName, string connectionId)
    {
        var user = await _usersRepository.GetUserWithUserName(userName);

        if (user != null && user.ConnectionId != connectionId)
        {
            user.ConnectionId = connectionId;
            await _usersRepository.SaveAsync();
        }
        return connectionId;
    }

    public async Task SendCheckUserStatus(string userName, string connectionId)
    {
        var user = await _usersRepository.GetUserWithUserName(userName);
        await Clients.Client(user?.ConnectionId??"").SendAsync("CheckThisUserStatus", connectionId);
    }

    public async Task GetCheckUserStatus(string connectionId)
    {
        await Clients.Client(connectionId).SendAsync("GetUserStatus", true);
    }

}
