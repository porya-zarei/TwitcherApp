namespace API.DataLayer.Queries.Chats;

public class GetChatsQuery : IRequest<APIResult<List<OutChat>>>
{
    public string UserName { get; set; } = "";
}

public class GetChatsQueryHandler : IRequestHandler<GetChatsQuery, APIResult<List<OutChat>>>
{

    private readonly UnitOfWork _unitOfWork;
    public GetChatsQueryHandler(MainContext context)
    {
        _unitOfWork = new UnitOfWork(context);
    }

    public async Task<APIResult<List<OutChat>>> Handle(GetChatsQuery request, CancellationToken cancellationToken)
    {
        try
        {   
            var chats = await _unitOfWork.chatsRepository.GetUserChats(request.UserName);
            return new APIResult<List<OutChat>>
            {
                Result = chats,
                Message = "User Chats",
                Status = 200
            };
        }
        catch (Exception error)
        {
            return new APIResult<List<OutChat>>
            {
                Result = new List<OutChat> { },
                Message = error.Message,
                Status = 400,
                Ok = false
            };
        }
    }
}
