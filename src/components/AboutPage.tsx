import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Award,
  Cpu,
  Layers,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Target,
  Zap,
  Quote,
  Calendar,
  CircleUser,
  Box,
  Globe,
  MapPin,
  Users,
  Puzzle
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

// Lightweight, 60fps native counter hook/component
const AnimatedCounter: React.FC<{ value: string; duration?: number }> = ({ value, duration = 1.8 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });

  const match = value.match(/^(\d+)(.*)$/);
  const targetNum = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!isInView) {
      setDisplayValue(0);
      return;
    }
    if (targetNum === 0) return;
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(ease * targetNum));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(targetNum);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, targetNum, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
};

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  // Story Slideshow Data with the 3 real team office collaboration photos
  const storySlides = [
    {
      src: '/clyptus_office_presentation.jpg',
      alt: 'Clyptus Team Roadmap Strategy Presentation',
      tag: 'ENTERPRISE STRATEGY',
      caption: 'Over a decade of scaling complex SAP ERP architectures, cloud migrations, and specialized tech teams.'
    },
    {
      src: '/clyptus_office_whiteboard.jpg',
      alt: 'Clyptus Agile Team Goals and Standup Planning',
      tag: 'AGILE GOALS & VELOCITY',
      caption: 'Proactive milestone planning, rapid sprint alignment, and dedicated client-centric delivery units.'
    },
    {
      src: '/clyptus_office_collaboration.jpg',
      alt: 'Clyptus Cross-Functional Engineering Collaboration',
      tag: 'COLLABORATIVE INNOVATION',
      caption: 'Synchronous cross-functional consulting squads driving digital transformation with operational excellence.'
    }
  ];

  const [currentStorySlide, setCurrentStorySlide] = useState(0);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement>(null);

  // Close services menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
        setShowServicesMenu(false);
      }
    };
    if (showServicesMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showServicesMenu]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStorySlide((prev) => (prev + 1) % storySlides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [storySlides.length]);

  // Statistics with icons and matching colors
  const stats = [
    {
      number: '10+',
      label: 'Years of Experience',
      desc: 'A decade of delivering technology solutions and business value.',
      icon: Calendar
    },
    {
      number: '120+',
      label: 'SAP Consultants',
      desc: 'Certified experts in SAP and related technologies.',
      icon: CircleUser
    },
    {
      number: '5+',
      label: 'RDS Packages',
      desc: 'Specialized RDS packages for diverse business needs.',
      icon: Box
    },
    {
      number: '50+',
      label: 'Global Projects',
      desc: 'Successful delivery across industries and regions.',
      icon: Globe
    },
    {
      number: '30+',
      label: 'Country Localizations',
      desc: 'Supporting businesses across 30+ countries.',
      icon: MapPin
    },
    {
      number: '330+',
      label: 'Talent Deployed',
      desc: 'Skilled professionals deployed for client success.',
      icon: Users
    },
    {
      number: '50+',
      label: 'Add-on Assets',
      desc: 'Ready-to-use assets for faster implementation.',
      icon: Puzzle
    },
  ];

  // Preserved timeline milestones exactly as specified
  const timeline = [
    {
      period: '2014 - 2016',
      step: '01',
      title: 'Foundation & Initial Expansion',
      image: '/milestone_2014_2016.jpg',
      points: [
        'Company founded with core SAP & HCM practice',
        'Delivered first international SAP project in Dubai',
        'Established dedicated ERP delivery center'
      ]
    },
    {
      period: '2016 - 2018',
      step: '02',
      title: 'Global Footprint Growth',
      image: '/milestone_2016_2018.jpg',
      points: [
        'Expanded SAP delivery across 3+ countries',
        'Served over 15+ enterprise customers',
        'Team grew to 65+ consultants with major UAE & India rollouts'
      ]
    },
    {
      period: '2018 - 2020',
      step: '03',
      title: 'S/4HANA & Cloud Leadership',
      image: '/milestone_2018_2020.jpg',
      points: [
        'Introduced SAP Cloud Services portfolio',
        'Team scaled to 87+ senior SAP consultants',
        'Launched dedicated SAP S/4HANA migration practice'
      ]
    },
    {
      period: '2020 - 2022',
      step: '04',
      title: 'Analytics & SAP Silver Partner',
      image: '/milestone_2020_2023.jpg',
      points: [
        'Introduced Data Platforms & BRIM Solutions',
        'Achieved SAP Partner Silver Certification',
        'Scaled to 120+ team strength & 110+ customer base'
      ]
    },
    {
      period: '2022 - Present',
      step: '05',
      title: 'BTP, AI & Next-Gen Innovation',
      image: '/milestone_2023_2025.jpg',
      points: [
        'Introduced SAP BTP (Business Technology Platform) Practice',
        'Built proprietary SAP Add-on Solutions & integrated SAP AI capabilities',
        'Team expanded to 250+ SAP & Cloud consultants globally'
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8F7F3] text-[#14243B] font-sans selection:bg-[#3478F6]/20 selection:text-[#14243B] relative overflow-hidden">

      {/* Subtle Editorial Background Ambient Geometry */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#3478F6]/10 via-[#FF7138]/5 to-transparent blur-3xl opacity-70" />
        <div className="absolute top-[35%] -right-40 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-[#3478F6]/8 via-[#EAF1FF] to-transparent blur-3xl opacity-60" />
        <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#FF7138]/8 via-[#3478F6]/5 to-transparent blur-3xl opacity-50" />
      </div>

      <div className="relative z-10">

        {/* ---------------------------------------------------- */}
        {/* 1. HERO SECTION (TWO-COLUMN EDITORIAL)              */}
        {/* ---------------------------------------------------- */}
        <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 lg:px-12 border-b border-[#14243B]/8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

              {/* Left Column (Editorial Typography & Mission) */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 flex flex-col justify-center"
              >

                {/* Primary Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#14243B] tracking-tight leading-[1.08] mb-6">
                  Technology expertise.{' '}
                  <span className="block text-[#14243B]">Human ambition.</span>
                  <span className="text-[#FF7138] inline-block relative">
                    Meaningful progress.
                    <span className="absolute left-0 -bottom-1.5 w-full h-1 bg-[#FF7138]/30 rounded-full" />
                  </span>
                </h1>

                {/* Unified, Consistent Narrative Typography */}
                <div className="space-y-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8">
                  <p className="text-[#14243B] font-semibold text-lg sm:text-xl">
                    Clyptus is an AI-native technology partner delivering end-to-end IT — consulting, engineering, enterprise applications, cloud, data, security, managed services and talent acquisition — with AI built into every engagement.
                  </p>
                  <p>
                    We specialize in enterprise application solutions, supporting businesses across their technology lifecycle from implementation and migration to rollout, integration, and ongoing application support.
                  </p>
                  <p>
                    Our expertise spans SAP S/4HANA, SuccessFactors, HCM, BRIM, and BTP, along with Oracle ERP Cloud, EBS, Financials, HCM, and PeopleSoft.
                  </p>
                  <p>
                    Beyond enterprise applications, we deliver the modern foundations that connect the enterprise: digital engineering, cloud architectures, data &amp; analytics, cybersecurity, managed services, and talent acquisition.
                  </p>
                  <p className="border-l-2 border-[#3478F6] pl-4 py-1 text-[#14243B] font-semibold text-base sm:text-lg leading-relaxed">
                    At Clyptus, we focus on practical solutions that fit the way businesses operate — helping organizations manage complex technology today while preparing for what comes next.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => onNavigate('Contact')}
                    className="px-7 py-3.5 rounded-full bg-[#3478F6] hover:bg-[#2563EB] text-white font-bold text-sm tracking-wide transition-all shadow-md shadow-[#3478F6]/25 hover:shadow-lg hover:shadow-[#3478F6]/35 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Get in Touch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Right Column: Orange C Logo with Drop-in Entrance and Fast Sideways Anticlockwise 3D Rotation */}
              <div
                className="lg:col-span-5 flex items-center justify-center py-6 sm:py-10"
                style={{ perspective: 1200 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: -320, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 14,
                    mass: 0.9,
                    delay: 0.1
                  }}
                  className="flex items-center justify-center select-none"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    initial={{ rotateY: 0 }}
                    whileInView={{ rotateY: -2520 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      duration: 3,
                      ease: [0.15, 0.85, 0.25, 1]
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="flex items-center justify-center"
                  >
                    <img
                      src="/clyptus_c_orange_logo.png"
                      alt="Clyptus Orange C Logo"
                      className="w-64 sm:w-80 md:w-96 max-w-full h-auto object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* 2. COMPANY STATISTICS (EDITORIAL COUNTERS)          */}
        {/* ---------------------------------------------------- */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-white border-b border-[#14243B]/8 relative">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Proven Track Record of <span className="text-blue-600">Excellence</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium mt-3">
                Verifiable metrics from over a decade of high-consequence enterprise implementations across North America, EMEA, and APAC.
              </p>
            </div>

            {/* Stats Grid with Icons and Orange Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
              {stats.map((st, idx) => {
                const IconComp = st.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: '-30px' }}
                    transition={{ duration: 0.5, delay: idx * 0.06 }}
                    className="flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <IconComp className="w-8 h-8 sm:w-9 sm:h-9 text-blue-600 shrink-0" strokeWidth={1.8} />
                      <div className="text-4xl sm:text-5xl font-black tracking-tight text-[#FF5B24]">
                        <AnimatedCounter value={st.number} />
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 tracking-tight">
                      {st.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {st.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* 3. COMPANY STORY (ASYMMETRIC SPLIT LAYOUT)          */}
        {/* ---------------------------------------------------- */}
        <section id="company-story" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#F8F7F3] border-b border-[#14243B]/8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              {/* Large Image Side with Mask Reveal & Parallax Aesthetic */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: '-50px' }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-5 order-2 lg:order-1 relative"
              >
                <div className="relative rounded-3xl overflow-hidden bg-white border border-[#14243B]/10 shadow-xl p-2.5 select-none">
                  <div className="relative h-[480px] sm:h-[540px] w-full rounded-2xl overflow-hidden bg-slate-900">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStorySlide}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0"
                      >
                        <img
                          src={storySlides[currentStorySlide].src}
                          alt={storySlides[currentStorySlide].alt}
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#14243B]/90 via-[#14243B]/25 to-transparent pointer-events-none" />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <div className="absolute inset-x-3.5 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-20">
                      <button
                        onClick={() => setCurrentStorySlide((prev) => (prev - 1 + storySlides.length) % storySlides.length)}
                        className="w-10 h-10 rounded-full bg-[#14243B]/60 hover:bg-[#3478F6] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer pointer-events-auto hover:scale-110 active:scale-95 shadow-lg"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setCurrentStorySlide((prev) => (prev + 1) % storySlides.length)}
                        className="w-10 h-10 rounded-full bg-[#14243B]/60 hover:bg-[#3478F6] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer pointer-events-auto hover:scale-110 active:scale-95 shadow-lg"
                        aria-label="Next slide"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Slide Dots and Indicator Pills */}
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#14243B]/70 backdrop-blur-md border border-white/15">
                      {storySlides.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setCurrentStorySlide(dotIdx)}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            dotIdx === currentStorySlide
                              ? 'w-6 bg-[#FF7138]'
                              : 'w-2 bg-white/40 hover:bg-white/80'
                          }`}
                          aria-label={`Go to slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>

                    {/* Bottom Dynamic Highlight Quote in Image */}
                    <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-[#14243B]/85 backdrop-blur-md border border-white/15 text-white z-20 shadow-xl">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStorySlide}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="mb-1.5">
                            <p className="text-xs font-mono font-bold text-[#FF7138] uppercase tracking-widest">
                              {storySlides[currentStorySlide].tag}
                            </p>
                          </div>
                          <p className="text-xs sm:text-sm font-medium text-white/90 leading-snug">
                            {storySlides[currentStorySlide].caption}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Subtle Orange Graphic Block behind image */}
                <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-3xl bg-[#FF7138]/15 -z-10 blur-xl" />
              </motion.div>

              {/* Story Narrative Side */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: '-50px' }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 order-1 lg:order-2"
              >

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12] mb-6">
                  Built on expertise.{' '}
                  <span className="text-blue-600 block">Evolving with technology.</span>
                </h2>

                <div className="space-y-4 text-base text-[#586477] font-normal leading-relaxed mb-8">
                  <p>
                    Clyptus Software Solutions was established with a clear mandate: to help organizations successfully implement, modernize, and extract enduring value from mission-critical enterprise systems.
                  </p>
                  <p>
                    What began as a focused SAP &amp; HCM consulting practice has evolved into a global technology powerhouse delivering end-to-end ERP transformations, S/4HANA migrations, SAP BTP innovation, Oracle Cloud architectures, and intelligent data systems.
                  </p>
                  <p>
                    Across banking, healthcare, retail, manufacturing, oil &amp; gas, and public sectors, we deliver solutions that align technology with real business workflows. We blend deep system engineering with human talent to ensure projects transition seamlessly from design into reliable, everyday enterprise reality.
                  </p>
                </div>

                {/* Two Distinct Value Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-white border border-[#14243B]/8 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF1FF] text-[#3478F6] flex items-center justify-center mb-3">
                      <Target className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-[#14243B] mb-1">
                      Practical, Fit-for-Purpose Architecture
                    </h3>
                    <p className="text-xs text-[#586477] leading-relaxed">
                      Zero generic templates. Systems engineered to conform with exact regional regulatory and enterprise operating models.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-[#14243B]/8 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-[#FF7138]/10 text-[#FF7138] flex items-center justify-center mb-3">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-[#14243B] mb-1">
                      Next-Gen Innovation CoE
                    </h3>
                    <p className="text-xs text-[#586477] leading-relaxed">
                      Continuous investments into SAP Business Technology Platform (BTP), AI integration, and proprietary add-on assets.
                    </p>
                  </div>
                </div>

              </motion.div>

            </div>
          </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* 4. COMPANY TIMELINE (SCROLL CONNECTING LINE)        */}
        {/* ---------------------------------------------------- */}
        <section id="journey" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-white border-b border-[#14243B]/8 relative">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
                Our <span className="text-blue-600">Journey</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                Tracing our expansion from foundational ERP roots to global multi-cloud, AI, and enterprise leadership.
              </p>
            </div>

            {/* Timeline Container with Central Line (Desktop) & Left Line (Mobile) */}
            <div className="relative">

              {/* Animated Connecting Vertical Line */}
              <div className="absolute left-6 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#3478F6] via-[#FF7138] to-[#3478F6]" />

              <div className="space-y-12 sm:space-y-16">
                {timeline.map((item, idx) => {
                  const isEven = idx % 2 === 0;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, margin: '-60px' }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className={`relative flex flex-col md:flex-row items-start md:items-center ${
                        isEven ? 'md:flex-row-reverse' : ''
                      } gap-8 md:gap-12`}
                    >

                      {/* Content Card Side (Half Width) */}
                      <div className="w-full md:w-1/2 pl-14 md:pl-0">
                        <div className={`p-6 sm:p-8 rounded-3xl bg-[#F8F7F3] border border-[#14243B]/10 hover:border-[#3478F6]/30 shadow-sm hover:shadow-xl transition-all duration-300 relative group ${
                          isEven ? 'md:mr-4' : 'md:ml-4'
                        }`}>

                          {/* Top Header */}
                          <div className="flex items-center justify-between gap-4 mb-4">
                            <span className="text-sm sm:text-base font-bold text-[#3478F6] tracking-wide">
                              {item.period}
                            </span>
                            <span className="text-2xl font-bold text-[#14243B]/20 group-hover:text-[#FF7138] transition-colors">
                              {item.step}
                            </span>
                          </div>

                          {/* Milestone Title */}
                          <h3 className="text-xl sm:text-2xl font-black text-[#14243B] mb-4 tracking-tight">
                            {item.title}
                          </h3>

                          {/* Milestone Image Thumbnail if present */}
                          {item.image && (
                            <div className="w-full h-36 rounded-2xl overflow-hidden mb-4 border border-[#14243B]/10">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}

                          {/* Bullet Points */}
                          <ul className="space-y-2.5">
                            {item.points.map((pt, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#586477] font-medium leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-[#FF7138] shrink-0 mt-0.5" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>

                        </div>
                      </div>

                      {/* Central Marker Dot */}
                      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-7 md:top-1/2 md:-translate-y-1/2 z-20">
                        <div className="w-8 h-8 rounded-full bg-white border-4 border-[#3478F6] shadow-md flex items-center justify-center group-hover:border-[#FF7138] transition-colors">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#14243B]" />
                        </div>
                      </div>

                      {/* Empty counterpart spacer for desktop alternating layout */}
                      <div className="hidden md:block md:w-1/2" />

                    </motion.div>
                  );
                })}
              </div>

            </div>

          </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* 5. EXECUTIVE LEADERSHIP (EDITORIAL CEO SHOWCASE)     */}
        {/* ---------------------------------------------------- */}
        <section id="leadership" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#F8F7F3] border-b border-[#14243B]/8">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
                Leadership <span className="text-blue-600">Team</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                Guided by vision, integrity, and deep enterprise expertise to drive global digital transformation.
              </p>
            </div>

            {/* CEO Editorial Card Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto rounded-3xl bg-white border border-[#14243B]/10 shadow-xl overflow-hidden p-8 sm:p-12 lg:p-14 relative"
            >
              {/* Soft decorative ambient accents */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#3478F6]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#FF7138]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

                {/* CEO Portrait Column */}
                <div className="md:col-span-5 flex flex-col items-center text-center">
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-tr from-[#3478F6] via-white to-[#FF7138] shadow-2xl">
                    <div className="w-full h-full rounded-[1.35rem] overflow-hidden bg-slate-100">
                      <img
                        src="/ceo_vamsi_krishna.png"
                        alt="Vamsi Krishna - Chief Executive Officer & Founder"
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* CEO Details Column */}
                <div className="md:col-span-7">
                  <h3 className="text-3xl sm:text-4xl font-black text-[#14243B] tracking-tight mb-1">
                    Vamsi Krishna
                  </h3>
                  <p className="text-sm font-mono font-bold text-[#FF7138] uppercase tracking-wider mb-5">
                    Chief Executive Officer &amp; Founder
                  </p>

                  <p className="text-sm sm:text-base text-[#586477] font-normal leading-relaxed mb-6">
                    Vamsi Krishna leads Clyptus Software Solutions' strategic direction, client relationships and technology services, delivering AI-native digital engineering, enterprise applications, and talent solutions for global enterprises across the USA, UAE, and India.
                  </p>

                  {/* Refined Quote Card */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#F8F7F3] border-l-4 border-[#3478F6] border-y border-r border-[#14243B]/8 relative">
                    <Quote className="w-6 h-6 text-[#3478F6]/30 mb-2" />
                    <blockquote className="text-xs sm:text-sm text-[#14243B] font-medium italic leading-relaxed">
                      &ldquo;At Clyptus, our mission is to build practical, enterprise-scale technology solutions that solve real business challenges with velocity, integrity, and operational excellence.&rdquo;
                    </blockquote>
                  </div>

                  {/* Leadership Values Pills */}
                  <div className="mt-6 flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-lg bg-[#14243B]/5 text-xs font-semibold text-[#14243B]">
                      Enterprise ERP Strategy
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#14243B]/5 text-xs font-semibold text-[#14243B]">
                      SAP CoE Governance
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#14243B]/5 text-xs font-semibold text-[#14243B]">
                      Global Delivery Excellence
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* 6. WHY CLYPTUS? (FOUR DISTINCT CONTENT AREAS)        */}
        {/* ---------------------------------------------------- */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-white border-b border-[#14243B]/8">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
                The Clyptus{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#FF7138]">
                  Difference
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                Partner with Clyptus for a seamless SAP journey powered by expertise, innovation, and measurable outcomes.
              </p>
            </div>

            {/* 4 Differentiator Cards in a Balanced 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

              {/* Card 1: Industry Specialization */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
                className="rounded-[22px] bg-white border border-[#14243B]/8 hover:border-[#3478F6]/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-7 sm:p-9 flex flex-col justify-between relative group overflow-hidden"
              >
                {/* Top Blue Accent Bar */}
                <div className="absolute top-0 left-8 w-14 h-1 bg-[#2563EB] rounded-b-full" />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] mb-6 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                    <Building2 className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  <h3 className="text-2xl font-black text-[#14243B] mb-3 tracking-tight">
                    Industry Specialization
                  </h3>

                  <p className="text-sm text-[#586477] leading-relaxed mb-6 font-normal">
                    Sector-specific accelerators and pre-built solutions for banking, pharma, oil &amp; gas, retail, and energy industries. We eliminate trial-and-error by deploying proven blueprints adapted to your industry’s compliance requirements.
                  </p>
                </div>

                {/* Compact Elegant Industry Chips */}
                <div className="pt-5 border-t border-[#14243B]/8 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {['Banking & Financial', 'Pharma & Biotech', 'Oil & Gas', 'Manufacturing', 'Retail & Consumer', 'Energy & Utilities'].map((ind, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-[#F8F7F3] border border-[#14243B]/6 text-xs font-semibold text-[#14243B] hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Flexible Engagement Models */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-[22px] bg-white border border-[#14243B]/8 hover:border-[#FF7138]/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-7 sm:p-9 flex flex-col justify-between relative group overflow-hidden"
              >
                {/* Top Orange Accent Bar */}
                <div className="absolute top-0 left-8 w-14 h-1 bg-[#FF7138] rounded-b-full" />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF7138] mb-6 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                    <Layers className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  <h3 className="text-2xl font-black text-[#14243B] mb-3 tracking-tight">
                    Flexible Engagement Models
                  </h3>

                  <p className="text-sm text-[#586477] leading-relaxed mb-6 font-normal">
                    Customizable delivery frameworks with innovative assets and client-centric teams tailored to your business needs — whether talent-on-demand, dedicated CoE units, or full turn-key execution.
                  </p>
                </div>

                {/* Service Bullets with Consistent Alignment */}
                <div className="pt-5 border-t border-[#14243B]/8 mt-auto space-y-2.5">
                  {[
                    'Dedicated CoE PODs',
                    'Fixed-Outcome Milestone Delivery',
                    '24/7 Follow-the-Sun Support (AMS)'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#14243B]">
                      <CheckCircle2 className="w-4 h-4 text-[#FF7138] shrink-0" strokeWidth={2} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Card 3: SAP Center of Excellence (Light Card with Technology Motif) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-[22px] bg-white border border-[#14243B]/8 hover:border-[#3478F6]/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-7 sm:p-9 flex flex-col justify-between relative group overflow-hidden"
              >
                {/* Top Subtle Dual Gradient Accent Bar */}
                <div className="absolute top-0 left-8 w-16 h-1 bg-gradient-to-r from-[#2563EB] via-[#2563EB] to-[#FF7138] rounded-b-full" />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] mb-6 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                    <Cpu className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  <h3 className="text-2xl font-black text-[#14243B] mb-3 tracking-tight">
                    SAP Center of Excellence
                  </h3>

                  <p className="text-sm text-[#586477] leading-relaxed mb-6 font-normal">
                    Deep expertise and innovation hub with global delivery capabilities across multiple SAP &amp; Oracle technologies. We bridge legacy enterprise systems to cloud-native platforms with zero downtime disruption.
                  </p>
                </div>

                {/* SAP Tech Labels & Governance Badge */}
                <div className="pt-5 border-t border-[#14243B]/8 mt-auto flex items-center justify-between flex-wrap gap-3">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono font-bold">
                    <span className="px-2.5 py-1 rounded-md bg-[#EAF1FF] text-[#2563EB] border border-[#2563EB]/15">S/4HANA</span>
                    <span className="px-2.5 py-1 rounded-md bg-[#EAF1FF] text-[#2563EB] border border-[#2563EB]/15">BTP</span>
                    <span className="px-2.5 py-1 rounded-md bg-[#EAF1FF] text-[#2563EB] border border-[#2563EB]/15">BRIM</span>
                    <span className="px-2.5 py-1 rounded-md bg-[#EAF1FF] text-[#2563EB] border border-[#2563EB]/15">HCM</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-md">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Enterprise Certified</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 4: Measurable Outcomes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-[22px] bg-white border border-[#14243B]/8 hover:border-[#3478F6]/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-7 sm:p-9 flex flex-col justify-between relative group overflow-hidden"
              >
                {/* Top Subtle Gradient Accent Bar */}
                <div className="absolute top-0 left-8 w-16 h-1 bg-gradient-to-r from-[#FF7138] to-[#2563EB] rounded-b-full" />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] mb-6 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                    <Award className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  <h3 className="text-2xl font-black text-[#14243B] mb-3 tracking-tight">
                    Measurable Outcomes
                  </h3>

                  <p className="text-sm text-[#586477] leading-relaxed mb-6 font-normal">
                    Consistent, high-quality deliverables with quantifiable ROI and value realization frameworks. Every project links directly to operational velocity, reduced total cost of ownership, and accelerated digital milestones.
                  </p>
                </div>

                {/* 3 Scannable Metric Tiles */}
                <div className="pt-5 border-t border-[#14243B]/8 mt-auto grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
                  <div className="p-3 rounded-xl bg-[#F8F7F3] border border-[#14243B]/6">
                    <span className="text-lg sm:text-xl font-black text-[#2563EB] block tracking-tight">100%</span>
                    <span className="text-[11px] text-[#586477] font-semibold block mt-0.5">SLA Compliance</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8F7F3] border border-[#14243B]/6">
                    <span className="text-lg sm:text-xl font-black text-[#FF7138] block tracking-tight">30+</span>
                    <span className="text-[11px] text-[#586477] font-semibold block mt-0.5">Tax Localized</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8F7F3] border border-[#14243B]/6">
                    <span className="text-lg sm:text-xl font-black text-[#14243B] block tracking-tight">50+</span>
                    <span className="text-[11px] text-[#586477] font-semibold block mt-0.5">Add-on Assets</span>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* 7. FINAL CLOSING CTA SECTION (LIGHT CORPORATE DESIGN) */}
        {/* ---------------------------------------------------- */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#F8F7F3] via-white to-[#F1EFEA] border-b border-[#14243B]/8 relative overflow-hidden">
          {/* Subtle Ambient Brand Glows */}
          <div className="absolute -top-24 right-0 w-96 h-96 bg-gradient-to-br from-[#3478F6]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 left-0 w-96 h-96 bg-gradient-to-tr from-[#FF7138]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center relative py-6 sm:py-10"
            >
              {/* Distinctive Orange & Blue Visual Motif (Inspired by Clyptus Logo) */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8 flex items-center justify-center"
              >
                {/* Soft ambient center glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#3478F6]/15 to-[#FF7138]/15 blur-lg" />

                {/* Rotating subtle outer orbit in Clyptus orange */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-[#FF7138]/30"
                />

                {/* Counter-rotating blue accent arc */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-1 rounded-full border border-transparent border-t-[#3478F6] border-r-[#3478F6]/60"
                />

                {/* Center Brand Emblem (No Card Box) */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center p-1">
                  <img
                    src="/clyptus_c_orange_logo.png"
                    alt="Clyptus C Logo"
                    className="w-full h-full object-contain drop-shadow-md select-none"
                  />
                </div>
              </motion.div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#14243B] mb-5 leading-[1.12]">
                Let&rsquo;s move your business forward.
              </h2>

              {/* Supporting Message */}
              <p className="text-base sm:text-lg lg:text-xl text-[#586477] font-medium max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed">
                Explore how Clyptus can support your enterprise technology, transformation, and talent requirements.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 relative">
                <button
                  onClick={() => onNavigate('Contact')}
                  className="px-8 py-4 rounded-full bg-[#3478F6] hover:bg-[#2563EB] text-white font-bold text-sm sm:text-base tracking-wide transition-all shadow-lg shadow-[#3478F6]/25 hover:shadow-xl hover:shadow-[#3478F6]/35 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer"
                >
                  <span>Talk to Our Team</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Explore Our Services Button with Interactive Menu */}
                <div className="relative" ref={servicesMenuRef}>
                  <button
                    onClick={() => setShowServicesMenu((prev) => !prev)}
                    className="px-8 py-4 rounded-full bg-white hover:bg-[#F8F7F3] text-[#14243B] font-bold text-sm sm:text-base tracking-wide transition-all border border-[#14243B]/15 hover:border-[#14243B]/30 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer group"
                    aria-expanded={showServicesMenu}
                    aria-haspopup="true"
                  >
                    <span>Explore Our Services</span>
                    <ChevronDown className={`w-4 h-4 text-[#FF7138] transition-transform duration-200 ${showServicesMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Options: SAP, IT Recruiting, AI */}
                  <AnimatePresence>
                    {showServicesMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-[#14243B]/10 p-2.5 z-50 text-left"
                      >
                        <div className="px-3 py-2 text-xs font-bold text-[#586477] uppercase tracking-wider border-b border-[#14243B]/6 mb-1.5">
                          <span>Select a Service</span>
                        </div>

                        {/* SAP Option */}
                        <button
                          onClick={() => {
                            setShowServicesMenu(false);
                            onNavigate('SAP');
                          }}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50/80 transition-colors text-left group cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform shrink-0">
                            <Cpu className="w-5 h-5 stroke-[1.8]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-[#14243B] flex items-center justify-between">
                              <span>Enterprise Applications</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#2563EB] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                            </div>
                            <p className="text-xs text-[#586477] truncate">S/4HANA, BTP, Cloud ERP & AMS</p>
                          </div>
                        </button>

                        {/* IT Recruiting Option */}
                        <button
                          onClick={() => {
                            setShowServicesMenu(false);
                            onNavigate('IT Recruiting');
                          }}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50/80 transition-colors text-left group cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF7138] group-hover:scale-105 transition-transform shrink-0">
                            <Users className="w-5 h-5 stroke-[1.8]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-[#14243B] flex items-center justify-between">
                              <span>Talent Acquisition</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#FF7138] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                            </div>
                            <p className="text-xs text-[#586477] truncate">Specialist Talent &amp; GCC Build-Out</p>
                          </div>
                        </button>

                        {/* AI Option */}
                        <button
                          onClick={() => {
                            setShowServicesMenu(false);
                            onNavigate('AI');
                          }}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50/80 transition-colors text-left group cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform shrink-0">
                            <Zap className="w-5 h-5 stroke-[1.8]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-[#14243B] flex items-center justify-between">
                              <span>AI</span>
                              <ArrowRight className="w-3.5 h-3.5 text-indigo-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                            </div>
                            <p className="text-xs text-[#586477] truncate">Intelligent Solutions & Engineering</p>
                          </div>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Verified Company Credentials */}
              <div className="mt-12 sm:mt-14 pt-8 border-t border-[#14243B]/8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-bold tracking-wider uppercase">
                <span className="text-[#2563EB]">SAP SILVER PARTNER</span>
                <span className="text-[#FF7138]">50+ GLOBAL PROJECTS</span>
                <span className="text-emerald-600">ENTERPRISE TALENT CO-E</span>
              </div>
            </motion.div>
          </div>
        </section>

      </div>

    </div>
  );
};
