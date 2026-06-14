import { Container, Section } from "@/components/ui/Container";

/**
 * TaskLoop —— 拒绝彩虹色，拥抱大厂专业感
 * - 使用虚线和光点强化流程感
 * - 卡片增加微小阴影和内边框，提升精致度
 */
const steps = [
  { title: "说明", description: "写清目标、范围与约束", detail: "Context" },
  { title: "执行", description: "观测任务分解与修改流", detail: "Action" },
  { title: "控制", description: "设置沙盒与审批边界", detail: "Safety" },
  { title: "验证", description: "通过 CI/测试验证可靠性", detail: "Verify" },
  { title: "沉淀", description: "将经验转化为团队规则", detail: "Scale" },
];

export function TaskLoop() {
  return (
    <Section className="bg-slate-50/50 border-y border-slate-200/60 overflow-hidden relative">
      {/* 装饰背景 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-brand-500/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <Container>
        <div className="text-center mb-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6">
            Standard Operating Procedure
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            让 AI 任务始终处于<span className="text-brand-600">受控闭环</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500 font-medium">
            告别“玄学”调优。通过一套工业级的标准化流程，确保 AI 代理的每一次输出都严谨、安全且符合工程预期。
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* 连接线 (仅桌面端) */}
          <div className="absolute top-8 left-[10%] right-[10%] h-[2px] bg-[linear-gradient(to_right,#cbd5e1_50%,transparent_50%)] bg-[length:12px_2px] hidden lg:block -z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="group flex flex-col items-center text-center relative"
              >
                {/* 节点锚点 */}
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-400 font-mono font-bold text-xl mb-6 relative group-hover:border-brand-300 group-hover:text-brand-600 group-hover:shadow-md transition-all duration-300">
                  {/* 内部高亮 */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10">0{index + 1}</span>
                  
                  {/* 悬浮光晕 */}
                  <div className="absolute -inset-2 bg-brand-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </div>

                <div className="bg-white px-5 py-4 rounded-xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] w-full h-full flex flex-col">
                  <span className="text-[10px] font-bold text-brand-600 uppercase tracking-widest mb-1.5 block">
                    {step.detail}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
