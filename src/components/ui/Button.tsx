import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Button —— 统一的按钮 + 链接按钮
 * 用 asChild 模式：当传 href 时渲染 next/link，否则渲染 <button>
 */
type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "rounded-button bg-brand-700 text-white shadow-sm hover:bg-brand-800 hover:shadow-md active:scale-[0.98]",
  secondary:
    "rounded-button bg-slate-900 text-white shadow-sm hover:bg-slate-800 active:scale-[0.98]",
  outline:
    "rounded-button border border-slate-300 bg-white text-slate-700 hover:border-brand-400 hover:text-brand-700 hover:bg-brand-50",
  ghost: "rounded-button text-slate-600 hover:bg-slate-100 hover:text-slate-900",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = ButtonOwnProps &
  Omit<ComponentProps<"button">, keyof ButtonOwnProps> & { href?: undefined };

type ButtonAsLink = ButtonOwnProps &
  Omit<ComponentProps<typeof Link>, keyof ButtonOwnProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (typeof props.href === "string") {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
