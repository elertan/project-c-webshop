using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class Addedcrosstableforartistxtrack : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArtistXTrack_Artists_ArtistId",
                table: "ArtistXTrack");

            migrationBuilder.DropForeignKey(
                name: "FK_ArtistXTrack_Tracks_TrackId",
                table: "ArtistXTrack");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ArtistXTrack",
                table: "ArtistXTrack");

            migrationBuilder.RenameTable(
                name: "ArtistXTrack",
                newName: "ArtistXTracks");

            migrationBuilder.RenameIndex(
                name: "IX_ArtistXTrack_TrackId",
                table: "ArtistXTracks",
                newName: "IX_ArtistXTracks_TrackId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ArtistXTracks",
                table: "ArtistXTracks",
                columns: new[] { "ArtistId", "TrackId" });

            migrationBuilder.UpdateData(
                table: "Artists",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2018, 9, 15, 2, 23, 15, 256, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Tracks",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2018, 9, 15, 2, 23, 15, 252, DateTimeKind.Local));

            migrationBuilder.AddForeignKey(
                name: "FK_ArtistXTracks_Artists_ArtistId",
                table: "ArtistXTracks",
                column: "ArtistId",
                principalTable: "Artists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ArtistXTracks_Tracks_TrackId",
                table: "ArtistXTracks",
                column: "TrackId",
                principalTable: "Tracks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArtistXTracks_Artists_ArtistId",
                table: "ArtistXTracks");

            migrationBuilder.DropForeignKey(
                name: "FK_ArtistXTracks_Tracks_TrackId",
                table: "ArtistXTracks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ArtistXTracks",
                table: "ArtistXTracks");

            migrationBuilder.RenameTable(
                name: "ArtistXTracks",
                newName: "ArtistXTrack");

            migrationBuilder.RenameIndex(
                name: "IX_ArtistXTracks_TrackId",
                table: "ArtistXTrack",
                newName: "IX_ArtistXTrack_TrackId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ArtistXTrack",
                table: "ArtistXTrack",
                columns: new[] { "ArtistId", "TrackId" });

            migrationBuilder.UpdateData(
                table: "Artists",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2018, 9, 13, 15, 12, 44, 258, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Tracks",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2018, 9, 13, 15, 12, 44, 254, DateTimeKind.Local));

            migrationBuilder.AddForeignKey(
                name: "FK_ArtistXTrack_Artists_ArtistId",
                table: "ArtistXTrack",
                column: "ArtistId",
                principalTable: "Artists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ArtistXTrack_Tracks_TrackId",
                table: "ArtistXTrack",
                column: "TrackId",
                principalTable: "Tracks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
