import React, { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  Layers,
  Cloud,
  Code,
  Users,
  CreditCard,
  Brain,
  ShieldCheck,
  Cpu,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

import { CapabilityDetailView } from './CapabilityDetailView';

export interface SapCapability {
  num: string;
  title: string;
  desc: string;
  badge: string;
  icon: React.ElementType;
  accentHex: string;
}

export const CAPABILITIES_DATA: SapCapability[] = [
  {
    num: '01',
    title: 'SAP S/4HANA',
    desc: 'Greenfield implementation, migration and upgrade to S/4HANA.',
    badge: 'S/4HANA',
    icon: Layers,
    accentHex: '#2563EB',
  },
  {
    num: '02',
    title: 'SAP Cloud Services',
    desc: 'SAP cloud deployment and services.',
    badge: 'SAP CLOUD',
    icon: Cloud,
    accentHex: '#0284C7',
  },
  {
    num: '03',
    title: 'SAP BTP and Add-ons',
    desc: 'BTP-first extensions and custom SAP add-on solutions.',
    badge: 'BTP & EXTENSIONS',
    icon: Code,
    accentHex: '#7C3AED',
  },
  {
    num: '04',
    title: 'SAP HCM',
    desc: 'Human capital management on SAP, part of the practice since the company began.',
    badge: 'HCM & TALENT',
    icon: Users,
    accentHex: '#EA580C',
  },
  {
    num: '05',
    title: 'SAP BRIM',
    desc: 'Subscription billing, usage-based charging, invoicing and revenue management.',
    badge: 'BRIM MONETIZATION',
    icon: CreditCard,
    accentHex: '#F59E0B',
  },
  {
    num: '06',
    title: 'SAP AI',
    desc: 'SAP AI capabilities integrated into SAP solutions.',
    badge: 'INTELLIGENT AI',
    icon: Brain,
    accentHex: '#10B981',
  },
  {
    num: '07',
    title: 'SAP AMS and Support',
    desc: 'Application management and support after go-live.',
    badge: 'AMS & SLA',
    icon: ShieldCheck,
    accentHex: '#DC2626',
  },
  {
    num: '08',
    title: 'Oracle Cloud ERP',
    desc: 'Oracle ERP implementation and support.',
    badge: 'ORACLE ERP',
    icon: Cpu,
    accentHex: '#2563EB',
  },
  {
    num: '09',
    title: 'Microsoft Dynamics 365',
    desc: 'Dynamics 365 implementation and support.',
    badge: 'DYNAMICS 365',
    icon: RefreshCw,
    accentHex: '#0284C7',
  },
];

interface SapCapabilitiesHelixSliderProps {
  onContactClick?: () => void;
}

export const SapCapabilitiesHelixSlider: React.FC<SapCapabilitiesHelixSliderProps> = ({
  onContactClick,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedCapabilityNum, setSelectedCapabilityNum] = useState<string | null>(null);
  const totalCards = CAPABILITIES_DATA.length;
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven progress to cycle through 9 cards while screen is pinned
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const calculatedIndex = Math.min(
      totalCards - 1,
      Math.floor(latest * totalCards)
    );
    setActiveIndex((prev) => (prev !== calculatedIndex ? calculatedIndex : prev));
  });

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  return (
    <div
      ref={containerRef}
      id="core-capabilities"
      className="relative w-full h-[220vh]"
    >
      {/* Sticky screen container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto select-none overflow-hidden">
        {/* Section Heading */}
        <div className="text-center flex flex-col items-center gap-2 mb-3">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Core ERP &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
              SAP Capabilities
            </span>
          </h2>
        </div>
      {/* Carousel Prev / Next Controls */}
      <div className="flex items-center justify-end gap-2 mb-3">
        <button
          onClick={handlePrev}
          className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm transition-all active:scale-95 cursor-pointer"
          aria-label="Previous Capability"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm transition-all active:scale-95 cursor-pointer"
          aria-label="Next Capability"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ================= DESKTOP 3D HELIX / SPIRAL STAGE (≥ 768px) ================= */}
      <div className="hidden md:block relative w-full h-[520px] overflow-visible perspective-[1200px]">
        <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
          {CAPABILITIES_DATA.map((item, idx) => {
            // Calculate relative offset from active card
            let offset = idx - activeIndex;
            if (offset > totalCards / 2) offset -= totalCards;
            if (offset < -totalCards / 2) offset += totalCards;

            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);

            // Cull cards that are in the back to eliminate GPU strain (render only front 5 cards)
            const isVisible = absOffset <= 2;

            // Mathematical Helix Curve Geometry
            const angleStep = (2 * Math.PI) / totalCards;
            const currentAngle = offset * angleStep;

            const radius = 380; // Distance from cylindrical center
            const x = Math.sin(currentAngle) * (radius * 0.85);
            const z = Math.cos(currentAngle) * radius - radius;
            const y = Math.sin(currentAngle * 0.5) * 36 + offset * 10;

            const rotateY = (currentAngle * 180) / Math.PI;
            const rotateZ = Math.sin(currentAngle) * -4;

            // Active Focus & Depth Cull Scale / Opacity Calculation
            const opacity = isCenter
              ? 1
              : absOffset === 1
              ? 0.75
              : absOffset === 2
              ? 0.35
              : 0;

            const scale = isCenter ? 1.05 : Math.max(0.75, 1 - absOffset * 0.12);
            const zIndex = Math.round(100 - Math.abs(z));

            const IconComp = item.icon;

            return (
              <motion.div
                key={item.num}
                onClick={() => {
                  setActiveIndex(idx);
                }}
                animate={{
                  x,
                  y,
                  z,
                  rotateY,
                  rotateZ,
                  scale,
                  opacity,
                }}
                transition={{
                  duration: 0.22,
                  ease: [0.25, 1, 0.5, 1],
                }}
                style={{
                  zIndex,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  display: isVisible ? 'block' : 'none',
                }}
                className={`absolute w-[360px] cursor-pointer rounded-3xl p-7 transition-colors duration-150 ${
                  isCenter
                    ? 'bg-white border-2 border-blue-500 shadow-xl pointer-events-auto'
                    : 'bg-white/95 border border-slate-200/90 shadow-sm hover:border-blue-300 pointer-events-auto'
                }`}
              >
                {/* Header Number */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`text-xs font-mono font-extrabold px-3 py-1 rounded-full border ${
                      isCenter
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {item.num}
                  </span>
                </div>

                {/* Title & Icon */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`p-3 rounded-2xl shadow-sm ${
                      isCenter
                        ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed font-medium mb-4">
                  {item.desc}
                </p>

                {/* Bottom Action Line */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(idx);
                      setSelectedCapabilityNum(item.num);
                    }}
                    className="text-xs font-extrabold text-blue-600 flex items-center gap-1 group hover:text-blue-700 transition-colors"
                  >
                    <span>Explore Capability</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ================= MOBILE FALLBACK HORIZONTAL SNAP CAROUSEL (< 768px) ================= */}
      <div className="block md:hidden relative w-full">
        <div className="w-full overflow-x-auto snap-x snap-mandatory flex gap-4 pb-6 pt-2 scrollbar-none">
          {CAPABILITIES_DATA.map((item, idx) => {
            const IconComp = item.icon;
            const isCenter = idx === activeIndex;

            return (
              <div
                key={item.num}
                onClick={() => setActiveIndex(idx)}
                className={`snap-center shrink-0 w-[85vw] max-w-[320px] p-6 rounded-3xl bg-white border transition-all ${
                  isCenter
                    ? 'border-2 border-blue-500 shadow-xl'
                    : 'border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {item.num}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-sm">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {item.title}
                  </h3>
                </div>

                <p className="text-slate-600 text-xs font-medium leading-relaxed mb-4">
                  {item.desc}
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(idx);
                    setSelectedCapabilityNum(item.num);
                  }}
                  className="flex items-center text-xs font-bold text-blue-600 gap-1 hover:text-blue-700 transition-colors"
                >
                  <span>Explore Capability</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Mobile Page Dot Indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {CAPABILITIES_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex ? 'w-6 bg-blue-600' : 'w-1.5 bg-slate-300'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
      </div>

      {/* Capability Verbatim Detail Reader Modal */}
      <CapabilityDetailView
        capabilityNum={selectedCapabilityNum}
        onClose={() => setSelectedCapabilityNum(null)}
        onContactClick={onContactClick}
      />
    </div>
  );
};

