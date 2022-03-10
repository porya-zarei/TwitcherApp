using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.DataLayer.Migrations
{
    public partial class UpdateMessage1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ChatStatus",
                table: "Messages",
                newName: "MessageStatus");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MessageStatus",
                table: "Messages",
                newName: "ChatStatus");
        }
    }
}
