import { JwtAccessTokenPayload } from "@/types/token";
import { decodeJwtToken } from "./jwt";
import { cookies } from "next/headers";
import { env } from "@/config/env";

export type SessionData = JwtAccessTokenPayload & {
  accessToken: string;
  refreshToken: string;
};

// TODO: session encryption and decryption
export const setSession = async (accessToken: string, refreshToken: string) => {
  const accessTokenPayload = decodeJwtToken<JwtAccessTokenPayload>(accessToken);

  const sessionData = {
    ...accessTokenPayload,
    accessToken,
    refreshToken,
  };

  // set to cookies
  const cookieStore = await cookies();
  cookieStore.set("session", JSON.stringify(sessionData), {
    httpOnly: true,
    sameSite: "strict",
    secure: env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
};
