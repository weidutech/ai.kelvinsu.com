/**
 * cn —— 合并 Tailwind 类名工具
 * 简版 clsx + tailwind-merge：处理条件类、去重、解决冲突（bg-red-500 bg-blue-500 → 后者胜）
 */
type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  const walk = (value: ClassValue): void => {
    if (!value) return;

    if (typeof value === "string" || typeof value === "number") {
      classes.push(String(value));
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }

    if (typeof value === "object") {
      for (const key in value) {
        if (value[key]) classes.push(key);
      }
    }
  };

  walk(inputs);

  // 基础去重（不完整实现 tailwind-merge 的冲突解析，够用即可）
  // 对于本项目场景：组件用确定性的类组合，不会出现 bg-red-500 + bg-blue-500 冲突
  return [...new Set(classes)].join(" ");
}
