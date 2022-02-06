namespace API.DataLayer.Models;

public class Category
{
    [Key]
    public Guid CategoryId { get; set; }

    [Required]
    [MinLength(4)]
    public string? Name { get; set; } = string.Empty;

    public string? Description { get; set; } = string.Empty;

    public CategoryTypes CategoryType { get; set; } = CategoryTypes.BaseCategory;
    public Guid? MainCategoryId { get; set; }
    public Category? MainCategory { get; set; }
    public ICollection<Category>? SubCategories { get; set;} = new List<Category>();

    public ICollection<User>? Followers { get; set; } = new List<User>();

}

public enum CategoryTypes
{
    BaseCategory=0,
    SubCategory
}