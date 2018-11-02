using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace backend_datamodel.Migrations
{
    public partial class AddedImageentityandrelationsfromothermodels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Albums_Products_ProductId",
                table: "Albums");

            migrationBuilder.DropForeignKey(
                name: "FK_Tracks_Products_ProductId",
                table: "Tracks");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Artists");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Albums");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Tracks",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Albums",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Image",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: true),
                    Url = table.Column<string>(nullable: true),
                    Width = table.Column<int>(nullable: true),
                    Height = table.Column<int>(nullable: true),
                    AlbumId = table.Column<int>(nullable: true),
                    ArtistId = table.Column<int>(nullable: true),
                    CategoryId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Image", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Image_Albums_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "Albums",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Image_Artists_ArtistId",
                        column: x => x.ArtistId,
                        principalTable: "Artists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Image_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Image_AlbumId",
                table: "Image",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_Image_ArtistId",
                table: "Image",
                column: "ArtistId");

            migrationBuilder.CreateIndex(
                name: "IX_Image_CategoryId",
                table: "Image",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Albums_Products_ProductId",
                table: "Albums",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tracks_Products_ProductId",
                table: "Tracks",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Albums_Products_ProductId",
                table: "Albums");

            migrationBuilder.DropForeignKey(
                name: "FK_Tracks_Products_ProductId",
                table: "Tracks");

            migrationBuilder.DropTable(
                name: "Image");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Tracks",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Categories",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Artists",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Albums",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Albums",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Albums_Products_ProductId",
                table: "Albums",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tracks_Products_ProductId",
                table: "Tracks",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
