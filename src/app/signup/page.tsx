import Link from "next/link";
import { signUpAction } from "@/app/auth-actions";
import { AuthSubmitButton } from "@/components/auth/AuthSubmitButton";

export const metadata = {
  title: "注册",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <div className="min-h-[calc(100vh-88px)] bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">
            Create Account
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
            先注册，再进入内容区
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            第一版先用邮箱注册。注册成功后，你会收到一封确认邮件，确认后就能登录查看站内内容。
          </p>
        </div>

        {error ? (
          <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <form action={signUpAction} className="space-y-4">
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
              minLength={6}
              autoComplete="new-password"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:bg-white"
              placeholder="至少 6 位"
            />
          </label>

          <AuthSubmitButton idleLabel="注册" pendingLabel="正在创建账号，请稍等..." />

          <p className="text-xs leading-5 text-slate-400">
            注册时需要同时创建账号并请求确认邮件，通常会慢 1 到 3 秒，请不要连续重复点击。
          </p>
        </form>

        <p className="mt-6 text-sm text-slate-500">
          已经有账号？
          <Link href={`/login${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="ml-2 font-semibold text-brand-600 hover:text-brand-700">
            去登录
          </Link>
        </p>
      </div>
    </div>
  );
}
