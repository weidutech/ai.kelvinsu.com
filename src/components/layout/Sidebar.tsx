"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

import { docsConfig } from "@/config/docs";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block border-r border-slate-200 h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto py-8 px-4">
      <div className="space-y-8">
        {docsConfig.sidebar.map((section) => (
          <div key={section.title}>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">
              {section.title}
            </h4>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <SidebarItem key={item.text} item={item} pathname={pathname} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}

type SidebarItemType = {
  text: string;
  href?: string;
  children?: SidebarItemType[];
};

function SidebarItem({ item, pathname }: { item: SidebarItemType; pathname: string }) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href === pathname || (hasChildren && item.children!.some((c: SidebarItemType) => c.href === pathname));
  const [isOpen, setIsOpen] = useState(isActive);

  if (hasChildren) {
    return (
      <li>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between px-2 py-1.5 text-sm font-medium rounded-md transition-colors",
            isActive ? "text-brand-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          )}
        >
          <span>{item.text}</span>
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        {isOpen && (
          <ul className="mt-1 ml-4 border-l border-slate-100 space-y-1">
            {item.children!.map((child: SidebarItemType) => (
              <li key={child.href}>
                <Link
                  href={child.href as string}
                  className={cn(
                    "block px-3 py-1.5 text-sm rounded-md transition-colors",
                    pathname === child.href
                      ? "text-brand-700 bg-brand-50 font-medium"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {child.text}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href as string}
        className={cn(
          "block px-2 py-1.5 text-sm font-medium rounded-md transition-colors",
          pathname === item.href
            ? "text-brand-700 bg-brand-50"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
        )}
      >
        {item.text}
      </Link>
    </li>
  );
}
