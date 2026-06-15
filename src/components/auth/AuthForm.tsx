"use client";

import { useState, type ReactNode } from "react";

export function AuthForm({
  action,
  idleLabel,
  pendingLabel,
  children,
}: {
  action: string;
  idleLabel: string;
  pendingLabel: string;
  children: ReactNode;
}) {
  const [pending, setPending] = useState(false);

  return (
    <form
      action={action}
      method="post"
      className="space-y-4"
      onSubmit={() => setPending(true)}
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
