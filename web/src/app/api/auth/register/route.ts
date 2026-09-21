import { registerUser } from "@/lib/server/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const { name, email, password } = (body ?? {}) as Record<string, string>;
  if (!name || !email || !password) {
    return Response.json({ ok: false, error: "Name, email and password are required" }, { status: 400 });
  }
  const result = await registerUser(name, email, password);
  if (!result.ok) return Response.json(result, { status: 400 });
  return Response.json({ ok: true });
}
