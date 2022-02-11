namespace API.DataLayer.Models;

public class User
{
    [Key]
    public Guid UserId { get; set; }
    public string? FullName { get; set; } = string.Empty;

    [Required]
    public string? UserName { get; set; } = string.Empty;

    [Required]
    [MinLength(8)]
    public string? Password { get; set; } = string.Empty;

    [Required]
    [EmailAddress(ErrorMessage = "please insert valid email address")]
    public string? Email { get; set; } = string.Empty;

    public string? PhoneNumber { get; set; } = string.Empty;

    public DateOnly? BirthDay { get; set; }

    public string Bio { get; set; } = string.Empty;

    public string ConnectionId { get; set; } = "";

    public string? ProfileImage { get; set; } = string.Empty;

    public string? BackgroundImage { get; set; } = string.Empty;

    public UserStatus? Status { get; set; } = UserStatus.Happy;

    public DateTime? JoinedAt { get; set; }
    public string? StatusText { get; set; } = UserStatus.Happy.ToString();

    public UserTypes UserType { get; set; } = UserTypes.Bronze;

    //[JsonIgnore]
    public ICollection<Tweet> Tweets { get; set; } = new List<Tweet>();
    //[JsonIgnore]
    public ICollection<User>? Followings { get; set;} = new List<User>();
    //[JsonIgnore]
    public ICollection<User>? Followers { get; set; } = new List<User>();
    public ICollection<Category>? InterestedCategories { get; set; } = new List<Category>();

}

public enum UserTypes
{
    Creator=0,
    Admin,
    Professional,
    Gold,
    Silver,
    Bronze
}

public enum UserStatus
{
    Happy=0,
    Busy,
    Successful,
    failed,
    CustomStatus
}