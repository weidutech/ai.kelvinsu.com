export const docsConfig = {
  sidebar: [
    {
      title: "学习指南",
      items: [
        { text: "学习路线", href: "/docs/guide/00-overview" },
        {
          text: "入门准备",
          children: [
            { text: "01 桌面 App 安装", href: "/docs/guide/01-app-installation" },
            { text: "02 订阅 Plus", href: "/docs/guide/02-subscribe-plus" },
            { text: "03 桌面 App 总览", href: "/docs/guide/03-app-overview" },
            { text: "04 手机端协同", href: "/docs/guide/04-mobile-control-desktop" },
            { text: "05 连接第三方 API", href: "/docs/guide/05-third-party-api" },
            { text: "06 第一个任务", href: "/docs/guide/06-app-first-task" },
          ],
        },
        {
          text: "日常工作流",
          children: [
            { text: "07 任务执行", href: "/docs/guide/07-task-execution" },
            { text: "08 权限管理", href: "/docs/guide/08-permissions" },
            { text: "09 技能与插件", href: "/docs/guide/09-skills-plugins" },
            { text: "10 自动化", href: "/docs/guide/10-automation" },
            { text: "11 桌面宠物", href: "/docs/guide/11-desktop-pet" },
          ],
        },
        {
          text: "CLI 与 IDE",
          children: [
            { text: "12 CLI 安装与登录", href: "/docs/guide/12-cli-installation" },
            { text: "13 CLI 改代码", href: "/docs/guide/13-cli-first-run" },
            { text: "14 VS Code 插件", href: "/docs/guide/14-ide-vscode" },
          ],
        },
        {
          text: "进阶与团队",
          children: [
            { text: "15 AGENTS.md", href: "/docs/guide/15-agents-md" },
            { text: "16 沙盒与审批", href: "/docs/guide/16-sandbox-approvals" },
            { text: "17 Codex Cloud", href: "/docs/guide/17-cloud-ide-app" },
            { text: "18 排障手册", href: "/docs/guide/18-troubleshooting" },
          ],
        },
      ],
    },
    {
      title: "实战案例",
      items: [
        { text: "案例总览", href: "/docs/recipes" },
        { text: "01 一句话生成 PPT", href: "/docs/recipes/ppt-skill-walkthrough" },
        { text: "02 AI 自动绘制架构图", href: "/docs/recipes/drawio-mcp" },
        { text: "03 操控浏览器", href: "/docs/recipes/playwright-mcp" },
        { text: "04 生成动画视频", href: "/docs/recipes/hyperframes-animation" },
        { text: "05 知识库自动生成配图", href: "/docs/recipes/obsidian-codex" },
        { text: "06 处理飞书数据", href: "/docs/recipes/feishu-cli-codex" },
        { text: "07 搭建 AI 知识库", href: "/docs/recipes/llm-wiki-codex" },
        { text: "08 读懂设计稿", href: "/docs/recipes/figma-mcp-codex" },
        { text: "09 打通 Notion 知识空间", href: "/docs/recipes/notion-mcp-codex" },
        { text: "10 网页一键发布到公网", href: "/docs/recipes/dkfile-deploy-codex" },
        { text: "11 远程修复 Bug", href: "/docs/recipes/remote-bug-fix" },
        { text: "12 控制 Chrome 浏览器", href: "/docs/recipes/chrome-browser-plugin" },
        { text: "13 CI 失败自动修复", href: "/docs/recipes/github-actions-ci-fix" },
        { text: "14 整理文献综述", href: "/docs/recipes/clinical-literature-review" },
        { text: "15 生成专属宠物", href: "/docs/recipes/hatch-pet-photo" },
        { text: "16 远程操控安卓手机", href: "/docs/recipes/android-remote-control" },
      ],
    },
    {
      title: "平台入口",
      items: [
        { text: "入口地图", href: "/docs/platform" },
        { text: "CLI 终端", href: "/docs/platform/cli" },
        { text: "桌面 App", href: "/docs/platform/app" },
        { text: "云端模式", href: "/docs/platform/cloud" },
        { text: "IDE 插件", href: "/docs/platform/ide" },
        { text: "ChatGPT", href: "/docs/platform/chatgpt" },
      ],
    },
    {
      title: "配置与方法",
      items: [
        { text: "配置总览", href: "/docs/configuration" },
        { text: "CLI 选项", href: "/docs/configuration/cli-options" },
        { text: "配置文件", href: "/docs/configuration/config-file" },
        { text: "任务设计", href: "/docs/practice/task-design" },
        { text: "非开发者流", href: "/docs/practice/non-dev-workflows" },
        { text: "团队手册", href: "/docs/practice/team-playbook" },
      ],
    },
  ],
};
