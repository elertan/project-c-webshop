using backend.Schemas;

namespace backend
{
    public interface IApiErrorable
    {
        ApiError ToApiError();
    }
}