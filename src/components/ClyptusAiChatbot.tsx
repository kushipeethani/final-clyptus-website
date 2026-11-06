import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  RotateCcw, 
  ChevronDown, 
  ArrowRight, 
  Bot
} from 'lucide-react';

interface ClyptusAiChatbotProps {
  onNavigate?: (page: string) => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  quickActions?: {
    label: string;
    pageTarget?: string;
    actionType?: 'navigate' | 'contact' | 'custom';
  }[];
}

interface KnowledgeArticle {
  category: string;
  keywords: string[];
  patterns: RegExp[];
  answer: string;
  quickActions?: { label: string; pageTarget: string }[];
}

const KNOWLEDGE_BASE: KnowledgeArticle[] = [
  // 1. GREETINGS & INTRO
  {
    category: 'greetings',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'who are you', 'what is clyptus ai', 'help me', 'start'],
    patterns: [/^(hi|hello|hey|hola|greetings)/i, /who are you/i, /what (can you do|is clyptus ai)/i],
    answer: `Hello! I'm **Clyptus AI**, your virtual guide to Clyptus Software Solutions.

I can help you explore everything about our company, including:
• **Enterprise Services**: SAP & ERP, Artificial Intelligence, Multi-Cloud, Cybersecurity, CRM, Salesforce, and Data Engineering.
• **Company Background**: Our mission, vision, leadership, and global delivery centers.
• **Client Partnerships & Case Studies**: Enterprise implementations across BFSI, Healthcare, Retail, and Logistics.
• **Consultations & Careers**: How to get in touch with our solution architects or explore open positions.

What would you like to know today?`,
    quickActions: [
      { label: 'Explore All Services', pageTarget: 'Services' },
      { label: 'Our SAP & ERP Practice', pageTarget: 'SAP' },
      { label: 'AI & GenAI Solutions', pageTarget: 'AI' },
      { label: 'Talk to an Expert', pageTarget: 'Contact' }
    ]
  },

  // 2. COMPANY OVERVIEW & LEADERSHIP
  {
    category: 'company',
    keywords: ['about', 'company', 'clyptus', 'who is', 'founder', 'ceo', 'vamsi', 'vamsi krishna', 'history', 'locations', 'offices', 'headquarters', 'vision', 'mission'],
    patterns: [/about (clyptus|the company)/i, /(who is|founder|ceo|leader|vamsi)/i, /(where is|locations|offices|headquarters)/i, /(vision|mission)/i],
    answer: `**About Clyptus Software Solutions:**

Clyptus is an AI-native enterprise technology consulting and software engineering partner. We engineer mission-critical enterprise systems that unify enterprise architecture, autonomous AI agents, and resilient cloud systems.

• **Leadership**: Led by **Vamsi Krishna**, who directs our strategic vision, client engagements, and delivery capabilities across the USA, UAE, and India.
• **Our Vision**: *"Shaping Tomorrow Through Innovation."* Empowering businesses through digital transformation, intelligence, and sustainable growth.
• **Our Mission**: *"Turning Ideas Into Impact."* Delivering innovative, reliable, and scalable technology solutions with technical excellence.
• **Official Partnership**: Clyptus is an official **SAP Silver Partner** and certified enterprise delivery organization.
• **Global Reach**: We operate 24/7 delivery hubs serving clients across North America, EMEA, and APAC.`,
    quickActions: [
      { label: 'Learn More About Us', pageTarget: 'About' },
      { label: 'Explore Our Vision & Story', pageTarget: 'About' },
      { label: 'Contact Clyptus Leadership', pageTarget: 'Contact' }
    ]
  },

  // 3. ERP & SAP SERVICES
  {
    category: 'erp',
    keywords: ['sap', 'erp', 's4hana', 's/4hana', 'hana', 'brim', 'btp', 'clean core', 'migration', 'oracle erp', 'dynamics 365', 'ams', 'silver partner'],
    patterns: [/sap/i, /s\/?4hana/i, /erp/i, /brim/i, /btp/i, /clean core/i, /oracle erp/i, /dynamics 365/i],
    answer: `**Clyptus ERP & SAP Practice (SAP Silver Partner):**

We provide complete enterprise ERP strategy, implementations, migrations, and ongoing management:

1. **SAP S/4HANA**: Greenfield implementations, system conversions, RISE with SAP migrations, and clean-core decoupled architecture.
2. **SAP BRIM** (Billing & Revenue Innovation Management): Subscription Order Management (SOM), Convergent Charging (CC), Convergent Invoicing (CI), Convergent Mediation (CM), and FI-CA / RAR revenue recognition.
3. **SAP BTP & Custom ABAP**: Cloud-native extensions, microservices integration (CPI, PI/PO), and SAP Fiori UX modernization.
4. **Oracle Cloud ERP**: Financials, supply chain management, and cloud ERP transformation.
5. **Microsoft Dynamics 365**: Finance, Supply Chain, and Business Central implementations.
6. **24/7 AMS & Managed Support**: Post go-live stabilization, hypercare, and proactive SLA-backed support.`,
    quickActions: [
      { label: 'View ERP Services Page', pageTarget: 'SAP' },
      { label: 'Request ERP Assessment', pageTarget: 'Contact' }
    ]
  },

  // 4. ARTIFICIAL INTELLIGENCE & GENAI
  {
    category: 'ai',
    keywords: ['ai', 'genai', 'generative ai', 'llm', 'rag', 'agentforce', 'agents', 'machine learning', 'ml', 'computer vision', 'predictive', 'copilot', 'automation'],
    patterns: [/\bai\b/i, /genai|generative ai/i, /llm|rag/i, /machine learning/i, /agents|agentforce/i, /computer vision/i],
    answer: `**Artificial Intelligence & GenAI Engineering:**

Clyptus builds enterprise-grade AI applications and autonomous workflow engines designed for real business outcomes:

• **Custom Generative AI & Fine-Tuning**: Secure enterprise RAG (Retrieval-Augmented Generation) architectures, internal copilots, and bespoke LLMs trained on company data.
• **Autonomous AI Agent Swarms**: Multi-agent systems that autonomously execute multi-step business workflows across CRM, ERP, and databases.
• **Predictive Machine Learning**: Demand forecasting, predictive maintenance, algorithmic risk scoring, and customer churn analysis.
• **Computer Vision**: Automated visual quality inspection, workplace safety compliance, and document intelligence.
• **MLOps & Enterprise Governance**: Zero-data-leakage guardrails, drift monitoring, latency optimization, and continuous retraining pipelines.`,
    quickActions: [
      { label: 'Open AI Solutions Page', pageTarget: 'AI' },
      { label: 'Schedule an AI Discovery Session', pageTarget: 'Contact' }
    ]
  },

  // 5. CLOUD & DEVOPS
  {
    category: 'cloud',
    keywords: ['cloud', 'aws', 'azure', 'gcp', 'google cloud', 'kubernetes', 'eks', 'aks', 'gke', 'devops', 'microservices', 'serverless', 'lambda', 'migration'],
    patterns: [/cloud/i, /aws|azure|gcp/i, /kubernetes|k8s/i, /devops/i, /microservices|serverless/i],
    answer: `**Multi-Cloud & DevOps Engineering:**

We architect resilient, cost-optimized, and elastic cloud foundations across all major providers:

• **Platforms**: Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP).
• **Cloud Architecture**: Cloud-native microservices, containerization (Docker, Kubernetes EKS/AKS/GKE), and serverless architectures (AWS Lambda, Azure Functions, Cloud Run).
• **Zero-Downtime Migrations**: Database and application migration strategies engineered with automated rollback guarantees.
• **Cloud Modernization**: Modernizing monolithic legacy applications into decoupled event-driven architectures.
• **DevSecOps & Automation**: Automated CI/CD pipelines, Infrastructure as Code (Terraform, Ansible), and 24/7 cloud infrastructure monitoring.`,
    quickActions: [
      { label: 'Visit Cloud Services Page', pageTarget: 'Cloud' },
      { label: 'Request Cloud Infrastructure Review', pageTarget: 'Contact' }
    ]
  },

  // 6. CYBERSECURITY
  {
    category: 'security',
    keywords: ['security', 'cybersecurity', 'cyber', 'soc', 'iso 27001', 'soc 2', 'gdpr', 'hipaa', 'nist', 'pci dss', 'zero trust', 'pen testing', 'iam', 'firewall'],
    patterns: [/security/i, /cyber/i, /soc/i, /iso 27001|soc 2|gdpr|hipaa/i, /zero trust/i, /penetration test/i],
    answer: `**Cybersecurity Services & Compliance:**

Clyptus protects every digital asset with multi-layered defense and governance:

• **24/7 Managed SOC**: Real-time telemetry monitoring, intrusion detection, SIEM/SOAR incident response, and active threat hunting.
• **Cloud & Network Security**: Cloud Security Posture Management (CSPM), perimeter defense, encrypted VPNs, and micro-segmentation.
• **Identity & Access Management (IAM)**: Multi-Factor Authentication (MFA), role-based access controls, and privileged access management (PAM).
• **Penetration Testing & Audits**: Vulnerability scanning, red teaming, ethical hacking, and source-code security reviews.
• **Compliance & Standards Frameworks**: End-to-end audit readiness for **ISO 27001**, **SOC 2**, **GDPR**, **NIST CSF**, **PCI DSS**, and **HIPAA**.`,
    quickActions: [
      { label: 'Explore Cybersecurity Page', pageTarget: 'Security' },
      { label: 'Book a Security Audit', pageTarget: 'Contact' }
    ]
  },

  // 7. CRM SERVICES
  {
    category: 'crm',
    keywords: ['crm', 'customer relationship', 'sap cx', 'oracle cx', 'dynamics crm', 'sales cloud', 'service cloud', 'commerce cloud', 'cdp', 'emarsys'],
    patterns: [/\bcrm\b/i, /customer relationship/i, /sap cx/i, /oracle cx/i],
    answer: `**Comprehensive CRM Services:**

Clyptus unifies customer touchpoints across the world's top three enterprise CRM suites:

1. **SAP Customer Experience (SAP CX)**: SAP Sales Cloud, Service Cloud, Commerce Cloud, Customer Data Platform (CDP), Emarsys Customer Engagement, CPQ, and Subscription Billing.
2. **Oracle Fusion Cloud CX**: Oracle Sales, B2B/B2C Service, Marketing automation, CPQ, Field Service, and Partner Relationship Management.
3. **Microsoft Dynamics 365 CRM**: Dynamics 365 Sales, Customer Service, Field Service, Customer Insights (Journeys), and Power Platform integration.

We handle business process analysis, configuration, ERP back-end integration, data deduplication, and user adoption.`,
    quickActions: [
      { label: 'Visit CRM Services Page', pageTarget: 'CRM' },
      { label: 'Inquire About CRM Platforms', pageTarget: 'Contact' }
    ]
  },

  // 8. SALESFORCE SERVICES
  {
    category: 'salesforce',
    keywords: ['salesforce', 'agentforce', 'sales cloud', 'service cloud', 'lightning', 'apex', 'lwc', 'marketing cloud', 'commerce cloud', 'tableau', 'revenue cloud'],
    patterns: [/salesforce/i, /agentforce/i, /lightning|apex|lwc/i],
    answer: `**Full-Lifecycle Salesforce Practice:**

From strategic consulting to custom Lightning development and managed operations:

• **Core Clouds**: Sales Cloud, Service Cloud, Marketing Cloud, Commerce Cloud, Experience Cloud, and Data Cloud.
• **Next-Gen Agentforce**: Building autonomous AI agents that resolve customer inquiries, draft communications, and trigger automated CRM actions.
• **Custom Engineering**: Complex Apex controllers, triggers, Lightning Web Components (LWC), and REST/SOAP enterprise integrations.
• **Revenue Cloud & Analytics**: CPQ pricing engines, subscription billing workflows, and interactive Tableau business intelligence dashboards.`,
    quickActions: [
      { label: 'View Salesforce Services Page', pageTarget: 'Salesforce' },
      { label: 'Discuss Salesforce Project', pageTarget: 'Contact' }
    ]
  },

  // 9. DATA ENGINEERING
  {
    category: 'data',
    keywords: ['data engineering', 'data', 'etl', 'elt', 'kafka', 'spark', 'snowflake', 'databricks', 'data warehouse', 'data lake', 'pipeline', 'streaming'],
    patterns: [/data engineering/i, /etl|elt/i, /snowflake|databricks/i, /kafka|spark/i, /data lake|data warehouse/i],
    answer: `**Modern Data Engineering & Analytics:**

We turn raw, disparate data streams into trusted, real-time enterprise intelligence:

• **Streaming & Ingestion**: High-throughput distributed pipelines built with Apache Kafka, Spark, and cloud event buses.
• **Data Warehousing & Lakehouses**: Production architectures on Snowflake, Databricks Lakehouse, AWS Redshift, and Google BigQuery.
• **Data Quality & Governance**: Data lineage, automated reconciliation, anomaly detection, cataloging, and compliance frameworks.
• **Enterprise BI & Dashboards**: Executive telemetry and real-time operational reporting powered by Tableau, Power BI, and Looker.`,
    quickActions: [
      { label: 'Open Data Engineering Page', pageTarget: 'DataEngineering' },
      { label: 'Talk to Data Architects', pageTarget: 'Contact' }
    ]
  },

  // 10. IT RECRUITING & TALENT ACQUISITION
  {
    category: 'recruiting',
    keywords: ['recruiting', 'staffing', 'talent', 'hire', 'contract', 'executive search', 'jobs', 'careers', 'vacancies', 'apply', 'openings', 'interview'],
    patterns: [/recruit(ing|ment)/i, /staffing/i, /talent/i, /hire|hiring/i, /career|jobs|opening/i],
    answer: `**IT Recruiting & Talent Solutions:**

Clyptus provides precision technology staffing and executive search across the globe:

• **Top 1% Specialized Talent**: Senior SAP Architects, Cloud Specialists, AI/ML Engineers, Full-Stack Developers, and Cybersecurity Consultants.
• **Flexible Staffing Models**: Contract staffing, permanent recruitment, contract-to-hire, and dedicated offshore/nearshore Center of Excellence (CoE) units.
• **Technical Vetting**: Every candidate is evaluated by Clyptus practicing solution architects before submission.
• **Looking to Join Clyptus?**: We are always hiring passionate developers, engineers, and consultants!`,
    quickActions: [
      { label: 'View IT Recruiting Services', pageTarget: 'Recruiting' },
      { label: 'Explore Clyptus Careers', pageTarget: 'Careers' },
      { label: 'Submit Resume / Contact', pageTarget: 'Contact' }
    ]
  },

  // 11. INDUSTRIES SERVED
  {
    category: 'industries',
    keywords: ['industries', 'sectors', 'clients', 'banking', 'healthcare', 'retail', 'manufacturing', 'ports', 'logistics', 'energy', 'telecom'],
    patterns: [/industr(ies|y)/i, /sectors?/i, /who do you serve/i],
    answer: `**Industries We Transform:**

Clyptus delivers domain-tailored software and architectures across major global industries:

1. **Manufacturing & Industry 4.0**: Smart shop-floor integration, IoT telemetry, and digital twins.
2. **Banking, Financial Services & Insurance (BFSI)**: Secure transaction engines, fraud mitigation, and regulatory compliance.
3. **Healthcare & Life Sciences**: HIPAA-compliant patient platforms, medical imaging AI, and EHR integrations.
4. **Ports, Maritime & Logistics**: Terminal operating systems, voyage tracking, and supply chain automation.
5. **Retail & E-commerce**: Omnichannel commerce, personalized AI recommendation engines, and inventory optimization.
6. **Energy, Utilities, & Oil & Gas**: Asset management, predictive maintenance, and sustainability reporting.`,
    quickActions: [
      { label: 'Explore Industries Page', pageTarget: 'Industries' },
      { label: 'View Verified Case Studies', pageTarget: 'Projects' }
    ]
  },

  // 12. CLIENTS & PARTNERS
  {
    category: 'clients',
    keywords: ['clients', 'customers', 'partners', 'deloitte', 'panasonic', 'ntt data', 'hcl', 'hexaware', 'ctrls', 'welspun', 'saudia cargo', 'greenko'],
    patterns: [/clients?|customers?|partners?/i, /who (uses|trusts) clyptus/i],
    answer: `**Trusted Enterprise Clients & Partners:**

Clyptus works with leading global organizations across North America, EMEA, and APAC. Some of the enterprise brands we serve and partner with include:

• **Global Leaders**: Oracle, Deloitte, Panasonic, NTT DATA, HCL Tech, LTIMindtree, and Hexaware.
• **Infrastructure & Tech**: CtrlS Datacenters, Welspun Group, Greenko Energy, and ThingsAlive.
• **Logistics & Ports**: Saudia Cargo, Lumut Port, and Penang Port.
• **Industrial & Enterprise**: Hume Cement, Al Nasser Group, Al Nasir Company, Artwright, neev SYSTEMS, and DGSOFT Technologies.

We are also an official **SAP Silver Partner**.`,
    quickActions: [
      { label: 'View Client Case Studies', pageTarget: 'Projects' },
      { label: 'Start an Enterprise Project', pageTarget: 'Contact' }
    ]
  },

  // 13. CONTACT & ENGAGEMENT
  {
    category: 'contact',
    keywords: ['contact', 'email', 'phone', 'call', 'reach', 'talk', 'consultation', 'quote', 'pricing', 'cost', 'inquire', 'address', 'support'],
    patterns: [/contact/i, /email|phone|call/i, /consultation|quote|pricing|cost/i, /how (to|can I) (reach|connect)/i],
    answer: `**Connect with Clyptus:**

Ready to kick off a project or schedule a technical consultation? We'd love to hear from you!

• **Website Form**: Fill out our quick project inquiry form on the Contact page.
• **Services Consultation**: Free architectural assessment for ERP, AI, Cloud, Cybersecurity, or CRM programs.
• **Global Delivery**: Serving clients across USA, UAE, and India with 24/7 availability.

Click below to navigate directly to our contact form or let me know what specific solution you need!`,
    quickActions: [
      { label: 'Go to Contact Page', pageTarget: 'Contact' },
      { label: 'Browse Our Services', pageTarget: 'Services' }
    ]
  }
];

export const ClyptusAiChatbot: React.FC<ClyptusAiChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! 👋 I'm **Clyptus AI**, your intelligent assistant.

Ask me anything about **Clyptus Software Solutions**, our services (**SAP & ERP, AI, Cloud, Cybersecurity, CRM, Salesforce, Data Engineering**), our clients, or how to work with us.

How can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        { label: '💼 ERP & SAP Services', pageTarget: 'SAP' },
        { label: '🤖 AI & GenAI Capabilities', pageTarget: 'AI' },
        { label: '🔒 Cybersecurity Solutions', pageTarget: 'Security' },
        { label: '🏢 About Clyptus Leadership', pageTarget: 'About' },
        { label: '📞 Talk to an Expert', pageTarget: 'Contact' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isMinimized, isTyping]);

  // Answer matching engine
  const findAnswer = (query: string): { text: string; quickActions?: { label: string; pageTarget: string }[] } => {
    const cleanQuery = query.toLowerCase().trim();

    // 1. Direct Regex Pattern Matching
    for (const item of KNOWLEDGE_BASE) {
      for (const pattern of item.patterns) {
        if (pattern.test(cleanQuery)) {
          return { text: item.answer, quickActions: item.quickActions };
        }
      }
    }

    // 2. Keyword Scoring Match
    const queryTokens = cleanQuery.split(/[\s,?.!]+/).filter(Boolean);
    let bestMatch: KnowledgeArticle | null = null;
    let highestScore = 0;

    for (const item of KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of item.keywords) {
        if (cleanQuery.includes(kw)) {
          score += kw.split(' ').length * 2;
        }
        for (const token of queryTokens) {
          if (token.length > 2 && kw.includes(token)) {
            score += 1;
          }
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && highestScore >= 2) {
      return { text: bestMatch.answer, quickActions: bestMatch.quickActions };
    }

    // 3. Fallback Smart Response
    return {
      text: `Thank you for asking! While I don't have an exact match for that specific inquiry, Clyptus provides comprehensive end-to-end IT services:

• **ERP & Enterprise Solutions**: SAP S/4HANA, SAP BRIM, BTP, Oracle Cloud, and Dynamics 365.
• **Artificial Intelligence**: Custom GenAI models, autonomous AI agents, computer vision, and predictive ML.
• **Cloud & Data Engineering**: Multi-cloud infrastructure (AWS, Azure, GCP), lakehouses, and real-time streaming pipelines.
• **Cybersecurity & Compliance**: 24/7 SOC, zero-trust defenses, pen testing, and ISO 27001/SOC 2 compliance.
• **CRM & Salesforce**: Omnichannel CRM architectures and next-gen Agentforce integrations.

Would you like to speak directly with a Clyptus technology consultant or explore one of our practices?`,
      quickActions: [
        { label: 'Browse All Services', pageTarget: 'Services' },
        { label: 'Talk to an Expert', pageTarget: 'Contact' },
        { label: 'About Company & Team', pageTarget: 'About' }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim();
    if (!text) return;

    setHasInteracted(true);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    // Realistic typing delay (350ms - 700ms)
    setTimeout(() => {
      const response = findAnswer(text);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: response.quickActions
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: `Conversation refreshed! How else can I assist you with Clyptus's technology services, architectures, or company details?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: [
          { label: '💼 ERP Services', pageTarget: 'SAP' },
          { label: '🤖 AI Engineering', pageTarget: 'AI' },
          { label: '🔒 Cybersecurity', pageTarget: 'Security' },
          { label: '📞 Contact Us', pageTarget: 'Contact' }
        ]
      }
    ]);
  };

  const handleActionClick = (targetPage?: string) => {
    if (targetPage && onNavigate) {
      onNavigate(targetPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Format bold and list text cleanly
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Format bold markdown (**text**)
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-extrabold text-slate-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={pIdx} className="italic text-slate-700">
              {part.slice(1, -1)}
            </em>
          );
        }
        return part;
      });

      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
            <span className="flex-1 text-slate-700 leading-relaxed text-xs sm:text-sm">
              {renderedLine}
            </span>
          </div>
        );
      }

      return (
        <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed my-1">
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <div className="select-none font-sans">
      {/* ---------------------------------------------------- */}
      {/* FLOATING TRIGGER BUTTON (BOTTOM RIGHT)               */}
      {/* ---------------------------------------------------- */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
          {/* Subtle Attention Bubble on First Visit */}
          {!hasInteracted && (
            <div 
              onClick={() => setIsOpen(true)}
              className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-xl text-xs font-bold text-slate-800 hover:text-blue-600 transition-all cursor-pointer animate-in fade-in slide-in-from-right-3 duration-500 hover:scale-105"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Ask Clyptus AI</span>
              <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          )}

          {/* Main Floating Trigger Button */}
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-orange-500 text-white shadow-[0_10px_30px_rgba(37,99,235,0.38)] hover:shadow-[0_15px_40px_rgba(249,115,22,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border-2 border-white/60"
            title="Chat with Clyptus AI"
            aria-label="Chat with Clyptus AI"
          >
            {/* Pulsing Colored Aura */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-orange-500 blur-md opacity-40 group-hover:opacity-75 transition-opacity animate-pulse" />

            {/* Sparkles / Bot Icon */}
            <div className="relative z-10 flex items-center justify-center">
              <Bot className="w-7 h-7 text-white stroke-[2.2] group-hover:scale-110 transition-transform" />
              <Sparkles className="absolute -top-1 -right-1 w-3.5 h-3.5 text-amber-300 animate-bounce" />
            </div>
          </button>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* EXPANDABLE CHATBOT WINDOW                            */}
      {/* ---------------------------------------------------- */}
      {isOpen && (
        <div 
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-5 ${
            isMinimized ? 'h-16' : 'h-[580px] max-h-[86vh]'
          }`}
        >
          {/* Header Bar */}
          <div className="relative px-5 py-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-between border-b border-slate-800">
            {/* Ambient subtle warm glow */}
            <div className="absolute top-0 right-1/4 w-32 h-8 bg-orange-500/20 blur-xl pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-32 h-8 bg-blue-500/20 blur-xl pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-orange-500 flex items-center justify-center text-white shadow-sm">
                <Bot className="w-5 h-5 stroke-[2.2]" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-sm text-white tracking-tight">Clyptus AI</h3>
                  <span className="px-1.5 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 text-[9px] font-mono font-bold uppercase tracking-wider text-white">
                    PRO
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • Company Assistant
                </span>
              </div>
            </div>

            {/* Action Buttons: Reset, Minimize, Close */}
            <div className="flex items-center gap-1 relative z-10">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
                title={isMinimized ? 'Expand' : 'Minimize'}
                aria-label={isMinimized ? 'Expand' : 'Minimize'}
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMinimized ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-red-500/20 hover:text-red-400 transition-colors cursor-pointer"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body (Hidden when minimized) */}
          {!isMinimized && (
            <>
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70 text-left">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
                  >
                    <div className="flex items-end gap-2 max-w-[88%]">
                      {msg.sender === 'ai' && (
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 mb-1 shadow-2xs">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div
                        className={`rounded-2xl px-4 py-3 text-left shadow-xs ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-br-xs'
                            : 'bg-white border border-slate-200/90 text-slate-800 rounded-bl-xs'
                        }`}
                      >
                        {msg.sender === 'user' ? (
                          <p className="text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-wrap">
                            {msg.text}
                          </p>
                        ) : (
                          <div>{renderFormattedText(msg.text)}</div>
                        )}
                      </div>
                    </div>

                    {/* Quick Interactive Actions inside AI message */}
                    {msg.sender === 'ai' && msg.quickActions && msg.quickActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 ml-8 max-w-[85%]">
                        {msg.quickActions.map((action, aIdx) => (
                          <button
                            key={aIdx}
                            onClick={() => handleActionClick(action.pageTarget)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-blue-50 text-blue-700 hover:text-blue-900 border border-blue-200/80 text-[11px] font-bold shadow-2xs transition-all hover:scale-102 cursor-pointer active:scale-95"
                          >
                            <span>{action.label}</span>
                            <ArrowRight className="w-3 h-3 text-blue-600" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Timestamp */}
                    <span className="text-[10px] text-slate-400 font-mono mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {/* Animated Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-500 animate-in fade-in">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Control Bar */}
              <div className="p-3 bg-white border-t border-slate-200/80 flex flex-col gap-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Ask Clyptus AI about our services or company..."
                    className="flex-1 px-4 py-2.5 rounded-full bg-slate-100/90 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={!inputQuery.trim() || isTyping}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 shadow-md active:scale-95 transition-all shrink-0 cursor-pointer"
                    title="Send query"
                    aria-label="Send query"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </form>

                <div className="flex items-center justify-between px-2 pt-0.5 text-[10px] text-slate-400 font-medium">
                  <span>Press Enter to send</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Sparkles className="w-2.5 h-2.5 text-orange-500" />
                    Powered by Clyptus Intelligence
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default ClyptusAiChatbot;
