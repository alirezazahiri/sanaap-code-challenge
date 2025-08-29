import { jwtDecode } from "jwt-decode";

export const decodeJwtToken = <T>(token: string) =>
  jwtDecode<T>(token);
