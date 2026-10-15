import React, { useEffect } from 'react';
import { AiGalaxyParticleSection } from './AiGalaxyParticleSection';
import { FullPageParticleBackground } from './FullPageParticleBackground';
import { ScrollAnimatedCard } from './ScrollAnimatedCard';
import {
  BarChart3,
  Workflow,
  Database,
  CheckCircle2,
  Brain,
  Layers,
  Cpu,
  LineChart,
  Bot,
  ShoppingBag,
  Truck,
  HeartPulse,
  Landmark,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface AiServicesPageProps {
  onNavigateContact?: () => void;
}

export const AiServicesPage: React.FC<AiServicesPageProps> = ({ onNavigateContact }) => {
  // Set Page Meta Title & Description
  useEffect(() => {
    document.title = "AI Development & Automation Services | Clyptus";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Clyptus builds generative AI, machine learning and automation solutions for enterprises, from AI assistants to predictive analytics and data platforms.'
      );
    }
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

  // 3 Core AI Services
  const aiServicesList = [
    {
      id: 0,
      number: '01',
      title: 'Data Science & Analytics',
      description: 'Build powerful dashboards and predictive models using ERP and operational data, helping leadership understand the business without waiting for manual reports.',
      icon: BarChart3,
      badge: 'PREDICTIVE MODELS & DASHBOARDS',
    },
    {
      id: 1,
      number: '02',
      title: 'Intelligent Process Automation',
      description: 'Automate repetitive business processes around ERP — including document handling, master-data checks, approvals and reconciliations.',
      icon: Workflow,
      badge: 'ERP WORKFLOW AUTOMATION',
    },
    {
      id: 2,
      number: '03',
      title: 'AI Inside SAP S/4HANA',
      description: 'Put machine learning and advanced analytics within SAP S/4HANA to work on real business processes and generate smarter operational insights.',
      icon: Database,
      badge: 'EMBEDDED SAP MACHINE LEARNING',
    },
  ];

  // Comprehensive Services Catalog Categories
  const generativeAiServices = [
    'Generative AI solutions',
    'AI assistants & copilots',
    'Intelligent process automation',
    'Machine learning & predictive analytics',
    'Conversational AI',
    'AI-powered decision support',
  ];

  const dataServicesList = [
    'Data engineering',
    'Modern data platforms',
    'Business intelligence & reporting',
    'Databricks & Snowflake solutions',
    'Advanced analytics',
    'Data visualization & insights',
  ];

  const modelTypesList = [
    'Natural language processing',
    'Computer vision',
    'Predictive analytics',
    'Generative AI',
    'Recommendation systems',
    'Time series forecasting',
  ];

  // How an AI Project Runs (5 Delivery Steps)
  const projectSteps = [
    {
      step: '01',
      title: 'Data-driven foundation',
      desc: 'High-quality data engineering for accurate insight.',
      icon: Database,
    },
    {
      step: '02',
      title: 'Model engineering',
      desc: 'State-of-the-art algorithms and architectures.',
      icon: Cpu,
    },
    {
      step: '03',
      title: 'Training and validation',
      desc: 'Rigorous testing for reliability and performance.',
      icon: ShieldCheck,
    },
    {
      step: '04',
      title: 'Deployment at scale',
      desc: 'MLOps for smooth and secure deployment.',
      icon: Layers,
    },
    {
      step: '05',
      title: 'Continuous learning',
      desc: 'Models that evolve with your business.',
      icon: RefreshCw,
    },
  ];

  // Innovation Lab (Exploring Tomorrow - R&D Research Focus)
  const innovationLabAreas = [
    { name: 'AI Agents', tag: 'Autonomous Multi-Agent Swarms' },
    { name: 'Digital Twins', tag: 'Real-time Process Simulation' },
    { name: 'Computer Vision', tag: 'Visual Quality & Safety Inspection' },
    { name: 'RPA + GenAI', tag: 'Hyper-automated Workflows' },
    { name: 'Generative AI Architecture', tag: 'Enterprise RAG & Fine-tuning' },
    { name: 'Industry 4.0', tag: 'Smart Manufacturing Analytics' },
  ];

  // Industry Project Lines Case Studies
  const industryProjects = [
    {
      sector: 'Retail',
      title: 'AI-Powered Demand Forecasting',
      desc: 'Machine learning prediction models optimizing inventory levels and order planning across omni-channel fulfillment nodes.',
      icon: ShoppingBag,
      color: 'sky',
    },
    {
      sector: 'Logistics',
      title: 'Intelligent Automation with AI',
      desc: 'Automate invoice processing, shipping manifest validation, and route dispatch optimization with zero manual bottlenecks.',
      icon: Truck,
      color: 'indigo',
    },
    {
      sector: 'Healthcare',
      title: 'Data Lake & Analytics Platform',
      desc: 'Unified patient and operational data platforms powering compliant clinical insights and resource forecasting.',
      icon: HeartPulse,
      color: 'emerald',
    },
    {
      sector: 'Banking',
      title: 'Data Warehouse Modernization',
      desc: 'High-throughput cloud warehouse architectures delivering real-time fraud detection and automated regulatory reporting.',
      icon: Landmark,
      color: 'purple',
    },
  ];

  // FAQ Items
  const faqList = [
    {
      question: 'Do you build AI from scratch or use existing platforms?',
      answer: 'Both. Where a proven analytics or automation platform solves the problem we configure it, because it is faster and cheaper. Where nothing fits, we build.',
    },
    {
      question: 'Can you work with our SAP or ERP data?',
      answer: 'Yes, and that is usually the starting point. Our consultants know the underlying ERP data model, so the analysis reflects how the business actually runs.',
    },
    {
      question: 'What does a first engagement look like?',
      answer: 'A short discovery on a single use case with a defined output at the end, so you can judge the value before committing to a larger programme.',
    },
    {
      question: 'How do you handle our data and confidentiality?',
      answer: 'Work is done under NDA, with access limited to the named project team and data handled according to the terms agreed in the contract.',
    },
  ];

  return (
    <div className="relative w-full bg-white text-slate-900 font-sans selection:bg-sky-500/20 selection:text-sky-800">
      {/* FULL-PAGE DISPERSED PARTICLES BACKGROUND */}
      <FullPageParticleBackground />

      {/* ---------------------------------------------------- */}
      {/* MONOCHROME 4K MINIMALIST SPIRAL GALAXY GRAPHIC      */}
      {/* ---------------------------------------------------- */}
      <AiGalaxyParticleSection onNavigateContact={handleContactClick} />




      {/* ---------------------------------------------------- */}
      {/* 3 CORE AI PRACTICE PILLARS - UNPINNED GRID           */}
      {/* ---------------------------------------------------- */}
      <section className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto overflow-hidden bg-transparent">
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Core Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600">AI Capabilities</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Explore our core practices designed to turn raw operational data into autonomous enterprise intelligence.
          </p>
        </div>

        {/* 3 Interactive Cards Grid (Clean 3-Column Layout with Scroll IN/OUT Animation) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {aiServicesList.map((srv, idx) => {
            const IconComp = srv.icon;

            let iconClasses = 'bg-sky-50 border-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white';
            let hoverTitle = 'group-hover:text-sky-600';
            let hoverBorder = 'hover:border-sky-400';

            if (idx === 1) {
              iconClasses = 'bg-indigo-50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white';
              hoverTitle = 'group-hover:text-indigo-600';
              hoverBorder = 'hover:border-indigo-400';
            } else if (idx === 2) {
              iconClasses = 'bg-purple-50 border-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white';
              hoverTitle = 'group-hover:text-purple-600';
              hoverBorder = 'hover:border-purple-400';
            }

            return (
              <ScrollAnimatedCard
                key={srv.number}
                staggerIndex={idx}
                className={`group relative z-10 p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-2 ${hoverBorder} transition-all duration-300 flex flex-col justify-between overflow-hidden`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono tracking-tighter text-slate-300 group-hover:text-slate-900 transition-colors">
                      {srv.number}
                    </span>
                  </div>

                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-xs ${iconClasses}`}>
                    <IconComp className="w-7 h-7 stroke-[2]" />
                  </div>

                  <h3 className={`text-2xl font-black text-slate-900 tracking-tight mb-3 transition-colors ${hoverTitle}`}>
                    {srv.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
                    {srv.description}
                  </p>
                </div>
              </ScrollAnimatedCard>
            );
          })}
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* FULL SERVICES & DATA PLATFORMS CATALOG               */}
      {/* ---------------------------------------------------- */}
      <section className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
              AI & Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600">Platform Offerings</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              From model engineering to modern cloud data infrastructure (Databricks & Snowflake), we cover the entire enterprise AI lifecyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Category 1: Generative AI & Automation */}
            <ScrollAnimatedCard 
              staggerIndex={0}
              className="relative z-10 p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-2 hover:border-sky-400 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-6">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">AI Services & Solutions</h3>
                <ul className="space-y-3">
                  {generativeAiServices.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimatedCard>

            {/* Category 2: Data Services & Platforms */}
            <ScrollAnimatedCard 
              staggerIndex={1}
              className="relative z-10 p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-2 hover:border-indigo-400 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-6">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">Data Services Behind the Models</h3>
                <ul className="space-y-3">
                  {dataServicesList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimatedCard>

            {/* Category 3: Model Types */}
            <ScrollAnimatedCard 
              staggerIndex={2}
              className="relative z-10 p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-2 hover:border-purple-400 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-6">
                  <LineChart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">Model Architectures</h3>
                <ul className="space-y-3">
                  {modelTypesList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimatedCard>
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* HOW AN AI PROJECT RUNS (5 DELIVERY STAGES)           */}
      {/* ---------------------------------------------------- */}
      <section className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto overflow-hidden bg-transparent">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-extrabold text-sky-600 uppercase tracking-widest block mb-2">
            DELIVERY METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            How an <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600">AI Project Runs</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            A battle-tested 5-stage engineering lifecycle designed for accuracy, reliability, and enterprise scale.
          </p>
        </div>

        {/* 5 Stage Connected Grid with Scroll-Down Staggered Animation */}
        <div className="relative z-10">
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-sky-300 via-indigo-300 to-purple-300 -translate-y-6 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
            {projectSteps.map((st, idx) => {
              const StepIcon = st.icon;

              // Vibrant 5-step palette
              const stepStyles = [
                { badge: 'bg-sky-50 text-sky-600 border-sky-100 group-hover:bg-sky-600 group-hover:text-white', iconHover: 'group-hover:text-sky-600', hoverBorder: 'hover:border-sky-400', bar: 'from-sky-500 to-sky-600' },
                { badge: 'bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white', iconHover: 'group-hover:text-indigo-600', hoverBorder: 'hover:border-indigo-400', bar: 'from-indigo-500 to-indigo-600' },
                { badge: 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white', iconHover: 'group-hover:text-emerald-600', hoverBorder: 'hover:border-emerald-400', bar: 'from-emerald-500 to-emerald-600' },
                { badge: 'bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-600 group-hover:text-white', iconHover: 'group-hover:text-purple-600', hoverBorder: 'hover:border-purple-400', bar: 'from-purple-500 to-purple-600' },
                { badge: 'bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-600 group-hover:text-white', iconHover: 'group-hover:text-amber-600', hoverBorder: 'hover:border-amber-400', bar: 'from-amber-500 to-amber-600' },
              ][idx];

              return (
                <ScrollAnimatedCard
                  key={st.step}
                  staggerIndex={idx}
                  className={`group relative z-10 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between transition-all duration-300 transform ${stepStyles.hoverBorder} hover:shadow-xl hover:-translate-y-2 cursor-pointer`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`w-9 h-9 rounded-xl border text-xs font-black flex items-center justify-center font-mono group-hover:scale-110 transition-all duration-300 ${stepStyles.badge}`}>
                        {st.step}
                      </span>
                      <StepIcon className={`w-4 h-4 text-slate-400 ${stepStyles.iconHover} group-hover:rotate-12 transition-all duration-300`} />
                    </div>
                    <h3 className={`text-base font-extrabold text-slate-900 mb-2 ${stepStyles.iconHover} transition-colors`}>
                      {st.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {st.desc}
                    </p>
                  </div>

                  <div className="w-full h-1 rounded-full bg-slate-100 mt-5 overflow-hidden">
                    <div className={`w-0 group-hover:w-full h-full bg-gradient-to-r ${stepStyles.bar} transition-all duration-500 ease-out`} />
                  </div>
                </ScrollAnimatedCard>
              );
            })}
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* INNOVATION LAB (EXPLORING TOMORROW - R&D RESEARCH)   */}
      {/* ---------------------------------------------------- */}
      <section className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-transparent text-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
                Exploring <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500">Tomorrow</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-medium">
                Active R&D focus areas and emerging technology evaluations currently undergoing internal validation prior to client delivery rollout.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            {innovationLabAreas.map((area, idx) => (
              <ScrollAnimatedCard
                key={idx}
                staggerIndex={idx}
                className="relative z-10 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-purple-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-1 group-hover:text-purple-600 transition-colors">{area.name}</h3>
                  <span className="text-[10px] font-mono text-slate-500 block">{area.tag}</span>
                </div>
              </ScrollAnimatedCard>
            ))}
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* VERIFIED SECTOR CASE STUDIES (PROJECT LINES)          */}
      {/* ---------------------------------------------------- */}
      <section className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto bg-transparent">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-extrabold text-sky-600 uppercase tracking-widest block mb-2">
            INDUSTRY SOLUTIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Verified Project Lines by <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600">Sector</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {industryProjects.map((proj, idx) => {
            const SectorIcon = proj.icon;

            const sectorStyles = [
              { badge: 'bg-sky-50 border-sky-100 text-sky-700', hoverBorder: 'hover:border-sky-400', hoverIcon: 'group-hover:text-sky-600', textAccent: 'text-sky-600' },
              { badge: 'bg-indigo-50 border-indigo-100 text-indigo-700', hoverBorder: 'hover:border-indigo-400', hoverIcon: 'group-hover:text-indigo-600', textAccent: 'text-indigo-600' },
              { badge: 'bg-emerald-50 border-emerald-100 text-emerald-700', hoverBorder: 'hover:border-emerald-400', hoverIcon: 'group-hover:text-emerald-600', textAccent: 'text-emerald-600' },
              { badge: 'bg-purple-50 border-purple-100 text-purple-700', hoverBorder: 'hover:border-purple-400', hoverIcon: 'group-hover:text-purple-600', textAccent: 'text-purple-600' },
            ][idx];

            return (
              <ScrollAnimatedCard
                key={idx}
                staggerIndex={idx}
                className={`relative z-10 p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${sectorStyles.hoverBorder}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`inline-block px-3 py-1 rounded-full border text-[10px] font-mono font-extrabold tracking-wider uppercase ${sectorStyles.badge}`}>
                      {proj.sector}
                    </span>
                    <SectorIcon className={`w-5 h-5 text-slate-400 ${sectorStyles.hoverIcon} transition-colors`} />
                  </div>

                  <h3 className={`text-xl font-black text-slate-900 tracking-tight mb-3 ${sectorStyles.hoverIcon} transition-colors`}>
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6">
                    {proj.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-bold text-slate-500">
                  <span className={`flex items-center gap-1.5 ${sectorStyles.textAccent}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${sectorStyles.textAccent}`} />
                    VERIFIED IMPLEMENTATION
                  </span>
                </div>
              </ScrollAnimatedCard>
            );
          })}
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* CLYPTUS BRANDMARK BACKGROUND PARTICLE ASSEMBLE STAGE */}
      {/* ---------------------------------------------------- */}
      <section
        id="clyptus-logo-assemble-target"
        className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto overflow-hidden bg-transparent select-none text-center"
      >
        {/* Target Stage Box where background particles coalesce into the official Clyptus logo */}
        <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] mx-auto flex items-center justify-center pointer-events-auto" />
      </section>


      {/* ---------------------------------------------------- */}
      {/* FREQUENTLY ASKED QUESTIONS                           */}
      {/* ---------------------------------------------------- */}
      <section className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-10 max-w-6xl mx-auto bg-transparent">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-extrabold text-sky-600 uppercase tracking-widest block mb-2">
            CLEAR ANSWERS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600">Questions</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {faqList.map((faq, idx) => (
            <ScrollAnimatedCard
              key={idx}
              staggerIndex={idx % 2}
              className="group relative z-10 p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-4 group-hover:text-sky-600 transition-colors">
                  {faq.question}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {faq.answer}
                </p>
              </div>
            </ScrollAnimatedCard>
          ))}
        </div>
      </section>
    </div>
  );
};
