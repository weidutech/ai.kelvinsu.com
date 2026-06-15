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
  const origin = getRequestOrigin(request);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(next)}`,
    },
  });

  // 等待 auth cookies 写入完成，否则 redirect 响应中不会带 Set-Cookie
  await flushCookies();

  let destination: string;
  if (error) {
    destination = withAuthMessage(
      "/signup",
      "error",
      translateAuthError(error.message)
    );
  } else if (data.session) {
    destination = next;
  } else {
    destination = withAuthMessage(
      "/login",
      "message",
      "注册成功，请先去邮箱确认登录链接。确认完成后再回来登录。"
    );
  }

  return NextResponse.redirect(new URL(destination, origin), 303);
}
