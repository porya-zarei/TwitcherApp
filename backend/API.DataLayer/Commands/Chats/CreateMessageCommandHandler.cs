namespace API.DataLayer.Commands.Chats;

public class CreateMessageCommand:IRequest<APIResult<bool>>
{
    public CreateMessage CreateMessage { get; set; } = new CreateMessage();
}

public class CreateMessageCommandHandler : IRequestHandler<CreateMessageCommand, APIResult<bool>>
{
    private readonly UnitOfWork _unitOfWork;
    private readonly IHubContext<UsersHub> _usersHub;
    private readonly IHostingEnvironment _env;

    public CreateMessageCommandHandler(MainContext context, IHubContext<UsersHub> usersHub, IHostingEnvironment env)
    {
        _unitOfWork = new UnitOfWork(context);
        _usersHub = usersHub;
        _env = env;
    }

    public async Task<APIResult<bool>> Handle(CreateMessageCommand request, CancellationToken cancellationToken)
    {
        try
        {
            string fileName = "";
            string imageName = "";
            string videoName = "";
            string voiceName = "";
            var sender = await _unitOfWork.usersRepository.GetUserWithUserName(request.CreateMessage.SenderUserName);
            var chat = await _unitOfWork.chatsRepository.GetFullChat(request.CreateMessage.ChatId);
            if (sender is not null && chat is not null)
            {
                if (request.CreateMessage.Image is not null)
                    imageName = await Uploader.UploadImage(request.CreateMessage.Image, _env.WebRootPath)??"";
                if (request.CreateMessage.Video is not null)
                    videoName = await Uploader.UploadVideo(request.CreateMessage.Video, _env.WebRootPath)??"";
                if (request.CreateMessage.File is not null)
                    fileName = await Uploader.UploadFile(request.CreateMessage.File, _env.WebRootPath)??"";
                if (request.CreateMessage.Voice is not null)
                    voiceName = await Uploader.UploadVoice(request.CreateMessage.Voice, _env.WebRootPath)??"";
                
                var message = request.CreateMessage.MapToMessage(sender,chat, imageName, videoName, fileName, voiceName);
                var createdMessage = await _unitOfWork.messagesRepository.AddEntryAsync(message);
                var connections = chat.Users.Select(u => u.ConnectionId).ToList();
                await _usersHub.Clients.Clients(connections).SendAsync(UsersHubEvents.MessageArrived, createdMessage,cancellationToken);
                return new APIResult<bool>
                {
                    Result = true,
                    Message = "Message sended successfully",
                    Status = 201
                };
            }

            return new APIResult<bool>
            {
                Result = false,
                Ok = false,
                Message = "Please use valid data",
                Status = 404
            };
        }
        catch (Exception error)
        {
            return new APIResult<bool>
            {
                Result = false,
                Ok = false,
                Message = error.Message,
                Status = 400
            };
        }
    }
}
