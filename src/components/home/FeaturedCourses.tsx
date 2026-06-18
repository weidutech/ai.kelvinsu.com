import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { Play, Clock, ArrowRight, Sparkles } from "lucide-react";

/**
 * 精选推荐 / 最近更新 (Premium SaaS Style)
 * 采用项目统一的高级质感：圆角、发光阴影、渐变标签
 */
const courses = [
  {
    id: "01",
    title: "001「我看谁不学Codex」0基础入门：工具怎么选+能干啥+一键登录",
    description: "这么多AI编程工具，到底选哪个？Codex凭什么适合新手？国内用户怎么登录...",
    cover: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800&h=450", // Placeholder
    views: "645",
    duration: "9",
    isVip: true,
    href: "/docs/courses/codex-intro",
  },
  {
    id: "02",
    title: "模型也有mbti？玩转模型的隐藏性格",
    description: "不同 AI 模型也有性格？这一期用 MBTI 框架类比主流模型的思维风格差异，顺带教你如何写出更精准的 Prompt...",
    cover: "https://images.unsplash.com/photo-1664575198308-3959904fa430?auto=format&fit=crop&q=80&w=800&h=450", // Placeholder
    views: "285",
    duration: "15",
    isVip: false,
    href: "/docs/courses/model-mbti",
  },
  {
    id: "03",
    title: "001 Claude code安装全流程指南：装好框架，不接脑子",
    description: "两套方案，手把手把 Claude Code 装进终端。装完能看到界面——但今天只装框架，下集接大脑。",
    cover: "https://images.unsplash.com/photo-1627398240309-08a1a5362a53?auto=format&fit=crop&q=80&w=800&h=450", // Placeholder
    views: "640",
    duration: "18",
    isVip: true,
    href: "/docs/courses/claude-code-install",
  },
  {
    id: "04",
    title: "Cursor 深度测评：它真的能代替前端工程师吗？",
    description: "实测 5 个常见业务场景，看看 Cursor 的极限在哪里，以及我们该如何与它配合。",
    cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=450",
    views: "1.2k",
    duration: "22",
    isVip: true,
    href: "/docs/courses/cursor-review",
  },
  {
    id: "05",
    title: "Dify 工作流实战：从 0 到 1 搭建客服机器人",
    description: "不需要写代码，教你利用 Dify 快速搭建一个带有公司知识库的专属客服系统。",
    cover: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800&h=450",
    views: "890",
    duration: "30",
    isVip: true,
    href: "/docs/courses/dify-chatbot",
  },
  {
    id: "06",
    title: "Midjourney v6 商业出图指南",
    description: "拆解 10 个商业摄影级别的垫图技巧，让你的生图从此摆脱“AI 味”。",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=450",
    views: "3.4k",
    duration: "25",
    isVip: true,
    href: "/docs/courses/midjourney-v6",
  },
  {
    id: "07",
    title: "如何用 ChatGPT 批量写小红书爆款文案",
    description: "拆解小红书爆款逻辑，喂给大模型，实现一键生成带网感的高转化文案。",
    cover: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=800&h=450",
    views: "4.1k",
    duration: "12",
    isVip: false,
    href: "/docs/courses/xiaohongshu-copywriting",
  },
  {
    id: "08",
    title: "AI 时代独立开发者生存指南",
    description: "有了 AI 辅助编程，一个人就是一支军队。谈谈超级个体该如何寻找痛点、快速 MVP。",
    cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=450",
    views: "2.5k",
    duration: "45",
    isVip: true,
    href: "/docs/courses/indie-hacker",
  },
];

export function FeaturedCourses() {
  return (
    <Section className="bg-[#fafafa] py-32 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-50/50 rounded-full blur-[100px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3"></div>

      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              Latest Updates
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              精选实战更新
            </h2>
            <p className="text-slate-500 font-medium text-lg max-w-xl leading-relaxed">
              第一时间同步最新的 AI 工具拆解、自动化工作流模板与变现玩法。
            </p>
          </div>
          <Link
            href="/courses"
            className="group inline-flex items-center text-sm font-black text-slate-400 hover:text-brand-600 transition-all duration-300 pb-2 border-b-2 border-transparent hover:border-brand-500"
          >
            查看全库 100+ 内容
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={course.href}
              className="group flex flex-col bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/20 hover:shadow-glow hover:-translate-y-1.5 transition-all duration-500"
            >
              {/* Cover Image Area */}
              <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src={course.cover} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {course.isVip && (
                  <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[9px] font-black uppercase tracking-[0.1em] px-2.5 py-1 rounded-full shadow-lg shadow-orange-500/30 backdrop-blur-md flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> VIP 专属
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="p-5 flex flex-col flex-1 relative">
                {/* Subtle Hover Gradient inside card */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-50/0 to-brand-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex-1">
                  <h3 className="text-base font-black text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-brand-700 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-medium line-clamp-2 mb-4 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-bold text-slate-400 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Play className="w-3.5 h-3.5 text-slate-300" />
                      {course.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-300" />
                      {course.duration}m
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
