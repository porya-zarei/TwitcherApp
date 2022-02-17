namespace API.DataLayer.Hubs.Users;

public class UsersHub:Hub
{
    private readonly UnitOfWork _unitOfWork;

    public UsersHub(MainContext context)
    {
            _unitOfWork = new UnitOfWork(context);
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
        var receiver = await _unitOfWork.usersRepository.GetUserWithUserName(receiverUserName);
        var sender = await _unitOfWork.usersRepository.GetUserWithUserName(senderUserName);
        if (sender != null && receiver != null)
        {
            string notification = $"user {sender.FirstName} {sender.LastName} : see my messages !";
            await Clients.Client(receiver.ConnectionId).SendAsync("GetNotification", notification);
        }
    }

    public async Task<string> ChackConnection(string userName, string connectionId)
    {
        var user = await _unitOfWork.usersRepository.GetUserWithUserName(userName);

        if (user != null && user.ConnectionId != connectionId)
        {
            user.ConnectionId = connectionId;
            await _unitOfWork.usersRepository.SaveAsync();
        }
        return connectionId;
    }

    public async Task SendCheckUserStatus(string userName, string connectionId)
    {
        var user = await _unitOfWork.usersRepository.GetUserWithUserName(userName);
        await Clients.Client(user?.ConnectionId??"").SendAsync("CheckThisUserStatus", connectionId);
    }

    public async Task GetCheckUserStatus(string connectionId)
    {
        await Clients.Client(connectionId).SendAsync("GetUserStatus", true);
    }

    #region ---- users profile events ----
    public async Task<bool> ChangeUserProfileFullName(string userName,string firstName,string lastName)
    {
        var user = await _unitOfWork.usersRepository.GetUserWithUserName(userName);
        if (user!=null && firstName != user.FirstName && lastName != user.LastName)
        {
            user.FirstName = firstName;
            user.LastName = lastName;
            await _unitOfWork.usersRepository.SaveAsync();
            return true;
        }
        return false;
    }

    public async Task<bool> ChangeUserProfileEmail(string userName, string email)
    {
        var user = await _unitOfWork.usersRepository.GetUserWithUserName(userName);
        if (user != null && email != user.Email)
        {
            user.Email = email;
            await _unitOfWork.usersRepository.SaveAsync();
            return true;
        }
        return false;
    }

    public async Task<bool> ChangeUserProfilePhoneNumber(string userName, string phoneNumber)
    {
        var user = await _unitOfWork.usersRepository.GetUserWithUserName(userName);
        if (user != null && phoneNumber != user.PhoneNumber)
        {
            user.PhoneNumber = phoneNumber;
            await _unitOfWork.usersRepository.SaveAsync();
            return true;
        }
        return false;
    }

    public async Task<bool> ChangeUserProfileBirthDay(string userName, string birthDay)
    {
        var user = await _unitOfWork.usersRepository.GetUserWithUserName(userName);
        if (user != null && birthDay != user.BirthDay.ToString())
        {
            user.BirthDay = DateOnly.Parse(birthDay);
            await _unitOfWork.usersRepository.SaveAsync();
            return true;
        }
        return false;
    }

    public async Task<bool> ChangeUserProfileBio(string userName, string bio)
    {
        var user = await _unitOfWork.usersRepository.GetUserWithUserName(userName);
        if (user != null && bio != user.Bio)
        {
            user.Bio = bio;
            await _unitOfWork.usersRepository.SaveAsync();
            return true;
        }
        return false;
    }

    public async Task<bool> ChangeUserProfileStatus(string userName, UserStatus status)
    {
        var user = await _unitOfWork.usersRepository.GetUserWithUserName(userName);
        if (user != null && status != user.Status)
        {
            user.Status = status;
            user.StatusText = status.ToString();
            await _unitOfWork.usersRepository.SaveAsync();
            return true;
        }
        return false;
    }

    public async Task<bool> ChangeUserUserName(string userName, string newUserName)
    {
        var user = await _unitOfWork.usersRepository.GetUserWithUserName(userName);
        var isUnique = await _unitOfWork.usersRepository.IsUserNameUnique(newUserName);
        if (user != null && newUserName != user.UserName && isUnique)
        {
            user.UserName = newUserName;
            await _unitOfWork.usersRepository.SaveAsync();
            return true;
        }
        return false;
    }

    public async Task<bool> IsUserNameUnique(string userName)
    {
        var isUnique = await _unitOfWork.usersRepository.IsUserNameUnique(userName);
        return isUnique;
    }

    #endregion
}
