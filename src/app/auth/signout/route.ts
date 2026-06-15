import { NextResponse } from "next/server";
import { createServerSupabaseClient, flushCookies } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();

  // 等待 auth cookies 清除完成
  await flushCookies();

  return NextResponse.redirect(
    new URL("/login?message=你已经安全退出。", origin)
  );
}
