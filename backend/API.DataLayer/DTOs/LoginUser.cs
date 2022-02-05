namespace API.DataLayer.DTOs;

public class LoginUser
{
    public string? UserName { get; set;}
    public string? Email { get; set;}
    [Required]
    public string? Password { get; set;}
}
