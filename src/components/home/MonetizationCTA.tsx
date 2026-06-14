import { Container, Section } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

/**
 * MonetizationCTA —— 变现/升级入口（定价卡）
 * 对应用户商业模型：免费教程 → 会员 → AI 变现课 → 企业咨询
 * 重做：3 张定价卡，中间档高亮（推荐），明确的 CTA
 */
const offers = [
  {
    name: "免费教程 · 持续追更",
    price: "¥0",
    period: "永远免费",
    description: "先拿免费教程跑通第一条 AI 工作流，在抖音和小红书持续追更。",
    features: [
      "54+ 篇实战教程",
      "16 个可复用案例",
      "社媒持续更新",
      "社区答疑",
    ],
    cta: "开始学习",
    href: "/docs/guide/00-overview",
    highlighted: false,
  },
  {
    name: "AI 变现实战课",
    price: "¥99",
    period: "一次性",
    description: "围绕内容、获客、交付、产品化和复用工作流，把 AI 变成收入能力。",
    features: [
      "Claude Code 大厂实战配置脚本",
      "高级提示词合集",
      "全自动脚本合集",
      "会员专属案例拆解",
      "高频可复用工作流",
    ],
    cta: "获取实战课",
    href: "/community/roadmap#monetization-course",
    highlighted: true,
  },
  {
    name: "1 对 1 顾问咨询",
    price: "¥999",
    period: "/ 小时",
    description: "面向老板、跨境电商和团队负责人的技术落地与降本增效咨询。每周限额 3 席。",
    features: [
      "技术落地方案",
      "流程改造建议",
      "团队协作升级",
      "定制化路径",
    ],
    cta: "预约咨询",
    href: "/community/roadmap#enterprise-consulting",
    highlighted: false,
  },
];

export function MonetizationCTA() {
  return (
    <Section className="border-t border-[var(--border-default)]">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="brand" className="mb-4">
            升级路径
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            先免费跑通，再选择适合你的升级路径
          </h2>
          <p className="mt-4 text-pretty text-lg text-[var(--text-secondary)]">
            不需要一次到位。先看到结果，再决定是否系统升级。
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.name}
              className={`relative flex flex-col rounded-card border p-7 transition-all ${
                offer.highlighted
                  ? "border-brand-400 bg-[var(--bg-elevated)] shadow-xl ring-1 ring-brand-200 md:-translate-y-3"
                  : "border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-xs hover:shadow-md"
              }`}
            >
              {offer.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="brand" className="shadow-sm">
                    ⭐ 推荐
                  </Badge>
                </div>
              )}

              <h3 className="text-lg font-semibold text-[var(--text-primary)]">{offer.name}</h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
                  {offer.price}
                </span>
                <span className="text-sm text-[var(--text-muted)]">{offer.period}</span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {offer.description}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {offer.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={offer.href}
                className={`mt-7 inline-flex h-11 items-center justify-center rounded-button px-5 text-sm font-semibold transition-all ${
                  offer.highlighted
                    ? "bg-brand-700 text-white shadow-sm hover:bg-brand-800 hover:shadow-md active:scale-[0.98]"
                    : "border border-[var(--border-strong)] text-[var(--text-primary)] hover:border-brand-400 hover:text-brand-700"
                }`}
              >
                {offer.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-[var(--text-muted)]">
          需要定制沟通或企业合作？
          <a
            href="/community/roadmap#contact"
            className="ml-1 font-medium text-brand-700 hover:text-brand-800"
          >
            添加微信：gamemasterv1
          </a>
        </p>
      </Container>
    </Section>
  );
}
