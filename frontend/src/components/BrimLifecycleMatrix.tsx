import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Activity,
  Zap,
  Receipt,
  Landmark,
  Terminal,
  CheckCircle2,
} from 'lucide-react';

export interface BrimModule {
  stepNum: string;
  code: string;
  title: string;
  desc: string;
  flowLabel: string;
  icon: React.ElementType;
  accentColor: string;
  deliverables: string[];
}

export const BRIM_MODULE_PIPELINE: BrimModule[] = [
  {
    stepNum: '01',
    code: 'SOM',
    title: 'Subscription Order Management',
    desc: 'Master data setup, product catalog design, subscription lifecycle management, order orchestration, contract master configuration.',
    flowLabel: 'Captures Subscriptions → Sends Usage Schema to Mediation',
    icon: ShoppingCart,
    accentColor: 'blue',
    deliverables: ['Product Catalog', 'Contract Masters', 'Order Orchestration'],
  },
  {
    stepNum: '02',
    code: 'CM',
    title: 'Convergent Mediation',
    desc: 'Collecting, validating and transforming high-volume usage data, then passing it to Convergent Charging.',
    flowLabel: 'Raw Usage Data Preprocessing → Feeds Rating Engine',
    icon: Activity,
    accentColor: 'indigo',
    deliverables: ['CDR Validation', 'High-Volume Mediation', 'Enrichment Pipelines'],
  },
  {
    stepNum: '03',
    code: 'CC',
    title: 'Convergent Charging',
    desc: 'Rating engine configuration, pricing strategy, charge calculation logic, aggregation rules, real-time usage monetization.',
    flowLabel: 'Calculates Charges → Passes Billed Items to Invoicing',
    icon: Zap,
    accentColor: 'orange',
    deliverables: ['Real-Time Rating', 'Tiered Pricing', 'Usage Monetization'],
  },
  {
    stepNum: '04',
    code: 'CI',
    title: 'Convergent Invoicing',
    desc: 'Invoice document generation, multi-format output, billing run optimization, invoice consolidation, mass processing.',
    flowLabel: 'Consolidates Invoices → Posts to Financial Ledger',
    icon: Receipt,
    accentColor: 'sky',
    deliverables: ['Bill Aggregation', 'Mass Invoicing', 'Multi-Format Output'],
  },
  {
    stepNum: '05',
    code: 'FI-CA & RAR',
    title: 'FI-CA and RAR',
    desc: 'Contract accounts receivable, payment processing, clearing and reconciliation, revenue recognition compliance (ASC 606 / IFRS 15), S/4HANA integration.',
    flowLabel: 'Clears Payments → Reconciles Revenue Recognition',
    icon: Landmark,
    accentColor: 'emerald',
    deliverables: ['Accounts Receivable', 'ASC 606 Compliance', 'Automated Clearing'],
  },
  {
    stepNum: '06',
    code: 'TECH',
    title: 'BRIM Technical',
    desc: 'ABAP development and enhancements, Convergent Invoicing tuning, integration support (PI/PO, CPI).',
    flowLabel: 'System Optimization & Extension Pipelines',
    icon: Terminal,
    accentColor: 'purple',
    deliverables: ['Custom ABAP Core', 'CPI/PI Integrations', 'Performance Tuning'],
  },
];

export const BrimLifecycleMatrix: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full mb-20 select-none">
      {/* Grid Pipeline Stage Matrix (2 Rows of 3 Modules on Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {BRIM_MODULE_PIPELINE.map((mod, idx) => {
          const IconComp = mod.icon;
          const isHovered = hoveredIndex === idx;

          return (
            <motion.div
              key={mod.code}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className={`relative rounded-3xl p-6 sm:p-7 bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                isHovered
                  ? 'border-blue-500 shadow-xl shadow-blue-500/10 -translate-y-1 z-20'
                  : 'border-slate-200/90 hover:border-slate-300 shadow-sm z-10'
              }`}
            >
              {/* Upstream to Downstream Flow Glow Accent Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 ${
                  isHovered
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500'
                    : 'bg-slate-100'
                }`}
              />

              <div>
                {/* Header Row: Step Number */}
                <div className="flex items-center justify-between mb-4 pt-1">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-extrabold flex items-center justify-center border border-slate-200">
                    {mod.stepNum}
                  </span>
                </div>

                {/* Module Title & Icon */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`p-3 rounded-2xl shrink-0 transition-colors duration-300 ${
                      isHovered
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'bg-slate-100 text-blue-600 border border-slate-200'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      {mod.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed mb-4">
                  {mod.desc}
                </p>

                {/* Deliverables Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {mod.deliverables.map((item, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200/80 text-[11px] font-semibold text-slate-700 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-blue-600" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
