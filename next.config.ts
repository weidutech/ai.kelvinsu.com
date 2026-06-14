import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // 锁定项目根目录，避免上层目录的 package-lock.json 导致 workspace root 误判
  outputFileTracingRoot: __dirname,
  // MDX 由 @next/mdx 处理（后续步骤加入）
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // 限定 ESLint / TypeScript 只扫描 src，避免 legacy/（旧 VuePress 产物）干扰
  eslint: {
    dirs: ["src"],
  },
  typescript: {
    // 类型检查仍启用，但只针对 src（tsconfig.exclude 已排除 legacy）
    ignoreBuildErrors: false,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
