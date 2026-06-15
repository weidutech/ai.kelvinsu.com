import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/route";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/members";
  const redirectTo = new URL(next.startsWith("/") ? next : "/members", origin);

  if (code) {
    const { supabase, applyAuthCookies } =
      createRouteHandlerSupabaseClient(request);
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return applyAuthCookies(NextResponse.redirect(redirectTo));
    }
  }

  return NextResponse.redirect(
    new URL("/login?error=邮箱确认失败，请重新尝试。", origin)
  );
}
