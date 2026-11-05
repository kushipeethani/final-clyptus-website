import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Mail,
  MapPin,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Target,
} from 'lucide-react';

export interface CapabilityDetailViewProps {
  capabilityNum: string | null; // '01', '02', ..., '07'
  onClose: () => void;
  onContactClick?: () => void;
}

export const CapabilityDetailView: React.FC<CapabilityDetailViewProps> = ({
  capabilityNum,
  onClose,
  onContactClick,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (!capabilityNum) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [capabilityNum, onClose]);

  const renderSharedCTA = () => (
    <div className="mt-16 pt-10 border-t-2 border-slate-900">
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Ready to Accelerate Your Oracle Transformation?
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Schedule an architecture discovery session with our certified Oracle Cloud ERP consultants.
          </p>
        </div>
        <button
          onClick={() => {
            onClose();
            if (onContactClick) onContactClick();
          }}
          className="shrink-0 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <span>Speak with Oracle Practice Lead</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Shared Address Footer */}
      <div className="text-xs text-slate-600 grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
        <div className="space-y-1">
          <span className="font-extrabold text-slate-900 text-sm block">Corporate Head Office</span>
          <p className="flex items-start gap-2 leading-relaxed text-slate-700">
            <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <span>12A01A, 13th Floor, Manjeera Trinity Corporate, JNTU-Hitech City Road, Kukatpally, Hyderabad, Telangana 500072</span>
          </p>
        </div>
        <div className="space-y-1">
          <span className="font-extrabold text-slate-900 text-sm block">Direct Contact</span>
          <p className="flex items-center gap-2 font-semibold text-slate-800">
            <Mail className="w-4 h-4 text-blue-600 shrink-0" />
            <span>contact@clyptus.com</span>
          </p>
        </div>
      </div>
    </div>
  );

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {capabilityNum && (
        <motion.div
          key="capability-detail-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] bg-white w-screen h-screen flex flex-col font-sans text-slate-900 overflow-hidden"
        >
          {/* Back Button Frozen at Top-Left */}
          <div className="fixed top-5 left-5 sm:top-6 sm:left-8 z-50">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-blue-600 text-white font-extrabold text-xs shadow-lg backdrop-blur-md transition-all border border-slate-700 cursor-pointer group hover:scale-105 active:scale-95"
              aria-label="Back to capabilities"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-blue-400 group-hover:text-white" />
              <span>Back</span>
            </button>
          </div>

          {/* Scrollable Document Area */}
          <div className="flex-1 w-full h-full overflow-y-auto overscroll-contain">
            <main className="w-full max-w-4xl mx-auto px-4 sm:px-8 pt-20 sm:pt-24 pb-28">
              <div className="space-y-12">
            
                {/* ================= 01. FINANCIAL MANAGEMENT ================= */}
                {capabilityNum === '01' && (
                  <div className="space-y-8">
                    <div className="border-b-2 border-slate-900 pb-6">
                      <span className="px-3 py-1 rounded bg-blue-50 text-blue-700 font-mono text-xs font-black inline-block mb-3">
                        ORACLE PRACTICE &bull; 01
                      </span>
                      <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                        Financial Management
                      </h1>
                      <div className="space-y-3 text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-3xl">
                        <p>
                          Oracle Financial Management gives finance teams a single, accurate view of the company's money. We implement and support Oracle financial solutions that automate daily accounting, speed up the period-end close and give leaders reliable numbers for better decisions.
                        </p>
                        <p className="text-slate-600 text-sm sm:text-base">
                          Every business has its own accounting structure, currencies and reporting rules. Our consultants study how your finance team works and configure Oracle so that it follows your policies, meets local and international standards and reduces manual effort.
                        </p>
                      </div>
                    </div>

                    {/* Primary Scope Checklist */}
                    <div className="space-y-4">
                      <h3 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                        <span>Core Deliverables & Scope</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'General ledger, accounts payable and accounts receivable',
                          'Fixed assets, cash management and bank reconciliation',
                          'Multi-currency, multi-entity and intercompany accounting',
                          'Tax configuration and statutory reporting',
                          'Period-end close and financial reporting',
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                              ✓
                            </span>
                            <span className="text-sm font-semibold text-slate-800 leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Also Included Section */}
                    <div className="space-y-4 pt-2">
                      <h3 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-600" />
                        <span>Also Included</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'Chart of accounts and ledger design',
                          'Subledger accounting and automated journal rules',
                          'Expense management and employee reimbursements',
                          'Collections, credit management and customer billing',
                          'Integration with procurement, projects and planning',
                          'Audit support, user training and month-end assistance',
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                            <span className="text-orange-600 font-bold text-sm shrink-0 mt-0.5">•</span>
                            <span className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Business Benefits & Ideal For */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
                        <span className="text-xs font-mono font-bold text-blue-900 uppercase tracking-wider block">
                          Business Benefits
                        </span>
                        <p className="text-sm font-semibold text-blue-950 leading-relaxed">
                          faster financial close, fewer errors, better cash visibility and stronger compliance.
                        </p>
                      </div>
                      <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-200/80 space-y-2">
                        <span className="text-xs font-mono font-bold text-orange-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-orange-600" />
                          <span>Ideal For</span>
                        </span>
                        <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                          finance teams in growing and large companies that want to replace manual spreadsheets and disconnected tools with one reliable system.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= 02. PROCUREMENT ================= */}
                {capabilityNum === '02' && (
                  <div className="space-y-8">
                    <div className="border-b-2 border-slate-900 pb-6">
                      <span className="px-3 py-1 rounded bg-orange-50 text-orange-700 font-mono text-xs font-black inline-block mb-3">
                        ORACLE PRACTICE &bull; 02
                      </span>
                      <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                        Procurement
                      </h1>
                      <div className="space-y-3 text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-3xl">
                        <p>
                          Oracle Procurement helps organisations buy the right goods and services at the right price, with full control and transparency. We set up smooth purchasing processes, from the first request to the final payment, so your teams spend less time on paperwork and more time on value.
                        </p>
                        <p className="text-slate-600 text-sm sm:text-base">
                          Good procurement is about both savings and trust. We design approval flows, supplier processes and purchasing policies that your employees find easy to follow and your auditors find easy to check.
                        </p>
                      </div>
                    </div>

                    {/* Primary Scope Checklist */}
                    <div className="space-y-4">
                      <h3 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                        <span>Core Deliverables & Scope</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'Self-service requisitions and purchase orders',
                          'Supplier registration, onboarding and qualification',
                          'Sourcing, negotiations and supplier contracts',
                          'Approval workflows and spend controls',
                          'Receiving, invoice matching and payment',
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                              ✓
                            </span>
                            <span className="text-sm font-semibold text-slate-800 leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Also Included Section */}
                    <div className="space-y-4 pt-2">
                      <h3 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-600" />
                        <span>Also Included</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'Supplier portal for orders, invoices and payment status',
                          'Procurement contracts and blanket agreements',
                          'Catalogs and punchout integration',
                          'Spend analysis and supplier performance reports',
                          'Integration with financials, inventory and projects',
                          'User training and ongoing support',
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                            <span className="text-orange-600 font-bold text-sm shrink-0 mt-0.5">•</span>
                            <span className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Business Benefits & Ideal For */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-200/80 space-y-2">
                        <span className="text-xs font-mono font-bold text-orange-900 uppercase tracking-wider block">
                          Business Benefits
                        </span>
                        <p className="text-sm font-semibold text-orange-950 leading-relaxed">
                          lower purchasing costs, stronger supplier relationships, better policy compliance and faster order cycles.
                        </p>
                      </div>
                      <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
                        <span className="text-xs font-mono font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-blue-600" />
                          <span>Ideal For</span>
                        </span>
                        <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                          manufacturers, service companies and public-sector organisations that want better control over spending.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= 03. SUPPLY CHAIN MANAGEMENT ================= */}
                {capabilityNum === '03' && (
                  <div className="space-y-8">
                    <div className="border-b-2 border-slate-900 pb-6">
                      <span className="px-3 py-1 rounded bg-sky-50 text-sky-700 font-mono text-xs font-black inline-block mb-3">
                        ORACLE PRACTICE &bull; 03
                      </span>
                      <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                        Supply Chain Management
                      </h1>
                      <div className="space-y-3 text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-3xl">
                        <p>
                          Oracle Supply Chain Management connects planning, inventory, orders and logistics in one platform, so you can respond quickly to changes in demand and supply. We help you build a supply chain that is efficient, visible and ready for growth.
                        </p>
                        <p className="text-slate-600 text-sm sm:text-base">
                          When systems are disconnected, stock runs short, deliveries are late and costs rise. Our consultants link your planning, warehouse, order and shipping processes so that every team works from the same information.
                        </p>
                      </div>
                    </div>

                    {/* Primary Scope Checklist */}
                    <div className="space-y-4">
                      <h3 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                        <span>Core Deliverables & Scope</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'Demand planning and supply planning',
                          'Inventory management and warehouse operations',
                          'Order management and order promising',
                          'Shipping, logistics and transportation',
                          'Product data management and item master',
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                              ✓
                            </span>
                            <span className="text-sm font-semibold text-slate-800 leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Also Included Section */}
                    <div className="space-y-4 pt-2">
                      <h3 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-600" />
                        <span>Also Included</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'Sales and operations planning',
                          'Procurement and manufacturing integration',
                          'Order fulfilment, returns and pricing',
                          'Lot, serial and expiry tracking',
                          'Supply chain reports and performance dashboards',
                          'Data migration, testing and post-go-live support',
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                            <span className="text-sky-600 font-bold text-sm shrink-0 mt-0.5">•</span>
                            <span className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Business Benefits & Ideal For */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-2">
                        <span className="text-xs font-mono font-bold text-sky-900 uppercase tracking-wider block">
                          Business Benefits
                        </span>
                        <p className="text-sm font-semibold text-sky-950 leading-relaxed">
                          lower inventory costs, on-time delivery, better demand forecasting and improved customer satisfaction.
                        </p>
                      </div>
                      <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
                        <span className="text-xs font-mono font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-blue-600" />
                          <span>Ideal For</span>
                        </span>
                        <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                          manufacturers, distributors, retailers and any company that manages physical goods across locations.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= 04. MANUFACTURING AND RISK MANAGEMENT ================= */}
                {capabilityNum === '04' && (
                  <div className="space-y-8">
                    <div className="border-b-2 border-slate-900 pb-6">
                      <span className="px-3 py-1 rounded bg-purple-50 text-purple-700 font-mono text-xs font-black inline-block mb-3">
                        ORACLE PRACTICE &bull; 04
                      </span>
                      <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                        Manufacturing and Risk Management
                      </h1>
                      <div className="space-y-3 text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-3xl">
                        <p>
                          Oracle Manufacturing helps production companies plan, run and track their shop floor with accuracy, while Oracle Risk Management helps them protect the business by controlling access, compliance and financial risk. Together they support production that is efficient, safe and well governed.
                        </p>
                        <p className="text-slate-600 text-sm sm:text-base">
                          We configure both areas around your real business processes: how you make your products, who can access which data and which controls your auditors expect.
                        </p>
                      </div>
                    </div>

                    {/* Primary Scope Checklist */}
                    <div className="space-y-4">
                      <h3 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                        <span>Core Deliverables & Scope</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'Work definitions, bills of material and routings',
                          'Work orders, production scheduling and shop floor execution',
                          'Cost accounting and production variance tracking',
                          'Quality management and product traceability',
                          'Risk management, access control and compliance monitoring',
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                              ✓
                            </span>
                            <span className="text-sm font-semibold text-slate-800 leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Also Included Section */}
                    <div className="space-y-4 pt-2">
                      <h3 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-600" />
                        <span>Also Included</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'Material requirements planning and capacity checks',
                          'Maintenance and asset management',
                          'Segregation-of-duties analysis and role design',
                          'Transaction monitoring and audit controls',
                          'Financial and security compliance reporting',
                          'Training, documentation and ongoing support',
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                            <span className="text-purple-600 font-bold text-sm shrink-0 mt-0.5">•</span>
                            <span className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Business Benefits & Ideal For */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2">
                        <span className="text-xs font-mono font-bold text-purple-900 uppercase tracking-wider block">
                          Business Benefits
                        </span>
                        <p className="text-sm font-semibold text-purple-950 leading-relaxed">
                          smoother production, lower waste, stronger internal controls and confidence during audits.
                        </p>
                      </div>
                      <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
                        <span className="text-xs font-mono font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-blue-600" />
                          <span>Ideal For</span>
                        </span>
                        <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                          manufacturing and process industries that need both efficient operations and strong governance.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= 05. ENTERPRISE PERFORMANCE MANAGEMENT (EPM) ================= */}
                {capabilityNum === '05' && (
                  <div className="space-y-8">
                    <div className="border-b-2 border-slate-900 pb-6">
                      <span className="px-3 py-1 rounded bg-amber-50 text-amber-700 font-mono text-xs font-black inline-block mb-3">
                        ORACLE PRACTICE &bull; 05
                      </span>
                      <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                        Enterprise Performance Management (EPM)
                      </h1>
                      <div className="space-y-3 text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-3xl">
                        <p>
                          Oracle EPM helps finance and business leaders plan, forecast, consolidate and report with confidence. We replace slow, spreadsheet-driven processes with connected cloud solutions that give management a clear view of performance, today and tomorrow.
                        </p>
                        <p className="text-slate-600 text-sm sm:text-base">
                          Planning and reporting are only useful when the numbers are trusted and arrive on time. Our team designs models, workflows and reports around the way your business is managed.
                        </p>
                      </div>
                    </div>

                    {/* Primary Scope Checklist */}
                    <div className="space-y-4">
                      <h3 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                        <span>Core Deliverables & Scope</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'Budgeting, planning and forecasting',
                          'Financial close and consolidation',
                          'Account reconciliation and transaction matching',
                          'Management and statutory reporting',
                          'What-if analysis and scenario planning',
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                              ✓
                            </span>
                            <span className="text-sm font-semibold text-slate-800 leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Also Included Section */}
                    <div className="space-y-4 pt-2">
                      <h3 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-600" />
                        <span>Also Included</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'Workforce, capital and project planning',
                          'Narrative reporting and board-ready packs',
                          'Profitability and cost management',
                          'Intercompany eliminations and currency translation',
                          'Integration with Oracle and non-Oracle source systems',
                          'Dashboards, training and ongoing support',
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                            <span className="text-amber-600 font-bold text-sm shrink-0 mt-0.5">•</span>
                            <span className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Business Benefits & Ideal For */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                        <span className="text-xs font-mono font-bold text-amber-900 uppercase tracking-wider block">
                          Business Benefits
                        </span>
                        <p className="text-sm font-semibold text-amber-950 leading-relaxed">
                          a faster close, more accurate forecasts, less spreadsheet work and better decisions.
                        </p>
                      </div>
                      <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
                        <span className="text-xs font-mono font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-blue-600" />
                          <span>Ideal For</span>
                        </span>
                        <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                          CFO offices and finance teams in companies with multiple departments, entities or currencies.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= 06. PROJECT MANAGEMENT ================= */}
                {capabilityNum === '06' && (
                  <div className="space-y-8">
                    <div className="border-b-2 border-slate-900 pb-6">
                      <span className="px-3 py-1 rounded bg-emerald-50 text-emerald-700 font-mono text-xs font-black inline-block mb-3">
                        ORACLE PRACTICE &bull; 06
                      </span>
                      <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                        Project Management
                      </h1>
                      <div className="space-y-3 text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-3xl">
                        <p>
                          Oracle Project Management helps you deliver projects on time and within budget by bringing planning, costs, resources and billing into one system. We set up solutions that give project managers and finance teams the same real-time picture.
                        </p>
                        <p className="text-slate-600 text-sm sm:text-base">
                          Many project problems come from poor visibility: late costs, unclear resources and billing delays. We design project structures, approvals and reports that remove these gaps from day one.
                        </p>
                      </div>
                    </div>

                    {/* Primary Scope Checklist */}
                    <div className="space-y-4">
                      <h3 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                        <span>Core Deliverables & Scope</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'Project planning, scheduling and task tracking',
                          'Budgeting, forecasting and cost control',
                          'Resource management and timesheets',
                          'Project billing and revenue recognition',
                          'Project reporting and performance dashboards',
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                              ✓
                            </span>
                            <span className="text-sm font-semibold text-slate-800 leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Also Included Section */}
                    <div className="space-y-4 pt-2">
                      <h3 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-600" />
                        <span>Also Included</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'Project templates and work breakdown structures',
                          'Contract management and milestone billing',
                          'Capital projects and asset capitalisation',
                          'Expense and procurement integration',
                          'Project profitability analysis',
                          'Training, documentation and ongoing support',
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                            <span className="text-emerald-600 font-bold text-sm shrink-0 mt-0.5">•</span>
                            <span className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Business Benefits & Ideal For */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                        <span className="text-xs font-mono font-bold text-emerald-900 uppercase tracking-wider block">
                          Business Benefits
                        </span>
                        <p className="text-sm font-semibold text-emerald-950 leading-relaxed">
                          better project margins, accurate billing, improved resource use and fewer surprises.
                        </p>
                      </div>
                      <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
                        <span className="text-xs font-mono font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-blue-600" />
                          <span>Ideal For</span>
                        </span>
                        <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                          engineering, construction, IT services, consulting and any business that earns revenue through projects.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= 07. FUSION CLOUD ERP ================= */}
                {capabilityNum === '07' && (
                  <div className="space-y-8">
                    <div className="border-b-2 border-slate-900 pb-6">
                      <span className="px-3 py-1 rounded bg-red-50 text-red-700 font-mono text-xs font-black inline-block mb-3">
                        ORACLE PRACTICE &bull; 07
                      </span>
                      <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                        Fusion Cloud ERP
                      </h1>
                      <div className="space-y-3 text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-3xl">
                        <p>
                          Oracle Fusion Cloud ERP is a complete cloud-based business suite that brings finance, procurement, projects, risk management and planning together on one platform. It is updated regularly by Oracle, so your business always has access to the latest features without heavy upgrade projects.
                        </p>
                        <p className="text-slate-600 text-sm sm:text-base">
                          We guide you through the whole journey: choosing the right modules, designing processes, migrating data, testing and going live. After go-live, we stay with you to support quarterly updates and new requirements.
                        </p>
                      </div>
                    </div>

                    {/* Primary Scope Checklist */}
                    <div className="space-y-4">
                      <h3 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                        <span>Core Deliverables & Scope</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'New implementation and phased rollout of Fusion Cloud ERP',
                          'Migration from Oracle E-Business Suite, JD Edwards or other legacy systems',
                          'Fit-gap analysis and business process design',
                          'Data migration, integration and reporting',
                          'Testing, training and go-live support',
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                              ✓
                            </span>
                            <span className="text-sm font-semibold text-slate-800 leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Also Included Section */}
                    <div className="space-y-4 pt-2">
                      <h3 className="text-base font-black text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-600" />
                        <span>Also Included</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'Configuration of financials, procurement, projects and EPM',
                          'Integration with banks, payroll and third-party applications',
                          'Security roles, approvals and workflow setup',
                          'Quarterly release testing and regression support',
                          'Reports and analytics for management',
                          'Managed support after go-live',
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                            <span className="text-red-600 font-bold text-sm shrink-0 mt-0.5">•</span>
                            <span className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Business Benefits & Ideal For */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200/80 space-y-2">
                        <span className="text-xs font-mono font-bold text-red-900 uppercase tracking-wider block">
                          Business Benefits
                        </span>
                        <p className="text-sm font-semibold text-red-950 leading-relaxed">
                          lower infrastructure cost, regular innovation, strong security and one connected view of the business.
                        </p>
                      </div>
                      <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
                        <span className="text-xs font-mono font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-blue-600" />
                          <span>Ideal For</span>
                        </span>
                        <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                          companies moving from older on-premise systems, and growing businesses that want a modern ERP in the cloud.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Shared Global Call to Action (CTA Block) */}
                {renderSharedCTA()}
              </div>
            </main>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
