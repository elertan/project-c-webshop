using System.Collections.Generic;

namespace backend.Schemas
{
    public class ApiResult<T>
    {
        public T Data { get; set; }
        public IEnumerable<ApiError> Errors { get; set; }
    }
}