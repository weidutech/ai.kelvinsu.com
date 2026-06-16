"use client";

import { useState, type FormEvent, type ReactNode } from "react";

type AuthResponse = {
  redirect?: string;
};

function safeRedirectTarget(value: unknown) {
  if (
    typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//")
  ) {
    return value;
  }

  return "/members";
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

      const resp = await fetch(action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
        credentials: "same-origin",
      });

      if (resp.ok) {
        const payload = (await resp.json()) as AuthResponse;
        window.location.href = safeRedirectTarget(payload.redirect);
      } else {
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
