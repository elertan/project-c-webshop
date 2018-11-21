using System;
using System.Threading.Tasks;

namespace backend_filling_tool_v2
{
    class Program
    {
        static async Task<int> Main(string[] args)
        {
            var logger = new Logger();

            try
            {
                var datasetFetcher = new SpotifyDatasetFetcher(logger);
            }
            catch (Exception ex)
            {
                logger.Log($"Global error handler:\n\n{ex.Message}\n\nThe program will now exit.", LogLevel.Critical);
                return ex.HResult;
            }

            return 0;
        }
    }
}
