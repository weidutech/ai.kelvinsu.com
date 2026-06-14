import { Hero } from "@/components/home/Hero";
import { LearningPaths } from "@/components/home/LearningPaths";
import { TaskLoop } from "@/components/home/TaskLoop";
import { RecipesShowcase } from "@/components/home/RecipesShowcase";
import { MonetizationCTA } from "@/components/home/MonetizationCTA";

/**
 * 首页 —— 现代 SaaS 风
 * 替代旧站 docs/index.md 的 322 行 HTML + 655 行 SCSS
 *
 * 信息架构（保留旧站核心，视觉彻底重做）：
 * 1. Hero —— 价值主张 + 主副 CTA + 数据条
 * 2. LearningPaths —— 三条学习路径（新手/开发者/团队）
 * 3. TaskLoop —— 任务闭环 5 步（说明→执行→控制→验证→沉淀）
 * 4. RecipesShowcase —— 精选案例 bento grid
 * 5. MonetizationCTA —— 变现入口（免费/¥99 实战课/¥999 咨询）
 */
export default function Home() {
  return (
    <>
      <Hero />
      <LearningPaths />
      <TaskLoop />
      <RecipesShowcase />
      <MonetizationCTA />
    </>
  );
}
