import { logoutUser } from "@/lib/server/auth";

export const runtime = "nodejs";

export async function POST() {
  await logoutUser();
  return Response.json({ ok: true });
}
