import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SLIDER_CARDS, DEFAULT_SPIRAL_CONFIG } from './data/sliderData';
import type { SliderCard, SpiralConfig } from './data/sliderData';
import { Header } from './components/Header';
import { SpiralSlider } from './components/SpiralSlider';
import { StudioCustomizer } from './components/StudioCustomizer';
import { CodePromptModal } from './components/CodePromptModal';
import { CardDetailModal } from './components/CardDetailModal';
import { CinematicIntro } from './components/CinematicIntro';
import { AiImpactSection } from './components/AiImpactSection';
import { MetricsCounterSection } from './components/MetricsCounterSection';
import { ContactSection } from './components/ContactSection';
import { SapServicesSection } from './components/SapServicesSection';
import { SapProjectsLedger } from './components/SapProjectsLedger';
import { AiServicesPage } from './components/AiServicesPage';
import { AboutPage } from './components/AboutPage';
import { CareersPage } from './components/CareersPage';
import { IndustriesPage } from './components/IndustriesPage';
import { ItRecruitmentPage } from './components/ItRecruitmentPage';
import { HrPolicyPage } from './components/HrPolicyPage';
import { BlogsPage } from './components/BlogsPage';
import { RisingSlideCardsSection } from './components/RisingSlideCardsSection';
import { Services3dOrbUniverse } from './components/Services3dOrbUniverse';
import { ServicesBottomLeftWidget } from './components/ServicesBottomLeftWidget';
import { FloatingSocialTooltip } from './components/FloatingSocialTooltip';
import { Footer } from './components/Footer';
import { MountainFooter } from './components/MountainFooter';
import { ResourceModal } from './components/ResourceModal';
import { applySeoForPage } from './utils/seo';

const getInitialPage = (): string => {
  if (typeof window === 'undefined') return 'Home';
  const path = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
  const hash = window.location.hash.replace('#', '').toLowerCase();
  const token = path || hash;
  if (token === 'sap') return 'SAP';
  if (token === 'ai') return 'AI';
  if (token === 'recruiting' || token === 'it-recruiting' || token === 'staffing') return 'Recruiting';
  if (token === 'contact') return 'Contact';
  if (token === 'projects') return 'Projects';
  if (token === 'about') return 'About';
  if (token === 'careers') return 'Careers';
  if (token === 'industries') return 'Industries';
  if (token === 'blogs') return 'Blogs';
  if (token === 'hr-policies' || token === 'hrpolicies') return 'HR Policies';
  return 'Home';
};

export function App() {
  const initialPage = useMemo(() => getInitialPage(), []);
  const [showIntro, setShowIntro] = useState<boolean>(initialPage === 'Home');
  const [currentPage, setCurrentPage] = useState<string>(initialPage);
  const [cards, setCards] = useState<SliderCard[]>(SLIDER_CARDS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [config, setConfig] = useState<SpiralConfig>(DEFAULT_SPIRAL_CONFIG);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [is3dServicesOpen, setIs3dServicesOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<SliderCard | null>(null);
  const [codeModalCard, setCodeModalCard] = useState<SliderCard | null>(null);
  const [activeResourceModal, setActiveResourceModal] = useState<'privacy' | 'terms' | 'cookies' | 'faqs' | 'insights' | null>(null);

  // Sync hash and pathname routing with currentPage
  useEffect(() => {
    const handleNavigation = () => {
      const page = getInitialPage();
      setCurrentPage(page);
    };
    handleNavigation();
    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  // Apply route-specific SEO metadata and sync URL hash smoothly
  useEffect(() => {
    applySeoForPage(currentPage);

    const hashMap: Record<string, string> = {
      Home: '',
      SAP: '#sap',
      AI: '#ai',
      Recruiting: '#recruiting',
      'IT Recruiting': '#recruiting',
      Contact: '#contact',
      Projects: '#projects',
      About: '#about',
      Careers: '#careers',
      Industries: '#industries',
      Blogs: '#blogs',
      'HR Policies': '#hr-policies',
    };

    const targetHash = hashMap[currentPage] !== undefined ? hashMap[currentPage] : '';
    if (window.location.hash !== targetHash) {
      if (targetHash) {
        window.history.replaceState(null, '', `${window.location.pathname}${targetHash}`);
      } else if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, [currentPage]);

  // HR Policies Authentication State
  const [isHrAuthenticated, setIsHrAuthenticated] = useState<boolean>(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(null);

  const handleHrLogin = (u: string, p: string): boolean => {
    if ((u === 'Clyptus' && p === 'Clyptus@123') || (u === 'Audit' && p === 'V9#qL2!mX7@pR4')) {
      setIsHrAuthenticated(true);
      setAuthenticatedUser(u);
      return true;
    }
    return false;
  };

  const handleHrLogout = () => {
    setIsHrAuthenticated(false);
    setAuthenticatedUser(null);
  };

  // Filter cards by search term
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesSearch =
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [cards, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-800">
      {/* Full-Screen Cinematic Intro Animation (Disabled) */}
      {showIntro && (
        <CinematicIntro
          onComplete={() => setShowIntro(false)}
          onSkip={() => setShowIntro(false)}
        />
      )}

      {/* Navigation Header - hidden while entry logo intro is playing */}
      {!showIntro && (
        <Header
          activePage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            if (page === 'Services') {
              setIs3dServicesOpen(true);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onToggleCustomizer={() => setIsCustomizerOpen(!isCustomizerOpen)}
          onPlayIntro={() => setShowIntro(true)}
          onOpen3dServices={() => setIs3dServicesOpen(true)}
        />
      )}

      {/* Conditional Page Views */}
      {currentPage === 'Contact' ? (
        /* SEPARATE DEDICATED CONTACT US PAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          <ContactSection />
        </main>
      ) : currentPage === 'Projects' ? (
        /* DEDICATED PROJECTS & CASE STUDIES PAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          <SapProjectsLedger />
        </main>
      ) : currentPage === 'SAP' ? (
        /* DEDICATED SAP SERVICES PAGE WITH RICH DETAILS */
        <main className="w-full flex-1 flex flex-col items-center">
          <SapServicesSection onContactClick={() => {
            setCurrentPage('Contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        </main>
      ) : currentPage === 'AI' ? (
        /* DEDICATED AI SERVICES PAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          <AiServicesPage onNavigateContact={() => {
            setCurrentPage('Contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        </main>
      ) : currentPage === 'Recruiting' || currentPage === 'IT Recruiting' ? (
        /* DEDICATED IT RECRUITING PAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          <ItRecruitmentPage onNavigateContact={() => {
            setCurrentPage('Contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        </main>
      ) : currentPage === 'HR Policies' ? (
        /* DEDICATED HR POLICIES PAGE WITH PDF DOWNLOADS & AUTH */
        <main className="w-full flex-1 flex flex-col items-center">
          <HrPolicyPage
            isAuthenticated={isHrAuthenticated}
            authenticatedUser={authenticatedUser}
            onLogin={handleHrLogin}
            onLogout={handleHrLogout}
            onNavigateContact={() => {
              setCurrentPage('Contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : currentPage === 'Blogs' || currentPage === 'blogs' ? (
        /* DEDICATED BLOGS PAGE FROM FRIEND 1 */
        <main className="w-full flex-1 flex flex-col items-center">
          <BlogsPage onNavigateContact={() => {
            setCurrentPage('Contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        </main>
      ) : currentPage === 'About' ? (
        /* DEDICATED ABOUT US PAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          <AboutPage onNavigate={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        </main>
      ) : currentPage === 'Careers' ? (
        /* DEDICATED CAREERS PAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          <CareersPage onNavigateContact={() => {
            setCurrentPage('Contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        </main>
      ) : currentPage === 'Industries' ? (
        /* DEDICATED INDUSTRIES PAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          <IndustriesPage onNavigateContact={() => {
            setCurrentPage('Contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        </main>
      ) : (
        /* MAIN HOME PAGE & 3D SPIRAL STAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          {/* Title Hero Banner */}
          <div className="pt-6 sm:pt-8 pb-3 sm:pb-4 px-4 text-center flex flex-col items-center gap-2 sm:gap-3 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              AI Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600">Solutions</span> That Change Your Business
            </h1>
          </div>

          {/* 3D Spiral Slider Stage (Full Width Edge-to-Edge) */}
          <div className="w-full">
            {filteredCards.length > 0 ? (
              <SpiralSlider
                cards={filteredCards}
                config={config}
                onSelectCard={(card) => setSelectedCard(card)}
                onOpenPromptModal={(card) => setCodeModalCard(card)}
              />
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center gap-3 text-slate-400">
                <p className="text-base font-semibold">No 3D presets match "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-full bg-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-300 transition-all"
                >
                  Reset Search
                </button>
              </div>
            )}
          </div>

          {/* Metrics Counter Animated Section */}
          <MetricsCounterSection />

          {/* AI Scroll-Driven Section (Stage 1: SMART IT SERVICES -> Stage 2: 3 Cards for SAP, IT Recruiting, AI) */}
          <AiImpactSection
            onSelectService={(serviceId) => {
              if (serviceId === 'sap') {
                setCurrentPage('SAP');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (serviceId === 'ai') {
                setCurrentPage('AI');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (serviceId === 'recruiting' || serviceId === 'staffing') {
                setCurrentPage('Recruiting');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />

          {/* 5 Feature Cards Animated Section + Curtain Reveal 3D Timeline */}
          <RisingSlideCardsSection />

          {/* Clyptus Brandmark Particle Assembly & Early Dispersion Stage */}
          <section
            id="clyptus-logo-assemble-target"
            className="relative z-10 py-16 px-4 w-full max-w-7xl mx-auto overflow-hidden bg-transparent select-none text-center"
          >
            <div className="relative w-full h-[360px] sm:h-[420px] mx-auto flex items-center justify-center pointer-events-auto" />
          </section>
        </main>
      )}

      {/* Bottom Left White Circular Services Widget - hidden during intro */}
      {!showIntro && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <ServicesBottomLeftWidget
            onSelectService={(serviceId) => {
              if (serviceId === 'home' || serviceId === 'Home') {
                setCurrentPage('Home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (serviceId === 'sap') {
                setCurrentPage('SAP');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (serviceId === 'ai') {
                setCurrentPage('AI');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (serviceId === 'recruiting' || serviceId === 'staffing') {
                setCurrentPage('Recruiting');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />
        </motion.div>
      )}

      {/* Bottom Right Floating Social Tooltip Component - hidden during intro */}
      {!showIntro && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <FloatingSocialTooltip />
        </motion.div>
      )}

      {/* 3D Services Universe Full-Screen Cinematic Modal */}
      <Services3dOrbUniverse
        isOpen={is3dServicesOpen}
        onClose={() => setIs3dServicesOpen(false)}
        onSelectService={(serviceId) => {
          if (serviceId === 'sap') {
            setIs3dServicesOpen(false);
            setCurrentPage('SAP');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (serviceId === 'ai') {
            setIs3dServicesOpen(false);
            setCurrentPage('AI');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (serviceId === 'recruiting' || serviceId === 'staffing') {
            setIs3dServicesOpen(false);
            setCurrentPage('Recruiting');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      {/* Brand Footer: Mountain Sunset Footer on SAP, IT Recruiting, and AI pages; Ember Glow Footer on other pages */}
      {currentPage === 'SAP' || currentPage === 'AI' || currentPage === 'Recruiting' || currentPage === 'IT Recruiting' ? (
        <MountainFooter
          onNavigate={(page, sectionId) => {
            setCurrentPage(page);
            if (page === 'Services') {
              setIs3dServicesOpen(true);
            }
            if (sectionId) {
              let attempts = 0;
              const tryScroll = () => {
                const el = document.getElementById(sectionId);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else if (attempts < 10) {
                  attempts++;
                  setTimeout(tryScroll, 60);
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              };
              setTimeout(tryScroll, 50);
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          onOpen3dServices={() => setIs3dServicesOpen(true)}
          onOpenResourceModal={(type) => setActiveResourceModal(type)}
        />
      ) : (
        <Footer
          onNavigate={(page, sectionId) => {
            setCurrentPage(page);
            if (page === 'Services') {
              setIs3dServicesOpen(true);
            }
            setTimeout(() => {
              if (sectionId) {
                const el = document.getElementById(sectionId);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  return;
                }
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
          }}
          onOpen3dServices={() => setIs3dServicesOpen(true)}
          onOpenResourceModal={(type) => setActiveResourceModal(type)}
        />
      )}

      {/* Legal & Resource Modal (Privacy, Terms, FAQs, Insights, Cookies) */}
      <ResourceModal
        type={activeResourceModal}
        onClose={() => setActiveResourceModal(null)}
        onNavigateContact={() => {
          setCurrentPage('Contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating Studio Parameter Drawer */}
      <StudioCustomizer
        config={config}
        onChangeConfig={setConfig}
        onReset={() => setConfig(DEFAULT_SPIRAL_CONFIG)}
        isOpen={isCustomizerOpen}
        onToggleOpen={() => setIsCustomizerOpen(!isCustomizerOpen)}
        cards={cards}
        onUpdateCards={setCards}
      />

      {/* Card Detail Modal */}
      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onNavigate={(page) => {
            setSelectedCard(null);
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* AI Prompt & Code Generator Modal */}
      {codeModalCard && (
        <CodePromptModal
          card={codeModalCard}
          config={config}
          onClose={() => setCodeModalCard(null)}
        />
      )}
    </div>
  );
}

export default App;
