import { SessionData } from "@/lib/set-session";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("session");

  const session = JSON.parse(accessToken?.value || "{}") as SessionData;

  return Response.json(session);
}
