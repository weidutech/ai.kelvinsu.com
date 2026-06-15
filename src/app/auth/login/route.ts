import { NextResponse } from "next/server";
import { createServerSupabaseClient, flushCookies } from "@/lib/supabase/server";
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

  // 等待 auth cookies 写入完成，否则 redirect 响应中不会带 Set-Cookie
  await flushCookies();

  const destination = error
    ? withAuthMessage("/login", "error", translateAuthError(error.message))
    : next;

  return NextResponse.redirect(
    new URL(destination, getRequestOrigin(request)),
    303
  );
}
