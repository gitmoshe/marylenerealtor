import { createHash, timingSafeEqual } from "node:crypto";
import { useSession } from "@tanstack/react-start/server";

export type AdminSession = { unlocked?: boolean };

export const adminSessionConfig = {
  password: process.env["SESSION_SECRET"] ?? "",
  name: "marylene-admin",
  maxAge: 60 * 60 * 12,
  cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
};

function digest(value: string) {
  return createHash("sha256").update(value, "utf8").digest();
}

export function passwordMatches(input: string, expected: string): boolean {
  return timingSafeEqual(digest(input), digest(expected));
}

export async function isUnlocked(): Promise<boolean> {
  const session = await useSession<AdminSession>({
    ...adminSessionConfig,
    password: process.env["SESSION_SECRET"] ?? "",
  });
  return session.data.unlocked === true;
}

export async function requireAdmin(): Promise<void> {
  if (!(await isUnlocked())) throw new Error("Not authorised");
}
