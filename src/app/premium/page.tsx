import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Crown, Zap, MessageCircle, LockOpen, Sparkles, Code2 } from "lucide-react";
import { WechatDialog } from "@/components/ui/WechatDialog";
import { requireUser } from "@/lib/supabase/require-user";

export const metadata = {
  title: "VIP 高阶会员",
  description: "解锁全部 16+ 商业级 AI 实战案例、源码及专属陪伴圈。",
};

export const dynamic = "force-dynamic";

const features = [
  {
    icon: Code2,
    title: "16+ 商业级案例源码",
    description: "从 0 到 1 的完整代码与 Prompt 模板，直接复制到你的业务中，开箱即用。",
  },
  {
    icon: Zap,
    title: "前沿技术内参",
    description: "过滤全网噪音。每周更新 AI 工程化、最新模型评测及套壳产品拆解报告。",
  },
  {
    icon: MessageCircle,
    title: "专属高质量陪伴圈",
    description: "加入高密度的付费社群。这里有独立开发者、自媒体人和企业高管，你的问题总有答案。",
  },
  {
    icon: LockOpen,
    title: "新课程永久免费",
    description: "一次买断，终身授权。未来新增的所有高阶实战案例及工具包，无需二次付费。",
  },
];

const faqs = [
  {
    q: "这个高阶课适合完全零基础的小白吗？",
    a: "本课程侧重于「商业变现」与「工程落地」。如果你连基础的 AI 概念都不懂，建议先看完我们【免费知识库】中的 54 篇基础指南。如果你已经会用工具，想知道怎么用它来搞钱或提效，那直接闭眼入。",
  },
  {
    q: "购买后如何解锁内容？",
    a: "点击购买后，会跳转至「爱发电」平台进行支付。支付成功后，你将自动获得专属的内部社群入口及源码仓库的访问权限。",
  },
  {
    q: "会有后续更新吗？需要二次付费吗？",
    a: "绝对不需要。这是终身买断制会员。AI 技术迭代极快，我们的案例库也会以每月 2-3 个核心场景的速度持续更新，你将免费享受所有新增内容。",
  },
];

export default async function PremiumPage() {
  await requireUser("/premium");

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-brand-300/30 to-amber-300/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <Container className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200/60 shadow-sm mb-8">
            <Crown className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-extrabold tracking-wider text-amber-700 uppercase">
              Kelvin VIP Membership
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            不要把时间浪费在摸索上。<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
              直接复制我的商业外脑。
            </span>
          </h1>
          
          <p className="mt-6 text-xl text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
            跨越从“知道”到“做到”的鸿沟。解锁全套闭环源码、专属武器库，并在高密度圈子里获得 Kelvin 的一手实战经验。
          </p>
        </Container>
      </section>

      {/* Pricing & Value Prop Split */}
      <Container className="max-w-6xl relative z-10 -mt-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Value Proposition */}
          <div className="lg:col-span-7 bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-brand-500" />
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">成为 VIP，你能得到什么？</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="flex flex-col">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-brand-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Pricing Card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-[2.5rem] blur-xl opacity-30"></div>
            <div className="relative bg-slate-900 text-white rounded-[2rem] p-8 md:p-10 border border-slate-800 shadow-2xl shadow-slate-900/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-amber-400 mb-2">高阶实战课 + 终身会员</h3>
                <p className="text-slate-400 text-sm font-medium mb-6">全网唯一面向工程落地与商业变现的 AI 体系课</p>
                
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-black tracking-tight">¥299</span>
                  <span className="text-slate-400 font-semibold line-through text-lg">¥999</span>
                  <span className="text-sm font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full ml-2">限时早鸟价</span>
                </div>

                <div className="space-y-4 mb-10">
                  {["16+ 闭环案例源码 & Prompt", "专属私密社群入场券", "每月新增实战案例免费看", "简历/商业项目针对性建议"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0" />
                      <span className="text-slate-200 font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <WechatDialog>
                  <div 
                    className="flex items-center justify-center w-full py-6 text-lg rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    添加微信获取内部名额
                  </div>
                </WechatDialog>
                <p className="text-center text-xs text-slate-500 font-medium mt-4">
                  一次支付，终身受用。支持微信/支付宝。
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* FAQ Section */}
      <Container className="max-w-3xl mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">常见问题</h2>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.q}</h3>
              <p className="text-slate-600 leading-relaxed font-medium text-sm md:text-base">{faq.a}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
