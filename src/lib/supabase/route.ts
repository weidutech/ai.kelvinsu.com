import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

type PendingCookie = {
  name: string;
  value: string;
  options: CookieOptions;
};

const authCacheHeaders = {
  "Cache-Control": "private, no-cache, no-store, must-revalidate, max-age=0",
  Expires: "0",
  Pragma: "no-cache",
};

export function createRouteHandlerSupabaseClient(request: NextRequest) {
  const { url, publishableKey } = getSupabaseEnv();
  const pendingCookies = new Map<string, PendingCookie>();
  const pendingHeaders = new Map<string, string>(
    Object.entries(authCacheHeaders)
  );

  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach((cookie) => {
          pendingCookies.set(cookie.name, cookie);
        });
        Object.entries(headers).forEach(([key, value]) => {
          pendingHeaders.set(key, value);
        });
      },
    },
  });

  function applyAuthCookies(response: NextResponse) {
    pendingCookies.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options);
    });
    pendingHeaders.forEach((value, key) => {
      response.headers.set(key, value);
    });
    return response;
  }

  return { supabase, applyAuthCookies };
}
