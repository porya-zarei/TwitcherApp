using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.DataLayer.Migrations
{
    public partial class updateTweet4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tweets_Tweets_TweetId1",
                table: "Tweets");

            migrationBuilder.DropIndex(
                name: "IX_Tweets_TweetId1",
                table: "Tweets");

            migrationBuilder.DropColumn(
                name: "TweetId1",
                table: "Tweets");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TweetId1",
                table: "Tweets",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tweets_TweetId1",
                table: "Tweets",
                column: "TweetId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Tweets_Tweets_TweetId1",
                table: "Tweets",
                column: "TweetId1",
                principalTable: "Tweets",
                principalColumn: "TweetId");
        }
    }
}
