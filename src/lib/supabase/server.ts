import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/env";

/**
 * @supabase/ssr 的 onAuthStateChange 回调是异步的，但 Supabase 客户端
 * 内部不会 await 它。这意味着 signInWithPassword / signUp 等方法在
 * cookies 实际写入响应之前就 resolve 了，导致后续的 redirect 响应中
 * 没有 Set-Cookie 头，浏览器不会保存认证 cookies。
 *
 * 解决方案：拦截 setAll 调用，捕获其返回的 Promise，然后在 auth 操作
 * 之后通过 flushCookies() 显式等待 cookies 写入完成。
 */

let _pendingSetAll: Promise<void> | null = null;

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  const { url, publishableKey } = getSupabaseEnv();

  _pendingSetAll = null;

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        const promise = (async () => {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components can read cookies during render, but writes
            // need to happen in the proxy/route handler path.
          }
        })();
        _pendingSetAll = promise.then(() => {
          _pendingSetAll = null;
        });
      },
    },
  });
}

/**
 * 等待 Supabase 客户端的 auth cookies 写入完成。
 * 必须在 signInWithPassword / signUp / signOut / exchangeCodeForSession
 * 之后、redirect() 之前调用。
 */
export async function flushCookies(): Promise<void> {
  // 给 onAuthStateChange handler 一点时间启动（如果还没有启动的话）
  await new Promise((r) => setTimeout(r, 50));

  if (_pendingSetAll) {
    await _pendingSetAll;
    _pendingSetAll = null;
  }
}
