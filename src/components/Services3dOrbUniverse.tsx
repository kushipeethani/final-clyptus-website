import React, { useState, useEffect, useRef } from 'react';
import { Database, Users, Cpu, X, ArrowUpRight, Sparkles, ShieldCheck, Layers } from 'lucide-react';
import { ClyptusLogo } from './ClyptusLogo';

interface ServiceCategory {
  id: string;
  number: string;
  title: string;
  tagline: string;
  badge: string;
  icon: React.ElementType;
  gradient: string;
  glowColor: string;
  borderColor: string;
  textColor: string;
  description: string;
  features: string[];
  stats: { label: string; value: string }[];
}

const SERVICES_DATA: ServiceCategory[] = [
  {
    id: 'sap',
    number: '01',
    title: 'ERP Services',
    tagline: 'Enterprise Cloud & S/4HANA',
    badge: 'ENTERPRISE PRACTICE',
    icon: Database,
    gradient: 'from-sky-500 via-blue-600 to-indigo-700',
    glowColor: 'rgba(2, 132, 199, 0.45)',
    borderColor: 'border-sky-400/40',
    textColor: 'text-sky-400',
    description: 'End-to-end S/4HANA migrations, SAP BTP integrations, BRIM staffing, and custom add-on architectures for global enterprises.',
    features: [
      'SAP S/4HANA Green & Brownfield Migrations',
      'SAP BTP Extension & AI Integration',
      'Global BRIM & HCM Managed Services',
      'Silver Partner Certified Quality Assurance',
    ],
    stats: [
      { label: 'Consultants', value: '250+' },
      { label: 'Global Projects', value: '110+' },
    ],
  },
  {
    id: 'recruiting',
    number: '02',
    title: 'IT Recruiting',
    tagline: 'Elite Tech & Executive Talent',
    badge: 'WORKFORCE SOLUTIONS',
    icon: Users,
    gradient: 'from-indigo-500 via-purple-600 to-pink-600',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    borderColor: 'border-indigo-400/40',
    textColor: 'text-indigo-400',
    description: 'Precision staff augmentation and executive search delivering top 1% specialized SAP, Cloud, and AI engineering talent worldwide.',
    features: [
      'Dedicated SAP & Cloud Staff Augmentation',
      'Executive Leadership & Architect Search',
      'Vetted 48-Hour Talent Deployment',
      'Global Compliance & Payroll Support',
    ],
    stats: [
      { label: 'Placements', value: '1,200+' },
      { label: 'Retention Rate', value: '98.4%' },
    ],
  },
  {
    id: 'ai',
    number: '03',
    title: 'AI & GenAI',
    tagline: 'Autonomous Intelligent Systems',
    badge: 'NEXT-GEN INNOVATION',
    icon: Cpu,
    gradient: 'from-purple-500 via-fuchsia-600 to-cyan-500',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    borderColor: 'border-purple-400/40',
    textColor: 'text-purple-400',
    description: 'Custom generative AI pipelines, enterprise LLM agents, and predictive machine learning built directly into business workflows.',
    features: [
      'Custom LLM Fine-Tuning & RAG Engines',
      'Autonomous Process Automation Agents',
      'Real-Time Predictive Data Analytics',
      'Enterprise Zero-Trust AI Security Shields',
    ],
    stats: [
      { label: 'Accuracy', value: '99.2%' },
      { label: 'ROI Acceleration', value: '3.4x' },
    ],
  },
];

interface Services3dOrbUniverseProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService?: (serviceId: string) => void;
}

export const Services3dOrbUniverse: React.FC<Services3dOrbUniverseProps> = ({
  isOpen,
  onClose,
  onSelectService,
}) => {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceCategory | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parallax Tilt tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // Background particle starfield animation
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      z: number;
      radius: number;
      alpha: number;
      speed: number;
    }> = [];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * 1000,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.8 + 0.3,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      particles.forEach((p) => {
        p.z -= p.speed;
        if (p.z <= 0) {
          p.z = 1000;
          p.x = Math.random() * width - width / 2;
          p.y = Math.random() * height - height / 2;
        }

        const k = 400 / p.z;
        const px = p.x * k + cx;
        const py = p.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.max(0.5, p.radius * k);
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(186, 230, 253, ${p.alpha * (1 - p.z / 1000)})`;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSelectedService(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950/80 backdrop-blur-2xl transition-all duration-500 ease-out select-none font-sans"
      style={{
        perspective: '1200px',
      }}
    >
      {/* Dynamic Starfield Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />

      {/* Ambient Radial Glass Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-sky-500/15 blur-[120px] transition-transform duration-700 ease-out"
          style={{ transform: `translate3d(${mousePos.x * -40}px, ${mousePos.y * -40}px, 0)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-purple-500/15 blur-[120px] transition-transform duration-700 ease-out"
          style={{ transform: `translate3d(${mousePos.x * 40}px, ${mousePos.y * 40}px, 0)` }}
        />
      </div>

      {/* Top Header Bar inside 3D Universe */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md text-[11px] font-mono tracking-widest text-sky-400 font-bold uppercase shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>CLYPTUS 3D SERVICES UNIVERSE</span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/80 hover:border-sky-500/60 text-slate-300 hover:text-white backdrop-blur-xl transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
        >
          <span className="text-xs font-mono tracking-wider font-bold">CLOSE</span>
          <div className="w-6 h-6 rounded-full bg-slate-800 group-hover:bg-sky-500 text-slate-300 group-hover:text-slate-950 flex items-center justify-center transition-colors">
            <X className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </button>
      </div>

      {/* Main 3D Stage Container */}
      <div
        className="relative z-10 w-full max-w-6xl h-full max-h-[850px] p-6 sm:p-12 flex flex-col items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* CENTER 3D CORE ORB */}
        <div 
          className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-slate-900/90 border border-slate-700/60 shadow-[0_0_80px_rgba(2,132,199,0.3)] backdrop-blur-2xl transition-all duration-700 hover:scale-110 group cursor-pointer z-20"
          style={{ transform: 'translateZ(60px)' }}
        >
          {/* Inner Pulsing Rings */}
          <div className="absolute inset-[-12px] rounded-full border border-sky-500/30 animate-[spin_12s_linear_infinite]" />
          <div className="absolute inset-[-24px] rounded-full border border-dashed border-indigo-500/20 animate-[spin_20s_linear_infinite_reverse]" />

          {/* Central Logo & Label */}
          <div className="relative z-10 flex flex-col items-center text-center gap-1">
            <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-2 shadow-md mb-1 group-hover:rotate-12 transition-transform overflow-hidden">
              <ClyptusLogo className="w-full h-full object-contain" />
            </div>
            <span className="text-sm font-black tracking-tight text-white uppercase">SERVICES</span>
          </div>

          {/* Subtle Outer Glow Aura */}
          <div className="absolute inset-0 rounded-full bg-sky-500/10 blur-xl group-hover:bg-sky-500/25 transition-all duration-500" />
        </div>

        {/* RADIAL 3D CATEGORY SATELLITES */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 z-20">
          {SERVICES_DATA.map((srv) => {
            const IconComp = srv.icon;
            const isHovered = activeHoverId === srv.id;
            const isOtherHovered = activeHoverId !== null && activeHoverId !== srv.id;

            // Staggered radial entrance transform
            const entranceTranslateZ = isHovered ? 80 : 30;

            return (
              <div
                key={srv.id}
                onMouseEnter={() => setActiveHoverId(srv.id)}
                onMouseLeave={() => setActiveHoverId(null)}
                onClick={() => {
                  setSelectedService(srv);
                  if (onSelectService) onSelectService(srv.id);
                }}
                style={{
                  transform: `translateZ(${entranceTranslateZ}px) ${
                    isOtherHovered ? 'scale(0.95)' : isHovered ? 'scale(1.06)' : 'scale(1)'
                  }`,
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  opacity: isOtherHovered ? 0.45 : 1,
                  filter: isOtherHovered ? 'blur(1px)' : 'none',
                }}
                className={`group relative rounded-3xl p-6 sm:p-8 bg-slate-900/80 border ${srv.borderColor} backdrop-blur-2xl shadow-2xl flex flex-col justify-between cursor-pointer overflow-hidden transition-all duration-500 hover:border-sky-400/80`}
              >
                {/* Metallic Glass Light Streak Effect */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl group-hover:translate-x-32 group-hover:translate-y-32 transition-transform duration-1000 ease-out pointer-events-none" />

                {/* Ambient Radial Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  style={{
                    background: `radial-gradient(600px circle at center, ${srv.glowColor}, transparent 70%)`,
                  }}
                />

                {/* Card Header: Number & Badge */}
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <span className="text-3xl font-black font-mono tracking-tighter text-slate-500 group-hover:text-white transition-colors">
                    {srv.number}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-widest font-extrabold uppercase bg-slate-800/80 ${srv.textColor} border border-slate-700/60 shadow-sm`}>
                    {srv.badge}
                  </span>
                </div>

                {/* Card Center: Icon & Title */}
                <div className="relative z-10 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${srv.gradient} flex items-center justify-center text-white mb-4 shadow-[0_8px_25px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-300`}>
                    <IconComp className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-sky-300 transition-colors mb-1">
                    {srv.title}
                  </h3>
                  <p className="text-xs font-mono font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                    {srv.tagline}
                  </p>
                </div>

                {/* Description & Feature Highlights */}
                <p className="relative z-10 text-xs text-slate-300 font-normal leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all">
                  {srv.description}
                </p>

                {/* Bottom Action Footer */}
                <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-300 group-hover:text-white transition-colors flex items-center gap-2">
                    EXPLORE PRACTICE
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-sky-400" />
                  </span>

                  <div className="flex items-center gap-3 font-mono text-[10px] text-slate-400">
                    {srv.stats.map((s) => (
                      <span key={s.label} className="flex items-center gap-1">
                        <strong className="text-white font-bold">{s.value}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Instruction Prompt */}
        <div className="mt-8 text-center text-xs font-mono text-slate-400 tracking-widest uppercase flex items-center gap-2 z-20">
          <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin" />
          <span>Click any 3D practice category to unveil architecture & details</span>
        </div>
      </div>

      {/* DEDICATED SERVICE DETAIL MODAL (Deep-Dive Modal View) */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-3xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl text-slate-100 overflow-hidden">
            {/* Background Glow */}
            <div
              className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-40"
              style={{ background: selectedService.glowColor }}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedService.gradient} flex items-center justify-center text-white shadow-md`}>
                  <selectedService.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-sky-400 font-bold uppercase">PRACTICE OVERVIEW</span>
                  <h3 className="text-2xl font-black text-white">{selectedService.title}</h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedService(null)}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
              {selectedService.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                Key Practice Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs font-medium text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="flex items-center gap-4">
                {selectedService.stats.map((st) => (
                  <div key={st.label} className="flex flex-col">
                    <span className="text-lg font-black text-white">{st.value}</span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{st.label}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedService(null);
                  onClose();
                  // Smooth scroll to contact section
                  const contactEl = document.getElementById('contact');
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-extrabold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* EMBEDDED FLOATING 3D GLASS ORB BUTTON (Can be mounted on the page) */
export const Services3dOrbButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center gap-4 px-6 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-900 border border-slate-700/80 hover:border-sky-400/80 shadow-[0_10px_35px_rgba(2,132,199,0.35)] backdrop-blur-xl transition-all duration-500 hover:scale-105 active:scale-95 text-left"
    >
      {/* Outer Rotating Glowing Orb Aura */}
      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600 p-0.5 shadow-md flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-sky-400 group-hover:text-white transition-colors">
          <Layers className="w-5 h-5 animate-pulse" />
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-[9px] font-mono tracking-widest text-sky-400 font-extrabold uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
          3D INTERACTIVE UNIVERSE
        </span>
        <span className="text-sm font-black tracking-tight text-white group-hover:text-sky-300 transition-colors uppercase">
          EXPLORE SERVICES
        </span>
      </div>

      <div className="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-sky-500 text-slate-300 group-hover:text-slate-950 flex items-center justify-center transition-colors ml-2">
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </button>
  );
};
