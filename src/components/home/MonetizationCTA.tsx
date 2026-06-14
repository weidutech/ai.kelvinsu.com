import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { CheckCircle2 } from "lucide-react";

/**
 * MonetizationCTA —— 变现与支持 (Enterprise SaaS Style)
 * - 强化“实战课”的高级感与光影
 * - 移除廉价的边框，改用高斯模糊背景和内阴影
 * - 优化文字层级
 */
const plans = [
  {
    name: "基础指南",
    price: "¥0",
    period: "Open Source",
    description: "54 篇全量开源文档，覆盖从安装到基础工作流的所有核心概念。",
    features: ["全量文档访问", "社区案例库共享", "GitHub 仓库同步更新"],
    button: "开始学习",
    href: "/docs/guide/00-overview",
    featured: false,
  },
  {
    name: "高阶实战课",
    price: "¥299",
    period: "终身买断",
    description: "解锁 16+ 深度行业闭环案例、源码及 Kelvin 的专属社群。",
    features: ["专属 Prompt 武器库", "长程任务编排源码", "高密度私密答疑圈"],
    button: "了解 VIP 特权",
    href: "/premium",
    featured: true,
  },
  {
    name: "企业/专家咨询",
    price: "¥999",
    period: "单次诊断",
    description: "1 对 1 针对性诊断，为你或你的团队定制专属的 AI 提效落地方案。",
    features: ["定制化 Agent 开发", "内部工作流审计", "30 天跟进服务"],
    button: "预约咨询",
    href: "https://afdian.com",
    featured: false,
  },
];

export function MonetizationCTA() {
  return (
    <Section className="bg-white py-32 relative overflow-hidden">
      {/* 背景光晕 */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-gradient-to-tr from-brand-50/50 to-transparent rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <Container>
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            助力你的 AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">进阶之旅</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-500 font-medium">
            除了免费文档，我们还提供更深度的实战资源与专家服务，帮你跨越从“知道”到“做到”的鸿沟。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-8 rounded-[2rem] transition-all duration-500 ${
                plan.featured
                  ? "bg-slate-900 text-white shadow-2xl shadow-brand-900/20 md:-translate-y-4 md:scale-105 z-10"
                  : "bg-white border border-slate-200/60 shadow-sm hover:shadow-md hover:border-slate-300"
              }`}
            >
              {/* Featured 专属装饰 */}
              {plan.featured && (
                <>
                  <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10 pointer-events-none"></div>
                  <div className="absolute -top-3 inset-x-0 flex justify-center">
                    <span className="bg-brand-500 text-white text-[11px] uppercase tracking-widest font-black px-4 py-1 rounded-full shadow-lg shadow-brand-500/30">
                      Most Popular
                    </span>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px] pointer-events-none" />
                </>
              )}

              <div className="mb-8 relative z-10">
                <h3 className={`text-sm font-bold uppercase tracking-widest ${
                  plan.featured ? "text-brand-300" : "text-slate-500"
                }`}>
                  {plan.name}
                </h3>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className={`text-5xl font-extrabold tracking-tight ${
                    plan.featured ? "text-white" : "text-slate-900"
                  }`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm font-semibold ${
                    plan.featured ? "text-slate-400" : "text-slate-400"
                  }`}>
                    / {plan.period}
                  </span>
                </div>
                <p className={`mt-6 text-sm font-medium leading-relaxed ${
                  plan.featured ? "text-slate-300" : "text-slate-500"
                }`}>
                  {plan.description}
                </p>
              </div>

              <div className={`w-full h-px mb-8 ${plan.featured ? "bg-white/10" : "bg-slate-100"}`}></div>

              <ul className="space-y-4 mb-10 flex-1 relative z-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm font-medium">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${
                      plan.featured ? "text-brand-400" : "text-brand-600"
                    }`} />
                    <span className={plan.featured ? "text-slate-200" : "text-slate-600"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                href={plan.href}
                className={`w-full justify-center py-6 text-base rounded-2xl font-bold tracking-wide relative z-10 transition-all duration-300 ${
                  plan.featured 
                    ? "bg-brand-500 hover:bg-brand-400 text-white shadow-[0_0_40px_rgb(20,184,166,0.3)] hover:shadow-[0_0_60px_rgb(20,184,166,0.5)] border-0" 
                    : "bg-slate-50 hover:bg-slate-100 text-slate-900 border-0"
                }`}
              >
                {plan.button}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

