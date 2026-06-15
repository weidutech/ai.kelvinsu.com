import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/route";

export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url);
  const { supabase, applyAuthCookies } =
    createRouteHandlerSupabaseClient(request);
  await supabase.auth.signOut();

  return applyAuthCookies(
    NextResponse.redirect(
      new URL("/login?message=你已经安全退出。", origin)
    )
  );
}
