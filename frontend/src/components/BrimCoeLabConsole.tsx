import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  Calculator,
  Layers,
  ShieldCheck,
  Cpu,
  Sparkles,
  Terminal,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

export interface LabFacility {
  id: string;
  shortTitle: string;
  fullTitle: string;
  summary: string;
  icon: React.ElementType;
  accentBadge: string;
  specs: string[];
  telemetry: {
    status: string;
    throughput: string;
    scenario: string;
    latency: string;
  };
  outcomes: string[];
}

export const LAB_FACILITIES: LabFacility[] = [
  {
    id: 'sandbox',
    shortTitle: 'Live BRIM Sandbox',
    fullTitle: 'Enterprise Live BRIM Sandbox Environment',
    summary:
      'Live BRIM sandbox pre-populated with core revenue management modules, multiple industry scenarios, and realistic master data for rapid prototyping.',
    icon: Database,
    accentBadge: 'FULL REVENUE SUITE',
    specs: [
      'Realistic Industry Master Data',
      'End-to-End Order-to-Cash Simulation',
      'Multi-Tenant Test Scenarios',
      'Pre-Configured Product Catalog',
    ],
    telemetry: {
      status: 'Active (24/7 Sandbox)',
      throughput: '1.2M Records / hr',
      scenario: 'Telecom & High-Tech ERP',
      latency: '< 45ms Response',
    },
    outcomes: [
      'Accelerates project blueprinting phase by 40%',
      'Validates complex cross-module dependencies before go-live',
    ],
  },
  {
    id: 'invoice',
    shortTitle: 'Invoice Simulation',
    fullTitle: 'Multi-Jurisdiction Invoice Simulation Framework',
    summary:
      'Advanced invoice simulation engine supporting complex proration, usage-based billing, subscriptions, one-time fees, discounts, and automated tax calculation.',
    icon: Calculator,
    accentBadge: 'BILLING ENGINE',
    specs: [
      'Real-Time Proration Engine',
      'Multi-Format PDF Output Generation',
      'Discount & Rebate Logic Engine',
      'Automated Tax Jurisdiction Hooks',
    ],
    telemetry: {
      status: 'Ready (Engine Active)',
      throughput: '500k Invoices / hr',
      scenario: 'Usage + Flat Subscriptions',
      latency: '< 18ms Rating',
    },
    outcomes: [
      'Eliminates billing error rates prior to production runs',
      'Provides instant auditability for financial compliance',
    ],
  },
  {
    id: 'rating',
    shortTitle: 'Rating Scenario Library',
    fullTitle: 'Convergent Charging Rating Scenario Library',
    summary:
      'Pre-built rating scenario library optimized for Telecom, Utilities, SaaS, and Digital API Monetization platforms.',
    icon: Layers,
    accentBadge: 'MONETIZATION LAB',
    specs: [
      'Telecom Voice/Data Rating Tables',
      'Utility Meter-to-Cash Logic',
      'SaaS Tiered Subscription Calculators',
      'API Consumption Monetization',
    ],
    telemetry: {
      status: 'Loaded (4 Sectors)',
      throughput: '3.5M Events / min',
      scenario: 'Metered API Consumption',
      latency: '< 8ms Real-Time',
    },
    outcomes: [
      'Reduces rating rule configuration timelines from weeks to days',
      'Enables rapid rollout of innovative recurring pricing models',
    ],
  },
  {
    id: 'fica',
    shortTitle: 'FI-CA Reconciliation Labs',
    fullTitle: 'FI-CA & RAR Financial Settlement Labs',
    summary:
      'Dedicated FI-CA reconciliation lab covering automated payment processing, clearing runs, dunning workflows, dispute management, and period-end close runs.',
    icon: ShieldCheck,
    accentBadge: 'ASC 606 / IFRS 15',
    specs: [
      'Automated Dunning Strategy Runs',
      'Dispute & Chargeback Flows',
      'Revenue Recognition (RAR) Sync',
      'Bank Reconciliation Automation',
    ],
    telemetry: {
      status: 'Syncing (S/4HANA Ledger)',
      throughput: '100% ASC 606 Compliant',
      scenario: 'Period-End Settlement',
      latency: 'Zero Ledger Drift',
    },
    outcomes: [
      'Streamlines period-end closing cycles with automated clearing',
      'Ensures 100% compliance with ASC 606 & IFRS 15 revenue standards',
    ],
  },
  {
    id: 'performance',
    shortTitle: 'Performance Tuning Toolkit',
    fullTitle: 'High-Volume BRIM Performance & Telemetry Toolkit',
    summary:
      'Performance tuning toolkit equipped with automated benchmarking scripts, database tuning routines, and live telemetry dashboards.',
    icon: Cpu,
    accentBadge: 'HIGH-VOLUME BENCHMARK',
    specs: [
      'DB Index & Partition Optimization',
      'Mass Invoicing Batch Parallelization',
      'Real-Time Memory Telemetry',
      'Automated Latency Bottleneck Audit',
    ],
    telemetry: {
      status: 'Benchmarking Active',
      throughput: '10M Event Stress Test',
      scenario: 'HANA In-Memory Tuning',
      latency: '< 5ms Batch Cycle',
    },
    outcomes: [
      'Maximizes database throughput during peak billing windows',
      'Prevents system degradation under heavy usage traffic',
    ],
  },
];

export const BrimCoeLabConsole: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('sandbox');
  const activeFacility =
    LAB_FACILITIES.find((fac) => fac.id === activeTabId) || LAB_FACILITIES[0];

  return (
    <div className="w-full select-none">
      {/* Engineered Outer Panel Container */}
      <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border border-slate-200/90 shadow-lg relative overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Clyptus BRIM Center of Excellence
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Internal Innovation Lab & Sandbox Console
              </p>
            </div>
          </div>
        </div>

        {/* Console Interactive Split Grid (Tab Selectors on Left, Interactive Console Display on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT COLUMN: Tab Selectors (5 Facilities) (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-2.5 justify-between">
            {LAB_FACILITIES.map((facility) => {
              const IconComp = facility.icon;
              const isActive = facility.id === activeTabId;

              return (
                <button
                  key={facility.id}
                  onClick={() => setActiveTabId(facility.id)}
                  onMouseEnter={() => setActiveTabId(facility.id)}
                  onFocus={() => setActiveTabId(facility.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group relative overflow-hidden ${
                    isActive
                      ? 'bg-white border-blue-500 shadow-md text-slate-900 font-bold'
                      : 'bg-white/60 hover:bg-white border-slate-200/90 text-slate-600 font-medium hover:border-blue-300'
                  }`}
                >
                  {/* Active Selection Indicator Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600"
                      transition={{ duration: 0.25 }}
                    />
                  )}

                  <div className="flex items-center gap-3 pl-1">
                    <div
                      className={`p-2.5 rounded-xl transition-colors shrink-0 ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-extrabold block tracking-tight">
                        {facility.shortTitle}
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform ${
                      isActive
                        ? 'text-blue-600 translate-x-0.5 -translate-y-0.5'
                        : 'text-slate-300 group-hover:text-slate-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Interactive Console Preview Display (lg:col-span-7) */}
          <div className="lg:col-span-7 flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFacility.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="w-full p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Console Card Header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                        LAB CONSOLE TELEMETRY
                      </span>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 mb-2 tracking-tight">
                    {activeFacility.fullTitle}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed mb-6">
                    {activeFacility.summary}
                  </p>

                  {/* Architecture Specifications Grid */}
                  <div className="mb-6">
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                      LAB SPECIFICATIONS & CAPABILITIES
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeFacility.specs.map((spec, i) => (
                        <div
                          key={i}
                          className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enterprise Impact Outcomes */}
                  <div className="mb-6">
                    <span className="text-[11px] font-mono font-bold text-orange-600 uppercase tracking-wider block mb-2">
                      KEY ENTERPRISE OUTCOME
                    </span>
                    <div className="space-y-1.5">
                      {activeFacility.outcomes.map((outcome, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-orange-50/70 border border-orange-200/70 text-xs font-bold text-slate-800 flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
