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

    public string? BirthDay { get; set; } = "";

    public string Bio { get; set; } = "";

    public string? ProfileImage { get; set; } = "";

    public string? BackgroundImage { get; set; } = "";

    public string? PhoneNumber { get; set; } = "";

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
            BirthDay = user.BirthDay.ToString(),
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            FollowersCount = user.Followers != null ? user.Followers.Count : 0,
            FollowingsCount = user.Followings != null ? user.Followings.Count : 0,
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
            BirthDay = user.BirthDay.ToString(),
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            FollowersCount = user.Followers != null ? user.Followers.Count : 0,
            FollowingsCount = user.Followings != null ? user.Followings.Count : 0,
            InterestedCategories = user.InterestedCategories!.ToList(),
            JoinedAt = user.JoinedAt,
            StatusText = user.StatusText,
            UserName = user.UserName,
            UserType = user.UserType
        } : null;
    }
}

public record FullOutUser : OutUser
{
    public List<OutTweet> Tweets { get; set; } = new List<OutTweet> { };

    public List<OutTweet> Replies { get; set; } = new List<OutTweet> { };

    public List<OutTweet> Retweets { get; set; } = new List<OutTweet> { };

    public static FullOutUser? MapToFullOutUser(User? user)
    {
        return user != null ? new FullOutUser
        {
            UserId = user.UserId,
            FirstName = user.FirstName,
            LastName = user.LastName,
            ConnectionId = user.ConnectionId,
            BackgroundImage = user.BackgroundImage,
            Status = user.Status,
            Bio = user.Bio,
            ProfileImage = user.ProfileImage,
            BirthDay = user.BirthDay.ToString(),
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            FollowersCount = user.Followers != null?user.Followers.Count:0,
            FollowingsCount = user.Followings != null ? user.Followings.Count :0,
            InterestedCategories = user.InterestedCategories!.ToList(),
            JoinedAt = user.JoinedAt,
            StatusText = user.StatusText,
            UserName = user.UserName,
            UserType = user.UserType,
            Tweets = user.Tweets != null? user.Tweets.Where(t => t.ReTweetType == TweetTypes.Tweet).Select(t => OutTweet.MapToOutTweet(t)).ToList() :new List<OutTweet> { },
            Replies = user.Tweets != null ? user.Tweets.Where(t => t.ReTweetType == TweetTypes.Reply).Select(t => OutTweet.MapToOutTweet(t)).ToList() : new List<OutTweet> { },
            Retweets = user.Tweets != null ? user.Tweets.Where(t => t.ReTweetType == TweetTypes.ReTweet).Select(t => OutTweet.MapToOutTweet(t)).ToList() : new List<OutTweet> { }
        } : null;
    }
}