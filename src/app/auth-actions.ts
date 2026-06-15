"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/supabase/env";

function withMessage(pathname: string, key: "error" | "message", value: string) {
  const params = new URLSearchParams({ [key]: value });
  return `${pathname}?${params.toString()}`;
}

function safeNextPath(next: FormDataEntryValue | null) {
  if (typeof next !== "string" || !next.startsWith("/")) {
    return "/members";
  }

  return next;
}

function translateAuthError(message: string) {
  const waitMatch = message.match(/after\s+(\d+)\s+seconds?/i);
  if (waitMatch) {
    return `请求太频繁了，请在 ${waitMatch[1]} 秒后再试。`;
  }

  if (/rate\s*limit/i.test(message) || /email rate limit/i.test(message)) {
    return "邮件发送过于频繁，请稍等几分钟后再试，或换一个邮箱。";
  }

  if (message === "Invalid login credentials") {
    return "邮箱或密码不正确，请重新检查。";
  }

  if (message === "Email not confirmed") {
    return "这个邮箱还没有完成确认，请先去邮箱点击确认链接。";
  }

  if (message === "User already registered") {
    return "这个邮箱已经注册过了，你可以直接去登录。";
  }

  if (message === "Signup requires a valid password") {
    return "请设置一个有效的密码后再试。";
  }

  if (message.toLowerCase().includes("password")) {
    return "密码暂时不符合要求，请换一个至少 6 位的密码。";
  }

  return message;
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = safeNextPath(formData.get("next"));
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(withMessage("/login", "error", translateAuthError(error.message)));
  }

  redirect(next);
}

export async function signUpAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = safeNextPath(formData.get("next"));
  const supabase = await createServerSupabaseClient();
  const headerStore = await headers();
  const origin = headerStore.get("origin") || getSiteUrl();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(next)}`,
    },
  });

  if (error) {
    redirect(withMessage("/signup", "error", translateAuthError(error.message)));
  }

  if (data.session) {
    redirect(next);
  }

  redirect(
    withMessage(
      "/login",
      "message",
      "注册成功，请先去邮箱确认登录链接。确认完成后再回来登录。"
    )
  );
}
