import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * Minimal single-admin session auth - no new auth dependency, matches this
 * project's preference for small, auditable abstractions (see carrier.ts,
 * sms.ts). Not meant to scale to multiple admin accounts; if that's ever
 * needed, replace this with a real auth library rather than extending it.
 *
 * Session token shape: "<expiryMs>.<hmacHex>", HMAC-SHA256 signed with
 * ADMIN_SESSION_SECRET (kept separate from ADMIN_PASSWORD so rotating the
 * login password doesn't require re-deriving a signing key, and vice versa).
 *
 * Defense in depth: proxy.ts is the primary gate for /admin/**, but per
 * Next.js's own docs a matcher change can silently stop covering a route -
 * every Server Action under /admin must also call assertAdminSession()
 * itself rather than trusting proxy alone.
 */

export const ADMIN_SESSION_COOKIE = "srh_admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set - admin auth cannot run without it (see .env.example).",
    );
  }
  return secret;
}

function sign(expiryMs: number): string {
  return createHmac("sha256", getSessionSecret()).update(String(expiryMs)).digest("hex");
}

export function createSessionToken(): string {
  const expiryMs = Date.now() + SESSION_TTL_MS;
  return `${expiryMs}.${sign(expiryMs)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [expiryPart, signaturePart] = token.split(".");
  if (!expiryPart || !signaturePart) return false;

  const expiryMs = Number(expiryPart);
  if (!Number.isFinite(expiryMs) || expiryMs < Date.now()) return false;

  const expected = sign(expiryMs);
  const a = Buffer.from(signaturePart);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * Call at the top of every admin Server Action, before any read or write.
 * proxy.ts is the primary gate for page navigation, but Server Functions
 * are POSTs to their own route and a future matcher change could silently
 * stop covering them (see Next.js's own proxy.ts docs) - this is the
 * defense-in-depth check that doesn't depend on proxy.ts at all.
 */
export async function assertAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    throw new Error("Yetkisiz: admin oturumu geçersiz veya süresi dolmuş.");
  }
}

/** Constant-time password check against ADMIN_PASSWORD. Never compare with === directly. */
export function checkAdminPassword(candidate: string): boolean {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false; // misconfigured - fail closed, never allow a default/bypass
  const a = Buffer.from(candidate);
  const b = Buffer.from(real);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
