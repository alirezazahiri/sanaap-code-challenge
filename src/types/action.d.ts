export type ServerActionState<T> = {
  success: boolean;
  response?: T;
  error?: string;
};

export type Action<T, D = FormData> = (
  data: ServerActionState<T> | null,
  payload: D
) => ServerActionState<T> | Promise<ServerActionState<T> | null> | null;
