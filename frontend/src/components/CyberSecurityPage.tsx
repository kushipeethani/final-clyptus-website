import React, { useEffect, useRef } from 'react';

interface CyberSecurityPageProps {
  onNavigateContact?: () => void;
}

export const CyberSecurityPage: React.FC<CyberSecurityPageProps> = ({ onNavigateContact }) => {
  const serviceCardsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.title = 'Cybersecurity Services | Clyptus';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Protect every layer of your business with Clyptus Cybersecurity Services: Network, Cloud, Application Security, 24/7 SOC, IAM, Pen Testing, Data Protection, and GRC.'
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const cards = serviceCardsRef.current?.querySelectorAll<HTMLElement>('.cyber-service-card-reveal');
    if (!cards?.length) return;

    if (!('IntersectionObserver' in window)) {
      cards.forEach((card) => card.setAttribute('data-visible', 'true'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.setAttribute('data-visible', String(entry.isIntersecting));
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    cards.forEach((card) => observer.observe(card));
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper to split and render headings with Black, Blue, and Orange brand styling
  const renderStyledHeading = (text: string) => {
    const words = text.split(' ');
    if (words.length <= 1) {
      return (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
          {text}
        </span>
      );
    }
    const splitIndex = Math.ceil(words.length / 2);
    const firstPart = words.slice(0, splitIndex).join(' ');
    const secondPart = words.slice(splitIndex).join(' ');
    return (
      <>
        <span className="text-slate-950">{firstPart} </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
          {secondPart}
        </span>
      </>
    );
  };

  const threats = [
    'Ransomware',
    'Phishing',
    'Data breaches',
    'Unauthorized access',
    'Application vulnerabilities',
    'Cloud misconfiguration'
  ];

  // Bento Services with Minimal Background Tints & Ambient Glows
  const bentoRows = [
    {
      tiles: [
        {
          num: '01',
          title: 'Network Security',
          blurb: 'Defend the perimeter and internal traffic against intrusion and misuse.',
          subs: [
            'Firewall Management',
            'Network Monitoring',
            'Intrusion Detection & Prevention (IDS/IPS)',
            'Network Access Control'
          ],
          bg: 'from-blue-50/60 via-white to-sky-50/40',
          glow: 'bg-blue-400/20',
          borderHover: 'hover:border-blue-400',
          accent: 'text-blue-600',
          bulletBg: 'bg-blue-600',
          flexClass: 'lg:flex-[3_1_440px]'
        },
        {
          num: '02',
          title: 'Cloud Security',
          blurb: 'Secure workloads, configurations and identities across your cloud platforms.',
          subs: [
            'Cloud Infrastructure Security',
            'AWS, Azure & Google Cloud Security',
            'Cloud Security Posture Management (CSPM)',
            'Cloud Identity & Access Management'
          ],
          bg: 'from-indigo-50/60 via-white to-blue-50/40',
          glow: 'bg-indigo-400/20',
          borderHover: 'hover:border-indigo-400',
          accent: 'text-indigo-600',
          bulletBg: 'bg-indigo-600',
          flexClass: 'lg:flex-[2_1_320px]'
        }
      ]
    },
    {
      tiles: [
        {
          num: '03',
          title: 'Application Security',
          blurb: 'Build and run software that resists attack, from code to production.',
          subs: [
            'Web Application Security',
            'API Security',
            'Secure Code Review',
            'Vulnerability Assessment',
            'Application Penetration Testing'
          ],
          bg: 'from-orange-50/60 via-white to-amber-50/40',
          glow: 'bg-orange-400/20',
          borderHover: 'hover:border-orange-400',
          accent: 'text-orange-600',
          bulletBg: 'bg-orange-500',
          flexClass: 'lg:flex-[1_1_320px]'
        },
        {
          num: '04',
          title: 'Security Operations (SOC)',
          blurb: 'Round-the-clock eyes on your environment, with fast response when something happens.',
          subs: [
            '24/7 Security Monitoring',
            'Threat Detection & Response',
            'SIEM Implementation',
            'Incident Management',
            'Managed Detection & Response (MDR)'
          ],
          bg: 'from-sky-50/60 via-white to-blue-50/40',
          glow: 'bg-sky-400/20',
          borderHover: 'hover:border-sky-400',
          accent: 'text-sky-600',
          bulletBg: 'bg-sky-600',
          flexClass: 'lg:flex-[1_1_320px]'
        },
        {
          num: '05',
          title: 'Identity & Access Management (IAM)',
          blurb: 'Make sure the right people have the right access, and nobody else does.',
          subs: [
            'Multi-Factor Authentication (MFA)',
            'Single Sign-On (SSO)',
            'Privileged Access Management (PAM)',
            'User Access Governance'
          ],
          bg: 'from-violet-50/60 via-white to-indigo-50/40',
          glow: 'bg-violet-400/20',
          borderHover: 'hover:border-violet-400',
          accent: 'text-violet-600',
          bulletBg: 'bg-violet-600',
          flexClass: 'lg:flex-[1_1_320px]'
        }
      ]
    },
    {
      tiles: [
        {
          num: '06',
          title: 'Penetration Testing & Vulnerability Management',
          blurb: 'Find weaknesses before attackers do, and prioritize what to fix first.',
          subs: [
            'Network Penetration Testing',
            'Web & API Penetration Testing',
            'Security Audits',
            'Vulnerability Scanning',
            'Risk Assessment'
          ],
          bg: 'from-amber-50/60 via-white to-orange-50/40',
          glow: 'bg-amber-400/20',
          borderHover: 'hover:border-amber-400',
          accent: 'text-amber-600',
          bulletBg: 'bg-amber-600',
          flexClass: 'lg:flex-[1_1_320px]'
        },
        {
          num: '07',
          title: 'Data Security & Protection',
          blurb: 'Keep sensitive data confidential, intact and recoverable wherever it lives.',
          subs: [
            'Data Encryption',
            'Data Loss Prevention (DLP)',
            'Database Security',
            'Backup & Recovery',
            'Data Privacy Management'
          ],
          bg: 'from-blue-50/60 via-white to-cyan-50/40',
          glow: 'bg-blue-400/20',
          borderHover: 'hover:border-blue-400',
          accent: 'text-blue-600',
          bulletBg: 'bg-blue-600',
          flexClass: 'lg:flex-[1_1_320px]'
        },
        {
          num: '08',
          title: 'Governance, Risk & Compliance (GRC)',
          blurb: 'Turn security into documented policy, managed risk and passed audits.',
          subs: [
            'ISO 27001 Implementation',
            'GDPR Compliance',
            'Security Policy Development',
            'IT Risk Management',
            'Compliance Audits'
          ],
          bg: 'from-slate-100/70 via-white to-indigo-50/30',
          glow: 'bg-indigo-400/15',
          borderHover: 'hover:border-indigo-400',
          accent: 'text-indigo-600',
          bulletBg: 'bg-indigo-600',
          flexClass: 'lg:flex-[1_1_320px]'
        }
      ]
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Assess',
      desc: 'Map your assets, find vulnerabilities and measure risk to set a clear baseline.',
      related: 'Pen Testing, Vulnerability Management, Risk Assessment'
    },
    {
      num: '02',
      title: 'Protect',
      desc: 'Put the right controls around your network, cloud, applications, identities and data.',
      related: 'Network, Cloud, Application, IAM, Data Security'
    },
    {
      num: '03',
      title: 'Detect & Respond',
      desc: 'Monitor continuously, spot threats early and contain incidents quickly.',
      related: 'SOC, MDR, Incident Management'
    },
    {
      num: '04',
      title: 'Govern',
      desc: 'Keep policies, risk registers and audits current so protection lasts.',
      related: 'Governance, Risk & Compliance'
    }
  ];

  const standards = [
    { name: 'ISO 27001', sub: 'Information security management systems' },
    { name: 'GDPR', sub: 'Data protection and privacy for personal data' },
    { name: 'NIST CSF', sub: 'Risk-based cybersecurity framework' },
    { name: 'SOC 2', sub: 'Security controls for service organizations' },
    { name: 'PCI DSS', sub: 'Payment card data protection' },
    { name: 'HIPAA', sub: 'Safeguards for health information' }
  ];

  const benefits = [
    { title: 'Reduced risk', desc: 'Find and fix weaknesses before they become incidents.' },
    { title: 'Protected data', desc: 'Safeguard customer, employee and business information.' },
    { title: 'Regulatory confidence', desc: 'Stay ready for audits and meet legal obligations.' },
    { title: 'Business continuity', desc: 'Detect, contain and recover quickly to limit downtime.' }
  ];

  return (
    <div className="w-full bg-white text-slate-900 font-sans selection:bg-orange-500/20 selection:text-orange-950">
      
      {/* ==================================================== */}
      {/* 1. HERO SECTION                                      */}
      {/* ==================================================== */}
      <section className="relative w-full flex flex-col items-center pt-16 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-100 overflow-hidden">
        {/* Soft Ambient Glows (IT Recruiting Blue & Orange Palette) */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[350px] bg-blue-400/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-orange-400/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-7 text-center">
          {/* Hero Main Heading with IT Recruiting Signature Gradient */}
          <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-black tracking-tight leading-[1.05] text-slate-900">
            Cybersecurity that protects{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
              every layer
            </span>{' '}
            of your business.
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-3xl font-medium">
            Cybersecurity means protecting an organization's networks, systems, applications, data and digital infrastructure from cyber threats, unauthorized access, attacks and data breaches. Clyptus secures all of it.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleContact}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Get a security assessment
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="px-7 py-4 rounded-full text-slate-800 hover:bg-slate-50 font-bold text-sm sm:text-base border border-slate-300 hover:border-slate-400 shadow-xs transition-all cursor-pointer"
            >
              See all 8 services
            </button>
          </div>

          {/* Threats Pills */}
          <div className="flex flex-wrap gap-2.5 justify-center pt-6 max-w-4xl">
            {threats.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all rounded-full px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 border border-slate-200/80"
              >
                {t}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 2. BENTO SERVICES SECTION                            */}
      {/* ==================================================== */}
      <section ref={serviceCardsRef} id="services" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-2">
                DEFENSE ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-2xl">
                Eight services.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                  One secure business.
                </span>
              </h2>
            </div>
            <p className="text-base sm:text-lg text-slate-600 font-medium max-w-md leading-relaxed">
              Use them together for complete protection, or start with the one that matters most today.
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:gap-6">
            {bentoRows.map((row, rIdx) => (
              <div key={rIdx} className="flex flex-col lg:flex-row gap-5 sm:gap-6 items-stretch">
                {row.tiles.map((tile, tIdx) => (
                  <div
                    key={tIdx}
                    data-visible="false"
                    data-entry-direction={tIdx % 2 === 0 ? 'left' : 'right'}
                    className={`cyber-service-card-reveal min-w-0 ${tile.flexClass}`}
                  >
                    <div
                      className={`cyber-service-card relative overflow-hidden min-h-[420px] rounded-[28px] p-7 sm:p-9 bg-gradient-to-br ${tile.bg} border border-slate-200/90 ${tile.borderHover} shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.1)] transition-all duration-300 flex flex-col justify-between group`}
                    >
                      {/* Minimal Ambient Colored Glows in Background (No Heavy Images) */}
                      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[28px]">
                        <div className={`absolute -top-14 -right-14 w-52 h-52 rounded-full blur-3xl pointer-events-none ${tile.glow} transition-opacity duration-500 opacity-60 group-hover:opacity-100`} />
                        <div className={`absolute -bottom-14 -left-14 w-44 h-44 rounded-full blur-3xl pointer-events-none ${tile.glow} transition-opacity duration-500 opacity-30 group-hover:opacity-60`} />
                      </div>

                      <div className="relative z-10 flex-1 flex flex-col justify-between">
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            {/* Badge with Card Accent Color */}
                            <div className="flex items-center justify-between mb-4">
                              <span className={`font-mono font-extrabold text-xs px-3.5 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs ${tile.accent}`}>
                                {tile.num}
                              </span>
                            </div>

                            {/* Side Heading (Tile Title) */}
                            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug mb-3">
                              {renderStyledHeading(tile.title)}
                            </h3>

                            {/* Blurb */}
                            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed mb-6">
                              {tile.blurb}
                            </p>
                          </div>

                          {/* Sub-services pinned cleanly at bottom */}
                          <div className="flex flex-col gap-2.5 pt-2">
                            {tile.subs.map((sub, sIdx) => (
                              <div key={sIdx} className="flex items-start gap-3 text-sm sm:text-base font-normal text-slate-800 leading-snug">
                                <span className="w-4 h-4 rounded-full bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center shrink-0 mt-0.5">
                                  <span className={`w-1.5 h-1.5 rounded-full ${tile.bulletBg}`} />
                                </span>
                                <span>{sub}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 3. APPROACH SECTION                                  */}
      {/* ==================================================== */}
      <section id="approach" className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-12">
          
          <div>
            <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest block mb-2">
              LIFECYCLE METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl">
              Security is a cycle,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                not a one-time fix.
              </span>
            </h2>
          </div>

          <div className="flex flex-col">
            {steps.map((st, idx) => (
              <div 
                key={idx} 
                className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 py-9 border-t border-slate-200/90"
              >
                {/* Step Number in IT Recruiting Gradient */}
                <div className="font-mono font-black text-6xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight leading-none lg:w-44 shrink-0">
                  {st.num}
                </div>
                {/* Side Heading */}
                <div className="text-2xl sm:text-3xl font-black tracking-tight lg:w-72 shrink-0">
                  {renderStyledHeading(st.title)}
                </div>
                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                  {st.desc}
                </p>
                <div className="text-xs sm:text-sm font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-4 py-2 rounded-full leading-snug lg:w-64 shrink-0 text-center lg:text-left">
                  {st.related}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 4. COMPLIANCE SECTION                                */}
      {/* ==================================================== */}
      <section id="compliance" className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-t border-slate-200/80 relative overflow-hidden">
        {/* Subtle ambient glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-500/8 via-indigo-500/8 to-orange-500/8 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1240px] mx-auto flex flex-col gap-12 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-extrabold text-orange-600 uppercase tracking-widest block mb-2">
                STANDARDS &amp; FRAMEWORKS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-2xl text-slate-950">
                Meet the standards{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                  your customers expect.
                </span>
              </h2>
            </div>
            <p className="text-base sm:text-lg text-slate-600 font-medium max-w-md leading-relaxed">
              Our governance, risk and compliance team turns frameworks and regulations into policies, controls and audit-ready evidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {standards.map((c, idx) => (
              <div
                key={idx}
                className="bg-white text-slate-900 rounded-3xl p-7 sm:p-8 flex flex-col gap-2 shadow-sm hover:shadow-xl hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 border border-slate-200/90 group"
              >
                {/* Side Heading */}
                <div className="font-black text-2xl sm:text-3xl tracking-tight text-slate-950 group-hover:text-blue-600 transition-colors">
                  {c.name}
                </div>
                <div className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                  {c.sub}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 5. BENEFITS SECTION                                  */}
      {/* ==================================================== */}
      <section id="benefits" className="w-full pt-20 sm:pt-28 pb-24 sm:pb-36 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-12">
          
          <div>
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-2">
              STRATEGIC OUTCOMES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl">
              What strong cybersecurity{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                gives your business.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, idx) => (
              <div key={idx} className="flex flex-col gap-3 group">
                {/* IT Recruiting Signature Accent Bar */}
                <div className="h-2 w-14 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500" />
                {/* Side Heading */}
                <h3 className="text-2xl font-black tracking-tight leading-tight mt-1">
                  {renderStyledHeading(b.title)}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default CyberSecurityPage;