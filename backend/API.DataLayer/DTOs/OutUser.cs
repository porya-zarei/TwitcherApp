namespace API.DataLayer.DTOs;

public record OutUser
{
    [Key]
    public Guid UserId { get; set; }
    public string? FirstName { get; set; } = "";
    public string? LastName { get; set; } = "";

    [Required]
    public string? UserName { get; set; } = "";

    [Required]
    [EmailAddress(ErrorMessage = "please insert valid email address")]
    public string? Email { get; set; } = "";

    public string ConnectionId { get; set; } = "";

    public DateOnly? BirthDay { get; set; }

    public string Bio { get; set; } = "";

    public string? ProfileImage { get; set; }

    public string? BackgroundImage { get; set; }

    public UserStatus? Status { get; set; } = UserStatus.Happy;
    public DateTime? JoinedAt { get; set; }
    public string? StatusText { get; set; } = UserStatus.Happy.ToString();

    public UserTypes UserType { get; set; } = UserTypes.Bronze;

    public int FollowingsCount { get; set; }
    public int FollowersCount { get; set; }
    public ICollection<Category>? InterestedCategories { get; set; } = new List<Category>();

    public static OutUser? MapToOutUser(User? user)
    {
        return user!=null? new OutUser
        {
            UserId = user.UserId,
            FirstName = user.FirstName,
            LastName = user.LastName,
            ConnectionId = user.ConnectionId,
            BackgroundImage = user.BackgroundImage,
            Status = user.Status,
            Bio = user.Bio,
            ProfileImage = user.ProfileImage,
            BirthDay = user.BirthDay,
            Email = user.Email,
            FollowersCount = user.Followers!.Count,
            FollowingsCount = user.Followings!.Count,
            InterestedCategories = user.InterestedCategories!.ToList(),
            JoinedAt = user.JoinedAt,
            StatusText = user.StatusText,
            UserName = user.UserName,
            UserType = user.UserType
        }:null;
    }
}

public record OutUserWithToken:OutUser
{
    public string Token { get; set; } = "";
    public static OutUserWithToken? MapToOutUserWithToken(User? user)
    {
        return user != null ? new OutUserWithToken
        {
            UserId = user.UserId,
            FirstName = user.FirstName,
            LastName = user.LastName,
            ConnectionId = user.ConnectionId,
            BackgroundImage = user.BackgroundImage,
            Status = user.Status,
            Bio = user.Bio,
            ProfileImage = user.ProfileImage,
            BirthDay = user.BirthDay,
            Email = user.Email,
            FollowersCount = user.Followers!.Count,
            FollowingsCount = user.Followings!.Count,
            InterestedCategories = user.InterestedCategories!.ToList(),
            JoinedAt = user.JoinedAt,
            StatusText = user.StatusText,
            UserName = user.UserName,
            UserType = user.UserType
        } : null;
    }
}