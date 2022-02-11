namespace API.DataLayer.DTOs;

public class RegisterUser
{
    [Required]
    public string? UserName { get; set; } = "";
    [Required]
    public string? Password { get; set; } = "";
    [Required]
    public string? Email { get; set; } = "";
    public string? PhoneNumber { get; set; } = "";
    public string? FirstName { get; set; } = "";
    public string? LastName { get; set; } = "";

    public User MapToUser()
    {
        return new User
        {
            UserName = UserName,
            Password = Password,
            Email = Email,
            PhoneNumber = PhoneNumber,
            FirstName = FirstName,
            LastName = LastName,
            JoinedAt = DateTime.UtcNow,
            UserId = Guid.NewGuid(),
        };
    }
}
