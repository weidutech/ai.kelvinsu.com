import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function requireUser(nextPath: string) {
  const supabase = await createServerSupabaseClient();

  // 用 getClaims() 代替 getUser()：
  // - getClaims() 只在本地解码 JWT，不需要网络请求
  // - getUser() 会请求 Supabase Auth API，在 serverless 环境下可能超时或失败
  // - 中间件已经负责了 token 刷新，Server Component 只需验证 JWT 有效性
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  // 将 JWT claims 映射为兼容 User 对象的结构，
  // 确保 user.id / user.email 等调用方不需要改动
  const user = {
    id: claims!.sub,
    email: (claims as Record<string, unknown>).email as string | undefined,
  };

  return { supabase, user };
}
