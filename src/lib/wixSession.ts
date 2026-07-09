import type { AstroCookies } from "astro";
import { auth } from "@wix/essentials";

export const SESSION_COOKIE = "wixSession";

// @wix/astro's middleware reads WIX_CLIENT_ID from the environment; we read the
// same value to stamp the cookie so the middleware accepts it as "our" session.
const CLIENT_ID = import.meta.env.WIX_CLIENT_ID ?? process.env.WIX_CLIENT_ID ?? "";

const cookieOptions = {
  path: "/",
  secure: true,
  ...(import.meta.env.DEV ? { maxAge: 10800, sameSite: "none" as const } : {}),
};

/** Persist member (or visitor) tokens into the wixSession cookie @wix/astro reads. */
export function saveWixSession(cookies: AstroCookies, tokens: unknown) {
  cookies.set(SESSION_COOKIE, { clientId: CLIENT_ID, tokens }, cookieOptions);
}

export function clearWixSession(cookies: AstroCookies) {
  cookies.delete(SESSION_COOKIE, { path: "/" });
}

export interface CurrentMember {
  id: string;
  email: string;
  firstName?: string;
  nickname?: string;
  status?: string;
  avatarUrl?: string;
  initial: string;
}

/** Lightweight logged-in check via token subject type (no @wix/members needed). */
export async function isMemberLoggedIn(): Promise<boolean> {
  try {
    const info: any = await auth.getTokenInfo();
    return info?.subjectType === "MEMBER";
  } catch {
    return false;
  }
}

/** Full current-member profile; null for visitors or if the read is not permitted. */
export async function getCurrentMember(): Promise<CurrentMember | null> {
  try {
    const info: any = await auth.getTokenInfo();
    if (info?.subjectType !== "MEMBER") return null;
  } catch {
    return null;
  }
  try {
    const { members } = await import("@wix/members");
    const res: any = await members.getCurrentMember({ fieldsets: ["FULL"] as any });
    const m = res?.member ?? res;
    if (!m) return null;
    const email = m.loginEmail ?? m.contact?.emails?.[0] ?? "";
    const firstName =
      m.contact?.firstName ?? m.profile?.nickname ?? (email ? email.split("@")[0] : undefined);
    const initial = (firstName || email || "?").trim().charAt(0).toUpperCase() || "?";
    return {
      id: m._id ?? "",
      email,
      firstName,
      nickname: m.profile?.nickname ?? undefined,
      status: m.status ?? undefined,
      avatarUrl: m.profile?.photo?.url ?? undefined,
      initial,
    };
  } catch (err) {
    console.error("[members:getCurrentMember]", err);
    return null;
  }
}
