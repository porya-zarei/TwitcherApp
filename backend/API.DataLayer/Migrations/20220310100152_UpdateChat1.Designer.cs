﻿// <auto-generated />
using System;
using System.Collections.Generic;
using API.DataLayer.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.DataLayer.Migrations
{
    [DbContext(typeof(MainContext))]
    [Migration("20220310100152_UpdateChat1")]
    partial class UpdateChat1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("API.DataLayer.Models.Category", b =>
                {
                    b.Property<Guid>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("CategoryType")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<Guid?>("MainCategoryId")
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("CategoryId");

                    b.HasIndex("MainCategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("API.DataLayer.Models.Chat", b =>
                {
                    b.Property<Guid>("ChatId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("ChatLink")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("CreatorId")
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsOpen")
                        .HasColumnType("boolean");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.HasKey("ChatId");

                    b.HasIndex("CreatorId");

                    b.ToTable("Chats");
                });

            modelBuilder.Entity("API.DataLayer.Models.Message", b =>
                {
                    b.Property<Guid>("MessageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("ChatId")
                        .HasColumnType("uuid");

                    b.Property<int>("ChatStatus")
                        .HasColumnType("integer");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("File")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<long>("FileSize")
                        .HasColumnType("bigint");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<long>("ImageSize")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("SendedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("SenderId")
                        .HasColumnType("uuid");

                    b.Property<string>("Video")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<long>("VideoSize")
                        .HasColumnType("bigint");

                    b.Property<string>("Voice")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<long>("VoiceSize")
                        .HasColumnType("bigint");

                    b.HasKey("MessageId");

                    b.HasIndex("ChatId");

                    b.HasIndex("SenderId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("API.DataLayer.Models.Tweet", b =>
                {
                    b.Property<Guid>("TweetId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("BaseTweetId")
                        .HasColumnType("uuid");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<List<string>>("Hashtags")
                        .HasColumnType("text[]");

                    b.Property<List<string>>("Images")
                        .HasColumnType("text[]");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<int>("ReTweetType")
                        .HasColumnType("integer");

                    b.Property<Guid?>("SenderId")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<string>("Video")
                        .HasColumnType("text");

                    b.HasKey("TweetId");

                    b.HasIndex("BaseTweetId");

                    b.HasIndex("SenderId");

                    b.ToTable("Tweets");
                });

            modelBuilder.Entity("API.DataLayer.Models.User", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("AddToChatStatus")
                        .HasColumnType("integer");

                    b.Property<string>("BackgroundImage")
                        .HasColumnType("text");

                    b.Property<string>("Bio")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateOnly?>("BirthDay")
                        .HasColumnType("date");

                    b.Property<Guid?>("ChatId")
                        .HasColumnType("uuid");

                    b.Property<string>("ConnectionId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<DateTime?>("JoinedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<string>("ProfileImage")
                        .HasColumnType("text");

                    b.Property<int?>("Status")
                        .HasColumnType("integer");

                    b.Property<string>("StatusText")
                        .HasColumnType("text");

                    b.Property<Guid?>("TweetId")
                        .HasColumnType("uuid");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("UserType")
                        .HasColumnType("integer");

                    b.HasKey("UserId");

                    b.HasIndex("ChatId");

                    b.HasIndex("TweetId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CategoryUser", b =>
                {
                    b.Property<Guid>("FollowersUserId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("InterestedCategoriesCategoryId")
                        .HasColumnType("uuid");

                    b.HasKey("FollowersUserId", "InterestedCategoriesCategoryId");

                    b.HasIndex("InterestedCategoriesCategoryId");

                    b.ToTable("CategoryUser");
                });

            modelBuilder.Entity("ChatUser", b =>
                {
                    b.Property<Guid>("ChatsChatId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("UsersUserId")
                        .HasColumnType("uuid");

                    b.HasKey("ChatsChatId", "UsersUserId");

                    b.HasIndex("UsersUserId");

                    b.ToTable("ChatUser");
                });

            modelBuilder.Entity("UserUser", b =>
                {
                    b.Property<Guid>("FollowersUserId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("FollowingsUserId")
                        .HasColumnType("uuid");

                    b.HasKey("FollowersUserId", "FollowingsUserId");

                    b.HasIndex("FollowingsUserId");

                    b.ToTable("UserUser");
                });

            modelBuilder.Entity("API.DataLayer.Models.Category", b =>
                {
                    b.HasOne("API.DataLayer.Models.Category", "MainCategory")
                        .WithMany("SubCategories")
                        .HasForeignKey("MainCategoryId");

                    b.Navigation("MainCategory");
                });

            modelBuilder.Entity("API.DataLayer.Models.Chat", b =>
                {
                    b.HasOne("API.DataLayer.Models.User", "Creator")
                        .WithMany()
                        .HasForeignKey("CreatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Creator");
                });

            modelBuilder.Entity("API.DataLayer.Models.Message", b =>
                {
                    b.HasOne("API.DataLayer.Models.Chat", "Chat")
                        .WithMany("Messages")
                        .HasForeignKey("ChatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.DataLayer.Models.User", "Sender")
                        .WithMany("Messages")
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Chat");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("API.DataLayer.Models.Tweet", b =>
                {
                    b.HasOne("API.DataLayer.Models.Tweet", "BaseTweet")
                        .WithMany("Replies")
                        .HasForeignKey("BaseTweetId");

                    b.HasOne("API.DataLayer.Models.User", "Sender")
                        .WithMany("Tweets")
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BaseTweet");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("API.DataLayer.Models.User", b =>
                {
                    b.HasOne("API.DataLayer.Models.Chat", null)
                        .WithMany("Admins")
                        .HasForeignKey("ChatId");

                    b.HasOne("API.DataLayer.Models.Tweet", null)
                        .WithMany("Likers")
                        .HasForeignKey("TweetId");
                });

            modelBuilder.Entity("CategoryUser", b =>
                {
                    b.HasOne("API.DataLayer.Models.User", null)
                        .WithMany()
                        .HasForeignKey("FollowersUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.DataLayer.Models.Category", null)
                        .WithMany()
                        .HasForeignKey("InterestedCategoriesCategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ChatUser", b =>
                {
                    b.HasOne("API.DataLayer.Models.Chat", null)
                        .WithMany()
                        .HasForeignKey("ChatsChatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.DataLayer.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UsersUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("UserUser", b =>
                {
                    b.HasOne("API.DataLayer.Models.User", null)
                        .WithMany()
                        .HasForeignKey("FollowersUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.DataLayer.Models.User", null)
                        .WithMany()
                        .HasForeignKey("FollowingsUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("API.DataLayer.Models.Category", b =>
                {
                    b.Navigation("SubCategories");
                });

            modelBuilder.Entity("API.DataLayer.Models.Chat", b =>
                {
                    b.Navigation("Admins");

                    b.Navigation("Messages");
                });

            modelBuilder.Entity("API.DataLayer.Models.Tweet", b =>
                {
                    b.Navigation("Likers");

                    b.Navigation("Replies");
                });

            modelBuilder.Entity("API.DataLayer.Models.User", b =>
                {
                    b.Navigation("Messages");

                    b.Navigation("Tweets");
                });
#pragma warning restore 612, 618
        }
    }
}