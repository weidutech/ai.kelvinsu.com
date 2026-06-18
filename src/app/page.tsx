import { Hero } from "@/components/home/Hero";
import { RecipesShowcase } from "@/components/home/RecipesShowcase";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { Testimonials } from "@/components/home/Testimonials";

/**
 * 首页 —— 现代 SaaS 结合 Neo-Brutalism 内容结构的提纯版
 */
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCourses />
      <Testimonials />
      <RecipesShowcase />
    </>
  );
}
