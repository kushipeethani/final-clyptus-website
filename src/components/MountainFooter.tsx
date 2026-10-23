import React, { useState, useEffect, useRef } from 'react';

interface FooterProps {
  onNavigate?: (page: string, sectionId?: string) => void;
  onOpen3dServices?: () => void;
  onOpenResourceModal?: (type: 'privacy' | 'terms' | 'cookies' | 'faqs' | 'insights') => void;
}

export const MountainFooter: React.FC<FooterProps> = ({ onNavigate, onOpenResourceModal }) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start rising as soon as footer enters viewport from bottom
      // Reaches 100% as the footer settles into view
      const start = windowHeight;
      const end = windowHeight * 0.4;
      const progress = (start - rect.top) / (start - end);

      // Also ensure if user scrolled to bottom of document, progress is guaranteed 100%
      const isAtDocBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;

      const finalProgress = isAtDocBottom ? 1 : Math.min(Math.max(progress, 0), 1);
      setScrollProgress(finalProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Starts hidden behind hills (+90px) and rises gracefully into the sky (-20px)
  const textTranslateY = 90 - scrollProgress * 110;
  const textOpacity = 0.2 + scrollProgress * 0.8;

  const handleNav = (page: string, sectionId?: string) => {
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full min-h-[440px] sm:min-h-[480px] overflow-hidden bg-[#111A2E] text-slate-200 font-sans flex flex-col justify-between select-none"
    >
      {/* ----------------------------------------------------------- */}
      {/* LAYER 1: 4K SKY & SUNSET BACKGROUND                         */}
      {/* ----------------------------------------------------------- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/clyptus_footer_sky_4k.png"
          alt="Sunset Sky 4K"
          className="w-full h-full object-cover object-bottom"
        />
        {/* Soft top gradient to blend seamlessly with above section */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0b0f19] via-[#0b0f19]/60 to-transparent pointer-events-none" />
      </div>

      {/* ----------------------------------------------------------- */}
      {/* LAYER 2: EXPANDED 4K "CLYPTUS" TYPOGRAPHY (DESKTOP ONLY)    */}
      {/* ----------------------------------------------------------- */}
      <div
        className="hidden md:flex absolute inset-x-0 top-6 sm:top-8 z-[5] pointer-events-none items-center justify-center will-change-transform px-1 sm:px-4"
        style={{
          transform: `translateY(${textTranslateY}px)`,
          opacity: textOpacity,
          transition: 'transform 0.12s cubic-bezier(0.2, 0.9, 0.4, 1), opacity 0.12s ease-out',
        }}
      >
        <svg
          viewBox="0 0 1350 280"
          className="w-full max-w-[95vw] lg:max-w-[88vw] h-auto overflow-visible select-none drop-shadow-[0_8px_45px_rgba(255,255,255,0.45)]"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="50%"
            y="235"
            textAnchor="middle"
            fill="#FFFFFF"
            fontWeight="900"
            fontSize="285"
            letterSpacing="0.035em"
            className="select-none font-black font-sans"
            style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
          >
            CLYPTUS
          </text>
        </svg>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* LAYER 3: 4K FOREGROUND MOUNTAIN RIDGES & HILLS              */}
      {/* ----------------------------------------------------------- */}
      <div className="absolute inset-0 z-[10] pointer-events-none">
        <img
          src="/clyptus_footer_mountains_4k.png"
          alt="Foreground Mountain Ridges 4K"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      {/* ----------------------------------------------------------- */}
      {/* LAYER 4: DESKTOP FOOTER (>= md)                             */}
      {/* ----------------------------------------------------------- */}
      <div className="hidden md:flex relative z-[20] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-auto pt-0 pb-3 sm:pb-4 flex-col justify-end">
        {/* Navigation Grid embedded gracefully on the lower mountain base */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-6 pb-4 border-b border-slate-700/60 items-start">
          {/* Left spacer column (sub-text removed) */}
          <div className="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-4" aria-hidden="true" />

          {/* Column 2: Company */}
          <div className="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="text-xs sm:text-[13px] font-mono font-bold text-slate-100 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-[13.5px] sm:text-[14.5px] font-medium">
              <li>
                <button
                  onClick={() => handleNav('About')}
                  className="text-slate-200 hover:text-sky-300 hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('About', 'journey')}
                  className="text-slate-200 hover:text-sky-300 hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  Our Journey
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('About', 'leadership')}
                  className="text-slate-200 hover:text-sky-300 hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  Leadership Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('Careers')}
                  className="text-slate-200 hover:text-sky-300 hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('Contact')}
                  className="text-slate-200 hover:text-sky-300 hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="text-xs sm:text-[13px] font-mono font-bold text-slate-100 uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-[13.5px] sm:text-[14.5px] font-medium">
              <li>
                <button
                  onClick={() => handleNav('SAP')}
                  className="text-slate-200 hover:text-sky-300 hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  Enterprise Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('AI')}
                  className="text-slate-200 hover:text-sky-300 hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  AI & Data Intelligence
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('Recruiting')}
                  className="text-slate-200 hover:text-sky-300 hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  Talent Acquisition
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('Projects')}
                  className="text-slate-200 hover:text-sky-300 hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  Case Studies
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="text-xs sm:text-[13px] font-mono font-bold text-slate-100 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-[13.5px] sm:text-[14.5px] font-medium">
              <li>
                <button
                  onClick={() => handleNav('HR Policies')}
                  className="text-slate-200 hover:text-sky-300 hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  HR Policies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('Blogs')}
                  className="text-slate-200 hover:text-sky-300 hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  Insights
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Connect */}
          <div className="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="text-xs sm:text-[13px] font-mono font-bold text-slate-100 uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-2.5">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/clyptus/posts/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-blue-600 text-slate-200 hover:text-white transition-all flex items-center justify-center border border-slate-700/80 hover:border-blue-500 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/clyptussoftwaresolutions?vrfl=c2JucW9hcGRrZWts"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-pink-600 text-slate-200 hover:text-white transition-all flex items-center justify-center border border-slate-700/80 hover:border-pink-500 shadow-sm"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/19amDstBuo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-blue-600 text-slate-200 hover:text-white transition-all flex items-center justify-center border border-slate-700/80 hover:border-blue-500 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.63 13.77 5.63c1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-red-600 text-slate-200 hover:text-white transition-all flex items-center justify-center border border-slate-700/80 hover:border-red-500 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs sm:text-[13px] text-slate-300 font-medium">
          <div>
            © 2026 Clyptus Software Solutions. All Rights Reserved.
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={() => onOpenResourceModal?.('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenResourceModal?.('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => onOpenResourceModal?.('cookies')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* LAYER 5: MOBILE FOOTER (< md) - CARDLESS, SLEEK & CLEAN     */}
      {/* ----------------------------------------------------------- */}
      <div className="block md:hidden relative z-[20] w-full px-5 pt-4 pb-4 flex flex-col gap-4 mt-auto">
        
        {/* Brand Header: Text Only (Logo removed) */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/15">
          <button
            type="button"
            onClick={() => handleNav('Home')}
            className="inline-flex items-center cursor-pointer"
          >
            <span className="text-xl font-black tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Clyptus
            </span>
          </button>
          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/company/clyptus/posts/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-blue-600 text-slate-200 hover:text-white transition-all flex items-center justify-center border border-white/10"
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
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-pink-600 text-slate-200 hover:text-white transition-all flex items-center justify-center border border-white/10"
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
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-blue-600 text-slate-200 hover:text-white transition-all flex items-center justify-center border border-white/10"
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
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-red-600 text-slate-200 hover:text-white transition-all flex items-center justify-center border border-white/10"
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
            <h4 className="text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider mb-2.5">
              Services
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-200/90">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('SAP')}
                  className="hover:text-white transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  Enterprise Applications
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('AI')}
                  className="hover:text-white transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  AI & Data Intelligence
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('Recruiting')}
                  className="hover:text-white transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  Talent Acquisition
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('Projects')}
                  className="hover:text-white transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  Case Studies
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-[11px] font-mono font-bold text-indigo-300 uppercase tracking-wider mb-2.5">
              Company
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-200/90">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('About')}
                  className="hover:text-white transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('About', 'journey')}
                  className="hover:text-white transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  Our Journey
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('About', 'leadership')}
                  className="hover:text-white transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  Leadership Team
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('Careers')}
                  className="hover:text-white transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('Contact')}
                  className="hover:text-white transition-colors text-left block w-full truncate cursor-pointer drop-shadow-xs"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="col-span-2 pt-2 border-t border-white/10">
            <h4 className="text-[11px] font-mono font-bold text-orange-400 uppercase tracking-wider mb-2">
              Resources & Insights
            </h4>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-200/90">
              <button
                type="button"
                onClick={() => handleNav('HR Policies')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                HR Policies
              </button>
              <span className="text-slate-500">•</span>
              <button
                type="button"
                onClick={() => handleNav('Blogs')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Insights
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-3 border-t border-white/10 flex flex-col items-center gap-1.5 text-[11px] text-slate-300 font-normal text-center">
          <div>© 2026 Clyptus Software Solutions. All Rights Reserved.</div>
          <div className="flex items-center justify-center gap-3 text-slate-300">
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
export default MountainFooter;
