namespace API.Utils.Helpers;

public static class TextHelpers
{
    public static List<string>? GetHashtags(string? text)
    {
        if (text != null)
        {
            Regex regex = new Regex(@"\B(\#[a-zA-Z]+\b)(?!;)");
            var matches = regex.Matches(text).ToList();
            var result = new List<string>();
            foreach (var match in matches)
                result.Add(match.Value[1..]);
            return result;
        }
        return null;
    }
}
