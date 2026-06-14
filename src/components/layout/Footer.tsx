import Link from "next/link";

const footerSections = [
  {
    title: "学习指南",
    links: [
      { name: "入门路线", href: "/docs/guide/00-overview" },
      { name: "日常工作流", href: "/docs/guide/07-task-execution" },
      { name: "CLI 与 IDE", href: "/docs/guide/12-cli-installation" },
      { name: "进阶技巧", href: "/docs/guide/15-agents-md" },
    ],
  },
  {
    title: "实战案例",
    links: [
      { name: "案例总览", href: "/docs/recipes" },
      { name: "自动化脚本", href: "/docs/recipes/playwright-mcp" },
      { name: "效率工具", href: "/docs/recipes/ppt-skill-walkthrough" },
      { name: "团队协作", href: "/docs/recipes/github-actions-ci-fix" },
    ],
  },
  {
    title: "关于",
    links: [
      { name: "站点路线图", href: "/docs/community/roadmap" },
      { name: "GitHub 仓库", href: "https://github.com/weidutech/ai.kelvinsu.com" },
      { name: "爱发电支持", href: "https://afdian.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center text-white font-bold">
                K
              </div>
              <span className="font-bold text-xl tracking-tight">
                Kelvin <span className="text-brand-700">AI</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm max-w-xs mb-6">
              面向创作者、开发者与团队的 AI 实战指南。系统整理 Codex、CLI、IDE、工作流与真实案例。
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-slate-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-brand-700 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Kelvin AI Guide. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <Link href="/privacy" className="hover:text-brand-700">隐私政策</Link>
            <Link href="/terms" className="hover:text-brand-700">服务条款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
