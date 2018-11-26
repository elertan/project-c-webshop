using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend_datamodel.Models;
using Microsoft.EntityFrameworkCore;
using MoreLinq;

namespace backend_filling_tool_v2
{
    public interface IDatabaseFiller
    {
        Task FillWith(SpotifyDataset dataset);
    }
    
    public class DatabaseFiller : IDatabaseFiller
    {
        private readonly ILogger _logger;
        private readonly IEnvVariables _envVariables;

        private readonly float[] _trackPrices = {
            0.69f,
            0.79f,
            0.85f,
            0.99f,
            1.2f
        };

        public DatabaseFiller(ILogger logger, IEnvVariables envVariables)
        {
            _logger = logger;
            _envVariables = envVariables;
        }
        
        public async Task FillWith(SpotifyDataset dataset)
        {
            _logger.Log("Connecting to the database...");
            
            var builder = new DbContextOptionsBuilder<DatabaseContext>();
            builder.UseNpgsql(_envVariables.DbConnectionString);
            using (var db = new DatabaseContext(builder.Options))
            {
                _logger.Log("Connected to the database!");
                
                _logger.Log("Removing current stored data...");
                var tableNames = typeof(DatabaseContext).GetProperties().Where(prop =>
                        prop.PropertyType.IsGenericType &&
                        prop.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>))
                    .Select(prop => prop.Name).ToList();

                var truncateTasks = tableNames.Select(async tableName =>
                {
                    _logger.Log($"Trying to remove all data from {tableName}", LogLevel.Verbose);
                    try
                    {
                        var task = await db.Database.ExecuteSqlCommandAsync($"TRUNCATE TABLE [{tableName}]");
                        _logger.Log($"Removed data for table {tableName}", LogLevel.Verbose);
                        return task;
                    }
                    catch
                    {
                        _logger.Log($"Failed to remove data for {tableName}", LogLevel.Warning);
                        return await Task.FromResult(0);
                    }
                });
                await Task.WhenAll(truncateTasks);
                _logger.Log("Removed all data!");
            }

            using (var db = new DatabaseContext(builder.Options))
            {
                _logger.Log("Parsing entities into relational structure...");
                var relationalStructure = dataset.Categories
                    .DistinctBy(x => x.Id)
                    .Select(sCategory => new
                    {
                        category = new Category
                        {
                            SpotifyId = sCategory.Id,
                            Name = sCategory.Name,
                            Images = sCategory.Icons.Select(e => new Image
                            {
                                Url = e.Url,
                                Height = e.Height,
                                Width = e.Width
                            }).ToList()
                        },
                        sPlaylists = dataset.PlaylistsByCategories[sCategory]
                    })
                    .Select(rs1 => new
                    {
                        rs1.category,
                        sTracks = rs1.sPlaylists.Select(sPlaylist => dataset.TracksByPlaylists[sPlaylist])
                            .SelectMany(x => x)
                            .DistinctBy(x => x.Id)
                    })
                    .Select(rs2 => new
                    {
                        rs2.category,
                        tracks = rs2.sTracks.Select(sTrack => new
                        {
                            track = ExtractTrack(sTrack),
                            album = ExtractAlbum(sTrack.Album),
                            artists = sTrack.Artists.Select(ExtractArtist).ToList()
                        }).ToList()
                    })
                    .ToList();
                _logger.Log("Parsed into relational model, creating singular entities...");

                var categories = relationalStructure.Select(x => x.category);
                _logger.Log("Created category entities");
                await db.Categories.AddRangeAsync(categories);
                await db.SaveChangesAsync();
                _logger.Log("Saved category entities to database");
                
                var tracks = relationalStructure.Select(x => x.tracks.Select(t => t.track))
                    .SelectMany(x => x)
                    .DistinctBy(x => x.SpotifyId);
                _logger.Log("Created track entities");
                await db.Tracks.AddRangeAsync(tracks);
                await db.SaveChangesAsync();
                _logger.Log("Saved track entities to database");
                
                var albums = relationalStructure.Select(x => x.tracks.Select(t => t.album))
                    .SelectMany(x => x)
                    .DistinctBy(x => x.SpotifyId);
                _logger.Log("Created album entities");
                await db.Albums.AddRangeAsync(albums);
                await db.SaveChangesAsync();
                _logger.Log("Saved album entities to database");

                var artists = relationalStructure.Select(x => x.tracks.Select(t => t.artists).SelectMany(x1 => x1))
                    .SelectMany(x => x)
                    .DistinctBy(x => x.SpotifyId);
                _logger.Log("Created artist entities");
                await db.Artists.AddRangeAsync(artists);
                await db.SaveChangesAsync();
                _logger.Log("Saved artist entities to database");
                
                _logger.Log("Generating product entities");
                var products = new List<Product>(tracks.Count() + albums.Count());
                var rnd = new Random();
                
                products.AddRange(tracks.Select(track => new Product
                {
                    Price = _trackPrices[rnd.Next(0, _trackPrices.Length - 1)],
                }));
                _logger.Log("Generated product entities for tracks");
                
                products.AddRange(albums.Select(album => new Product
                {
                    // TODO: Implement logic for album price
                    Price = 1337f
                }));
                _logger.Log("Generated product entities for albums");

                await db.AddRangeAsync(products);
                await db.SaveChangesAsync();
                _logger.Log("Saved products entities to database");
            }
        }

        private Image ExtractImage(SpotifyDTOs.Image sImage)
        {
            return new Image
            {
                Url = sImage.Url,
                Height = sImage.Height,
                Width = sImage.Width
            };
        }

        private Track ExtractTrack(SpotifyDTOs.Track sTrack)
        {
            return new Track
            {
                Explicit = sTrack.Explicit,
                Name = sTrack.Name,
                DurationMs = sTrack.DurationMs,
                PreviewUrl = sTrack.PreviewUrl,
                SpotifyId = sTrack.Id,
            };
        }

        private Album ExtractAlbum(SpotifyDTOs.Album sAlbum)
        {
            try
            {
                return new Album
                {
                    Label = sAlbum.Label,
                    Name = sAlbum.Name,
                    Popularity = sAlbum.Popularity,
                    AlbumType = sAlbum.AlbumType,
                    SpotifyId = sAlbum.Id,
                    Images = sAlbum.Images.Select(ExtractImage).ToList()
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private Artist ExtractArtist(SpotifyDTOs.Artist sArtist)
        {
            return new Artist
            {
                Name = sArtist.Name,
                SpotifyId = sArtist.Id
            };
        }
    }
}