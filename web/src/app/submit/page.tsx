"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import s from "../auth.module.css";

export default function SubmitPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [doneId, setDoneId] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .catch(() => setUser(null))
      .finally(() => setLoadingUser(false));
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        body: new FormData(e.currentTarget),
      });
      const data = (await res.json()) as { ok: boolean; id?: string; error?: string };
      if (!data.ok) {
        setError(data.error ?? "Submission failed");
        return;
      }
      setDoneId(data.id ?? "");
    } catch {
      setError("Network error — please try again");
    } finally {
      setBusy(false);
    }
  }

  if (loadingUser) {
    return (
      <main>
        <div className="container" style={{ paddingBlock: "3rem" }}>
          <p>Loading…</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <div className={`container ${s.wrap}`}>
          <div className={s.card} style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "1.6rem" }}>Sign in required</h1>
            <p className={s.lead}>
              You need a Fair Press author account to submit a manuscript.
            </p>
            <Link href="/login" className="btn" style={{ marginTop: "1rem" }}>
              Sign in / Sign up
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className={`container ${s.wrap}`}>
        <div className={s.card} style={{ maxWidth: 720 }}>
          {doneId ? (
            <>
              <h1 style={{ fontSize: "1.6rem" }}>Submission received</h1>
              <p className={s.success}>
                Your manuscript was received and registered with ID{" "}
                <strong>{doneId}</strong>. You will be contacted at {user.email}.
              </p>
              <Link href="/" className="btn btn-ghost" style={{ marginTop: "1rem" }}>
                Back to home
              </Link>
            </>
          ) : (
            <>
              <h1 style={{ fontSize: "1.6rem" }}>Submit a manuscript</h1>
              <p className={s.lead}>
                Submitting as <strong>{user.name}</strong> ({user.email}) to the
                Fair Press Journal of Science.
              </p>
              <form onSubmit={onSubmit} style={{ marginTop: "1.25rem" }}>
                <div className={s.field}>
                  <label htmlFor="title">Manuscript title</label>
                  <input
                    id="title"
                    name="title"
                    className={s.input}
                    minLength={10}
                    required
                    placeholder="Full title of your manuscript"
                  />
                </div>
                <div className={s.field}>
                  <label htmlFor="type">Article type</label>
                  <select id="type" name="type" className={s.input} required defaultValue="Research Article">
                    <option value="Research Article">Research Article</option>
                    <option value="Review">Review</option>
                    <option value="Short Communication">Short Communication</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label htmlFor="keywords">Keywords</label>
                  <input
                    id="keywords"
                    name="keywords"
                    className={s.input}
                    placeholder="e.g. telemedicine; hypertension; rural health"
                  />
                </div>
                <div className={s.field}>
                  <label htmlFor="abstract">Abstract</label>
                  <textarea
                    id="abstract"
                    name="abstract"
                    className={s.input}
                    rows={7}
                    minLength={50}
                    required
                    placeholder="Structured or unstructured abstract (min. 50 characters)"
                  />
                </div>
                <div className={s.field}>
                  <label htmlFor="notes">Notes to the editor (optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    className={s.input}
                    rows={3}
                    placeholder="Cover letter notes, reviewer suggestions…"
                  />
                </div>
                <button type="submit" className={`btn ${s.full}`} disabled={busy}>
                  {busy ? "Submitting…" : "Submit manuscript"}
                </button>
                {error && (
                  <p className={s.error} role="alert">
                    {error}
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
