import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArcCarouselStaffingServices } from './ArcCarouselStaffingServices';
import { ScreeningProcessCarousel } from './ScreeningProcessCarousel';
import { 
  Users, 
  Globe, 
  ShieldCheck, 
  ArrowRight, 
  ChevronDown, 
  CheckCircle2, 
  Building2, 
  Search, 
  UserCheck, 
  Clock, 
  ExternalLink,
  X
} from 'lucide-react';

interface ItRecruitmentPageProps {
  onNavigateContact?: () => void;
}

// Scroll-Triggered Animated Title Component for IT & SAP Staffing Heading
const ScrollAnimatedHeroTitle: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [0.85, 1.05, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.2, 0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <motion.div
      ref={containerRef}
      style={{ scale, opacity, y }}
      className="w-full max-w-4xl mx-auto mb-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-slate-900 select-none text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-block"
        >
          IT &amp; SAP
        </motion.span>{' '}
        <motion.span
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-block"
        >
          Recruitment and
        </motion.span>{' '}
        <motion.span
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 drop-shadow-sm"
        >
          Staffing Services
        </motion.span>
      </motion.h1>
    </motion.div>
  );
};

export const ItRecruitmentPage: React.FC<ItRecruitmentPageProps> = ({ onNavigateContact }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showCareersModal, setShowCareersModal] = useState<boolean>(false);

  const handleContactClick = () => {
    if (onNavigateContact) {
      onNavigateContact();
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };



  // 12 Demand Areas & Roles (Real Text Grid)
  const rolesWeRecruitFor = [
    {
      id: 'roles-sap',
      area: 'SAP',
      badge: 'ERP & BRIM',
      roles: 'SAP PP/QM, IM-WM, HANA data modeling, PI/PO, SD with DRC, APO, SuccessFactors, SAP with Snowflake, omnichannel testing, HR (mini master, CATS). BRIM roles: solution architects, CC, CI, CM, FI-CA, SOM and RAR consultants, BRIM technical (ABAP).',
    },
    {
      id: 'roles-cloud',
      area: 'Cloud',
      badge: 'INFRA & DEVOPS',
      roles: 'AWS platform engineers (including lead) and application support engineers. Azure full-stack, integration services, Synapse and data engineering. GCP, Spark and Airflow.',
    },
    {
      id: 'roles-data',
      area: 'Data Engineering & Analytics',
      badge: 'BIG DATA',
      roles: 'Data engineers and analysts. Databricks, PySpark, Spark, Airflow, ETL and data warehouse, Quantexa.',
    },
    {
      id: 'roles-ai',
      area: 'AI & GenAI',
      badge: 'EMERGING TECH',
      roles: 'AI developers, GraphRAG, graph databases with Python on AWS.',
    },
    {
      id: 'roles-java',
      area: 'Java & Backend',
      badge: 'BACKEND',
      roles: 'Java developers, Spring Boot, microservices, Java architects.',
    },
    {
      id: 'roles-frontend',
      area: 'Frontend',
      badge: 'UI / UX',
      roles: 'ReactJS developers, frontend engineers, senior frontend engineers.',
    },
    {
      id: 'roles-dotnet',
      area: '.NET & Microsoft',
      badge: 'MICROSOFT',
      roles: '.NET developers with DevOps, senior .NET technologists, Power Platform, CRM technical architects.',
    },
    {
      id: 'roles-salesforce',
      area: 'Salesforce',
      badge: 'CRM PLATFORM',
      roles: 'Salesforce developers, senior developers, Salesforce automation.',
    },
    {
      id: 'roles-testing',
      area: 'Testing & QA',
      badge: 'QUALITY ASSURANCE',
      roles: 'Automation testing, Playwright, AI testing, ETL and data warehouse testing, ServiceNow testing, Rest Assured API automation.',
    },
    {
      id: 'roles-cybersecurity',
      area: 'Cybersecurity',
      badge: 'SEC-OPS',
      roles: 'Cybersecurity L2, FortiGate, Palo Alto, F5, SentinelOne, CIAM developers and operations.',
    },
    {
      id: 'roles-enterprise',
      area: 'Enterprise Platforms',
      badge: 'ENTERPRISE TECH',
      roles: 'ServiceNow, PEGA (certified lead system architect), Camunda, Appian, Planview, OneStream, UKG, Workato.',
    },
    {
      id: 'roles-embedded',
      area: 'Embedded & Networking',
      badge: 'SYSTEMS & CPE',
      roles: 'Embedded developers, Python automation for CPE networking.',
    },
  ];

  // 4 Screening Steps
  const screeningSteps = [
    {
      step: '01',
      title: 'Requirement Deep Dive',
      details: 'Architecture sessions and process mapping, billing volume and SLA analysis, integration landscape review, gap identification and resource specification.',
      icon: Search,
    },
    {
      step: '02',
      title: 'Architect-Level Screening',
      details: 'Scenario-based evaluations, rating, invoicing and FI-CA tests, integration and performance validation. Only top candidates move forward.',
      icon: UserCheck,
    },
    {
      step: '03',
      title: 'Deployment & Transition',
      details: 'Shadowing and knowledge transfer, documentation, and industry templates and accelerators.',
      icon: ShieldCheck,
    },
    {
      step: '04',
      title: 'Continuous Governance',
      details: 'Weekly review meetings, SLA tracking and escalation, monthly performance checks and client satisfaction surveys.',
      icon: Clock,
    },
  ];

  // 4 Delivery Models
  const deliveryModels = [
    {
      title: 'Dedicated Pod',
      badge: '3 - 10 SPECIALISTS',
      desc: '3 to 10 specialists allocated full time as an extension of your delivery team, working under your brand and protocols.',
      highlight: 'Extension of your in-house engineering team',
    },
    {
      title: 'Offshore Managed Service',
      badge: 'SLA-DRIVEN SLA',
      desc: 'Full accountability for defined operations: L2/L3 support, billing execution and enhancements, with SLA-driven quality metrics.',
      highlight: 'End-to-end outcome accountability',
    },
    {
      title: 'Hybrid India and Onsite',
      badge: 'SCALED FLEXIBILITY',
      desc: 'Development, configuration, testing and operational support split between offshore and onsite teams, scaled to the project.',
      highlight: 'Best of cost efficiency & local presence',
    },
    {
      title: 'Individual Niche Consultants',
      badge: 'ON-DEMAND EXPERTS',
      desc: 'On-demand experts in CC, CI and RAR, placed directly into your project on contract or contract-to-hire terms.',
      highlight: 'Rapid insertion into active projects',
    },
  ];

  // 5 FAQs
  const faqList = [
    {
      question: 'Which roles does Clyptus hire for?',
      answer: 'SAP and ERP specialists across all SAP BRIM modules, IT professionals and senior leadership roles.',
    },
    {
      question: 'Do you offer permanent and contract hiring?',
      answer: 'Both, and contract-to-hire as well.',
    },
    {
      question: 'What is RPO?',
      answer: 'Recruitment process outsourcing. Clyptus runs all or part of your hiring process as an extension of your HR team.',
    },
    {
      question: 'Can you build a dedicated team for us?',
      answer: 'Yes. A dedicated pod of 3 to 10 specialists, an offshore managed service team or a hybrid India and onsite team.',
    },
    {
      question: 'Where do you hire?',
      answer: 'We deliver global talent acquisition from India, with offices in India, the UAE and the USA.',
    },
  ];

  return (
    <div className="w-full bg-slate-50 text-slate-900 font-sans selection:bg-sky-500/20 selection:text-sky-800">
      


      {/* ---------------------------------------------------- */}
      {/* HERO SECTION (HOME PAGE COLOUR & GRADIENT SYSTEM)    */}
      {/* ---------------------------------------------------- */}
      <section className="relative w-full pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-6 lg:px-10 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 border-b border-slate-200/80 text-slate-900 select-none">
        {/* Ambient Soft Glows (Home Page Sky & Indigo) */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-400/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-400/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* H1 Main Title (Scroll Triggered Animated Heading) */}
          <ScrollAnimatedHeroTitle />

          {/* Hero Meta Description Paragraph */}
          <p className="text-base sm:text-lg lg:text-xl font-medium text-slate-600 max-w-3xl leading-relaxed mb-8">
            Hire SAP, ERP and IT talent faster. Clyptus offers leadership hiring, contract and permanent staffing, and RPO with global delivery from India and offices in the UAE and USA.
          </p>

          {/* Hero Primary Action CTA Button (Home Page Amber Consultation Style) */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleContactClick}
              className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Talk to Our Hiring Team</span>
              <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* INTRODUCTION SECTION                                 */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-12 bg-white border border-slate-200/90 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100 font-mono text-xs font-extrabold uppercase mb-4">
                OVERVIEW & SCOPE
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
                Accelerated Hiring for SAP, ERP & Senior IT Leaders
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mb-6">
                Clyptus helps enterprises hire SAP and ERP specialists, IT engineers and senior leaders. We run permanent hiring, contract staffing, contract-to-hire and full recruitment process outsourcing, with delivery from India and offices in the UAE and USA.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs font-bold text-slate-700 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-sky-600" />
                  <span>Global Delivery from India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-sky-600" />
                  <span>Offices in UAE & USA</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  <span>Architect-Level Vetting</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-gradient-to-br from-sky-50/60 via-white to-indigo-50/40 border border-sky-100/90 text-slate-900 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-xl transition-all">
              <div>
                <span className="text-xs font-mono font-bold text-sky-600 uppercase tracking-widest block mb-3">
                  ENGAGEMENT MODES
                </span>
                <ul className="space-y-3.5 text-sm font-bold text-slate-900">
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-sky-100 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Permanent Hiring</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-sky-100 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Contract Staffing</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-sky-100 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Contract-to-Hire</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-sky-100 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Full RPO Management</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleContactClick}
                className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:scale-[1.02] text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Request Talent</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

          </div>
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* 3D ARC CAROUSEL STAFFING SERVICES ANIMATION         */}
      {/* ---------------------------------------------------- */}
      <ArcCarouselStaffingServices onNavigateContact={handleContactClick} />




      {/* ---------------------------------------------------- */}
      {/* ROLES WE RECRUIT FOR (REAL TEXT GRID WITH ANCHORS)   */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-slate-100/70 border-y border-slate-200/80 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-sky-400/10 via-indigo-400/10 to-purple-400/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-extrabold text-sky-600 uppercase tracking-widest block mb-2">
              HIRING TEAM DEMAND LIST
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
              Roles We Recruit For
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Explore active technology talent demands sourced directly from our enterprise hiring teams.
            </p>
          </div>

          {/* 12-Area Real Text Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rolesWeRecruitFor.map((item) => (
              <div
                key={item.id}
                id={item.id}
                className="p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-sky-500/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {item.area}
                    </h3>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-extrabold bg-sky-50 text-sky-700 border border-sky-100 uppercase tracking-wider shrink-0">
                      {item.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {item.roles}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* WHO WE HIRE FOR SECTION                              */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto my-4">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-sky-900 via-slate-900 to-indigo-950 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border border-sky-500/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-mono font-extrabold text-sky-400 uppercase tracking-widest block mb-2">
              CLIENT SPECTRUM
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white">
              Who We Hire For
            </h2>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
              We recruit for IT services companies, and also for product companies. We hire permanent staff and contract staff for both.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-4 shrink-0">
            <div className="px-5 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left">
              <span className="text-xs font-mono font-bold text-sky-300 uppercase block mb-0.5">Engagement Types</span>
              <span className="text-sm font-extrabold text-white">Permanent & Contract Staffing</span>
            </div>
            <div className="px-5 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left">
              <span className="text-xs font-mono font-bold text-sky-300 uppercase block mb-0.5">Target Enterprises</span>
              <span className="text-sm font-extrabold text-white">IT Services & Product Companies</span>
            </div>
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* HOW WE SCREEN AND DEPLOY (ANIMATED SCROLL CAROUSEL)  */}
      {/* ---------------------------------------------------- */}
      <ScreeningProcessCarousel steps={screeningSteps} />


      {/* ---------------------------------------------------- */}
      {/* DELIVERY MODELS (4 FLEXIBLE ENGAGEMENTS)             */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-slate-100/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-extrabold text-indigo-600 uppercase tracking-widest block mb-2">
              TAILORED DEPLOYMENT
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
              Flexible Delivery Models
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {deliveryModels.map((model, i) => (
              <div
                key={i}
                className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                      {model.title}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-mono text-[10px] font-extrabold uppercase">
                      {model.badge}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
                    {model.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-700">
                  <span className="flex items-center gap-2 text-sky-600">
                    <CheckCircle2 className="w-4 h-4 text-sky-600" />
                    {model.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* FREQUENTLY ASKED QUESTIONS (ACCORDION)              */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 max-w-4xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-extrabold text-indigo-600 uppercase tracking-widest block mb-2">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Client Hiring FAQs
          </h2>
        </div>

        <div className="space-y-4">
          {faqList.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-extrabold text-slate-900">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-sky-600 text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm text-slate-600 leading-relaxed font-medium animate-in fade-in duration-200 border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* FINAL CTA (HOME PAGE THEME)                          */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 max-w-6xl mx-auto select-none">
        <div className="relative rounded-3xl p-10 sm:p-16 bg-gradient-to-br from-sky-500/10 via-indigo-500/5 to-purple-500/10 border border-sky-200/80 text-center shadow-xl overflow-hidden">
          <div className="absolute top-0 right-1/3 w-[300px] h-[300px] bg-sky-400/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-purple-400/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <span className="text-xs font-mono font-bold text-sky-600 uppercase tracking-widest block mb-3">
              READY TO BUILD YOUR TEAM?
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-6">
              Build your SAP and IT workforce with Clyptus
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
              Contact our talent acquisition leaders today to discuss your permanent, contract, or RPO staffing requirements.
            </p>

            <button
              onClick={handleContactClick}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Talk to Our Hiring Team →</span>
            </button>
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* JOB SEEKER / CAREERS BOTTOM FOOTER BANNER            */}
      {/* ---------------------------------------------------- */}
      <section className="w-full bg-slate-900 text-slate-400 py-8 px-4 text-center border-t border-slate-800">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="text-left">
            <span className="text-white font-bold block mb-0.5">Are you a job seeker looking for opportunities?</span>
            <span>This page is for companies looking to hire talent. Job candidates should visit our careers portal.</span>
          </div>

          <button
            onClick={() => setShowCareersModal(true)}
            className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 font-bold tracking-wider transition-colors border border-slate-700 whitespace-nowrap flex items-center gap-2"
          >
            <span>Visit /careers</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* CAREERS MODAL FOR JOB SEEKERS                        */}
      {/* ---------------------------------------------------- */}
      {showCareersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
            <button
              onClick={() => setShowCareersModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-2">Looking for a Job at Clyptus?</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium mb-6">
              Welcome job seeker! This main page is intended for corporate clients looking to hire talent. To explore open career opportunities and submit your CV, please click below to reach our recruitment team.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowCareersModal(false);
                  handleContactClick();
                }}
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
              >
                <span>Submit CV / Contact HR</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowCareersModal(false)}
                className="w-full py-2.5 text-xs text-slate-500 font-bold hover:text-slate-900"
              >
                Return to Hiring Page
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

