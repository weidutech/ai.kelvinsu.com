import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/route";
import {
  getRequestOrigin,
  safeNextPath,
  translateAuthError,
  withAuthMessage,
} from "@/lib/supabase/auth-form";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = safeNextPath(formData.get("next"));
  const { supabase, applyAuthCookies } =
    createRouteHandlerSupabaseClient(request);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const destination = error
    ? withAuthMessage("/login", "error", translateAuthError(error.message))
    : next;

  return applyAuthCookies(
    NextResponse.redirect(
      new URL(destination, getRequestOrigin(request)),
      303
    )
  );
}
