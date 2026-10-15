import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Briefcase, 
  Factory, 
  Info, 
  ShieldCheck, 
  BookOpen, 
  Users, 
  Mail,
  ChevronRight 
} from 'lucide-react';
import { ClyptusLogo } from './ClyptusLogo';

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onPlayIntro: () => void;
  onOpen3dServices?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  onPlayIntro,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Close mobile menu on Escape key, click outside, and lock body scroll
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    // Prevent background scrolling while mobile overlay is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navHoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNavMouseEnter = () => {
    if (navHoverTimeoutRef.current) {
      clearTimeout(navHoverTimeoutRef.current);
      navHoverTimeoutRef.current = null;
    }
    setIsNavExpanded(true);
  };

  const handleNavMouseLeave = () => {
    if (navHoverTimeoutRef.current) {
      clearTimeout(navHoverTimeoutRef.current);
    }
    navHoverTimeoutRef.current = setTimeout(() => {
      setIsNavExpanded(false);
      setHoveredLink(null);
    }, 280);
  };

  useEffect(() => {
    return () => {
      if (navHoverTimeoutRef.current) {
        clearTimeout(navHoverTimeoutRef.current);
      }
    };
  }, []);

  const navLinks = [
    { name: 'Home', icon: Home },
    { name: 'Projects', icon: Briefcase },
    { name: 'Industries', icon: Factory },
    { name: 'About', icon: Info },
    { name: 'HR Policies', icon: ShieldCheck },
    { name: 'Blogs', icon: BookOpen },
    { name: 'Careers', icon: Users },
    { name: 'Contact', icon: Mail },
  ];

  const handleMobileNav = (pageName: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(pageName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header 
      ref={headerRef}
      initial={reduceMotion ? false : { y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full select-none bg-transparent pointer-events-auto"
    >
      {/* Main Navbar Container (Full width so logo is anchored to left edge, away from page text) */}
      <div 
        className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-4 h-16 sm:h-[68px] relative"
      >
        
        {/* Brand Logo with Smooth Spring Hover (Anchored to Left Edge) */}
        <div className="flex items-center shrink-0 z-10">
          <motion.button 
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('Home');
              onPlayIntro();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="flex items-center group text-left py-0 cursor-pointer focus:outline-none"
            aria-label="Clyptus Home"
          >
            <ClyptusLogo 
              className="h-11 sm:h-14 md:h-[56px] w-auto object-contain transition-transform group-hover:scale-[1.02]" 
            />
          </motion.button>
        </div>

        {/* Mobile Center Navigation Pill (Matches Desktop Menu Pill) */}
        <div className="lg:hidden flex items-center z-10">
          <motion.button
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xs text-xs font-bold text-slate-800 hover:text-sky-600 transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            <span className="text-slate-900 font-extrabold max-w-[85px] truncate">{activePage}</span>
            <span className="text-slate-300 font-normal">|</span>
            <span className="text-sky-600 font-bold flex items-center gap-0.5">
              Menu <ChevronRight className="w-3.5 h-3.5 text-sky-600" />
            </span>
          </motion.button>
        </div>

        {/* Center Navigation Links (Centered via absolute positioning so it never interferes with left logo) */}
        <div 
          className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 pointer-events-auto"
          onMouseEnter={handleNavMouseEnter}
          onMouseLeave={handleNavMouseLeave}
        >
          <motion.nav 
            layout
            transition={
              reduceMotion 
                ? { duration: 0 } 
                : { type: 'spring', stiffness: 450, damping: 34 }
            }
            className="flex items-center gap-1 p-1 rounded-full bg-slate-200/45 backdrop-blur-xl border border-slate-300/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
          >
            {/* If Collapsed: Display Current Active Page + Prominent Animated Right Arrow */}
            {!isNavExpanded ? (
              <motion.div
                key="collapsed-nav"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-1.5"
              >
                {/* Active Page Pill */}
                <div className="px-3.5 py-1.5 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] border border-slate-200/90 text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                  <span>{activePage}</span>
                </div>

                {/* Right Arrow Interactive Hover Trigger */}
                <motion.button
                  id="nav-expand-arrow-btn"
                  onMouseEnter={handleNavMouseEnter}
                  onClick={() => setIsNavExpanded(true)}
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.92 }}
                  className="px-2.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-sky-600 border border-slate-200/70 shadow-xs flex items-center gap-1 text-xs font-bold transition-all cursor-pointer group"
                  title="Hover to view navigation contents"
                  aria-label="Hover to view navigation contents"
                >
                  <span className="text-[11px] text-slate-500 group-hover:text-sky-600 transition-colors">Menu</span>
                  <motion.div
                    animate={reduceMotion ? undefined : { x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-sky-600" />
                  </motion.div>
                </motion.button>
              </motion.div>
            ) : (
              /* If Expanded: Reveal All Navigation Items + Right Indicator */
              <motion.div
                key="expanded-nav"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-0.5"
              >
                {navLinks.map((item) => {
                  const link = item.name;
                  const isActive = activePage === link;
                  const isHovered = hoveredLink === link;

                  return (
                    <motion.button
                      key={link}
                      onClick={() => {
                        onNavigate(link);
                        handleNavMouseLeave();
                      }}
                      onMouseEnter={() => setHoveredLink(link)}
                      whileHover={reduceMotion ? undefined : { y: -0.5 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer focus:outline-none"
                    >
                      {/* Apple-style sliding active pill */}
                      {isActive && (
                        <motion.div
                          layoutId="appleNavActivePill"
                          transition={
                            reduceMotion 
                              ? { duration: 0 } 
                              : { type: 'spring', stiffness: 420, damping: 32 }
                          }
                          className="absolute inset-0 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] border border-slate-200/90 z-0"
                        />
                      )}

                      {/* Subtle sliding hover preview pill */}
                      {isHovered && !isActive && (
                        <motion.div
                          layoutId="appleNavHoverPill"
                          transition={
                            reduceMotion 
                              ? { duration: 0 } 
                              : { type: 'spring', stiffness: 480, damping: 35 }
                          }
                          className="absolute inset-0 rounded-full bg-white/60 z-0"
                        />
                      )}

                      <span
                        className={`relative z-10 transition-colors duration-150 ${
                          isActive
                            ? 'text-slate-900 font-bold'
                            : 'text-slate-600 hover:text-slate-950 font-medium'
                        }`}
                      >
                        {link}
                      </span>
                    </motion.button>
                  );
                })}

                {/* Right Arrow End-Cap Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsNavExpanded(false)}
                  className="ml-1 p-1.5 rounded-full bg-white/70 hover:bg-white text-slate-400 hover:text-sky-600 border border-slate-200/60 shadow-2xs transition-colors cursor-pointer"
                  title="Close Navigation Menu"
                  aria-label="Close Navigation Menu"
                >
                  <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-400 hover:text-sky-600" />
                </motion.button>
              </motion.div>
            )}
          </motion.nav>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 z-10">
          {/* Mobile Glassy Hamburger Menu Button */}
          <motion.button
            whileTap={reduceMotion ? undefined : { scale: 0.92 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/80 text-slate-800 shadow-xs backdrop-blur-md transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5 text-slate-900" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5 text-slate-900" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Drawer with Apple iOS Frosted Glass Sheet Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden w-full border-t border-slate-200/70 bg-white/92 backdrop-blur-3xl px-4 py-5 shadow-2xl overflow-hidden max-h-[calc(100vh-65px)] overflow-y-auto"
          >


            {/* Navigation Links Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navLinks.map((item, idx) => {
                const link = item.name;
                const Icon = item.icon;
                const isActive = activePage === link;

                return (
                  <motion.button
                    key={link}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * idx }}
                    onClick={() => handleMobileNav(link)}
                    className={`flex items-center gap-2.5 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-500/25 border border-sky-500'
                        : 'bg-slate-50/80 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span className="truncate">{link}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Actions in Mobile Menu */}
            <div className="pt-3 border-t border-slate-200/70">
              <button
                onClick={() => handleMobileNav('Contact')}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-950 text-white hover:bg-sky-600 font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Us</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
