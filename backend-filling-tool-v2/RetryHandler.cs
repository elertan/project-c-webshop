using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace backend_filling_tool_v2
{
    public class RetryHandler : DelegatingHandler
    {
        public RetryHandler(HttpMessageHandler innerHandler)
            : base(innerHandler)
        { }

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
                // https://developer.spotify.com/documentation/web-api/#rate-limiting
                if (response.StatusCode != HttpStatusCode.TooManyRequests) throw;
                
                var retryAfter = response.Headers.RetryAfter;
                await Task.Delay(retryAfter.Delta.Value, cancellationToken);
                    
                return await SendAsync(request, cancellationToken);
            }
        }
    }
}