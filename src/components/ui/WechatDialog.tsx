"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, MessageCircle } from "lucide-react";

export function WechatDialog({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modalContent = isOpen ? (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      ></div>
      
      {/* Modal */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-[#07C160]/10 text-[#07C160] rounded-2xl flex items-center justify-center mx-auto mb-5">
            <MessageCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">添加主理人微信</h3>
          <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">
            平台自动化系统暂未开放。<br />请添加 Kelvin 微信进行人工开通或商务咨询。
          </p>

          <div className="bg-slate-50 rounded-2xl p-5 mb-6 border border-slate-100/80">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">微信号 (点击或长按复制)</p>
            <p className="text-2xl font-black text-slate-900 select-all font-mono tracking-tight">gamemasterv1</p>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-3.5 rounded-xl font-bold text-white bg-[#07C160] hover:bg-[#06ad56] transition-colors shadow-lg shadow-[#07C160]/20"
          >
            好的，我去微信添加
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div onClick={(e) => { e.preventDefault(); setIsOpen(true); }} className="inline-block cursor-pointer w-full sm:w-auto text-left">
        {children}
      </div>
      {mounted && typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null}
    </>
  );
}
