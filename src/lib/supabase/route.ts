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
    const written: string[] = [];
    pendingCookies.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options);
      // 临时诊断：记录每个 cookie 的 name + options，方便排查 Vercel 登录态丢失
      written.push(
        `${name}{path:${options?.path ?? "?"},domain:${(options as Record<string, unknown> | undefined)?.domain ?? "host"},sameSite:${(options as Record<string, unknown> | undefined)?.sameSite ?? "?"},secure:${(options as Record<string, unknown> | undefined)?.secure ?? "?"},len:${value.length}}`
      );
    });
    if (written.length > 0) {
      response.headers.set("X-Debug-Auth-Cookies", written.join(" | "));
    } else {
      response.headers.set("X-Debug-Auth-Cookies", "NONE(supabase did not set any cookie)");
    }
    pendingHeaders.forEach((value, key) => {
      response.headers.set(key, value);
    });
    return response;
  }

  return { supabase, applyAuthCookies };
}
