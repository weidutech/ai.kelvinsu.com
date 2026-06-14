import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Container, Section } from "@/components/ui/Container";
import { ArrowUpRight } from "lucide-react";

/**
 * RecipesShowcase —— 精选案例（Premium Bento Grid）
 * - 复杂的网格布局，打破单调
 * - 使用深浅相间的卡片底色与微妙的渐变光晕
 * - 精致的排版层次
 */
const featuredRecipes = [
  {
    href: "/docs/recipes/ppt-skill-walkthrough",
    title: "一句话生成结构化 PPT",
    description: "调用专用 Skill，将模糊的想法转化为逻辑严密的 Slide Deck。",
    category: "内容生产",
    span: "lg:col-span-2 lg:row-span-2",
    theme: "dark",
    gradient: "from-slate-900 to-slate-800",
  },
  {
    href: "/docs/recipes/playwright-mcp",
    title: "操控浏览器自动化",
    description: "让 Codex 像人一样浏览网页、抓取数据并执行截图验证。",
    category: "自动化",
    span: "lg:col-span-1 lg:row-span-1",
    theme: "light",
    gradient: "from-white to-slate-50",
  },
  {
    href: "/docs/recipes/obsidian-codex",
    title: "深度连接 Obsidian",
    description: "在本地知识库中实现无缝的 AI 辅助写作与双链引用。",
    category: "知识管理",
    span: "lg:col-span-1 lg:row-span-1",
    theme: "brand",
    gradient: "from-brand-50 to-white",
  },
  {
    href: "/docs/recipes/github-actions-ci-fix",
    title: "CI/CD 故障自动修复",
    description: "实时监控构建失败日志，自动生成修复代码并提交 PR。",
    category: "DevOps",
    span: "lg:col-span-2 lg:row-span-1",
    theme: "light",
    gradient: "from-white to-slate-50",
  },
];

export function RecipesShowcase() {
  return (
    <Section className="bg-slate-50/50 overflow-hidden py-24">
      <Container size="wide">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-xs font-semibold text-brand-700 uppercase tracking-wider mb-6">
              Battle-Tested Recipes
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">实战场景</span> 深度沉淀
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-medium">
              这些案例不仅仅是教程，更是可以直接复制到你工作流中的“战斗模版”。
            </p>
          </div>
          <Link
            href="/docs/recipes"
            className="group inline-flex items-center text-sm font-bold text-slate-600 hover:text-brand-600 transition-colors pb-2"
          >
            探索全部 16+ 案例
            <ArrowUpRight className="ml-1.5 w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-6">
          {featuredRecipes.map((recipe) => {
            const isDark = recipe.theme === "dark";
            const isBrand = recipe.theme === "brand";
            
            return (
              <Link
                key={recipe.href}
                href={recipe.href}
                className={`group relative flex flex-col justify-between p-8 rounded-[1.5rem] border transition-all duration-500 hover:-translate-y-1 overflow-hidden ${recipe.span}
                  ${isDark ? 'border-slate-800 shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-900/20' : ''}
                  ${isBrand ? 'border-brand-100 shadow-md shadow-brand-500/5 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/10' : ''}
                  ${recipe.theme === 'light' ? 'border-slate-200/60 shadow-sm hover:border-slate-300 hover:shadow-md' : ''}
                `}
              >
                {/* 背景渐变 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${recipe.gradient} -z-10`} />
                
                {/* Dark主题特有装饰 */}
                {isDark && (
                  <>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[60px] pointer-events-none" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                  </>
                )}

                <div className="relative z-10 flex justify-between items-start">
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wider ${
                    isDark ? 'bg-white/10 text-white border border-white/10' : 
                    isBrand ? 'bg-white text-brand-600 border border-brand-100 shadow-sm' : 
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {recipe.category}
                  </div>
                  
                  {/* 右上角图标 */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isDark ? 'bg-white/10 text-white/50 group-hover:bg-white group-hover:text-slate-900' :
                    'bg-slate-50 text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600'
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="relative z-10 mt-auto pt-6">
                  <h3 className={`font-bold tracking-tight mb-3 ${
                    isDark ? 'text-white text-2xl md:text-3xl' : 'text-slate-900 text-xl'
                  }`}>
                    {recipe.title}
                  </h3>
                  <p className={`font-medium leading-relaxed ${
                    isDark ? 'text-slate-300 text-base max-w-md' : 'text-slate-500 text-sm'
                  }`}>
                    {recipe.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
