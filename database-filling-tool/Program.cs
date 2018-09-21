using System;
using System.Linq;
using System.Threading.Tasks;
using backend_datamodel.Models;
using Microsoft.EntityFrameworkCore;

namespace database_filling_tool
{
    class Program
    {
        static async Task Main(string[] args)
        {
            try
            {
                DotNetEnv.Env.Load();
            }
            catch (Exception)
            {
                await Console.Error.WriteLineAsync("Couldn't read the .env file, does one exist?");
            }

            var connectionString = DotNetEnv.Env.GetString("DB_CONNECTIONSTRING");
            Console.WriteLine($"The connection string '{connectionString}' will be used.");

            Console.WriteLine("Extracting spotify data...");
            var extractor = new SpotifyDataExtractor();
            var data = await extractor.Extract();
            Console.WriteLine("Data extracted!");

            var builder = new DbContextOptionsBuilder<DatabaseContext>();
            builder.UseNpgsql(connectionString);
            Console.WriteLine("Attempting to connect to the database...");
            using (var db = new DatabaseContext(builder.Options))
            {
                Console.WriteLine("Connected!");

                await StoreData(db, data);
            }

            Console.WriteLine("Finished");
            Console.WriteLine("Press any key to continue...");
            Console.ReadKey();
        }

        static async Task StoreData(DatabaseContext db, SpotifyData data)
        {
//            Console.WriteLine("Deleting existing entities");
//            await db.Database.ExecuteSqlCommandAsync("TRUNCATE TABLE Albums RESTART IDENTITY;");
//            await db.Database.ExecuteSqlCommandAsync("TRUNCATE TABLE Tracks RESTART IDENTITY;");
//            await db.Database.ExecuteSqlCommandAsync("TRUNCATE TABLE Artists RESTART IDENTITY;");
//            Console.WriteLine("Deleted entities!");

            Console.WriteLine("Creating new artist entities");
            var dbArtists = data.Artists.Select(sa => new Artist
            {
                SpotifyId = sa.Id,
                Name = sa.Name
            });
            await db.Artists.AddRangeAsync(dbArtists);
            Console.WriteLine("Storing new artists");
            await db.SaveChangesAsync();

            Console.WriteLine("Creating new track entities");
            var dbTracks = data.Tracks.Select(st => new Track
            {
                SpotifyId = st.Id,
                Name = st.Name,
                Explicit = st.Explicit,
                DurationMs = st.DurationMs,
                PreviewUrl = st.PreviewUrl,
                Artists = dbArtists.Where(dbArtist => st.SpotifyArtists.Any(sa => sa.Id == dbArtist.SpotifyId)).ToList()
            });
            await db.Tracks.AddRangeAsync(dbTracks);
            Console.WriteLine("Storing new track entities");
            await db.SaveChangesAsync();

            Console.WriteLine("Creating new album entities");
            var dbAlbums = data.Albums.Select(sa => new Album
            {
                SpotifyId = sa.Id,
                Name = sa.Name,
                Label = sa.Label,
                Popularity = sa.Popularity,
                AlbumType = sa.AlbumType,
                Tracks = dbTracks.Where(dbTrack => sa.SpotifyTracks.Any(st => st.Id == dbTrack.SpotifyId)).ToList()
            });
            await db.Albums.AddRangeAsync(dbAlbums);
            Console.WriteLine("Storing new album entities");
            await db.SaveChangesAsync();
        }
    }
}