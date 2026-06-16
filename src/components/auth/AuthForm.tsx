"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

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

export function AuthForm({
  action,
  idleLabel,
  pendingLabel,
  children,
}: {
  action: string | ((formData: FormData) => Promise<void>);
  idleLabel: string;
  pendingLabel: string;
  children: ReactNode;
}) {
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);

    try {
      const formData = new FormData(e.currentTarget);

      if (typeof action === "function") {
        await action(formData);
        // Server Action 调用 redirect() 时会自动导航，无需手动处理
        return;
      }

      const email = String(formData.get("email") || "").trim();
      const password = String(formData.get("password") || "");
      const next = safeNextPath(formData.get("next"));
      const supabase = createBrowserSupabaseClient();

      if (action === "/auth/login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        window.location.assign(
          error
            ? withAuthMessage("/login", "error", translateAuthError(error.message))
            : next
        );
        return;
      }

      if (action === "/auth/signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/confirm?next=${encodeURIComponent(next)}`,
          },
        });

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

        window.location.assign(destination);
        return;
      }

      window.location.reload();
    } catch {
      setPending(false);
    }
  }

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      {children}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {pending ? pendingLabel : idleLabel}
      </button>
    </form>
  );
}
