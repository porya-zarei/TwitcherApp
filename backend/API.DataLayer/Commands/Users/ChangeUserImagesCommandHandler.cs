namespace API.DataLayer.Commands.Users;

public class ChangeUserImagesCommand:IRequest<APIResult<UserImagesChangedResult>>
{
    public UserImagesChanged? UserImagesChanged { get; set; }
}

public class ChangeUserImagesCommandHandler:IRequestHandler<ChangeUserImagesCommand,APIResult<UserImagesChangedResult?>>
{
    private readonly UnitOfWork _unitOfWork;
    private readonly IHubContext<UsersHub> _usersHub;
    private readonly IHostingEnvironment _env;
    public ChangeUserImagesCommandHandler(MainContext context,IHubContext<UsersHub> hub,IHostingEnvironment environment)
    {
        _unitOfWork = new UnitOfWork(context);
        _usersHub = hub;
        _env = environment;
    }
    public async Task<APIResult<UserImagesChangedResult?>> Handle(ChangeUserImagesCommand request, CancellationToken cancellationToken)
    {
        try
        {
            if (request.UserImagesChanged != null && request.UserImagesChanged.UserName != null)
            {
                var user = await _unitOfWork.usersRepository.GetUserWithUserName(request.UserImagesChanged.UserName);
                if (user != null)
                {
                    var changesResult = new UserImagesChangedResult() { };

                    if (request.UserImagesChanged.ProfileImage != null)
                    {
                        var profileImageName = await Uploader.UploadImage(request.UserImagesChanged.ProfileImage, _env.WebRootPath);
                        if (profileImageName != null)
                        {
                            user.ProfileImage = profileImageName;
                            changesResult.ProfileImages = profileImageName;
                        }
                    }
                    if(request.UserImagesChanged.BackgroundImage != null)
                    {
                        var backgroundImageName = await Uploader.UploadImage(request.UserImagesChanged.BackgroundImage,_env.WebRootPath);
                        if (backgroundImageName != null)
                        {
                            user.BackgroundImage = backgroundImageName;
                            changesResult.BackgroundImage = backgroundImageName;
                        }
                    }
                    await _unitOfWork.usersRepository.SaveAsync();
                    return new APIResult<UserImagesChangedResult?>
                    {
                        Result = changesResult,
                        Message = "Updated Successfully"
                    };
                }
            }
            return new APIResult<UserImagesChangedResult?> { Message = "please send valid images and information" };
        }
        catch (Exception error)
        {
            return new APIResult<UserImagesChangedResult?> { Message = error.Message };
        }
    }
}
