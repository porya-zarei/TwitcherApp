using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.DataLayer.Migrations
{
    public partial class updateTweet3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LikesCount",
                table: "Tweets");

            migrationBuilder.AddColumn<Guid>(
                name: "TweetId",
                table: "Users",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_TweetId",
                table: "Users",
                column: "TweetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Tweets_TweetId",
                table: "Users",
                column: "TweetId",
                principalTable: "Tweets",
                principalColumn: "TweetId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Tweets_TweetId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_TweetId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TweetId",
                table: "Users");

            migrationBuilder.AddColumn<long>(
                name: "LikesCount",
                table: "Tweets",
                type: "bigint",
                nullable: true);
        }
    }
}
