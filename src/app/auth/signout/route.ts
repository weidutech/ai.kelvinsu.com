import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  // Give the async onAuthStateChange callback time to clear auth cookies
  // before the redirect response is committed.
  await new Promise((r) => setTimeout(r, 300));
  return NextResponse.redirect(
    new URL("/login?message=你已经安全退出。", origin)
  );
}
