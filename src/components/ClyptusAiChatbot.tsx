import React, { useState, useRef, useEffect } from 'react';
import { 
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

interface QuickAction {
  label: string;
  pageTarget?: string;
  chatQuery?: string;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  quickActions?: QuickAction[];
}

interface KnowledgeArticle {
  category: string;
  keywords: string[];
  patterns: RegExp[];
  answer: string;
  quickActions?: QuickAction[];
}

const KNOWLEDGE_BASE: KnowledgeArticle[] = [
  // 1. OFFICIAL EMAILS & DIRECT CONTACT CHANNELS
  {
    category: 'emails',
    keywords: [
      'email', 'mail', 'emails', 'e-mail', 'contact email', 'sales email', 
      'hr email', 'support email', 'corporate email', 'email address', 
      'how to email', 'inbox', 'reach via email', 'where to mail', 'send email'
    ],
    patterns: [
      /\b(e-?mails?|mailbox|inbox)\b/i,
      /what (is|are) (the|your) e-?mails?/i,
      /send (an? )?e-?mail/i,
      /how (to|can i) e-?mail/i,
      /give me (the )?e-?mail/i
    ],
    answer: `**Official Contact & Email Channels**

You can reach our leadership, enterprise sales, and HR teams through our regional email addresses:

• **Sales & Client Proposals**: Sales@clyptus.com
  Project scoping, RFPs, pricing quotes, and architecture consultations (+91 77999 88139).

• **General Inquiries**: info@clyptus.com / contact@clyptus.com
  Strategic alliances, general inquiries, and client partnerships.

• **Careers & HR (India & APAC)**: hr.india@clyptus.com
  Job openings, resume submissions, and campus drives.

• **Careers & HR (Dubai & Middle East)**: hr.uae@clyptus.com
  DIFC Operations (+971 52 350 3297).

• **Careers & HR (USA & North America)**: hr.usa@clyptus.com
  Temecula, California Hub (+1 480 427-6373).

You can also submit an inquiry directly using our website contact form.`,
    quickActions: [
      { label: 'Open Contact Form', pageTarget: 'Contact' },
      { label: 'Company Journey', chatQuery: 'Tell me about Clyptus journey and history' },
      { label: 'Explore Careers', pageTarget: 'Careers' },
      { label: 'Office Locations', chatQuery: 'Where are your office locations?' }
    ]
  },

  // 2. COMPANY JOURNEY & MILESTONES (2014 - PRESENT)
  {
    category: 'journey',
    keywords: [
      'journey', 'history', 'story', 'milestones', 'timeline', 'founded', 
      'founding', 'evolution', 'growth', 'years', 'origin', 'how it started', 
      'past', 'background', 'milestone', 'decade', 'when started', 'established'
    ],
    patterns: [
      /\b(journey|milestones?|timeline|evolution|history|story)\b/i,
      /when was clyptus (founded|started|created|established)/i,
      /how did clyptus (start|begin|grow|evolve)/i,
      /company (history|journey|story|background)/i,
      /how many years (in business|operating)/i
    ],
    answer: `**The Clyptus Journey & Milestones (2014 – Present)**

Over a decade of scaling enterprise architectures and delivering digital transformation:

1. **2014 – 2016: Foundation & Initial Expansion**
   Founded in 2014 with a core SAP ERP & HCM consulting practice. Delivered our first international enterprise SAP project in Dubai, UAE, and established our global delivery center in Hyderabad, India.

2. **2016 – 2018: Global Footprint Growth**
   Expanded international SAP delivery across 3+ countries, serving 15+ large enterprise clients with major rollouts across UAE and India. Team scaled to 65+ specialized consultants.

3. **2018 – 2020: S/4HANA & Cloud Leadership**
   Introduced a full SAP Cloud Services portfolio, scaled to 87+ senior SAP consultants, and established our dedicated SAP S/4HANA migration practice.

4. **2020 – 2022: Analytics & SAP Silver Partner**
   Introduced Enterprise Data Platforms and SAP BRIM solutions. Earned official **SAP Silver Partner** accreditation and expanded to 120+ team members and 110+ enterprise clients.

5. **2022 – Present: BTP, AI & Autonomous Innovation**
   Launched our SAP BTP practice, built proprietary SAP add-on assets, integrated Agentic AI & Generative AI capabilities, and scaled to 250+ consultants across India, UAE, and North America.`,
    quickActions: [
      { label: 'Read About Us', pageTarget: 'About' },
      { label: 'Official Emails', chatQuery: 'What are your official emails?' },
      { label: 'SAP & ERP Practice', pageTarget: 'SAP' },
      { label: 'AI Solutions', pageTarget: 'AI' }
    ]
  },

  // 3. GLOBAL LOCATIONS & OFFICE ADDRESSES
  {
    category: 'locations',
    keywords: [
      'locations', 'offices', 'address', 'where are you', 'headquarters', 
      'hyderabad', 'dubai', 'california', 'temecula', 'india', 'uae', 'usa', 
      'branches', 'visit', 'directions', 'map', 'phone', 'phone number', 'call',
      'telephone', 'contact number'
    ],
    patterns: [
      /\b(locations?|offices?|address(es)?|headquarters|branches?)\b/i,
      /where (are you|is clyptus|are the offices|are you located)/i,
      /\b(phone|call|telephone|contact number)\b/i,
      /\b(hyderabad|dubai|california|temecula)\b/i
    ],
    answer: `**Global Delivery Centers & Office Locations**

We operate 3 strategic regional hubs delivering 24/7 enterprise engineering and consulting:

• **Hyderabad, India (Global Headquarters & Delivery Center)**
  12A01A, 13th Floor, Manjeera Trinity Corporate, JNTU–Hitech City Road, Kukatpally, Hyderabad, Telangana 500072
  Emails: Sales@clyptus.com | hr.india@clyptus.com
  Phone: +91 77999 88139

• **Dubai, UAE (Middle East Regional Center & DIFC Operations)**
  101 Sheikh Zayed Rd, Trade Centre, DIFC, Dubai, UAE
  Email: hr.uae@clyptus.com
  Phone: +971 52 350 3297

• **California, USA (North America Business Hub)**
  45627 Basswood Ct, Temecula, California 92592
  Email: hr.usa@clyptus.com
  Phone: +1 480 427-6373`,
    quickActions: [
      { label: 'Interactive Globe', pageTarget: 'Contact' },
      { label: 'Official Emails', chatQuery: 'What are your official emails?' },
      { label: 'Company Journey', chatQuery: 'Tell me about the company journey' }
    ]
  },

  // 4. KEY STATS & METRICS
  {
    category: 'stats',
    keywords: [
      'stats', 'statistics', 'numbers', 'metrics', 'track record', 
      'how many', 'experience', 'projects count', 'consultants count', 'scale'
    ],
    patterns: [
      /\b(stats|statistics|numbers|metrics|track record)\b/i,
      /how many (projects|consultants|clients|countries|years)/i,
      /years of experience/i
    ],
    answer: `**Clyptus at a Glance**

• **10+ Years of Experience**: Delivering mission-critical enterprise engineering since 2014.
• **250+ Global Consultants**: Specialized squad including 120+ certified SAP & cloud specialists.
• **50+ Global Enterprise Projects**: Delivered across North America, EMEA, and APAC regions.
• **30+ Country Localizations**: Supporting cross-border operations and tax/statutory compliances.
• **330+ Tech Professionals Deployed**: Specialized talent matched with enterprise transformation programs.
• **5+ Pre-Built RDS Packages**: Rapid deployment packages that accelerate enterprise go-live lead times.
• **50+ Add-on Assets**: Ready-to-use software components for SAP, cloud, and data integration.
• **Official SAP Silver Partner**: Certified partner for S/4HANA, BRIM, and BTP delivery.`,
    quickActions: [
      { label: 'Company Journey', chatQuery: 'Tell me about Clyptus journey and history' },
      { label: 'Case Studies', pageTarget: 'Projects' },
      { label: 'Contact Sales', chatQuery: 'What are your official emails?' }
    ]
  },

  // 5. COMPANY LEADERSHIP & FOUNDER
  {
    category: 'leadership',
    keywords: [
      'leadership', 'founder', 'ceo', 'vamsi', 'vamsi krishna', 
      'management', 'executive', 'who runs', 'who leads', 'owner', 'director'
    ],
    patterns: [
      /\b(founder|ceo|vamsi|vamsi krishna|leadership|executive|director)\b/i,
      /who (runs|leads|founded) clyptus/i
    ],
    answer: `**Clyptus Leadership & Vision**

• **Founder & Strategic Leader**: **Vamsi Krishna** guides Clyptus's strategic vision, global partnerships, and technology innovation across the USA, UAE, and India.
• **Vision**: *"Shaping Tomorrow Through Innovation"* — Empowering enterprises to thrive in an AI-first, cloud-native world through scalable intelligence and technical agility.
• **Mission**: *"Turning Ideas Into Impact"* — Transforming complex enterprise challenges into resilient, high-performance systems with clear business ROI.
• **Core Philosophy**: A commitment to technical rigor, clean-core architectures, transparent client relationships, and proactive innovation.`,
    quickActions: [
      { label: 'About Clyptus', pageTarget: 'About' },
      { label: 'Company Journey', chatQuery: 'Tell me about the company journey' },
      { label: 'Contact Leadership', pageTarget: 'Contact' }
    ]
  },

  // 6. CAREERS & JOB OPENINGS
  {
    category: 'careers',
    keywords: [
      'careers', 'jobs', 'hiring', 'openings', 'vacancies', 'apply', 
      'interview', 'resume', 'cv', 'work at clyptus', 'positions', 'recruitment for me'
    ],
    patterns: [
      /\b(careers?|jobs?|hiring|openings?|vacanc(y|ies)|positions?|apply|resume|cv)\b/i,
      /work at clyptus/i,
      /how to apply/i
    ],
    answer: `**Careers at Clyptus Software Solutions**

We are continuously hiring experienced developers, enterprise consultants, and tech leaders:

• **Open Roles**:
  1. SAP S/4HANA Functional & Technical Consultants (3–6 yrs)
  2. Cloud Solutions Architects (AWS / Azure / OCI, 5–10 yrs)
  3. Generative AI & LLM Engineers (Python, PyTorch, Azure AI, 3–5 yrs)
  4. SAP BRIM / Billing Consultants (Convergent Invoicing, FI-CA, 3–7 yrs)
  5. SAP SuccessFactors & HCM Specialists (2–5 yrs)
  6. Power BI & Enterprise Data Engineers (2–5 yrs)

• **How to Apply**:
  Send your resume directly to our regional talent acquisition team:
  • hr.india@clyptus.com (India & APAC)
  • hr.uae@clyptus.com (UAE & Middle East)
  • hr.usa@clyptus.com (USA & Americas)`,
    quickActions: [
      { label: 'View All Jobs', pageTarget: 'Careers' },
      { label: 'HR Policy', pageTarget: 'HrPolicy' },
      { label: 'Email HR Team', chatQuery: 'What are your official emails?' }
    ]
  },

  // 7. GREETINGS & INTRO / KEVA IDENTITY
  {
    category: 'greetings',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'who are you', 'what is keva', 'keva', 'who is keva', 'what is clyptus ai', 'help me', 'start'],
    patterns: [/^(hi|hello|hey|hola|greetings)/i, /who are you/i, /what (can you do|is keva|is clyptus ai)/i, /(who|what) is keva/i, /your name/i],
    answer: `Hello! 👋 Welcome to Clyptus Software Solutions. I'm **Keva**.

I'm here to help you explore our enterprise services, company journey since 2014, global offices, or direct email channels.

How can I assist you today?`,
    quickActions: [
      { label: 'Official Emails', chatQuery: 'What are your official emails?' },
      { label: 'Company Journey', chatQuery: 'Tell me about Clyptus journey and history' },
      { label: 'ERP & SAP Services', pageTarget: 'SAP' },
      { label: 'AI Engineering', pageTarget: 'AI' },
      { label: 'Contact Us', pageTarget: 'Contact' }
    ]
  },

  // 8. ERP & SAP SERVICES
  {
    category: 'erp',
    keywords: ['sap', 'erp', 's4hana', 's/4hana', 'hana', 'brim', 'btp', 'clean core', 'migration', 'oracle erp', 'dynamics 365', 'ams', 'silver partner'],
    patterns: [/sap/i, /s\/4hana/i, /erp/i, /brim/i, /btp/i, /clean core/i, /oracle erp/i, /dynamics 365/i],
    answer: `**Clyptus ERP & SAP Practice (SAP Silver Partner)**

We provide complete enterprise ERP strategy, implementations, migrations, and ongoing management:

• **SAP S/4HANA**: Greenfield implementations, system conversions, RISE with SAP migrations, and clean-core decoupled architecture.
• **SAP BRIM** (Billing & Revenue Innovation Management): Subscription Order Management (SOM), Convergent Charging (CC), Convergent Invoicing (CI), Convergent Mediation (CM), and FI-CA / RAR revenue recognition.
• **SAP BTP & Custom ABAP**: Cloud-native extensions, microservices integration (CPI, PI/PO), and SAP Fiori UX modernization.
• **Oracle Cloud ERP**: Financials, supply chain management, and cloud ERP transformation.
• **Microsoft Dynamics 365**: Finance, Supply Chain, and Business Central implementations.
• **24/7 AMS & Managed Support**: Post go-live stabilization, hypercare, and proactive SLA-backed support.`,
    quickActions: [
      { label: 'ERP Services', pageTarget: 'SAP' },
      { label: 'Request ERP Review', pageTarget: 'Contact' },
      { label: 'Email Sales Team', chatQuery: 'What are your official emails?' }
    ]
  },

  // 9. ARTIFICIAL INTELLIGENCE & GENAI
  {
    category: 'ai',
    keywords: ['ai', 'genai', 'generative ai', 'llm', 'rag', 'agentforce', 'agents', 'machine learning', 'ml', 'computer vision', 'predictive', 'copilot', 'automation'],
    patterns: [/\bai\b/i, /genai|generative ai/i, /llm|rag/i, /machine learning/i, /agents|agentforce/i, /computer vision/i],
    answer: `**Artificial Intelligence & GenAI Engineering**

Clyptus builds enterprise-grade AI applications and autonomous workflow engines designed for real business outcomes:

• **Custom Generative AI & Fine-Tuning**: Secure enterprise RAG (Retrieval-Augmented Generation) architectures, internal copilots, and bespoke LLMs trained on corporate data.
• **Autonomous AI Agent Swarms**: Multi-agent systems that autonomously execute multi-step business workflows across CRM, ERP, and databases.
• **Predictive Machine Learning**: Demand forecasting, predictive maintenance, algorithmic risk scoring, and customer churn analysis.
• **Computer Vision**: Automated visual quality inspection, workplace safety compliance, and document intelligence.
• **MLOps & Governance**: Zero-data-leakage guardrails, drift monitoring, latency optimization, and continuous retraining pipelines.`,
    quickActions: [
      { label: 'AI Solutions', pageTarget: 'AI' },
      { label: 'AI Discovery Session', pageTarget: 'Contact' },
      { label: 'Email AI Team', chatQuery: 'What are your official emails?' }
    ]
  },

  // 10. MULTI-CLOUD & DEVOPS
  {
    category: 'cloud',
    keywords: ['cloud', 'aws', 'azure', 'gcp', 'google cloud', 'kubernetes', 'eks', 'aks', 'gke', 'devops', 'microservices', 'serverless', 'lambda', 'migration'],
    patterns: [/cloud/i, /aws|azure|gcp/i, /kubernetes|k8s/i, /devops/i, /microservices|serverless/i],
    answer: `**Multi-Cloud & DevOps Engineering**

We architect resilient, cost-optimized, and elastic cloud foundations across all major providers:

• **Platforms**: Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP).
• **Cloud Architecture**: Cloud-native microservices, containerization (Docker, Kubernetes EKS/AKS/GKE), and serverless architectures (AWS Lambda, Azure Functions, Cloud Run).
• **Zero-Downtime Migrations**: Database and application migration strategies engineered with automated rollback guarantees.
• **Cloud Modernization**: Modernizing monolithic legacy applications into decoupled event-driven architectures.
• **DevSecOps & Automation**: Automated CI/CD pipelines, Infrastructure as Code (Terraform, Ansible), and 24/7 cloud monitoring.`,
    quickActions: [
      { label: 'Cloud Services', pageTarget: 'Cloud' },
      { label: 'Cloud Architecture Review', pageTarget: 'Contact' }
    ]
  },

  // 11. CYBERSECURITY & COMPLIANCE
  {
    category: 'security',
    keywords: ['security', 'cybersecurity', 'cyber', 'soc', 'compliance', 'iso 27001', 'soc 2', 'hipaa', 'gdpr', 'nist', 'pentest', 'vulnerability', 'zero trust', 'siem', 'soar'],
    patterns: [/security/i, /cyber/i, /soc/i, /iso\s?27001/i, /soc\s?2/i, /hipaa/i, /gdpr/i, /zero trust/i, /pen(etration)?\s?test/i],
    answer: `**Cybersecurity & Regulatory Compliance**

Our defense-in-depth security practice protects your intellectual property, infrastructure, and reputation:

• **24/7 Managed SOC**: Real-time SIEM/SOAR incident detection, automated containment, and threat intelligence.
• **Compliance & Governance**: ISO/IEC 27001, SOC 2 Type II, HIPAA, GDPR, PCI DSS, and NIST CSF audit readiness.
• **Offensive Security & Pen Testing**: Web app, cloud infrastructure, and internal network penetration testing with remediation roadmaps.
• **Zero-Trust Architecture**: Identity & Access Management (IAM), micro-segmentation, and least-privilege enforcement.
• **Cloud Security Posture (CSPM)**: Automated compliance scanning across AWS, Azure, and Google Cloud workloads.`,
    quickActions: [
      { label: 'Cybersecurity', pageTarget: 'Security' },
      { label: 'Security Assessment', pageTarget: 'Contact' }
    ]
  },

  // 12. CRM SERVICES (SAP CX, ORACLE CX, DYNAMICS)
  {
    category: 'crm',
    keywords: ['crm', 'customer', 'sap cx', 'sales cloud', 'service cloud', 'commerce cloud', 'oracle cx', 'dynamics 365 crm', 'cpq', 'emarsys'],
    patterns: [/crm/i, /sap cx/i, /sales cloud/i, /service cloud/i, /oracle cx/i, /customer relationship/i],
    answer: `**CRM & Customer Experience Engineering**

Clyptus unifies front-office engagement with back-office execution across industry-leading CRM platforms:

• **SAP Customer Experience (SAP CX)**: SAP Sales Cloud, SAP Service Cloud, SAP Commerce Cloud, Customer Data Platform (CDP), and Emarsys Marketing Automation.
• **SAP CPQ & Subscription Billing**: Fast product configuration, complex tiered pricing, and quoting engines.
• **Oracle CX & Salesforce Integrations**: Enterprise-wide pipeline visibility and synchronized master customer records.
• **Microsoft Dynamics 365 CRM**: Connected sales, customer care, and automated field services.`,
    quickActions: [
      { label: 'CRM Services', pageTarget: 'CRM' },
      { label: 'CRM Architecture', pageTarget: 'Contact' }
    ]
  },

  // 13. SALESFORCE & AGENTFORCE
  {
    category: 'salesforce',
    keywords: ['salesforce', 'agentforce', 'sfdc', 'apex', 'lwc', 'lightning', 'flow', 'experience cloud', 'marketing cloud', 'einstein'],
    patterns: [/salesforce/i, /agentforce/i, /sfdc/i, /apex/i, /lwc/i],
    answer: `**Salesforce Solutions & Agentforce AI**

Accelerate revenue pipelines with customized Salesforce ecosystems and autonomous AI agents:

• **Salesforce Agentforce**: Deploying autonomous AI agents that handle customer service inquiries, qualify sales leads, and execute business actions.
• **Core Cloud Deployments**: Sales Cloud, Service Cloud, Experience Cloud (Community), and Marketing Cloud.
• **Custom Development**: Apex architecture, Lightning Web Components (LWC), and complex third-party ERP integrations.
• **Omnichannel Automation**: Flow orchestration, automated SLAs, and unified customer 360-degree views.`,
    quickActions: [
      { label: 'Salesforce Solutions', pageTarget: 'Salesforce' },
      { label: 'Talk to Salesforce Specialist', pageTarget: 'Contact' }
    ]
  },

  // 14. DATA ENGINEERING & LAKEHOUSES
  {
    category: 'data',
    keywords: ['data', 'data engineering', 'analytics', 'snowflake', 'databricks', 'kafka', 'spark', 'etl', 'elt', 'dbt', 'lakehouse', 'bi', 'bigquery'],
    patterns: [/data/i, /analytics/i, /snowflake/i, /databricks/i, /kafka/i, /spark/i, /lakehouse/i, /bigquery/i],
    answer: `**Data Engineering & Modern Lakehouse Architectures**

We transform fragmented enterprise data silos into clean, real-time analytics engines:

• **Modern Data Lakehouses**: Snowflake, Databricks, and Google Cloud BigQuery implementations.
• **Streaming Data Pipelines**: Real-time event streaming architectures using Apache Kafka and Apache Spark.
• **Automated ETL/ELT**: Scalable data transformations with dbt, Airflow, and Azure Data Factory.
• **Data Governance & Quality**: Automated data lineage, cataloging, schema validation, and GDPR masking.
• **Enterprise BI**: High-performance executive dashboards in Power BI, Tableau, and Looker.`,
    quickActions: [
      { label: 'Data Engineering', pageTarget: 'DataEngineering' },
      { label: 'Data Discovery Workshop', pageTarget: 'Contact' }
    ]
  },

  // 15. IT RECRUITMENT & TALENT DELIVERY
  {
    category: 'recruiting',
    keywords: ['recruitment', 'recruiting', 'staffing', 'talent', 'hire', 'contractors', 'placement', 'developers', 'consultants'],
    patterns: [/recruitment/i, /recruiting/i, /staffing/i, /hire talent/i, /contractors/i],
    answer: `**IT Recruiting & Specialized Talent Delivery**

Rapid deployment of rigorously vetted enterprise technology talent:

• **Flexible Models**: Contract staffing, permanent placement, contract-to-hire, and dedicated offshore squads.
• **Specializations**: Certified SAP functional/technical consultants, Cloud Architects, AI Engineers, Cybersecurity Analysts, and Salesforce Developers.
• **Technical Vetting**: Every candidate is evaluated by Clyptus practicing solution architects before submission.
• **Join Clyptus**: Send your resume to hr.india@clyptus.com or explore our Careers page.`,
    quickActions: [
      { label: 'IT Recruiting', pageTarget: 'Recruiting' },
      { label: 'Explore Careers', pageTarget: 'Careers' },
      { label: 'Send Resume', chatQuery: 'What are your official emails?' }
    ]
  },

  // 16. INDUSTRIES TRANSFORMED
  {
    category: 'industries',
    keywords: ['industries', 'sectors', 'banking', 'healthcare', 'retail', 'manufacturing', 'ports', 'logistics', 'energy', 'telecom'],
    patterns: [/industr(ies|y)/i, /sectors?/i, /who do you serve/i],
    answer: `**Industries We Transform**

Clyptus delivers domain-tailored software and architectures across major global industries:

• **Manufacturing & Industry 4.0**: Smart shop-floor integration, IoT telemetry, and digital twins.
• **Banking, Financial Services & Insurance (BFSI)**: Secure transaction engines, fraud mitigation, and regulatory compliance.
• **Healthcare & Life Sciences**: HIPAA-compliant patient platforms, medical imaging AI, and EHR integrations.
• **Ports, Maritime & Logistics**: Terminal operating systems, voyage tracking, and supply chain automation.
• **Retail & E-commerce**: Omnichannel commerce, personalized AI recommendation engines, and inventory optimization.
• **Energy, Utilities, & Oil & Gas**: Asset management, predictive maintenance, and sustainability reporting.`,
    quickActions: [
      { label: 'Explore Industries', pageTarget: 'Industries' },
      { label: 'Verified Case Studies', pageTarget: 'Projects' }
    ]
  },

  // 17. CLIENTS & PARTNERS
  {
    category: 'clients',
    keywords: ['clients', 'customers', 'partners', 'deloitte', 'panasonic', 'ntt data', 'hcl', 'hexaware', 'ctrls', 'welspun', 'saudia cargo', 'greenko'],
    patterns: [/clients?|customers?|partners?/i, /who (uses|trusts) clyptus/i],
    answer: `**Trusted Enterprise Clients & Partners**

Clyptus works with leading global organizations across North America, EMEA, and APAC:

• **Global Leaders**: Oracle, Deloitte, Panasonic, NTT DATA, HCL Tech, LTIMindtree, and Hexaware.
• **Infrastructure & Tech**: CtrlS Datacenters, Welspun Group, Greenko Energy, and ThingsAlive.
• **Logistics & Ports**: Saudia Cargo, Lumut Port, and Penang Port.
• **Industrial & Enterprise**: Hume Cement, Al Nasser Group, Al Nasir Company, Artwright, neev SYSTEMS, and DGSOFT Technologies.

We are also an official **SAP Silver Partner**.`,
    quickActions: [
      { label: 'Client Case Studies', pageTarget: 'Projects' },
      { label: 'Start an Enterprise Project', pageTarget: 'Contact' }
    ]
  },

  // 18. GENERAL CONTACT & CONSULTATION
  {
    category: 'contact',
    keywords: ['contact', 'reach', 'talk', 'consultation', 'quote', 'pricing', 'cost', 'inquire', 'support', 'get in touch', 'book call', 'schedule meeting'],
    patterns: [/contact/i, /consultation|quote|pricing|cost/i, /how (to|can I) (reach|connect)/i, /get in touch/i],
    answer: `**Get in Touch with Clyptus Software Solutions**

We are here to assist you with technical assessments, architecture roadmaps, or project staffing:

• **Primary Email Contacts**:
  Sales & Client Proposals: Sales@clyptus.com
  General Inquiries: info@clyptus.com / contact@clyptus.com
  Talent & HR: hr.india@clyptus.com

• **Direct Phone Lines**:
  India: +91 77999 88139
  UAE: +971 52 350 3297
  USA: +1 480 427-6373

• **Corporate Hubs**:
  Hyderabad: Manjeera Trinity Corporate, JNTU-Hitech City Rd
  Dubai: 101 Sheikh Zayed Rd, DIFC
  California: 45627 Basswood Ct, Temecula, CA

Fill out our interactive form on the Contact page for a response within 24 hours.`,
    quickActions: [
      { label: 'Open Contact Form', pageTarget: 'Contact' },
      { label: 'View All Emails', chatQuery: 'What are your official emails?' },
      { label: 'Company Journey', chatQuery: 'Tell me about the company journey' },
      { label: 'Browse Services', pageTarget: 'Services' }
    ]
  }
];

export const ClyptusAiChatbot: React.FC<ClyptusAiChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? Math.min(450, window.innerWidth - 32) : 450,
    height: 600
  });
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! 👋 Welcome to Clyptus Software Solutions. I'm Keva`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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

  // Window resize handler to maintain responsive bounds
  useEffect(() => {
    const handleWindowResize = () => {
      setDimensions((prev) => ({
        width: Math.min(prev.width, window.innerWidth - 32),
        height: Math.min(prev.height, window.innerHeight - 40)
      }));
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // Drag at edge or corner to resize chat window
  const startResize = (
    e: React.MouseEvent | React.TouchEvent, 
    direction: 'left' | 'bottom' | 'bottom-left'
  ) => {
    e.preventDefault();
    setIsResizing(true);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const startX = clientX;
    const startY = clientY;
    const startWidth = dimensions.width;
    const startHeight = dimensions.height;

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;

      const maxWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 850) : 850;
      const maxHeight = typeof window !== 'undefined' ? Math.min(window.innerHeight - 40, 900) : 900;
      const minWidth = 320;
      const minHeight = 360;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction === 'left' || direction === 'bottom-left') {
        newWidth = startWidth + (startX - currentX);
      }
      if (direction === 'bottom' || direction === 'bottom-left') {
        newHeight = startHeight + (currentY - startY);
      }

      setDimensions({
        width: Math.max(minWidth, Math.min(maxWidth, newWidth)),
        height: Math.max(minHeight, Math.min(maxHeight, newHeight))
      });
    };

    const onEnd = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    document.body.style.userSelect = 'none';
    if (direction === 'left') document.body.style.cursor = 'w-resize';
    else if (direction === 'bottom') document.body.style.cursor = 's-resize';
    else if (direction === 'bottom-left') document.body.style.cursor = 'sw-resize';

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
  };

  // Answer matching engine
  const findAnswer = (query: string): { text: string; quickActions?: QuickAction[] } => {
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
        const lowerKw = kw.toLowerCase();
        if (cleanQuery === lowerKw) {
          score += 15;
        } else if (cleanQuery.includes(lowerKw)) {
          score += lowerKw.split(' ').length * 4;
        }
        for (const token of queryTokens) {
          if (token.length > 2 && lowerKw.includes(token)) {
            score += 1;
          }
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && highestScore >= 1) {
      return { text: bestMatch.answer, quickActions: bestMatch.quickActions };
    }

    // 3. Fallback Smart Response
    return {
      text: `Thank you for asking! While I don't have an exact match for that specific inquiry, Clyptus provides comprehensive enterprise technology solutions:

• **Contact & Emails**: Sales@clyptus.com | hr.india@clyptus.com | +91 77999 88139
• **Company Journey**: Founded in 2014, official SAP Silver Partner, 10+ years experience, 250+ consultants across USA, UAE, and India.
• **Enterprise Practices**: SAP S/4HANA & BRIM, Artificial Intelligence, Multi-Cloud, Cybersecurity, CRM, Salesforce, and Data Engineering.

Would you like to connect directly with our solution architects or explore our journey?`,
      quickActions: [
        { label: 'View All Emails', chatQuery: 'What are your official emails?' },
        { label: 'Company Journey', chatQuery: 'Tell me about Clyptus journey and history' },
        { label: 'Office Locations', chatQuery: 'Where are your office locations?' },
        { label: 'Browse All Services', pageTarget: 'Services' },
        { label: 'Contact Form', pageTarget: 'Contact' }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim();
    if (!text) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    // Realistic typing delay
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
    }, 400);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: `Hello! 👋 Welcome to Clyptus Software Solutions. I'm Keva`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleActionClick = (targetPage?: string) => {
    if (targetPage && onNavigate) {
      onNavigate(targetPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Helper to parse clean bold, emails, phones, and italics inline
  const renderInlineContent = (text: string) => {
    // Regex matches: bold (**...**), email address, phone number (+...), italic (*...*)
    const pattern = /(\*\*.*?\*\*|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+\d[\d\s()-]{8,}\d|\*.*?\*)/g;
    const parts = text.split(pattern);

    return parts.map((part, pIdx) => {
      if (!part) return null;

      // Clean, elegant bold text - font-semibold instead of font-extrabold
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} className="font-semibold text-slate-900 tracking-normal">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Clean inline email links - elegant underline without bulky box borders
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
        return (
          <a
            key={pIdx}
            href={`mailto:${part}`}
            className="font-medium text-blue-600 hover:text-blue-800 underline underline-offset-2 decoration-blue-300 hover:decoration-blue-600 transition-colors select-text inline-flex items-center gap-0.5"
            title={`Send email to ${part}`}
          >
            <span>{part}</span>
          </a>
        );
      }

      // Clean inline phone links
      if (/^\+\d[\d\s()-]{8,}\d$/.test(part)) {
        const cleanPhone = part.replace(/[^+\d]/g, '');
        return (
          <a
            key={pIdx}
            href={`tel:${cleanPhone}`}
            className="font-medium text-slate-700 hover:text-blue-600 underline underline-offset-2 decoration-slate-300 transition-colors select-text inline-flex items-center gap-0.5"
            title={`Call ${part}`}
          >
            <span>{part}</span>
          </a>
        );
      }

      // Italic
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={pIdx} className="italic text-slate-600">
            {part.slice(1, -1)}
          </em>
        );
      }

      return part;
    });
  };

  // Format bold, numbered milestones, and clean readable text
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Standalone Title / Section Header (e.g. "**Title**")
      if (/^\*\*([^*]+)\*\*$/.test(line.trim())) {
        const titleMatch = line.trim().match(/^\*\*([^*]+)\*\*$/);
        return (
          <div key={idx} className="font-semibold text-slate-900 text-[15px] sm:text-base tracking-tight pt-1.5 pb-0.5">
            {titleMatch ? titleMatch[1] : line}
          </div>
        );
      }

      // Numbered items (e.g. "1. ", "2. ")
      const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
      if (numberedMatch) {
        const num = numberedMatch[1];
        const rest = numberedMatch[2];
        return (
          <div key={idx} className="flex items-start gap-2.5 my-1.5 pl-0.5">
            <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-blue-200/70">
              {num}
            </span>
            <div className="flex-1 text-slate-700 leading-relaxed text-sm sm:text-[15px]">
              {renderInlineContent(rest)}
            </div>
          </div>
        );
      }

      // Bullet items (e.g. "• ", "- ")
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        const bulletText = line.replace(/^[\s•-]+/, '');
        return (
          <div key={idx} className="flex items-start gap-2.5 my-1 pl-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 shrink-0" />
            <div className="flex-1 text-slate-700 leading-relaxed text-sm sm:text-[15px]">
              {renderInlineContent(bulletText)}
            </div>
          </div>
        );
      }

      return (
        <p key={idx} className="text-sm sm:text-[15px] text-slate-700 leading-relaxed my-1">
          {renderInlineContent(line)}
        </p>
      );
    });
  };

  return (
    <div className="select-none font-sans">
      {/* ---------------------------------------------------- */}
      {/* FLOATING TRIGGER BUTTON (TOP RIGHT CORNER)           */}
      {/* ---------------------------------------------------- */}
      {!isOpen && (
        <div className="fixed top-3.5 right-14 sm:top-3.5 sm:right-16 lg:top-3.5 lg:right-8 z-50 flex items-center gap-2">
          {/* Elegant Top-Right Pill Trigger Button */}
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="group relative flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-blue-600 border border-slate-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.12)] backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer text-xs font-semibold select-none"
            title="Chat with Keva"
            aria-label="Chat with Keva"
          >
            {/* Small Glowing Dot / Status */}
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Bot className="w-3 h-3 stroke-[2.2]" />
            </div>
            <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Keva</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* EXPANDABLE CHATBOT WINDOW (TOP RIGHT CORNER)         */}
      {/* ---------------------------------------------------- */}
      {isOpen && (
        <div 
          style={{
            width: isMinimized ? undefined : `${dimensions.width}px`,
            height: isMinimized ? '56px' : `${dimensions.height}px`
          }}
          className={`fixed top-3.5 right-4 sm:top-4 sm:right-6 lg:top-3.5 lg:right-8 z-[70] max-w-[calc(100vw-32px)] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-4 ${
            isResizing ? 'transition-none select-none' : 'transition-all duration-300 ease-out'
          } ${
            isMinimized ? 'w-[180px] h-14' : ''
          }`}
        >
          {/* Edge Drag Handles for Resizing (Left & Bottom) */}
          {!isMinimized && (
            <>
              {/* Left edge drag handle */}
              <div
                onMouseDown={(e) => startResize(e, 'left')}
                onTouchStart={(e) => startResize(e, 'left')}
                className="absolute left-0 top-0 bottom-6 w-2.5 cursor-w-resize hover:bg-blue-500/15 active:bg-blue-500/25 transition-colors z-30"
                title="Drag to resize width"
              />
              {/* Bottom edge drag handle */}
              <div
                onMouseDown={(e) => startResize(e, 'bottom')}
                onTouchStart={(e) => startResize(e, 'bottom')}
                className="absolute left-6 right-0 bottom-0 h-2.5 cursor-s-resize hover:bg-blue-500/15 active:bg-blue-500/25 transition-colors z-30"
                title="Drag to resize height"
              />
              {/* Bottom-Left corner drag handle */}
              <div
                onMouseDown={(e) => startResize(e, 'bottom-left')}
                onTouchStart={(e) => startResize(e, 'bottom-left')}
                className="absolute left-0 bottom-0 w-6 h-6 cursor-sw-resize flex items-end justify-start p-1.5 hover:bg-blue-500/20 active:bg-blue-500/30 rounded-bl-3xl transition-colors z-40 group"
                title="Drag edge to resize"
              >
                <div className="w-2.5 h-2.5 flex flex-col justify-end items-start gap-[2px] opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-[2px] bg-slate-400 group-hover:bg-blue-600 rounded-full" />
                  <div className="w-2 h-[2px] bg-slate-400 group-hover:bg-blue-600 rounded-full" />
                  <div className="w-2.5 h-[2px] bg-slate-400 group-hover:bg-blue-600 rounded-full" />
                </div>
              </div>
            </>
          )}

          {/* Header Bar */}
          <div className="relative px-5 py-3 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-between border-b border-slate-800">
            {/* Subtle ambient light */}
            <div className="absolute top-0 right-1/4 w-32 h-6 bg-blue-500/15 blur-lg pointer-events-none" />

            <div className="flex items-center gap-2.5 relative z-10">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-orange-500 flex items-center justify-center text-white shadow-sm">
                <Bot className="w-4 h-4 stroke-[2.2]" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border-2 border-slate-900" />
              </div>
              <div className="flex items-center text-left">
                <h3 className="font-bold text-sm text-white tracking-tight">Keva</h3>
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
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
                title={isMinimized ? 'Expand' : 'Minimize'}
                aria-label={isMinimized ? 'Expand' : 'Minimize'}
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMinimized ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-red-500/20 hover:text-red-400 transition-colors cursor-pointer"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body (Hidden when minimized) */}
          {!isMinimized && (
            <>
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60 text-left">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
                  >
                    <div className="flex items-end gap-2 max-w-[92%]">
                      {msg.sender === 'ai' && (
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 mb-1 shadow-2xs">
                          <Bot className="w-3.5 h-3.5 stroke-[2.2]" />
                        </div>
                      )}

                      <div
                        className={`rounded-2xl px-4 py-3 text-sm sm:text-[15px] leading-relaxed shadow-xs ${
                          msg.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-tr-none font-normal'
                            : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none font-normal'
                        }`}
                      >
                        {msg.sender === 'user' ? (
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                        ) : (
                          <div>{renderFormattedText(msg.text)}</div>
                        )}
                      </div>
                    </div>

                    {/* Quick Interactive Suggestions after any AI response (hidden on 1st initial greeting) */}
                    {msg.sender === 'ai' && msg.id !== 'welcome' && msg.id !== 'welcome-reset' && (
                      <div className="flex flex-wrap gap-1.5 mt-2 ml-8 max-w-[92%]">
                        {(msg.quickActions && msg.quickActions.length > 0 
                          ? msg.quickActions 
                          : [
                              { label: 'Official Emails', chatQuery: 'What are your official emails?' },
                              { label: 'Company Journey', chatQuery: 'Tell me about Clyptus journey and history' },
                              { label: 'ERP & SAP Services', pageTarget: 'SAP' },
                              { label: 'AI Solutions', pageTarget: 'AI' }
                            ]
                        ).map((action, aIdx) => (
                          <button
                            key={aIdx}
                            onClick={() => {
                              if (action.chatQuery) {
                                handleSendMessage(action.chatQuery);
                              } else if (action.pageTarget) {
                                handleActionClick(action.pageTarget);
                              }
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-[13px] font-medium bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-2xs transition-all hover:scale-[1.02] cursor-pointer active:scale-95"
                          >
                            <span>{action.label}</span>
                            <ArrowRight className="w-3 h-3 text-slate-400" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Timestamp */}
                    <span className="text-[9px] text-slate-400 font-mono mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {/* Animated Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-500 animate-in fade-in">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0">
                      <Bot className="w-3 h-3" />
                    </div>
                    <div className="px-3 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Control Bar */}
              <div className="p-3 bg-white border-t border-slate-200/80 flex flex-col gap-1.5">
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
                    placeholder="Ask Keva about emails, journey, services..."
                    className="flex-1 px-4 py-2.5 rounded-full bg-slate-100/90 border border-slate-200 text-sm sm:text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={!inputQuery.trim() || isTyping}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 shadow-xs active:scale-95 transition-all shrink-0 cursor-pointer"
                    title="Send query"
                    aria-label="Send query"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ClyptusAiChatbot;
