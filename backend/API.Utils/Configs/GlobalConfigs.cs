namespace API.Utils.Configs;

public static class GlobalConfigs
{
    public const string ClientUrl = "http://localhost:3000";
    public const string TokenKey = "token";
    public static CookieOptions CookieOptions(DateTime expireTime) => new()
    {
        Domain = ClientUrl,
        Expires = expireTime,
        HttpOnly = true,
        Secure = true,
        IsEssential = true,
        Path = "/",
        SameSite = SameSiteMode.Unspecified
    };

}
