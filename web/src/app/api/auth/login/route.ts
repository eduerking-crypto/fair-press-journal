import { loginUser } from "@/lib/server/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const { email, password } = (body ?? {}) as Record<string, string>;
  if (!email || !password) {
    return Response.json({ ok: false, error: "Email and password are required" }, { status: 400 });
  }
  const result = await loginUser(email, password);
  if (!result.ok) return Response.json(result, { status: 401 });
  return Response.json({ ok: true });
}
