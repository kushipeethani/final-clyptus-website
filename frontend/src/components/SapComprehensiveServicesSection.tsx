import React, { useState } from 'react';
import sapS4HanaImg from '../assets/sap-s4hana.jpg';
import sapEccImg from '../assets/sap-ecc.jpg';
import sapBrimImg from '../assets/sap-brim.jpg';
import sapAbapImg from '../assets/sap-abap.jpg';
import sapFicoImg from '../assets/sap-fico.jpg';
import sapMmImg from '../assets/sap-mm.jpg';
import sapHcmImg from '../assets/sap-hcm.jpg';
import sapSdImg from '../assets/sap-sd.jpg';
import {
  Layers,
  RefreshCw,
  CreditCard,
  Code,
  BarChart3,
  Package,
  Users,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

interface SapComprehensiveServicesSectionProps {
  onContactClick?: () => void;
}

export interface SapServiceDetail {
  id: string;
  num: string;
  category: string;
  title: string;
  color: string;
  image: string;
  icon: React.ElementType;
  desc: string;
  bullets: string[];
  benefits: string;
}

export const SAP_COMPREHENSIVE_SERVICES: SapServiceDetail[] = [
  {
    id: 's4hana',
    num: '01',
    category: 'Enterprise ERP Suite',
    title: 'SAP S/4HANA',
    color: '#EA580C',
    image: sapS4HanaImg,
    icon: Layers,
    desc: "SAP S/4HANA is SAP's next-generation intelligent ERP suite, built on the in-memory HANA database for real-time processing and instant business insights. We help you move to S/4HANA with a clear roadmap and minimal disruption to your daily operations.",
    bullets: [
      'Greenfield implementation of a brand-new S/4HANA system',
      'Brownfield system conversion from SAP ECC while keeping your existing data and processes',
      'Selective data transition and landscape consolidation',
      'Fit-to-standard workshops, data migration, testing and go-live support',
      'SAP Fiori user experience setup for simple, role-based screens',
    ],
    benefits:
      'faster reporting, simplified data structures, lower total cost of ownership and a strong foundation for future innovation.',
  },
  {
    id: 'ecc',
    num: '02',
    category: 'Core Business Suite',
    title: 'SAP ECC',
    color: '#2563EB',
    image: sapEccImg,
    icon: RefreshCw,
    desc: 'SAP ECC (ERP Central Component) remains the backbone of many organisations worldwide. We keep your ECC systems stable, efficient and aligned with your business needs while you plan your future roadmap.',
    bullets: [
      'Implementation, rollout and upgrade of SAP ECC systems',
      'Enhancement packs, support packages and system optimisation',
      'Process improvement and custom development',
      '24/7 application support and maintenance',
      'Migration planning and readiness assessment for SAP S/4HANA',
    ],
    benefits:
      'reliable day-to-day operations, reduced system downtime and a smooth, well-planned path to the next generation of SAP.',
  },
  {
    id: 'brim',
    num: '03',
    category: 'Monetization & Billing',
    title: 'SAP BRIM',
    color: '#F59E0B',
    image: sapBrimImg,
    icon: CreditCard,
    desc: 'SAP BRIM (Billing and Revenue Innovation Management) is built for businesses with high-volume, usage-based or subscription billing models. We design and implement solutions that automate the complete order-to-cash cycle for complex revenue streams.',
    bullets: [
      'Subscription order management and convergent charging',
      'Convergent invoicing and contract accounts receivable and payable (FI-CA)',
      'Usage rating, billing and revenue recognition',
      'Integration with SAP S/4HANA, CRM and third-party systems',
      'Industry solutions for telecom, utilities, media, software and services',
    ],
    benefits:
      'accurate billing, faster revenue realisation, fewer manual errors and the flexibility to launch new pricing models quickly.',
  },
  {
    id: 'abap',
    num: '04',
    category: 'Custom Engineering & APIs',
    title: 'SAP ABAP',
    color: '#7C3AED',
    image: sapAbapImg,
    icon: Code,
    desc: 'SAP ABAP is the programming language that powers custom development in SAP. Our experienced ABAP developers build reliable, high-performance solutions that extend standard SAP functionality to match the way your business works.',
    bullets: [
      'Custom reports, interfaces, conversions, enhancements and forms (RICEF)',
      'ABAP on HANA, CDS views and code optimisation',
      'OData services and SAP Fiori app development',
      'Workflow development and system integration',
      'Performance tuning, debugging and code remediation for S/4HANA migration',
    ],
    benefits:
      'tailor-made functionality, faster processes and clean, maintainable code that scales with your growth.',
  },
  {
    id: 'fico',
    num: '05',
    category: 'Financial Accounting & Controlling',
    title: 'SAP FICO',
    color: '#10B981',
    image: sapFicoImg,
    icon: BarChart3,
    desc: 'SAP FICO (Financial Accounting and Controlling) gives finance teams complete control over accounting, reporting and cost management. We configure SAP FICO to meet statutory requirements and to give management a clear, real-time view of financial performance.',
    bullets: [
      'General ledger, accounts payable and accounts receivable',
      'Asset accounting, bank accounting and period-end closing',
      'Cost centre, profit centre and product costing',
      'Profitability analysis and internal orders',
      'Financial reporting, taxation and compliance support',
    ],
    benefits:
      'accurate books, faster financial close, better cost visibility and confident decision-making.',
  },
  {
    id: 'mm',
    num: '06',
    category: 'Procurement & Inventory',
    title: 'SAP MM',
    color: '#6366F1',
    image: sapMmImg,
    icon: Package,
    desc: 'SAP MM (Materials Management) streamlines procurement and inventory so that the right material is available at the right time and at the right cost. Our consultants design purchasing processes that are efficient, transparent and fully integrated with finance and sales.',
    bullets: [
      'Purchase requisition, purchase order and vendor management',
      'Inventory management and warehouse integration',
      'Invoice verification and goods receipt processing',
      'Material master, source lists and pricing procedures',
      'Material requirements planning (MRP) and release strategies',
    ],
    benefits:
      'lower procurement costs, optimised stock levels, fewer shortages and better supplier relationships.',
  },
  {
    id: 'hcm',
    num: '07',
    category: 'Workforce & Payroll Operations',
    title: 'SAP HCM',
    color: '#06B6D4',
    image: sapHcmImg,
    icon: Users,
    desc: 'SAP HCM (Human Capital Management) helps organisations manage their most valuable asset: their people. We implement and support HR solutions that simplify administration and improve the employee experience.',
    bullets: [
      'Organisational management and personnel administration',
      'Time management and attendance',
      'Payroll configuration and statutory compliance',
      'Recruitment, training and event management',
      'Employee and manager self-service',
    ],
    benefits:
      'accurate and on-time payroll, reduced HR workload, better workforce insight and a more engaged team.',
  },
  {
    id: 'sd',
    num: '08',
    category: 'Order-to-Cash & Commercial Sales',
    title: 'SAP SD',
    color: '#0284C7',
    image: sapSdImg,
    icon: TrendingUp,
    desc: 'SAP SD (Sales and Distribution) manages the complete sales cycle, from customer enquiry to delivery and billing. We configure SAP SD so your sales team can serve customers faster and your business can maintain full control over orders and revenue.',
    bullets: [
      'Sales order processing, quotations and contracts',
      'Pricing, discounts and credit management',
      'Delivery, shipping and transportation',
      'Billing and invoicing with finance integration',
      'Availability check, returns and third-party order processing',
    ],
    benefits:
      'quicker order fulfilment, accurate pricing, improved customer satisfaction and better sales visibility.',
  },
];

export const SapComprehensiveServicesSection: React.FC<SapComprehensiveServicesSectionProps> = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const topRowServices = SAP_COMPREHENSIVE_SERVICES.slice(0, 4); // 01 to 04
  const bottomRowServices = SAP_COMPREHENSIVE_SERVICES.slice(4, 8); // 05 to 08

  const isTopRowHovered = topRowServices.some((s) => s.id === hoveredId);
  const isBottomRowHovered = bottomRowServices.some((s) => s.id === hoveredId);

  const serviceBgColors: Record<string, string> = {
    s4hana: 'bg-[#f8f1eb]',
    ecc: 'bg-[#ebf1fd]',
    brim: 'bg-[#fbf6e4]',
    abap: 'bg-[#f1eefd]',
    fico: 'bg-[#e7f8f3]',
    mm: 'bg-[#edf0fe]',
    hcm: 'bg-[#e3f8f6]',
    sd: 'bg-[#ebf5fc]',
  };

  // Helper renderer for a single expandable row
  const renderCardRow = (services: SapServiceDetail[], isCurrentRowHovered: boolean) => (
    <div
      onMouseLeave={() => setHoveredId(null)}
      className="hidden lg:flex gap-5 w-full h-[310px] items-stretch select-none"
    >
      {services.map((service) => {
        const isHovered = hoveredId === service.id;
        const IconComp = service.icon;

        return (
          <div
            key={service.id}
            onMouseEnter={() => setHoveredId(service.id)}
            style={{
              flex: isHovered ? 2.6 : isCurrentRowHovered ? 0.55 : 1,
              minWidth: 0,
              willChange: 'flex, width, transform',
            }}
            className={`relative rounded-2xl border bg-white overflow-hidden transition-[flex,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ${
              isHovered
                ? 'border-blue-400/80 shadow-[0_20px_45px_rgba(37,99,235,0.12)] ring-1 ring-blue-400/30'
                : 'border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            {/* Subtle Top Accent Strip */}
            <div
              className="absolute top-0 left-0 right-0 h-1 z-20"
              style={{ backgroundColor: service.color }}
            />

            {/* ---------------- 1. DEFAULT UNHOVERED VIEW ---------------- */}
            <div
              className={`absolute inset-0 p-3 flex flex-col gap-2.5 transition-all duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isHovered
                  ? 'opacity-0 pointer-events-none -translate-x-2'
                  : 'opacity-100 pointer-events-auto translate-x-0'
              }`}
            >
              {/* Landscape Image - fills card space with no blank white gap */}
              <div
                className={`relative w-full flex-1 rounded-xl overflow-hidden shadow-xs border border-slate-100/80 flex items-center justify-center ${
                  serviceBgColors[service.id] || 'bg-slate-50'
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className={`w-full h-full object-contain transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isHovered ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
                  }`}
                />
                <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-mono font-bold text-slate-700 shadow-xs border border-slate-200/80">
                  {service.num}
                </div>
              </div>

              {/* Bottom: Heading */}
              <div className="shrink-0 px-0.5 pb-0.5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 shadow-2xs"
                    style={{ backgroundColor: service.color }}
                  >
                    <IconComp className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                    {service.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* ---------------- 2. HOVERED 2-COLUMN SPLIT VIEW ---------------- */}
            <div
              className={`absolute inset-0 p-5 transition-all duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isHovered
                  ? 'opacity-100 pointer-events-auto translate-x-0 delay-75'
                  : 'opacity-0 pointer-events-none translate-x-3'
              }`}
            >
              <div className="grid grid-cols-12 gap-5 h-full items-stretch">
                
                {/* Left Column (58%): Category, Heading, and Full Description (Business benefits removed) */}
                <div className="col-span-7 flex flex-col justify-center h-full pr-2 space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: service.color }}
                    >
                      <IconComp className="w-4.5 h-4.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                        {service.category}
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm sm:text-[14.5px] leading-relaxed text-slate-600">
                    {service.desc}
                  </p>
                </div>

                {/* Right Column (42%): Core Implementation Scope checklist with Arrow marks */}
                <div className="col-span-5 flex flex-col justify-center h-full bg-slate-50/90 p-4 rounded-xl border border-slate-200/80">
                  <span className="block text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-3 pb-1.5 border-b border-slate-200/80">
                    Core Implementation Scope
                  </span>
                  <ul className="space-y-2.5">
                    {service.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700 leading-snug font-medium"
                      >
                        <ArrowRight
                          className="w-3.5 h-3.5 shrink-0 mt-0.5 stroke-[2.5]"
                          style={{ color: service.color }}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

          </div>
        );
      })}
    </div>
  );

  return (
    <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-8 lg:px-16 border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            <span className="text-slate-900">Comprehensive </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
              SAP Capability &amp; Scope Directory
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed mt-3">
            Verified delivery capabilities across functional, technical, and cloud-scale SAP engagements. Hover over any card to explore full implementation scope.
          </p>
        </div>

        {/* ================= STATIC TWO-ROW EXPANDABLE GRID (4-OVER-4) ================= */}
        <div className="flex flex-col gap-5 w-full">
          {/* Top Row: Practices 01 to 04 */}
          {renderCardRow(topRowServices, isTopRowHovered)}

          {/* Bottom Row: Practices 05 to 08 */}
          {renderCardRow(bottomRowServices, isBottomRowHovered)}
        </div>

        {/* ================= MOBILE / TABLET VIEW (< 1024px) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden mt-8">
          {SAP_COMPREHENSIVE_SERVICES.map((service) => {
            const IconComp = service.icon;
            return (
              <div
                key={service.id}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden p-5 space-y-4"
              >
                <div
                  className={`relative h-48 sm:h-52 w-full rounded-xl overflow-hidden shadow-xs border border-slate-100 flex items-center justify-center ${
                    serviceBgColors[service.id] || 'bg-slate-50'
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-full text-xs font-mono font-bold text-slate-700 shadow-xs border border-slate-200">
                    {service.num}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-2xs"
                      style={{ backgroundColor: service.color }}
                    >
                      <IconComp className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {service.desc}
                  </p>

                  {/* Core Implementation Scope with Arrow Marks */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2 pb-1 border-b border-slate-200">
                      Core Implementation Scope
                    </span>
                    <ul className="space-y-1.5">
                      {service.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                          <ArrowRight
                            className="w-3.5 h-3.5 shrink-0 mt-0.5 stroke-[2.5]"
                            style={{ color: service.color }}
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
