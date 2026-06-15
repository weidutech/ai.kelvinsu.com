"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient, flushCookies } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/supabase/env";
import {
  safeNextPath,
  translateAuthError,
  withAuthMessage,
} from "@/lib/supabase/auth-form";

export async function signupAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = safeNextPath(formData.get("next"));
  const supabase = await createServerSupabaseClient();
  const origin = getSiteUrl();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(next)}`,
    },
  });

  // 等待 auth cookies 写入完成（注册自动确认时需要）
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

  redirect(destination);
}
