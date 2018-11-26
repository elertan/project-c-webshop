using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace backend_filling_tool_v2
{
    public class RetryHandler : DelegatingHandler
    {
        private ILogger _logger;

        public RetryHandler(HttpMessageHandler innerHandler)
            : base(innerHandler)
        {
            _logger = Program.ServiceProvider.GetService<ILogger>();
        }

        protected override async Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            var response = await base.SendAsync(request, cancellationToken);
            try
            {
                response.EnsureSuccessStatusCode();
                return response;
            }
            catch
            {
                switch (response.StatusCode)
                {
                    case HttpStatusCode.BadRequest:
                        _logger.Log($"Bad request: {request.RequestUri}", LogLevel.Warning);
                        throw;
                    case HttpStatusCode.RequestUriTooLong:
                        _logger.Log($"Request URI too long: {request.RequestUri}", LogLevel.Warning);
                        throw;
                }

                // https://developer.spotify.com/documentation/web-api/#rate-limiting
                if (response.StatusCode != HttpStatusCode.TooManyRequests) throw;
                
                var retryAfter = response.Headers.RetryAfter;
                _logger.Log($"Halting request \"{request.RequestUri}\" for {retryAfter.Delta.Value:c} due too many request");
                await Task.Delay(retryAfter.Delta.Value, cancellationToken);
                    
                return await SendAsync(request, cancellationToken);
            }
        }
    }
}