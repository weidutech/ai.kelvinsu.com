import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/env";

/**
 * 用于 Server Component / requireUser：只读 cookie 验证登录态。
 *
 * 写 cookie（登录/登出/刷新）由 Route Handler 通过
 * createRouteHandlerSupabaseClient + applyAuthCookies 显式写到响应上，
 * 不依赖 next/headers 的隐式合并（在 Vercel serverless 下对 redirect
 * 响应不可靠，会导致 Set-Cookie 丢失）。
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  const { url, publishableKey } = getSupabaseEnv();

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Component 在渲染期不能写 cookie；这里只读，
          // 真正的写入由 Route Handler 负责。
        }
      },
    },
  });
}
