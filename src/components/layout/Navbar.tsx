"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";
import { WechatDialog } from "@/components/ui/WechatDialog";

const navItems = [
  { name: "首页", href: "/" },
  { name: "免费知识库", href: "/docs/guide/00-overview" },
  { name: "VIP 会员", href: "/premium" },
  { name: "1V1 咨询", href: "/consulting" },
  { name: "关于我", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm py-4"
            : "bg-white/50 backdrop-blur-md border-b border-slate-200/50 py-6"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform ring-2 ring-white border border-slate-100">
                <img src="/images/avatar.jpg" alt="Kelvin's Avatar" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Kelvin<span className="text-slate-500 font-medium ml-[2px]">Guide</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href) && item.href !== "/" || pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-[15px] font-bold transition-colors duration-300",
                      isActive
                        ? "text-brand-600"
                        : "text-slate-500 hover:text-slate-900"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <WechatDialog>
              <div 
                className="hidden sm:flex items-center gap-2 text-[15px] font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md shadow-slate-900/10 px-6 py-3 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                加入会员
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </div>
            </WechatDialog>
            
            <button 
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors bg-white rounded-full border border-slate-200 shadow-sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 md:hidden animate-in">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-xl font-bold py-3 border-b border-slate-100",
                  pathname === item.href ? "text-brand-600" : "text-slate-900"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-8">
              <WechatDialog>
                <div 
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-lg shadow-xl shadow-slate-900/10"
                >
                  加入会员
                  <ArrowRight className="w-5 h-5" />
                </div>
              </WechatDialog>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
