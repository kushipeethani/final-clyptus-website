import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Layers, 
  RefreshCw, 
  Code2, 
  Cloud, 
  ShieldCheck, 
  ArrowRight, 
  ChevronDown, 
  CheckCircle2, 
  Factory, 
  Flame, 
  Briefcase 
} from 'lucide-react';

interface SapServicesPageProps {
  onNavigateContact?: () => void;
}

export const SapServicesPage: React.FC<SapServicesPageProps> = ({ onNavigateContact }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [transformationProgress, setTransformationProgress] = useState<number>(0);
  const transformSectionRef = useRef<HTMLDivElement>(null);

  // Scroll listener to animate SVG transformation path progress
  useEffect(() => {
    const handleScroll = () => {
      if (!transformSectionRef.current) return;
      const rect = transformSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the section has scrolled through viewport
      const totalDist = rect.height + windowHeight;
      const currentPos = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentPos / totalDist));
      setTransformationProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // 6 End-to-End SAP Services
  const sapServicesList = [
    {
      number: '01',
      title: 'S/4HANA Roadmap & Strategy',
      description: 'Assess the current landscape, build the business case and sequence the move.',
      icon: Compass,
      gradient: 'from-sky-500/10 via-indigo-500/5 to-transparent',
      accentColor: 'text-sky-600',
      borderColor: 'hover:border-sky-500/40',
      glowColor: 'hover:shadow-[0_15px_35px_rgba(2,132,199,0.12)]',
    },
    {
      number: '02',
      title: 'S/4HANA Implementation',
      description: 'Greenfield implementation across core finance, logistics and supply chain processes.',
      icon: Layers,
      gradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
      accentColor: 'text-blue-600',
      borderColor: 'hover:border-blue-500/40',
      glowColor: 'hover:shadow-[0_15px_35px_rgba(37,99,235,0.12)]',
    },
    {
      number: '03',
      title: 'S/4HANA Conversion',
      description: 'Brownfield conversion from ECC, including readiness checks and custom-code remediation.',
      icon: RefreshCw,
      gradient: 'from-indigo-500/10 via-purple-500/5 to-transparent',
      accentColor: 'text-indigo-600',
      borderColor: 'hover:border-indigo-500/40',
      glowColor: 'hover:shadow-[0_15px_35px_rgba(99,102,241,0.12)]',
    },
    {
      number: '04',
      title: 'S/4HANA Development',
      description: 'ABAP and Fiori development, extensions and custom reports on the new stack.',
      icon: Code2,
      gradient: 'from-sky-500/10 via-blue-500/5 to-transparent',
      accentColor: 'text-sky-600',
      borderColor: 'hover:border-sky-500/40',
      glowColor: 'hover:shadow-[0_15px_35px_rgba(2,132,199,0.12)]',
    },
    {
      number: '05',
      title: 'RISE with SAP',
      description: 'Advising on the cloud move SAP packages as RISE, and delivering the migration behind it.',
      icon: Cloud,
      gradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
      accentColor: 'text-blue-600',
      borderColor: 'hover:border-blue-500/40',
      glowColor: 'hover:shadow-[0_15px_35px_rgba(37,99,235,0.12)]',
    },
    {
      number: '06',
      title: 'Application Support (AMS)',
      description: 'Post go-live support: incidents, enhancements and release updates.',
      icon: ShieldCheck,
      gradient: 'from-purple-500/10 via-sky-500/5 to-transparent',
      accentColor: 'text-purple-600',
      borderColor: 'hover:border-purple-500/40',
      glowColor: 'hover:shadow-[0_15px_35px_rgba(168,85,247,0.12)]',
    },
  ];

  // 5 Process Lifecycle Stages
  const transformationStages = [
    { step: '01', title: 'Strategy', desc: 'Landscape assessment, scope definition & migration roadmap' },
    { step: '02', title: 'Migration', desc: 'Data cleansing, readiness checks & cloud architecture prep' },
    { step: '03', title: 'Implementation', desc: 'Core S/4HANA deployment & business process configuration' },
    { step: '04', title: 'Development', desc: 'ABAP/Fiori extensions, integrations & custom code remediation' },
    { step: '05', title: 'Support', desc: 'Hypercare transition, SLA-driven AMS & release updates' },
  ];

  // Selected SAP & Analytics Engagements Projects
  const sapProjects = [
    {
      clientName: 'Hume Cement',
      locationIndustry: 'Malaysia · Manufacturing',
      description: 'SAP migration delivered close to completion in record time, with a joint project-manager and technical-lead team supported by senior consultants.',
      badge: 'MANUFACTURING SAP MIGRATION',
    },
    {
      clientName: 'Sapura Energy Berhad',
      locationIndustry: 'Malaysia · Energy services',
      description: 'High-volume ERP data was hard to analyse. Clyptus assessed the need, recommended Zoho Analytics and delivered dashboards with live filtering.',
      badge: 'ENERGY ERP ANALYTICS',
    },
    {
      clientName: 'SAP Implementation',
      locationIndustry: 'Client name withheld',
      description: 'Full SAP implementation delivered successfully; the client singled out project communication and attention to detail.',
      badge: 'ENTERPRISE SAP IMPLEMENTATION',
    },
  ];

  // Supported Industries (Strictly 3)
  const supportedIndustries = [
    {
      title: 'Manufacturing & Building Materials',
      icon: Factory,
      description: 'Streamlined supply chain logistics, shop-floor integration, asset management and core finance optimization.',
    },
    {
      title: 'Energy & Oil & Gas Services',
      icon: Flame,
      description: 'High-volume operational analytics, complex project accounting, Joint Venture Accounting (JVA) and asset maintenance.',
    },
    {
      title: 'Professional & Management Consulting',
      icon: Briefcase,
      description: 'Resource management, project billing automation, global workforce analytics and client engagement accounting.',
    },
  ];

  // FAQ Items
  const faqList = [
    {
      question: 'Is Clyptus an SAP partner?',
      answer: "Yes. Clyptus is a Silver SAP partner, and we align our delivery approach to SAP's current product and release roadmap on every implementation, conversion and support engagement.",
    },
    {
      question: 'Can you move us from SAP ECC to S/4HANA?',
      answer: 'Yes. We handle brownfield conversions from ECC as well as greenfield S/4HANA implementations, starting with a readiness assessment and a roadmap so you know the scope before you commit.',
    },
    {
      question: 'What is RISE with SAP, and do you support it?',
      answer: "RISE with SAP is SAP's packaged route to running S/4HANA in the cloud. We advise on whether it fits your landscape and deliver the migration and process change that follow.",
    },
    {
      question: 'Do you support the system after go-live?',
      answer: 'Yes. We provide application management and support covering incidents, enhancements and release updates, under a response model agreed with you up front.',
    },
  ];

  return (
    <div className="w-full bg-slate-50 text-slate-900 font-sans selection:bg-sky-500/20 selection:text-sky-800">
      
      {/* ---------------------------------------------------- */}
      {/* HERO SECTION (HOME PAGE COLOUR SYSTEM)               */}
      {/* ---------------------------------------------------- */}
      <section className="relative w-full pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-6 lg:px-10 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 border-b border-slate-200/80 text-slate-900 select-none">
        {/* Subtle Ambient Soft Glows (Home Page Sky & Indigo) */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* SAP Silver Partner Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 shadow-xs mb-6 animate-in fade-in slide-in-from-bottom-2">
            <span className="w-2 h-2 rounded-full bg-sky-600 animate-ping" />
            <span className="text-xs font-mono font-extrabold tracking-widest uppercase text-sky-700">
              ERP SERVICES <span className="text-sky-500 mx-1.5">•</span> SILVER PARTNER
            </span>
          </div>

          {/* Hero Headline (Home Page Sky -> Indigo -> Purple Gradient) */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-slate-900 mb-6 max-w-4xl">
            Plan, move and run <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600">SAP S/4HANA</span> — with an SAP Silver Partner.
          </h1>

          {/* Hero Description */}
          <p className="text-base sm:text-lg lg:text-xl font-medium text-slate-600 max-w-3xl leading-relaxed mb-10">
            Architecting resilient, future-ready enterprise systems. We deliver end-to-end SAP S/4HANA migrations, custom BTP innovations, and full-lifecycle ERP support for global enterprises.
          </p>

          {/* Hero CTA Button (Home Page Warm Gold / Amber Consultation Style) */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleContactClick}
              className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Talk to an Expert</span>
              <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* END-TO-END SAP S/4HANA SERVICES (6 CARDS)           */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-extrabold text-sky-600 uppercase tracking-widest block mb-2">
            PRACTICE CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            End-to-End ERP Services
          </h2>
        </div>

        {/* 6 Premium Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sapServicesList.map((srv) => {
            const IconComp = srv.icon;
            return (
              <div
                key={srv.number}
                className={`group relative p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] ${srv.borderColor} ${srv.glowColor} flex flex-col justify-between overflow-hidden`}
              >
                {/* Subtle Card Background Gradient Hover Tint */}
                <div className={`absolute inset-0 bg-gradient-to-br ${srv.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl`} />

                <div className="relative z-10">
                  {/* Card Header: Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono tracking-tighter text-slate-300 group-hover:text-slate-900 transition-colors">
                      {srv.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                      <IconComp className="w-6 h-6 stroke-[2]" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-3 group-hover:text-sky-600 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
                    {srv.description}
                  </p>
                </div>

                {/* Explore Service Link */}
                <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold tracking-wider uppercase ${srv.accentColor} group-hover:translate-x-1 transition-transform flex items-center gap-1.5`}>
                    Explore Service →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* SAP TRANSFORMATION ANIMATION (HOME PAGE GRADIENT)    */}
      {/* ---------------------------------------------------- */}
      <section ref={transformSectionRef} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-slate-100/70 border-y border-slate-200/80 text-slate-900 overflow-hidden relative">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-sky-400/10 to-indigo-400/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-extrabold text-sky-600 uppercase tracking-widest block mb-2">
              METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
              SAP Transformation Lifecycle
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              A structured, transparent pathway ensuring operational continuity from initial strategy through post-implementation support.
            </p>
          </div>

          {/* Process Diagram with Animated Connected Path (Desktop Horizontal / Mobile Vertical) */}
          <div className="relative my-8">
            
            {/* SVG Connector Path */}
            <svg
              className="hidden lg:block absolute top-12 left-0 w-full h-16 pointer-events-none overflow-visible z-0"
              viewBox="0 0 1000 60"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Background Grey Path */}
              <path
                d="M 50 30 Q 250 10, 450 30 T 850 30 L 950 30"
                stroke="rgba(15,23,42,0.12)"
                strokeWidth="4"
                strokeDasharray="8 8"
              />
              {/* Animated Clyptus Sky-Indigo-Purple Glowing Path */}
              <path
                d="M 50 30 Q 250 10, 450 30 T 850 30 L 950 30"
                stroke="url(#homeGradient)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset={1000 - Math.min(1000, transformationProgress * 1400)}
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="homeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="50%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </defs>
            </svg>

            {/* Stage Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
              {transformationStages.map((stg, i) => (
                <div
                  key={stg.step}
                  className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-500/50 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs font-black flex items-center justify-center shadow-xs">
                        {stg.step}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                        STAGE {i + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                      {stg.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {stg.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* SELECTED SAP & ANALYTICS ENGAGEMENTS (PROJECTS)     */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-extrabold text-indigo-600 uppercase tracking-widest block mb-2">
            PROVEN TRACK RECORD
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Selected SAP & Analytics Engagements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sapProjects.map((proj, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-[10px] font-mono font-extrabold text-sky-700 tracking-wider uppercase mb-6">
                  {proj.badge}
                </span>

                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-1 group-hover:text-sky-600 transition-colors">
                  {proj.clientName}
                </h3>
                <p className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-5">
                  {proj.locationIndustry}
                </p>

                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  "{proj.description}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-500">
                <span className="flex items-center gap-1.5 text-sky-600">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  VERIFIED ENGAGEMENT
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* INDUSTRIES WE SUPPORT (STRICTLY 3)                  */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-10 bg-slate-100/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-extrabold text-sky-600 uppercase tracking-widest block mb-2">
              SECTOR EXPERTISE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
              Industries We Support
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportedIndustries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <div
                  key={i}
                  className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 stroke-[2]" />
                    </div>

                    <h3 className="text-xl font-black text-slate-900 mb-3">
                      {ind.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      {ind.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* FREQUENTLY ASKED QUESTIONS (ACCORDION)              */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 max-w-4xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-extrabold text-indigo-600 uppercase tracking-widest block mb-2">
            CLEAR ANSWERS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Frequently Asked Questions
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
      </section>    </div>
  );
};
