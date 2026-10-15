import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Search, 
  ArrowRight, 
  Copy, 
  Check, 
  X, 
  Mail, 
  Rocket, 
  Globe2, 
  DollarSign, 
  Users, 
  Home, 
  BookOpen
} from 'lucide-react';

interface JobPosition {
  id: number;
  title: string;
  category: 'sap' | 'oracle' | 'cloud' | 'ai' | 'hr';
  type: 'Full-Time' | 'Contract' | 'Remote';
  location: string;
  exp: string;
  salary: string;
  tags: string[];
  featured?: boolean;
  isNew?: boolean;
}

interface CareersPageProps {
  onNavigateContact?: () => void;
}

export const CareersPage: React.FC<CareersPageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeJobModal, setActiveJobModal] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const positions: JobPosition[] = [
    {
      id: 1,
      title: 'SAP S/4HANA Consultant',
      category: 'sap',
      type: 'Full-Time',
      location: 'Hyderabad',
      exp: '3–6 yrs',
      salary: '₹12–20 LPA',
      tags: ['SAP S/4HANA', 'ABAP', 'FICO', 'MM/SD'],
      featured: true,
    },
    {
      id: 2,
      title: 'Oracle ERP Cloud Functional Consultant',
      category: 'oracle',
      type: 'Full-Time',
      location: 'Hyderabad',
      exp: '4–8 yrs',
      salary: '₹14–22 LPA',
      tags: ['Oracle ERP', 'SCM', 'Financials', 'HCM'],
      isNew: true,
    },
    {
      id: 3,
      title: 'Power BI / Data Analytics Consultant',
      category: 'ai',
      type: 'Full-Time',
      location: 'Hyderabad / Remote',
      exp: '2–5 yrs',
      salary: '₹10–16 LPA',
      tags: ['Power BI', 'SQL', 'DAX', 'Azure'],
      isNew: true,
    },
    {
      id: 4,
      title: 'Cloud Solutions Architect (AWS / Azure / OCI)',
      category: 'cloud',
      type: 'Remote',
      location: 'Remote / Hyderabad',
      exp: '5–10 yrs',
      salary: '₹18–30 LPA',
      tags: ['AWS', 'Azure', 'OCI', 'Terraform'],
    },
    {
      id: 5,
      title: 'SAP BRIM / Billing Consultant',
      category: 'sap',
      type: 'Full-Time',
      location: 'Hyderabad',
      exp: '3–7 yrs',
      salary: '₹14–20 LPA',
      tags: ['SAP BRIM', 'Convergent Billing', 'FICA'],
    },
    {
      id: 6,
      title: 'Oracle HCM Cloud Consultant',
      category: 'oracle',
      type: 'Full-Time',
      location: 'UAE / Hyderabad',
      exp: '3–6 yrs',
      salary: '₹12–18 LPA',
      tags: ['Oracle HCM', 'Core HR', 'Payroll', 'Talent Mgmt'],
    },
    {
      id: 7,
      title: 'IT Recruiter – SAP & Oracle Talent',
      category: 'hr',
      type: 'Full-Time',
      location: 'Hyderabad',
      exp: '1–4 yrs',
      salary: '₹4–8 LPA',
      tags: ['IT Recruitment', 'SAP Hiring', 'LinkedIn'],
    },
    {
      id: 8,
      title: 'AI / ML Engineer',
      category: 'ai',
      type: 'Contract',
      location: 'Remote',
      exp: '3–5 yrs',
      salary: '₹16–25 LPA',
      tags: ['Python', 'LLM', 'TensorFlow', 'Azure AI'],
      isNew: true,
    },
    {
      id: 9,
      title: 'SAP SuccessFactors Consultant',
      category: 'sap',
      type: 'Full-Time',
      location: 'Hyderabad',
      exp: '2–5 yrs',
      salary: '₹10–16 LPA',
      tags: ['SuccessFactors', 'EC', 'Recruiting', 'LMS'],
    },
    {
      id: 10,
      title: 'Business Intelligence (BI) Analyst',
      category: 'ai',
      type: 'Full-Time',
      location: 'Hyderabad / Remote',
      exp: '1–3 yrs',
      salary: '₹6–10 LPA',
      tags: ['Power BI', 'Tableau', 'SQL', 'Excel'],
    },
    {
      id: 11,
      title: 'DevOps / Cloud Infrastructure Engineer',
      category: 'cloud',
      type: 'Full-Time',
      location: 'Hyderabad',
      exp: '2–4 yrs',
      salary: '₹10–18 LPA',
      tags: ['Docker', 'Kubernetes', 'CI/CD', 'Azure DevOps'],
    },
    {
      id: 12,
      title: 'HR Business Partner',
      category: 'hr',
      type: 'Full-Time',
      location: 'Hyderabad',
      exp: '3–6 yrs',
      salary: '₹8–14 LPA',
      tags: ['HRBP', 'Employee Relations', 'L&D'],
    },
  ];

  const filteredPositions = useMemo(() => {
    return positions.filter((job) => {
      const matchesCategory = 
        selectedCategory === 'all' ||
        job.category === selectedCategory ||
        (selectedCategory === 'fulltime' && job.type === 'Full-Time') ||
        (selectedCategory === 'remote' && (job.type === 'Remote' || job.location.includes('Remote')));

      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hr.india@clyptus.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 font-sans select-none">
      
      {/* ---------------------------------------------------- */}
      {/* HERO SECTION                                         */}
      {/* ---------------------------------------------------- */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-white text-slate-900 overflow-hidden border-b border-slate-200/80">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.08]">
            Build the Future of <br className="hidden sm:block" />
            <span className="text-blue-600">
              Enterprise Technology
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            Join a team of experts delivering SAP, Oracle, AI, and cloud solutions to enterprises across India and the UAE.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-100 text-center">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-3xl font-black text-blue-600 font-sans tabular-nums block">12+</span>
              <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">Open Positions</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-3xl font-black text-blue-600 font-sans tabular-nums block">2</span>
              <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">Office Locations</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-3xl font-black text-blue-600 font-sans tabular-nums block">100%</span>
              <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">Growth Focused</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-3xl font-black text-amber-600 font-sans tabular-nums block">5★</span>
              <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">Team Culture</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* JUNIOR & SENIOR PROGRAM OVERVIEW (CENTERED TEXT)     */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto space-y-16 text-center">
          
          {/* Clyptus Junior Program Block */}
          <div>
            <span className="text-xs font-sans font-bold text-blue-600 uppercase tracking-widest block mb-3">
              CLYPTUS JUNIOR PROGRAM
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Our Open Junior Positions
            </h2>
            <div className="space-y-2 text-sm sm:text-base text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
              <p>
                We believe in younger generation’s momentum, ideas and way of thinking.
              </p>
              <p>
                Future IT products and development directions are inconceivable without them.
              </p>
              <p>
                Our consultant, developer and project manager training programs supports their development with the knowledge and experience of senior staff.
              </p>
            </div>
          </div>

          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mx-auto" />

          {/* Clyptus Senior Program Block */}
          <div>
            <span className="text-xs font-sans font-bold text-blue-600 uppercase tracking-widest block mb-3">
              CLYPTUS SENIOR PROGRAM
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Our Open Senior Positions
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
              <p>
                Do you have few or several years of experience related to our main service lines?
              </p>
              <p>
                We are constantly looking for skilled IT professionals, consultants, developers and project managers.
              </p>
              <p>
                Discover our current positions below and send us your application with a few clicks to boost your career at Clyptus!
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* FILTER & SEARCH BAR                                  */}
      {/* ---------------------------------------------------- */}
      <section className="py-12 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search roles, skills, or locations..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: 'All Roles' },
              { id: 'sap', label: 'SAP' },
              { id: 'oracle', label: 'Oracle' },
              { id: 'cloud', label: 'Cloud' },
              { id: 'ai', label: 'AI & Analytics' },
              { id: 'hr', label: 'HR & Talent' },
              { id: 'fulltime', label: 'Full-Time' },
              { id: 'remote', label: 'Remote' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200/90 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Counter Header */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500 font-sans font-medium">
          <span>
            SHOWING <strong className="text-slate-900 font-bold">{filteredPositions.length}</strong> OPEN ROLES
          </span>
          <span>LOCATION: HYDERABAD & REMOTE</span>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPositions.map((job) => (
            <div 
              key={job.id}
              className={`p-5 rounded-2xl bg-white border transition-all flex flex-col justify-between relative overflow-hidden ${
                job.featured 
                  ? 'border-amber-400/90 shadow-md ring-1 ring-amber-400/20' 
                  : 'border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1'
              }`}
            >
              {job.featured && (
                <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-sans text-[10px] font-black uppercase px-2.5 py-0.5 rounded-bl-lg tracking-wider">
                  ★ FEATURED
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  {job.isNew && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-sans text-[10px] font-bold">
                      NEW
                    </span>
                  )}
                  <span className="text-[11px] font-sans font-bold text-slate-500 uppercase tracking-wider">
                    {job.category.toUpperCase()} PRACTICE
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 mb-2 leading-snug">
                  {job.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                    <span>{job.exp}</span>
                  </div>
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.tags.map((tg, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-sans font-medium"
                    >
                      {tg}
                    </span>
                  ))}
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-sans font-bold">
                    {job.salary}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-sans font-semibold text-slate-400 uppercase tracking-wider">
                  HR EMAIL APPLY
                </span>
                <button
                  onClick={() => setActiveJobModal(job.title)}
                  className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-all shadow-sm shadow-blue-500/20 flex items-center gap-1"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPositions.length === 0 && (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
            <h3 className="text-lg font-bold text-slate-900 mb-2">No matching positions found</h3>
            <p className="text-xs font-medium mb-4">Try adjusting your filter tags or search keyword.</p>
            <button 
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-full bg-slate-100 text-slate-800 text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>


      {/* ---------------------------------------------------- */}
      {/* LIFE AT CLYPTUS (PERKS)                             */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-sans font-bold text-blue-600 uppercase tracking-widest block mb-2">
              LIFE AT CLYPTUS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Why Work at Clyptus?
            </h2>
            <p className="text-sm text-slate-600 font-medium mt-3">
              More than a job — a platform to grow your expertise in enterprise technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Rocket,
                title: 'Accelerated Growth',
                desc: 'Work on SAP, Oracle, and AI projects from day one with structured senior mentorship.'
              },
              {
                icon: Globe2,
                title: 'Global Exposure',
                desc: 'Serve enterprise clients across India, UAE, and global markets with on-site opportunities.'
              },
              {
                icon: DollarSign,
                title: 'Competitive Pay',
                desc: 'Market-leading salaries, performance bonuses, and transparent 6-month appraisal cycles.'
              },
              {
                icon: Users,
                title: 'Great Culture',
                desc: 'Flat hierarchy where your ideas reach leadership directly. Zero red tape.'
              },
              {
                icon: Home,
                title: 'Flexible Work',
                desc: 'Hybrid and remote options available. We care about quality output, not hours.'
              },
              {
                icon: BookOpen,
                title: 'Certifications',
                desc: 'Company-sponsored SAP, Oracle, AWS, and Azure professional certifications.'
              },
            ].map((perk, idx) => {
              const IconComponent = perk.icon;
              return (
                <div 
                  key={idx}
                  className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-6">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Direct Resume Box */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-amber-50/90 border border-amber-200/80 text-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black mb-2 text-slate-900">
                Don't see your specific role?
              </h3>
              <p className="text-sm text-slate-600 font-medium">
                Send your resume directly — we review every profile personally.
              </p>
            </div>
            <button
              onClick={() => setActiveJobModal('General Application')}
              className="px-6 py-3.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-extrabold text-sm transition-all shadow-md shrink-0 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Send Your Resume</span>
            </button>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* APPLICATION MODAL POPUP                              */}
      {/* ---------------------------------------------------- */}
      {activeJobModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => setActiveJobModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 font-bold">
              <Mail className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-1">
              Interested? Send Your Resume!
            </h3>
            <p className="text-xs font-sans font-bold text-amber-600 mb-4">
              ROLE: {activeJobModal.toUpperCase()}
            </p>

            <p className="text-xs text-slate-600 font-medium mb-6 leading-relaxed">
              Please share your updated CV/Resume along with your current location and notice period to our recruitment team:
            </p>

            {/* Email Box */}
            <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-100 border border-slate-200 mb-6">
              <input 
                type="text" 
                value="hr.india@clyptus.com" 
                readOnly 
                className="bg-transparent text-slate-900 font-sans text-xs font-bold px-3 flex-1 focus:outline-none"
              />
              <button
                onClick={handleCopyEmail}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-all flex items-center gap-1.5 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <button
              onClick={() => setActiveJobModal(null)}
              className="w-full py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
