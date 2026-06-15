import { NextResponse } from "next/server";
import { createServerSupabaseClient, flushCookies } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/members";
  const redirectTo = new URL(next.startsWith("/") ? next : "/members", origin);

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    // 等待 auth cookies 写入完成
    await flushCookies();

    if (!error) {
      return NextResponse.redirect(redirectTo);
    }
  }

  return NextResponse.redirect(
    new URL("/login?error=邮箱确认失败，请重新尝试。", origin)
  );
}
