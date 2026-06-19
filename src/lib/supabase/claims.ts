import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

export type AuthClaims = {
  sub?: string;
  email?: string | null;
};

export async function getOptionalServerUserClaims(): Promise<AuthClaims | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      return null;
    }

    if (session.expires_at && session.expires_at * 1000 <= Date.now()) {
      return null;
    }

    if (session.user) {
      return {
        sub: session.user.id,
        email: session.user.email,
      };
    }

    return null;
  } catch {
    // Completely swallow all unexpected auth errors
    // to prevent Next.js from crashing the entire layout.
    return null;
  }
}

type SessionLike = {
  expires_at?: number;
  access_token?: string;
  user?: {
    id?: string;
    email?: string | null;
  } | null;
};

function getSupabaseStorageKey() {
  const { url } = getSupabaseEnv();
  return `sb-${new URL(url).hostname.split(".")[0]}-auth-token`;
}

function readChunkedCookieValue(
  allCookies: { name: string; value: string }[],
  key: string,
) {
  const exact = allCookies.find((cookie) => cookie.name === key);
  if (exact?.value) {
    return exact.value;
  }

  const chunks = allCookies
    .filter((cookie) => cookie.name.startsWith(`${key}.`))
    .sort((a, b) => {
      const aIndex = Number(a.name.slice(key.length + 1));
      const bIndex = Number(b.name.slice(key.length + 1));
      return aIndex - bIndex;
    });

  if (chunks.length === 0) {
    return null;
  }

  return chunks.map((chunk) => chunk.value).join("");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function parseSessionLike(rawValue: string): SessionLike | null {
  try {
    const decoded = rawValue.startsWith("base64-")
      ? decodeBase64Url(rawValue.slice("base64-".length))
      : rawValue;

    return JSON.parse(decoded) as SessionLike;
  } catch {
    return null;
  }
}

function parseJwtClaims(token?: string): AuthClaims | null {
  if (!token) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length < 2) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(parts[1])) as {
      sub?: string;
      email?: string | null;
      exp?: number;
    };

    if (payload.exp && payload.exp * 1000 <= Date.now()) {
      return null;
    }

    return {
      sub: payload.sub,
      email: payload.email ?? null,
    };
  } catch {
    return null;
  }
}

export async function getOptionalNavbarUserClaims(): Promise<AuthClaims | null> {
  try {
    const cookieStore = await cookies();
    const storageKey = getSupabaseStorageKey();
    const rawValue = readChunkedCookieValue(cookieStore.getAll(), storageKey);

    if (!rawValue) {
      return null;
    }

    const session = parseSessionLike(rawValue);
    if (!session) {
      return null;
    }

    if (session.expires_at && session.expires_at * 1000 <= Date.now()) {
      return null;
    }

    if (session.user?.id || session.user?.email) {
      return {
        sub: session.user?.id,
        email: session.user?.email ?? null,
      };
    }

    return parseJwtClaims(session.access_token);
  } catch {
    return null;
  }
}
