import { existsSync, readFileSync, writeFileSync } from "node:fs";

import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";

import { getPageDescription, siteDescription, toSiteUrl } from "./seo.js";
import theme from "./theme.js";

const rewriteSitemapCleanUrlsPlugin = {
  name: "site-clean-sitemap-urls",
  onGenerated: (app) => {
    const sitemapPath = app.dir.dest("sitemap.xml");

    if (!existsSync(sitemapPath)) return;

    const sitemap = readFileSync(sitemapPath, "utf-8");
    const cleanedSitemap = sitemap.replace(
      /<loc>(https:\/\/ai\.kelvinsu\.com[^<]*)<\/loc>/gu,
      (_, url: string) => {
        const { pathname, search, hash } = new URL(url);

        return `<loc>${toSiteUrl(`${pathname}${search}${hash}`)}</loc>`;
      },
    );

    writeFileSync(sitemapPath, cleanedSitemap);
  },
};

export default defineUserConfig({
  base: "/",
  dest: "docs/.vuepress/dist",
  lang: "zh-CN",
  title: "Kelvin AI Guide",
  description: siteDescription,

  head: [
    ["meta", { name: "robots", content: "index,follow,max-image-preview:large" }],
    ["meta", { name: "author", content: "kelvinsu" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "Kelvin AI Guide,AI 教程,Codex 教程,Codex CLI,AI 工作流,AGENTS.md,AI 编程,AI Agent,实战指南",
      },
    ],
    ["meta", { name: "theme-color", content: "#0f766e" }],
    ["meta", { name: "format-detection", content: "telephone=no" }],
    ["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }],
  ],

  plugins: [
    {
      name: "site-seo-defaults",
      extendsPage: (page) => {
        page.frontmatter.description = getPageDescription(page.path);
      },
    },
    rewriteSitemapCleanUrlsPlugin,
  ],

  bundler: viteBundler(),

  theme,

  pagePatterns: ["**/*.md", "!.vuepress", "!node_modules"],

  shouldPrefetch: false,
  shouldPreload: false,
});
