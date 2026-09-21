"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import s from "../auth.module.css";

type Mode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Network error — please try again");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <div className={`container ${s.wrap}`}>
        <div className={s.card}>
          <h1 style={{ fontSize: "1.6rem" }}>Author account</h1>
          <p className={s.lead}>
            Sign in or create an account to submit and track your manuscripts.
          </p>

          <div className={s.tabs} role="tablist" aria-label="Authentication mode">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "login"}
              className={`${s.tab} ${mode === "login" ? s.tabActive : ""}`}
              onClick={() => setMode("login")}
            >
              Sign in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "register"}
              className={`${s.tab} ${mode === "register" ? s.tabActive : ""}`}
              onClick={() => setMode("register")}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={onSubmit}>
            {mode === "register" && (
              <div className={s.field}>
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  className={s.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
            )}
            <div className={s.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={s.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className={s.field}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className={s.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                minLength={mode === "register" ? 8 : undefined}
                required
              />
              {mode === "register" && (
                <span style={{ fontSize: "0.8rem", color: "var(--ink-soft)" }}>
                  Minimum 8 characters.
                </span>
              )}
            </div>

            <button type="submit" className={`btn ${s.full}`} disabled={busy}>
              {busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
            </button>
            {error && (
              <p className={s.error} role="alert">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
