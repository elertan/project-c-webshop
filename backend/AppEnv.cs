namespace backend
{
    public interface IAppEnv
    {
        string DbConnectionString { get; }
        string JwtSecret { get; }
    }
    
    public class AppEnv : IAppEnv
    {
        public string DbConnectionString { get; set; }
        public string JwtSecret { get; set; }
    }
}