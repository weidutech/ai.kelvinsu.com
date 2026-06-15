import type { Metadata } from "next";
import "./globals.css";
import { NavbarServer } from "@/components/layout/NavbarServer";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Kelvin AI Guide — AI 实战指南",
    template: "%s | Kelvin AI Guide",
  },
  description:
    "Kelvin AI Guide 是面向中文创作者与开发者的 AI 实战指南，系统整理 Codex、CLI、IDE、工作流、自动化与真实案例。",
  metadataBase: new URL("https://ai.kelvinsu.com"),
  authors: [{ name: "kelvinsu", url: "https://ai.kelvinsu.com" }],
  keywords: [
    "Kelvin AI Guide",
    "AI 教程",
    "Codex 教程",
    "Codex CLI",
    "AI 工作流",
    "AGENTS.md",
    "AI 编程",
    "AI Agent",
    "实战指南",
  ],
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen antialiased flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-500/30">
        <NavbarServer />
        <main className="flex-grow pt-[88px] relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
