import type { ComponentProps, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Card —— 通用卡片容器
 * 支持 asChild 式语义：传 as 可渲染成 <article>/<section>/next/link 等
 * 用法：
 *   <Card>...</Card>
 *   <Card as={Link} href="/x" hover>...</Card>
 */
interface CardProps extends ComponentProps<"div"> {
  as?: ElementType;
  hover?: boolean;
  children: ReactNode;
}

export function Card({
  as: Component = "div",
  hover = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-card border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 shadow-xs",
        hover &&
          "transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn("text-lg font-semibold tracking-tight text-[var(--text-primary)]", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mt-2 text-sm leading-relaxed text-[var(--text-secondary)]", className)}>
      {children}
    </p>
  );
}
