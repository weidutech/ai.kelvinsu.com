import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

/**
 * Hero —— 首页主视觉
 * 设计要点（解决旧站"发灰发糊"问题）：
 * - 去掉旧站 webp 蒙层（旧站用 78% 白色叠层，导致整页发灰）
 * - 用微渐变背景 + 装饰性光晕，营造层次但不抢戏
 * - 大标题用 text-balance，副标题用 text-pretty（现代排版）
 * - 主副 CTA 清晰，hover 有微动效
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* 装饰性背景：径向渐变光晕，替代旧站的发糊蒙层 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-100/60 via-accent-50/40 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--bg-base))]" />
        {/* 网格点阵装饰 */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--border-default) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 70%)",
          }}
        />
      </div>

      <Container className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="brand" className="mb-6 animate-fade-in">
            <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-500" />
            面向创作者、开发者与团队的 AI 实战指南
          </Badge>

          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl">
            先学会，再放大，
            <span className="bg-gradient-to-r from-brand-700 to-accent-600 bg-clip-text text-transparent">
              再变现
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
            从第一次上手 Codex，到把它接入真实工作流。系统整理 CLI、IDE、自动化、
            工作流与真实案例，帮你完成开发、创作、研究、自动化与团队协作。
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="/docs/guide/00-overview" size="lg">
              进入学习路线
              <span aria-hidden="true">→</span>
            </Button>
            <Button href="/docs/recipes" variant="outline" size="lg">
              浏览实战案例
            </Button>
          </div>

          {/* 数据小条：建立可信度 */}
          <dl className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-[var(--border-default)] pt-8">
            {[
              { value: "54+", label: "实战教程" },
              { value: "16", label: "可复用案例" },
              { value: "100%", label: "免费开源" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="order-2 text-sm text-[var(--text-muted)]">{stat.label}</dt>
                <dd className="order-1 text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
