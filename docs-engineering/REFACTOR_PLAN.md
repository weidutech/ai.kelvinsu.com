# Kelvin AI Guide 现代化重构 · 施工计划与进度

> 本文档记录将 `ai.kelvinsu.com` 从 VuePress 2 文档站重构为 Next.js 15 现代化站点的完整计划、技术决策与每日施工进度。
>
> - **仓库**：`https://github.com/weidutech/ai.kelvinsu.com`（私有）
> - **分支策略**：`main` = 旧 VuePress 版本（基线快照，可回滚）；`next` = 重构施工分支
> - **文档维护**：每完成一个阶段更新本文档

---

## 一、项目背景

### 1.1 原站点现状

| 项 | 内容 |
| --- | --- |
| 框架 | VuePress 2 (`2.0.0-rc.28`) + vuepress-theme-hope |
| 内容 | 54 篇 Markdown 教程 + 6 个 index 页 |
| 样式 | 655 行 SCSS 覆盖 theme-hope 私有类名 |
| 首页 | `docs/index.md`（322 行自定义 HTML + frontmatter） |
| 部署 | Vercel + EdgeOne 双静态托管 |
| 后端 | **纯静态，零后端逻辑**（已验证） |

### 1.2 重构动机

**问题一：UI 太丑（工程问题，非审美问题）**
- 首页 hero 用 `home-hero-background.webp` + 78% 白色蒙层，整页发灰发糊、对比度低
- 卡片 `border-radius: 8px` + `1px 边框` + **零阴影**，hover 才变色 → 扁平、无层次、堆叠感重
- SVG 插画是深色 `#0B1220` 信息图，与白底卡片视觉不协调
- 配色只有单一 teal `#0f766e`，无设计令牌体系（无 typography scale、无 spacing scale、无中性色阶）

**问题二：框架老旧，无法演进**
- VuePress 2 全是 `rc` 版本（非 stable），社区重心已转向 VitePress，处于维护期
- VuePress 是静态文档站框架，**跑不了 Edge Functions / Server Actions**，无法接 Supabase Auth 和爱发电 Webhook
- 655 行 SCSS 全是 `.vp-*` theme-hope 私有类名，换框架后 90% 作废

### 1.3 未来目标：Kelvin Studio 个人应用商店

重构后的技术底座将支撑后续的「个人应用商店」演进：

```
抖音/小红书 → ai.kelvinsu.com（Vercel/Next.js）
                    │
        ┌───────────┴────────────┐
        ▼ (Auth)              ▼ (购买)
   Supabase Auth          爱发电 Webhook
   + RLS 行级安全          → /api/afdian/webhook
   + profiles 表              → 改 has_premium 权限
```

---

## 二、技术决策

基于澄清问答，确认以下选型：

| 决策项 | 选定方案 | 理由 |
| --- | --- | --- |
| **推进范围** | 美化 + 换现代框架 | 一步到位，为应用商店铺路 |
| **目标框架** | Next.js 15 (App Router) | 原生支持 Server Actions/Edge Functions，接 Supabase 最顺 |
| **代码库策略** | 原地改 `ai.kelvinsu.com` | 内容资产/域名/部署链路全继承；旧版归档到 `legacy/` |
| **视觉风格** | 现代简洁 SaaS | 参考 Linear / Vercel / Stripe，浅色为主、大留白、柔和阴影 |
| **内容范围** | 54 篇全量迁移 | 保全核心内容资产 |
| **样式方案** | Tailwind CSS v4 | `@theme` 指令定义令牌，现代 SaaS 标配 |
| **UI 组件** | 手写组件库（shadcn 理念） | Radix + Tailwind 模式，按需自建，依赖最少 |

### 技术栈定案

| 层 | 选型 | 版本 |
| --- | --- | --- |
| 框架 | Next.js (App Router) | `15.5.19` |
| 视图 | React | `19.2.7` |
| 语言 | TypeScript | `6.0.3` |
| 样式 | Tailwind CSS | `v4.3.1` |
| 包管理 | pnpm | `10.33.0` |
| Node | LTS | `>=22 <25` |
| 部署 | Vercel | 沿用 |

---

## 三、分阶段路线图

### 🟢 阶段一：换框架 + 迁移 + UI 重设计（进行中）

> **目标**：网站在 Next.js 上跑起来，54 篇内容全在，UI 彻底变样。一次解决"丑"和"框架旧"两个问题。

| # | 任务 | 状态 |
| --- | --- | --- |
| 1 | 基线 commit + 推送 GitHub + 开 `next` 分支 | ✅ 完成 |
| 2 | 旧 VuePress 代码归档到 `legacy/` | ✅ 完成 |
| 3 | 初始化 Next.js 15 + TS + Tailwind v4 脚手架 | ✅ 完成 |
| 4 | 搭基础组件（Button/Card/Callout/Badge/Container） | ✅ 完成 |
| 5 | 重做首页（Hero + 学习路径 + 闭环 + 案例 bento + 变现入口） | ✅ 完成 |
| 6 | 写内容迁移脚本，54 篇 MD → `src/content/docs/` | ⏳ 待办 |
| 7 | 搭文档页布局（sticky 目录 + breadcrumb + 代码块 + 上下篇） | ⏳ 待办 |
| 8 | 迁移 navbar/sidebar 数据，54 篇全可导航 | ⏳ 待办 |
| 9 | 重建 SEO（metadata + JSON-LD + sitemap + RSS） | ⏳ 待办 |
| 10 | 加 301 重定向（旧 `.html` URL → clean URL） | ⏳ 待办 |
| 11 | 添加 Navbar + Footer 全局布局 | ⏳ 待办 |
| 12 | `pnpm dev` 全站验证 + push 到 GitHub | ⏳ 待办 |

### 🟡 阶段二：应用商店货架（阶段一验收后启动）

> **目标**：搭 Kelvin Studio 骨架（Supabase Auth + 爱发电 Webhook）。本阶段需用户提供密钥和账号 ID。

| # | 任务 | 说明 |
| --- | --- | --- |
| 1 | Supabase 项目初始化 | `profiles` 表（`id`/`email`/`has_premium`）+ RLS 策略 |
| 2 | `@supabase/ssr` 接入 Next.js | 邮箱密码 / 魔法链接登录 |
| 3 | `/shop` 货架页 | 4 张产品卡（Love Copilot / 自媒体套件 / 99 元脚本包 / 999 元咨询） |
| 4 | 爱发电支付跳转 | 带上 Supabase `user_id` 作为 custom_order |
| 5 | `app/api/afdian/webhook/route.ts` | Edge Function：验签 → 解析 → 改 `has_premium` |
| 6 | 前端 Realtime 订阅 | 支付完成自动解锁，零人工介入 |

### 🔵 阶段三：运营增强（按需）

- Newsletter（Resend / Loops）
- 会员专属内容区（RLS 控制可见性）
- 数据看板、A/B 测试

---

## 四、设计令牌体系

解决旧站"无设计系统"的核心方案。定义在 `src/app/globals.css` 的 `@theme` 指令中：

### 4.1 品牌色（保留旧站 teal 识别 + 完整色阶）

| 令牌 | 色值 | 用途 |
| --- | --- | --- |
| `brand-700` | `#0f766e` | 主品牌色（旧站锚点，保留） |
| `brand-50` → `brand-950` | teal 完整色阶 | 背景/边框/hover 全覆盖 |
| `accent-600` | `#4f46e5` | 强调色 indigo（按钮/链接/CTA） |
| `accent-50` → `accent-950` | indigo 完整色阶 | — |

### 4.2 排版与圆角

| 令牌 | 值 | 对比旧站 |
| --- | --- | --- |
| `--font-sans` | Inter + 中文系统字体回退 | 旧站无字体系统 |
| `--font-mono` | JetBrains Mono | 旧站无等宽字体 |
| `--radius-card` | `0.75rem` (12px) | 旧站全站 8px 扁平 |
| `--radius-button` | `0.5rem` (8px) | — |
| `--radius-pill` | `9999px` | — |

### 4.3 阴影（解决旧站"零阴影"问题）

| 令牌 | 值 | 用途 |
| --- | --- | --- |
| `--shadow-xs` | `0 1px 2px` | 卡片静态 |
| `--shadow-sm` | `0 1px 3px` | 卡片悬停 |
| `--shadow-md` | `0 4px 6px` | 浮层 |
| `--shadow-lg` | `0 10px 15px` | 弹窗 |
| `--shadow-glow` | teal 辉光 | 推荐/高亮 |

### 4.4 暗色模式

通过 `:root` + `.dark` 切换语义令牌（`--bg-base` / `--text-primary` / `--border-default` 等），组件只引用语义色，不引用色阶。

---

## 五、今日施工记录（2026-06-14）

### 5.1 完成事项

#### ✅ 1. GitHub 仓库接入与版本基线

- 初始化 git 仓库，配置 `.gitignore`（补全 Next.js + legacy 构建产物规则）
- 创建基线 commit `7c7212c`：完整记录 VuePress 版本（264 个文件）
- 推送到 `https://github.com/weidutech/ai.kelvinsu.com` 的 `main` 分支
- 开 `next` 分支开始施工，`main` 永远保留旧版可回滚

#### ✅ 2. 旧代码归档

将以下内容移动到 `legacy/` 目录：
- `docs/` → `legacy/docs/`（54 篇 MD + `.vuepress` 配置 + public 资源）
- `assets/` → `legacy/assets/`（旧营销素材）
- `package.json` → `legacy/package.vuepress.json`
- `pnpm-lock.yaml` → `legacy/pnpm-lock.vuepress.yaml`
- `vercel.json` → `legacy/vercel.vuepress.json`

**复用资源**提取到新 `public/`：
```
public/
├── logo.svg
├── og.svg
├── images/
│   ├── codex-config-map.svg
│   ├── codex-safety-layers.svg
│   ├── codex-surfaces.svg
│   └── codex-workflow-loop.svg
└── screenshots/app/01-workspace.png
```

#### ✅ 3. Next.js 15 脚手架（commit `28267a5`）

**技术栈**：Next.js `15.5.19` + React `19.2.7` + TypeScript `6.0.3` + Tailwind `v4.3.1`

**配置文件**：
```
├── next.config.ts        # outputFileTracingRoot 锁定项目根
├── tsconfig.json         # @/* 路径别名，exclude legacy
├── postcss.config.mjs    # @tailwindcss/postcss
├── .eslintrc.json        # next/core-web-vitals + next/typescript
├── next-env.d.ts
└── package.json          # NODE_ENV 固化到 build/start scripts
```

#### ✅ 4. 基础组件库（5 个组件）

| 组件 | 路径 | 说明 |
| --- | --- | --- |
| `Button` | `src/components/ui/Button.tsx` | 4 变体 × 3 尺寸，支持 `href` 自动渲染 next/link |
| `Card` | `src/components/ui/Card.tsx` | 通用卡片，`as` prop 支持语义化渲染 |
| `Badge` | `src/components/ui/Badge.tsx` | 6 变体标签 |
| `Callout` | `src/components/ui/Callout.tsx` | 5 类型提示框，替代 VuePress `::: tip` |
| `Container` / `Section` | `src/components/ui/Container.tsx` | 页面级宽度容器 + 垂直节奏 |

工具函数 `src/lib/utils.ts` 的 `cn()` 用于合并 Tailwind 类名。

#### ✅ 5. 首页重做（5 个 section，替换旧站 322 行 HTML + 655 行 SCSS）

| Section | 路径 | 替代旧站 | 设计要点 |
| --- | --- | --- | --- |
| `Hero` | `src/components/home/Hero.tsx` | `.vp-hero-info-wrapper` 发糊蒙层 | 去掉 webp 蒙层，径向渐变光晕 + 网格点阵装饰，大标题渐变色，数据条 |
| `LearningPaths` | `src/components/home/LearningPaths.tsx` | `.home-path-grid` 5 张挤一起 | 3 张大卡片，步骤号 + 图标 + 受众标签，hover lift |
| `TaskLoop` | `src/components/home/TaskLoop.tsx` | `.home-loop-grid` 纯色块 | 5 步横向流程，带连接箭头，每步配色 |
| `RecipesShowcase` | `src/components/home/RecipesShowcase.tsx` | `.home-case-grid` 4 列扁平 | bento grid 大小混排，首图高亮，杂志感 |
| `MonetizationCTA` | `src/components/home/MonetizationCTA.tsx` | `.home-offer-grid` | 3 张定价卡（¥0 / ¥99 / ¥999），中间档高亮推荐 |

**验证结果**：`pnpm build` 通过，4 个静态页生成成功；`pnpm dev` 首页返回 HTTP 200。

---

### 5.2 今日踩坑记录

记录施工中遇到的问题与解决方案，供后续参考：

#### 问题 1：Next.js 16 的 `/_global-error` 预渲染崩溃

**现象**：初始用 `next@16.2.9`，build 时报 `Cannot read properties of null (reading 'useContext')`。

**根因**：Next 16（几天前刚发布）在 `/_global-error` 预渲染上有未解决的 bug。

**解决**：降级到经过长期验证的 **Next.js `15.5.19`**（15.x 稳定线，App Router 完全成熟）。React `19.2.7` 保持不变。

#### 问题 2：`<Html> should not be imported outside of pages/_document`

**现象**：build 时 `/404` 和 `/_error` 预渲染失败。

**排查过程**：
1. 怀疑 lockfile 警告（Next 检测到上层 `package-lock.json`）→ 加 `outputFileTracingRoot` → 未解决
2. 怀疑 `legacy/` 的 VuePress 构建产物干扰 → 加 `eslint.dirs: ["src"]` → 未解决
3. 加 `not-found.tsx` → 未解决

**真正根因**：非交互 shell 的 `NODE_ENV=development` 被继承，导致 Next 在 production build 时走了错误的代码路径（生成了 Pages Router 的 `_document.js` 但 prerender 失败）。

**解决**：在 `package.json` scripts 固化 `NODE_ENV=production`：
```json
"build": "NODE_ENV=production next build",
"start": "NODE_ENV=production next start"
```

> 注：Vercel 部署环境 `NODE_ENV` 自动是 production，不会有此问题。固化是为了本地和任意 CI 的稳定性。

#### 问题 3：VuePress `.temp` 构建产物污染 git

**现象**：legacy 归档后，298 个待提交文件里有大量 `legacy/docs/.vuepress/.temp/*`。

**根因**：`.gitignore` 的 `docs/.vuepress/.temp` 规则在移动到 `legacy/` 后路径失配。

**解决**：补全 `.gitignore`，添加 `legacy/**/.cache`、`legacy/**/.temp`、`legacy/**/dist`，物理删除已生成的临时文件。

---

## 六、当前项目结构

```
ai.kelvinsu.com/
├── src/
│   ├── app/
│   │   ├── globals.css          # 设计令牌（@theme + 语义令牌）
│   │   ├── layout.tsx           # 根布局 + metadata
│   │   ├── not-found.tsx        # 404 页
│   │   └── page.tsx             # 首页（组装 5 个 section）
│   ├── components/
│   │   ├── home/                # 首页 section 组件
│   │   │   ├── Hero.tsx
│   │   │   ├── LearningPaths.tsx
│   │   │   ├── TaskLoop.tsx
│   │   │   ├── RecipesShowcase.tsx
│   │   │   └── MonetizationCTA.tsx
│   │   └── ui/                  # 基础组件库
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       ├── Callout.tsx
│   │       └── Container.tsx
│   ├── lib/
│   │   └── utils.ts             # cn() 类名合并工具
│   └── types/
│       └── globals.d.ts         # CSS 模块类型声明
├── public/                      # 静态资源（从旧站复用）
│   ├── logo.svg
│   ├── og.svg
│   ├── images/*.svg
│   └── screenshots/
├── legacy/                      # 旧 VuePress 版本（归档保留）
│   ├── docs/                    # 54 篇 MD + .vuepress 配置
│   ├── assets/
│   └── package.vuepress.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── package.json
└── docs-engineering/
    └── REFACTOR_PLAN.md         # 本文档
```

---

## 七、下一步（阶段一剩余任务）

按优先级排序：

### 7.1 内容迁移（任务 6）—— 核心资产保全

写 Node 迁移脚本 `scripts/migrate-content.mjs`，扫描 `legacy/docs/**/*.md` → `src/content/docs/`：

1. **frontmatter 标准化**：加 `title`/`slug`/`category`/`order`，复用 `legacy/docs/.vuepress/seo.ts` 的 50 条 description 字典自动回填
2. **容器语法转换**：`::: tip / ::: warning / ::: details`（约 200 处）→ MDX `<Callout>` 组件
3. **链接重写**：相对链接 `./xxx.md` → Next 路由 `/docs/guide/xxx`
4. **图片路径**：`/images/xxx.svg` 保持不变（public 目录沿用）

### 7.2 文档页布局（任务 7）

- 左侧 sticky 目录（自动从 H2/H3 生成）
- 右侧正文 + 顶部 breadcrumb + 底部「上一篇/下一篇」
- 代码块带复制按钮 + 语言标签（shiki 高亮）
- 移动端目录折叠

### 7.3 导航数据（任务 8）

- `navbar.ts` + `sidebar/index.ts` → `src/content/nav.ts` 数据文件
- 全局 Navbar + Footer 布局组件
- 搜索（先用 Pagefind 静态方案）

### 7.4 SEO 重建（任务 9）

- `seo.ts` description 字典 → `src/content/seo.ts`
- Next `generateMetadata` 逐页注入 title/desc/canonical/og/twitter
- JSON-LD（Organization/WebSite/LearningResource）→ `app/layout.tsx`
- sitemap（next-sitemap）+ RSS route

---

## 八、回滚方案

任何时候需要回到旧 VuePress 版本：

```bash
# 切回 main 分支（旧版完整保留）
git checkout main

# 或在 next 分支上查看旧代码
ls legacy/docs/
```

Vercel 部署若出问题，可在 Vercel 后台将 Production Branch 临时切回 `main`。

---

## 九、环境要求与常用命令

### 开发环境

- Node.js `>=22 <25`（推荐用 nvm 管理：`nvm use`）
- pnpm `10.33.0`（通过 corepack 启用：`corepack enable pnpm`）

### 常用命令

```bash
pnpm install          # 安装依赖
pnpm dev              # 启动开发服务器（http://localhost:3000）
pnpm build            # 生产构建
pnpm start            # 启动生产服务器
pnpm lint             # ESLint 检查
pnpm typecheck        # TypeScript 类型检查
pnpm clean            # 清理构建缓存
```

---

_最后更新：2026-06-14_
