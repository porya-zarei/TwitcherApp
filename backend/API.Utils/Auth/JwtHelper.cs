namespace API.Utils.Auth;

public static class JwtHelper
{
    private static DateTime GetExpiresTime() => DateTime.Now.AddHours(5);
    public static CookieOptions GetCookieOptions() => GlobalConfigs.CookieOptions(GetExpiresTime());
    public static string GetToken(Dictionary<string, string> pairs, JwtConfig jwtConfig)
    {
        var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Jti,jwtConfig.Subject),
                new Claim(JwtRegisteredClaimNames.Iat,Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub,DateTime.UtcNow.ToString()),
            };
        foreach (var _key in pairs.Keys)
        {
            claims.Add(new Claim(_key, pairs[_key]));
        }
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig.Key));
        var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var securityToken = new JwtSecurityToken(
            jwtConfig.Issuer,
            jwtConfig.Audience,
            claims,
            expires: GetExpiresTime(),
            signingCredentials: signIn
        );
        var token = new JwtSecurityTokenHandler().WriteToken(securityToken);
        return token;
    }
}
