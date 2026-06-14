import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import { getPageDescription, siteOgImage, siteUrl, toSiteUrl } from "./seo.js";
import sidebar from "./sidebar/index.js";

const addMeta = (
  head: unknown[][],
  attribute: "name" | "property",
  name: string,
  content: string,
): void => {
  if (head.some(([tag, attrs]) => tag === "meta" && attrs?.[attribute] === name)) return;
  head.push(["meta", { [attribute]: name, content }]);
};

const isHomePage = (path: string): boolean => path === "/" || path === "/index.html";

export default hopeTheme({
  hostname: `${siteUrl}/`,
  logo: "/logo.svg",
  favicon: "/logo.svg",

  author: {
    name: "kelvinsu",
    url: "https://ai.kelvinsu.com",
  },

  navbar,
  sidebar,

  print: false,
  pure: true,
  focus: false,
  breadcrumb: true,
  displayFooter: true,
  footer: "MIT Licensed | Copyright © 2026 kelvinsu",
  pageInfo: ["Author", "Category", "Tag", "Date", "Original", "Word", "ReadingTime"],

  blog: false,

  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    gfm: true,
    mark: true,
    tasklist: true,
    tabs: true,
  },

  plugins: {
    copyCode: true,
    copyright: {
      author: "Kelvin AI Guide(ai.kelvinsu.com)",
      license: "MIT",
      triggerLength: 100,
      maxLength: 700,
      canonical: "https://ai.kelvinsu.com/",
      global: true,
    },
    feed: {
      atom: true,
      json: true,
      rss: true,
    },
    seo: {
      fallBackImage: siteOgImage,
      canonical: (page) => toSiteUrl(page.path),
      ogp: (ogp, page) => ({
        ...ogp,
        "og:description": getPageDescription(page.path),
        "og:image": page.frontmatter.cover || page.frontmatter.banner ? ogp["og:image"] : siteOgImage,
        "og:image:alt": `${page.title} - Kelvin AI Guide`,
        "og:locale": "zh_CN",
      }),
      jsonLd: (jsonLD, page) =>
        isHomePage(page.path)
          ? {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: "Kelvin AI Guide",
                  url: `${siteUrl}/`,
                  logo: {
                    "@type": "ImageObject",
                    url: `${siteUrl}/logo.svg`,
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  name: "Kelvin AI Guide",
                  alternateName: ["AI 实战指南", "Codex 教程"],
                  url: `${siteUrl}/`,
                  description: getPageDescription(page.path),
                  inLanguage: "zh-CN",
                  publisher: {
                    "@id": `${siteUrl}/#organization`,
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: `${siteUrl}/?search={search_term_string}`,
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": ["LearningResource", "Course"],
                  "@id": `${siteUrl}/#codex-course`,
                  name: "Kelvin AI Guide：AI 工具与工作流实战指南",
                  url: `${siteUrl}/`,
                  description: getPageDescription(page.path),
                  image: [siteOgImage],
                  inLanguage: "zh-CN",
                  educationalLevel: "Beginner to Intermediate",
                  teaches: [
                    "Codex 桌面 App 使用",
                    "Codex CLI 安装与登录",
                    "OpenAI Codex 配置",
                    "AGENTS.md 项目规则",
                    "Codex 实战案例",
                  ],
                  provider: {
                    "@id": `${siteUrl}/#organization`,
                  },
                },
              ],
            }
          : {
              ...jsonLD,
              description: getPageDescription(page.path),
              url: toSiteUrl(page.path),
              image: [siteOgImage],
              inLanguage: "zh-CN",
              isPartOf: {
                "@type": "WebSite",
                name: "Kelvin AI Guide",
                url: `${siteUrl}/`,
              },
              publisher: {
                "@type": "Organization",
                name: "Kelvin AI Guide",
                url: `${siteUrl}/`,
                logo: {
                  "@type": "ImageObject",
                  url: `${siteUrl}/logo.svg`,
                },
              },
            },
      customHead: (head, page) => {
        const description = getPageDescription(page.path);
        const title = `${page.title} | Kelvin AI Guide`;

        addMeta(head, "name", "twitter:card", "summary_large_image");
        addMeta(head, "name", "twitter:title", title);
        addMeta(head, "name", "twitter:description", description);
        addMeta(head, "name", "twitter:image", siteOgImage);
        addMeta(head, "name", "twitter:image:alt", `${page.title} - Kelvin AI Guide`);
      },
    },
    sitemap: {
      hostname: `${siteUrl}/`,
      changefreq: "weekly",
      excludePaths: ["/404.html", "/guide/", "/community/"],
    },
    slimsearch: {
      maxSuggestions: 10,
      locales: {
        "/": {
          placeholder: "搜索 Kelvin AI Guide",
        },
      },
    },
  },
});
