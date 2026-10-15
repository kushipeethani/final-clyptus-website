import React, { useEffect, useRef, useState } from 'react';

interface FooterProps {
  onNavigate?: (page: string, sectionId?: string) => void;
  onOpen3dServices?: () => void;
  onOpenResourceModal?: (type: 'privacy' | 'terms' | 'cookies' | 'faqs' | 'insights') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenResourceModal,
}) => {
  const footerRef = useRef<HTMLElement | null>(null);
  const wordmarkRef = useRef<HTMLHeadingElement | null>(null);
  // Default glow center matches the warm center dome
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 50, y: 75 });

  // Direct GPU-Accelerated Scroll Tracker: Pure damped lerp for buttery smooth 60fps rise
  useEffect(() => {
    let animId: number;
    let targetRise = 110;
    let currentRise = 110;

    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Reveal smoothly as footer enters viewport
      const revealDistance = windowHeight * 0.9;
      const rawProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / revealDistance));

      // Silky smooth cubic easing
      const smooth = rawProgress * rawProgress * (3 - 2 * rawProgress);
      targetRise = (1 - smooth) * 110;
    };

    const tick = () => {
      // Damped harmonic lerp: 0.08 gives a luxurious, continuous smooth glide with zero jitter
      const diff = targetRise - currentRise;
      if (Math.abs(diff) > 0.02) {
        currentRise += diff * 0.08;
        if (wordmarkRef.current) {
          wordmarkRef.current.style.transform = `translate3d(0, ${currentRise.toFixed(2)}px, 0)`;
        }
      }

      animId = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Tracks cursor across the entire footer to illuminate the ember glow
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#140e0c] text-slate-300 font-sans border-t border-white/[0.08] overflow-hidden select-none min-h-[440px] sm:min-h-[480px] flex flex-col justify-between transition-colors duration-200"
      style={{
        // The dual-stage Schmidt Studio fiery ember glow that responds to mouse position
        background: `
          radial-gradient(75% 70% at ${mousePos.x}% ${mousePos.y}%, #c85a2b 0%, #a2431d 30%, #572210 58%, #281610 82%, transparent 100%),
          radial-gradient(110% 85% at 50% 115%, #b85429 0%, #7c3517 38%, #3a1c12 65%, #181311 90%, #120e0d 100%)
        `,
      }}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen transition-opacity duration-300"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 140, 70, 0.45) 0%, rgba(200, 75, 30, 0.2) 40%, transparent 75%)`,
          filter: 'blur(20px)',
        }}
      />

      {/* Upper Vignetting */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Layer 1: Underlaid Giant Clyptus Kinetic Typography (Desktop only >= md) */}
      <div className="hidden md:flex absolute inset-x-0 top-0 bottom-14 z-0 items-center justify-center pointer-events-none overflow-hidden select-none">
        <h2
          ref={wordmarkRef}
          className="text-center font-black tracking-tight select-none block will-change-transform leading-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(5.2rem, 21vw, 18.5rem)',
            letterSpacing: '-0.035em',
            lineHeight: '0.9',
            transformOrigin: 'center center',
            transform: 'translate3d(0, 110px, 0)',
            color: 'rgba(255, 220, 200, 0.20)',
            textShadow: '0 0 75px rgba(230, 105, 50, 0.4)',
            filter: 'blur(0.35px)',
            willChange: 'transform',
            transition: 'none',
          }}
        >
          Clyptus
        </h2>
      </div>

      {/* Layer 2: DESKTOP Interactive Foreground Overlay (>= md) */}
      <div className="hidden md:flex relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-12 pt-12 sm:pt-16 pb-5 flex-col justify-between h-full flex-1">
        {/* Navigation Columns Overlaying Across the Brandmark */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 my-auto pb-4">

          {/* Column 1: Brand Logo (Company matter text removed) */}
          <div className="flex flex-col justify-start">
            <div>
              <button
                type="button"
                onClick={() => {
                  onNavigate?.('Home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center hover:opacity-90 transition-opacity cursor-pointer group"
                title="Clyptus Home"
              >
                <img
                  src="/logo-white.png"
                  alt="Clyptus Logo"
                  className="h-10 sm:h-11 w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] group-hover:scale-[1.03] transition-transform"
                />
              </button>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-xs font-mono font-extrabold text-white uppercase tracking-widest mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              COMPANY
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-normal text-white/90">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('About');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('About', 'journey')}
                  className="hover:text-white transition-colors cursor-pointer text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                  Our Journey
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('About', 'leadership')}
                  className="hover:text-white transition-colors cursor-pointer text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                  Leadership / Our Team
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('Careers');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('Projects');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                  Projects / Case Studies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('Contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-xs font-mono font-extrabold text-white uppercase tracking-widest mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              SERVICES
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-normal text-white/90">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('SAP');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                  SAP Solutions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('AI');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-orange-300 transition-colors cursor-pointer text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                  AI Solutions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('Recruiting');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-200 transition-colors cursor-pointer text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                  IT Recruitment
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="text-xs font-mono font-extrabold text-white uppercase tracking-widest mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              RESOURCES
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-normal text-white/90">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('HR Policies');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                  HR Policies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('Blogs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                  Insights / Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Connect With Us */}
          <div>
            <h4 className="text-xs font-mono font-extrabold text-white uppercase tracking-widest mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              CONNECT WITH US
            </h4>
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.linkedin.com/company/clyptus/posts/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-orange-600 text-white/90 hover:text-white transition-all flex items-center justify-center border border-white/15 hover:border-orange-500 shadow-sm backdrop-blur-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
                </svg>
              </a>

              <a
                href="https://instagram.com/clyptussoftwaresolutions?vrfl=c2JucW9hcGRrZWts"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-orange-600 text-white/90 hover:text-white transition-all flex items-center justify-center border border-white/15 hover:border-orange-500 shadow-sm backdrop-blur-sm"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://www.facebook.com/share/19amDstBuo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-orange-600 text-white/90 hover:text-white transition-all flex items-center justify-center border border-white/15 hover:border-orange-500 shadow-sm backdrop-blur-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.63 13.77 5.63c1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-orange-600 text-white/90 hover:text-white transition-all flex items-center justify-center border border-white/15 hover:border-orange-500 shadow-sm backdrop-blur-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Policy Overlay Bar */}
        <div className="pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70 font-normal mt-auto">
          <div className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            © 2026 Clyptus Software Solutions. All Rights Reserved.
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => onOpenResourceModal?.('privacy')}
              className="hover:text-white transition-colors cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenResourceModal?.('terms')}
              className="hover:text-white transition-colors cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              Terms & Conditions
            </button>
            <button
              type="button"
              onClick={() => onOpenResourceModal?.('cookies')}
              className="hover:text-white transition-colors cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>

      {/* Layer 3: MOBILE FOOTER (< md) - CARDLESS, SLEEK & CLEAN */}
      <div className="block md:hidden relative z-10 w-full px-5 pt-6 pb-6 flex flex-col gap-5 mt-auto">
        
        {/* Brand Header: Logo & Socials (No 2-3 lines of text, No Cards) */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
          <button
            type="button"
            onClick={() => {
              onNavigate?.('Home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center cursor-pointer"
          >
            <img
              src="/logo-white.png"
              alt="Clyptus Logo"
              className="h-8 w-auto object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            />
          </button>
          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/company/clyptus/posts/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-orange-600 text-white/90 hover:text-white transition-all flex items-center justify-center border border-white/15"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com/clyptussoftwaresolutions?vrfl=c2JucW9hcGRrZWts"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-orange-600 text-white/90 hover:text-white transition-all flex items-center justify-center border border-white/15"
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/19amDstBuo/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-orange-600 text-white/90 hover:text-white transition-all flex items-center justify-center border border-white/15"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.63 13.77 5.63c1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-orange-600 text-white/90 hover:text-white transition-all flex items-center justify-center border border-white/15"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Cardless Clean Navigation Grid (2 Columns, natural flow) */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          {/* Column 1: Services */}
          <div>
            <h4 className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-wider mb-2.5">
              Services
            </h4>
            <ul className="space-y-2 text-xs font-medium text-white/85">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('SAP');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  SAP Solutions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('AI');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-orange-300 transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  AI Solutions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('Recruiting');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-200 transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  IT Recruitment
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-[11px] font-mono font-bold text-orange-300 uppercase tracking-wider mb-2.5">
              Company
            </h4>
            <ul className="space-y-2 text-xs font-medium text-white/85">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('About');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('About', 'journey');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  Our Journey
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('About', 'leadership');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  Leadership
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('Careers');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('Projects');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('Contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="col-span-2 pt-2 border-t border-white/10">
            <h4 className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-wider mb-2">
              Resources & Insights
            </h4>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-white/85">
              <button
                type="button"
                onClick={() => {
                  onNavigate?.('HR Policies');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                HR Policies
              </button>
              <span className="text-white/40">•</span>
              <button
                type="button"
                onClick={() => {
                  onNavigate?.('Blogs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Insights / Blog
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-3 border-t border-white/10 flex flex-col items-center gap-1.5 text-[11px] text-white/70 font-normal text-center">
          <div>© 2026 Clyptus Software Solutions. All Rights Reserved.</div>
          <div className="flex items-center justify-center gap-3 text-white/75">
            <button
              type="button"
              onClick={() => onOpenResourceModal?.('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onOpenResourceModal?.('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onOpenResourceModal?.('cookies')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};