import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { ArrowUpRight, Code2, Terminal, Workflow } from "lucide-react";

/**
 * RecipesShowcase —— 精选案例（Premium Bento Grid）
 * 加入了“干货” Mock，展示具体的代码或终端输出，提升专业度和真实感。
 */
const featuredRecipes = [
  {
    href: "/docs/recipes/prompt-framework-sales",
    title: "高转化营销文案 Prompt",
    description: "万能的结构化提示词模板，让 Kimi/Claude 直接吐出带有情绪价值的带货文案。",
    category: "Prompt 实战",
    span: "lg:col-span-2 lg:row-span-2",
    theme: "dark",
    gradient: "from-slate-900 to-slate-800",
    mockType: "code",
    mockContent: `# Role: 顶尖带货博主
# Context: 需要推销一款人体工学椅
# Rules:
1. 使用 PAS 结构 (Problem-Agitation-Solution)
2. 语言要极具网感，多用 emoji
3. 结尾必须包含强烈的行动呼吁 (CTA)

# Workflow:
- 痛点引入：久坐腰酸背痛
- 情绪放大：去医院理疗不仅贵还耽误时间
- 给出方案：这款椅子如何从根源解决问题...`,
  },
  {
    href: "/docs/recipes/coze-auto-researcher",
    title: "全自动行业研报 Agent",
    description: "利用 Coze/Dify 搭建的机器人，输入一个关键词，自动搜索网页并生成 5000 字报告。",
    category: "Agent 工作流",
    span: "lg:col-span-1 lg:row-span-1",
    theme: "light",
    gradient: "from-white to-slate-50",
    mockType: "terminal",
    mockContent: `> agent start --task "2026 AI Trends"
[Action] Web Search: 2026 AI Market Size
[Info] Extracted data from 12 sources
[Action] LLM Summarization running...
[Success] Report saved to /output/report.md`,
  },
  {
    href: "/docs/recipes/midjourney-to-xiaohongshu",
    title: "Midjourney 爆款图文流",
    description: "一整套从垫图生图、风格统一到批量导出的工作流，专供小红书起号。",
    category: "多模态创作",
    span: "lg:col-span-1 lg:row-span-1",
    theme: "brand",
    gradient: "from-brand-50 to-white",
    mockType: "ui",
    mockContent: "/imagine prompt: A futuristic AI lab, minimal setup, natural lighting, shot on 35mm lens --ar 3:4 --v 6.0",
  },
  {
    href: "/docs/recipes/excel-data-analyzer",
    title: "让大模型帮你处理 Excel",
    description: "给没技术背景的职场人准备：把杂乱的销售数据丢给 AI，直接要透视表和业务洞察。",
    category: "AI 办公应用",
    span: "lg:col-span-2 lg:row-span-1",
    theme: "light",
    gradient: "from-white to-slate-50",
    mockType: "ui",
    mockContent: "User: 帮我分析 Q3 的利润下滑原因。\n\nAI: 已解析 sales_q3.xlsx。数据显示，8月份由于营销成本增加（+22%）导致净利压缩，建议...",
  },
];

export function RecipesShowcase() {
  return (
    <Section className="bg-white overflow-hidden py-32 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <Container size="wide">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-20 px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-xl shadow-slate-900/10">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
              Core Arsenal & Source Code
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600">你的弹药库：</span> <br className="hidden md:block" />
              可复用的底层代码与 Prompt
            </h2>
            <p className="mt-8 text-xl text-slate-500 font-medium leading-relaxed">
              除了视频课程，加入 VIP 你还将获得这些能够直接部署到生产环境的代码片段、自动化脚本和结构化提示词库。
            </p>
          </div>
          <Link
            href="/docs/recipes"
            className="group inline-flex items-center text-sm font-black text-slate-400 hover:text-brand-600 transition-all duration-300 pb-2 border-b-2 border-transparent hover:border-brand-500"
          >
            探索代码库
            <ArrowUpRight className="ml-2 w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[280px] gap-8 px-4">
          {featuredRecipes.map((recipe, index) => {
            const isDark = recipe.theme === "dark";
            const isBrand = recipe.theme === "brand";
            
            return (
              <Link
                key={recipe.href}
                href={recipe.href}
                className={`group relative flex flex-col p-0 rounded-[2.5rem] border transition-all duration-700 hover:-translate-y-3 overflow-hidden ${recipe.span}
                  ${isDark ? 'bg-slate-900 border-slate-800 shadow-2xl shadow-slate-900/40' : 'bg-[#fcfcfc] border-slate-200/60 shadow-xl shadow-slate-200/20 hover:shadow-glow'}
                `}
              >
                {/* Mock Browser UI Shell (Header) */}
                <div className={`h-10 border-b flex items-center px-6 gap-2 shrink-0 relative z-20 ${
                  isDark ? 'bg-slate-800/80 border-slate-700/50 backdrop-blur-md' : 'bg-slate-50/80 border-slate-200 backdrop-blur-md'
                }`}>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <div className={`mx-auto flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase ${
                    isDark ? 'text-slate-400' : 'text-slate-400'
                  }`}>
                    {recipe.mockType === 'code' && <Code2 className="w-3.5 h-3.5" />}
                    {recipe.mockType === 'terminal' && <Terminal className="w-3.5 h-3.5" />}
                    {recipe.mockType === 'ui' && <Workflow className="w-3.5 h-3.5" />}
                    {recipe.category}
                  </div>
                </div>

                <div className="relative flex-1 p-8 flex flex-col justify-end overflow-hidden">
                  {/* Hover Background Accent */}
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-700 z-0 ${recipe.gradient}`} />
                  
                  {/* --- THE "DRY GOODS" MOCKUP AREA --- */}
                  <div className={`absolute inset-0 pt-10 px-6 pb-32 overflow-hidden transition-transform duration-700 group-hover:scale-105 z-10 opacity-40 group-hover:opacity-100 ${
                    isDark ? 'opacity-30' : 'opacity-20'
                  }`}>
                    {recipe.mockType === 'code' && (
                      <pre className={`text-[10px] sm:text-xs font-mono leading-relaxed tracking-tight ${isDark ? 'text-brand-300/80' : 'text-slate-600'}`}>
                        <code>{recipe.mockContent}</code>
                      </pre>
                    )}
                    {recipe.mockType === 'terminal' && (
                      <pre className={`text-[10px] sm:text-xs font-mono leading-relaxed ${isDark ? 'text-green-400/80' : 'text-brand-700'}`}>
                        <code>{recipe.mockContent}</code>
                      </pre>
                    )}
                    {recipe.mockType === 'ui' && (
                      <div className={`mt-4 p-4 border rounded-xl font-mono text-xs ${isDark ? 'border-brand-500/30 text-brand-300' : 'border-brand-200 bg-white text-brand-700'}`}>
                        {recipe.mockContent}
                      </div>
                    )}
                    {/* Fade out mask for text */}
                    <div className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t ${isDark ? 'from-slate-900' : 'from-[#fcfcfc]'} to-transparent z-10`}></div>
                  </div>
                  {/* ----------------------------------- */}

                  <div className="relative z-20 mt-auto drop-shadow-md">
                    <h3 className={`font-black tracking-tighter mb-4 ${
                      isDark ? 'text-white text-3xl md:text-4xl' : 'text-slate-900 text-2xl'
                    }`}>
                      {recipe.title}
                    </h3>
                    <p className={`font-semibold leading-relaxed ${
                      isDark ? 'text-slate-300 text-lg max-w-sm' : 'text-slate-600 text-base'
                    }`}>
                      {recipe.description}
                    </p>
                  </div>
                  
                  {/* Subtle Action Link */}
                  <div className="mt-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 relative z-20">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-brand-400' : 'text-brand-600'}`}>
                      Explore Implementation
                    </span>
                    <ArrowUpRight className={`w-4 h-4 ${isDark ? 'text-brand-400' : 'text-brand-600'}`} />
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

