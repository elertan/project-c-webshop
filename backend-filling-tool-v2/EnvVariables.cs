using System;
using DotNetEnv;

namespace backend_filling_tool_v2
{
    public interface IEnvVariables
    {
        string DbConnectionString { get; }
        string SpotifyClientId { get; }
        string SpotifyClientSecret { get; }
    }
    
    public class EnvVariables : IEnvVariables
    {
        private const string DbConnectionStringEnvName = "DB_CONNECTIONSTRING";
        public string DbConnectionString { get; set; }
        private const string SpotifyClientIdEnvName = "SPOTIFY_CLIENT_ID";
        public string SpotifyClientId { get; set; }
        private const string SpotifyClientSecretEnvName = "SPOTIFY_CLIENT_SECRET";
        public string SpotifyClientSecret { get; set; }

        public EnvVariables(ILogger logger)
        {
            logger.Log("Reading .env variables", LogLevel.Verbose);

            try
            {
                Env.Load();
            }
            catch
            {
                throw new Exception("Could not load .env file, does it exist?");
            }
            
            DbConnectionString = Env.GetString(DbConnectionStringEnvName, string.Empty);
            if (string.IsNullOrWhiteSpace(DbConnectionString))
            {
                throw new EnvVariableDoesNotExistException(DbConnectionStringEnvName);
            }
            SpotifyClientId = Env.GetString(SpotifyClientIdEnvName, string.Empty);
            if (string.IsNullOrWhiteSpace(SpotifyClientId))
            {
                throw new EnvVariableDoesNotExistException(SpotifyClientIdEnvName);
            }
            SpotifyClientSecret = Env.GetString(SpotifyClientSecretEnvName, string.Empty);
            if (string.IsNullOrWhiteSpace(SpotifyClientSecret))
            {
                throw new EnvVariableDoesNotExistException(SpotifyClientSecretEnvName);
            }
            
            logger.Log("Reading .env variables finished", LogLevel.Verbose);
        }
    }

    public class EnvVariableDoesNotExistException : Exception
    {
        public EnvVariableDoesNotExistException(string variableName) : base($"{variableName} does not exist in the .env file")
        {
        }
    }
}