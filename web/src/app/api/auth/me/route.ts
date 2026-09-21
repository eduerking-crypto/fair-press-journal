import { currentUser } from "@/lib/server/auth";

export const runtime = "nodejs";

export async function GET() {
  const user = await currentUser();
  return Response.json({ user });
}
