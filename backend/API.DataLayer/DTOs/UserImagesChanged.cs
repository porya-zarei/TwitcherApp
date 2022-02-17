namespace API.DataLayer.DTOs;

public class UserImagesChanged
{
    public IFormFile? ProfileImage { get; set; }
    public IFormFile? BackgroundImage { get; set; }

    public string? UserName { get; set; }
}

public class UserImagesChangedResult
{
    public string? ProfileImages { get; set; } = "";
    public string? BackgroundImage { get; set; } = "";
}