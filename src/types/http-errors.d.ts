interface Problem {
  title: string;
  status: number;
  detail?: string;
  errors?: Record<string, string[]>;
}

interface BadRequestError extends Problem {} // 400 (no errors)
interface UnauthorizedError extends Problem {} // 403
interface ValidationError extends Problem {} // 400 (errors)
interface NotFoundError extends Problem {} // 404
interface UnhandledError extends Problem {} // 500
interface NetworkError extends Problem {}

export type {
  Problem,
  BadRequestError,
  UnauthorizedError,
  ValidationError,
  NotFoundError,
  UnhandledError,
  NetworkError,
  ApiError,
};
