import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { loginAction } from "@/app/auth/login/action";

export const metadata = {
  title: "登录",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string; next?: string }>;
}) {
  const { error, message, next } = await searchParams;

  return (
    <div className="min-h-[calc(100vh-88px)] bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">
            Private Access
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
            登录后查看私域内容
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            现在开始，教程库、会员页和后续内容区都只对登录用户开放。
          </p>
        </div>

        {message ? (
          <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        ) : null}

        {error ? (
          <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <AuthForm
          action={loginAction}
          idleLabel="登录"
          pendingLabel="正在登录，请稍等..."
        >
          <input type="hidden" name="next" value={next || "/members"} />

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">邮箱</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:bg-white"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">密码</span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:bg-white"
              placeholder="请输入你的密码"
            />
          </label>

          <p className="text-xs leading-5 text-slate-400">
            点击后如果需要 1 到 3 秒，请先别重复点击，我们正在校验登录状态。
          </p>
        </AuthForm>

        <p className="mt-6 text-sm text-slate-500">
          还没有账号？
          <Link href={`/signup${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="ml-2 font-semibold text-brand-600 hover:text-brand-700">
            去注册
          </Link>
        </p>
      </div>
    </div>
  );
}
