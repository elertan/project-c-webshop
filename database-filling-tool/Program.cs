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
            catch (Exception ex)
            {
                await Console.Error.WriteLineAsync("Couldn't read the .env file, does one exist?");
            }

            var connectionString = DotNetEnv.Env.GetString("DB_CONNECTIONSTRING");
            Console.WriteLine($"The connection string '{connectionString}' will be used.");

            var builder = new DbContextOptionsBuilder<DatabaseContext>();
            builder.UseNpgsql(connectionString);
            using (var db = new DatabaseContext(builder.Options))
            {
                var artists = await db.Artists.ToListAsync();
                artists.ForEach(artist => Console.WriteLine(artist.Name));
            }

            Console.WriteLine("Finished");
        }
    }
}
