import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, 
  Check 
} from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// Component that renders text with letters that float and move randomly on hover
interface RandomMovingTextProps {
  text: string;
  isHovered: boolean;
  hoverNonce: number;
  className?: string;
  intensity?: 'title' | 'body';
}

const RandomMovingText: React.FC<RandomMovingTextProps> = ({
  text,
  isHovered,
  hoverNonce,
  className = '',
  intensity = 'title',
}) => {
  const letters = Array.from(text);
  const maxOffset = intensity === 'title' ? 8 : 4;
  const maxRot = intensity === 'title' ? 16 : 8;

  return (
    <span className={className}>
      {letters.map((char, i) => {
        if (char === ' ') {
          return <span key={i}> </span>;
        }

        const seed1 = (i + 1) * 37 + hoverNonce * 19;
        const seed2 = (i + 1) * 73 + hoverNonce * 41;
        const seed3 = (i + 1) * 109 + hoverNonce * 67;

        const x1 = Math.sin(seed1) * maxOffset;
        const x2 = Math.cos(seed2) * (maxOffset * 0.9);
        const y1 = Math.cos(seed1) * maxOffset;
        const y2 = Math.sin(seed3) * (maxOffset * 0.9);
        const rot1 = Math.sin(seed2) * maxRot;
        const rot2 = Math.cos(seed3) * maxRot;

        return (
          <motion.span
            key={`${i}-${hoverNonce}`}
            className="inline-block will-change-transform"
            initial={{ x: 0, y: 0, rotate: 0 }}
            animate={
              isHovered
                ? {
                    x: [0, x1, x2 * 0.3, 0],
                    y: [0, y1, y2 * 0.3, 0],
                    rotate: [0, rot1, rot2 * 0.25, 0],
                  }
                : { x: 0, y: 0, rotate: 0 }
            }
            transition={{
              duration: 0.6,
              delay: (i % 10) * 0.015,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
};

// Product Card with uniform sizing and random letter movement on hover
interface ProductCardProps {
  product: {
    id: string;
    title: string;
    desc: string;
  };
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverNonce, setHoverNonce] = useState(1);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });

  const handleMouseEnter = () => {
    setHoverNonce((prev) => prev + 1);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={shouldReduceMotion ? { opacity: 0, y: 20 } : { opacity: 0, rotateY: index % 2 === 0 ? -75 : 75, scale: 0.9 }}
      animate={
        isInView
          ? shouldReduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 1, rotateY: 0, scale: 1 }
          : shouldReduceMotion
            ? { opacity: 0, y: 20 }
            : { opacity: 0, rotateY: index % 2 === 0 ? -75 : 75, scale: 0.9 }
      }
      transition={{ duration: 0.75, delay: (index % 4) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: 'center' }}
      className="relative rounded-3xl p-7 bg-white hover:bg-slate-50/80 text-slate-900 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-blue-300 transition-[background-color,border-color,box-shadow] duration-300 flex flex-col justify-between group cursor-pointer"
    >
      <div>
        <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2.5 text-slate-900 group-hover:text-blue-600 transition-colors">
          <RandomMovingText
            text={product.title}
            isHovered={isHovered}
            hoverNonce={hoverNonce}
            intensity="title"
          />
        </h3>

        <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
          <RandomMovingText
            text={product.desc}
            isHovered={isHovered}
            hoverNonce={hoverNonce}
            intensity="body"
          />
        </p>
      </div>
    </motion.div>
  );
};

interface SalesforcePageProps {
  onNavigateContact?: () => void;
}

export const SalesforcePage: React.FC<SalesforcePageProps> = ({ onNavigateContact }) => {
  const pipelineBarsRef = useRef<HTMLDivElement>(null);
  const [pipelineVisible, setPipelineVisible] = useState(false);

  useEffect(() => {
    document.title = 'Salesforce Services | Clyptus';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Intelligent Salesforce solutions for connected customer experiences. Clyptus plans, builds, connects and supports Salesforce, so your sales, service, marketing and data teams work from one source of truth.'
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const pipelineBars = pipelineBarsRef.current;
    if (!pipelineBars) return;

    if (!('IntersectionObserver' in window)) {
      setPipelineVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setPipelineVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(pipelineBars);
    return () => observer.disconnect();
  }, []);

  const handleContact = () => {
    if (onNavigateContact) {
      onNavigateContact();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };



  const products = [
    {
      id: 'agentforce',
      title: 'Agentforce',
      desc: 'AI agents for customer service, sales and autonomous business workflows.',
    },
    {
      id: 'sales-cloud',
      title: 'Sales Cloud',
      desc: 'Lead management, opportunity tracking, sales automation and revenue forecasting.',
    },
    {
      id: 'service-cloud',
      title: 'Service Cloud',
      desc: 'Customer support, omnichannel case management and service automation.',
    },
    {
      id: 'marketing-cloud',
      title: 'Marketing Cloud',
      desc: 'Email marketing, customer journeys and multichannel campaign automation.',
    },
    {
      id: 'commerce-cloud',
      title: 'Commerce Cloud',
      desc: 'B2B and B2C unified digital e-commerce storefront management.',
    },
    {
      id: 'experience-cloud',
      title: 'Experience Cloud',
      desc: 'Customer self-service portals, partner collaboration hubs and online communities.',
    },
    {
      id: 'data-cloud',
      title: 'Data Cloud',
      desc: 'Unify real-time customer data from multiple systems into a single profile.',
    },
    {
      id: 'revenue-cloud',
      title: 'Revenue Cloud',
      desc: 'Subscription management, CPQ pricing, quoting and revenue operations.',
    },
    {
      id: 'field-service',
      title: 'Field Service',
      desc: 'Technician dispatch scheduling, work orders and mobile service execution.',
    },
    {
      id: 'tableau',
      title: 'Tableau',
      desc: 'Enterprise business intelligence, embedded analytics and interactive data visualizers.',
    },
  ];

  const serviceAreas = [
    {
      title: 'Cloud solutions',
      desc: 'Pick the clouds that match your goals and run them together as a cohesive customer engine.',
      items: [
        'Sales Cloud',
        'Service Cloud',
        'Marketing Cloud',
        'Commerce Cloud',
        'Experience Cloud',
        'Revenue Cloud',
        'Field Service',
      ],
    },
    {
      title: 'Consulting and implementation',
      desc: 'We study your processes first, then set Salesforce up around them for high user adoption.',
      items: [
        'CRM consulting',
        'Salesforce implementation',
        'Business process automation',
        'Salesforce configuration',
        'Business process analysis',
        'Deployment',
      ],
    },
    {
      title: 'Development and customization',
      desc: "Custom enterprise features and lightning workflows built with the platform's native tools.",
      items: [
        'Apex development',
        'Lightning Web Components (LWC)',
        'Custom application development',
        'Custom objects and fields',
        'Visualforce development',
        'Salesforce Flow automation',
      ],
    },
    {
      title: 'Integration',
      desc: 'Connect Salesforce seamlessly to the ERP, billing, and legacy platforms your teams already use.',
      items: [
        'SAP and Oracle ERP integration',
        'API integration (REST / SOAP)',
        'MuleSoft integration',
        'Third-party applications',
        'Payment gateways',
        'Middleware integration',
      ],
    },
    {
      title: 'AI and data solutions',
      desc: 'Turn customer data into real-time insight, predictive scoring, and automated agent actions.',
      items: [
        'Agentforce implementation',
        'Data 360',
        'Einstein AI',
        'AI-powered sales automation',
        'Customer insights',
        'Predictive analytics',
        'Tableau analytics',
      ],
    },
    {
      title: 'Support and maintenance',
      desc: 'Keep your org secure, fast, audit-ready, and up to date across all seasonal Salesforce releases.',
      items: [
        'Salesforce administration',
        'Performance optimization',
        'Security and maintenance',
        'Release management',
        'Technical support',
        'Legacy CRM migration',
        'Data cleansing',
        'Deduplication and validation',
      ],
    },
  ];

  const quotes = [
    {
      quote: 'Automate the repeatable work first, so people can spend time on conversations.',
      caption: 'On Flow and process automation',
    },
    {
      quote: 'Clean data before migration saves months of cleanup after go-live.',
      caption: 'On data migration',
    },
    {
      quote: 'AI agents are only as good as the customer data underneath them.',
      caption: 'On Agentforce and Data Cloud',
    },
    {
      quote: 'An integration nobody monitors is a future outage. Plan support from day one.',
      caption: 'On integration and maintenance',
    },
  ];

  const techStack = [
    {
      category: 'Programming',
      skills: ['Apex', 'JavaScript', 'HTML', 'CSS'],
    },
    {
      category: 'Frontend',
      skills: ['Lightning Web Components (LWC)'],
    },
    {
      category: 'Automation',
      skills: ['Salesforce Flow', 'Process Automation'],
    },
    {
      category: 'Integration',
      skills: ['REST API', 'SOAP API', 'MuleSoft'],
    },
    {
      category: 'Database',
      skills: ['SOQL', 'SOSL'],
    },
    {
      category: 'AI',
      skills: ['Agentforce', 'Einstein AI'],
    },
    {
      category: 'Analytics',
      skills: ['Tableau', 'CRM Analytics'],
    },
    {
      category: 'Development tools',
      skills: ['Salesforce CLI', 'VS Code', 'Data Loader'],
    },
  ];

  return (
    <div className="w-full bg-white text-slate-900 font-sans selection:bg-blue-500/20 selection:text-blue-950">
      
      {/* ==================================================== */}
      {/* 1. HERO SECTION                                      */}
      {/* ==================================================== */}
      <section className="relative w-full pt-16 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100 overflow-hidden">
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[350px] bg-sky-400/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-indigo-400/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black tracking-tight leading-[1.08] text-slate-900">
              Intelligent Salesforce solutions for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                connected customer
              </span>{' '}
              experiences.
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium max-w-2xl">
              Clyptus plans, builds, connects and supports Salesforce, so your sales, service, marketing and data teams work from one source of truth.
            </p>

            {/* Social Proof Stats */}
            <div className="grid grid-cols-3 gap-6 sm:gap-10 pt-6 border-t border-slate-200/80 w-full max-w-lg">
              <div>
                <span className="block font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">10</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-500">Salesforce products</span>
              </div>
              <div>
                <span className="block font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">6</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-500">service areas</span>
              </div>
              <div>
                <span className="block font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">SAP, Oracle</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-500">ERP integration</span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Pipeline Forecast Interactive Widget */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl p-6 sm:p-7 bg-white/80 backdrop-blur-xl border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.1)] ring-1 ring-slate-100 flex flex-col gap-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-600" />
                  <span className="font-black text-slate-900 text-base tracking-tight">Sales pipeline</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide border border-blue-200/60 shadow-2xs">
                  Live forecast
                </span>
              </div>

              {/* Pipeline Bars */}
              <div ref={pipelineBarsRef} className="flex flex-col gap-3.5">
                
                {/* 1. New Leads */}
                <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/70">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900 mb-2">
                    <span>New leads</span>
                    <span className="font-mono text-slate-600">1,240</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className="sales-pipeline-bar h-full rounded-full bg-blue-600" style={{ width: pipelineVisible ? '88%' : '0%', transitionDelay: '0ms' }} />
                  </div>
                </div>

                {/* 2. Qualified */}
                <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/70">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900 mb-2">
                    <span>Qualified</span>
                    <span className="font-mono text-slate-600">612</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className="sales-pipeline-bar h-full rounded-full bg-indigo-600" style={{ width: pipelineVisible ? '62%' : '0%', transitionDelay: '140ms' }} />
                  </div>
                </div>

                {/* 3. Proposal Sent */}
                <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/70">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900 mb-2">
                    <span>Proposal sent</span>
                    <span className="font-mono text-slate-600">238</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className="sales-pipeline-bar h-full rounded-full bg-amber-500" style={{ width: pipelineVisible ? '38%' : '0%', transitionDelay: '280ms' }} />
                  </div>
                </div>

                {/* 4. Closed Won */}
                <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/70">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900 mb-2">
                    <span>Closed won</span>
                    <span className="font-mono text-slate-600">96</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className="sales-pipeline-bar h-full rounded-full bg-emerald-500" style={{ width: pipelineVisible ? '22%' : '0%', transitionDelay: '420ms' }} />
                  </div>
                </div>

              </div>

              {/* Agentforce AI Insight Box */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/60 border border-blue-200/80 shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                  A
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                  Agentforce suggests following up with <span className="text-blue-700 font-extrabold underline decoration-blue-300">14 high-intent leads</span> today and drafts the replies for you.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 2. PRODUCTS AND MODULES SECTION                      */}
      {/* ==================================================== */}
      <section id="products" className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50/60 border-b border-slate-200/70">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-12">
          
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest block mb-2">
              SALESFORCE PLATFORM
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Salesforce products{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                and modules.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium mt-3 leading-relaxed">
              Everything you need to sell, serve, market, sell online and understand your data.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 [perspective:1200px]">
            {products.map((p, index) => (
              <ProductCard key={p.id} product={p} index={index} />
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 3. EVERYTHING FROM STRATEGY TO SUPPORT (SERVICES)    */}
      {/* ==================================================== */}
      <section id="services" className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/70">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative">
          
          {/* Left Sticky Header - Frozen at the vertical middle of the screen */}
          <div className="lg:col-span-4 relative">
            <div className="lg:sticky lg:top-1/2 lg:-translate-y-1/2 flex flex-col items-start gap-5 py-4">
              <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block">
                FULL LIFECYCLE EXPERTISE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Everything from{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                  strategy to support.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                Six service areas that take Salesforce from idea to a system your team uses every day.
              </p>
              <button
                onClick={handleContact}
                className="mt-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 text-white font-bold text-sm tracking-wide shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                Plan your project
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: 6 Services Blocks with Scroll-Triggered Slide-in-from-Right Animation */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-slate-200/80">
            {serviceAreas.map((svc, sIdx) => (
              <motion.div
                key={sIdx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.18 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="py-10 first:pt-0 last:pb-0 flex flex-col gap-4 group"
              >
                <motion.h3
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.18 }}
                  transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight"
                >
                  {svc.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: 35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.18 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-base text-slate-600 font-medium leading-relaxed"
                >
                  {svc.desc}
                </motion.p>

                {/* Sub-items check grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-2">
                  {svc.items.map((item, iIdx) => (
                    <motion.div
                      key={iIdx}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.18 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.12 + (iIdx % 4) * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-center gap-3 text-sm sm:text-base font-normal text-slate-800 leading-snug hover:translate-x-1 transition-transform duration-200"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 4. INSIGHTS SECTION                                  */}
      {/* ==================================================== */}
      <section id="insights" className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50/60 border-b border-slate-200/70">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Big Philosophy Quote */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-1">
              PERSPECTIVES &amp; PHILOSOPHY
            </span>
            <span className="text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500 leading-none select-none">“</span>
            <p className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-[1.18] -mt-6">
              A CRM is only as good as{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                the data and the habits
              </span>{' '}
              around it.
            </p>
            <div className="font-mono text-xs font-bold text-slate-600 uppercase tracking-widest pt-2 flex items-center gap-2.5">
              <span className="w-6 h-0.5 bg-gradient-to-r from-blue-600 to-orange-500 inline-block rounded-full" />
              <span>Clyptus delivery team</span>
            </div>
          </div>

          {/* Right Column: 4 Strategic Quotes */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {quotes.map((q, idx) => (
              <figure 
                key={idx}
                className={`pl-6 border-l-4 py-2 transition-all duration-300 group ${
                  idx % 2 === 0 
                    ? 'border-blue-600 hover:border-orange-500' 
                    : 'border-orange-500 hover:border-blue-600'
                }`}
              >
                <blockquote className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-relaxed">
                  “{q.quote}”
                </blockquote>
                <figcaption className={`text-xs sm:text-sm font-bold uppercase tracking-wider mt-2.5 inline-block px-2.5 py-0.5 rounded-md border ${
                  idx % 2 === 0
                    ? 'text-blue-700 bg-blue-50/90 border-blue-200/80'
                    : 'text-orange-700 bg-orange-50/90 border-orange-200/80'
                }`}>
                  {q.caption}
                </figcaption>
              </figure>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 5. TECHNOLOGIES WE WORK WITH (TECH STACK TABLE)      */}
      {/* ==================================================== */}
      <section id="stack" className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/70">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-10">
          
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest block mb-2">
              TOOLKIT &amp; ECOSYSTEM
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Technologies{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                we work with.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium mt-3 leading-relaxed">
              A modern Salesforce toolkit, from code to AI.
            </p>
          </div>

          {/* Clean Responsive Stack Table */}
          <div className="overflow-x-auto border border-slate-200/90 rounded-3xl bg-white shadow-xs">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <tbody>
                {techStack.map((row, idx) => (
                  <tr key={idx} className="border-b last:border-b-0 border-slate-200/80 hover:bg-slate-50/50 transition-colors">
                    <th className="py-5 px-6 sm:px-8 font-black text-slate-900 text-sm sm:text-base w-48 sm:w-60 align-middle">
                      <span className="hover:text-blue-600 transition-colors">{row.category}</span>
                    </th>
                    <td className="py-5 px-6 sm:px-8 align-middle">
                      <div className="flex flex-wrap gap-2">
                        {row.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className={`inline-block px-3.5 py-1.5 rounded-xl font-semibold text-xs sm:text-sm border transition-colors ${
                              (idx + sIdx) % 2 === 0
                                ? 'bg-blue-50/80 hover:bg-blue-100 text-blue-700 border-blue-200/70'
                                : 'bg-orange-50/80 hover:bg-orange-100 text-orange-700 border-orange-200/70'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>



    </div>
  );
};

export default SalesforcePage;
