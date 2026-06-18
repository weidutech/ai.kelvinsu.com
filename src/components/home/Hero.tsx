import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ArrowRight, BookOpen, Rocket, Briefcase } from "lucide-react";
import { RecentActivityTicker } from "./RecentActivityTicker";
import { WechatDialog } from "@/components/ui/WechatDialog";
import { Button } from "@/components/ui/Button";

/**
 * Hero —— Persona-Driven Commercial Landing Page with Dynamic Animations
 */
export function Hero() {
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
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Content Area (Value Proposition) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left animate-slide-up relative z-20">
            
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
                让机器替你打工
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

            <div className="flex flex-wrap gap-4 mb-10">
              <Button size="lg" className="rounded-2xl px-8 h-14 text-[15px] font-black tracking-wide shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40">
                获取 2026 学习路线图 <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl px-8 h-14 text-[15px] font-black tracking-wide bg-white/50 backdrop-blur-sm border-slate-200/80 hover:bg-white">
                查看真实工作流源码
              </Button>
            </div>

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
                {/* Placeholders for logos - simplified SVGs */}
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

          {/* Right Content Area - Persona Intent Routing Cards */}
          <div className="lg:col-span-6 relative w-full lg:pl-12 animate-slide-up animation-delay-2000 z-10">
            <div className="flex flex-col gap-6 relative">
              {/* Decorative side element */}
              <div className="absolute -left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden lg:block"></div>
              
              {/* Persona 1: Free Learners */}
              <Link href="/docs/guide/00-overview" className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm hover:shadow-glow transition-all duration-500 flex items-center gap-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 w-16 h-16 shrink-0 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                  <BookOpen className="w-7 h-7 text-slate-500 group-hover:text-white" />
                </div>
                <div className="relative z-10 flex-1">
                  <div className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-2">Beginner Friendly</div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">免费学：54 篇全栈指南</h3>
                  <p className="text-sm text-slate-500 font-medium">从环境配置到第一个 Agent，手把手教你零成本入门。</p>
                </div>
                <ArrowRight className="relative z-10 w-6 h-6 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-2 transition-all" />
              </Link>

              {/* Persona 2: Monetizers (Premium Focus) */}
              <WechatDialog>
                <div className="group relative bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl hover:shadow-glow-indigo transition-all duration-500 flex items-center gap-8 overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Glowing line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="relative z-10 w-16 h-16 shrink-0 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:-rotate-6 transition-all duration-500">
                    <Rocket className="w-7 h-7 text-slate-400 group-hover:text-white" />
                  </div>
                  <div className="relative z-10 flex-1">
                    <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Monetization Ready</div>
                    <h3 className="text-2xl font-black text-white mb-2">进阶：商业闭环与产品课</h3>
                    <p className="text-sm text-slate-400 font-medium">解锁 16+ 真实变现案例，把 AI 转化成可规模化的副业。</p>
                  </div>
                  <ArrowRight className="relative z-10 w-6 h-6 text-slate-600 group-hover:text-white group-hover:translate-x-2 transition-all" />
                </div>
              </WechatDialog>

              {/* Persona 3: Bosses / Consulting */}
              <WechatDialog>
                <div className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm hover:shadow-glow transition-all duration-500 flex items-center gap-8 overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 w-16 h-16 shrink-0 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                    <Briefcase className="w-7 h-7 text-slate-500 group-hover:text-white" />
                  </div>
                  <div className="relative z-10 flex-1">
                    <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-2">Enterprise Focus</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">1对1：企业级咨询服务</h3>
                    <p className="text-sm text-slate-500 font-medium">针对团队痛点，深度定制降本增效的 AI 工作流方案。</p>
                  </div>
                  <ArrowRight className="relative z-10 w-6 h-6 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-2 transition-all" />
                </div>
              </WechatDialog>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

