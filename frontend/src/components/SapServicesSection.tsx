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
  Cpu,
  Brain,
  Rocket,
  Users,
  CreditCard,
  BarChart,
  Clock,
  Workflow,
  AlertCircle,
} from 'lucide-react';
import { DigiLabSapEngine } from './DigiLabSapEngine';
import { SapCapabilitiesHelixSlider } from './SapCapabilitiesHelixSlider';
import { SapComprehensiveServicesSection } from './SapComprehensiveServicesSection';
import { Dynamics365Section } from './Dynamics365Section';
import { CapabilitiesMarqueeBanner } from './CapabilitiesMarqueeBanner';
import { ErpProgrammePipeline } from './ErpProgrammePipeline';
import { ProblemsWeSolveDiagnostics } from './ProblemsWeSolveDiagnostics';
import { BrimLifecycleMatrix } from './BrimLifecycleMatrix';
import { BrimCoeLabConsole } from './BrimCoeLabConsole';

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
    title: 'Discover & Landscape Assessment',
    desc: 'Comprehensive code remediation audits, data profiling, and dependency mapping of your legacy landscape.',
    icon: SearchIcon,
  },
  {
    step: '02',
    title: 'Strategic Roadmapping & Architecture',
    desc: 'Defining business value cases, target operating models, and clear phased cutover schedules.',
    icon: Compass,
  },
  {
    step: '03',
    title: 'Process Reengineering & Clean Core',
    desc: 'Standardizing core finance and supply chain workflows while decoupling custom extensions.',
    icon: Workflow,
  },
  {
    step: '04',
    title: 'Data Migration & Hybrid Cutover',
    desc: 'Validated data transformation, automated testing suites, and seamless transition with minimal business interruption.',
    icon: Cloud,
  },
  {
    step: '05',
    title: 'Hypercare & Continuous Innovation',
    desc: 'SLA-backed stabilization, telemetry monitoring, and value realization via continuous platform enhancements.',
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

export const SapServicesSection: React.FC<SapServicesSectionProps> = ({ onContactClick }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Set document title & metadata
  useEffect(() => {
    document.title = 'Enterprise ERP Solutions & Services | Clyptus';
  }, []);

  // 9. FREQUENTLY ASKED QUESTIONS
  const faqs = [
    {
      question: 'Which ERP platforms does Clyptus work on?',
      answer:
        'We work on SAP (S/4HANA, ECC, BRIM, ABAP, FICO, MM, HCM, SD), Oracle (Financials, Procurement, Supply Chain, Manufacturing and Risk, EPM, Project Management, Fusion Cloud ERP) and Microsoft Dynamics 365 (Finance, SCM, Commerce, Project Operations, Business Central, HR).',
    },
    {
      question: 'Can you move us from SAP ECC to SAP S/4HANA?',
      answer:
        'Yes. We assess your current system and custom code, then recommend the right path: new implementation, system conversion or selective transition. We handle code remediation, data migration, testing and go-live support with minimal disruption to your daily operations.',
    },
    {
      question:
        'We use Oracle E-Business Suite or JD Edwards. Can you help us move to Oracle Fusion Cloud ERP?',
      answer:
        'Yes. We run a fit-gap analysis, design your cloud processes, migrate your data and set up integrations with your other systems. After go-live, we also help you test and adopt Oracle’s regular cloud updates.',
    },
    {
      question: 'Which Dynamics 365 product is right for our business?',
      answer:
        'It depends on your size and how you work. Business Central suits small and mid-sized companies, Finance and SCM suit larger operations, Commerce suits retail, Project Operations suits project-based firms and HR suits people teams. We review your processes before recommending.',
    },
    {
      question: 'What support do you offer after go-live?',
      answer:
        'We stay with you after go-live with incident and change handling, enhancements, user training and regular updates for your SAP, Oracle or Dynamics 365 system. You can choose a support plan or add services as your business grows.',
    },
  ];

  return (
    <div className="w-full bg-slate-50 text-slate-900 overflow-x-clip font-sans">
      
      {/* ================= 3-STAGE SCROLLED DIGILAB ENGINE ================= */}
      <DigiLabSapEngine onContactClick={onContactClick} />

      {/* ================= 2. 8 COMPREHENSIVE SAP SERVICES ================= */}
      <SapComprehensiveServicesSection onContactClick={onContactClick} />

      {/* ================= SAP BRIM EXPERTISE & INNOVATION LAB CONSOLE ================= */}
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

      {/* ================= 3. CORE ORACLE CAPABILITIES ================= */}
      <SapCapabilitiesHelixSlider onContactClick={onContactClick} />

      {/* ================= 4. CORE MICROSOFT DYNAMICS 365 CAPABILITIES ================= */}
      <Dynamics365Section onContactClick={onContactClick} />

      {/* Capabilities Across Every Platform Infinite Marquee Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-4 pb-16">
        <CapabilitiesMarqueeBanner />
      </div>

      {/* ================= 3. HOW AN ERP PROGRAMME RUNS (CONNECTED STEPPER PIPELINE) ================= */}
      <ErpProgrammePipeline />

      {/* ================= 4. PROBLEMS WE SOLVE (2-COLUMN DIAGNOSTIC STACK) ================= */}
      <ProblemsWeSolveDiagnostics />

      

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
