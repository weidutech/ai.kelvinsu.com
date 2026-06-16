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

  if (message === "Invalid login credentials") {
    return "邮箱或密码不正确，请重新检查。";
  }

  if (message === "Email not confirmed") {
    return "这个邮箱还没有完成确认，请先去邮箱点击确认链接。";
  }

  if (message.toLowerCase().includes("fetch")) {
    return "登录服务暂时连接失败，请稍后再试。";
  }

  return message;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = safeNextPath(formData.get("next"));
  const { supabase, applyAuthCookies, pendingAuthCookieCount } =
    createRouteHandlerSupabaseClient(request);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return applyAuthCookies(
      NextResponse.json(
        {
          redirect: withAuthMessage(
            "/login",
            "error",
            translateAuthError(error.message)
          ),
        },
        { status: 401 }
      ),
      { waitForCookies: false }
    );
  }

  const response = await applyAuthCookies(
    NextResponse.json({ redirect: next }, { status: 200 })
  );

  if (pendingAuthCookieCount() === 0) {
    return NextResponse.json(
      {
        redirect: withAuthMessage(
          "/login",
          "error",
          "登录成功但未写入浏览器 Cookie，请刷新后重试。"
        ),
      },
      { status: 500 }
    );
  }

  return response;
}
