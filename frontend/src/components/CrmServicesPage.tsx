import React, { useEffect } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface CrmServicesPageProps {
  onNavigateContact?: () => void;
}

export const CrmServicesPage: React.FC<CrmServicesPageProps> = ({ onNavigateContact }) => {
  useEffect(() => {
    document.title = 'CRM Services | Clyptus';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Clyptus implements and supports SAP Customer Experience (SAP CX), Oracle Fusion Cloud CX, and Microsoft Dynamics 365 CRM across sales, service, marketing, commerce, and customer data.'
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const platforms = [
    {
      id: 'sap',
      num: '01',
      short: 'SAP CRM',
      name: 'SAP CRM Services',
      tag: 'SAP Customer Experience (SAP CX)',
      bgClass: 'bg-[#F4F8FD] border-y border-slate-200/70',
      numColor: 'text-[#4A72AB]/40 group-hover:text-[#4A72AB]/70 transition-colors',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/80',
      accentColor: '#0072CE',
      desc: 'SAP provides CRM capabilities through SAP Customer Experience (SAP CX) and its cloud applications. Clyptus helps you choose, implement and run the right SAP solutions for sales, service, commerce, marketing and billing.',
      note: 'SAP Sales Cloud and Service Cloud are modern cloud CRM solutions; SAP CRM 7.0 is the older on-premises CRM product.',
      fit: 'SAP ERP or SAP S/4HANA',
      modules: [
        { name: 'SAP Sales Cloud', fn: 'Lead management, opportunity management, sales forecasting' },
        { name: 'SAP Service Cloud', fn: 'Customer support, service requests, ticket management' },
        { name: 'SAP Commerce Cloud', fn: 'E-commerce, product catalogs, online customer experience' },
        { name: 'SAP Customer Data Platform (CDP)', fn: 'Customer data integration and customer profiles' },
        { name: 'SAP Emarsys Customer Engagement', fn: 'Marketing automation and personalized campaigns' },
        { name: 'SAP CPQ', fn: 'Product configuration, pricing and quotations' },
        { name: 'SAP Subscription Billing', fn: 'Subscription and recurring revenue management' },
      ],
      services: [
        'SAP CRM Implementation',
        'SAP Sales & Service Cloud Implementation',
        'SAP CRM Customization',
        'SAP CRM Integration with SAP ERP and SAP S/4HANA',
        'SAP CRM Migration and Data Management',
        'SAP CRM Support and Maintenance',
      ],
    },
    {
      id: 'oracle',
      num: '02',
      short: 'Oracle CRM',
      name: 'Oracle CRM Services',
      tag: 'Oracle Fusion Cloud Customer Experience (CX)',
      bgClass: 'bg-[#FDF8F3] border-y border-slate-200/70',
      numColor: 'text-[#BF7443]/40 group-hover:text-[#BF7443]/70 transition-colors',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200/80',
      accentColor: '#D97706',
      desc: 'Oracle offers CRM capabilities through Oracle Fusion Cloud Customer Experience (CX). Clyptus delivers Oracle CX across sales, service, marketing, commerce, field service and partner management.',
      note: '',
      fit: 'Oracle ERP',
      modules: [
        { name: 'Oracle Sales', fn: 'Lead, account, contact and opportunity management' },
        { name: 'Oracle Service', fn: 'Customer support and service management' },
        { name: 'Oracle Marketing', fn: 'Campaign management and marketing automation' },
        { name: 'Oracle Commerce', fn: 'E-commerce and digital customer experience' },
        { name: 'Oracle CPQ', fn: 'Product configuration, pricing and quotation' },
        { name: 'Oracle Field Service', fn: 'Field technician scheduling and management' },
        { name: 'Oracle Customer Data Management', fn: 'Customer data and account management' },
        { name: 'Oracle Incentive Compensation', fn: 'Sales commission and incentive management' },
        { name: 'Oracle Partner Relationship Management', fn: 'Partner and channel management' },
      ],
      services: [
        'Oracle CRM Implementation',
        'Oracle Sales & Service Cloud Implementation',
        'Oracle CRM Customization',
        'Oracle CRM Integration with Oracle ERP',
        'Oracle CX Data Migration',
        'Oracle CRM Support and Maintenance',
      ],
    },
    {
      id: 'dynamics',
      num: '03',
      short: 'Dynamics 365 CRM',
      name: 'Microsoft Dynamics 365 CRM Services',
      tag: 'Dynamics 365 Customer Engagement applications',
      bgClass: 'bg-[#F3FAF5] border-y border-slate-200/70',
      numColor: 'text-[#4B9470]/40 group-hover:text-[#4B9470]/70 transition-colors',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      accentColor: '#059669',
      desc: 'Microsoft Dynamics 365 provides CRM solutions through its Customer Engagement applications. Clyptus connects them with Microsoft 365 and the Power Platform so teams work in the tools they already use.',
      note: '',
      fit: 'Microsoft 365 and the Power Platform',
      modules: [
        { name: 'Dynamics 365 Sales', fn: 'Lead management, opportunity tracking and sales automation' },
        { name: 'Dynamics 365 Customer Service', fn: 'Customer support, case management and ticketing' },
        { name: 'Dynamics 365 Customer Insights – Journeys', fn: 'Marketing automation and customer engagement' },
        { name: 'Dynamics 365 Customer Insights – Data', fn: 'Customer data unification and customer profiles' },
        { name: 'Dynamics 365 Field Service', fn: 'Field service scheduling and work orders' },
        { name: 'Dynamics 365 Contact Center', fn: 'Omnichannel customer communication and contact center operations' },
        { name: 'Dynamics 365 Project Operations', fn: 'Project-based sales, resource and delivery management' },
        { name: 'Dynamics 365 Commerce', fn: 'Retail, e-commerce and omnichannel commerce' },
      ],
      services: [
        'Dynamics 365 CRM Implementation',
        'Sales & Customer Service Automation',
        'CRM Customization and Configuration',
        'Power Platform Integration (Power Apps, Power Automate, Power BI)',
        'CRM Data Migration',
        'CRM Integration with Microsoft 365 and ERP',
        'CRM Support and Maintenance',
      ],
    },
  ];

  const jumps = [
    { href: 'sap', num: '01', name: 'SAP CRM', count: '7 modules · 6 services' },
    { href: 'oracle', num: '02', name: 'Oracle CRM', count: '9 modules · 6 services' },
    { href: 'dynamics', num: '03', name: 'Microsoft Dynamics 365', count: '8 modules · 7 services' },
  ];

  const journey = [
    {
      num: '01',
      title: 'Discover',
      desc: 'Understand your sales, service and marketing processes and the systems you already use.',
    },
    {
      num: '02',
      title: 'Design',
      desc: 'Select the right platform and modules and shape the solution around your process.',
    },
    {
      num: '03',
      title: 'Build & Integrate',
      desc: 'Configure and customize the CRM and connect it to your ERP and business tools.',
    },
    {
      num: '04',
      title: 'Migrate',
      desc: 'Move and clean your customer data so the new system starts with trusted records.',
    },
    {
      num: '05',
      title: 'Support',
      desc: 'Maintain, improve and support the platform after go-live.',
    },
  ];

  return (
    <div className="w-full bg-white text-[#101827] font-sans selection:bg-blue-500/20 selection:text-blue-900">
      
      {/* ==================================================== */}
      {/* 1. HERO SECTION                                      */}
      {/* ==================================================== */}
      <section className="w-full flex flex-col items-center pt-10 sm:pt-16 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-100 bg-white">
        <div className="w-full max-w-[1240px] flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-12 lg:gap-16">
          
          {/* Left Column */}
          <div className="flex-1 max-w-2xl flex flex-col gap-6">
            <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-black leading-[0.98] tracking-[-0.04em] text-[#101827]">
              Three CRM platforms.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                One expert partner.
              </span>
            </h1>

            <p className="text-lg sm:text-[20px] leading-[1.6] text-[#3B4658] max-w-[640px]">
              CRM (Customer Relationship Management) services help businesses manage customer relationships, sales, marketing, customer support and customer data. Clyptus implements and supports SAP, Oracle and Microsoft Dynamics 365.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleContact}
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 hover:opacity-95 text-white font-semibold text-base px-7 py-3.5 rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Talk to our CRM team</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('sap')}
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-300 font-semibold text-base px-6 py-3.5 rounded-full shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore platforms</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Right Column: Platform Quick Jump Cards */}
          <div className="w-full lg:w-[400px] shrink-0 border-t-2 border-[#101827] flex flex-col">
            {jumps.map((j) => (
              <button
                key={j.href}
                onClick={() => scrollToSection(j.href)}
                className="group flex items-center gap-5 py-6 px-1 border-b border-[#D5DAE2] text-[#101827] hover:bg-slate-50/70 transition-all text-left cursor-pointer"
              >
                <span className="flex-none font-black text-[22px] text-[#5A6577] group-hover:text-blue-600 transition-colors w-11">
                  {j.num}
                </span>
                <span className="flex-1 flex flex-col gap-0.5">
                  <span className="font-bold text-[24px] sm:text-[26px] tracking-[-0.01em]">
                    {renderStyledHeading(j.name)}
                  </span>
                  <span className="text-[15px] text-[#5A6577]">
                    {j.count}
                  </span>
                </span>
                <span className="text-2xl font-semibold text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 2. PLATFORM SECTIONS (SAP, ORACLE, DYNAMICS 365)     */}
      {/* ==================================================== */}
      {platforms.map((p) => (
        <section
          key={p.id}
          id={p.id}
          className={`w-full flex flex-col items-center py-20 sm:py-24 ${p.bgClass}`}
        >
          <div className="w-full max-w-[1240px] px-4 sm:px-6 lg:px-8 flex flex-col gap-14 sm:gap-16">
            
            {/* Platform Header: Big Number + Title & Fit Info */}
            <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-14">
              <div className={`font-black text-7xl sm:text-9xl lg:text-[160px] leading-[0.8] tracking-[-0.06em] select-none ${p.numColor}`}>
                {p.num}
              </div>

              <div className="flex-1 flex flex-col gap-4">
                <div className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#3B4658]">
                  {p.tag}
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-black leading-tight tracking-[-0.035em]">
                  {renderStyledHeading(p.name)}
                </h2>

                <p className="text-base sm:text-[19px] leading-[1.65] text-[#2C3748] max-w-[760px]">
                  {p.desc}
                </p>

                {/* Optional Note (e.g. for SAP) */}
                {p.note && (
                  <div className="bg-white border-2 border-[#101827] rounded-xl p-4 sm:p-5 text-sm sm:text-base leading-relaxed text-[#101827] max-w-[760px] shadow-xs">
                    <strong>Good to know:</strong> {p.note}
                  </div>
                )}

                {/* Strong Fit Pill */}
                <div className="flex flex-wrap items-baseline gap-2 pt-1 text-sm sm:text-base text-[#2C3748]">
                  <span className="font-bold text-[#101827]">Strong fit when you use</span>
                  <span className="bg-white border border-slate-200/80 rounded-full px-4 py-1 font-semibold text-[#101827] shadow-2xs">
                    {p.fit}
                  </span>
                </div>
              </div>
            </div>

            {/* Split Content: Modules List + Services Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
              
              {/* Left Column: Modules & solutions (span 7) */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex items-baseline justify-between gap-4 pb-4 border-b-2 border-[#101827]">
                  <h3 className="font-black text-2xl sm:text-[28px] tracking-[-0.02em]">
                    {renderStyledHeading('Modules & solutions')}
                  </h3>
                  <span className="text-sm sm:text-[15px] font-semibold text-[#3B4658]">
                    {p.modules.length} modules
                  </span>
                </div>

                <div className="flex flex-col divide-y divide-[#101827]/15">
                  {p.modules.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-8 py-5 group hover:bg-white/60 px-3 -mx-3 rounded-xl transition-all"
                    >
                      <div className="sm:w-[240px] shrink-0 font-bold text-lg sm:text-[21px] leading-snug text-[#101827]">
                        {m.name}
                      </div>
                      <div className="flex-1 text-sm sm:text-[17px] leading-relaxed text-[#2C3748]">
                        {m.fn}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Our Services Card (span 5) */}
              <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-7 sm:p-9 flex flex-col gap-2 shadow-lg border border-slate-200/90">
                <h3 className="font-black text-2xl sm:text-[28px] tracking-[-0.02em] leading-tight pb-3.5 text-slate-950">
                  Our{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                    {p.short} services
                  </span>
                </h3>

                <div className="flex flex-col divide-y divide-slate-100">
                  {p.services.map((srv, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-start gap-4 py-4 text-left group hover:translate-x-1 transition-transform"
                    >
                      <span className="flex-none font-black text-[17px] text-orange-500 w-7">
                        {String(sIdx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm sm:text-[17px] font-semibold leading-snug text-slate-800 group-hover:text-blue-600 transition-colors">
                        {srv}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 mt-2">
                  <button
                    onClick={handleContact}
                    className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 hover:opacity-95 text-white font-bold py-3.5 px-6 rounded-full text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-95"
                  >
                    <span>Inquire about {p.short}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>
      ))}

      {/* ==================================================== */}
      {/* 3. HOW WE WORK (5-STEP PROCESS)                      */}
      {/* ==================================================== */}
      <section id="how-it-works" className="w-full flex flex-col items-center py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-[1240px] flex flex-col gap-12 sm:gap-14">
          
          <div className="flex flex-col gap-3.5 max-w-[760px]">
            <div className="text-xs sm:text-[15px] font-bold tracking-[0.14em] uppercase text-orange-600">
              How we work
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-black leading-tight tracking-[-0.035em]">
              The same proven path{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                on every platform.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-5">
            {journey.map((step) => (
              <div
                key={step.num}
                className="flex flex-col gap-3 pt-5 border-t-4 border-[#101827] bg-white group hover:translate-y-[-2px] transition-transform"
              >
                <div className="font-extrabold text-sm sm:text-[15px] text-blue-600 tracking-wider">
                  STEP {step.num}
                </div>
                <div className="font-black text-2xl sm:text-[26px] leading-tight tracking-[-0.02em]">
                  {renderStyledHeading(step.title)}
                </div>
                <p className="text-sm sm:text-[17px] leading-relaxed text-[#3B4658]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};