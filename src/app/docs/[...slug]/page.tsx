import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { Callout } from "@/components/ui/Callout";

function normalizeDocImageSrc(src?: string) {
  if (!src) return src;
  if (/^(https?:)?\/\//.test(src) || src.startsWith("/")) {
    return src;
  }

  if (/^(\.\.\/)+(?:images|screenshots)\//.test(src)) {
    return `/${src.replace(/^(\.\.\/)+/, "")}`;
  }

  if (/^\.\/*(?:images|screenshots)\//.test(src)) {
    return `/${src.replace(/^\.\//, "")}`;
  }

  return src;
}

function DocImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, ...rest } = props;
  const normalizedSrc = typeof src === "string" ? normalizeDocImageSrc(src) : undefined;

  return <img {...rest} src={normalizedSrc} alt={alt ?? ""} />;
}

// Add any custom components you want to use in MDX here
const components = {
  Callout,
  img: DocImage,
};

export const dynamic = "force-dynamic";

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "src/content/docs", ...slug) + ".mdx";

  let fileContent;
  try {
    fileContent = await fs.readFile(filePath, "utf-8");
  } catch (err) {
    // Also try checking for index.mdx if a directory is accessed directly
    const indexPath = path.join(process.cwd(), "src/content/docs", ...slug, "index.mdx");
    try {
      fileContent = await fs.readFile(indexPath, "utf-8");
    } catch {
      notFound();
    }
  }

  const { data: frontmatter, content } = matter(fileContent);

  return (
    <article className="prose prose-slate max-w-none hover:prose-a:text-brand-600 prose-headings:text-slate-900 prose-a:font-semibold prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm text-brand-600 font-bold mb-3 uppercase tracking-wider">
          <span>Docs</span>
          <span className="text-slate-300">/</span>
          <span>{slug[0]}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          {frontmatter.title || slug[slug.length - 1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </h1>
        {frontmatter.description && (
          <p className="mt-4 text-xl text-slate-500 font-medium leading-relaxed border-l-4 border-brand-200 pl-4">
            {frontmatter.description}
          </p>
        )}
      </header>
      
      <div className="mt-8">
        <MDXRemote source={content} components={components} />
      </div>
    </article>
  );
}
