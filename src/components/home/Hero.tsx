import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ArrowRight, BookOpen, Rocket, Briefcase, Bot, TrendingUp, Cpu, Terminal, Smartphone } from "lucide-react";
import { RecentActivityTicker } from "./RecentActivityTicker";
import { WechatDialog } from "@/components/ui/WechatDialog";
import { RoadmapDialog } from "@/components/ui/RoadmapDialog";
import { Button } from "@/components/ui/Button";

/**
 * Hero —— Persona-Driven Commercial Landing Page with Dynamic Animations
 */
export function Hero() {
  const COURSE_CARDS = [
    {
      id: "free",
      href: "/docs/guide/00-overview",
      isDark: false,
      icon: BookOpen,
      iconBg: "bg-gradient-to-br from-brand-400 to-brand-600 shadow-brand-500/30",
      hoverBg: "from-brand-50/80 to-transparent",
      tag1: "Beginner",
      tag1Class: "bg-brand-100 text-brand-700",
      tag2: "🔥 必看入门",
      title: "免费学：0到1 AI 全栈指南",
      desc: "从环境配置到第一个 Agent，手把手教你零成本入门。",
      arrowClass: "text-brand-600",
    },
    {
      id: "coze",
      isDark: false,
      icon: Bot,
      iconBg: "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/30",
      hoverBg: "from-emerald-50/80 to-transparent",
      tag1: "Coze",
      tag1Class: "bg-emerald-100 text-emerald-700",
      tag2: "⚡️ 极速提效",
      title: "实战：扣子 (Coze) 提效课",
      desc: "零代码打造专属智能助手，普通人极速上手的高效利器。",
      arrowClass: "text-emerald-600",
    },
    {
      id: "vibe",
      isDark: false,
      icon: Smartphone,
      iconBg: "bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-500/30",
      hoverBg: "from-purple-50/80 to-transparent",
      tag1: "Vibe Coding",
      tag1Class: "bg-purple-100 text-purple-700",
      tag2: "✨ 独立开发",
      title: "全栈：Vibe Coding 从 0 到 1",
      desc: "普通人的高性价比神课，不写代码极速搞定网站、APP与小程序。",
      arrowClass: "text-purple-600",
    },
    {
      id: "ip",
      isDark: false,
      icon: TrendingUp,
      iconBg: "bg-gradient-to-br from-rose-400 to-rose-600 shadow-rose-500/30",
      hoverBg: "from-rose-50/80 to-transparent",
      tag1: "Personal IP",
      tag1Class: "bg-rose-100 text-rose-700",
      tag2: "🚀 流量密码",
      title: "爆款：AI 自媒体与 IP 打造",
      desc: "复盘百万播放视频背后的 AI 创作流，从零起盘超级个体。",
      arrowClass: "text-rose-600",
    },
    {
      id: "engineer",
      isDark: false,
      icon: Cpu,
      iconBg: "bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-cyan-500/30",
      hoverBg: "from-cyan-50/80 to-transparent",
      tag1: "Engineer",
      tag1Class: "bg-cyan-100 text-cyan-700",
      tag2: "💎 核心内功",
      title: "内功：大厂 AI 工程师工作流",
      desc: "揭秘大厂 AI 研发内功、高阶 Prompt 与模型调优实战。",
      arrowClass: "text-cyan-600",
    },
    {
      id: "claude",
      isDark: false,
      icon: Terminal,
      iconBg: "bg-gradient-to-br from-amber-400 to-amber-600 shadow-amber-500/30",
      hoverBg: "from-amber-50/80 to-transparent",
      tag1: "Dev Tools",
      tag1Class: "bg-amber-100 text-amber-700",
      tag2: "🛠️ 开源平替",
      title: "实战：Claude Code 与 AI 编程",
      desc: "手把手教你 Roo Code 等开源神器，零基础提效开发。",
      arrowClass: "text-amber-600",
    },
    {
      id: "monetization",
      isDark: true,
      icon: Rocket,
      iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/40",
      hoverBg: "from-indigo-500/10 to-transparent",
      tag1: "Monetization",
      tag1Class: "bg-indigo-500/20 text-indigo-300",
      tag2: "💰 搞钱闭环",
      title: "进阶：商业闭环与产品课",
      desc: "解锁 16+ 真实案例，把 AI 转化成可规模化的副业。",
      arrowClass: "text-indigo-400",
    },
    {
      id: "enterprise",
      isDark: false,
      icon: Briefcase,
      iconBg: "bg-gradient-to-br from-blue-500 to-slate-800 shadow-blue-500/30",
      hoverBg: "from-blue-50/80 to-transparent",
      tag1: "Enterprise",
      tag1Class: "bg-blue-100 text-blue-700",
      tag2: "👑 高端定制",
      title: "1对1：企业级咨询与内训",
      desc: "针对团队痛点，深度定制降本增效的私有化 AI 工作流方案。",
      arrowClass: "text-slate-900",
    },
  ];

  const renderCard = (card: typeof COURSE_CARDS[0], index: number) => {
    const Icon = card.icon;
    const isDark = card.isDark;

    const content = (
      <>
        {/* Hover Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${card.hoverBg}`}></div>
        {isDark && (
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        )}
        
        {/* Background Watermark Number */}
        <div className={`absolute -right-4 -top-8 text-[120px] font-black italic opacity-[0.03] pointer-events-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
          0{index + 1}
        </div>

        {/* Rich Icon Container (Dopamine Effect) */}
        <div className={`relative z-10 w-14 h-14 shrink-0 rounded-[1.25rem] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 ${card.iconBg}`}>
          <Icon className="w-7 h-7 text-white drop-shadow-md" />
          <div className="absolute inset-0 rounded-[1.25rem] bg-gradient-to-tr from-white/0 to-white/20 border border-white/10"></div>
        </div>

        <div className="relative z-10 flex-1 min-w-0">
          {/* Dopamine Tags */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-black tracking-widest uppercase ${card.tag1Class}`}>
              {card.tag1}
            </span>
            <span className="text-[11px] font-bold text-slate-500 truncate">
              {card.tag2}
            </span>
          </div>

          <h3 className={`text-lg font-black mb-1 truncate tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {card.title}
          </h3>
          <p className={`text-sm font-medium leading-snug truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {card.desc}
          </p>
        </div>
        
        <div className={`relative z-10 w-10 h-10 shrink-0 rounded-full flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:flex ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
          <ArrowRight className={`w-5 h-5 ${card.arrowClass}`} />
        </div>
      </>
    );

    const containerClasses = `group relative py-4 px-5 rounded-[2rem] border transition-all duration-500 flex items-center gap-5 overflow-hidden cursor-pointer ${
      isDark 
        ? 'bg-slate-900 border-slate-800 shadow-2xl hover:shadow-glow-indigo' 
        : 'bg-white border-slate-200/60 shadow-md hover:shadow-xl hover:shadow-slate-200/50'
    }`;

    if (card.href) {
      return (
        <Link key={card.id} href={card.href} className={containerClasses}>
          {content}
        </Link>
      );
    }

    return (
      <WechatDialog key={card.id}>
        <div className={containerClasses}>
          {content}
        </div>
      </WechatDialog>
    );
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#fafafa] pt-20 pb-20">
      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Animated Glowing Orbs */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-[1000px] h-[1000px] bg-gradient-to-tr from-brand-200/20 to-indigo-300/10 rounded-full blur-[140px] opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[800px] h-[800px] bg-gradient-to-tr from-blue-200/20 to-brand-300/10 rounded-full blur-[120px] opacity-60 animate-blob animation-delay-2000"></div>
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-stretch">
          
          {/* Left Content Area (Value Proposition) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left animate-slide-up relative z-20">
            
            {/* Personal IP Avatar & Credentials */}
            <div className="flex items-center gap-4 mb-8 group cursor-default">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-brand-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-xl">
                  <img src="/images/avatar.jpg" alt="Kelvin" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-base font-black text-slate-900 tracking-tight">Kelvin Su</span>
                  <Link href="/about" className="group/link inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900 text-white hover:bg-brand-500 transition-all text-[10px] font-bold shadow-sm">
                    了解我 <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                  <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[9px] font-black uppercase tracking-widest text-slate-500">QS Top 10 硕士</span>
                </div>
                <span className="text-xs font-bold text-slate-500">一线大厂 AI 研究员 · 独立开发者</span>
              </div>
            </div>

            {/* Live Update Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 shadow-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-[10px] font-black tracking-[0.1em] text-orange-600 uppercase">
                V2.0 2026 全新商业工作流已上线
              </span>
            </div>

            <h1 className="text-6xl sm:text-7xl font-[900] tracking-tight text-slate-900 leading-[1.05] mb-6 relative">
              <span className="relative inline-block">
                让 AI 替你打工
                {/* Micro UI Badge Floating */}
                <div className="absolute -top-6 -right-12 hidden md:flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-lg rotate-12 animate-float">
                  <span className="text-[10px] font-black text-emerald-500">ROI +320%</span>
                </div>
              </span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600">
                  超级杠杆
                </span>
                {/* Underline swoosh animation */}
                <svg className="absolute w-[110%] h-4 -bottom-1 -left-[5%] text-brand-400/20 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              就是现在。
            </h1>

            <p className="max-w-[480px] text-lg text-slate-600 leading-relaxed font-medium mb-10">
              这里不讲纸上谈兵的理论。作为一线大厂研究员与多款独立产品的作者，我只分享那些 <strong className="text-slate-900">亲手研发、真正跑通了 To B / To C 商业闭环</strong> 的实战架构、Agent 脚本与高转化 Prompt。
            </p>

            <div className="flex flex-wrap gap-4">
              <RoadmapDialog>
                <Button size="lg" className="rounded-2xl px-8 h-14 text-[15px] font-black tracking-wide shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40 w-full sm:w-auto">
                  获取 2026 学习路线图 <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </RoadmapDialog>
              <Button href="/docs/guide/00-overview" variant="outline" size="lg" className="rounded-2xl px-8 h-14 text-[15px] font-black tracking-wide bg-white/50 backdrop-blur-sm border-slate-200/80 hover:bg-white w-full sm:w-auto">
                开始免费学习
              </Button>
            </div>
          </div>

          {/* Right Content Area - Persona Intent Routing Cards */}
          <div className="lg:col-span-7 relative w-full lg:pl-12 h-full z-10 group/marquee">
            <div className="absolute inset-y-0 right-0 left-0 lg:left-12 overflow-hidden rounded-[2rem]">
              {/* Gradient Masks for Seamless Scroll */}
              <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#fafafa] to-transparent z-20 pointer-events-none transition-opacity duration-500 group-hover/marquee:opacity-30"></div>
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#fafafa] to-transparent z-20 pointer-events-none transition-opacity duration-500 group-hover/marquee:opacity-30"></div>

              <div className="flex flex-col gap-4 animate-marquee-vertical hover:[animation-play-state:paused] pt-4">
              {/* Set 1 */}
              <div className="flex flex-col gap-4">
                {COURSE_CARDS.map((card, idx) => renderCard(card, idx))}
              </div>

              {/* Set 2 (Duplicated for seamless loop) */}
              <div className="flex flex-col gap-4">
                {COURSE_CARDS.map((card, idx) => renderCard(card, idx))}
              </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes marquee-vertical {
                from { transform: translateY(0); }
                to { transform: translateY(calc(-50% - 8px)); }
              }
              .animate-marquee-vertical {
                animation: marquee-vertical 40s linear infinite;
              }
            `}} />
            </div>
          </div>
        </div>

        {/* Secondary Grid for auxiliary info (kept parallel to left column) */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 mt-12">
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            {/* Social Proof: Live Activity Ticker */}
            <div className="flex items-center gap-6 pt-8 border-t border-slate-200/60 w-full max-w-md">
              <div className="flex -space-x-3 shrink-0">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64",
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64",
                  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=64&h=64",
                ].map((src, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#fafafa] bg-slate-200 overflow-hidden shadow-sm relative z-10">
                    <img src={src} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <RecentActivityTicker />
            </div>

            {/* Authority / Tech Stack Bar */}
            <div className="w-full pt-8 mt-8 border-t border-slate-200/60 hidden sm:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                核心工作流全面接入以下前沿生态
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="h-6 flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-slate-900 rounded-sm"></div>
                  <span className="font-black text-xs tracking-tighter">ChatGPT / Claude</span>
                </div>
                <div className="h-6 flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  <span className="font-black text-xs tracking-tighter">国内大模型群</span>
                </div>
                <div className="h-6 flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-brand-600 rounded-sm rotate-45"></div>
                  <span className="font-black text-xs tracking-tighter">Midjourney</span>
                </div>
                <div className="h-6 flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>
                  <span className="font-black text-xs tracking-tighter">Dify / Coze</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

