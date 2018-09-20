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

            var builder = new DbContextOptionsBuilder<DatabaseContext>();
            builder.UseNpgsql(connectionString);
            Console.WriteLine("Attempting to connect to the database...");
            using (var db = new DatabaseContext(builder.Options))
            {
                Console.WriteLine("Connected!");

                Console.WriteLine("Extracting spotify data...");
                var extractor = new SpotifyDataExtractor();
                var data = await extractor.Extract();
                Console.WriteLine("Data extracted!");
                await StoreData(db, data);
            }

            Console.WriteLine("Finished");
            Console.WriteLine("Press any key to continue...");
            Console.ReadKey();
        }

        static async Task StoreData(DatabaseContext db, SpotifyData data)
        {
            Console.WriteLine("Marking existing entities for deletion");
            db.DeleteAll<Album>();
            db.DeleteAll<Track>();
            db.DeleteAll<Artist>();
            Console.WriteLine("Deleting existing entities");
            await db.SaveChangesAsync();
            Console.WriteLine("Deleted entities!");

            Console.WriteLine("Creating new artist entities");
            var dbArtists = data.Artists.Select(sa => new Artist
            {
                Name = sa.Name
            });
            await db.Artists.AddRangeAsync(dbArtists);
            Console.WriteLine("Storing new artists");
            await db.SaveChangesAsync();

            Console.WriteLine("Creating new track entities");
            var dbTracks = data.Tracks.Select(st => new Track
            {
                Name = st.Name
            });
            await db.Tracks.AddRangeAsync(dbTracks);
            Console.WriteLine("Storing new track entities");

            Console.WriteLine("Creating new album entities");
            await db.Albums.AddRangeAsync(data.Albums.Select(sa => new Album
            {
                Tracks = dbTracks.Where(dbtrack => dbtrack)
            }));
            Console.WriteLine("Storing new album entities");
        }
    }
}
