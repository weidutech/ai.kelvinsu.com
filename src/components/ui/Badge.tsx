import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Badge —— 小标签（用于分类、状态、编号）
 */
type BadgeVariant = "default" | "brand" | "accent" | "success" | "warning" | "outline";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-700",
  brand: "bg-brand-50 text-brand-700",
  accent: "bg-accent-50 text-accent-700",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  outline: "border border-[var(--border-default)] text-[var(--text-secondary)]",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
