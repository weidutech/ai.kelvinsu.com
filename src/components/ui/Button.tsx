import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Button —— Premium Edition
 * - 强化字重与字距
 * - 精致化阴影与状态反馈
 */
type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-bold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "rounded-button bg-brand-600 text-white shadow-lg shadow-brand-600/10 hover:bg-brand-700 hover:shadow-brand-600/20 hover:-translate-y-0.5",
  secondary:
    "rounded-button bg-gray-900 text-white shadow-lg shadow-gray-900/10 hover:bg-black hover:shadow-gray-900/20 dark:bg-gray-800 dark:hover:bg-gray-700",
  outline:
    "rounded-button border border-gray-200 bg-white text-gray-700 hover:border-brand-500 hover:text-brand-700 hover:bg-brand-50/50 dark:bg-transparent dark:border-gray-800 dark:text-gray-300 dark:hover:border-brand-500 dark:hover:text-brand-400",
  ghost: "rounded-button text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs uppercase tracking-widest",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
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
