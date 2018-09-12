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
    [Migration("20180912204254_Added-test-data-fix3")]
    partial class Addedtestdatafix3
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

                    b.HasKey("Id");

                    b.ToTable("Albums");
                });

            modelBuilder.Entity("backend.Models.Artist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Artist");

                    b.HasData(
                        new { Id = 1, Name = "Marshmello" }
                    );
                });

            modelBuilder.Entity("backend.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("backend.Models.Track", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AlbumId");

                    b.Property<int?>("ArtistId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("AlbumId");

                    b.HasIndex("ArtistId");

                    b.ToTable("Tracks");

                    b.HasData(
                        new { Id = 1, ArtistId = 1, Name = "Happier" }
                    );
                });

            modelBuilder.Entity("backend.Models.Track", b =>
                {
                    b.HasOne("backend.Models.Album")
                        .WithMany("Tracks")
                        .HasForeignKey("AlbumId");

                    b.HasOne("backend.Models.Artist", "Artist")
                        .WithMany()
                        .HasForeignKey("ArtistId");
                });
#pragma warning restore 612, 618
        }
    }
}
