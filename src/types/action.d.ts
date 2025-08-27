export type ServerActionState<T> = {
  success: boolean;
  response?: T;
  error?: string;
};

export type Action<T> = (
  data: ServerActionState<T> | null,
  formData: FormData
) => ServerActionState<T> | Promise<ServerActionState<T> | null> | null;
