using System.Threading.Tasks;
using Xunit;

namespace backend_filling_tool_v2.Tests
{
    public class DatabaseFillerTests
    {
        class EnvVariables : IEnvVariables
        {
            public string DbConnectionString { get; set; } = "Server=localhost;Database=project-c-webshop;";
            public string SpotifyClientId { get; set; }
            public string SpotifyClientSecret { get; set; }
        }
        
        [Fact]
        public async Task Should_Work_Fine_For_Filling_Empty_Data()
        {
            var filler = new DatabaseFiller(new Logger(), new EnvVariables());

            await Record.ExceptionAsync(() => filler.FillWith(new SpotifyDataset()));
        }
    }
}