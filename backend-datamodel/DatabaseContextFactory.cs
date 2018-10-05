using System;
using backend_datamodel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace backend_datamodel
{
    public class DatabaseContextFactory : IDesignTimeDbContextFactory<DatabaseContext>
    {
        public DatabaseContext CreateDbContext(string[] args)
        {
		    try
		    {
			    DotNetEnv.Env.Load();
		    }
		    catch (Exception)
		    {
			    Console.Error.WriteLine("Couldn't read the .env file, does one exist?");
		    }

		    var connectionString = DotNetEnv.Env.GetString("DB_CONNECTIONSTRING");
		    Console.WriteLine($"The connection string '{connectionString}' will be used.");

		    var builder = new DbContextOptionsBuilder<DatabaseContext>();
		    builder.UseNpgsql(connectionString);
		    Console.WriteLine("Attempting to connect to the database...");
		    return new DatabaseContext(builder.Options);
        }
    }
}