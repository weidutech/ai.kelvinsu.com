import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { CheckCircle2, ShieldCheck, Sparkles, Zap } from "lucide-react";

export const metadata = {
  title: "登录",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string; next?: string }>;
}) {
  const { error, message, next } = await searchParams;

  const isIntercept = next?.includes("/members") || next?.includes("/premium");

  return (
    <div className="min-h-[calc(100vh-88px)] bg-slate-50 flex items-center justify-center p-4 py-12 overflow-hidden">
      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10">
        
        {/* Left Promotional Side */}
        <div className="md:w-5/12 bg-slate-900 p-10 md:p-12 flex flex-col justify-between relative overflow-hidden text-white shrink-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              Kelvin Studio
            </div>
            <h2 className="text-3xl md:text-4xl font-black leading-tight mb-6">
              {isIntercept ? "解锁高价值私域库" : "欢迎回来"}
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed mb-10 text-sm">
              {isIntercept 
                ? "你正在访问受保护的私域内容。注册加入即可获取我亲手打磨的最新商业 AI 工作流、高转化 Prompt 库与全套项目源码。" 
                : "登录以继续访问你的私域知识库、下载最新更新的 AI 工作流源码，并保持与社群的同步。"}
            </p>
            
            <div className="space-y-6">
              {[
                { icon: Zap, text: "即拿即用的一手商业工作流" },
                { icon: ShieldCheck, text: "全套防踩坑的落地实战指南" },
                { icon: CheckCircle2, text: "高质量的实战派私密交流圈" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-400 shrink-0 shadow-sm">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-200">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10 mt-16 pt-8 border-t border-white/10">
            <p className="text-xs text-slate-500 font-medium">
              &copy; 2026 Kelvin Studio. 让机器替你打工。
            </p>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="md:w-7/12 p-10 md:p-16 flex flex-col justify-center bg-white relative z-10">
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 mb-2">
                登录账号
              </h1>
              <p className="text-sm font-medium text-slate-500">
                输入你的邮箱以进入工作台
              </p>
            </div>

            {message ? (
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                {message}
              </div>
            ) : null}

            {error ? (
              <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {error}
              </div>
            ) : null}

            <AuthForm
              action="/auth/login"
              idleLabel="登录进入私域"
              pendingLabel="正在验证身份..."
            >
              <input type="hidden" name="next" value={next || "/members"} />

              <div className="space-y-5 mb-6">
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-400">邮箱账号</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-900 outline-none transition-all focus:border-brand-500 focus:bg-white focus:shadow-sm"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
                    安全密码
                  </span>
                  <input
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-900 outline-none transition-all focus:border-brand-500 focus:bg-white focus:shadow-sm"
                    placeholder="••••••••"
                  />
                </label>
              </div>

            </AuthForm>

            <div className="mt-10 text-center relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-slate-400 font-medium">或者是新朋友？</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link 
                href={`/signup${next ? `?next=${encodeURIComponent(next)}` : ""}`} 
                className="inline-flex items-center justify-center w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900"
              >
                立刻免费注册
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
