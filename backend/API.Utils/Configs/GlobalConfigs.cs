namespace API.Utils.Configs;

public static class GlobalConfigs
{
    public const string ClientUrl = "http://localhost:3000";
    public const string TokenKey = "token";
    public static CookieOptions CookieOptions(DateTime expireTime) => new()
    {
        Expires = expireTime,
        HttpOnly = false,
        Secure = false,
        IsEssential = false,
        Path = "/",
        SameSite = SameSiteMode.Unspecified
    };

}
