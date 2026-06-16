"use client";

import { useState, type FormEvent, type ReactNode } from "react";

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

function fallbackErrorPath(action: string, message: string) {
  const pathname = action === "/auth/signup" ? "/signup" : "/login";
  return withAuthMessage(pathname, "error", message);
}

function safeRedirectPath(value: unknown, fallback = "/members") {
  if (
    typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//")
  ) {
    return value;
  }

  return fallback;
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

      if (action === "/auth/login" || action === "/auth/signup") {
        const resp = await fetch(action, {
          method: "POST",
          body: formData,
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
          },
        });

        const contentType = resp.headers.get("content-type") || "";
        const payload = contentType.includes("application/json")
          ? ((await resp.json()) as { redirect?: unknown })
          : {};

        window.location.assign(
          safeRedirectPath(
            payload.redirect,
            fallbackErrorPath(
              action,
              resp.ok
                ? "登录状态返回异常，请刷新后重试。"
                : "登录请求失败，请稍后再试。"
            )
          )
        );
        return;
      }

      window.location.reload();
    } catch (error) {
      const message =
        error instanceof Error ? translateAuthError(error.message) : "请求失败。";
      const fallback =
        typeof action === "string"
          ? fallbackErrorPath(action, message)
          : withAuthMessage("/login", "error", message);

      window.location.assign(fallback);
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
