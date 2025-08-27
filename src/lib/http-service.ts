import { env } from "@/config/env";
import { ApiError } from "@/types/http-errors";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import { NetworkErrorStrategy, errorHandler } from "./error-strategies";

export const httpService = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpService.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const error = err as AxiosError;
    if (error?.response) {
      const statusCode = error?.response.status;
      if (statusCode >= 400) {
        const errorData: ApiError = error.response?.data as ApiError;
        errorHandler[statusCode](errorData);
      }
    } else {
      NetworkErrorStrategy();
    }
  }
);

async function apiBase<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse = await httpService(url, options);
  return response.data as T;
}

async function GET<T>(url: string, headers?: AxiosRequestHeaders): Promise<T> {
  const options: AxiosRequestConfig = {
    headers,
    method: "GET",
  };

  return await apiBase<T>(url, options);
}

async function POST<TModel, TResult>(
  url: string,
  data: TModel,
  headers?: AxiosRequestHeaders
): Promise<TResult> {
  const options: AxiosRequestConfig = {
    headers,
    method: "POST",
    data: JSON.stringify(data),
  };
  return await apiBase<TResult>(url, options);
}

async function PUT<TModel, TResult>(
  url: string,
  data: TModel,
  headers?: AxiosRequestHeaders
): Promise<TResult> {
  const options: AxiosRequestConfig = {
    headers,
    method: "PUT",
    data: JSON.stringify(data),
  };
  return await apiBase<TResult>(url, options);
}

async function PATCH<TModel, TResult>(
  url: string,
  data: TModel,
  headers?: AxiosRequestHeaders
): Promise<TResult> {
  const options: AxiosRequestConfig = {
    headers,
    method: "PATCH",
    data: JSON.stringify(data),
  };
  return await apiBase<TResult>(url, options);
}

async function DELETE<T>(
  url: string,
  headers?: AxiosRequestHeaders
): Promise<void> {
  const options: AxiosRequestConfig = {
    method: "DELETE",
    headers,
  };

  return await apiBase<void>(url, options);
}

export { POST, GET, PUT, PATCH, DELETE };
