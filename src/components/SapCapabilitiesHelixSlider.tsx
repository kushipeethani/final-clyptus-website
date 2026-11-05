import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  Landmark,
  ShoppingBag,
  Truck,
  ShieldAlert,
  BarChart3,
  Briefcase,
  Cloud,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
} from 'lucide-react';

export interface SapCapability {
  num: string;
  id: string;
  title: string;
  shortTitle: string;
  desc: string;
  badge: string;
  icon: React.ElementType;
  accentHex: string;
  intro1: string;
  intro2: string;
  coreScope: string[];
  alsoIncluded: string[];
  benefits: string;
  idealFor: string;
}

export const CAPABILITIES_DATA: SapCapability[] = [
  {
    num: '01',
    id: 'financial-management',
    title: 'Financial Management',
    shortTitle: 'Financials',
    desc: "Oracle Financial Management gives finance teams a single, accurate view of the company's money. We implement and support Oracle financial solutions that automate daily accounting, speed up the period-end close and give leaders reliable numbers for better decisions.",
    badge: 'ORACLE FINANCIALS',
    icon: Landmark,
    accentHex: '#2563EB',
    intro1:
      "Oracle Financial Management gives finance teams a single, accurate view of the company's money. We implement and support Oracle financial solutions that automate daily accounting, speed up the period-end close and give leaders reliable numbers for better decisions.",
    intro2:
      'Every business has its own accounting structure, currencies and reporting rules. Our consultants study how your finance team works and configure Oracle so that it follows your policies, meets local and international standards and reduces manual effort.',
    coreScope: [
      'General ledger, accounts payable and accounts receivable',
      'Fixed assets, cash management and bank reconciliation',
      'Multi-currency, multi-entity and intercompany accounting',
      'Tax configuration and statutory reporting',
      'Period-end close and financial reporting',
    ],
    alsoIncluded: [
      'Chart of accounts and ledger design',
      'Subledger accounting and automated journal rules',
      'Expense management and employee reimbursements',
      'Collections, credit management and customer billing',
      'Integration with procurement, projects and planning',
      'Audit support, user training and month-end assistance',
    ],
    benefits:
      'faster financial close, fewer errors, better cash visibility and stronger compliance.',
    idealFor:
      'finance teams in growing and large companies that want to replace manual spreadsheets and disconnected tools with one reliable system.',
  },
  {
    num: '02',
    id: 'procurement',
    title: 'Procurement',
    shortTitle: 'Procurement',
    desc: 'Oracle Procurement helps organisations buy the right goods and services at the right price, with full control and transparency. We set up smooth purchasing processes, from the first request to the final payment, so your teams spend less time on paperwork and more time on value.',
    badge: 'STRATEGIC SOURCING',
    icon: ShoppingBag,
    accentHex: '#EA580C',
    intro1:
      'Oracle Procurement helps organisations buy the right goods and services at the right price, with full control and transparency. We set up smooth purchasing processes, from the first request to the final payment, so your teams spend less time on paperwork and more time on value.',
    intro2:
      'Good procurement is about both savings and trust. We design approval flows, supplier processes and purchasing policies that your employees find easy to follow and your auditors find easy to check.',
    coreScope: [
      'Self-service requisitions and purchase orders',
      'Supplier registration, onboarding and qualification',
      'Sourcing, negotiations and supplier contracts',
      'Approval workflows and spend controls',
      'Receiving, invoice matching and payment',
    ],
    alsoIncluded: [
      'Supplier portal for orders, invoices and payment status',
      'Procurement contracts and blanket agreements',
      'Catalogs and punchout integration',
      'Spend analysis and supplier performance reports',
      'Integration with financials, inventory and projects',
      'User training and ongoing support',
    ],
    benefits:
      'lower purchasing costs, stronger supplier relationships, better policy compliance and faster order cycles.',
    idealFor:
      'manufacturers, service companies and public-sector organisations that want better control over spending.',
  },
  {
    num: '03',
    id: 'supply-chain-management',
    title: 'Supply Chain Management',
    shortTitle: 'Supply Chain',
    desc: 'Oracle Supply Chain Management connects planning, inventory, orders and logistics in one platform, so you can respond quickly to changes in demand and supply. We help you build a supply chain that is efficient, visible and ready for growth.',
    badge: 'ORACLE SCM',
    icon: Truck,
    accentHex: '#0284C7',
    intro1:
      'Oracle Supply Chain Management connects planning, inventory, orders and logistics in one platform, so you can respond quickly to changes in demand and supply. We help you build a supply chain that is efficient, visible and ready for growth.',
    intro2:
      'When systems are disconnected, stock runs short, deliveries are late and costs rise. Our consultants link your planning, warehouse, order and shipping processes so that every team works from the same information.',
    coreScope: [
      'Demand planning and supply planning',
      'Inventory management and warehouse operations',
      'Order management and order promising',
      'Shipping, logistics and transportation',
      'Product data management and item master',
    ],
    alsoIncluded: [
      'Sales and operations planning',
      'Procurement and manufacturing integration',
      'Order fulfilment, returns and pricing',
      'Lot, serial and expiry tracking',
      'Supply chain reports and performance dashboards',
      'Data migration, testing and post-go-live support',
    ],
    benefits:
      'lower inventory costs, on-time delivery, better demand forecasting and improved customer satisfaction.',
    idealFor:
      'manufacturers, distributors, retailers and any company that manages physical goods across locations.',
  },
  {
    num: '04',
    id: 'manufacturing-risk-management',
    title: 'Manufacturing and Risk Management',
    shortTitle: 'Mfg & Risk',
    desc: 'Oracle Manufacturing helps production companies plan, run and track their shop floor with accuracy, while Oracle Risk Management helps them protect the business by controlling access, compliance and financial risk. Together they support production that is efficient, safe and well governed.',
    badge: 'PRODUCTION & RISK',
    icon: ShieldAlert,
    accentHex: '#7C3AED',
    intro1:
      'Oracle Manufacturing helps production companies plan, run and track their shop floor with accuracy, while Oracle Risk Management helps them protect the business by controlling access, compliance and financial risk. Together they support production that is efficient, safe and well governed.',
    intro2:
      'We configure both areas around your real business processes: how you make your products, who can access which data and which controls your auditors expect.',
    coreScope: [
      'Work definitions, bills of material and routings',
      'Work orders, production scheduling and shop floor execution',
      'Cost accounting and production variance tracking',
      'Quality management and product traceability',
      'Risk management, access control and compliance monitoring',
    ],
    alsoIncluded: [
      'Material requirements planning and capacity checks',
      'Maintenance and asset management',
      'Segregation-of-duties analysis and role design',
      'Transaction monitoring and audit controls',
      'Financial and security compliance reporting',
      'Training, documentation and ongoing support',
    ],
    benefits:
      'smoother production, lower waste, stronger internal controls and confidence during audits.',
    idealFor:
      'manufacturing and process industries that need both efficient operations and strong governance.',
  },
  {
    num: '05',
    id: 'epm',
    title: 'Enterprise Performance Management (EPM)',
    shortTitle: 'EPM',
    desc: 'Oracle EPM helps finance and business leaders plan, forecast, consolidate and report with confidence. We replace slow, spreadsheet-driven processes with connected cloud solutions that give management a clear view of performance, today and tomorrow.',
    badge: 'ORACLE EPM',
    icon: BarChart3,
    accentHex: '#F59E0B',
    intro1:
      'Oracle EPM helps finance and business leaders plan, forecast, consolidate and report with confidence. We replace slow, spreadsheet-driven processes with connected cloud solutions that give management a clear view of performance, today and tomorrow.',
    intro2:
      'Planning and reporting are only useful when the numbers are trusted and arrive on time. Our team designs models, workflows and reports around the way your business is managed.',
    coreScope: [
      'Budgeting, planning and forecasting',
      'Financial close and consolidation',
      'Account reconciliation and transaction matching',
      'Management and statutory reporting',
      'What-if analysis and scenario planning',
    ],
    alsoIncluded: [
      'Workforce, capital and project planning',
      'Narrative reporting and board-ready packs',
      'Profitability and cost management',
      'Intercompany eliminations and currency translation',
      'Integration with Oracle and non-Oracle source systems',
      'Dashboards, training and ongoing support',
    ],
    benefits:
      'a faster close, more accurate forecasts, less spreadsheet work and better decisions.',
    idealFor:
      'CFO offices and finance teams in companies with multiple departments, entities or currencies.',
  },
  {
    num: '06',
    id: 'project-management',
    title: 'Project Management',
    shortTitle: 'Projects',
    desc: 'Oracle Project Management helps you deliver projects on time and within budget by bringing planning, costs, resources and billing into one system. We set up solutions that give project managers and finance teams the same real-time picture.',
    badge: 'PROJECT FINANCIALS',
    icon: Briefcase,
    accentHex: '#10B981',
    intro1:
      'Oracle Project Management helps you deliver projects on time and within budget by bringing planning, costs, resources and billing into one system. We set up solutions that give project managers and finance teams the same real-time picture.',
    intro2:
      'Many project problems come from poor visibility: late costs, unclear resources and billing delays. We design project structures, approvals and reports that remove these gaps from day one.',
    coreScope: [
      'Project planning, scheduling and task tracking',
      'Budgeting, forecasting and cost control',
      'Resource management and timesheets',
      'Project billing and revenue recognition',
      'Project reporting and performance dashboards',
    ],
    alsoIncluded: [
      'Project templates and work breakdown structures',
      'Contract management and milestone billing',
      'Capital projects and asset capitalisation',
      'Expense and procurement integration',
      'Project profitability analysis',
      'Training, documentation and ongoing support',
    ],
    benefits:
      'better project margins, accurate billing, improved resource use and fewer surprises.',
    idealFor:
      'engineering, construction, IT services, consulting and any business that earns revenue through projects.',
  },
  {
    num: '07',
    id: 'fusion-cloud-erp',
    title: 'Fusion Cloud ERP',
    shortTitle: 'Fusion Cloud',
    desc: 'Oracle Fusion Cloud ERP is a complete cloud-based business suite that brings finance, procurement, projects, risk management and planning together on one platform. It is updated regularly by Oracle, so your business always has access to the latest features without heavy upgrade projects.',
    badge: 'FUSION CLOUD ERP',
    icon: Cloud,
    accentHex: '#DC2626',
    intro1:
      'Oracle Fusion Cloud ERP is a complete cloud-based business suite that brings finance, procurement, projects, risk management and planning together on one platform. It is updated regularly by Oracle, so your business always has access to the latest features without heavy upgrade projects.',
    intro2:
      'We guide you through the whole journey: choosing the right modules, designing processes, migrating data, testing and going live. After go-live, we stay with you to support quarterly updates and new requirements.',
    coreScope: [
      'New implementation and phased rollout of Fusion Cloud ERP',
      'Migration from Oracle E-Business Suite, JD Edwards or other legacy systems',
      'Fit-gap analysis and business process design',
      'Data migration, integration and reporting',
      'Testing, training and go-live support',
    ],
    alsoIncluded: [
      'Configuration of financials, procurement, projects and EPM',
      'Integration with banks, payroll and third-party applications',
      'Security roles, approvals and workflow setup',
      'Quarterly release testing and regression support',
      'Reports and analytics for management',
      'Managed support after go-live',
    ],
    benefits:
      'lower infrastructure cost, regular innovation, strong security and one connected view of the business.',
    idealFor:
      'companies moving from older on-premise systems, and growing businesses that want a modern ERP in the cloud.',
  },
];

interface SapCapabilitiesHelixSliderProps {
  onContactClick?: () => void;
}

export const SapCapabilitiesHelixSlider: React.FC<SapCapabilitiesHelixSliderProps> = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeDomain, setActiveDomain] = useState<string>('01');
  const totalCards = CAPABILITIES_DATA.length;

  // Real-time scroll spy: auto-update active rail item as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (let i = CAPABILITIES_DATA.length - 1; i >= 0; i--) {
        const item = CAPABILITIES_DATA[i];
        const el = document.getElementById('oracle-' + item.num);
        if (el && el.offsetTop <= scrollPos) {
          setActiveDomain(item.num);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Scroll-driven progress to cycle through 7 cards while screen is pinned on desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }
    const calculatedIndex = Math.min(
      totalCards - 1,
      Math.floor(latest * totalCards)
    );
    setActiveIndex((prev) => (prev !== calculatedIndex ? calculatedIndex : prev));
  });

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    if (mobileScrollRef.current) {
      const container = mobileScrollRef.current;
      const cardElements = container.children;
      if (cardElements && cardElements[index]) {
        const el = cardElements[index] as HTMLElement;
        const targetScroll = el.offsetLeft - (container.clientWidth - el.offsetWidth) / 2;
        container.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: 'smooth',
        });
      }
    }
  };

  const scrollToDetail = (num: string) => {
    setActiveDomain(num);
    const el = document.getElementById('oracle-' + num);
    if (el) {
      const yOffset = -110;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const cardElements = container.children;
    if (!cardElements || cardElements.length === 0) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDiff = Infinity;

    for (let i = 0; i < cardElements.length; i++) {
      const el = cardElements[i] as HTMLElement;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const diff = Math.abs(containerCenter - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % totalCards;
    scrollToCard(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + totalCards) % totalCards;
    scrollToCard(prevIdx);
  };

  const renderSideHeading = (cap: SapCapability) => {
    let blackPart = '';
    let gradientPart = '';

    switch (cap.num) {
      case '01':
        blackPart = 'Financial';
        gradientPart = 'Management';
        break;
      case '02':
        blackPart = 'Oracle';
        gradientPart = 'Procurement';
        break;
      case '03':
        blackPart = 'Supply Chain';
        gradientPart = 'Management';
        break;
      case '04':
        blackPart = 'Manufacturing and';
        gradientPart = 'Risk Management';
        break;
      case '05':
        blackPart = 'Enterprise';
        gradientPart = 'Performance Management (EPM)';
        break;
      case '06':
        blackPart = 'Project';
        gradientPart = 'Management';
        break;
      case '07':
        blackPart = 'Fusion';
        gradientPart = 'Cloud ERP';
        break;
      default:
        blackPart = cap.title;
        gradientPart = '';
    }

    return (
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
        <span className="text-slate-900">{blackPart}{' '}</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
          {gradientPart}
        </span>
      </h3>
    );
  };

  return (
    <div className="w-full bg-slate-50 text-slate-900 select-none">
      
      {/* ================= 1. THE 3D ROTATING ORACLE CAPABILITIES STAGE ================= */}
      <div
        ref={containerRef}
        id="core-oracle-capabilities"
        className="relative w-full h-auto md:h-[180vh]"
      >
        {/* Sticky screen container on desktop, clean block on mobile */}
        <div className="relative md:sticky md:top-0 h-auto md:h-screen w-full flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden py-10 md:py-0">
          
          {/* Section Heading */}
          <div className="text-center flex flex-col items-center gap-2 mb-3">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Core{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                Oracle Capabilities
              </span>
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-600 max-w-xl text-center">
              Explore our verified Oracle Cloud competencies below. Click any card to jump directly to its complete scope and details.
            </p>
          </div>

          {/* Carousel Prev / Next Controls */}
          <div className="flex items-center justify-end gap-2 mb-3">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm transition-all active:scale-95 cursor-pointer"
              aria-label="Previous Capability"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm transition-all active:scale-95 cursor-pointer"
              aria-label="Next Capability"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* ================= DESKTOP 3D HELIX / SPIRAL STAGE (≥ 768px) ================= */}
          <div className="hidden md:block relative w-full h-[480px] overflow-visible perspective-[1200px]">
            <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
              {CAPABILITIES_DATA.map((item, idx) => {
                let offset = idx - activeIndex;
                if (offset > totalCards / 2) offset -= totalCards;
                if (offset < -totalCards / 2) offset += totalCards;

                const isCenter = offset === 0;
                const absOffset = Math.abs(offset);
                const isVisible = absOffset <= 2;

                const angleStep = (2 * Math.PI) / totalCards;
                const currentAngle = offset * angleStep;

                const radius = 380;
                const x = Math.sin(currentAngle) * (radius * 0.85);
                const z = Math.cos(currentAngle) * radius - radius;
                const y = Math.sin(currentAngle * 0.5) * 36 + offset * 10;

                const rotateY = (currentAngle * 180) / Math.PI;
                const rotateZ = Math.sin(currentAngle) * -4;

                const opacity = isCenter
                  ? 1
                  : absOffset === 1
                  ? 0.75
                  : absOffset === 2
                  ? 0.35
                  : 0;

                const scale = isCenter ? 1.05 : Math.max(0.75, 1 - absOffset * 0.12);
                const zIndex = Math.round(100 - Math.abs(z));
                const IconComp = item.icon;

                return (
                  <motion.div
                    key={item.num}
                    onClick={() => {
                      if (isCenter) {
                        scrollToDetail(item.num);
                      } else {
                        setActiveIndex(idx);
                      }
                    }}
                    animate={{
                      x,
                      y,
                      z,
                      rotateY,
                      rotateZ,
                      scale,
                      opacity,
                    }}
                    transition={{
                      duration: 0.22,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    style={{
                      zIndex,
                      transformStyle: 'preserve-3d',
                      willChange: 'transform, opacity',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      display: isVisible ? 'block' : 'none',
                    }}
                    className={`absolute w-[360px] cursor-pointer rounded-3xl p-7 transition-all duration-200 ${
                      isCenter
                        ? 'bg-white border-2 border-blue-500 shadow-xl pointer-events-auto ring-4 ring-blue-500/10'
                        : 'bg-white/95 border border-slate-200/90 shadow-sm hover:border-blue-300 pointer-events-auto'
                    }`}
                  >
                    {/* Header Number */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-mono font-extrabold px-3 py-1 rounded-full border ${
                          isCenter
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {item.num}
                      </span>
                      <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                        {item.badge}
                      </span>
                    </div>

                    {/* Title & Icon */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-3 rounded-2xl shadow-sm ${
                          isCenter
                            ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium line-clamp-4">
                      {item.desc}
                    </p>

                    {/* Quick Jump Action Line */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-blue-600">
                      <span className="text-[11px] text-slate-400">Click card to view details</span>
                      <ArrowDown className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ================= MOBILE FALLBACK HORIZONTAL SNAP CAROUSEL (< 768px) ================= */}
          <div className="block md:hidden relative w-full">
            <div
              ref={mobileScrollRef}
              onScroll={handleMobileScroll}
              className="w-full overflow-x-auto snap-x snap-mandatory flex gap-4 pb-6 pt-2 scrollbar-none scroll-smooth px-1"
            >
              {CAPABILITIES_DATA.map((item, idx) => {
                const IconComp = item.icon;
                const isCenter = idx === activeIndex;

                return (
                  <div
                    key={item.num}
                    onClick={() => {
                      scrollToCard(idx);
                      scrollToDetail(item.num);
                    }}
                    className={`snap-center shrink-0 w-[85vw] max-w-[320px] p-6 rounded-3xl bg-white border transition-all cursor-pointer ${
                      isCenter
                        ? 'border-2 border-blue-500 shadow-xl'
                        : 'border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-mono font-extrabold px-3 py-1 rounded-full border ${
                          isCenter
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {item.num}
                      </span>
                      <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                        {item.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-3 rounded-2xl shadow-sm ${
                          isCenter
                            ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 text-xs font-medium leading-relaxed mb-4">
                      {item.desc}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                      <span>View Details Below</span>
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Page Dot Indicators */}
            <div className="flex items-center justify-center gap-1.5 mt-2">
              {CAPABILITIES_DATA.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToCard(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === activeIndex ? 'w-6 bg-blue-600' : 'w-1.5 bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2. NORMAL EDITORIAL SCOPE & DETAILS (NO CARDS) ================= */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-t border-slate-200/80">
        
        {/* ================= UNIQUE ORACLE COMPETENCY COMMAND RAIL ================= */}
        <div className="sticky top-20 z-30 mb-14 w-full">
          <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-1.5 flex items-center justify-between gap-1.5 w-full overflow-x-auto lg:overflow-visible scrollbar-none">
            {CAPABILITIES_DATA.map((item) => {
              const IconComp = item.icon;
              const isActive = activeDomain === item.num;

              return (
                <button
                  key={item.num}
                  onClick={() => scrollToDetail(item.num)}
                  className={`group relative flex-1 min-w-[105px] lg:min-w-0 flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm shadow-slate-900/10'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                  aria-label={`Jump to ${item.title}`}
                >
                  <IconComp
                    className={`w-3.5 h-3.5 shrink-0 transition-transform hidden sm:inline-block ${
                      isActive ? 'text-white scale-105' : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  />
                  <span
                    className={`font-mono text-[10px] font-bold shrink-0 ${
                      isActive ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  >
                    {item.num}
                  </span>
                  <span className="whitespace-nowrap font-bold tracking-tight text-[11px] sm:text-xs">
                    {item.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Normal Editorial Document Layout for all 7 Competencies (Full Page Width) */}
        <div className="w-full space-y-20">
          {CAPABILITIES_DATA.map((cap, idx) => (
            <article
              key={cap.num}
              id={'oracle-' + cap.num}
              className="scroll-mt-28 w-full space-y-6"
            >
              {/* Heading with black, blue, and orange mix */}
              {renderSideHeading(cap)}

              {/* Introductory Paragraphs spanning full width */}
              <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal w-full">
                <p>{cap.intro1}</p>
                <p>{cap.intro2}</p>
              </div>

              {/* Deliverables side-by-side in 2 responsive columns across full page width */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 pt-2 w-full">
                <div>
                  <p className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Core Scope & Capabilities:
                  </p>
                  <ul className="list-disc list-outside pl-6 space-y-2.5 text-base text-slate-700 leading-relaxed marker:text-blue-600">
                    {cap.coreScope.map((bullet, i) => (
                      <li key={i} className="pl-1">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    Also included:
                  </p>
                  <ul className="list-disc list-outside pl-6 space-y-2.5 text-base text-slate-700 leading-relaxed marker:text-orange-500">
                    {cap.alsoIncluded.map((bullet, i) => (
                      <li key={i} className="pl-1">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Business Benefits & Ideal For across 2 responsive columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-14 pt-4 w-full">
                <div className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  <strong className="font-bold text-blue-700 block mb-1">Business benefits:</strong>
                  <p>{cap.benefits}</p>
                </div>
                <div className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  <strong className="font-bold text-orange-600 block mb-1">Ideal for:</strong>
                  <p>{cap.idealFor}</p>
                </div>
              </div>

              {/* Subtle Divider between items */}
              {idx < CAPABILITIES_DATA.length - 1 && (
                <div className="pt-10">
                  <hr className="border-t border-slate-200" />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

    </div>
  );
};
