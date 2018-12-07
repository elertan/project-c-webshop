using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend_datamodel.Models;
using backend_filling_tool_v2.Fetcher;
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

        private readonly Random _rnd = new Random();

        private readonly float[] _trackPrices =
        {
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
                        // TODO: Remove table contents
                        return await Task.FromResult(0);
//                        var task = await db.Database.ExecuteSqlCommandAsync($"TRUNCATE TABLE \"{tableName}\"");
//                        _logger.Log($"Removed data for table {tableName}", LogLevel.Verbose);
//                        return task;
                    }
                    catch (Exception ex)
                    {
                        _logger.Log($"Failed to remove data for {tableName}\n\n{ex}\n", LogLevel.Warning);
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
                        sPlaylists = dataset.PlaylistsByCategories.First(pbc => pbc.Key.Id == sCategory.Id).Value
                    })
                    .Select(rs1 => new
                    {
                        rs1.category,
                        sTracks = rs1.sPlaylists.Select(sPlaylist => dataset.TracksByPlaylists.First(tbp => tbp.Key.Id == sPlaylist.Id).Value)
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
                await db.AddRangeAsync(tracks);
                await db.SaveChangesAsync();
                _logger.Log("Stored track entities in database");

                var albums = relationalStructure.Select(x => x.tracks.Select(t => t.album))
                    .SelectMany(x => x)
                    .DistinctBy(x => x.SpotifyId);
                _logger.Log("Created album entities");
                await db.AddRangeAsync(albums);
                await db.SaveChangesAsync();
                _logger.Log("Stored album entities in database");

                var artists = dataset.FullArtists.Select(ExtractFullArtist);
                
//                _logger.Log("Created artist entities");
//                await db.Artists.AddRangeAsync(artists);
//                await db.SaveChangesAsync();
//                _logger.Log("Saved artist entities to database");
                _logger.Log("Creating many-to-many relationships between the tables");
                
                _logger.Log("Creating Album X Track relationships...");
                var albumXTracks = relationalStructure.Select(x => x.tracks.Select(t => new AlbumXTrack
                {
                    Track = tracks.First(track => track.SpotifyId == t.track.SpotifyId),
                    Album = albums.First(album => album.SpotifyId == t.album.SpotifyId)
                }))
                    .SelectMany(x => x)
                    .DistinctBy(x => $"{x.Album.SpotifyId}{x.Track.SpotifyId}");
                await db.AddRangeAsync(albumXTracks);
                await db.SaveChangesAsync();
                _logger.Log("Created Album X Track relationships!");
                
                _logger.Log("Creating Artist X Track relationships...");
                var artistXTracks = artists.Select(a =>
                {
                    var trs = relationalStructure.Select(x =>
                            x.tracks.Where(t => t.artists.Any(ar => ar.SpotifyId == a.SpotifyId)).Select(e => tracks.First(tr => tr.SpotifyId == e.track.SpotifyId)))
                        .SelectMany(x => x)
                        .DistinctBy(x => x.SpotifyId);
                    return trs.Select(x => new ArtistXTrack
                    {
                        Track = x,
                        Artist = a
                    });
                })
                    .SelectMany(x => x)
                    .DistinctBy(x => $"{x.Artist.SpotifyId}{x.Track.SpotifyId}");
                await db.AddRangeAsync(artistXTracks);
                await db.SaveChangesAsync();
                _logger.Log("Created Artist X Track relationships!");
                
                _logger.Log("Creating Album X Category relationships...");
                var albumXCategories = albums.Select(a =>
                {
                    var ctgrs = relationalStructure.Where(rs => rs.tracks.Any(tr => tr.album.SpotifyId == a.SpotifyId)).Select(x => categories.First(c => c.SpotifyId == x.category.SpotifyId));
                    return ctgrs.Select(ctgr => new AlbumXCategory
                    {
                        Album = a,
                        Category = ctgr
                    });
                })
                    .SelectMany(x => x)
                    .DistinctBy(x => $"{x.Category.SpotifyId}{x.Album.SpotifyId}");
                await db.AddRangeAsync(albumXCategories);
                await db.SaveChangesAsync();
                _logger.Log("Created Album X Category relationships!");
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
                Product = new Product
                {
                    Price = _trackPrices[_rnd.Next(0, _trackPrices.Length - 1)],
                }
            };
        }

        private Album ExtractAlbum(SpotifyDTOs.Album sAlbum)
        {
            return new Album
            {
                Label = sAlbum.Label,
                Name = sAlbum.Name,
                Popularity = sAlbum.Popularity,
                AlbumType = sAlbum.AlbumType,
                SpotifyId = sAlbum.Id,
                Images = sAlbum.Images.Select(ExtractImage).ToList(),
                Product = new Product
                {
                    // TODO: Implement logic
                    Price = 10f
                }
            };
        }

        private Artist ExtractArtist(SpotifyDTOs.Artist sArtist)
        {
            return new Artist
            {
                Name = sArtist.Name,
                SpotifyId = sArtist.Id
            };
        }
        
        private Artist ExtractFullArtist(SpotifyDTOs.Extended.Artist sArtist)
        {
            return new Artist
            {
                Name = sArtist.Name,
                SpotifyId = sArtist.Id,
                Images = sArtist.Images.Select(ExtractImage).ToList()
            };
        }
    }
}