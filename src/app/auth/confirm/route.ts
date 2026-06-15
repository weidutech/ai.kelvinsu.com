import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/members";
  const redirectTo = new URL(next.startsWith("/") ? next : "/members", origin);

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    // Give the async onAuthStateChange callback time to persist cookies
    // before the redirect response is committed.
    await new Promise((r) => setTimeout(r, 300));

    if (!error) {
      return NextResponse.redirect(redirectTo);
    }
  }

  return NextResponse.redirect(
    new URL("/login?error=邮箱确认失败，请重新尝试。", origin)
  );
}
