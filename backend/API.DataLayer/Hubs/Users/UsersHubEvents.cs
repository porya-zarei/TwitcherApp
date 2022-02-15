namespace API.DataLayer.Hubs.Users;

public static class UsersHubEvents
{
    public static readonly string TweetCreated = "NewTweetArrived";
    public static readonly string TweetUpdated = "TweetUpdated";
    public static readonly string TweetLiked = "TweetLiked";
}

