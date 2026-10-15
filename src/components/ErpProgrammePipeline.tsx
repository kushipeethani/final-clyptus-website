import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Workflow, Cloud, Rocket, Search } from 'lucide-react';

export interface MethodologyStep {
  step: string;
  title: string;
  desc: string;
  icon: React.ElementType;
}

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    step: '01',
    title: 'Review the Legacy ERP',
    desc: 'Siloed, complex systems are mapped and assessed.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Transformation Roadmap',
    desc: 'Strategy, assessment and plan.',
    icon: Compass,
  },
  {
    step: '03',
    title: 'Process Reengineering',
    desc: 'Optimize and standardize the processes.',
    icon: Workflow,
  },
  {
    step: '04',
    title: 'Cloud ERP Migration',
    desc: 'Migrate and integrate.',
    icon: Cloud,
  },
  {
    step: '05',
    title: 'Intelligent Enterprise',
    desc: 'Innovate, scale and grow on the new platform.',
    icon: Rocket,
  },
];

export const ErpProgrammePipeline: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-t border-slate-200/80 select-none">
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-3 mb-16">
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          How an ERP Programme{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
            Runs
          </span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl font-medium">
          A structured 5-step journey to modernize enterprise ERP operations.
        </p>
      </div>

      {/* ================= DESKTOP CONNECTED STEPPER PIPELINE (≥ 768px) ================= */}
      <div className="hidden md:block relative w-full pt-8 pb-4">
        {/* Background Connecting Rail & Active Progress Line */}
        <div className="absolute top-[68px] left-[5%] right-[5%] h-1.5 bg-slate-200/80 rounded-full overflow-hidden z-0">
          <motion.div
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 rounded-full"
          />
        </div>

        {/* 5 Milestone Nodes Grid */}
        <div className="grid grid-cols-5 gap-4 relative z-10">
          {METHODOLOGY_STEPS.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center text-center group"
              >
                {/* Node Pill Circle */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: [0.8, 1.15, 1] }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 + 0.1 }}
                  className="w-12 h-12 rounded-full bg-white border-2 border-blue-600 text-blue-600 font-mono text-sm font-black flex items-center justify-center shadow-md mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300"
                >
                  {item.step}
                </motion.div>

                {/* Content Box */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm group-hover:shadow-lg group-hover:border-blue-400 group-hover:-translate-y-1 transition-all duration-300 w-full flex flex-col justify-between h-full">
                  <div className="flex items-center justify-center p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 w-fit mx-auto mb-3 group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:border-orange-200 transition-colors">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ================= MOBILE VERTICAL CONNECTED PIPELINE (< 768px) ================= */}
      <div className="block md:hidden relative border-l-2 border-blue-500 ml-4 space-y-8 py-2">
        {METHODOLOGY_STEPS.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-6"
            >
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-blue-600 border-2 border-white text-white font-mono text-xs font-bold flex items-center justify-center shadow-sm">
                {item.step}
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <IconComp className="w-4 h-4 text-blue-600" />
                  <h3 className="text-base font-extrabold text-slate-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
