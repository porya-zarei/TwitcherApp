namespace API.DataLayer.DTOs;

public record OutUser
{
    [Key]
    public Guid UserId { get; set; }
    public string? FullName { get; set; }

    [Required]
    public string? UserName { get; set; }

    [Required]
    [EmailAddress(ErrorMessage = "please insert valid email address")]
    public string? Email { get; set; }

    public DateOnly? BirthDay { get; set; }

    public string Bio { get; set; } = string.Empty;

    public string? ProfileImage { get; set; }

    public string? BackgroundImage { get; set; }

    public UserStatus? Status { get; set; } = UserStatus.Happy;
    public DateTime? JoinedAt { get; set; }
    public string? StatusText { get; set; } = UserStatus.Happy.ToString();

    public UserTypes UserType { get; set; } = UserTypes.Bronze;

    public ICollection<Tweet> Tweets { get; set; } = new List<Tweet>();

    public int FollowingsCount { get; set; }
    public int FollowersCount { get; set; }
    public ICollection<Category>? InterestedCategories { get; set; } = new List<Category>();

    public static OutUser? MapToOutUser(User? user)
    {
        return user!=null? new OutUser
        {
            UserId = user.UserId,
            FullName = user.FullName,
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
            Tweets = user.Tweets,
            UserName = user.UserName,
            UserType = user.UserType
        }:null;
    }
}