import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ArrowRight, BookOpen, Rocket, Briefcase } from "lucide-react";
import { RecentActivityTicker } from "./RecentActivityTicker";
import { WechatDialog } from "@/components/ui/WechatDialog";

/**
 * Hero —— Persona-Driven Commercial Landing Page with Dynamic Animations
 */
export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-slate-50 pt-20 pb-32">
      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Animated Glowing Orbs */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-gradient-to-tr from-brand-300/30 to-blue-400/20 rounded-full blur-[120px] opacity-60 animate-blob"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-brand-200/40 rounded-full blur-[100px] opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-indigo-300/20 rounded-full blur-[100px] opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Content Area (Value Proposition) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left animate-in">
            {/* Personal IP Avatar & Badge */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg shadow-slate-200">
                <img src="/images/avatar.jpg" alt="Kelvin" className="w-full h-full object-cover" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
                  Kelvin 的实战基地
                </span>
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              在这里，把 AI <br />
              变成你的<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-600 relative inline-block">
                超级杠杆
                {/* Underline swoosh animation */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-400/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed font-medium">
              你好，我是 Kelvin。无论你是想从零掌握 AI 技能、寻找副业变现路径，还是需要企业级的 AI 降本增效方案，这里都有为你准备的系统化实战资源。
            </p>

            {/* Social Proof / Stats Ticker */}
            <div className="mt-12 flex items-center gap-6 pt-8 border-t border-slate-200/80 w-full">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-50 bg-slate-200 flex items-center justify-center overflow-hidden hover:-translate-y-1 transition-transform">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=e2e8f0`} alt="user" className="w-full h-full" />
                  </div>
                ))}
              </div>
              <RecentActivityTicker />
            </div>
          </div>

          {/* Right Content Area - Persona Intent Routing Cards */}
          <div className="lg:col-span-7 relative w-full lg:pl-12 animate-in delay-200">
            <div className="flex flex-col gap-5">
              
              {/* Persona 1: Free Learners */}
              <Link href="/docs/guide/00-overview" className="group relative bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex items-center gap-6 overflow-hidden animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 w-14 h-14 shrink-0 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors">
                  <BookOpen className="w-6 h-6 text-slate-600 group-hover:text-brand-600" />
                </div>
                <div className="relative z-10 flex-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">我是新手 / 白嫖党</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-brand-700 transition-colors">免费学：54篇 AI 实战指南</h3>
                  <p className="text-sm text-slate-500">从 0 到 1，教你如何安装配置并完成第一个 AI 自动化任务。</p>
                </div>
                <div className="relative z-10 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </div>
              </Link>

              {/* Persona 2: Monetizers */}
              <WechatDialog>
                <div className="group relative bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg hover:shadow-2xl hover:shadow-brand-500/20 hover:-translate-y-2 transition-all duration-300 flex items-center gap-6 overflow-hidden lg:-ml-6 animate-float-delayed z-10 cursor-pointer text-left">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Glowing edge effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent"></div>
                    <div className="absolute bottom-0 right-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                  </div>

                  <div className="relative z-10 w-14 h-14 shrink-0 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:bg-brand-500 transition-colors">
                    <Rocket className="w-6 h-6 text-slate-300 group-hover:text-white" />
                  </div>
                  <div className="relative z-10 flex-1">
                    <div className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">我想搞钱 / 做产品</div>
                    <h3 className="text-xl font-bold text-white mb-1">高阶课：全栈商业闭环与变现</h3>
                    <p className="text-sm text-slate-400">解锁 16+ 深度商业案例，不写代码也能打造你的独立副业产品。</p>
                  </div>
                  <div className="relative z-10 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-brand-500 transition-colors shadow-lg">
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white" />
                  </div>
                </div>
              </WechatDialog>

              {/* Persona 3: Bosses / Consulting */}
              <WechatDialog>
                <div className="group relative bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex items-center gap-6 overflow-hidden animate-float cursor-pointer text-left">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 w-14 h-14 shrink-0 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Briefcase className="w-6 h-6 text-slate-600 group-hover:text-blue-600" />
                  </div>
                  <div className="relative z-10 flex-1">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">我是老板 / 企业主</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">1对1：企业 AI 降本增效咨询</h3>
                    <p className="text-sm text-slate-500">针对性诊断业务痛点，为你定制专属的内部 AI 工作流落地方案。</p>
                  </div>
                  <div className="relative z-10 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white" />
                  </div>
                </div>
              </WechatDialog>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

