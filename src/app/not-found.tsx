import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm font-medium text-brand-700">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
        页面没找到
      </h1>
      <p className="mt-3 text-pretty text-slate-600">
        你访问的页面可能已经移动或不存在。回到首页继续浏览 Kelvin AI Guide。
      </p>
      <Link
        href="/"
        className="mt-6 rounded-button bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800"
      >
        返回首页
      </Link>
    </main>
  );
}
