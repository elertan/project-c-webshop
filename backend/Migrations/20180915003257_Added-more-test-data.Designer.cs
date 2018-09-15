﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using backend.Models;

namespace backend.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20180915003257_Added-more-test-data")]
    partial class Addedmoretestdata
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.1.3-rtm-32065")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("backend.Models.Album", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.ToTable("Albums");
                });

            modelBuilder.Entity("backend.Models.Artist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Name");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.ToTable("Artists");

                    b.HasData(
                        new { Id = 1, CreatedAt = new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), Name = "Marshmello" },
                        new { Id = 2, CreatedAt = new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), Name = "Bastille" },
                        new { Id = 3, CreatedAt = new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), Name = "Anne-Marie" },
                        new { Id = 4, CreatedAt = new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), Name = "Martin Garrix" },
                        new { Id = 5, CreatedAt = new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), Name = "Khalid" },
                        new { Id = 6, CreatedAt = new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), Name = "Bonn" }
                    );
                });

            modelBuilder.Entity("backend.Models.ArtistXTrack", b =>
                {
                    b.Property<int>("ArtistId");

                    b.Property<int>("TrackId");

                    b.HasKey("ArtistId", "TrackId");

                    b.HasIndex("TrackId");

                    b.ToTable("ArtistXTracks");

                    b.HasData(
                        new { ArtistId = 1, TrackId = 1 },
                        new { ArtistId = 2, TrackId = 1 },
                        new { ArtistId = 1, TrackId = 2 },
                        new { ArtistId = 3, TrackId = 2 },
                        new { ArtistId = 4, TrackId = 3 },
                        new { ArtistId = 5, TrackId = 3 },
                        new { ArtistId = 4, TrackId = 4 },
                        new { ArtistId = 6, TrackId = 4 }
                    );
                });

            modelBuilder.Entity("backend.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Name");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("backend.Models.Track", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AlbumId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Name");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.HasIndex("AlbumId");

                    b.ToTable("Tracks");

                    b.HasData(
                        new { Id = 1, CreatedAt = new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), Name = "Happier" },
                        new { Id = 2, CreatedAt = new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), Name = "FRIENDS" },
                        new { Id = 3, CreatedAt = new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), Name = "Ocean" },
                        new { Id = 4, CreatedAt = new DateTime(2018, 9, 15, 2, 32, 57, 327, DateTimeKind.Local), Name = "High on Life" }
                    );
                });

            modelBuilder.Entity("backend.Models.ArtistXTrack", b =>
                {
                    b.HasOne("backend.Models.Artist", "Artist")
                        .WithMany()
                        .HasForeignKey("ArtistId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.Models.Track", "Track")
                        .WithMany()
                        .HasForeignKey("TrackId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.Models.Track", b =>
                {
                    b.HasOne("backend.Models.Album")
                        .WithMany("Tracks")
                        .HasForeignKey("AlbumId");
                });
#pragma warning restore 612, 618
        }
    }
}