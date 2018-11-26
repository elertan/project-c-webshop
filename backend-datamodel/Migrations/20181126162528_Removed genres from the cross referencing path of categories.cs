using Microsoft.EntityFrameworkCore.Migrations;

namespace backend_datamodel.Migrations
{
    public partial class Removedgenresfromthecrossreferencingpathofcategories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AlbumXCategories_Genres_Id",
                table: "AlbumXCategories");

            migrationBuilder.DropIndex(
                name: "IX_AlbumXCategories_Id",
                table: "AlbumXCategories");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_AlbumXCategories_Id",
                table: "AlbumXCategories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AlbumXCategories_Genres_Id",
                table: "AlbumXCategories",
                column: "Id",
                principalTable: "Genres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
