import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Container, Section } from "@/components/ui/Container";

/**
 * RecipesShowcase —— 精选实战场景（bento grid）
 * 替代旧站 .home-case-grid（4 列扁平卡片，7 个挤一起）
 * 重做：bento 布局，大小卡片混排，首图占位 + 标签，更有杂志感
 */
const featuredRecipes = [
  {
    href: "/docs/recipes/ppt-skill-walkthrough",
    title: "一句话生成演示文稿",
    description: "调用 Skill，把主题变成结构化 slide deck。",
    category: "内容生产",
    span: "lg:col-span-2 lg:row-span-2",
    featured: true,
  },
  {
    href: "/docs/recipes/playwright-mcp",
    title: "让 Codex 操控浏览器",
    description: "用 Playwright MCP 打开页面、点击、截图、检查状态。",
    category: "浏览器自动化",
    span: "",
  },
  {
    href: "/docs/recipes/obsidian-codex",
    title: "连接 Obsidian 知识库",
    description: "在本地笔记中生成内容、配图和可追踪引用。",
    category: "知识库",
    span: "",
  },
  {
    href: "/docs/recipes/clinical-literature-review",
    title: "整理临床文献证据表",
    description: "把医学问题拆成 PICO、证据来源、局限性和安全边界。",
    category: "医学科研",
    span: "",
  },
  {
    href: "/docs/recipes/github-actions-ci-fix",
    title: "CI 失败自动修复",
    description: "从失败日志定位问题，让 Codex 修复并生成 PR。",
    category: "工程运维",
    span: "",
  },
  {
    href: "/docs/recipes/android-remote-control",
    title: "安卓手机远程操控",
    description: "扫码连接手机端 ChatGPT App，跟进和管理桌面 Codex 任务。",
    category: "移动协同",
    span: "",
  },
];

export function RecipesShowcase() {
  return (
    <Section className="border-t border-[var(--border-default)] bg-[var(--bg-subtle)]">
      <Container size="wide">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Badge variant="accent" className="mb-4">
              精选实战场景
            </Badge>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              可迁移到真实项目的案例样本
            </h2>
            <p className="mt-4 text-pretty text-lg text-[var(--text-secondary)]">
              案例库是一组可改写的任务样本，重点是帮你迁移到自己的项目、工具、账号和验证方式。
            </p>
          </div>
          <Link
            href="/docs/recipes"
            className="shrink-0 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
          >
            查看全部 16 个案例 →
          </Link>
        </div>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 lg:grid-cols-4">
          {featuredRecipes.map((recipe) => (
            <Link
              key={recipe.href}
              href={recipe.href}
              className={`group relative flex flex-col overflow-hidden rounded-card border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg ${recipe.span}`}
            >
              {recipe.featured && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br from-brand-50 via-transparent to-accent-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              )}
              <div className="relative z-10 mt-auto">
                <Badge variant="outline" className="mb-3">
                  {recipe.category}
                </Badge>
                <h3
                  className={`font-semibold tracking-tight text-[var(--text-primary)] ${
                    recipe.featured ? "text-2xl" : "text-lg"
                  }`}
                >
                  {recipe.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {recipe.description}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="absolute right-5 top-5 z-10 text-[var(--text-muted)] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
