import { randomBytes } from "node:crypto";
import { currentUser } from "@/lib/server/auth";
import { readJson, writeJson } from "@/lib/server/store";

export const runtime = "nodejs";

interface Submission {
  id: string;
  userId: string;
  journal: string;
  type: string;
  title: string;
  keywords: string;
  abstract: string;
  notes?: string;
  status: "received";
  createdAt: string;
}

const ALLOWED_TYPES = ["Research Article", "Review", "Short Communication"];

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) {
    return Response.json(
      { ok: false, error: "You must sign in to submit a manuscript" },
      { status: 401 },
    );
  }
  const form = await req.formData().catch(() => null);
  if (!form) {
    return Response.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }
  const title = String(form.get("title") ?? "").trim();
  const abstract = String(form.get("abstract") ?? "").trim();
  const type = String(form.get("type") ?? "");
  const keywords = String(form.get("keywords") ?? "").trim();
  const notes = String(form.get("notes") ?? "").trim();

  if (title.length < 10) {
    return Response.json({ ok: false, error: "Title must be at least 10 characters" }, { status: 400 });
  }
  if (abstract.length < 50) {
    return Response.json({ ok: false, error: "Abstract must be at least 50 characters" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(type)) {
    return Response.json({ ok: false, error: "Invalid article type" }, { status: 400 });
  }

  const year = new Date().getFullYear();
  const seq = randomBytes(3).toString("hex").toUpperCase();
  const submission: Submission = {
    id: `FP-${year}-${seq}`,
    userId: user.id,
    journal: "fpjs",
    type,
    title,
    keywords,
    abstract,
    notes: notes || undefined,
    status: "received",
    createdAt: new Date().toISOString(),
  };
  const data = readJson<{ submissions: Submission[] }>("submissions.json", { submissions: [] });
  data.submissions.push(submission);
  writeJson("submissions.json", data);

  return Response.json({ ok: true, id: submission.id });
}
