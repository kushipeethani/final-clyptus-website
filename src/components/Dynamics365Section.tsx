import React, { useState } from 'react';
import {
  Wallet,
  Truck,
  ShoppingBag,
  Kanban,
  Building2,
  Users,
  CheckCircle2,
  Layers,
  TrendingUp,
} from 'lucide-react';

interface DynamicsModule {
  num: string;
  title: string;
  shortTitle: string;
  icon: React.ComponentType<{ className?: string }>;
  lead: string;
  approach: string;
  whatWeDo: string[];
  alsoIncluded: string;
  whyItHelps: string;
  // Minimal Light Shading Tokens
  lightBg: string;
  activeBg: string;
  borderColor: string;
  activeBorder: string;
  tagColor: string;
  iconColor: string;
  approachBg: string;
  helpCardBg: string;
}

const DYNAMICS_MODULES: DynamicsModule[] = [
  {
    num: '01',
    title: 'Dynamics 365 Finance',
    shortTitle: 'Finance',
    icon: Wallet,
    lead: 'Microsoft Dynamics 365 Finance gives finance teams real-time visibility into performance, with smart automation for daily accounting. We implement and support Finance so that your books stay accurate, your close is faster and your leaders get the insight they need.',
    approach:
      'Every company has its own accounting structure, currencies and reporting rules. Our consultants study your finance processes first, then configure Dynamics 365 to match your policies and local compliance needs.',
    whatWeDo: [
      'General ledger, accounts payable and accounts receivable',
      'Fixed assets, bank management and cash flow',
      'Budgeting, budget control and financial planning',
      'Multi-company, multi-currency and intercompany accounting',
      'Financial reporting and period-end close',
    ],
    alsoIncluded:
      'Automated journal rules, expense management & receipts, statutory tax localization, subledger accounting, and Power BI financial analytics.',
    whyItHelps:
      'Faster financial close, fewer reconciliation errors, unified global cash visibility, and reliable audit-ready reporting.',
    lightBg: 'from-sky-50/60 via-white to-blue-50/40',
    activeBg: 'from-white via-sky-50/30 to-blue-50/20',
    borderColor: 'border-sky-200/80',
    activeBorder: 'border-sky-400',
    tagColor: 'text-sky-700 bg-sky-50/90 border-sky-200',
    iconColor: 'text-sky-600',
    approachBg: 'from-sky-50/70 via-blue-50/30 to-white/70 border-sky-200/80',
    helpCardBg: 'from-sky-50/50 to-blue-50/30 border-sky-200/70',
  },
  {
    num: '02',
    title: 'Dynamics 365 Supply Chain Management (SCM)',
    shortTitle: 'Supply Chain (SCM)',
    icon: Truck,
    lead: 'Microsoft Dynamics 365 Supply Chain Management helps you plan, produce, store and deliver with greater speed and accuracy. We build supply chain solutions that give you clear visibility of stock, orders and production, so you can react quickly when conditions change.',
    approach:
      'Disconnected systems lead to stock-outs, delays and extra cost. Our team connects your purchasing, warehouse, production and delivery processes into one flow that every department can see.',
    whatWeDo: [
      'Demand forecasting and master planning',
      'Inventory management and warehouse management',
      'Production control and shop floor execution',
      'Procurement, sourcing and vendor collaboration',
      'Transportation management and order fulfilment',
    ],
    alsoIncluded:
      'Barcode mobile scanning (WMS), lot and serial tracking, predictive maintenance, quality control, and vendor collaboration portal.',
    whyItHelps:
      'Reduced inventory carrying costs, on-time client delivery, resilient supplier collaboration, and reduced operational downtime.',
    lightBg: 'from-cyan-50/60 via-white to-teal-50/40',
    activeBg: 'from-white via-cyan-50/30 to-teal-50/20',
    borderColor: 'border-cyan-200/80',
    activeBorder: 'border-cyan-400',
    tagColor: 'text-cyan-700 bg-cyan-50/90 border-cyan-200',
    iconColor: 'text-cyan-600',
    approachBg: 'from-cyan-50/70 via-teal-50/30 to-white/70 border-cyan-200/80',
    helpCardBg: 'from-cyan-50/50 to-teal-50/30 border-cyan-200/70',
  },
  {
    num: '03',
    title: 'Dynamics 365 Commerce',
    shortTitle: 'Commerce',
    icon: ShoppingBag,
    lead: 'Microsoft Dynamics 365 Commerce gives customers one smooth shopping experience across your online store, physical shops and call centre. We implement Commerce so that your customers, stock and prices stay consistent on every channel.',
    approach:
      'Shoppers today expect to browse online, buy in store and return anywhere. Our consultants design the processes and technology that make this possible without extra work for your teams.',
    whatWeDo: [
      'E-commerce website setup and management',
      'Point of sale (POS) for stores and mobile devices',
      'Unified pricing, promotions and discounts',
      'Customer profiles, loyalty programmes and gift cards',
      'Order management across online and store channels',
    ],
    alsoIncluded:
      'Real-time store inventory visibility, click-and-collect (BOPIS), payment gateway integration, AI product recommendations, and centralized catalog.',
    whyItHelps:
      'Unified omnichannel customer experience, higher cart conversion rates, streamlined inventory across physical & digital stores.',
    lightBg: 'from-emerald-50/60 via-white to-teal-50/40',
    activeBg: 'from-white via-emerald-50/30 to-teal-50/20',
    borderColor: 'border-emerald-200/80',
    activeBorder: 'border-emerald-400',
    tagColor: 'text-emerald-700 bg-emerald-50/90 border-emerald-200',
    iconColor: 'text-emerald-600',
    approachBg: 'from-emerald-50/70 via-teal-50/30 to-white/70 border-emerald-200/80',
    helpCardBg: 'from-emerald-50/50 to-teal-50/30 border-emerald-200/70',
  },
  {
    num: '04',
    title: 'Dynamics 365 Project Operations',
    shortTitle: 'Project Operations',
    icon: Kanban,
    lead: 'Microsoft Dynamics 365 Project Operations brings sales, project planning, resources, time and expenses, and billing into one system. We set it up so that project managers and finance teams always see the same real-time picture.',
    approach:
      'Many projects lose money through late costs, unclear resources and slow billing. Our consultants design project structures, approvals and reports that close these gaps from the start.',
    whatWeDo: [
      'Project quoting, contracts and pricing',
      'Project planning, task scheduling and work breakdown structures',
      'Resource planning and skill-based assignment',
      'Time and expense entry with approvals',
      'Project billing and revenue recognition',
    ],
    alsoIncluded:
      'Milestone billing, subcontractor cost tracking, MS Teams collaboration, WIP accounting, and project burn-rate dashboards.',
    whyItHelps:
      'Maximized consultant billable utilization, predictable margins, on-time project milestones, and accurate client invoicing.',
    lightBg: 'from-indigo-50/60 via-white to-purple-50/40',
    activeBg: 'from-white via-indigo-50/30 to-purple-50/20',
    borderColor: 'border-indigo-200/80',
    activeBorder: 'border-indigo-400',
    tagColor: 'text-indigo-700 bg-indigo-50/90 border-indigo-200',
    iconColor: 'text-indigo-600',
    approachBg: 'from-indigo-50/70 via-purple-50/30 to-white/70 border-indigo-200/80',
    helpCardBg: 'from-indigo-50/50 to-purple-50/30 border-indigo-200/70',
  },
  {
    num: '05',
    title: 'Dynamics 365 Business Central',
    shortTitle: 'Business Central',
    icon: Building2,
    lead: 'Microsoft Dynamics 365 Business Central is an all-in-one business management solution designed for small and mid-sized companies. It connects finance, sales, purchasing, inventory and operations in one easy-to-use system, and it can be set up quickly without a heavy IT burden.',
    approach:
      'We help you get started fast and grow steadily. We configure Business Central for your needs, migrate your data and add extensions when your business needs more.',
    whatWeDo: [
      'Financial management, accounting and reporting',
      'Sales, purchasing and vendor management',
      'Inventory, warehouse and basic manufacturing',
      'Service management and project costing',
      'Cloud or on-premises deployment options',
    ],
    alsoIncluded:
      'Native Outlook & Excel integration, pre-built chart of accounts, automated bank feeds, migration from QuickBooks/Sage, and role-based mobile access.',
    whyItHelps:
      'Rapid time to go-live, low total cost of ownership (TCO), automated administrative processes, and scalable all-in-one growth platform.',
    lightBg: 'from-amber-50/60 via-white to-orange-50/40',
    activeBg: 'from-white via-amber-50/30 to-orange-50/20',
    borderColor: 'border-amber-200/80',
    activeBorder: 'border-amber-400',
    tagColor: 'text-amber-800 bg-amber-50/90 border-amber-200',
    iconColor: 'text-amber-600',
    approachBg: 'from-amber-50/70 via-orange-50/30 to-white/70 border-amber-200/80',
    helpCardBg: 'from-amber-50/50 to-orange-50/30 border-amber-200/70',
  },
  {
    num: '06',
    title: 'Dynamics 365 Human Resources',
    shortTitle: 'Human Resources',
    icon: Users,
    lead: 'Microsoft Dynamics 365 Human Resources helps HR teams manage people, policies and processes in one place, while giving employees simple self-service tools. We set it up around your HR policies so that daily administration becomes easier and more accurate.',
    approach:
      'People are your most valuable asset, and HR works best when information is accurate and easy to reach. Our consultants design workflows, records and reports that fit the way your organisation hires, rewards and develops its workforce.',
    whatWeDo: [
      'Employee records and organisation structure',
      'Leave, absence and attendance management',
      'Compensation, benefits and job position management',
      'Recruiting, onboarding and employee development',
      'Employee and manager self-service',
    ],
    alsoIncluded:
      'Performance appraisal tracking, payroll provider integrations, LinkedIn Talent connectivity, compliance reporting, and employee self-service mobile app.',
    whyItHelps:
      'Reduced manual HR paperwork, faster employee onboarding, unified compensation records, and higher employee satisfaction.',
    lightBg: 'from-blue-50/60 via-white to-indigo-50/40',
    activeBg: 'from-white via-blue-50/30 to-indigo-50/20',
    borderColor: 'border-blue-200/80',
    activeBorder: 'border-blue-400',
    tagColor: 'text-blue-700 bg-blue-50/90 border-blue-200',
    iconColor: 'text-blue-600',
    approachBg: 'from-blue-50/70 via-indigo-50/30 to-white/70 border-blue-200/80',
    helpCardBg: 'from-blue-50/50 to-indigo-50/30 border-blue-200/70',
  },
];

interface Dynamics365SectionProps {
  onContactClick?: () => void;
}

export const Dynamics365Section: React.FC<Dynamics365SectionProps> = ({
  onContactClick: _onContactClick,
}) => {
  const [activeModule, setActiveModule] = useState<string>('01');

  const currentModule =
    DYNAMICS_MODULES.find((m) => m.num === activeModule) || DYNAMICS_MODULES[0];

  const renderModuleHeading = (
    title: string,
    num: string,
    sizeClass = 'text-2xl sm:text-3xl'
  ) => {
    let blackPart = '';
    let gradientPart = '';

    switch (num) {
      case '01':
        blackPart = 'Dynamics 365';
        gradientPart = 'Finance';
        break;
      case '02':
        blackPart = 'Dynamics 365 Supply Chain';
        gradientPart = 'Management (SCM)';
        break;
      case '03':
        blackPart = 'Dynamics 365';
        gradientPart = 'Commerce';
        break;
      case '04':
        blackPart = 'Dynamics 365 Project';
        gradientPart = 'Operations';
        break;
      case '05':
        blackPart = 'Dynamics 365 Business';
        gradientPart = 'Central';
        break;
      case '06':
        blackPart = 'Dynamics 365';
        gradientPart = 'Human Resources';
        break;
      default:
        blackPart = title;
        gradientPart = '';
    }

    return (
      <h3 className={`${sizeClass} font-black tracking-tight leading-tight`}>
        <span className="text-slate-900">{blackPart}{' '}</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
          {gradientPart}
        </span>
      </h3>
    );
  };

  // Vertical text for collapsed blades in Orange, Blue & Black
  const renderBladeVerticalTitle = (module: DynamicsModule) => {
    let blackPart = '';
    let gradientPart = '';

    switch (module.num) {
      case '01':
        blackPart = 'Dynamics';
        gradientPart = 'Finance';
        break;
      case '02':
        blackPart = 'Supply Chain';
        gradientPart = '(SCM)';
        break;
      case '03':
        blackPart = 'Dynamics';
        gradientPart = 'Commerce';
        break;
      case '04':
        blackPart = 'Project';
        gradientPart = 'Operations';
        break;
      case '05':
        blackPart = 'Business';
        gradientPart = 'Central';
        break;
      case '06':
        blackPart = 'Human';
        gradientPart = 'Resources';
        break;
      default:
        blackPart = module.shortTitle;
        gradientPart = '';
    }

    return (
      <div
        className="text-xs sm:text-[13px] tracking-wide whitespace-nowrap select-none font-black leading-none"
        style={{
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
        }}
      >
        <span className="text-slate-900">{blackPart}{' '}</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
          {gradientPart}
        </span>
      </div>
    );
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-t border-slate-200/80 bg-white">
      {/* ================= 1. SECTION HEADER ================= */}
      <div className="text-center flex flex-col items-center gap-4 mb-14">
        {/* Heading with black, blue, and orange mix */}
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
          <span className="text-slate-900">Microsoft </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
            Dynamics 365
          </span>
        </h2>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-orange-500">
          One connected platform for your whole business
        </p>

        {/* Intro text */}
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed font-normal">
          Microsoft Dynamics 365 brings finance, supply chain, commerce, projects,
          people and business operations together on one connected cloud platform.
          It works naturally with the Microsoft tools your teams already use, such
          as Excel, Outlook, Teams and Power BI. We help businesses of every size
          select, implement, customise and support Dynamics 365, so they can work
          faster, serve customers better and grow with confidence.
        </p>
      </div>

      {/* ================= 2. DESKTOP: VERTICAL-BLADE CURTAIN WITH LIGHTLY SHADED PASTEL TINTS ================= */}
      <div className="hidden lg:flex h-[620px] w-full gap-3 overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-b from-slate-50/70 to-white p-3 select-none">
        {DYNAMICS_MODULES.map((module) => {
          const isActive = module.num === activeModule;
          const IconComp = module.icon;

          return (
            <div
              key={module.num}
              onClick={() => {
                if (!isActive) setActiveModule(module.num);
              }}
              style={{
                flexGrow: isActive ? 6.5 : 0.85,
                flexShrink: 1,
                flexBasis: '0px',
                willChange: 'flex-grow',
              }}
              className={`relative h-full rounded-2xl border-2 overflow-hidden select-none transition-[flex-grow,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.2,1,0.3,1)] ${
                isActive
                  ? `${module.activeBorder} shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] cursor-default`
                  : `${module.borderColor} hover:shadow-md cursor-pointer group`
              }`}
            >
              {/* Background Cross-fade Layers for zero repaint lag */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${module.lightBg} transition-opacity duration-500 pointer-events-none ${
                  isActive ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${module.activeBg} transition-opacity duration-500 pointer-events-none ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* ---------------- 1. COLLAPSED VIEW ---------------- */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-between py-6 transition-opacity duration-200 ease-out z-10 ${
                  isActive
                    ? 'opacity-0 pointer-events-none'
                    : 'opacity-100 pointer-events-auto delay-150'
                }`}
              >
                {/* Top: Module index number with soft light pill */}
                <div
                  className={`w-8 h-8 rounded-full bg-white/95 border ${module.borderColor} text-xs font-bold flex items-center justify-center text-slate-800 shadow-2xs group-hover:scale-110 transition-transform`}
                >
                  {module.num}
                </div>

                {/* Middle: Vertical Rotated Title Text with Orange, Blue, and Black Mix */}
                <div className="flex-1 flex items-center justify-center py-6">
                  {renderBladeVerticalTitle(module)}
                </div>

                {/* Bottom spacer to keep vertical title centered */}
                <div className="w-8 h-8" />
              </div>

              {/* ---------------- 2. ACTIVE EXPANDED VIEW ---------------- */}
              <div
                className={`absolute inset-0 overflow-y-auto transition-opacity duration-300 ease-out z-10 ${
                  isActive
                    ? 'opacity-100 pointer-events-auto delay-150'
                    : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Fixed internal width prevents text reflow during flex animation */}
                <div className="w-[630px] xl:w-[700px] h-full p-7 flex flex-col justify-between">
                  {/* Top Row: Module Header & Approach */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4 border-b border-slate-100/90 pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl bg-white border ${module.borderColor} ${module.iconColor} shadow-2xs`}>
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          {renderModuleHeading(module.title, module.num, 'text-2xl')}
                        </div>
                      </div>
                    </div>

                    {/* Intro Lead */}
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {module.lead}
                    </p>

                    {/* Our Approach Callout Badge with Light Shading & Brand Mix */}
                    <div className={`bg-gradient-to-r ${module.approachBg} border ${module.borderColor} p-3.5 rounded-xl text-slate-700 text-xs sm:text-sm leading-relaxed shadow-2xs`}>
                      <span className="font-extrabold text-slate-900 block mb-0.5">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">Approach:</span>
                      </span>
                      {module.approach}
                    </div>
                  </div>

                  {/* Content Body: 2-Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-4 border-t border-slate-100 my-auto">
                    {/* Left Side: What we do */}
                    <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-orange-500" />
                        <span className="text-slate-900">What we </span>
                        <span className="text-orange-600">do</span>
                      </h4>
                      <ul className="space-y-2">
                        {module.whatWeDo.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700 leading-snug"
                          >
                            <span className="text-orange-500 font-bold shrink-0 mt-0.5">
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Side: Also Included & Why it helps */}
                    <div className="space-y-3">
                      {/* Also Included Card */}
                      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-blue-600" />
                          <span className="text-slate-900">Also </span>
                          <span className="text-blue-600">included</span>
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {module.alsoIncluded}
                        </p>
                      </div>

                      {/* Why it helps Card with Light Shaded Ambient Tint */}
                      <div className={`bg-gradient-to-br ${module.helpCardBg} border rounded-xl p-3.5 shadow-2xs`}>
                        <h4 className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-orange-600" />
                          <span className="text-slate-900">Why it </span>
                          <span className="text-orange-600">helps</span>
                        </h4>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {module.whyItHelps}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= 3. MOBILE & TABLET FALLBACK VIEW ================= */}
      <div className="lg:hidden space-y-6">
        {/* Module Switcher Buttons with Light Shading */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {DYNAMICS_MODULES.map((module) => {
            const isSelected = module.num === activeModule;
            const IconComp = module.icon;

            return (
              <button
                key={module.num}
                onClick={() => setActiveModule(module.num)}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? `bg-gradient-to-r ${module.lightBg} border-sky-400 text-slate-900 shadow-xs ring-1 ring-sky-300`
                    : `bg-white text-slate-700 border-slate-200 hover:border-sky-300`
                }`}
              >
                <IconComp
                  className={`w-4 h-4 shrink-0 ${
                    isSelected ? 'text-orange-500' : 'text-slate-400'
                  }`}
                />
                <span className="truncate">
                  {module.shortTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Module Card for Mobile with Light Shading */}
        <div className={`bg-gradient-to-br ${currentModule.activeBg} border-2 ${currentModule.activeBorder} rounded-2xl p-6 shadow-sm space-y-5`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-white border ${currentModule.borderColor} ${currentModule.iconColor} shadow-2xs`}>
              {React.createElement(currentModule.icon, { className: 'w-6 h-6' })}
            </div>
            <div>
              {renderModuleHeading(currentModule.title, currentModule.num, 'text-xl')}
            </div>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {currentModule.lead}
          </p>

          <div className={`bg-gradient-to-r ${currentModule.approachBg} border ${currentModule.borderColor} p-3 rounded-xl text-slate-700 text-xs leading-relaxed shadow-2xs`}>
            <span className="font-extrabold text-slate-900 block mb-0.5">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">Approach:</span>
            </span>
            {currentModule.approach}
          </div>

          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="bg-white/90 border border-slate-200/80 rounded-xl p-3.5 shadow-2xs">
              <h4 className="text-xs font-extrabold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-orange-500" />
                <span className="text-slate-900">What we </span>
                <span className="text-orange-600">do</span>
              </h4>
              <ul className="space-y-1.5">
                {currentModule.whatWeDo.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-700 leading-snug"
                  >
                    <span className="text-orange-500 font-bold shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/90 border border-slate-200/80 rounded-xl p-3 shadow-2xs">
              <h4 className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-slate-900">Also </span>
                <span className="text-blue-600">included</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentModule.alsoIncluded}
              </p>
            </div>

            <div className={`bg-gradient-to-br ${currentModule.helpCardBg} border rounded-xl p-3 shadow-2xs`}>
              <h4 className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-orange-600" />
                <span className="text-slate-900">Why it </span>
                <span className="text-orange-600">helps</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {currentModule.whyItHelps}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
