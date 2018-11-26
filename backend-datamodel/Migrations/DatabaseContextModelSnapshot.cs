﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using backend_datamodel.Models;

namespace backend_datamodel.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.1.3-rtm-32065")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("backend_datamodel.Models.Admin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime?>("UpdatedAt");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("backend_datamodel.Models.Album", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AlbumType");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Label");

                    b.Property<string>("Name");

                    b.Property<int>("Popularity");

                    b.Property<int>("ProductId");

                    b.Property<string>("SpotifyId");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("Albums");
                });

            modelBuilder.Entity("backend_datamodel.Models.AlbumXCategory", b =>
                {
                    b.Property<int>("CategoryId");

                    b.Property<int>("AlbumId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("Id");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("CategoryId", "AlbumId");

                    b.HasIndex("AlbumId");

                    b.HasIndex("Id");

                    b.ToTable("AlbumXCategories");
                });

            modelBuilder.Entity("backend_datamodel.Models.AlbumXTrack", b =>
                {
                    b.Property<int>("AlbumId");

                    b.Property<int>("TrackId");

                    b.HasKey("AlbumId", "TrackId");

                    b.HasIndex("TrackId");

                    b.ToTable("AlbumXTracks");
                });

            modelBuilder.Entity("backend_datamodel.Models.Artist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Name");

                    b.Property<string>("SpotifyId");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.ToTable("Artists");
                });

            modelBuilder.Entity("backend_datamodel.Models.ArtistXTrack", b =>
                {
                    b.Property<int>("ArtistId");

                    b.Property<int>("TrackId");

                    b.HasKey("ArtistId", "TrackId");

                    b.HasIndex("TrackId");

                    b.ToTable("ArtistXTracks");
                });

            modelBuilder.Entity("backend_datamodel.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Name");

                    b.Property<string>("SpotifyId");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("backend_datamodel.Models.Genre", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Name");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.ToTable("Genres");
                });

            modelBuilder.Entity("backend_datamodel.Models.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AlbumId");

                    b.Property<int?>("ArtistId");

                    b.Property<int?>("CategoryId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int?>("Height");

                    b.Property<DateTime?>("UpdatedAt");

                    b.Property<string>("Url");

                    b.Property<int?>("Width");

                    b.HasKey("Id");

                    b.HasIndex("AlbumId");

                    b.HasIndex("ArtistId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("backend_datamodel.Models.Invoice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.ToTable("Invoices");
                });

            modelBuilder.Entity("backend_datamodel.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int?>("InvoiceId");

                    b.Property<DateTime?>("UpdatedAt");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("InvoiceId");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("backend_datamodel.Models.OrderXProduct", b =>
                {
                    b.Property<int>("OrderId");

                    b.Property<int>("ProductId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("Id");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("OrderId", "ProductId");

                    b.HasIndex("ProductId");

                    b.ToTable("OrderXProducts");
                });

            modelBuilder.Entity("backend_datamodel.Models.Payment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int?>("InvoiceId");

                    b.Property<int>("PaymentState");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.HasIndex("InvoiceId");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("backend_datamodel.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<float>("Price");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("backend_datamodel.Models.Track", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("DurationMs");

                    b.Property<bool>("Explicit");

                    b.Property<string>("Name");

                    b.Property<string>("PreviewUrl");

                    b.Property<int>("ProductId");

                    b.Property<string>("SpotifyId");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("Tracks");
                });

            modelBuilder.Entity("backend_datamodel.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime?>("DateOfBirth");

                    b.Property<string>("Email");

                    b.Property<string>("Firstname");

                    b.Property<string>("Lastname");

                    b.Property<string>("Password");

                    b.Property<string>("Token");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("backend_datamodel.Models.Admin", b =>
                {
                    b.HasOne("backend_datamodel.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("backend_datamodel.Models.Album", b =>
                {
                    b.HasOne("backend_datamodel.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend_datamodel.Models.AlbumXCategory", b =>
                {
                    b.HasOne("backend_datamodel.Models.Album", "Album")
                        .WithMany("AlbumXCategories")
                        .HasForeignKey("AlbumId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend_datamodel.Models.Category", "Category")
                        .WithMany("AlbumXCategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend_datamodel.Models.Genre")
                        .WithMany("AlbumXCategory")
                        .HasForeignKey("Id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend_datamodel.Models.AlbumXTrack", b =>
                {
                    b.HasOne("backend_datamodel.Models.Album", "Album")
                        .WithMany("AlbumXTracks")
                        .HasForeignKey("AlbumId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend_datamodel.Models.Track", "Track")
                        .WithMany("AlbumXTracks")
                        .HasForeignKey("TrackId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend_datamodel.Models.ArtistXTrack", b =>
                {
                    b.HasOne("backend_datamodel.Models.Artist", "Artist")
                        .WithMany("ArtistXTracks")
                        .HasForeignKey("ArtistId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend_datamodel.Models.Track", "Track")
                        .WithMany("ArtistXTracks")
                        .HasForeignKey("TrackId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend_datamodel.Models.Image", b =>
                {
                    b.HasOne("backend_datamodel.Models.Album")
                        .WithMany("Images")
                        .HasForeignKey("AlbumId");

                    b.HasOne("backend_datamodel.Models.Artist")
                        .WithMany("Images")
                        .HasForeignKey("ArtistId");

                    b.HasOne("backend_datamodel.Models.Category")
                        .WithMany("Images")
                        .HasForeignKey("CategoryId");
                });

            modelBuilder.Entity("backend_datamodel.Models.Order", b =>
                {
                    b.HasOne("backend_datamodel.Models.Invoice", "Invoice")
                        .WithMany()
                        .HasForeignKey("InvoiceId");

                    b.HasOne("backend_datamodel.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("backend_datamodel.Models.OrderXProduct", b =>
                {
                    b.HasOne("backend_datamodel.Models.Order", "Order")
                        .WithMany("OrderXProducts")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend_datamodel.Models.Product", "Product")
                        .WithMany("OrderXProducts")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend_datamodel.Models.Payment", b =>
                {
                    b.HasOne("backend_datamodel.Models.Invoice", "Invoice")
                        .WithMany()
                        .HasForeignKey("InvoiceId");
                });

            modelBuilder.Entity("backend_datamodel.Models.Track", b =>
                {
                    b.HasOne("backend_datamodel.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
