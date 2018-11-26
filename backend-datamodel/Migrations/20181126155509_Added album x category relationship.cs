using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend_datamodel.Migrations
{
    public partial class Addedalbumxcategoryrelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AlbumXCategories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: true),
                    AlbumId = table.Column<int>(nullable: false),
                    CategoryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlbumXCategories", x => new { x.CategoryId, x.AlbumId });
                    table.ForeignKey(
                        name: "FK_AlbumXCategories_Albums_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "Albums",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AlbumXCategories_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AlbumXCategories_Genres_Id",
                        column: x => x.Id,
                        principalTable: "Genres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AlbumXCategories_AlbumId",
                table: "AlbumXCategories",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_AlbumXCategories_Id",
                table: "AlbumXCategories",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AlbumXCategories");
        }
    }
}
