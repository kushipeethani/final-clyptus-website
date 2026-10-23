import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArcCarouselStaffingServices } from './ArcCarouselStaffingServices';
import { ScreeningProcessCarousel } from './ScreeningProcessCarousel';
import {
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Search,
  UserCheck,
  Clock
} from 'lucide-react';
import { GLSLHills } from './ui/glsl-hills';

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
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-slate-900 select-none text-center"
      >
        <motion.span
          initial={{ opacity: 30, y: 170 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-block"
        >
          Talent
        </motion.span>{' '}
        <motion.span
          initial={{ opacity: 30, y: 170 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-block"
        >
          Acquisition &amp;
        </motion.span>{' '}
        <motion.span
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 drop-shadow-sm"
        >
          Workforce Solutions
        </motion.span>
      </motion.h1>
    </motion.div>
  );
};

export const ItRecruitmentPage: React.FC<ItRecruitmentPageProps> = ({ onNavigateContact }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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
      area: 'AI & Data',
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
      details: 'Architecture sessions and process mapping, billing volume and SLA analysis, integration landscape review, gap identification and talent specification.',
      icon: Search,
    },
    {
      step: '02',
      title: 'Architect-Level Screening',
      details: 'Scenario-based evaluations, rating, invoicing and FI-CA tests, integration and performance validation. Only top professionals move forward.',
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
      title: 'Specialist Talent Deployment',
      badge: 'ON-DEMAND EXPERTS',
      desc: 'On-demand experts in CC, CI and RAR, deployed directly into your project on contract or contract-to-hire terms.',
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
    <div className="w-full bg-slate-50 text-slate-900 font-sans selection:bg-blue-500/20 selection:text-blue-900">



      {/* ---------------------------------------------------- */}
      {/* HERO SECTION (SAP BRAND COLOUR & GRADIENT SYSTEM)    */}
      {/* ---------------------------------------------------- */}
      <section className="relative w-full min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-68px)] flex flex-col justify-center items-center py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 border-b border-slate-200/80 text-slate-900 select-none">
        {/* Ambient Soft Glows (SAP Blue & Orange Palette) */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-400/15 rounded-full blur-[140px] pointer-events-none" />

        {/* 3D Wireframe GLSL Hills Terrain Backdrop */}
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-190 mix-blend-multiply overflow-hidden">
          <GLSLHills width="100%" height="100%" cameraZ={125} speed={0.3} className="w-full h-full" />
        </div>

        <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center my-auto">

          {/* H1 Main Title (Scroll Triggered Animated Heading) */}
          <ScrollAnimatedHeroTitle />

          {/* Hero Meta Description Paragraph */}
          <p className="text-base sm:text-lg lg:text-xl font-medium text-slate-600 max-w-3xl leading-relaxed mb-8">
            Onboard SAP, ERP and IT talent faster. Clyptus offers executive search, flexible and permanent talent acquisition, and RPO with global delivery from India and offices in the UAE and USA.
          </p>

          {/* Hero Primary Action CTA Button (SAP Page Blue-Indigo-Orange Gradient Style) */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleContactClick}
              className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Talk to an Expert</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
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
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
                Accelerated Hiring for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                  SAP, ERP &amp; Senior IT Leaders
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                Clyptus helps enterprises deploy SAP and ERP specialists, IT engineers and senior leaders. We deliver flexible and permanent talent acquisition, contract-to-hire and full recruitment process outsourcing, with global delivery from India and offices in the UAE and USA.
              </p>
            </div>

            <div className="lg:col-span-4 bg-gradient-to-br from-blue-50/60 via-white to-orange-50/40 border border-blue-100/90 text-slate-900 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-xl transition-all">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-3">
                  ENGAGEMENT MODES
                </span>
                <ul className="space-y-3.5 text-sm font-bold text-slate-900">
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-100 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Permanent Hiring</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-100 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Flexible Talent Acquisition</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-100 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Contract-to-Hire</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-100 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Full RPO Management</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleContactClick}
                className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 hover:scale-[1.02] text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
              >
                <span>Talk to an Expert</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-orange-400/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
              Roles We{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                Recruit For
              </span>
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
                className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.area}
                    </h3>
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
        <div className="p-8 sm:p-12 rounded-3xl bg-white text-slate-900 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border border-slate-200/90">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-mono font-extrabold text-blue-600 uppercase tracking-widest block mb-2">
              CLIENT SPECTRUM
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-slate-900">
              Who We{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                Hire For
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              We deploy talent for IT services companies and product engineering companies, delivering both flexible and permanent talent solutions.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-4 shrink-0">
            <div className="px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-left">
              <span className="text-xs font-mono font-bold text-blue-600 uppercase block mb-0.5">Engagement Types</span>
              <span className="text-sm font-extrabold text-slate-900">Flexible & Permanent Talent Acquisition</span>
            </div>
            <div className="px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-left">
              <span className="text-xs font-mono font-bold text-orange-600 uppercase block mb-0.5">Target Enterprises</span>
              <span className="text-sm font-extrabold text-slate-900">IT Services & Product Companies</span>
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
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
              Flexible{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                Delivery Models
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {deliveryModels.map((model, i) => (
              <div
                key={i}
                className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {model.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
                    {model.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-700">
                  <span className="flex items-center gap-2 text-blue-600">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
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
          <span className="text-xs font-mono font-extrabold text-blue-600 uppercase tracking-widest block mb-2">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Client Hiring{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
              FAQs
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqList.map((faq, idx) => {
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
                  <span className="text-base sm:text-lg font-extrabold text-slate-900">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-blue-600 text-white' : ''}`}>
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
      {/* FINAL CTA (SAP SIGNATURE THEME)                      */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 max-w-6xl mx-auto select-none">
        <div className="relative rounded-3xl p-10 sm:p-16 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-orange-500/10 border border-blue-200/80 text-center shadow-xl overflow-hidden">
          <div className="absolute top-0 right-1/3 w-[300px] h-[300px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-orange-400/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-3">
              READY TO BUILD YOUR TEAM?
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-6">
              Build your SAP and IT workforce with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                Clyptus
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
              Contact our talent acquisition leaders today to discuss your flexible, permanent, or RPO talent requirements.
            </p>

            <button
              onClick={handleContactClick}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Talk to an Expert</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>


    </div>
  );
};

