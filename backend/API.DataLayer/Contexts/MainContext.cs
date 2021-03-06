namespace API.DataLayer.Contexts;

public class MainContext : DbContext
{
    public MainContext(DbContextOptions<MainContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tweet>()
            .HasOne(t => t.Sender)
            .WithMany(u => u.Tweets)
            .HasForeignKey(t => t.SenderId);

        modelBuilder.Entity<Tweet>()
            .HasOne(t => t.BaseTweet)
            .WithMany(t => t.Replies)
            .HasForeignKey(t => t.BaseTweetId);

        modelBuilder.Entity<Tweet>()
            .HasMany(t => t.Likers);

        modelBuilder.Entity<Category>()
            .HasOne(c => c.MainCategory)
            .WithMany(c => c.SubCategories)
            .HasForeignKey(c => c.MainCategoryId);

        modelBuilder.Entity<User>()
            .HasMany(u => u.InterestedCategories)
            .WithMany(c => c.Followers);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Tweets)
            .WithOne(t => t.Sender)
            .HasForeignKey(t => t.SenderId);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Followers);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Followings);

        modelBuilder.Entity<Chat>()
            .HasMany(c => c.Messages)
            .WithOne(m => m.Chat)
            .HasForeignKey(m => m.ChatId);

        modelBuilder.Entity<Chat>()
            .HasMany(c => c.Users)
            .WithMany(u => u.Chats);

        modelBuilder.Entity<Chat>()
            .HasMany(c => c.Admins);

        modelBuilder.Entity<Chat>()
            .HasOne(c => c.Creator);

        modelBuilder.Entity<Message>()
            .HasOne(m => m.Chat)
            .WithMany(c => c.Messages)
            .HasForeignKey(m => m.ChatId);

        modelBuilder.Entity<Message>()
            .HasOne(m => m.Sender)
            .WithMany(u => u.Messages)
            .HasForeignKey(m => m.SenderId);
            

        modelBuilder.Entity<User>()
            .HasMany(u => u.Chats)
            .WithMany(c => c.Users);
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Tweet> Tweets { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Chat> Chats { get; set; }
    public DbSet<Message> Messages { get; set; }
}
