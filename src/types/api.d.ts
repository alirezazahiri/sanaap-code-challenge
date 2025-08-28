export type ApiResponse<T> = {
  status_code: number;
  message: string;
  is_success: boolean;
  response?: T;
  error_details?: {
    type: string;
    code: string;
    detail: string;
    attr: string;
    fa_details: string;
  };
};

export type ApiErrorResponse = Omit<
  Required<ApiResponse<null>>,
  "is_success"
> & { is_success: false };
