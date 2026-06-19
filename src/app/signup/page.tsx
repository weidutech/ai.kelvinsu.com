import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { CheckCircle2, ShieldCheck, Sparkles, Zap } from "lucide-react";

export const metadata = {
  title: "注册",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

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
              加入私域阵地
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed mb-10 text-sm">
              注册即可免费开启基础架构源码。当你准备好进入高阶实战时，在这里即可无缝解锁全部 2026 最新版商业 AI 工作流与全套内参体系。
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
                创建账号
              </h1>
              <p className="text-sm font-medium text-slate-500">
                注册后请前往邮箱点击验证链接
              </p>
            </div>

            {error ? (
              <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {error}
              </div>
            ) : null}

            <AuthForm
              action="/auth/signup"
              idleLabel="免费注册"
              pendingLabel="正在创建账号..."
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
                    minLength={6}
                    autoComplete="new-password"
                    className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-900 outline-none transition-all focus:border-brand-500 focus:bg-white focus:shadow-sm"
                    placeholder="至少 6 位密码"
                  />
                </label>
              </div>

            </AuthForm>

            <div className="mt-10 text-center relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-slate-400 font-medium">已经是老朋友了？</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link 
                href={`/login${next ? `?next=${encodeURIComponent(next)}` : ""}`} 
                className="inline-flex items-center justify-center w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900"
              >
                直接登录
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
