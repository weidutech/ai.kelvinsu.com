import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Badge —— Premium Edition
 * - 增加字距与字重
 * - 更轻盈的半透明背景
 */
type BadgeVariant = "default" | "brand" | "accent" | "success" | "warning" | "outline";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  brand: "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400",
  accent: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  warning: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  outline: "border border-gray-200 text-gray-500 dark:border-gray-800 dark:text-gray-400",
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
        "inline-flex items-center rounded-pill px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em]",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
