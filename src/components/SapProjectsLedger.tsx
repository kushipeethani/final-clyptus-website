import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export interface SapProjectItem {
  id: string;
  number: string;
  badge: string;
  badgeStyle: string;
  title: string;
  industryRegion?: string;
  problemSolved?: string;
  scopeDelivery: string;
  proofNote?: string;
  outcome?: string;
  subSectors?: {
    sector: string;
    description: string;
  }[];
}

export const SAP_PROJECTS_DATA: SapProjectItem[] = [
  {
    id: 'proj-01',
    number: '01',
    badge: 'MANUFACTURING',
    badgeStyle: 'bg-sky-50 text-sky-700 border border-sky-200',
    title: 'SAP Migration for Enterprise Manufacturer (Malaysia)',
    industryRegion: 'Manufacturing & Building Materials · Malaysia',
    scopeDelivery:
      'Delivered an accelerated SAP migration to completion in record time with an integrated joint project-manager and technical-lead team supported by senior solution architects.',
    proofNote:
      'Client endorsement published on clyptus.com (Manager, Leading Cement Manufacturer).',
  },
  {
    id: 'proj-02',
    number: '02',
    badge: 'CORE ERP',
    badgeStyle: 'bg-blue-50 text-blue-700 border border-blue-200',
    title: 'Enterprise Full SAP Implementation',
    scopeDelivery:
      'Comprehensive end-to-end SAP system deployment executed with zero operational downtime. Direct recognition for proactive project communication, rigorous technical architecture, and granular attention to detail.',
    proofNote: 'Endorsed by Head of Business Development (Verified engagement).',
  },
  {
    id: 'proj-03',
    number: '03',
    badge: 'ENERGY & ANALYTICS',
    badgeStyle: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    title: 'Analytics Dashboards on Enterprise ERP Data',
    industryRegion: 'Energy Services · Malaysia',
    problemSolved:
      'High-volume ERP operational data was fragmented and difficult to extract for executive decision-making.',
    scopeDelivery:
      'Assessed reporting requirements, engineered streamlined data pipelines, and deployed automated dashboards with real-time filtering and live operational KPI tracking.',
    proofNote: 'Analytics dashboards on ERP data (Powered by Zoho Analytics platform).',
  },
  {
    id: 'proj-04',
    number: '04',
    badge: 'AVIATION & BRIM',
    badgeStyle: 'bg-orange-50 text-orange-700 border border-orange-200',
    title: 'High-Volume Airline Usage Billing Architecture',
    industryRegion: 'Global Aviation & Airline Services',
    problemSolved:
      'Ingesting and rating massive transaction volumes with complex multi-partner revenue-share tiers and overlapping charge plans.',
    scopeDelivery:
      'Engineered custom mediation pipelines, dynamic cumulative tier rating in SAP Convergent Charging (CC), and a unified master agreement mapping framework with automated regression suites.',
    outcome:
      'High-throughput transaction processing, improved auditability, and automated partner revenue distribution.',
  },
  {
    id: 'proj-05',
    number: '05',
    badge: 'MONETIZATION & BILLING',
    badgeStyle: 'bg-purple-50 text-purple-700 border border-purple-200',
    title: 'Multi-Industry BRIM Specialized Deployments',
    scopeDelivery:
      'Customized revenue management architectures built across strategic industry verticals.',
    subSectors: [
      {
        sector: 'Insurance',
        description:
          'Automated policy premiums calculated from live telemetry data, risk-based pricing, and integrated billing across SAP Fiori, SOM, CI, and CC.',
      },
      {
        sector: 'Telecom',
        description:
          'Large-scale subscription billing and contract automation for telecommunications enterprise accounts.',
      },
      {
        sector: 'High-Tech',
        description:
          'Modernized Billing and Revenue Management (BRM), subscription scaling, and automated order-to-cash workflows.',
      },
      {
        sector: 'Utilities',
        description:
          'Integrated work order revenue streams, meter-to-cash automation, and multi-tier utility rating.',
      },
    ],
  },
  {
    id: 'proj-06',
    number: '06',
    badge: 'DISCRETE MANUFACTURING',
    badgeStyle: 'bg-slate-100 text-slate-700 border border-slate-300',
    title: 'Global Enterprise S/4HANA Digital Transformation',
    scopeDelivery:
      'Core SAP S/4HANA enterprise migration and modernization program for a multinational manufacturing organization, aligning core business operations onto a unified digital core.',
    proofNote: 'Production Transformation (2020)',
  },
];

export const SapProjectsLedger: React.FC = () => {
  return (
    <section
      id="sap-projects"
      className="py-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-t border-slate-200/80 scroll-mt-24 select-none bg-white"
    >
      {/* Section Header */}
      <div className="text-center flex flex-col items-center gap-3 mb-16">
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          ERP{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
            CASE STUDIES
          </span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-medium">
          Verified production implementations and architectural transformations delivered across global enterprises.
        </p>
      </div>

      {/* Direct Line-by-Line Editorial Project Ledger (No Cards) */}
      <div className="border-t border-slate-200/80 divide-y divide-slate-200/80">
        {SAP_PROJECTS_DATA.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="py-10 hover:bg-slate-50/50 transition-colors duration-200 px-3 sm:px-6 rounded-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Number & Title (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-extrabold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    PROJECT {proj.number}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  {proj.title}
                </h3>

                {proj.industryRegion && (
                  <div className="pt-1">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      INDUSTRY / REGION
                    </span>
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/70 inline-block">
                      {proj.industryRegion}
                    </span>
                  </div>
                )}
              </div>

              {/* Right Column: Editorial Delivery Details & Sub-Sectors (lg:col-span-7) */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Problem Solved (if applicable) */}
                {proj.problemSolved && (
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      PROBLEM SOLVED
                    </span>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      {proj.problemSolved}
                    </p>
                  </div>
                )}

                {/* Scope & Delivery */}
                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    SCOPE & DELIVERY
                  </span>
                  <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                    {proj.scopeDelivery}
                  </p>
                </div>

                {/* Delivery Outcome (if applicable) */}
                {proj.outcome && (
                  <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200/70 text-xs font-semibold text-slate-800">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-700 block mb-1">
                      DELIVERY OUTCOME
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                      {proj.outcome}
                    </p>
                  </div>
                )}

                {/* Verifiable Proof Note (if applicable) */}
                {proj.proofNote && (
                  <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{proj.proofNote}</span>
                  </div>
                )}

                {/* Sub-Sectors Breakdown for Project 05 */}
                {proj.subSectors && (
                  <div className="pt-2 space-y-3">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                      SECTOR-SPECIFIC IMPLEMENTATIONS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {proj.subSectors.map((sub) => (
                        <div
                          key={sub.sector}
                          className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-sm hover:border-purple-300 transition-colors"
                        >
                          <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 inline-block mb-1.5">
                            {sub.sector}
                          </span>
                          <p className="text-xs font-medium text-slate-600 leading-relaxed">
                            {sub.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
