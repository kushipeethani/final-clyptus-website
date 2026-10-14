import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  LogOut,
  AlertCircle,
  Download,
  Shield,
  Heart,
  Calendar,
  MessageSquare,
  BookOpen,
  UserCheck,
  Sparkles,
  AlertTriangle,
  Eye,
  EyeOff,
  Mail
} from 'lucide-react';

interface HrPolicyPageProps {
  onNavigateContact?: () => void;
  isAuthenticated: boolean;
  authenticatedUser: string | null;
  onLogin: (username: string, pass: string) => Promise<{ success: boolean; error?: string }> | boolean;
  onLogout: () => void;
}

export interface PolicyCardItem {
  id: string;
  title: string;
  category: 'Conduct' | 'Benefits' | 'Leave' | 'Compliance';
  description: string;
  fileName: string;
  fileUrl: string;
  fileSize: string;
  gradient: string;
  icon: React.ReactNode;
}

export const HrPolicyPage: React.FC<HrPolicyPageProps> = ({
  isAuthenticated,
  authenticatedUser,
  onLogin,
  onLogout,
}) => {
  // Login Form States
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Category Filter Tab
  const [activeTab, setActiveTab] = useState<string>('All Policies');

  // 10 OFFICIAL PDF DOCUMENTS FOR USER: CLYPTUS (AUTHENTICATED ENDPOINTS)
  const clyptusPolicies: PolicyCardItem[] = [
    {
      id: 'code-of-conduct',
      title: 'Code of Conduct',
      category: 'Conduct',
      description:
        'Mandates ethical behavior, fair competition, protection of company assets, and prohibition of illegal gifts. Effective January 1, 2026 for all employees, contractors, and vendors.',
      fileName: 'Code of Conduct.pdf',
      fileUrl: '/api/documents?id=code-of-conduct',
      fileSize: '341 KB',
      gradient: 'from-[#0089D7] via-[#0073b6] to-[#111A2E]',
      icon: <Shield className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'disciplinary-policy',
      title: 'Disciplinary Policy',
      category: 'Conduct',
      description:
        'Addresses misconduct for all employees excluding contractors. Warnings progress from first (12 months) to final, with potential dismissal for gross misconduct like theft or breaches.',
      fileName: 'Disciplinary Policy.pdf',
      fileUrl: '/api/documents?id=disciplinary-policy',
      fileSize: '378 KB',
      gradient: 'from-[#0089D7] via-[#0096eb] to-[#005e95]',
      icon: <AlertTriangle className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'employee-benefits',
      title: 'Employee Benefits',
      category: 'Benefits',
      description:
        'Covers health insurance, provident fund, and perks for all Clyptus employees. Benefits aim to support employee welfare and retention. Contact HR for entitlements and eligibility details.',
      fileName: 'Employee benefits policy.pdf',
      fileUrl: '/api/documents?id=employee-benefits',
      fileSize: '273 KB',
      gradient: 'from-[#0089D7] via-[#111A2E] to-[#005a9e]',
      icon: <Heart className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'leave-policy',
      title: 'Leave Policy',
      category: 'Leave',
      description:
        'Covers casual, sick, and earned leave entitlements for all employees. Defines accrual and approval processes. The signed policy ensures full compliance with applicable Indian labor laws.',
      fileName: 'Leave, Maternity, Paternity Policy.pdf',
      fileUrl: '/api/documents?id=leave-policy',
      fileSize: '1.45 MB',
      gradient: 'from-[#0089D7] via-[#0073b6] to-[#111A2E]',
      icon: <Calendar className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'grievance-policy',
      title: 'Grievance Policy',
      category: 'Compliance',
      description:
        'Provides structured processes for employee complaints and resolutions. Employees can raise issues without retaliation, escalating to higher management if needed. Aims for swift, impartial redressal.',
      fileName: 'Grievance Redressal Policy.pdf',
      fileUrl: '/api/documents?id=grievance-policy',
      fileSize: '435 KB',
      gradient: 'from-[#0089D7] via-[#0096eb] to-[#111A2E]',
      icon: <MessageSquare className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'employee-handbook',
      title: 'Employee Handbook',
      category: 'Conduct',
      description:
        'Complete guide integrating all Clyptus HR policies for daily operations. Covers onboarding, performance, ethics, and company culture. Signed acknowledgment binds employees to its terms.',
      fileName: 'Clyptus Employee Handbook.pdf',
      fileUrl: '/api/documents?id=employee-handbook',
      fileSize: '397 KB',
      gradient: 'from-[#111A2E] via-[#0089D7] to-[#005e95]',
      icon: <BookOpen className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'maternity-leave-policy',
      title: 'Maternity Leave Policy',
      category: 'Leave',
      description:
        'Provides maternity benefits for eligible female employees per Indian labor laws. Includes paid leave duration, adoption provisions, return-to-work support, and nursing break entitlements.',
      fileName: 'Leave, Maternity, Paternity Policy.pdf',
      fileUrl: '/api/documents?id=maternity-leave-policy',
      fileSize: '1.45 MB',
      gradient: 'from-[#0089D7] via-[#0073b6] to-[#111A2E]',
      icon: <UserCheck className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'posh-policy',
      title: 'POSH Policy',
      category: 'Compliance',
      description:
        'Prevention of Sexual Harassment — complies with Indian law. Internal Committee investigates allegations impartially. Protections against retaliation; training is mandatory for all employees.',
      fileName: 'Clyptus_POSH.pdf',
      fileUrl: '/api/documents?id=posh-policy',
      fileSize: '282 KB',
      gradient: 'from-[#0089D7] via-[#111A2E] to-[#005a9e]',
      icon: <ShieldCheck className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'data-privacy-policy',
      title: 'Data Privacy Policy',
      category: 'Compliance',
      description:
        'Establishes data protection protocols, client confidentiality standards, device security requirements, and NDA guidelines across all software development operations.',
      fileName: 'Clyptus_Data_Privacy_Policy.pdf',
      fileUrl: '/api/documents?id=data-privacy-policy',
      fileSize: '421 KB',
      gradient: 'from-[#0089D7] via-[#0096eb] to-[#111A2E]',
      icon: <Lock className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'rejoin-policy',
      title: 'Rejoin Policy',
      category: 'Benefits',
      description:
        'Guidelines and eligibility for former Clyptus team members rejoining the company, alongside highlights of employee engagement initiatives and team culture.',
      fileName: 'Rejoin Policy.pdf',
      fileUrl: '/api/documents?id=rejoin-policy',
      fileSize: '310 KB',
      gradient: 'from-[#0089D7] via-[#0073b6] to-[#111A2E]',
      icon: <Sparkles className="w-8 h-8 text-white stroke-[1.8]" />,
    }
  ];

  // 10 OFFICIAL PDF DOCUMENTS FOR USER: AUDIT (AUTHENTICATED ENDPOINTS)
  const auditPolicies: PolicyCardItem[] = [
    {
      id: 'audit-code-of-conduct',
      title: 'Code of Conduct',
      category: 'Conduct',
      description:
        'Mandates ethical behavior, fair competition, protection of company assets, and prohibition of illegal gifts. Effective January 1, 2026 for all employees, contractors, and vendors.',
      fileName: 'Code of Conduct.pdf',
      fileUrl: '/api/documents?id=audit-code-of-conduct',
      fileSize: '341 KB',
      gradient: 'from-[#0089D7] via-[#0073b6] to-[#111A2E]',
      icon: <Shield className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'audit-disciplinary-policy',
      title: 'Disciplinary Policy',
      category: 'Conduct',
      description:
        'Addresses misconduct for all employees excluding contractors. Warnings progress from first (12 months) to final, with potential dismissal for gross misconduct like theft or breaches.',
      fileName: 'Disciplinary Policy.pdf',
      fileUrl: '/api/documents?id=audit-disciplinary-policy',
      fileSize: '378 KB',
      gradient: 'from-[#0089D7] via-[#0096eb] to-[#005e95]',
      icon: <AlertTriangle className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'audit-employee-benefits',
      title: 'Employee Benefits',
      category: 'Benefits',
      description:
        'Covers health insurance, provident fund, and perks for all Clyptus employees. Benefits aim to support employee welfare and retention. Contact HR for entitlements and eligibility details.',
      fileName: 'Employee benefits policy.pdf',
      fileUrl: '/api/documents?id=audit-employee-benefits',
      fileSize: '273 KB',
      gradient: 'from-[#0089D7] via-[#111A2E] to-[#005a9e]',
      icon: <Heart className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'audit-leave-policy',
      title: 'Leave Policy',
      category: 'Leave',
      description:
        'Covers casual, sick, and earned leave entitlements for all employees. Defines accrual and approval processes. The signed policy ensures full compliance with applicable Indian labor laws.',
      fileName: 'Leave, Maternity, Paternity Policy.pdf',
      fileUrl: '/api/documents?id=audit-leave-policy',
      fileSize: '1.45 MB',
      gradient: 'from-[#0089D7] via-[#0073b6] to-[#111A2E]',
      icon: <Calendar className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'audit-grievance-policy',
      title: 'Grievance Policy',
      category: 'Compliance',
      description:
        'Provides structured processes for employee complaints and resolutions. Employees can raise issues without retaliation, escalating to higher management if needed. Aims for swift, impartial redressal.',
      fileName: 'Grievance Redressal Policy.pdf',
      fileUrl: '/api/documents?id=audit-grievance-policy',
      fileSize: '435 KB',
      gradient: 'from-[#0089D7] via-[#0096eb] to-[#111A2E]',
      icon: <MessageSquare className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'audit-employee-handbook',
      title: 'Employee Handbook',
      category: 'Conduct',
      description:
        'Complete guide integrating all Clyptus HR policies for daily operations. Covers onboarding, performance, ethics, and company culture. Signed acknowledgment binds employees to its terms.',
      fileName: 'Clyptus Employee Handbook.pdf',
      fileUrl: '/api/documents?id=audit-employee-handbook',
      fileSize: '397 KB',
      gradient: 'from-[#111A2E] via-[#0089D7] to-[#005e95]',
      icon: <BookOpen className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'audit-maternity-leave-policy',
      title: 'Maternity Leave Policy',
      category: 'Leave',
      description:
        'Provides maternity benefits for eligible female employees per Indian labor laws. Includes paid leave duration, adoption provisions, return-to-work support, and nursing break entitlements.',
      fileName: 'Leave, Maternity, Paternity Policy (1).pdf',
      fileUrl: '/api/documents?id=audit-maternity-leave-policy',
      fileSize: '1.45 MB',
      gradient: 'from-[#0089D7] via-[#0073b6] to-[#111A2E]',
      icon: <UserCheck className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'audit-posh-policy',
      title: 'POSH Policy',
      category: 'Compliance',
      description:
        'Prevention of Sexual Harassment — complies with Indian law. Internal Committee investigates allegations impartially. Protections against retaliation; training is mandatory for all employees.',
      fileName: 'Clyptus_POSH.pdf',
      fileUrl: '/api/documents?id=audit-posh-policy',
      fileSize: '282 KB',
      gradient: 'from-[#0089D7] via-[#111A2E] to-[#005a9e]',
      icon: <ShieldCheck className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'audit-data-privacy-policy',
      title: 'Data Privacy Policy',
      category: 'Compliance',
      description:
        'Establishes data protection protocols, client confidentiality standards, device security requirements, and NDA guidelines across all software development operations.',
      fileName: 'Clyptus_Data_Privacy_Policy.pdf',
      fileUrl: '/api/documents?id=audit-data-privacy-policy',
      fileSize: '421 KB',
      gradient: 'from-[#0089D7] via-[#0096eb] to-[#111A2E]',
      icon: <Lock className="w-8 h-8 text-white stroke-[1.8]" />,
    },
    {
      id: 'audit-rejoin-policy',
      title: 'Rejoin Policy',
      category: 'Benefits',
      description:
        'Guidelines and eligibility for former Clyptus team members rejoining the company, alongside highlights of employee engagement initiatives and team culture.',
      fileName: 'Rejoin Policy.pdf',
      fileUrl: '/api/documents?id=audit-rejoin-policy',
      fileSize: '310 KB',
      gradient: 'from-[#0089D7] via-[#0073b6] to-[#111A2E]',
      icon: <Sparkles className="w-8 h-8 text-white stroke-[1.8]" />,
    }
  ];

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const result = await onLogin(usernameInput.trim(), passwordInput.trim());
      if (typeof result === 'boolean') {
        if (!result) {
          setLoginError('Invalid Username or Password. Access denied.');
        }
      } else if (!result.success) {
        setLoginError(result.error || 'Invalid Username or Password. Access denied.');
      }
    } catch {
      setLoginError('Authentication service unreachable. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Determine active policy array based on logged in user
  const isClyptusUser = authenticatedUser?.toLowerCase() === 'clyptus';
  const isAuditUser = authenticatedUser?.toLowerCase() === 'audit';

  const userPolicies = isClyptusUser
    ? clyptusPolicies
    : isAuditUser
    ? auditPolicies
    : [];

  // Filter policies based on selected category tab
  const filteredPolicies = userPolicies.filter((policy) => {
    if (activeTab === 'All Policies') return true;
    return policy.category === activeTab;
  });

  // ---------------------------------------------------------
  // UNAUTHENTICATED GATE (LOGIN MODAL WITH #0089D7 & #111A2E)
  // ---------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="w-full bg-slate-50 min-h-screen py-16 px-4 flex flex-col items-center justify-center font-sans selection:bg-[#0089D7]/20 selection:text-[#111A2E]">
        
        <div className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-8 sm:p-10 overflow-hidden">
          
          {/* Top Ambient Glows */}
          <div className="absolute -top-20 -left-20 w-44 h-44 bg-[#0089D7]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-[#111A2E]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Icon Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0089D7] to-[#111A2E] text-white flex items-center justify-center shadow-lg shadow-[#0089D7]/20 mb-4">
              <Lock className="w-8 h-8 stroke-[2.2]" />
            </div>
            <span className="text-xs font-mono font-extrabold text-[#0089D7] uppercase tracking-widest mb-1">
              PROTECTED CLYPTUS PORTAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111A2E] tracking-tight">
              HR Policies Portal
            </h2>
            <p className="text-xs text-[#111A2E]/70 font-medium mt-2">
              Enter your authorized credentials to access employee policies & downloadable files.
            </p>
          </div>

          {/* Error Banner */}
          {loginError && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#111A2E] mb-2">
                User Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-[#111A2E] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0089D7]/50 focus:border-[#0089D7] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#111A2E] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-4 pr-11 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-[#111A2E] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0089D7]/50 focus:border-[#0089D7] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#111A2E] transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 px-6 rounded-xl bg-[#0089D7] hover:bg-[#0077be] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-98 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>SIGNING IN...</span>
                </>
              ) : (
                <span>SIGN IN</span>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 font-mono flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Secure 256-Bit Encrypted Corporate Access
            </p>
          </div>

        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // AUTHENTICATED PORTAL VIEW (COLORS: ACCENT #0089D7, TEXT #111A2E)
  // ---------------------------------------------------------
  return (
    <div className="w-full bg-[#f8fafc] text-[#111A2E] font-sans selection:bg-[#0089D7]/20 selection:text-[#111A2E] min-h-screen pb-24">
      
      {/* HERO HEADER SECTION */}
      <section className="relative w-full pt-14 pb-14 sm:pt-20 sm:pb-16 px-4 sm:px-8 lg:px-16 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 border-b border-slate-200/80 text-[#111A2E] select-none">
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0089D7]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#111A2E]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#0089D7_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-3xl">


            {/* Main Title (Main Text Color #111A2E & Accent #0089D7 Gradient) */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[#111A2E] mb-4">
              Employee Policies &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0089D7] via-[#0066b3] to-[#111A2E]">Compliance Framework</span>
            </h1>

            <p className="text-base sm:text-lg font-medium text-[#111A2E]/75 leading-relaxed">
              Official corporate guidelines, workplace ethics, leave entitlements, and IT compliance policies for Clyptus Software Solutions.
            </p>
          </div>

          {/* User Session Card */}
          <div className="shrink-0 flex items-center gap-3 bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-2xl shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-[#0089D7] text-white font-black font-mono text-sm flex items-center justify-center shadow-md">
              {authenticatedUser?.charAt(0).toUpperCase()}
            </div>
            <div className="text-left">
              <p className="text-xs font-extrabold text-[#111A2E] leading-tight">User: {authenticatedUser}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">Session Active</span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="ml-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200 transition-colors text-xs font-bold flex items-center gap-1.5"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Hub */}
      <main className="py-12 px-4 sm:px-8 lg:px-16 w-full max-w-7xl mx-auto">
        
        {/* CATEGORY FILTER PILLS (ACCENT COLOR #0089D7) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {['All Policies', 'Conduct', 'Benefits', 'Leave', 'Compliance'].map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-200 shadow-xs ${
                  isActive
                    ? 'bg-[#0089D7] text-white font-extrabold shadow-md shadow-[#0089D7]/30 scale-105 border-0'
                    : 'bg-white text-[#111A2E]/80 hover:text-[#111A2E] border border-slate-200/90 hover:bg-slate-50 font-semibold'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* POLICY CARDS GRID (PRIMARY ACCENT #0089D7 & MAIN TEXT #111A2E) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPolicies.map((policy) => (
            <div
              key={policy.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between group"
            >
              {/* Card Top Header */}
              <div>
                <div className={`relative w-full h-36 bg-gradient-to-br ${policy.gradient} flex items-center justify-center p-4 overflow-hidden`}>
                  {/* Ambient Overlay */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
                  
                  {/* Icon Outer Box */}
                  <div className="relative w-16 h-16 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shadow-lg backdrop-blur-md group-hover:scale-110 transition-transform duration-300">
                    {policy.icon}
                  </div>

                  {/* Top Right Category Pill Badge */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-black/40 backdrop-blur-md text-white font-mono text-[9px] font-black uppercase tracking-wider border border-white/20">
                      {policy.category}
                    </span>
                  </div>
                </div>

                {/* Card Content Body (Main Text Color #111A2E) */}
                <div className="p-5">
                  <h3 className="text-base font-extrabold text-[#111A2E] mb-2 leading-snug group-hover:text-[#0089D7] transition-colors">
                    {policy.title}
                  </h3>

                  <p className="text-xs text-[#111A2E]/70 font-medium leading-relaxed mb-4 line-clamp-5">
                    {policy.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Action: Primary Accent Color #0089D7 Download Button */}
              <div className="px-5 pb-5 pt-0">
                <a
                  href={policy.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0089D7] hover:bg-[#0077be] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* NEED HELP WITH A POLICY BANNER (ACCENT #0089D7 & MAIN TEXT #111A2E) */}
        <div className="mt-12 w-full rounded-3xl bg-gradient-to-r from-[#111A2E] via-[#005e95] to-[#0089D7] p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white border border-white/20 font-mono text-[10px] font-bold uppercase mb-3">
              HR SUPPORT &amp; COMPLIANCE HELP
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1.5">
              Need help with a policy?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-2xl leading-relaxed">
              Our HR team is available to answer questions about entitlements, eligibility, or any policy content.
            </p>
          </div>

          <a
            href="mailto:hr.india@clyptus.com"
            className="group shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white text-[#111A2E] font-extrabold text-xs shadow-md hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Mail className="w-4 h-4 text-[#0089D7] stroke-[2.5]" />
            <span className="font-mono text-xs text-[#111A2E] font-black">hr.india@clyptus.com</span>
          </a>
        </div>

      </main>

    </div>
  );
};

export default HrPolicyPage;
