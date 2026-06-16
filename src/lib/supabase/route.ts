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

  // createServerClient 的 onAuthStateChange 回调是异步触发的，
  // signInWithPassword / signUp 等 auth 方法 resolve 时 setAll 可能还没被调用。
  // 用 Promise 等待 setAll 完成后再构建响应，确保 cookie 写入 Set-Cookie 头。
  let resolveSetAll: (() => void) | null = null;
  const setAllCalled = new Promise<void>((resolve) => {
    resolveSetAll = resolve;
  });

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
        resolveSetAll?.();
      },
    },
  });

  /**
   * 等待 onAuthStateChange 的 setAll 回调完成，
   * 然后将收集到的 cookie 写入响应的 Set-Cookie 头。
   * 超时 5 秒后放弃等待，避免 serverless 函数挂起。
   */
  async function applyAuthCookies(
    response: NextResponse,
    options: { waitForCookies?: boolean } = {}
  ) {
    const { waitForCookies = true } = options;

    if (waitForCookies) {
      await Promise.race([
        setAllCalled,
        new Promise<void>((r) => setTimeout(r, 5000)),
      ]);
    }

    pendingCookies.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options);
    });
    pendingHeaders.forEach((value, key) => {
      response.headers.set(key, value);
    });
    return response;
  }

  function pendingAuthCookieCount() {
    return pendingCookies.size;
  }

  return { supabase, applyAuthCookies, pendingAuthCookieCount };
}
