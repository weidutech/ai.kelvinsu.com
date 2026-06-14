import Link from "next/link";
import { Section, Container } from "@/components/ui/Container";
import { Terminal, Code2, Network, ArrowRight } from "lucide-react";

const paths = [
  {
    step: "01",
    href: "/docs/guide/01-app-installation",
    title: "个人效能跃迁",
    description: "掌握 AI 提效核心技巧，快速打造属于自己的数字分身与内容流。",
    audience: "自媒体 · 创作者 · 独立开发者",
    icon: Terminal,
    color: "from-blue-500 to-cyan-400",
    bgLight: "bg-blue-50/50",
    textDark: "text-blue-600",
    glow: "hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
  },
  {
    step: "02",
    href: "/docs/guide/12-cli-installation",
    title: "全栈商业闭环",
    description: "告别技术外包，零基础借助 AI 独立完成后端搭建、前端开发与全自动部署。",
    audience: "创业者 · 产品经理",
    icon: Code2,
    color: "from-brand-500 to-teal-400",
    bgLight: "bg-brand-50/50",
    textDark: "text-brand-600",
    glow: "hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
  },
  {
    step: "03",
    href: "/docs/practice/team-playbook",
    title: "企业级 AI 提效",
    description: "引入标准化 AI 工作流，沉淀企业专属知识库，实现团队人效的指数级爆发。",
    audience: "企业高管 · 团队 Leader",
    icon: Network,
    color: "from-purple-500 to-indigo-500",
    bgLight: "bg-purple-50/50",
    textDark: "text-purple-600",
    glow: "hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
  },
];

export function LearningPaths() {
  return (
    <Section className="bg-white relative z-10 py-24">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              精准切入，<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-600">高效变现</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-medium">
              摒弃漫无目的的摸索。根据你的商业背景与核心痛点，选择最能产生杠杆效应的学习路线。
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 relative">
          {paths.map((path) => {
            const Icon = path.icon;
            return (
              <Link
                key={path.step}
                href={path.href}
                className={`group relative flex flex-col p-8 rounded-[1.5rem] bg-white border border-slate-200/60 transition-all duration-500 hover:-translate-y-1 hover:border-slate-300 overflow-hidden ${path.glow}`}
              >
                {/* 顶部高光线 */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${path.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* 背景装饰：淡淡的步骤号 */}
                <div className="absolute top-6 right-6 font-mono text-7xl font-black text-slate-50 -z-0 transition-all duration-500 group-hover:scale-110 group-hover:text-slate-100/50">
                  {path.step}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className={`relative w-14 h-14 mb-8 group-hover:scale-110 transition-transform duration-500`}>
                    <div className={`absolute inset-0 bg-gradient-to-tr ${path.color} rounded-2xl opacity-0 group-hover:opacity-10 blur-md transition-opacity`}></div>
                    <div className={`relative flex items-center justify-center w-full h-full rounded-2xl ${path.bgLight} border border-slate-100 ${path.textDark}`}>
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                    {path.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-[15px] font-medium mb-10 flex-grow">
                    {path.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {path.audience}
                    </span>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
