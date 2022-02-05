namespace API.DataLayer.Models;

public class APIResult<T>
{
    public T? Result { get; set; }
    public bool Ok { get; set; } = true;
    public ICollection<string>? Errors { get; set; } = null;
    public int Status { get; set; } = 200;
    public string Message { get; set; } = string.Empty;

}
