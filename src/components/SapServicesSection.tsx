import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Layers,
  RefreshCw,
  Code,
  Cloud,
  ShieldCheck,
  Zap,
  ChevronDown,
  Building2,
  Cpu,
  Brain,
  Rocket,
  Award,
  Users,
  Calendar,
  CreditCard,
  BarChart,
  Globe,
  Clock,
  Workflow,
  AlertCircle,
} from 'lucide-react';
import { DigiLabSapEngine } from './DigiLabSapEngine';
import { SapCapabilitiesHelixSlider } from './SapCapabilitiesHelixSlider';
import { CapabilitiesMarqueeBanner } from './CapabilitiesMarqueeBanner';
import { ErpProgrammePipeline } from './ErpProgrammePipeline';
import { ProblemsWeSolveDiagnostics } from './ProblemsWeSolveDiagnostics';
import { BrimLifecycleMatrix } from './BrimLifecycleMatrix';
import { BrimCoeLabConsole } from './BrimCoeLabConsole';
import { SapProjectsLedger } from './SapProjectsLedger';

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface SapServicesSectionProps {
  onContactClick: () => void;
}

// 1. WHAT WE DO: 9 CORE ENTERPRISE SERVICES
export const coreServices = [
  {
    num: '01',
    title: 'SAP S/4HANA',
    desc: 'Greenfield implementation, migration and upgrade to S/4HANA.',
    icon: Layers,
    accentHex: '#2563EB',
    badge: 'S/4HANA',
  },
  {
    num: '02',
    title: 'SAP Cloud Services',
    desc: 'SAP cloud deployment and services.',
    icon: Cloud,
    accentHex: '#0284C7',
    badge: 'SAP CLOUD',
  },
  {
    num: '03',
    title: 'SAP BTP and Add-ons',
    desc: 'BTP-first extensions and custom SAP add-on solutions.',
    icon: Code,
    accentHex: '#7C3AED',
    badge: 'BTP & EXTENSIONS',
  },
  {
    num: '04',
    title: 'SAP HCM',
    desc: 'Human capital management on SAP, part of the practice since the company began.',
    icon: Users,
    accentHex: '#EA580C',
    badge: 'HCM & TALENT',
  },
  {
    num: '05',
    title: 'SAP BRIM',
    desc: 'Subscription billing, usage-based charging, invoicing and revenue management.',
    icon: CreditCard,
    accentHex: '#F59E0B',
    badge: 'BRIM MONETIZATION',
  },
  {
    num: '06',
    title: 'SAP AI',
    desc: 'SAP AI capabilities integrated into SAP solutions.',
    icon: Brain,
    accentHex: '#10B981',
    badge: 'INTELLIGENT AI',
  },
  {
    num: '07',
    title: 'SAP AMS and Support',
    desc: 'Application management and support after go-live.',
    icon: ShieldCheck,
    accentHex: '#DC2626',
    badge: 'AMS & SLA',
  },
  {
    num: '08',
    title: 'Oracle Cloud ERP',
    desc: 'Oracle ERP implementation and support.',
    icon: Cpu,
    accentHex: '#2563EB',
    badge: 'ORACLE ERP',
  },
  {
    num: '09',
    title: 'Microsoft Dynamics 365',
    desc: 'Dynamics 365 implementation and support.',
    icon: RefreshCw,
    accentHex: '#0284C7',
    badge: 'DYNAMICS 365',
  },
];

// Platform capabilities pill tags
export const platformPills = [
  'Strategy & advisory',
  'Process design & reengineering',
  'ERP implementation & migration',
  'Integration & automation',
  'Data migration & governance',
  'Managed services & support',
];

// 2. HOW AN ERP PROGRAMME RUNS (5-STEP METHODOLOGY)
export const methodologySteps = [
  {
    step: '01',
    title: 'Review the Legacy ERP',
    desc: 'Siloed, complex systems are mapped and assessed.',
    icon: SearchIcon,
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

// 3. PROBLEMS WE SOLVE
export const problemsWeSolve = [
  {
    title: 'Disconnected ERP Systems',
    desc: 'Complex landscapes and high integration costs.',
    icon: AlertCircle,
  },
  {
    title: 'Manual, Inefficient Processes',
    desc: 'High dependency on people, errors and rework.',
    icon: RefreshCw,
  },
  {
    title: 'Limited Visibility',
    desc: 'Siloed data and no real-time view of operations.',
    icon: BarChart,
  },
  {
    title: 'High Maintenance Cost',
    desc: 'Legacy systems raise total cost of ownership and slow innovation.',
    icon: Zap,
  },
  {
    title: 'Slow Reporting',
    desc: 'Delayed insight holds back decisions.',
    icon: Clock,
  },
];

// 4. SAP BRIM 6-MODULE COVERAGE GRID
export const brimModules = [
  {
    code: 'SOM',
    title: 'Subscription Order Management',
    desc: 'Master data setup, product catalog design, subscription lifecycle management, order orchestration, contract master configuration.',
  },
  {
    code: 'CC',
    title: 'Convergent Charging',
    desc: 'Rating engine configuration, pricing strategy, charge calculation logic, aggregation rules, real-time usage monetization.',
  },
  {
    code: 'CI',
    title: 'Convergent Invoicing',
    desc: 'Invoice document generation, multi-format output, billing run optimization, invoice consolidation, mass processing.',
  },
  {
    code: 'CM',
    title: 'Convergent Mediation',
    desc: 'Collecting, validating and transforming high-volume usage data, then passing it to Convergent Charging.',
  },
  {
    code: 'FI-CA & RAR',
    title: 'FI-CA and RAR',
    desc: 'Contract accounts receivable, payment processing, clearing and reconciliation, revenue recognition compliance (ASC 606 / IFRS 15), S/4HANA integration.',
  },
  {
    code: 'TECH',
    title: 'BRIM Technical',
    desc: 'ABAP development and enhancements, Convergent Invoicing tuning, integration support (PI/PO, CPI).',
  },
];

// Clyptus BRIM CoE Pills
export const brimCoePills = [
  'Live BRIM sandbox with SOM, CC, CI and FI-CA, multiple industry scenarios and realistic master data.',
  'Invoice simulation framework: proration, usage-based charges, subscriptions, one-time fees, discounts and tax.',
  'CC rating scenario library for telecom, utilities, SaaS and digital platforms.',
  'FI-CA reconciliation labs: payment processing, clearing, dunning, disputes and period-end closing.',
  'Performance tuning toolkit with benchmarking, database tuning scripts and monitoring dashboards.',
];

// 5. CASE STUDY: Airline Usage Billing
export const airlineChallenges = [
  {
    challenge: 'Very high volume of usage transactions that needed raw-data preprocessing.',
    solution: 'Mediation pipelines enriched the records before they reached SAP Convergent Charging.',
  },
  {
    challenge: 'Varied revenue-share rules.',
    solution: 'Configurable revenue-share logic in SAP Convergent Charging.',
  },
  {
    challenge: 'Dynamic, tier-based pricing.',
    solution: 'Cumulative tier calculation in SAP Convergent Charging.',
  },
  {
    challenge: 'Multiple agreements and duplicated charge plans.',
    solution: 'A master agreement approach, with mapping tables for common pricing parameters.',
  },
];

// Sector Highlights
export const sectorHighlights = [
  {
    sector: 'Insurance',
    desc: 'SAP BRIM for automated premiums from live data, flexible risk-based pricing and integrated billing across Fiori, SOM, CI and CC.',
  },
  {
    sector: 'Telecom Enterprise Billing',
    desc: 'Subscription billing with SAP BRIM and automated contract management.',
  },
  {
    sector: 'High-Tech',
    desc: 'Transformed the subscription billing model with SAP BRIM, modernized BRM processes and automated order-to-cash operations.',
  },
  {
    sector: 'Utilities',
    desc: 'SAP BRIM for real-time revenue recognition, unified billing and invoicing and better cash flow; work order management and revenue processes for integrated utilities solutions.',
  },
];

// 6. TARGET INDUSTRIES
export const brimFocusSectors = [
  'Insurance',
  'Telecommunications (usage-based billing for voice, data, IoT)',
  'Utilities (meter-to-cash)',
  'High-tech',
  'SaaS & subscription businesses',
  'Digital platforms (API monetization)',
  'Media & OTT',
];

export const enterpriseErpSectors = [
  'Healthcare',
  'Banking & financial services',
  'Retail & e-commerce',
  'Manufacturing',
  'Energy & utilities',
  'Logistics & transportation',
  'Pharma & life sciences',
  'Automotive',
  'Technology & consulting',
];

// 7. COMPANY TIMELINE
export const timelineMilestones = [
  {
    year: '2014–16',
    title: 'Founding & HCM Practice',
    desc: 'Company founded. SAP and HCM practice launched. First international SAP project delivered in Dubai.',
  },
  {
    year: '2016–18',
    title: 'Global Delivery Expansion',
    desc: 'SAP delivery expanded to 3+ countries. Major SAP implementations in the UAE and India.',
  },
  {
    year: '2018–20',
    title: 'Cloud & S/4HANA Practice',
    desc: 'SAP Cloud Services introduced. SAP S/4HANA practice launched.',
  },
  {
    year: '2020–23',
    title: 'BRIM & Analytics Practice',
    desc: 'Data Analytics and BRIM staffing introduced.',
  },
  {
    year: '2023–25',
    title: 'SAP BTP, AI & 250+ Practice',
    desc: 'SAP BTP practice introduced. SAP add-on solutions built. SAP AI capabilities integrated. 250+ SAP consultants.',
  },
];

// 8. ENGAGEMENT MODELS
export const engagementModels = [
  {
    title: 'Contract and contract-to-hire',
    desc: 'Flexible deployment of certified SAP functional and technical consultants.',
    badge: 'FLEXIBLE TALENT',
  },
  {
    title: 'Dedicated offshore development center',
    desc: 'Managed project delivery out of our Hyderabad delivery center.',
    badge: 'HYDERABAD ODC',
  },
  {
    title: 'Managed service team',
    desc: 'SLA-driven L2/L3 support, maintenance, and enhancement squads.',
    badge: 'SLA AMS',
  },
  {
    title: 'Hybrid onsite-offshore',
    desc: 'Balanced architecture combining onsite leadership with cost-effective offshore execution.',
    badge: 'HYBRID DELIVERY',
  },
];



export const SapServicesSection: React.FC<SapServicesSectionProps> = ({ onContactClick }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Set document title & metadata
  useEffect(() => {
    document.title = 'SAP Consulting, Implementation & Support Services | Clyptus';
  }, []);

  // 9. FREQUENTLY ASKED QUESTIONS
  const faqs = [
    {
      question: 'What is SAP BRIM?',
      answer:
        "SAP BRIM is SAP's suite for subscription billing, usage-based charging, invoicing and revenue management. Clyptus covers its main parts: Subscription Order Management, Convergent Charging, Convergent Invoicing, Convergent Mediation, FI-CA and Revenue Accounting and Reporting.",
    },
    {
      question: 'Which ERP systems does Clyptus work on?',
      answer:
        'SAP (S/4HANA, SAP Cloud, BTP, HCM and BRIM), Oracle Cloud ERP and Microsoft Dynamics 365.',
    },
    {
      question: 'Can you move us from a legacy ERP to SAP S/4HANA?',
      answer:
        'Yes. We run greenfield implementations, migrations and upgrades, and manage the application after go-live.',
    },
    {
      question: 'What support do you offer after go-live?',
      answer:
        'SAP application management and support, including L2 and L3 support, enhancements and SLA-driven managed service teams.',
    },
    {
      question: 'How can we work with Clyptus?',
      answer:
        'Through contract or contract-to-hire consultants, a dedicated offshore development center, a managed service team or a hybrid onsite-offshore model.',
    },
  ];

  return (
    <div className="w-full bg-slate-50 text-slate-900 select-none overflow-x-clip font-sans">
      
      {/* ================= 3-STAGE SCROLLED DIGILAB ENGINE ================= */}
      <DigiLabSapEngine onContactClick={onContactClick} />

      {/* ================= 1. PAGE METADATA & HERO SECTION ================= */}
      <section className="py-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-b border-slate-200/80">
        <div className="flex flex-col items-center text-center gap-6">
          
          {/* Practice Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-bold tracking-wide">
            <span className="inline-flex items-center gap-2 text-blue-600">
              <Award className="w-4 h-4 text-blue-600" />
              <span>250+ SAP Consultants</span>
            </span>
            <span className="inline-flex items-center gap-2 text-[#FF7138]">
              <Calendar className="w-4 h-4 text-[#FF7138]" />
              <span>Since 2014</span>
            </span>
            <span className="inline-flex items-center gap-2 text-indigo-600">
              <Globe className="w-4 h-4 text-indigo-600" />
              <span>Offices in India, UAE & USA</span>
            </span>
          </div>

          {/* H1 Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl">
            SAP & ERP Implementation and{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
              Consulting Services
            </span>
          </h1>

          {/* Introduction Copy */}
          <div className="space-y-3 max-w-3xl text-slate-600 text-sm sm:text-base lg:text-lg font-medium leading-relaxed">
            <p>
              Clyptus helps enterprises plan, implement and support ERP systems. SAP is our deepest practice: S/4HANA, SAP Cloud, BTP, HCM and BRIM, delivered by more than 250 SAP consultants. We also work on Oracle Cloud ERP and Microsoft Dynamics 365.
            </p>
            <p className="text-slate-800 font-semibold">
              Since 2014 we have delivered SAP projects from Hyderabad to clients in India and the UAE.
            </p>
          </div>

        </div>
      </section>

      {/* ================= 2. WHAT WE DO (9 CORE SERVICES & MARQUEE) ================= */}
      <section className="w-full">
        {/* Interactive 3D Helix / Spiral Capabilities Sticky Scroll Slider */}
        <SapCapabilitiesHelixSlider onContactClick={onContactClick} />

        {/* Capabilities Across Every Platform Infinite Marquee Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-6 pb-16">
          <CapabilitiesMarqueeBanner />
        </div>
      </section>

      {/* ================= 3. HOW AN ERP PROGRAMME RUNS (CONNECTED STEPPER PIPELINE) ================= */}
      <ErpProgrammePipeline />

      {/* ================= 4. PROBLEMS WE SOLVE (2-COLUMN DIAGNOSTIC STACK) ================= */}
      <ProblemsWeSolveDiagnostics />

      {/* ================= 5. SAP BRIM EXPERTISE & INNOVATION LAB CONSOLE ================= */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-t border-slate-200/80">
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Comprehensive{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
              SAP BRIM Expertise
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-medium">
            Coverage across the whole revenue management lifecycle, from subscription order capture to financial settlement and reporting.
          </p>
        </div>

        {/* Part 1: Connected Lifecycle Architecture Matrix (6 Modules Pipeline) */}
        <BrimLifecycleMatrix />

        {/* Part 2: Clyptus BRIM Center of Excellence (Interactive Innovation Lab Console) */}
        <BrimCoeLabConsole />
      </section>

      {/* ================= 6. SAP PROJECTS EDITORIAL LEDGER (#sap-projects) ================= */}
      <SapProjectsLedger />

      {/* ================= 7. TARGET INDUSTRIES ================= */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-t border-slate-200/80">
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Target{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
              Industries
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* SAP BRIM Focus Sectors */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              SAP BRIM Focus Sectors
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {brimFocusSectors.map((sec) => (
                <span
                  key={sec}
                  className="px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-900"
                >
                  {sec}
                </span>
              ))}
            </div>
          </div>

          {/* Enterprise ERP Sectors */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-orange-500" />
              Enterprise ERP Sectors
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {enterpriseErpSectors.map((sec) => (
                <span
                  key={sec}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800"
                >
                  {sec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 8. COMPANY TIMELINE ================= */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-t border-slate-200/80 overflow-hidden">
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Company{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
              Timeline
            </span>
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-32 space-y-12 py-4">
          {timelineMilestones.map((m) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative pl-8 sm:pl-10"
            >
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
              <span className="sm:absolute sm:-left-32 sm:top-1 text-sm font-mono font-extrabold text-orange-600 block mb-1 sm:mb-0">
                {m.year}
              </span>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 max-w-2xl">
                <h3 className="text-base font-extrabold text-slate-900 mb-2">
                  {m.title}
                </h3>
                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= 9. ENGAGEMENT MODELS ================= */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-t border-slate-200/80">
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Flexible{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
              Engagement Models
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {engagementModels.map((eng) => (
            <div
              key={eng.title}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-400 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 block w-fit mb-3">
                  {eng.badge}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mb-2 leading-snug">
                  {eng.title}
                </h3>
                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                  {eng.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 10. FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 max-w-5xl mx-auto border-t border-slate-200/80">
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
              Questions
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base font-extrabold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

// Search icon helper component
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
