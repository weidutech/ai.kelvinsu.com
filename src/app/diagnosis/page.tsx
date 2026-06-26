"use client";

import React, { useState } from "react";
import { ChevronRight, ArrowRight, CheckCircle2, Clock, Zap, AlertTriangle, ArrowLeft } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const workflowItems = [
  "信息搜集 / 资料整理",
  "文档写作(报告 / 方案 / PPT)",
  "数据分析 / 报表整理",
  "邮件 / 消息回复",
  "会议纪要 / 沟通协调",
  "代码 / 技术实现",
  "设计 / 创意输出",
  "学习新知识 / 技能",
  "决策分析 / 复盘",
  "客户 / 用户沟通",
  "项目管理 / 排期",
  "数据录入 / 文件处理",
];

const recommendations: Record<string, { tool: string; desc: string }> = {
  "信息搜集 / 资料整理": { tool: "Perplexity + 知识库 RAG", desc: "快速聚合全网信息，内化为个人知识库" },
  "文档写作(报告 / 方案 / PPT)": { tool: "Prompt 模板 + Claude Projects", desc: "高效生成结构化内容，统一团队语料" },
  "数据分析 / 报表整理": { tool: "Code Interpreter + Cursor + 自动化脚本", desc: "一键处理脏数据，自动生成可视化报表" },
  "邮件 / 消息回复": { tool: "话术库 + 自动分类 Agent", desc: "智能判断优先级，一键生成得体回复" },
  "会议纪要 / 沟通协调": { tool: "AI 录音转写 + 关键信息提取", desc: "自动提取待办事项，解放会议注意力" },
  "代码 / 技术实现": { tool: "Cursor + Copilot + 单元测试自动化", desc: "提升 10 倍编码效率，AI 帮你写测试" },
  "设计 / 创意输出": { tool: "Midjourney + Figma AI + 素材库", desc: "突破灵感瓶颈，低门槛生成商业级视觉" },
  "学习新知识 / 技能": { tool: "AI 阅读助手 + 卡片笔记", desc: "快速提炼核心概念，打破信息壁垒" },
  "决策分析 / 复盘": { tool: "结构化 Prompt + 多视角推演", desc: "借助 AI 进行深度沙盘推演与逻辑自洽" },
  "客户 / 用户沟通": { tool: "话术模板 + 情绪识别", desc: "精准洞察用户需求，标准化高效沟通" },
  "项目管理 / 排期": { tool: "AI 任务拆解 + 自动提醒", desc: "智能切分里程碑，全盘掌控项目进度" },
  "数据录入 / 文件处理": { tool: "OCR + 自动化 Workflow", desc: "告别枯燥搬砖，全链路自动化流转" },
};

export default function DiagnosisPage() {
  const [step, setStep] = useState<Step>(1);

  // Form State
  const [phone, setPhone] = useState("");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");

  const [q4, setQ4] = useState<string[]>([]);
  const [q5, setQ5] = useState<string[]>([]);
  const [q6, setQ6] = useState<string[]>([]);
  const [q7, setQ7] = useState<string[]>([]);

  const [q8, setQ8] = useState<string[]>([]);
  const [q9, setQ9] = useState("");
  const [q10, setQ10] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const nextStep = () => setStep((s) => Math.min(s + 1, 6) as Step);
  const prevStep = () => setStep((s) => Math.max(s - 1, 1) as Step);

  const toggleArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  const calculateTop5 = () => {
    const counts: Record<string, number> = {};
    workflowItems.forEach((item) => (counts[item] = 0));
    [...q4, ...q5, ...q6, ...q7].forEach((item) => {
      if (counts[item] !== undefined) counts[item]++;
    });

    return Object.entries(counts)
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        stars: count >= 4 ? 5 : count === 3 ? 4 : count === 2 ? 3 : 2,
      }));
  };

  const handleGenerateReport = async () => {
    const top5 = calculateTop5();

    setSubmitError("");
    setIsSubmitting(true);

    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase
        .from("diagnostic_reports")
        .insert([
          {
            phone_number: phone.trim(),
            job_type: q1,
            working_hours: q2,
            repetitive_tasks: q3,
            time_consuming: q4,
            frequent_repeat: q5,
            error_prone: q6,
            disliked: q7,
            ai_usage: q8,
            ai_frequency: q9,
            time_saved: q10,
            top_5: top5,
          },
        ]);

      if (error) {
        throw error;
      }

      nextStep();
    } catch (err) {
      console.error(err);
      setSubmitError("提交失败了，请稍后重试；如果你赶时间，也可以直接加我微信说明是诊断页报错。");
    } finally {
      setIsSubmitting(false);
    }
  };
  const isPhoneValid = /^1\d{10}$/.test(phone.trim());

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 sm:p-8 font-sans selection:bg-purple-500/30">
      <div className="w-full max-w-3xl flex-1 flex flex-col relative">
        {step > 1 && step < 5 && (
          <button
            onClick={prevStep}
            className="absolute top-0 left-0 text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> 返回
          </button>
        )}

        <div className="mt-12 flex-1 flex flex-col">
          {/* Step 1: Cover */}
          {step === 1 && (
            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium border border-purple-500/30">
                🚀 AI Workflow Diagnostic
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text pb-2">
                AI 工作流诊断
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 font-medium max-w-xl">
                3 分钟，找出你的工作中 5 个最值得 AI 化的环节
              </p>
              <p className="text-slate-400 max-w-lg">
                不是测你几分，而是告诉你具体该改哪里。
              </p>

              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 max-w-sm w-full text-left">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold shadow-lg shadow-purple-500/20">
                    K
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Kelvin</h3>
                    <p className="text-sm text-slate-400">大厂 AI 研究员 | 已帮 100+ 职场人重塑工作流</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 完全免费</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 仅需 3 分钟</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 深度个性化诊断报告</li>
                </ul>
              </div>

              <button
                onClick={nextStep}
                className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-bold text-lg shadow-xl shadow-purple-500/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                开始免费诊断 <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 2: Basic Info */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in duration-500 w-full max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold">第一步：基础画像</h2>
                <p className="text-slate-400 mt-2">先留个手机号，再快速进入工作流诊断</p>
              </div>

              <div className="space-y-4">
                <label className="block text-lg font-medium">先留个手机号</label>
                <div className="space-y-3">
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="请输入 11 位手机号"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                  <p className="text-sm text-slate-400">
                    只用于你后面加我微信时，我能快速对上这份诊断结果，不会单独打电话联系你。
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-lg font-medium">1. 你的职业类型？</label>
                <select
                  value={q1}
                  onChange={(e) => setQ1(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">请选择...</option>
                  {["程序员 / 工程师", "产品经理", "设计师", "运营 / 市场", "销售 / BD", "管理者", "HR / 行政 / 财务", "自由职业 / 创业者", "学生", "其他"].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                <label className="block text-lg font-medium">2. 你每周工作大约多少小时？</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["40 小时以下", "40-50 小时", "50-60 小时", "60 小时以上(已经爆了)"].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setQ2(opt)}
                      className={`p-4 rounded-xl border text-left transition-all ${q2 === opt ? 'bg-purple-600/20 border-purple-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-lg font-medium">3. 你工作中「重复性任务」占比大约？</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["30% 以下", "30-50%", "50-70%", "70% 以上(几乎都在重复)"].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setQ3(opt)}
                      className={`p-4 rounded-xl border text-left transition-all ${q3 === opt ? 'bg-purple-600/20 border-purple-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-8 flex justify-end">
                <button
                  onClick={nextStep}
                  disabled={!isPhoneValid || !q1 || !q2 || !q3}
                  className="px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  下一步 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Workflow Diagnosis */}
          {step === 3 && (
            <div className="space-y-12 animate-in fade-in duration-500 w-full max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold">第二步：工作环节诊断</h2>
                <p className="text-slate-400 mt-2">选出符合描述的工作环节（多选）</p>
              </div>

              {[
                { id: "q4", title: "4. 在以上环节中，哪些最耗时？", state: q4, setter: setQ4 },
                { id: "q5", title: "5. 哪些每周都要重复做？", state: q5, setter: setQ5 },
                { id: "q6", title: "6. 哪些最容易出错或返工？", state: q6, setter: setQ6 },
                { id: "q7", title: "7. 哪些你最讨厌做、最想自动化？", state: q7, setter: setQ7 },
              ].map((q) => (
                <div key={q.id} className="space-y-4 bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                  <label className="block text-lg font-medium text-purple-200">{q.title}</label>
                  <div className="flex flex-wrap gap-2">
                    {workflowItems.map(opt => {
                      const isSelected = q.state.includes(opt);
                      return (
                        <button
                          key={opt}
                          onClick={() => toggleArrayItem(q.setter, opt)}
                          className={`px-4 py-2 rounded-lg border text-sm transition-all ${isSelected ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20' : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500'}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-4 flex justify-end">
                <button
                  onClick={nextStep}
                  disabled={q4.length === 0}
                  className="px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  下一步 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: AI Usage */}
          {step === 4 && (
            <div className="space-y-8 animate-in fade-in duration-500 w-full max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold">第三步：AI 应用现状</h2>
                <p className="text-slate-400 mt-2">评估你当前的 AI 工具掌握程度</p>
              </div>

              <div className="space-y-4">
                <label className="block text-lg font-medium">8. 你目前主要用 AI 做什么？(多选)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {["还没怎么用过", "问答 / 搜索", "写文档 / 润色", "写代码 / 改 bug", "翻译", "数据分析", "图片生成", "视频 / 音频", "流程自动化", "其他"].map(opt => {
                    const isSelected = q8.includes(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => toggleArrayItem(setQ8, opt)}
                        className={`p-3 rounded-xl border text-sm transition-all ${isSelected ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-lg font-medium">9. 你用 AI 的频率？</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["几乎不用", "偶尔用(每周 1-2 次)", "经常用(每天 1-3 次)", "高度依赖(每天 10+ 次)"].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setQ9(opt)}
                      className={`p-4 rounded-xl border text-left transition-all ${q9 === opt ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-lg font-medium">10. 你觉得目前用 AI 之后，每周节省了多少时间？</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["几乎没节省", "1-3 小时", "3-5 小时", "5-10 小时", "10 小时以上"].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setQ10(opt)}
                      className={`p-4 rounded-xl border text-left transition-all ${q10 === opt ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-8 flex justify-end">
                <button
                  onClick={handleGenerateReport}
                  disabled={isSubmitting || q8.length === 0 || !q9 || !q10}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-bold shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2"
                >
                  {isSubmitting ? "提交中..." : "生成专属诊断报告"} <Zap className="w-5 h-5" />
                </button>
              </div>

              {submitError ? (
                <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {submitError}
                </p>
              ) : null}
            </div>
          )}

          {/* Step 5: Report */}
          {step === 5 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 w-full max-w-3xl mx-auto pb-20">
              <div className="text-center space-y-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-medium border border-emerald-500/30">
                  诊断完成
                </div>
                <h2 className="text-4xl font-bold">
                  你的 AI 工作流成熟度：
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500">
                    {q9.includes("高度依赖") ? "专家级" : q9.includes("经常用") ? "进阶级" : "探索期"}
                  </span>
                </h2>
                <p className="text-slate-400 text-lg">
                  发现 {calculateTop5().length} 个高潜力优化环节，预计可为你每周节省大量时间。
                </p>
              </div>

              <div className="mt-10">
                <h3 className="text-2xl font-bold flex items-center gap-2 mb-6">
                  <Zap className="text-amber-400" /> 最值得 AI 化的 {calculateTop5().length} 个环节
                </h3>
                <div className="grid gap-6">
                  {calculateTop5().map((item, idx) => (
                    <div key={item.name} className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                      
                      <div className="flex flex-col sm:flex-row gap-6 justify-between">
                        <div className="space-y-4 flex-1">
                          <h4 className="text-xl font-bold text-white flex items-center gap-2">
                            {idx + 1}. {item.name}
                          </h4>
                          
                          <div className="flex gap-2 flex-wrap text-xs">
                            {q4.includes(item.name) && <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded">最耗时</span>}
                            {q5.includes(item.name) && <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded">高频重复</span>}
                            {q6.includes(item.name) && <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded">易出错</span>}
                            {q7.includes(item.name) && <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded">最想自动化</span>}
                          </div>

                          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                            <div className="text-sm text-slate-400 mb-1">🛠 推荐方向：</div>
                            <div className="font-semibold text-purple-300">{recommendations[item.name]?.tool || "AI 定制工作流"}</div>
                            <div className="text-sm text-slate-400 mt-1">{recommendations[item.name]?.desc || "专属优化方案"}</div>
                          </div>
                        </div>

                        <div className="sm:w-40 flex flex-col justify-center space-y-3 bg-slate-900/50 p-4 rounded-xl">
                          <div>
                            <div className="text-xs text-slate-400">AI 化潜力</div>
                            <div className="text-amber-400 text-lg">
                              {"★".repeat(item.stars)}{"☆".repeat(5 - item.stars)}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-400">预估每周节省</div>
                            <div className="font-bold text-emerald-400 flex items-center gap-1">
                              <Clock className="w-4 h-4" /> 
                              {q3.includes("70%") ? "5-8" : "2-5"} 小时
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl">
                  <h4 className="font-bold flex items-center gap-2 mb-4 text-emerald-400"><CheckCircle2 /> 你的优势</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    你已经在尝试使用 AI 进行 {q8.slice(0, 2).join('、')}，这说明你具备极好的前瞻性。
                  </p>
                </div>
                <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl">
                  <h4 className="font-bold flex items-center gap-2 mb-4 text-amber-400"><AlertTriangle /> 潜在盲区</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    针对你的 {q1} 岗位，其实在 {workflowItems.find(i => !q4.includes(i) && !q5.includes(i)) || "自动化协同"} 方面有极大红利空间，但你可能尚未发觉。
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-purple-500/30 p-8 rounded-3xl text-center shadow-2xl shadow-purple-900/20 mt-12">
                <h3 className="text-2xl font-bold mb-4">💡 想知道具体该怎么搭建？</h3>
                <p className="text-slate-300 mb-6 max-w-lg mx-auto">
                  我每周开放 5 个免费 1v1 诊断名额，针对你的岗位痛点，给出完整的工具组合、可执行的 Prompt 模板与落地路径。
                </p>
                <div className="flex justify-center mb-8">
                  <ul className="text-sm text-left space-y-2 text-purple-200">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 完整的工具组合推荐</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 可直接使用的 Prompt 模板</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 7 天快速落地实践路径</li>
                  </ul>
                </div>
                <button
                  onClick={nextStep}
                  className="w-full sm:w-auto px-10 py-4 bg-white text-purple-900 hover:bg-purple-100 rounded-full font-bold text-lg transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                  立即申请 1v1 诊断 →
                </button>
                <p className="text-xs text-purple-300/60 mt-4">本周仅剩 3 个免费名额</p>
              </div>
            </div>
          )}

          {/* Step 6: Form */}
          {step === 6 && (
            <div className="space-y-8 animate-in fade-in duration-500 w-full max-w-xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">申请 1v1 免费诊断</h2>
                <p className="text-slate-400 mt-2">添加微信，获取针对你的详细解决方案</p>
              </div>

              <div className="bg-slate-800/80 border border-purple-500/50 p-8 rounded-3xl space-y-8 text-center shadow-2xl shadow-purple-900/20">
                <div className="space-y-4">
                  <p className="text-lg text-slate-300">请直接添加我的微信：</p>
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 flex flex-col items-center justify-center space-y-2">
                    <span className="text-4xl font-mono font-bold text-white tracking-wider select-all">gamemasterv1</span>
                  </div>
                  <p className="text-slate-400">添加时请备注：<span className="font-semibold text-purple-400">诊断</span></p>
                </div>
                
                <div className="p-4 bg-purple-500/10 rounded-xl text-left border border-purple-500/20">
                  <h4 className="font-bold text-purple-300 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> 接下来会发生什么？
                  </h4>
                  <ul className="text-sm text-slate-300 space-y-2">
                    <li>1. 将你刚才的测试结果（核心痛点）直接发给我</li>
                    <li>2. 我会为你匹配对应的 AI 工具组合及 Prompt 模板</li>
                    <li>3. 制定适合你当前岗位的 7 天落地计划</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
