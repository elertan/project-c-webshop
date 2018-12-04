using System;
using System.Collections.Generic;
using backend.Schemas;

namespace backend
{
    public static class ExtensionMethods
    {
        public static ApiResult<T> ToApiResult<T>(this Exception ex)
        {
            var errors = new List<ApiError>();

            if (ex is IApiErrorable apiEx)
            {
                errors.Add(apiEx.ToApiError());
            }
            else
            {
                errors.Add(new ApiError { Message = ex.Message });
            }
            
            return new ApiResult<T> { Errors = errors };
        }
    }
}