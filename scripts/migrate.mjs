import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const LEGACY_DOCS_DIR = path.join(process.cwd(), 'legacy/docs');
const TARGET_DOCS_DIR = path.join(process.cwd(), 'src/content/docs');
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public/images');

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function copyImages() {
  await ensureDir(PUBLIC_IMAGES_DIR);
  
  const sources = [
    path.join(LEGACY_DOCS_DIR, 'images'),
    path.join(LEGACY_DOCS_DIR, '.vuepress/public/images')
  ];

  for (const src of sources) {
    try {
      const entries = await fs.readdir(src, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isFile()) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(PUBLIC_IMAGES_DIR, entry.name);
          await fs.copyFile(srcPath, destPath);
          console.log(`Copied image: ${entry.name}`);
        }
      }
    } catch (err) {
      console.log(`Skipping image copy from ${src} (Not found)`);
    }
  }
}

async function walkDir(dir, callback) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '.vuepress' && entry.name !== 'node_modules') {
        await walkDir(fullPath, callback);
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      await callback(fullPath);
    }
  }
}

function transformContent(rawContent) {
  const { data, content } = matter(rawContent);
  let newContent = content;

  // Transform VuePress containers
  // ::: tip [title]
  // content
  // :::
  newContent = newContent.replace(/^:::\s*(tip|warning|danger|info)\s*(.*)?\n([\s\S]*?)\n:::/gm, (match, type, title, body) => {
    let calloutType = type;
    if (type === 'tip') calloutType = 'info'; // Map tip to info if needed, or keep tip
    const titleProp = (title && title.trim()) ? ` title="${title.trim()}"` : '';
    return `<Callout type="${calloutType}"${titleProp}>\n${body}\n</Callout>`;
  });

  // Transform internal markdown links
  // [Link](./file.md) -> [Link](./file)
  newContent = newContent.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    if (!url.startsWith('http') && url.endsWith('.md')) {
      return `[${text}](${url.replace(/\.md$/, '')})`;
    }
    return match;
  });

  return { data, newContent };
}

async function migrate() {
  console.log('Starting migration...');
  await copyImages();
  await ensureDir(TARGET_DOCS_DIR);

  let fileCount = 0;

  await walkDir(LEGACY_DOCS_DIR, async (filePath) => {
    const relPath = path.relative(LEGACY_DOCS_DIR, filePath);
    const destPath = path.join(TARGET_DOCS_DIR, relPath.replace(/\.md$/, '.mdx'));
    
    await ensureDir(path.dirname(destPath));

    const rawContent = await fs.readFile(filePath, 'utf-8');
    const { data, newContent } = transformContent(rawContent);

    // Re-stringify with frontmatter
    const finalContent = matter.stringify(newContent, data);

    await fs.writeFile(destPath, finalContent, 'utf-8');
    console.log(`Migrated: ${relPath}`);
    fileCount++;
  });

  console.log(`Migration complete! Successfully migrated ${fileCount} markdown files to src/content/docs.`);
}

migrate().catch(console.error);
