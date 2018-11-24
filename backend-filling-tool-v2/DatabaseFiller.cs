using System;
using System.Linq;
using System.Threading.Tasks;
using backend_datamodel.Models;
using Microsoft.EntityFrameworkCore;

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
        }
    }
}