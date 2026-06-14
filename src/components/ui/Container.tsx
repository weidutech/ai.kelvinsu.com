import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Container —— 页面级宽度容器，统一水平内边距和最大宽度
 */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const maxWidth =
    size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-7xl" : "max-w-5xl";

  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8", maxWidth, className)}>{children}</div>
  );
}

/**
 * Section —— 带垂直节奏的区块容器
 * 现代 SaaS 站标配：section 之间留 7-8rem（py-28 / py-32）
 */
export function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn("py-16 sm:py-24", className)}>{children}</section>;
}
