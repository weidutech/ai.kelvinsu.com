"use client";

import { useState, type FormEvent, type ReactNode } from "react";

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

      // 用 fetch 代替原生表单提交：
      // 原生 form POST + 303 redirect 时，部分浏览器不持久化 Set-Cookie，
      // 导致登录后刷新页面被踢回登录页。
      // fetch + redirect:'follow' 会在内部跟随重定向并存储 Set-Cookie，
      // 然后用 window.location 导航到目标页，确保 cookie 在导航前已写入。
      const resp = await fetch(action, {
        method: "POST",
        body: formData,
        redirect: "follow",
        credentials: "same-origin",
      });

      // resp.url 是最终落地页（跟随 303 后的地址）
      if (resp.redirected && resp.url) {
        window.location.href = resp.url;
      } else {
        // 未发生重定向（异常情况），刷新当前页
        window.location.reload();
      }
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
