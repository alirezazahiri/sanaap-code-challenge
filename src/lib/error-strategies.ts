import { ApiErrorResponse } from "@/types/api";
import {
  BadRequestError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
  UnhandledError,
  ValidationError,
} from "@/types/http-errors";

export type ApiErrorHandler = (errorData: ApiErrorResponse) => never;

export const BadRequestErrorStrategy: ApiErrorHandler = (errorData) => {
  throw {
    title: errorData.message,
    status: errorData.status_code,
    detail: errorData.error_details.fa_details,
  } as BadRequestError;
};

export const ValidationErrorStrategy: ApiErrorHandler = (errorData) => {
  throw {
    title: errorData.message,
    status: errorData.status_code,
    detail: errorData.error_details.fa_details,
  } as ValidationError;
};

export const UnauthorizedErrorStrategy: ApiErrorHandler = (errorData) => {
  throw {
    title: errorData.message,
    status: errorData.status_code,
    detail: "دسترسی به سرویس مورد نظر امکان پذیر نمی باشد",
  } as UnauthorizedError;
};

export const NotFoundErrorStrategy = () => {
  throw {
    detail: "سرویس مورد نظر یافت نشد",
  } as NotFoundError;
};

export const UnhandledErrorStrategy: ApiErrorHandler = (errorData) => {
  throw {
    title: errorData.message,
    status: errorData.status_code,
    detail: "خطای سرور",
  } as UnhandledError;
};

export const NetworkErrorStrategy = () => {
  throw {
    detail: "خطای شبکه",
  } as NetworkError;
};

export const errorHandler: Record<number, ApiErrorHandler> = {
  400: (errorData) =>
    (errorData.error_details
      ? ValidationErrorStrategy
      : BadRequestErrorStrategy)(errorData),
  403: UnauthorizedErrorStrategy,
  404: NotFoundErrorStrategy,
  500: UnhandledErrorStrategy,
};
