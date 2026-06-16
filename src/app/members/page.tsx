import Link from "next/link";
import { requireUser } from "@/lib/supabase/require-user";

type MemberProfile = {
  email: string;
  display_name: string | null;
  wechat: string | null;
};

type MemberEntitlement = {
  plan: string;
  status: string;
  granted_at: string;
  expires_at: string | null;
};

export const metadata = {
  title: "会员区",
};

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const { supabase, user } = await requireUser("/members");

  const [{ data: profile, error: profileError }, { data: entitlements, error: entitlementsError }] =
    await Promise.all([
      supabase.from("profiles").select("email, display_name, wechat").eq("id", user?.id || "").maybeSingle(),
      supabase
        .from("entitlements")
        .select("plan, status, granted_at, expires_at")
        .eq("user_id", user?.id || "")
        .order("granted_at", { ascending: false }),
    ]);

  const safeProfile = (profile as MemberProfile | null) || null;
  const safeEntitlements = Array.isArray(entitlements)
    ? (entitlements as MemberEntitlement[])
    : [];

  return (
    <div className="bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">
            Members Area
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
            你已经进入站内私域
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
            第一版先把登录用户体系和内容访问控制搭起来。后面会员权益、付费开通、专属下载区都可以在这里继续长。
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-bold text-slate-900">账户信息</h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                  <dt className="font-medium text-slate-500">邮箱</dt>
                  <dd className="text-right font-semibold text-slate-900">
                    {safeProfile?.email || user?.email || "暂未同步"}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                  <dt className="font-medium text-slate-500">昵称</dt>
                  <dd className="text-right text-slate-900">
                    {safeProfile?.display_name || "暂未填写"}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="font-medium text-slate-500">微信</dt>
                  <dd className="text-right text-slate-900">
                    {safeProfile?.wechat || "后续可以补充"}
                  </dd>
                </div>
              </dl>

              {profileError ? (
                <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-700">
                  资料表还没完全初始化好，所以这里只先展示登录态邮箱。等数据库迁移完成后，这里会自动恢复正常。
                </p>
              ) : null}
            </section>

            <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-bold text-slate-900">当前权限</h2>
              <div className="mt-5 space-y-3">
                {safeEntitlements.length > 0 ? (
                  safeEntitlements.map((item) => (
                    <div key={`${item.plan}-${item.granted_at}`} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.plan}</p>
                          <p className="mt-1 text-xs text-slate-500">状态：{item.status}</p>
                        </div>
                        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                          已开通
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm text-slate-500">
                    目前还没有额外权益记录。第一版先把登录私域跑通，后续再继续挂会员等级。
                  </div>
                )}
              </div>

              {entitlementsError ? (
                <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-700">
                  权益表还没完全初始化好，前端已经预留了结构，数据库一补齐就会自动显示。
                </p>
              ) : null}
            </section>
          </div>

          <section className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">私域入口</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "教程知识库",
                  href: "/docs/guide/00-overview",
                  description: "现在文档内容已经只对登录用户开放。",
                },
                {
                  title: "会员介绍页",
                  href: "/premium",
                  description: "后续这里可以改造成真正的会员货架和权益说明。",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[1.25rem] border border-slate-200 bg-white px-5 py-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm"
                >
                  <p className="text-base font-bold text-slate-900">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
                </Link>
              ))}
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="h-full w-full rounded-[1.25rem] border border-slate-200 bg-white px-5 py-5 text-left transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm"
                >
                  <p className="text-base font-bold text-slate-900">退出登录</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    随时退出当前账号。
                  </p>
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
