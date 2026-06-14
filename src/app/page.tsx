import Link from "next/link";

/**
 * 临时占位首页 —— 仅用于验证脚手架跑通。
 * 完整首页（Hero + 学习路径 + 案例 bento + 变现入口）将在后续步骤实现。
 */
export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <div className="flex flex-col items-start gap-6">
        <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
          Next.js 重构中 · 阶段一
        </span>
        <h1 className="text-balance text-5xl font-extrabold tracking-tight text-slate-900">
          Kelvin AI Guide
          <span className="block text-brand-700">AI 实战指南</span>
        </h1>
        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-slate-600">
          面向中文创作者与开发者的 Codex 实战指南。从第一次上手到把 Codex
          接入真实工作流，帮助不同背景的人用 AI 完成开发、创作、研究、自动化与团队协作。
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/docs/guide/00-overview"
            className="rounded-button bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800 hover:shadow-md"
          >
            进入学习路线 →
          </Link>
          <Link
            href="/docs/recipes"
            className="rounded-button border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-400 hover:text-brand-700"
          >
            实战案例库
          </Link>
        </div>

        {/* 设计令牌验证卡片 */}
        <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "品牌色 teal", className: "bg-brand-700", hex: "#0f766e" },
            { label: "强调色 indigo", className: "bg-accent-600", hex: "#4f46e5" },
            { label: "中性色 slate-900", className: "bg-slate-900", hex: "#0f172a" },
          ].map((c) => (
            <div
              key={c.label}
              className="rounded-card border border-slate-200 bg-white p-4 shadow-xs"
            >
              <div className={`${c.className} mb-3 h-12 w-full rounded`} />
              <p className="text-sm font-medium text-slate-900">{c.label}</p>
              <p className="font-mono text-xs text-slate-500">{c.hex}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
