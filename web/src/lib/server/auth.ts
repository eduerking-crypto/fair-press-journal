import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { readJson, writeJson } from "./store";

export const SESSION_COOKIE = "fp_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  hash: string; // scrypt: salt:hash (hex)
  createdAt: string;
}

interface UsersFile {
  users: StoredUser[];
}

interface SessionsFile {
  sessions: { token: string; userId: string; expiresAt: number }[];
}

function validEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  return timingSafeEqual(candidate, Buffer.from(hash, "hex"));
}

function getUsers(): UsersFile {
  return readJson<UsersFile>("users.json", { users: [] });
}

function getSessions(): SessionsFile {
  return readJson<SessionsFile>("sessions.json", { sessions: [] });
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<{ ok: boolean; error?: string }> {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanName) return { ok: false, error: "Name is required" };
  if (!validEmail(cleanEmail)) return { ok: false, error: "Invalid email address" };
  if (password.length < 8)
    return { ok: false, error: "Password must be at least 8 characters" };

  const data = getUsers();
  if (data.users.some((u) => u.email === cleanEmail)) {
    return { ok: false, error: "An account with this email already exists" };
  }
  const user: StoredUser = {
    id: randomBytes(8).toString("hex"),
    name: cleanName,
    email: cleanEmail,
    hash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  data.users.push(user);
  writeJson("users.json", data);
  await createSession(user.id);
  return { ok: true };
}

export async function loginUser(
  email: string,
  password: string,
): Promise<{ ok: boolean; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const user = getUsers().users.find((u) => u.email === cleanEmail);
  if (!user || !verifyPassword(password, user.hash)) {
    return { ok: false, error: "Invalid email or password" };
  }
  await createSession(user.id);
  return { ok: true };
}

async function createSession(userId: string): Promise<void> {
  const data = getSessions();
  const token = randomBytes(24).toString("hex");
  data.sessions = data.sessions.filter((s) => s.expiresAt > Date.now());
  data.sessions.push({ token, userId, expiresAt: Date.now() + SESSION_TTL_MS });
  writeJson("sessions.json", data);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function logoutUser(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) {
    const data = getSessions();
    data.sessions = data.sessions.filter((s) => s.token !== token);
    writeJson("sessions.json", data);
  }
  jar.delete(SESSION_COOKIE);
}

export async function currentUser(): Promise<Pick<StoredUser, "id" | "name" | "email"> | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const sessions = getSessions().sessions.filter((s) => s.expiresAt > Date.now());
  const session = sessions.find((s) => s.token === token);
  if (!session) return null;
  const user = getUsers().users.find((u) => u.id === session.userId);
  if (!user) return null;
  return { id: user.id, name: user.name, email: user.email };
}
