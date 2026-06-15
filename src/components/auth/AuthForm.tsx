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
    if (typeof action === "function") {
      e.preventDefault();
      setPending(true);
      try {
        const formData = new FormData(e.currentTarget);
        await action(formData);
        // Server Action 调用 redirect() 时会自动导航，无需手动处理
      } catch {
        setPending(false);
      }
    } else {
      setPending(true);
    }
  }

  return (
    <form
      action={typeof action === "string" ? action : undefined}
      method="post"
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
