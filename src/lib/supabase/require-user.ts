import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function requireUser(nextPath: string) {
  const supabase = await createServerSupabaseClient();

  // 用 getSession() 代替 getClaims() / getUser()：
  // - getSession() 从 cookie 读取 session，仅在 token 过期时才发起网络刷新
  // - getClaims() 会尝试获取 JWK 验签，在 serverless 环境下容易超时
  // - getUser() 每次都请求 Supabase Auth API，在 serverless 环境下同样不可靠
  // - 中间件已经负责了 token 刷新，Server Component 只需读取 cookie 中的 session
  const { data } = await supabase.auth.getSession();
  const user = data?.session?.user ?? null;

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  return { supabase, user };
}
