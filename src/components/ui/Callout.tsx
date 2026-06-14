import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Callout —— 提示框，替代 VuePress 的 ::: tip / ::: warning / ::: details
 * 用于 MDX 内容渲染时把容器语法转成 React 组件
 */
type CalloutType = "tip" | "warning" | "info" | "danger" | "details";

const calloutStyles: Record<
  CalloutType,
  { wrapper: string; label: string; icon: string; defaultTitle: string }
> = {
  tip: {
    wrapper: "border-brand-200 bg-brand-50/50",
    label: "text-brand-800",
    icon: "💡",
    defaultTitle: "提示",
  },
  info: {
    wrapper: "border-accent-200 bg-accent-50/50",
    label: "text-accent-800",
    icon: "ℹ️",
    defaultTitle: "说明",
  },
  warning: {
    wrapper: "border-amber-200 bg-amber-50/50",
    label: "text-amber-800",
    icon: "⚠️",
    defaultTitle: "注意",
  },
  danger: {
    wrapper: "border-red-200 bg-red-50/50",
    label: "text-red-800",
    icon: "⛔",
    defaultTitle: "危险",
  },
  details: {
    wrapper: "border-slate-300 bg-slate-50/50",
    label: "text-slate-800",
    icon: "📋",
    defaultTitle: "详情",
  },
};

export function Callout({
  type = "tip",
  title,
  children,
  className,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const style = calloutStyles[type];
  const resolvedTitle = title ?? style.defaultTitle;

  return (
    <div
      className={cn(
        "my-6 rounded-card border p-4 pl-5",
        style.wrapper,
        className,
      )}
    >
      <p className={cn("flex items-center gap-1.5 text-sm font-semibold", style.label)}>
        <span aria-hidden="true">{style.icon}</span>
        {resolvedTitle}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] [&>p]:my-0 [&>p:last-child]:mb-0 [&>p:first-child]:mt-0">
        {children}
      </div>
    </div>
  );
}
