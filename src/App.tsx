import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SLIDER_CARDS, DEFAULT_SPIRAL_CONFIG } from './data/sliderData';
import type { SliderCard, SpiralConfig } from './data/sliderData';
import { Header } from './components/Header';
import { ServicesPage } from './components/ServicesPage';
import { CloudServicesPage } from './components/CloudServicesPage';
import { CyberSecurityPage } from './components/CyberSecurityPage';
import { CrmServicesPage } from './components/CrmServicesPage';
import { DataEngineeringPage } from './components/DataEngineeringPage';
import { SalesforcePage } from './components/SalesforcePage';
import { SpiralSlider } from './components/SpiralSlider';
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
import ClyptusAiChatbot from './components/ClyptusAiChatbot';
import { Footer } from './components/Footer';
import { MountainFooter } from './components/MountainFooter';
import { ResourceModal } from './components/ResourceModal';
import { applySeoForPage } from './utils/seo';

const getInitialPage = (): string => {
  if (typeof window === 'undefined') return 'Home';
  const path = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
  const hash = window.location.hash.replace('#', '').toLowerCase();
  const token = path || hash;
  if (token === 'services') return 'Services';
  if (token === 'cloud' || token === 'cloud-services') return 'Cloud';
  if (token === 'security' || token === 'cybersecurity' || token === 'cyber-security') return 'Security';
  if (token === 'crm' || token === 'crm-services') return 'CRM';
  if (token === 'data-engineering' || token === 'data' || token === 'dataengineering') return 'DataEngineering';
  if (token === 'salesforce' || token === 'salesforce-services') return 'Salesforce';
  if (token === 'sap' || token === 'erp' || token === 'erp-services') return 'SAP';
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

const hasSeenIntro = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return (
      sessionStorage.getItem('clyptus_intro_seen') === 'true' ||
      localStorage.getItem('clyptus_intro_seen') === 'true'
    );
  } catch {
    return false;
  }
};

const markIntroSeen = () => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem('clyptus_intro_seen', 'true');
    localStorage.setItem('clyptus_intro_seen', 'true');
  } catch {}
};

export function App() {
  const initialPage = useMemo(() => getInitialPage(), []);
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    return initialPage === 'Home' && !hasSeenIntro();
  });
  const [currentPage, setCurrentPage] = useState<string>(initialPage);

  // Mark intro as seen so refreshing does not re-trigger it
  useEffect(() => {
    if (showIntro) {
      markIntroSeen();
    }
  }, [showIntro]);
  const [cards] = useState<SliderCard[]>(SLIDER_CARDS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [config] = useState<SpiralConfig>(DEFAULT_SPIRAL_CONFIG);
  const [is3dServicesOpen, setIs3dServicesOpen] = useState<boolean>(false);
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

  // Apply route-specific SEO metadata and sync URL path smoothly
  useEffect(() => {
    applySeoForPage(currentPage);

    const pathMap: Record<string, string> = {
      Home: '/',
      Services: '/services',
      Cloud: '/cloud',
      Security: '/security',
      CRM: '/crm',
      DataEngineering: '/data-engineering',
      Salesforce: '/salesforce',
      SAP: '/sap',
      AI: '/ai',
      Recruiting: '/recruiting',
      'IT Recruiting': '/recruiting',
      Contact: '/contact',
      Projects: '/projects',
      About: '/about',
      Careers: '/careers',
      Industries: '/industries',
      Blogs: '/blogs',
      'HR Policies': '/hr-policies',
    };

    const targetPath = pathMap[currentPage] || '/';
    // If running on a dedicated route or clean path, sync URL without hash pollution
    if (window.location.pathname !== targetPath && !window.location.hash) {
      window.history.pushState(null, '', targetPath);
    }
  }, [currentPage]);

  // HR Policies Authentication State
  const [isHrAuthenticated, setIsHrAuthenticated] = useState<boolean>(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(null);

  const handleHrLogin = async (u: string, p: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username: u, password: p }),
      });
      let data: any = null;
      try {
        data = await res.json();
      } catch {
        const text = await res.text().catch(() => '');
        return {
          success: false,
          error: `Authentication service error (HTTP ${res.status}): ${text || 'Server returned invalid response.'}`,
        };
      }
      if (res.ok && data?.success) {
        setIsHrAuthenticated(true);
        setAuthenticatedUser(data.user.username);
        return { success: true };
      }
      return { success: false, error: data?.error || 'Invalid credentials. Access denied.' };
    } catch (err: any) {
      return {
        success: false,
        error: `Authentication service unreachable (${err?.message || 'Network error'}). Please try again.`,
      };
    }
  };

  const handleHrLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    } catch {}
    setIsHrAuthenticated(false);
    setAuthenticatedUser(null);
  };

  // Restore authenticated HR session on initial mount / page refresh
  useEffect(() => {
    fetch('/api/auth/session', { credentials: 'same-origin' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.authenticated && data.user?.username) {
          setIsHrAuthenticated(true);
          setAuthenticatedUser(data.user.username);
        }
      })
      .catch(() => {});
  }, []);

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
      {/* Full-Screen Cinematic Intro Animation (1st time visit only) */}
      {showIntro && (
        <CinematicIntro
          onComplete={() => {
            markIntroSeen();
            setShowIntro(false);
          }}
          onSkip={() => {
            markIntroSeen();
            setShowIntro(false);
          }}
        />
      )}

      {/* Navigation Header - hidden while entry logo intro is playing */}
      {!showIntro && (
        <Header
          activePage={currentPage}
          onNavigate={(page: string) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
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
      ) : currentPage === 'Services' ? (
        /* DEDICATED SERVICES PAGE (4 CARDS: ERP, CRM, DATA & CLOUD, HCM) */
        <main className="w-full flex-1 flex flex-col items-center">
          <ServicesPage
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateContact={() => {
              setCurrentPage('Contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : currentPage === 'Cloud' ? (
        /* DEDICATED CLOUD & DATA SERVICES PAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          <CloudServicesPage
            onNavigateContact={() => {
              setCurrentPage('Contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : currentPage === 'Security' || currentPage === 'CyberSecurity' ? (
        /* DEDICATED CYBERSECURITY SERVICES PAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          <CyberSecurityPage
            onNavigateContact={() => {
              setCurrentPage('Contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : currentPage === 'CRM' ? (
        /* DEDICATED CRM SERVICES PAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          <CrmServicesPage
            onNavigateContact={() => {
              setCurrentPage('Contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : currentPage === 'DataEngineering' ? (
        /* DEDICATED DATA ENGINEERING SERVICES PAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          <DataEngineeringPage
            onNavigateContact={() => {
              setCurrentPage('Contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : currentPage === 'Salesforce' ? (
        /* DEDICATED SALESFORCE SERVICES PAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          <SalesforcePage
            onNavigateContact={() => {
              setCurrentPage('Contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
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
              AI-Driven Solutions for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600">Smarter Business Future</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl leading-relaxed">
              From AI innovation to end-to-end IT services, we empower businesses to transform, innovate, and scale with intelligent technology solutions built for the future.
            </p>
          </div>

          {/* 3D Spiral Slider Stage (Full Width Edge-to-Edge) */}
          <div className="w-full">
            {filteredCards.length > 0 ? (
              <SpiralSlider
                cards={filteredCards}
                config={config}
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

          {/* AI Scroll-Driven Section (Stage 1: INTELLIGENT TECHNOLOGY -> Stage 2: 3 Cards for SAP, Talent Acquisition, AI) */}
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
              } else if (serviceId === 'about' || serviceId === 'vision' || serviceId === 'mission') {
                setCurrentPage('About');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (serviceId === 'careers' || serviceId === 'life') {
                setCurrentPage('Careers');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />

          {/* 5 Feature Cards Animated Section + Curtain Reveal 3D Timeline */}
          <RisingSlideCardsSection />
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
              } else if (serviceId === 'sap' || serviceId === 'erp' || serviceId === 'services') {
                setCurrentPage('Services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (serviceId === 'ai') {
                setCurrentPage('AI');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (serviceId === 'recruiting' || serviceId === 'staffing') {
                setCurrentPage('Recruiting');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (serviceId === 'about' || serviceId === 'vision' || serviceId === 'mission') {
                setCurrentPage('About');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (serviceId === 'careers' || serviceId === 'life') {
                setCurrentPage('Careers');
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

      {/* Keva Intelligent Virtual Assistant */}
      {!showIntro && (
        <ClyptusAiChatbot
          onNavigate={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
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
      {currentPage === 'Services' || currentPage === 'Cloud' || currentPage === 'SAP' || currentPage === 'AI' || currentPage === 'Recruiting' || currentPage === 'IT Recruiting' || currentPage === 'Salesforce' ? (
        <MountainFooter
          onNavigate={(page, sectionId) => {
            setCurrentPage(page);
            if (page === 'Services') {
              setCurrentPage('Services');
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
            // regular navigation
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

      </div>
  );
}

export default App;
