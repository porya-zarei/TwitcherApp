namespace API.DataLayer.Commands.Chats;

public class CreateChatQuery : IRequest<APIResult<bool>>
{
    public CreateChat CreateChat { get; set; } = new CreateChat();
}

public class CreateChatCommandHandler : IRequestHandler<CreateChatQuery, APIResult<bool>>
{
    private readonly UnitOfWork _unitOfWork;
    private readonly IHubContext<UsersHub> _usersHub;

    public CreateChatCommandHandler(MainContext context, IHubContext<UsersHub> usersHub)
    {
        _unitOfWork = new UnitOfWork(context);
        _usersHub = usersHub;
    }

    public async Task<APIResult<bool>> Handle(CreateChatQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var creator = await _unitOfWork.usersRepository.GetUserWithUserName(request.CreateChat.CreatorUserName);
            
            if (creator != null)
            {
                var users = await _unitOfWork.usersRepository.GetUsersWithUserNames(request.CreateChat.UserNames);
                var chat = request.CreateChat.MapToChat(creator,users);
                var createdChat = await _unitOfWork.chatsRepository.AddEntryAsync(chat);
                var connections = createdChat.Users.Select(u => u.ConnectionId).ToList();
                await _usersHub.Clients.Clients(connections).SendAsync(UsersHubEvents.ChatCreated, createdChat,cancellationToken);
                return new APIResult<bool>
                {
                    Result = true,
                    Message = "Chat created successfully",
                    Status = 201
                };
            }
            return new APIResult<bool>
            {
                Result = false,
                Message = "Creator not found",
                Status = 404,
                Ok = false
            };
        }
        catch (Exception error)
        {
            return new APIResult<bool>
            {
                Result = true,
                Message = error.Message,
                Status = 400,
                Ok = false
            };
        }
    }
}
