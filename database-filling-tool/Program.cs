using System;
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
                
                // TODO: Fill database with extracted data
            }

            Console.WriteLine("Finished");
            Console.WriteLine("Press any key to continue...");
            Console.ReadKey();
        }
    }
}
