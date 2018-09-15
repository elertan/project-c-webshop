using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class Addedmoretestdata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Artists",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local));

            migrationBuilder.InsertData(
                table: "Artists",
                columns: new[] { "Id", "CreatedAt", "Name", "UpdatedAt" },
                values: new object[,]
                {
                    { 2, new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), "Bastille", null },
                    { 3, new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), "Anne-Marie", null },
                    { 4, new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), "Martin Garrix", null },
                    { 5, new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), "Khalid", null },
                    { 6, new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), "Bonn", null }
                });

            migrationBuilder.UpdateData(
                table: "Tracks",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local));

            migrationBuilder.InsertData(
                table: "Tracks",
                columns: new[] { "Id", "AlbumId", "CreatedAt", "Name", "UpdatedAt" },
                values: new object[,]
                {
                    { 2, null, new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), "FRIENDS", null },
                    { 3, null, new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), "Ocean", null },
                    { 4, null, new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), "High on Life", null }
                });

            migrationBuilder.InsertData(
                table: "ArtistXTracks",
                columns: new[] { "ArtistId", "TrackId" },
                values: new object[,]
                {
                    { 2, 1 },
                    { 1, 2 },
                    { 3, 2 },
                    { 4, 3 },
                    { 5, 3 },
                    { 4, 4 },
                    { 6, 4 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ArtistXTracks",
                keyColumns: new[] { "ArtistId", "TrackId" },
                keyValues: new object[] { 1, 2 });

            migrationBuilder.DeleteData(
                table: "ArtistXTracks",
                keyColumns: new[] { "ArtistId", "TrackId" },
                keyValues: new object[] { 2, 1 });

            migrationBuilder.DeleteData(
                table: "ArtistXTracks",
                keyColumns: new[] { "ArtistId", "TrackId" },
                keyValues: new object[] { 3, 2 });

            migrationBuilder.DeleteData(
                table: "ArtistXTracks",
                keyColumns: new[] { "ArtistId", "TrackId" },
                keyValues: new object[] { 4, 3 });

            migrationBuilder.DeleteData(
                table: "ArtistXTracks",
                keyColumns: new[] { "ArtistId", "TrackId" },
                keyValues: new object[] { 4, 4 });

            migrationBuilder.DeleteData(
                table: "ArtistXTracks",
                keyColumns: new[] { "ArtistId", "TrackId" },
                keyValues: new object[] { 5, 3 });

            migrationBuilder.DeleteData(
                table: "ArtistXTracks",
                keyColumns: new[] { "ArtistId", "TrackId" },
                keyValues: new object[] { 6, 4 });

            migrationBuilder.DeleteData(
                table: "Artists",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Artists",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Artists",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Artists",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Artists",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Tracks",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Tracks",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Tracks",
                keyColumn: "Id",
                keyValue: 4);

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
        }
    }
}
