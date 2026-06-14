import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Container, Section } from "@/components/ui/Container";

/**
 * LearningPaths —— 学习路径推荐
 * 替代旧站 .home-path-grid（5 张挤一起的扁平卡片）
 * 重做：3 张大卡片，步骤号 + 图标 + 明确受众，hover lift 动效
 */
const paths = [
  {
    step: "01",
    href: "/docs/guide/01-app-installation",
    title: "第一次使用 Codex",
    description: "安装电脑端客户端，了解界面，完成第一个低风险任务。",
    audience: "初学者 · 产品 · 运营 · 技术写作者",
    icon: "🚀",
  },
  {
    step: "02",
    href: "/docs/guide/12-cli-installation",
    title: "开发者本地提效",
    description: "在 CLI 中读项目、改代码、跑测试，形成可验证的工程闭环。",
    audience: "前端 · 后端 · 全栈 · 开源维护者",
    icon: "⚡",
  },
  {
    step: "03",
    href: "/docs/practice/team-playbook",
    title: "团队落地与规范",
    description: "用 AGENTS.md、权限边界、案例库和复盘模板统一协作方式。",
    audience: "技术负责人 · 团队 Lead · 内部工具负责人",
    icon: "👥",
  },
];

export function LearningPaths() {
  return (
    <Section className="border-t border-[var(--border-default)] bg-[var(--bg-subtle)]">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="brand" className="mb-4">
            三条推荐路径
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            不同起点，不需要读同一条路
          </h2>
          <p className="mt-4 text-pretty text-lg text-[var(--text-secondary)]">
            先选与你当前工作最贴近的路径，再回头补全基础概念。
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {paths.map((path) => (
            <Link
              key={path.step}
              href={path.href}
              className="group relative flex flex-col rounded-card border border-[var(--border-default)] bg-[var(--bg-elevated)] p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-button bg-brand-50 text-xl">
                  {path.icon}
                </span>
                <span className="font-mono text-3xl font-bold text-[var(--border-strong)] transition-colors group-hover:text-brand-300">
                  {path.step}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                {path.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                {path.description}
              </p>

              <p className="mt-5 border-t border-[var(--border-default)] pt-4 text-xs text-[var(--text-muted)]">
                {path.audience}
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 opacity-0 transition-opacity group-hover:opacity-100">
                开始学习
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
