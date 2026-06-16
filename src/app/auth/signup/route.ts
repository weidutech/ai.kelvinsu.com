import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/route";

function safeNextPath(value: FormDataEntryValue | null) {
  if (
    typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//")
  ) {
    return value;
  }

  return "/members";
}

function withAuthMessage(
  pathname: string,
  key: "error" | "message",
  value: string
) {
  const params = new URLSearchParams({ [key]: value });
  return `${pathname}?${params.toString()}`;
}

function translateAuthError(message: string) {
  const waitMatch = message.match(/after\s+(\d+)\s+seconds?/i);
  if (waitMatch) {
    return `请求太频繁了，请在 ${waitMatch[1]} 秒后再试。`;
  }

  if (/rate\s*limit/i.test(message) || /email rate limit/i.test(message)) {
    return "邮件发送过于频繁，请稍等几分钟后再试，或换一个邮箱。";
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

  if (message.toLowerCase().includes("fetch")) {
    return "注册服务暂时连接失败，请稍后再试。";
  }

  return message;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = safeNextPath(formData.get("next"));
  const { origin } = new URL(request.url);
  const { supabase, applyAuthCookies } =
    createRouteHandlerSupabaseClient(request);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(next)}`,
    },
  });

  if (error) {
    return applyAuthCookies(
      NextResponse.json(
        {
          redirect: withAuthMessage(
            "/signup",
            "error",
            translateAuthError(error.message)
          ),
        },
        { status: 400 }
      ),
      { waitForCookies: false }
    );
  }

  if (!data.session) {
    return applyAuthCookies(
      NextResponse.json(
        {
          redirect: withAuthMessage(
            "/login",
            "message",
            "注册成功，请先去邮箱确认登录链接。确认完成后再回来登录。"
          ),
        },
        { status: 200 }
      ),
      { waitForCookies: false }
    );
  }

  return applyAuthCookies(
    NextResponse.json({ redirect: next }, { status: 200 })
  );
}
