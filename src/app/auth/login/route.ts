import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  getRequestOrigin,
  safeNextPath,
  translateAuthError,
  withAuthMessage,
} from "@/lib/supabase/auth-form";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = safeNextPath(formData.get("next"));
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const destination = error
    ? withAuthMessage("/login", "error", translateAuthError(error.message))
    : next;

  return NextResponse.redirect(
    new URL(destination, getRequestOrigin(request)),
    303
  );
}
