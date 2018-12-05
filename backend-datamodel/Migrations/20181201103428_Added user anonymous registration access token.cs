using Microsoft.EntityFrameworkCore.Migrations;

namespace backend_datamodel.Migrations
{
    public partial class Addeduseranonymousregistrationaccesstoken : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AnonymousRegistrationToken",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnonymousRegistrationToken",
                table: "Users");
        }
    }
}
