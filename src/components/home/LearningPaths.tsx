import Link from "next/link";
import { ArrowRight, Blocks, Briefcase, FileStack, Sparkles } from "lucide-react";

import { Container, Section } from "@/components/ui/Container";

const valueCards = [
  {
    eyebrow: "入门最快见效",
    title: "10倍提效：Prompt 高级技巧与日常流",
    description:
      "绝大多数人不需要懂代码，只需要会“问问题”。为你整理了应对写邮件、数据分析、总结长文的高转化 Prompt 模板。",
    bullets: ["万能 Prompt 框架", "日常办公提效模板", "各行业落地场景"],
    href: "/docs/guide/00-overview",
    icon: FileStack,
    tone: "bg-white border-slate-200/70",
  },
  {
    eyebrow: "创作者与副业",
    title: "自媒体变现：多模态创作与自动分发",
    description:
      "结合 Midjourney, Kimi, 可灵等国内/外顶级工具，教你如何用 AI 写爆款文案、生成视频，甚至搭建全自动的自媒体矩阵。",
    bullets: ["爆款文案生成公式", "AI 绘画与视频实战", "小红书/抖音自动化"],
    href: "/docs/recipes",
    icon: Sparkles,
    tone: "bg-slate-900 border-slate-800 text-white",
  },
  {
    eyebrow: "2026 最新热点",
    title: "让机器打工：自主 Agent 与多工具联动",
    description:
      "从“聊天”升级到“做事”。通过 Dify/Coze 搭建能自主收集资料、处理 Excel、多工具协同的数字员工，释放你的双手。",
    bullets: ["Agent 搭建实战", "API 与工具联动", "企业级工作流部署"],
    href: "/premium",
    icon: Blocks,
    tone: "bg-brand-50/70 border-brand-100",
  },
];

export function LearningPaths() {
  return (
    <Section className="bg-white relative z-10 py-24">
      <Container>
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-700">
            <Sparkles className="h-3.5 w-3.5" />
            What You Actually Get
          </div>
          <h2 className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            不是再给你一套空话，
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-600">
              是给你能直接带走的资产
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 font-medium">
            来这里，不该只带走一点“灵感”。你应该能带走一套更快上手的工作流、几组能直接复制的案例，以及遇到真实业务时该怎么落地的判断框架。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {valueCards.map((card) => {
            const Icon = card.icon;
            const darkCard = card.tone.includes("text-white");

            return (
              <Link
                key={card.title}
                href={card.href}
                className={`group relative flex h-full flex-col rounded-[1.75rem] border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${card.tone}`}
              >
                <div
                  className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border ${
                    darkCard
                      ? "border-white/10 bg-white/5 text-brand-300"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <div className={`text-xs font-bold uppercase tracking-[0.24em] ${darkCard ? "text-brand-300" : "text-slate-400"}`}>
                  {card.eyebrow}
                </div>
                <h3 className={`mt-3 text-2xl font-bold tracking-tight ${darkCard ? "text-white" : "text-slate-900"}`}>
                  {card.title}
                </h3>
                <p className={`mt-4 flex-grow text-sm leading-7 font-medium ${darkCard ? "text-slate-300" : "text-slate-600"}`}>
                  {card.description}
                </p>

                <div className={`mt-8 space-y-3 border-t pt-6 ${darkCard ? "border-white/10" : "border-slate-100"}`}>
                  {card.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className={`flex items-center gap-3 text-sm font-semibold ${darkCard ? "text-slate-200" : "text-slate-700"}`}
                    >
                      <span className={`h-2 w-2 rounded-full ${darkCard ? "bg-brand-400" : "bg-brand-500"}`}></span>
                      {bullet}
                    </div>
                  ))}
                </div>

                <div className={`mt-8 inline-flex items-center gap-2 text-sm font-bold ${darkCard ? "text-white" : "text-slate-900"}`}>
                  进去看看具体内容
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
