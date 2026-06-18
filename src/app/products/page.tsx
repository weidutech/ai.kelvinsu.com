import { ProductShowcase } from "@/components/home/ProductShowcase";

export const metadata = {
  title: "独立产品 - Kelvin Studio",
  description: "Kelvin 独立研发的 AI 工具、客户端与提效应用。",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen pt-20 bg-[#fafafa]">
      <ProductShowcase />
    </main>
  );
}
