using Microsoft.EntityFrameworkCore.Migrations;

namespace backend_datamodel.Migrations
{
    public partial class AddedmanytomanyrelationshipsandanImageUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artists_Tracks_TrackId",
                table: "Artists");

            migrationBuilder.DropForeignKey(
                name: "FK_Tracks_Albums_AlbumId",
                table: "Tracks");

            migrationBuilder.DropIndex(
                name: "IX_Tracks_AlbumId",
                table: "Tracks");

            migrationBuilder.DropIndex(
                name: "IX_Artists_TrackId",
                table: "Artists");

            migrationBuilder.DropColumn(
                name: "AlbumId",
                table: "Tracks");

            migrationBuilder.DropColumn(
                name: "TrackId",
                table: "Artists");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Tracks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Artists",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Albums",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AlbumXTracks",
                columns: table => new
                {
                    AlbumId = table.Column<int>(nullable: false),
                    TrackId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlbumXTracks", x => new { x.AlbumId, x.TrackId });
                    table.ForeignKey(
                        name: "FK_AlbumXTracks_Albums_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "Albums",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AlbumXTracks_Tracks_TrackId",
                        column: x => x.TrackId,
                        principalTable: "Tracks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ArtistXTracks",
                columns: table => new
                {
                    ArtistId = table.Column<int>(nullable: false),
                    TrackId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtistXTracks", x => new { x.ArtistId, x.TrackId });
                    table.ForeignKey(
                        name: "FK_ArtistXTracks_Artists_ArtistId",
                        column: x => x.ArtistId,
                        principalTable: "Artists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ArtistXTracks_Tracks_TrackId",
                        column: x => x.TrackId,
                        principalTable: "Tracks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AlbumXTracks_TrackId",
                table: "AlbumXTracks",
                column: "TrackId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtistXTracks_TrackId",
                table: "ArtistXTracks",
                column: "TrackId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AlbumXTracks");

            migrationBuilder.DropTable(
                name: "ArtistXTracks");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Tracks");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Artists");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Albums");

            migrationBuilder.AddColumn<int>(
                name: "AlbumId",
                table: "Tracks",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TrackId",
                table: "Artists",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tracks_AlbumId",
                table: "Tracks",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_Artists_TrackId",
                table: "Artists",
                column: "TrackId");

            migrationBuilder.AddForeignKey(
                name: "FK_Artists_Tracks_TrackId",
                table: "Artists",
                column: "TrackId",
                principalTable: "Tracks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tracks_Albums_AlbumId",
                table: "Tracks",
                column: "AlbumId",
                principalTable: "Albums",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
