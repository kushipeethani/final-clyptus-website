import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  RefreshCw,
  BarChart,
  Zap,
  Clock,
} from 'lucide-react';

export interface DiagnosticProblem {
  title: string;
  desc: string;
  icon: React.ElementType;
  num: string;
}

export const DIAGNOSTIC_PROBLEMS: DiagnosticProblem[] = [
  {
    num: '01',
    title: 'Disconnected ERP Systems',
    desc: 'Complex landscapes and high integration costs.',
    icon: AlertCircle,
  },
  {
    num: '02',
    title: 'Manual, Inefficient Processes',
    desc: 'High dependency on people, errors and rework.',
    icon: RefreshCw,
  },
  {
    num: '03',
    title: 'Limited Visibility',
    desc: 'Siloed data and no real-time view of operations.',
    icon: BarChart,
  },
  {
    num: '04',
    title: 'High Maintenance Cost',
    desc: 'Legacy systems raise total cost of ownership and slow innovation.',
    icon: Zap,
  },
  {
    num: '05',
    title: 'Slow Reporting',
    desc: 'Delayed insight holds back decisions.',
    icon: Clock,
  },
];

export const ProblemsWeSolveDiagnostics: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-t border-slate-200/80">
      <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
        
        {/* LEFT COLUMN: STICKY BRAND & DIAGNOSTICS INTRO (w-full md:w-1/3) */}
        <div className="w-full md:w-1/3 md:sticky md:top-28 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-blue-600 bg-clip-text text-transparent">Problems</span> We Solve
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            Modernizing legacy architectures by eliminating architectural silos, human error, and delayed insights.
          </p>
        </div>

        {/* RIGHT COLUMN: STACKED HORIZONTAL DIAGNOSTIC ROWS (w-full md:w-2/3) */}
        <div className="w-full md:w-2/3 space-y-4">
          {DIAGNOSTIC_PROBLEMS.map((prob, idx) => {
            const IconComp = prob.icon;

            return (
              <motion.div
                key={prob.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-l-4 hover:border-l-orange-500 p-5 sm:p-6 shadow-sm hover:shadow-[0_10px_20px_-5px_rgba(15,23,42,0.06)] hover:translate-x-1.5 transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer overflow-hidden"
              >
                <div className="flex items-start sm:items-center gap-4">
                  {/* Left Amber Alert Icon */}
                  <div className="w-10 h-10 rounded-xl bg-orange-100/70 text-orange-600 border border-orange-200 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <IconComp className="w-5 h-5" />
                  </div>

                  {/* Text Details */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-orange-600">
                        {prob.num}
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                        {prob.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                      {prob.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
