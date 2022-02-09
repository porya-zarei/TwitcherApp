namespace API.Utils.Configs;

public static class GlobalConfigs
{
    public const string ClientUrl = "localhost:3000";
    public const string TokenKey = "token";
    public static CookieOptions CookieOptions(DateTime expireTime) => new()
    {
        Expires = expireTime,
        HttpOnly = false,
        Secure = true,
        IsEssential = true,
        Path = "/",
        SameSite = SameSiteMode.None
    };

}
