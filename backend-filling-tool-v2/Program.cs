using System;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace backend_filling_tool_v2
{
    class Program
    {
        static async Task<int> Main(string[] args)
        {
            var serviceCollection = new ServiceCollection();
            RegisterServices(serviceCollection);
            var serviceProvider = serviceCollection.BuildServiceProvider();

            var logger = serviceProvider.GetService<ILogger>();
            
            try
            {
                var datasetFetcher = serviceProvider.GetService<ISpotifyDatasetFetcher>();
                
            }
            catch (Exception ex)
            {
                logger.Log($"Global error handler:\n\n{ex.Message}\n\nThe program will now exit.", LogLevel.Critical);
                return ex.HResult;
            }

            return 0;
        }

        static void RegisterServices(ServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<ILogger, Logger>();
            serviceCollection.AddSingleton<ISpotifyAPI, SpotifyAPI>();
            serviceCollection.AddSingleton<ISpotifyDatasetFetcher, SpotifyDatasetFetcher>();
        }
    }
}
