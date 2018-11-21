using System;

namespace backend_filling_tool_v2
{
    [Flags]
    public enum LogLevel
    {
        Verbose = 1,
        Normal = 2,
        Warning = 4,
        Critical = 8
    }

    public interface ILogger
    {
        void Log(string message, LogLevel logLevel = LogLevel.Normal);
    }
    
    public class Logger : ILogger
    {
        private readonly LogLevel _logLevel;
        private readonly DateTime _startTime;

        public Logger(LogLevel logLevel = LogLevel.Normal)
        {
            _logLevel = logLevel;
            _startTime = DateTime.Now;
        }
        
        public void Log(string message, LogLevel logLevel = LogLevel.Normal)
        {
            if (logLevel < _logLevel)
            {
                // Don't log if log level is too low
                return;
            }
            
            var timeFromStart = (DateTime.Now - _startTime).ToString("c");
            var logLevelString = logLevel.ToString();

            var data = $"{timeFromStart} [{logLevelString}]: {message}";

            if (logLevel >= LogLevel.Critical)
            {
                Console.ForegroundColor = ConsoleColor.DarkRed;
            }
            else if (logLevel >= LogLevel.Warning)
            {
                Console.ForegroundColor = ConsoleColor.DarkYellow;
            }
            
            Console.WriteLine(data);
            Console.ResetColor();
        }
    }
}