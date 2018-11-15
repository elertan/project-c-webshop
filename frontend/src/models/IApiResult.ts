import IApiError from "./IApiError";

interface IApiResult<T> {
  data?: T;
  errors?: IApiError[];
}

export default IApiResult;
