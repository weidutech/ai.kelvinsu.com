import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { ArrowUpRight, Box, Command, Sparkles } from "lucide-react";

/**
 * 独立产品展示 (Product Showcase)
 * 用于展示作者独立开发的 APP、工具或平台。
 */
const products = [
  {
    id: "product-1",
    name: "Prompt Flow Editor",
    tagline: "可视化 Prompt 编排工具",
    description: "专为复杂 AI 任务设计的节点式 Prompt 编辑器。通过拖拽即可完成多步推理、条件分支与数据清洗的 Prompt 流搭建，一键导出 API 配置。",
    icon: Command,
    url: "#", // 替换为真实链接
    stats: "1.2k+ Active Users",
    theme: "bg-slate-900 border-slate-800 text-white",
    iconBg: "bg-slate-800 text-brand-400",
  },
  {
    id: "product-2",
    name: "DocuMind AI",
    tagline: "沉浸式 AI 知识库对话",
    description: "极简的本地知识库 RAG 客户端。无需配置数据库，直接拖入 PDF/Markdown，即可在极速响应的界面中与你的专属资料库对话。",
    icon: Box,
    url: "#", // 替换为真实链接
    stats: "Mac & Windows",
    theme: "bg-white border-slate-200/60 shadow-xl shadow-slate-200/20 hover:shadow-glow",
    iconBg: "bg-slate-50 text-indigo-500",
  },
];

export function ProductShowcase() {
  return (
    <Section className="bg-[#fafafa] py-32 relative overflow-hidden border-t border-slate-200/50">
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Independent Apps
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              独立研发产品
            </h2>
            <p className="text-slate-500 font-medium text-lg max-w-xl leading-relaxed">
              除了提供工作流与源码，我也在将最高频的 AI 需求封装成开箱即用的独立工具。
            </p>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center text-sm font-black text-slate-400 hover:text-indigo-600 transition-all duration-300 pb-2 border-b-2 border-transparent hover:border-indigo-500"
          >
            查看所有产品
            <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
          {products.map((product) => {
            const Icon = product.icon;
            
            return (
              <div 
                key={product.id}
                className={`group relative rounded-[2rem] p-10 border transition-all duration-500 hover:-translate-y-2 ${product.theme} flex flex-col md:flex-row gap-8 items-start`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${product.iconBg}`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <div className="flex-1">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    {product.tagline}
                  </div>
                  <h3 className={`text-2xl font-black mb-4 tracking-tight ${product.theme.includes('bg-slate-900') ? 'text-white' : 'text-slate-900'}`}>
                    {product.name}
                  </h3>
                  <p className={`text-sm font-medium leading-relaxed mb-8 ${product.theme.includes('bg-slate-900') ? 'text-slate-400' : 'text-slate-500'}`}>
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`text-xs font-bold ${product.theme.includes('bg-slate-900') ? 'text-brand-400' : 'text-indigo-600'}`}>
                      {product.stats}
                    </span>
                    <a 
                      href={product.url}
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                        product.theme.includes('bg-slate-900') 
                          ? 'bg-slate-800 text-white hover:bg-brand-500' 
                          : 'bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600'
                      }`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
