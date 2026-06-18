import { Container, Section } from "@/components/ui/Container";
import { CheckCircle2, MessageSquareText, QrCode, ShieldCheck, Sparkles, Users } from "lucide-react";

export const metadata = {
  title: "高阶私域社群 - Kelvin Studio",
  description: "加入 Kelvin 的 AI 实战与商业变现高质量私域圈子。",
};

const benefits = [
  {
    icon: MessageSquareText,
    title: "高密度实战答疑",
    desc: "在落地工作流或跑跑提示词遇到 Bug？把报错扔到群里，我或群内大佬会直接帮你 Debug，节省你几个小时的瞎折腾时间。",
  },
  {
    icon: Sparkles,
    title: "最新信息源过滤",
    desc: "AI 圈每天有无数新工具发布。我会做第一道人工筛选，只把真正有革命性、能带来生产力跃升的工具和玩法同步到群内。",
  },
  {
    icon: Users,
    title: "高质量人脉网络",
    desc: "群内聚集了同样关注 AI 商业化与个体变现的实战派。从技术极客、自媒体大V 到中小企业主，这里是你碰撞资源与找合伙人的绝佳阵地。",
  },
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-[#fafafa] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-50/60 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/4 -translate-y-1/4"></div>

      <Container size="wide">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 shadow-sm text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            VIP Only
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            不仅仅是买课，<br className="hidden md:block" />
            更是加入一个<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">高价值实战圈</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            工具会过时，但解决问题的圈子和思维不会。购买任意付费方案后，请扫描下方二维码加入我们的高阶微信私域。
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto items-center lg:items-stretch">
          
          {/* Left Area: Benefits */}
          <div className="lg:w-7/12 w-full grid gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="bg-white border border-slate-200/60 rounded-3xl p-8 flex items-start gap-6 shadow-sm hover:shadow-lg hover:shadow-slate-200/40 transition-shadow">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{b.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Area: QR Code Card */}
          <div className="lg:w-5/12 w-full shrink-0 flex flex-col justify-center">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
              {/* Premium Inner Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.15),transparent)] pointer-events-none"></div>
              
              <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 shadow-lg relative z-10">
                <QrCode className="w-7 h-7 text-amber-400" />
              </div>

              <h2 className="text-2xl font-black text-white mb-2 relative z-10">扫描加入微信私域</h2>
              <p className="text-sm font-medium text-slate-400 mb-8 relative z-10 max-w-[240px]">
                添加小助手企业微信，请在通过后<strong className="text-slate-200">发送购买订单号截图</strong>以验证身份入群。
              </p>

              {/* Mock QR Code Frame */}
              <div className="relative p-3 bg-white rounded-2xl shadow-xl w-56 h-56 mx-auto mb-6 z-10">
                {/* 这里的图片可以替换为你真实的微信二维码图片 */}
                <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 gap-3">
                  <QrCode className="w-8 h-8 opacity-20" />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-50">QR Code Here</span>
                </div>

                {/* Decorative scanning corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-4 border-l-4 border-amber-500 rounded-tl-lg"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-4 border-r-4 border-amber-500 rounded-tr-lg"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-4 border-l-4 border-amber-500 rounded-bl-lg"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-4 border-r-4 border-amber-500 rounded-br-lg"></div>
              </div>

              <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5 relative z-10">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 人工审核，通常在 2 小时内通过
              </div>
            </div>
          </div>

        </div>
      </Container>
    </main>
  );
}
