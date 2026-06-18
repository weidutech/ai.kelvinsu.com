import { Container, Section } from "@/components/ui/Container";
import { ArrowRight, BookOpen, Briefcase, Code2, Globe2, Sparkles, Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "关于我 - Kelvin Studio",
  description: "了解 Kelvin，一线大厂 AI 研究员与独立开发者。",
};

const timeline = [
  {
    year: "现在",
    title: "AI 效率工程师 & 独立开发者",
    desc: "致力于将前沿的 AI 技术转化为普通人与企业能直接使用的生产力工具。主理 Kelvin Studio，研发并开源了多个提效工作流与独立 App，帮助 5000+ 用户跨越 AI 落地的鸿沟。",
    icon: Terminal,
  },
  {
    year: "过去",
    title: "一线大厂 AI 研究员",
    desc: "深度参与核心大语言模型与多模态项目的研发与落地。在复杂的工业级场景中，积累了丰富的 Prompt 工程、Agent 编排与系统优化经验，深谙 AI 技术在真实商业环境中的局限与突破口。",
    icon: Briefcase,
  },
  {
    year: "教育",
    title: "QS Top 10 高校硕士",
    desc: "接受了严谨的学术训练，构建了扎实的计算机科学与机器学习理论基础。但比起发表论文，我更热衷于将理论转化为看得见、摸得着的产品体验。",
    icon: BookOpen,
  },
];

const capabilities = [
  {
    title: "To C: 个体杠杆",
    items: ["小红书/抖音自动化矩阵", "Midjourney 商业级出图", "个人知识库 RAG 搭建", "高转化营销 Prompt 库"],
  },
  {
    title: "To B: 企业赋能",
    items: ["企业级 AI 销售客服接入", "内部业务流数据自动化清洗", "行业研报全自动生成系统", "团队 AI 技能内训与陪跑"],
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-[#fafafa]">
      <Container size="wide">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: sticky profile */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-brand-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
              <div className="relative aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                <img 
                  src="/images/avatar.jpg" 
                  alt="Kelvin Su" 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Kelvin Su
            </h1>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">AI Researcher</span>
              <span className="px-3 py-1 bg-brand-50 text-brand-600 border border-brand-100 text-[10px] font-black uppercase tracking-widest rounded-lg">Indie Developer</span>
            </div>
            <p className="text-lg font-medium text-slate-500 leading-relaxed mb-8">
              让机器替你打工，把时间留给创造。
            </p>
            
            <div className="flex gap-4">
              <a href="https://github.com/weidutech" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-sm transition-colors">
                <Code2 className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-sm transition-colors">
                <Globe2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Bio & Experience */}
          <div className="lg:col-span-7">
            
            <Section className="mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                My Philosophy
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-6 leading-tight">
                技术是为了解决业务问题，<br />
                而不是制造新的焦虑。
              </h2>
              <div className="prose prose-lg prose-slate max-w-none text-slate-600 font-medium leading-relaxed">
                <p>
                  在这个“人人谈 AI，处处是红利”的时代，作为一名真正从事底层模型研究的技术人员，我看到了太多被包装的概念和贩卖焦虑的“神课”。
                </p>
                <p>
                  我拥有 <strong>QS Top 10 高校</strong>的学术背景，并且在<strong>一线大厂的 AI 核心部门</strong>真枪实弹地打磨过工业级模型。我深知大语言模型的极限在哪里，知道什么是“玩具”，什么是真正的“生产力”。
                </p>
                <p>
                  离开纯粹的实验室，我更喜欢作为一名<strong>独立开发者</strong>，用代码去解决真实世界的问题。无论是 To C 的个人效率工具，还是 To B 的企业定制化闭环，我的准则只有一个：<strong>只讲跑通的实战，只给能落地成金钱或时间的干货。</strong>
                </p>
              </div>
            </Section>

            <Section className="mb-16">
              <h3 className="text-xl font-black text-slate-900 mb-8 border-b border-slate-200 pb-4">核心能力象限</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {capabilities.map((cap) => (
                  <div key={cap.title} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                    <h4 className="text-lg font-black text-slate-900 mb-6">{cap.title}</h4>
                    <ul className="space-y-4">
                      {cap.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm font-semibold text-slate-600">
                          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section>
              <h3 className="text-xl font-black text-slate-900 mb-8 border-b border-slate-200 pb-4">实战轨迹</h3>
              <div className="space-y-12">
                {timeline.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="relative pl-8 md:pl-0">
                      {/* Desktop Timeline Line */}
                      <div className="hidden md:block absolute left-[120px] top-0 bottom-0 w-px bg-slate-200"></div>
                      
                      <div className="flex flex-col md:flex-row gap-4 md:gap-12">
                        <div className="md:w-[120px] shrink-0 pt-1">
                          <span className="text-sm font-black text-slate-400 uppercase tracking-widest">{item.year}</span>
                        </div>
                        
                        <div className="relative flex-1 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
                          {/* Desktop Timeline Dot */}
                          <div className="hidden md:flex absolute -left-[54px] top-8 w-6 h-6 rounded-full bg-white border-4 border-brand-500 items-center justify-center z-10"></div>
                          
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                              <Icon className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-black text-slate-900">{item.title}</h4>
                          </div>
                          <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>

            <div className="mt-16 pt-12 border-t border-slate-200">
              <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.2),transparent)]"></div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4 relative z-10">准备好获取超级杠杆了吗？</h2>
                <p className="text-slate-400 font-medium mb-8 relative z-10">
                  加入我的实战基地，获取 2026 最新版商业工作流与底层源码。
                </p>
                <Button href="/premium" className="rounded-xl px-8 bg-brand-500 hover:bg-brand-400 text-white font-black tracking-widest shadow-lg shadow-brand-500/20 relative z-10">
                  查看实战资源 <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </main>
  );
}
