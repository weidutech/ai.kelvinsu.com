"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Sparkles, Brain, Code2, Rocket, Workflow, CircleDollarSign } from "lucide-react";
import Link from "next/link";

export function RoadmapDialog({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const steps = [
    {
      title: "前沿认知与破圈",
      desc: "掌握最新 AI 模型的特性与底层逻辑，建立与机器对话的直觉。",
      icon: Brain,
      color: "text-blue-500",
      bg: "bg-blue-50 border-blue-100",
    },
    {
      title: "人机结对编程",
      desc: "跨越技术门槛，熟练应用 Claude Code / Codex 等 AI Coding 神器。",
      icon: Code2,
      color: "text-indigo-500",
      bg: "bg-indigo-50 border-indigo-100",
    },
    {
      title: "SOP 自动化重塑",
      desc: "万物皆可流。用 AI 将生活与工作中的繁琐 SOP 彻底自动化闭环。",
      icon: Workflow,
      color: "text-purple-500",
      bg: "bg-purple-50 border-purple-100",
    },
    {
      title: "超级杠杆变现",
      desc: "效率溢出转化为商业价值，利用 AI 挖掘并落地全新的变现渠道。",
      icon: CircleDollarSign,
      color: "text-amber-500",
      bg: "bg-amber-50 border-amber-100",
    },
    {
      title: "商业闭环与赋能",
      desc: "从个体户升级为生态系统，实现完整商业闭环并赋能团队与他人。",
      icon: Rocket,
      color: "text-rose-500",
      bg: "bg-rose-50 border-rose-100",
    },
  ];

  const modalContent = isOpen ? (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsOpen(false)}
      ></div>
      
      {/* Modal */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl relative z-10 animate-in zoom-in-95 fade-in duration-300 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Background Glow */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-brand-50 to-transparent pointer-events-none"></div>

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-full transition-colors shadow-sm border border-slate-200 z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-brand-600">
            <Sparkles className="w-3.5 h-3.5" />
            Kelvin's Philosophy
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
            2026 AI 觉醒与实战路线图
          </h2>
          
          <div className="prose prose-slate prose-p:leading-relaxed text-slate-600 font-medium mb-12 text-[15px]">
            <p className="mb-4">
              现在说实话，掌握 AI 已经是一个<strong className="text-slate-900 font-black">必须的事情</strong>，而不是你想不想的问题。所有人迟早都要用 AI，因为你不用，别人就会用它来降维打击你。
            </p>
            <p>
              我自己就是 AI 提效的亲历者：我用 <strong className="text-brand-600 font-black">2 个小时</strong> 就能做完别人 6 个小时甚至一天要做的事情。省下来的时间，我可以去创造新的业务、去学习、去享受生活。
              <strong className="text-slate-900 block mt-4 text-lg font-black tracking-tight">“让 AI 替你打工，是一个极其重要的人生杠杆。”</strong>
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[23px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-rose-200 hidden sm:block"></div>
            
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6 group">
                  <div className={`relative z-10 w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${step.bg} ${step.color}`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="pt-1 flex-1">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">
                      Step 0{idx + 1}
                    </h4>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
            <Link 
              href="/docs/guide/00-overview"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-4 text-center rounded-2xl font-black text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-lg"
            >
              开始免费学习
            </Link>
            <Link 
              href="/signup"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-4 text-center rounded-2xl font-black text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors"
            >
              加入私域阵地
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div onClick={(e) => { e.preventDefault(); setIsOpen(true); }} className="inline-block w-full sm:w-auto">
        {children}
      </div>
      {mounted && typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null}
    </>
  );
}
