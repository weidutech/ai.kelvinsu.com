import { Container, Section } from "@/components/ui/Container";
import { ArrowRight, CheckCircle2, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const testimonials = [
  {
    id: 1,
    name: "Alex_Design",
    time: "1周前",
    content: "工作流模板太省事了，直接把我的 Midjourney 产出效率提了三倍，终于不用每天熬夜调词了。",
    avatarColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    id: 2,
    name: "一只野生产品汪",
    time: "2周前",
    content: "对于非技术背景来说，这里的 Agent 搭建教程是最通俗易懂的。我已经把公司的周报统计全自动化了，老板都惊了。",
    avatarColor: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    id: 3,
    name: "Neo_T",
    time: "1个月前",
    content: "买大师班之前犹豫了很久，买完发现里面提供的那个 Coze 源码配置直接就能跑通我的业务闭环，回本极快。",
    avatarColor: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    id: 4,
    name: "七七和AI",
    time: "1个月前",
    content: "跟着小红书起号的那套流程走，半个月涨了 3000 粉。这里不卖焦虑，只教纯纯的技术落地，很赞！",
    avatarColor: "bg-brand-50 text-brand-600 border-brand-100",
  },
  {
    id: 5,
    name: "Mark_Tech",
    time: "2个月前",
    content: "Prompt 框架库非常实用，以前总是碰运气，现在每次大模型输出的结果都很稳定，生产力工具实锤了。",
    avatarColor: "bg-purple-50 text-purple-600 border-purple-100",
  },
];

// Duplicate the array for seamless infinite scrolling
const marqueeTestimonials = [...testimonials, ...testimonials];

export function Testimonials() {
  return (
    <Section className="bg-white py-32 border-b border-slate-100 overflow-hidden">
      <Container size="wide">
        <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-stretch px-4">
          
          {/* Left CTA Card (Premium Dark Style) */}
          <div className="lg:w-5/12 w-full shrink-0 relative z-20">
            <div className="relative h-full bg-slate-900 rounded-[2.5rem] p-10 lg:p-12 border border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-center">
              {/* Premium Background Effects */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/10 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-brand-300 mb-8">
                  <Sparkles className="w-3.5 h-3.5" />
                  Unlock Everything
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                  加入 VIP<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">
                    解锁全站资源
                  </span>
                </h2>
                <p className="text-slate-400 text-lg font-medium mb-10 leading-relaxed max-w-sm">
                  一年内所有新课自动解锁，直接带走完整的商业级工作流与变现模板，不再为单课付费。
                </p>
                
                <ul className="space-y-5 mb-12">
                  {[
                    "全站 AI 实战课程无限观看",
                    "商业级工作流资源与源码下载",
                    "专属 Prompt 与 Skill 模板库",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-4 text-sm md:text-base font-bold text-slate-200">
                      <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                <Button 
                  href="/premium"
                  className="w-full py-7 text-base rounded-2xl font-black tracking-widest bg-brand-500 hover:bg-brand-400 text-white shadow-xl shadow-brand-500/30 border-0 transition-all duration-300 hover:-translate-y-1"
                >
                  查看 VIP 专属权益 <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Testimonials Marquee */}
          <div className="lg:w-7/12 w-full flex flex-col justify-center py-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 relative z-20">
              <div>
                <div className="text-sm font-black text-brand-600 uppercase tracking-widest mb-3">
                  User Feedback
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  来自 VIP 的真实反馈
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm font-bold text-slate-500 shadow-sm">
                <MessageSquare className="w-4 h-4 text-slate-400" />
                真实落地成果
              </div>
            </div>

            {/* Marquee Container with fading edges */}
            <div className="relative w-full max-w-[100vw] overflow-hidden">
              {/* Fade masks */}
              <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
              
              <div className="flex gap-6 w-max animate-marquee py-4">
                {marqueeTestimonials.map((t, index) => (
                  <div 
                    key={index}
                    className="w-[320px] md:w-[380px] shrink-0 bg-white border border-slate-200/60 rounded-[1.75rem] p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500 flex flex-col"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-black text-lg shadow-sm ${t.avatarColor}`}>
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-black text-slate-900 text-base truncate max-w-[120px]">{t.name}</span>
                          <span className="bg-gradient-to-r from-amber-100 to-orange-100 text-orange-700 border border-orange-200/50 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider shadow-sm shrink-0">VIP</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">
                          {t.time}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm md:text-base font-semibold text-slate-600 leading-relaxed flex-1">
                      &quot;{t.content}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

        </div>
      </Container>
    </Section>
  );
}
