import Link from "next/link";
import { requireUser } from "@/lib/supabase/require-user";

export const metadata = {
  title: "付费知识库",
};

export const dynamic = "force-dynamic";

export default async function PaidKnowledgeBasePage() {
  await requireUser("/members/paid-knowledge-base");

  const sections = [
    {
      title: "增长变现专区",
      description:
        "重点放已经验证过的内容变现路径，包括选题、成交、私域承接和高客单咨询转化。",
      items: [
        "短视频选题到成交脚本",
        "高客单咨询成交 SOP",
        "私域转化漏斗模板",
      ],
    },
    {
      title: "交付系统专区",
      description:
        "适合已经开始接单、做咨询或内部落地的人，把项目交付做成能复用的标准动作。",
      items: [
        "AI 项目交付清单",
        "客户需求澄清模板",
        "案例复盘与提炼方法",
      ],
    },
    {
      title: "模板资产专区",
      description:
        "把最常用、最省时间的核心资产集中收好，方便你直接改成自己的业务版本。",
      items: [
        "高转化 Prompt 资产包",
        "落地页与会员页文案骨架",
        "项目启动与周复盘模板",
      ],
    },
  ];

  return (
    <div className="bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">
            Members Only
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
            付费知识库
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500">
            这是站点里的独立付费内容 tab。这里不放基础入门，而是集中放更偏变现、交付和模板资产的系统内容，方便会员直接按业务目标来找。
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              href="/members"
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
            >
              返回会员区
            </Link>
            <Link
              href="/docs/guide/00-overview"
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
            >
              先看免费知识库
            </Link>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">
                Premium Section
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                {section.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-500">
                {section.description}
              </p>

              <div className="mt-6 space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-800"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
