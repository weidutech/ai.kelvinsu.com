import { Container, Section } from "@/components/ui/Container";

/**
 * TaskLoop —— 任务闭环说明
 * 替代旧站 .home-loop-grid（5 个纯色块 border-top）
 * 重做：横向流程，步骤间有连接箭头，每步带配色和链接
 */
const steps = [
  {
    title: "说明",
    description: "写清目标、范围、禁止事项、上下文和期望输出。",
    href: "/docs/practice/task-design",
    color: "teal" as const,
  },
  {
    title: "执行",
    description: "理解 Codex 如何读文件、运行命令、小步修改和汇报状态。",
    href: "/docs/guide/07-task-execution",
    color: "blue" as const,
  },
  {
    title: "控制",
    description: "设置沙盒、审批、网络和凭据边界，让任务可控。",
    href: "/docs/guide/16-sandbox-approvals",
    color: "rose" as const,
  },
  {
    title: "验证",
    description: "用测试、构建、截图、日志和 PR 检查结果是否可靠。",
    href: "/docs/recipes/github-actions-ci-fix",
    color: "amber" as const,
  },
  {
    title: "沉淀",
    description: "把成功任务整理成模板、案例和团队规则。",
    href: "/docs/practice/team-playbook",
    color: "violet" as const,
  },
];

const colorMap = {
  teal: "border-t-brand-500 bg-brand-50/30",
  blue: "border-t-blue-500 bg-blue-50/30",
  rose: "border-t-rose-500 bg-rose-50/30",
  amber: "border-t-amber-500 bg-amber-50/30",
  violet: "border-t-violet-500 bg-violet-50/30",
};

export function TaskLoop() {
  return (
    <Section className="border-t border-[var(--border-default)]">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            把一次任务做成闭环
          </h2>
          <p className="mt-4 text-pretty text-lg text-[var(--text-secondary)]">
            好用 Codex 的关键在于让它始终知道目标、范围、约束、验证方式和交付格式。
            教程会反复训练这一套闭环。
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {steps.map((step, index) => (
            <a
              key={step.title}
              href={step.href}
              className={`group relative flex flex-col rounded-card border border-t-4 border-[var(--border-default)] p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md ${colorMap[step.color]}`}
            >
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-base font-semibold text-[var(--text-primary)]">
                {step.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-[var(--text-muted)] lg:block"
                >
                  →
                </span>
              )}
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}
