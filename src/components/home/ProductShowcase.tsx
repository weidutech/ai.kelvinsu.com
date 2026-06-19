import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { ArrowUpRight, Heart, LineChart, Sparkles } from "lucide-react";

/**
 * 独立产品展示 (Product Showcase)
 * 用于展示作者独立开发的 APP、工具或平台。
 */
const products = [
  {
    id: "lovecue",
    name: "lovecue.app",
    tagline: "AI 恋爱军师",
    description: "全方位分析约会语境的高情商社交助手。支持原生跨应用自动化，只需通过系统快捷指令触发，即可直接在聊天软件内部一键生成并发送神回复。",
    icon: Heart,
    url: "https://lovecue.app",
    stats: "🔥 快捷指令 · 自动回复",
    isDark: false,
    theme: "bg-white border-slate-200/60 shadow-xl shadow-slate-200/20 hover:shadow-xl hover:shadow-rose-500/10 hover:border-rose-200",
    iconBg: "bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-lg shadow-rose-500/30",
    tagColor: "text-rose-500",
    statsColor: "text-rose-600",
    btnClass: "bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white"
  },
  {
    id: "doum",
    name: "抖 M",
    tagline: "一站式爆款挖掘神器",
    description: "输入 creator_id、sec_uid 或抖音链接，秒速进入达人商业画像、相似图谱及粉丝词云。专为操盘手打造的达人挖掘、作品深度拆解与一键拉片提文案平台。",
    icon: LineChart,
    url: "#",
    stats: "💎 数据洞察 · 竞品拆解",
    isDark: true,
    theme: "bg-slate-900 border-slate-800 text-white shadow-2xl hover:shadow-glow-indigo",
    iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/40",
    tagColor: "text-indigo-400",
    statsColor: "text-brand-400",
    btnClass: "bg-slate-800 text-white hover:bg-indigo-500 hover:text-white"
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
                className={`group relative rounded-[2rem] p-10 border transition-all duration-500 hover:-translate-y-2 flex flex-col md:flex-row gap-8 items-start ${product.theme}`}
              >
                <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 ${product.iconBg}`}>
                  <Icon className="w-8 h-8 drop-shadow-md" />
                </div>
                
                <div className="flex-1">
                  <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${product.tagColor}`}>
                    {product.tagline}
                  </div>
                  <h3 className={`text-2xl font-black mb-4 tracking-tight ${product.isDark ? 'text-white' : 'text-slate-900'}`}>
                    {product.name}
                  </h3>
                  <p className={`text-sm font-medium leading-relaxed mb-8 ${product.isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`text-[11px] font-bold ${product.statsColor}`}>
                      {product.stats}
                    </span>
                    <a 
                      href={product.url}
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${product.btnClass}`}
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
