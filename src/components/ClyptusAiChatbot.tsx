import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  X, 
  RotateCcw, 
  ArrowRight,
  Compass 
} from 'lucide-react';
import { KevaBotLogo } from './KevaBotLogo';

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

  // 3. CORE ENTERPRISE SERVICES & PRACTICE AREAS (ALL OFFERINGS)
  {
    category: 'services',
    keywords: [
      'services', 'service', 'services providing', 'services you are providing',
      'what services', 'what do you do', 'what do you provide', 'offerings', 
      'solutions', 'capabilities', 'what we do', 'practice areas', 'portfolio',
      'digital services', 'technology services', 'what does clyptus do', 'what can you do',
      'all services', 'list services', 'what are your services'
    ],
    patterns: [
      /\bservices?\b/i,
      /\bwhat (services?|solutions?|offerings?) (do you|does clyptus|are provided|are you providing)\b/i,
      /\bservices? (you are|you|clyptus is) providing\b/i,
      /\bwhat (does|can) clyptus do\b/i,
      /\bwhat (do you|can you) (offer|provide|do for clients)\b/i,
      /\b(all |our )?offerings\b/i,
      /\b(core )?practice areas\b/i
    ],
    answer: `**Clyptus Enterprise Services & Practice Areas**

We deliver end-to-end digital engineering and technology transformation across 8 core practices:

1. **ERP & SAP Services (SAP Silver Partner)**: S/4HANA migrations, SAP BRIM billing, SAP BTP integrations, ECC transformations, and 24/7 AMS support.
2. **Artificial Intelligence & GenAI**: Custom enterprise LLMs, Agentic AI workflows, predictive analytics, computer vision, and autonomous copilots.
3. **Multi-Cloud Architecture & DevOps**: AWS, Microsoft Azure, and GCP migrations, Kubernetes containerization, CI/CD automation, and cloud security governance.
4. **Cyber Security & Zero Trust**: Threat detection, SOC 2 / ISO compliance, endpoint defense, vulnerability management, and IAM security.
5. **CRM Services**: Customer journey orchestration, revenue operations, omnichannel workflows, and Zoho/HubSpot/Dynamics implementations.
6. **Salesforce Consulting**: Sales & Service Cloud customization, Lightning development, MuleSoft integrations, and managed support.
7. **Data Engineering & Big Data**: Real-time streaming ETL/ELT pipelines, Snowflake, Databricks, enterprise data warehouses, and Power BI analytics.
8. **IT Staffing & Global Talent Recruitment**: Specialized engineering squads, contract-to-hire, executive search, and onshore/offshore delivery.`,
    quickActions: [
      { label: 'Browse All Services', pageTarget: 'Services' },
      { label: 'ERP & SAP', pageTarget: 'SAP' },
      { label: 'AI Solutions', pageTarget: 'AI' },
      { label: 'Cloud Services', pageTarget: 'Cloud' },
      { label: 'Official Emails', chatQuery: 'What are your official emails?' }
    ]
  },

  // 4. CURRENT PROJECTS & CLIENT ENGAGEMENTS
  {
    category: 'projects',
    keywords: [
      'project', 'projects', 'current project', 'current projects', 'current project clyptus doing',
      'what is the current project', 'what projects', 'what is clyptus doing', 'active projects',
      'case studies', 'client work', 'client engagements', 'what are you working on', 'portfolio',
      'current work', 'ongoing projects', 'recent projects'
    ],
    patterns: [
      /\b(current |active |ongoing |recent )?projects?\b/i,
      /\bwhat (is|are) (the )?(current |active )?projects?\b/i,
      /\bwhat (is|are) (clyptus|you) (working on|doing currently|doing|building)\b/i,
      /\b(case studies|client engagements?|past work|deliveries)\b/i
    ],
    answer: `**Current Projects & Client Engagements at Clyptus**

Clyptus is actively delivering high-impact enterprise transformations globally:

• **SAP S/4HANA & BRIM Transformations**: Delivering end-to-end subscription billing, revenue recognition, and clean-core S/4HANA migrations for telecom and retail enterprises in UAE and North America.
• **Agentic AI & Generative AI Copilots**: Building bespoke enterprise AI workflows, LLM fine-tuning, and document intelligence pipelines for financial and supply-chain clients.
• **Enterprise Multi-Cloud Modernization**: Architecting zero-downtime cloud migrations to AWS and Azure with automated Kubernetes containerization for healthcare organizations.
• **Real-Time Data Lakehouse Pipelines**: Deploying scalable Databricks and Snowflake engineering infrastructure for predictive analytics and real-time business intelligence.
• **Zero-Trust Cybersecurity Hardening**: Implementing 24/7 managed detection, response (MDR), and identity access management (IAM) across hybrid enterprise environments.`,
    quickActions: [
      { label: 'Company Journey', chatQuery: 'Tell me about Clyptus journey and history' },
      { label: 'Browse Services', pageTarget: 'Services' },
      { label: 'Official Emails', chatQuery: 'What are your official emails?' },
      { label: 'Contact Us', pageTarget: 'Contact' }
    ]
  },

  // 5. GLOBAL LOCATIONS & OFFICE ADDRESSES
  {
    category: 'locations',
    keywords: [
      'locations', 'offices', 'address', 'office address', 'headquarters', 
      'hyderabad', 'dubai', 'california', 'temecula', 'india', 'uae', 'usa', 
      'branches', 'office locations', 'delivery centers', 'directions', 'map', 
      'bengaluru', 'bangalore', 'chennai', 'vijayawada', 'indore', 'india branches',
      'phone', 'phone number', 'call', 'telephone', 'contact number'
    ],
    patterns: [
      /\b(locations?|offices?|address(es)?|headquarters|branches?)\b/i,
      /where (is clyptus|are the offices|are you located)/i,
      /\b(phone|call|telephone|contact number)\b/i,
      /\b(hyderabad|dubai|california|temecula|bengaluru|bangalore|chennai|vijayawada|indore)\b/i
    ],
    answer: `**Global Delivery Centers & Office Locations**

Clyptus delivers 24/7 enterprise engineering and consulting across our strategic hubs:

• **India Headquarters & Delivery Network**:
  • **Hyderabad (Global HQ & Delivery Center)**: 12A01A, 13th Floor, Manjeera Trinity Corporate, JNTU–Hitech City Road, Kukatpally, Hyderabad, Telangana 500072 (Phone: +91 77999 88139)
  • **Bengaluru**: AI & Cloud Development Lab
  • **Chennai**: Enterprise Systems & Offshore Delivery Center
  • **Vijayawada**: Regional Delivery Center
  • **Indore**: Central India Operations
  *(Official Emails: sales@clyptus.com | hr.india@clyptus.com)*

• **Dubai, UAE (Middle East Regional Center & DIFC Operations)**:
  101 Sheikh Zayed Rd, Trade Centre 1, DIFC, Dubai, UAE (Phone: +971 52 350 3297 | Email: hr.uae@clyptus.com)

• **California, USA (North America Business Hub)**:
  45627 Basswood Ct, Temecula, California 92592 (Phone: +1 480 427-6373 | Email: hr.usa@clyptus.com)`,
    quickActions: [
      { label: 'View Hubs on Map', pageTarget: 'Contact' },
      { label: 'Official Emails', chatQuery: 'What are your official emails?' },
      { label: 'India Branches Details', chatQuery: 'Tell me about all branches in India' }
    ]
  },

  // 5.1 INDIA BRANCHES & REGIONAL DELIVERY HUBS
  {
    category: 'india-branches',
    keywords: [
      'india branches', 'branches in india', 'indian branches', 'indian offices', 
      'offices in india', 'bengaluru', 'bangalore', 'chennai', 'vijayawada', 'indore',
      'hyderabad branch', 'bengaluru branch', 'chennai branch', 'vijayawada branch', 'indore branch',
      'locations in india', 'delivery centers in india', 'all branches in india'
    ],
    patterns: [
      /\b(india\s+branches?|branches\s+in\s+india|indian\s+(branches?|offices?)|offices?\s+in\s+india|locations?\s+in\s+india)\b/i,
      /\b(bengaluru|bangalore|chennai|vijayawada|indore)\b/i
    ],
    answer: `**Clyptus Delivery Network Across India**

In India, Clyptus operates a distributed engineering and delivery network across 5 strategic hubs:

• **1. Hyderabad (Global Headquarters & Delivery Center)**
  - Address: 12A01A, 13th Floor, Manjeera Trinity Corporate, JNTU–Hitech City Road, Kukatpally, Hyderabad, Telangana 500072
  - Role: Corporate Executive Headquarters, SAP Center of Excellence & Global Client Delivery
  - Phone: +91 77999 88139 | Emails: sales@clyptus.com, hr.india@clyptus.com

• **2. Bengaluru (Karnataka)**
  - Role: AI & Cloud Development Lab (GenAI research, autonomous agent swarms & cloud-native engineering)

• **3. Chennai (Tamil Nadu)**
  - Role: Enterprise Systems & Offshore Delivery Center (SAP S/4HANA enterprise implementations & large-scale integration governance)

• **4. Vijayawada (Andhra Pradesh)**
  - Role: Regional Delivery Center (agile sprint execution, ERP testing & client delivery)

• **5. Indore (Madhya Pradesh)**
  - Role: Central India Operations (ERP modernization, support & enterprise business applications)

Explore our interactive India map on the Contact page:`,
    quickActions: [
      { label: 'Open Contact & Map', pageTarget: 'Contact' },
      { label: 'About Leadership', pageTarget: 'About' },
      { label: 'Careers in India', pageTarget: 'Careers' }
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
      'leadership', 'founder', 'ceo', 'vamsi', 'vamsi krishna', 'vamsi krishna are',
      'management', 'executive', 'who runs', 'who leads', 'owner', 'director', 
      'managers', 'management team', 'team leads', 'leadership team'
    ],
    patterns: [
      /\b(founder|ceo|vamsi|vamsi krishna(\s*are)?|leadership|executive|director|management\s*team|leadership\s*team)\b/i,
      /who (runs|leads|founded|manages) clyptus/i,
      /\b(clyptus\s+)?(leadership|executives|management)\b/i
    ],
    answer: `**Clyptus Executive Leadership & Management Team**

Our leadership team combines deep enterprise architectural expertise, agile execution, and operational rigor:

1. **Chief Executive Officer & Founder**: **Vamsi Krishna Are**
   - Directs Clyptus's strategic vision, global partnerships (SAP Silver Partner), and technological innovation across USA, UAE, and India.
   - Core Mission: *"Turning Ideas Into Impact"* | Vision: *"Shaping Tomorrow Through Innovation"*.

2. **Operations Manager**: **Satya Narayana K**
   - Leads cross-functional engineering teams across SAP, Cloud, and AI practices to ensure seamless project delivery and client satisfaction.

3. **Project Manager**: **Nandhini P**
   - Heads enterprise project execution, agile sprint delivery, and client engagement for enterprise transformation solutions.`,
    quickActions: [
      { label: 'Operations Manager Details', chatQuery: 'Who is the Operations Manager?' },
      { label: 'Project Manager Details', chatQuery: 'Who is the Project Manager?' },
      { label: 'About Clyptus', pageTarget: 'About' },
      { label: 'Company Journey', chatQuery: 'Tell me about the company journey' }
    ]
  },

  // 5A. OPERATIONS MANAGER
  {
    category: 'operations-manager',
    keywords: [
      'manager', 'operations manager', 'satya', 'satya narayana', 'satya narayana k', 
      'who is manager', 'who is the manager', 'manager details', 'operations lead', 
      'general manager', 'tell me about manager'
    ],
    patterns: [
      /\b(operations\s*manager|manager\s*details?|satya\s*narayana(\s*k)?)\b/i,
      /\bwho\s+is\s+(the\s+)?(operations\s+)?manager\b/i,
      /\b(show|tell\s+me\s+about|details\s+of)\s+(the\s+)?(operations\s+)?manager\b/i,
      /\bmanager(\s+details)?$/i
    ],
    answer: `**Clyptus Management — Operations Manager**

• **Name**: **Satya Narayana K**
• **Role**: Operations Manager • Clyptus Software Solutions
• **Key Responsibilities & Focus**:
  - **Cross-Functional Engineering**: Leads engineering delivery units spanning SAP ERP, Multi-Cloud, and AI practices.
  - **Operational Governance**: Enforces delivery excellence, SLA compliance, and agile milestones across enterprise clients.
  - **Client Satisfaction**: Bridges enterprise business requirements with technical execution to ensure seamless delivery and client success.

Click below to learn more about our company on the About Us page or get in touch.`,
    quickActions: [
      { label: 'Project Manager Details', chatQuery: 'Tell me about the project manager' },
      { label: 'Leadership & CEO', chatQuery: 'Who is the CEO of Clyptus?' },
      { label: 'Read About Us', pageTarget: 'About' },
      { label: 'Contact Us', pageTarget: 'Contact' }
    ]
  },

  // 5B. PROJECT MANAGER
  {
    category: 'project-manager',
    keywords: [
      'project manager', 'nandhini', 'nandhini p', 'who is project manager', 
      'who is the project manager', 'pm', 'pm details', 'project manager details', 
      'project lead', 'project management', 'tell me about project manager'
    ],
    patterns: [
      /\b(project\s*manager|nandhini(\s*p)?|pm\s*details?)\b/i,
      /\bwho\s+is\s+(the\s+)?project\s+manager\b/i,
      /\b(show|tell\s+me\s+about|details\s+of)\s+(the\s+)?project\s+manager\b/i,
      /\bproject\s+management\s+lead\b/i
    ],
    answer: `**Clyptus Project Leadership — Project Manager**

• **Name**: **Nandhini P**
• **Role**: Project Manager • Clyptus Software Solutions
• **Key Responsibilities & Focus**:
  - **Enterprise Project Execution**: Directs end-to-end delivery for complex SAP S/4HANA, Cloud, and AI client transformations.
  - **Agile Governance & Milestones**: Manages sprint planning, scope management, risk mitigation, and timeline tracking.
  - **Client Stakeholder Engagement**: Leads transparent client communications to guarantee on-time, within-budget implementation.

Click below to explore our verified Case Studies or get in touch with our team.`,
    quickActions: [
      { label: 'Operations Manager Details', chatQuery: 'Who is the Operations Manager?' },
      { label: 'CEO & Founder', chatQuery: 'Who is the CEO of Clyptus?' },
      { label: 'Client Case Studies', pageTarget: 'Projects' },
      { label: 'Contact Us', pageTarget: 'Contact' }
    ]
  },

  // 6. CAREERS & JOB OPENINGS
  {
    category: 'careers',
    keywords: [
      'careers', 'carrers', 'carreers', 'carrer', 'jobs', 'hiring', 'openings', 'vacancies', 'apply', 
      'interview', 'resume', 'cv', 'work at clyptus', 'positions', 'recruitment for me',
      'carrers page', 'careers page', 'show carrers page', 'show careers page'
    ],
    patterns: [
      /\b(careers?|carrers?|carreers?|career|carrer|jobs?|hiring|openings?|vacanc(y|ies)|positions?|apply|resume|cv)\b/i,
      /work at clyptus/i,
      /how to apply/i,
      /\b(show\s+)?(carrers?|carreers?)\b/i
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
      { label: 'Go to Careers Page', pageTarget: 'Careers' },
      { label: 'HR Policies Portal', pageTarget: 'HR Policies' },
      { label: 'Email HR Team', chatQuery: 'What are your official emails?' }
    ]
  },

  // 9. GREETINGS & INTRO / KEVA IDENTITY
  {
    category: 'greetings',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'who are you', 'what is keva', 'who is keva', 'your name'],
    patterns: [
      /^(hi|hello|hey|hola|greetings|good (morning|afternoon|evening))\b/i, 
      /^who are you\b/i, 
      /^what is (keva|your name)\b/i, 
      /^who is keva\b/i
    ],
    answer: `Hello! 👋 Welcome to Clyptus Software Solutions. I'm **Keva**.

I'm here to help you explore our enterprise services, company journey since 2014, global offices, or direct email channels.

How can I assist you today?`,
    quickActions: [
      { label: 'Official Emails', chatQuery: 'What are your official emails?' },
      { label: 'Company Journey', chatQuery: 'Tell me about Clyptus journey and history' },
      { label: 'All Services', chatQuery: 'What services are you providing?' },
      { label: 'Current Projects', chatQuery: 'What is the current project Clyptus is doing?' }
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
      { label: 'Request ERP Review', pageTarget: 'SAP' },
      { label: 'Email Sales Team', chatQuery: 'What are your official emails?' }
    ]
  },

  // -------------------------------------------------------------
  // GRANULAR AI PAGE SUB-TOPICS & CAPABILITIES
  // -------------------------------------------------------------

  // AI.1 DATA SCIENCE & ANALYTICS
  {
    category: 'ai-datascience-analytics',
    keywords: [
      'data science', 'analytics', 'predictive models', 'dashboards', 
      'data science and analytics', 'data science & analytics', 'operational data',
      'predictive dashboards', 'bi models', 'what is data science and analytics'
    ],
    patterns: [
      /\bdata science(&| and)? analytics\b/i,
      /\bdata science\b/i,
      /\bpredictive models?( and dashboards?)?\b/i,
      /\bpredictive analytics dashboards?\b/i
    ],
    answer: `**Clyptus Data Science & Analytics (AI Practice)**

Our Data Science & Analytics practice turns raw ERP, operational, and customer data into real-time decision intelligence:

• **Key Capabilities**:
  • **Predictive Forecasting Models**: Algorithmic forecasting for sales, inventory turnover, and cash-flow trajectories.
  • **Executive KPI Dashboards**: Interactive, high-performance dashboards that eliminate manual report compilation.
  • **Actionable Pattern Discovery**: Machine learning models identifying operational bottlenecks and supply chain risks before they impact P&L.
  • **ERP Integration**: Embedded analytics directly integrated into SAP S/4HANA, Dynamics 365, and modern cloud warehouses.

Click below to explore our AI Solutions page or Data Engineering practice.`,
    quickActions: [
      { label: 'Go to AI Solutions', pageTarget: 'AI' },
      { label: 'Data Engineering', pageTarget: 'DataEngineering' },
      { label: 'Browse All Services', pageTarget: 'Services' }
    ]
  },

  // AI.2 INTELLIGENT PROCESS AUTOMATION (IPA)
  {
    category: 'ai-process-automation',
    keywords: [
      'intelligent process automation', 'ipa', 'erp workflow automation', 'workflow automation',
      'approvals automation', 'document handling', 'master data checks', 'reconciliation automation',
      'automate erp processes', 'what is intelligent process automation'
    ],
    patterns: [
      /\b(intelligent process automation|ipa)\b/i,
      /\b(erp workflow automation|automate repetitive business processes)\b/i,
      /\b(master(-|\s+)data checks?|reconciliation automation|automated approvals?)\b/i
    ],
    answer: `**Intelligent Process Automation (IPA) at Clyptus**

We eliminate friction across core enterprise workflows by combining algorithmic logic with generative intelligence:

• **What We Automate**:
  • **Automated Document Ingestion**: Ingesting, parsing, and verifying multi-format supplier invoices, bills of lading, and POs with zero manual data entry.
  • **Master-Data Hygiene**: Real-time cross-system validation checks across customer, vendor, and material master records.
  • **Automated 3-Way Reconciliation**: High-speed matching of purchase orders, receiving slips, and invoices with automatic exception routing.
  • **Intelligent Approval Chains**: Routing requests dynamically based on dollar thresholds, compliance risk scores, and department hierarchies.

Click below to visit the AI Solutions page.`,
    quickActions: [
      { label: 'Go to AI Solutions', pageTarget: 'AI' },
      { label: 'ERP & SAP Services', pageTarget: 'SAP' },
      { label: 'Talk to an AI Expert', pageTarget: 'Contact' }
    ]
  },

  // AI.3 AI INSIDE SAP S/4HANA
  {
    category: 'ai-sap-s4hana',
    keywords: [
      'ai inside sap', 'ai inside sap s4hana', 'ai inside s/4hana', 'embedded sap ml',
      'embedded machine learning', 'sap ai', 'sap machine learning', 'ai in sap',
      'machine learning in sap', 's/4hana ai', 'what is ai inside sap'
    ],
    patterns: [
      /\bai inside (sap|s\/?4hana)\b/i,
      /\bembedded (sap )?(machine learning|ml)\b/i,
      /\b(sap ai|ai in sap|machine learning in sap)\b/i
    ],
    answer: `**AI Inside SAP S/4HANA — Embedded Enterprise Intelligence**

Clyptus activates native and extended Machine Learning algorithms directly within the SAP S/4HANA digital core:

• **Core Implementations**:
  • **Intelligent Cash Management**: Automated bank reconciliation and cash application using historical matching heuristics.
  • **Predictive Contract Consumption**: Anticipating quota exhaustion across procurement contracts to secure volume discounts.
  • **Material Requirements Planning (MRP) Optimization**: Self-adjusting safety stock levels based on lead-time volatility and supplier performance.
  • **SAP BTP Extension Swarms**: Side-by-side agentic workflows that enhance standard SAP transactions without touching the clean core.

Click below to jump directly to our ERP & SAP or AI practice.`,
    quickActions: [
      { label: 'Go to AI Solutions', pageTarget: 'AI' },
      { label: 'Go to ERP & SAP Services', pageTarget: 'SAP' },
      { label: 'Request ERP Review', pageTarget: 'SAP' }
    ]
  },

  // AI.4 5-STEP AI PROJECT DELIVERY LIFECYCLE
  {
    category: 'ai-project-steps',
    keywords: [
      'ai project steps', 'ai delivery steps', 'how an ai project runs', 'ai lifecycle', 
      '5 steps', 'ai methodology', 'how does an ai project run', 'ai implementation steps',
      'ai process', 'ai project stages', '5 delivery steps'
    ],
    patterns: [
      /\b(ai project steps?|how (an|does an) ai project runs?|5 steps?|ai delivery (steps?|methodology|lifecycle|stages?))\b/i,
      /\bhow do you deliver ai\b/i
    ],
    answer: `**How an AI Project Runs at Clyptus (5-Step Delivery Lifecycle)**

We follow a rigorous, enterprise-tested methodology to take AI from concept to mission-critical production:

1. **Step 01 — Data Audit & Pipeline Readiness**: Ingesting, profiling, cleansing, and structuring enterprise feeds for algorithmic consumption.
2. **Step 02 — Architecture & Model Selection**: Selecting, fine-tuning, or engineering bespoke neural architectures and enterprise RAG frameworks.
3. **Step 03 — Validation & Guardrail Benchmarking**: Rigorous testing for latency, hallucination mitigation, token efficiency, and business-metric thresholds.
4. **Step 04 — Production Deployment & Integration**: Secure API integration with core ERP, CRM, and databases via resilient MLOps infrastructure.
5. **Step 05 — Continuous Monitoring & Drift Mitigation**: Automated evaluation loops detecting data drift and adapting to evolving business patterns.

Click below to see the complete lifecycle on our AI Solutions page.`,
    quickActions: [
      { label: 'Go to AI Solutions', pageTarget: 'AI' },
      { label: 'Case Studies', pageTarget: 'Projects' },
      { label: 'Contact AI Practice', pageTarget: 'Contact' }
    ]
  },

  // AI.5 CONTINUOUS MONITORING & DRIFT MITIGATION
  {
    category: 'ai-drift-mitigation',
    keywords: [
      'drift mitigation', 'data drift', 'model drift', 'drift monitoring', 
      'continuous monitoring', 'concept drift', 'model retraining', 'drift',
      'what is drift mitigation'
    ],
    patterns: [
      /\b(drift mitigation|data drift|model drift|drift monitoring|concept drift)\b/i,
      /\bcontinuous monitoring and drift\b/i
    ],
    answer: `**Continuous Monitoring & Drift Mitigation (MLOps)**

In enterprise environments, model performance degrades over time as business patterns change. Clyptus provides proactive drift defense:

• **How We Protect AI Accuracy**:
  • **Covariate & Data Drift Detection**: Monitoring statistical distributions of incoming features compared to training baselines.
  • **Concept Drift Alarms**: Tracking ground-truth model outputs against actual business outcomes to catch metric decay early.
  • **Automated Retraining Triggers**: Orchestrating automated retraining pipelines on Kubernetes when confidence scores cross thresholds.
  • **Audit Trails & Version Rollback**: Zero-downtime canary deployments with instant rollback guarantees.

Explore this on the AI Solutions page below.`,
    quickActions: [
      { label: 'Go to AI Solutions', pageTarget: 'AI' },
      { label: 'Data Engineering', pageTarget: 'DataEngineering' }
    ]
  },

  // AI.6 VALIDATION & GUARDRAIL BENCHMARKING
  {
    category: 'ai-guardrails-validation',
    keywords: [
      'guardrails', 'guardrail benchmarking', 'ai safety', 'validation', 
      'zero data leakage', 'data leakage', 'hallucination prevention', 'pii redaction',
      'what is guardrail benchmarking'
    ],
    patterns: [
      /\b(guardrails?|guardrail benchmarking|ai safety|zero(-|\s+)data(-|\s+)leakage|hallucination mitigation)\b/i,
      /\bvalidation and guardrail\b/i
    ],
    answer: `**Validation & Guardrail Benchmarking**

Enterprise AI must be safe, deterministic, and compliant. Clyptus implements enterprise-grade guardrails:

• **Key Security & Quality Controls**:
  • **PII & Sensitive Data Redaction**: Automatic scrubbing of personal and financial information before tokenization.
  • **Hallucination Prevention**: Deterministic ground-truth citation frameworks and strict confidence boundaries.
  • **Zero-Data Leakage**: Private tenant model hosting (Azure OpenAI, AWS Bedrock, GCP Vertex) ensuring customer data is never used for public training.
  • **Latency & Token Benchmarking**: Optimizing TTFT (Time to First Token) and throughput for sub-second user responsiveness.

Click below to open our AI Solutions page.`,
    quickActions: [
      { label: 'Go to AI Solutions', pageTarget: 'AI' },
      { label: 'Cybersecurity', pageTarget: 'Security' }
    ]
  },

  // AI.7 AUTONOMOUS AI AGENT SWARMS
  {
    category: 'ai-agents-swarms',
    keywords: [
      'ai agents', 'autonomous agents', 'agent swarms', 'multi agent', 
      'agentic', 'autonomous multi-agent', 'agentic ai', 'swarms', 'multi-agent swarms',
      'what are ai agents', 'tell me about agent swarms'
    ],
    patterns: [
      /\b(ai agents?|autonomous agents?|agent swarms?|multi(-|\s+)agent(s)?|agentic ai)\b/i,
      /\bautonomous multi(-|\s+)agent swarms?\b/i
    ],
    answer: `**Autonomous AI Agent Swarms (Clyptus Innovation Lab)**

Rather than single chatbots, Clyptus deploys specialized multi-agent swarms that autonomously collaborate to execute complex, multi-step business missions:

• **How Agent Swarms Operate**:
  • **Role Specialization**: Different agents act as Researcher, Verifier, Executor, and Auditor within the swarm.
  • **Cross-System Execution**: Agents query databases, draft enterprise emails, trigger SAP transactions, and update Salesforce records.
  • **Self-Correction & Human-in-the-Loop**: Built-in verification loops validate intermediate outputs; exceptions are escalated to humans seamlessly.
  • **Enterprise Connectors**: Native interfaces into SAP BTP, Salesforce Agentforce, ServiceNow, and SQL lakehouses.

Learn more on our AI Solutions page.`,
    quickActions: [
      { label: 'Go to AI Solutions', pageTarget: 'AI' },
      { label: 'Salesforce Agentforce', pageTarget: 'Salesforce' },
      { label: 'ERP & SAP Services', pageTarget: 'SAP' }
    ]
  },

  // AI.8 DIGITAL TWINS
  {
    category: 'ai-digital-twins',
    keywords: [
      'digital twins', 'digital twin', 'process simulation', 'real time simulation', 
      'manufacturing twin', 'asset simulation', 'digital mirroring', 'what is digital twins'
    ],
    patterns: [
      /\bdigital twins?\b/i,
      /\breal(-|\s+)time process simulation\b/i
    ],
    answer: `**Digital Twins & Real-Time Process Simulation**

Clyptus engineers Digital Twins that mirror complex physical environments, production lines, and supply chains:

• **Key Capabilities**:
  • **Asset Mirroring**: Continuous ingestion of IoT telemetry to model machinery wear, temperature, and vibration.
  • **Predictive Bottleneck Modeling**: Simulating line speed adjustments and maintenance schedules to eliminate downtime.
  • **What-If Scenario Simulation**: Testing supply disruption impacts and warehouse layouts virtually before physical implementation.
  • **Operational Optimization**: Direct integration with Industry 4.0 analytics and enterprise ERP plant maintenance modules.

Click below to explore our AI and Industries hubs.`,
    quickActions: [
      { label: 'Go to AI Solutions', pageTarget: 'AI' },
      { label: 'Explore Industries', pageTarget: 'Industries' },
      { label: 'Client Case Studies', pageTarget: 'Projects' }
    ]
  },

  // AI.9 COMPUTER VISION
  {
    category: 'ai-computer-vision',
    keywords: [
      'computer vision', 'visual inspection', 'quality inspection', 'defect detection', 
      'workplace safety', 'video analytics', 'visual quality inspection', 'tell me about computer vision'
    ],
    patterns: [
      /\bcomputer vision\b/i,
      /\bvisual (quality|safety) inspection\b/i,
      /\bdefect detection\b/i
    ],
    answer: `**Computer Vision & Visual Quality Inspection**

Our Computer Vision solutions deliver millisecond optical intelligence directly to shop floors, distribution yards, and ports:

• **Enterprise Applications**:
  • **Sub-Millimeter Defect Detection**: High-speed camera inspection identifying surface fractures, print flaws, and assembly defects.
  • **Workplace Safety & PPE Compliance**: Automated monitoring for hard hats, high-vis vests, and unauthorized zone entry.
  • **Document & Optical Character Recognition (OCR)**: Ingestion of complex multilingual shipping labels, stamped metal tags, and handwritten manifests.
  • **Edge Deployment**: Optimized for low-latency inference on NVIDIA Jetson and edge gateway appliances.

Explore our AI practice below.`,
    quickActions: [
      { label: 'Go to AI Solutions', pageTarget: 'AI' },
      { label: 'Case Studies', pageTarget: 'Projects' }
    ]
  },

  // AI.10 RPA + GENAI (HYPERAUTOMATION)
  {
    category: 'ai-rpa-genai',
    keywords: [
      'rpa + genai', 'rpa genai', 'hyperautomation', 'robotic process automation', 
      'hyper automated workflows', 'rpa and genai', 'hyper-automated workflows', 'what is rpa + genai'
    ],
    patterns: [
      /\b(rpa \+ genai|rpa genai|hyper(-|\s+)?automation|hyper(-|\s+)?automated workflows?)\b/i,
      /\brpa and genai\b/i
    ],
    answer: `**RPA + GenAI: Hyper-Automated Workflows**

Traditional RPA handles deterministic repetitive clicks, while GenAI handles reasoning and comprehension. Clyptus combines them into unified Hyperautomation:

• **Key Advantages**:
  • **Parsing Unstructured Inputs**: GenAI interprets unstructured emails, scanned receipts, and PDFs, converting them into structured JSON.
  • **Deterministic Execution**: RPA bots take the structured JSON and execute transactions across legacy green-screen apps and modern ERPs.
  • **Exception Handling**: When workflows hit edge cases, conversational GenAI can prompt human operators for specific missing details.
  • **80%+ Cycle Time Reductions**: Drastically reduces days of manual back-office reconciliations to minutes.

Click below to explore our AI Solutions page.`,
    quickActions: [
      { label: 'Go to AI Solutions', pageTarget: 'AI' },
      { label: 'Browse All Services', pageTarget: 'Services' }
    ]
  },

  // AI.11 ENTERPRISE RAG & CUSTOM LLM FINE-TUNING
  {
    category: 'ai-rag-finetuning',
    keywords: [
      'rag', 'retrieval augmented generation', 'fine tuning', 'custom llm', 
      'bespoke llm', 'vector database', 'embeddings', 'enterprise rag', 'rag architecture',
      'what is rag'
    ],
    patterns: [
      /\brag\b/i,
      /\bretrieval(-|\s+)augmented generation\b/i,
      /\bfine(-|\s+)tuning\b/i,
      /\b(custom|bespoke) llms?\b/i,
      /\benterprise rag\b/i
    ],
    answer: `**Enterprise RAG (Retrieval-Augmented Generation) & LLM Fine-Tuning**

Clyptus equips global enterprises with bespoke language models that securely tap into proprietary internal knowledge:

• **Our Architecture**:
  • **Hybrid Dense & Sparse Search**: Advanced vector indexing (Pinecone, Qdrant, Azure AI Search, pgvector) with reciprocal rank fusion.
  • **Contextual Chunking & Metadata Filtering**: Preserving document hierarchy and role-based access permissions.
  • **Domain Fine-Tuning (PEFT / LoRA)**: Custom fine-tuning open-source and proprietary foundation models on specialized terminology (SAP ABAP, legal, medical, accounting).
  • **Zero-Training Guarantee**: Your corporate IP remains strictly isolated within your private tenant.

Click below to visit our AI Solutions hub.`,
    quickActions: [
      { label: 'Go to AI Solutions', pageTarget: 'AI' },
      { label: 'Data Engineering', pageTarget: 'DataEngineering' }
    ]
  },

  // AI.12 6 CORE MODEL ARCHITECTURES
  {
    category: 'ai-model-types',
    keywords: [
      'model types', 'model architectures', 'nlp', 'natural language processing', 
      'time series forecasting', 'recommendation systems', 'forecasting models',
      'what models do you use', 'supported models'
    ],
    patterns: [
      /\b(model types?|model architectures?|natural language processing|time series forecasting|recommendation systems?)\b/i,
      /\bwhat models do you (use|support)\b/i
    ],
    answer: `**Clyptus Model Architectures & Algorithmic Capabilities**

We design, train, and deploy across 6 primary model families:

1. **Natural Language Processing (NLP)**: Large language models, transformer embeddings, semantic search, and document summarization.
2. **Computer Vision**: Convolutional neural networks (CNNs), vision transformers (ViT), object detection, and OCR.
3. **Predictive Analytics**: Gradient-boosted decision trees (XGBoost, LightGBM), classification, and risk scoring.
4. **Generative AI & Copilots**: Multi-agent LLM systems, custom RAG pipelines, and enterprise code copilots.
5. **Recommendation Systems**: Collaborative filtering, matrix factorization, and deep retrieval for customer personalization.
6. **Time Series Forecasting**: Temporal fusion transformers (TFT), DeepAR, and ARIMA for demand and price forecasting.

Click below to view the AI Solutions page.`,
    quickActions: [
      { label: 'Go to AI Solutions', pageTarget: 'AI' },
      { label: 'Data Engineering', pageTarget: 'DataEngineering' }
    ]
  },

  // AI.13 INDUSTRY PROJECT: RETAIL DEMAND FORECASTING
  {
    category: 'ai-industry-retail',
    keywords: [
      'retail ai', 'demand forecasting', 'ai native demand forecasting', 
      'inventory optimization', 'retail forecasting', 'omni channel fulfillment'
    ],
    patterns: [
      /\b(retail ai|demand forecasting|ai(-|\s+)native demand forecasting)\b/i,
      /\bretail inventory optimization\b/i
    ],
    answer: `**Retail Case Study: AI-Native Demand Forecasting**

• **Challenge**: Retailers often suffer from seasonal stockouts, excess inventory write-offs, and fragmented multi-store replenishment planning.
• **Clyptus Solution**:
  • Deployed neural demand forecasting models analyzing historical POS data, promotional calendars, regional weather, and local events.
  • Integrated predictions directly into warehouse inventory management systems for dynamic reorder points.
• **Impact**: Slashed out-of-stock incidents by 27%, reduced carrying costs by 18%, and enabled automated daily replenishment.

Explore our AI solutions and verified case studies below.`,
    quickActions: [
      { label: 'Go to AI Solutions', pageTarget: 'AI' },
      { label: 'Explore Industries', pageTarget: 'Industries' },
      { label: 'Case Studies', pageTarget: 'Projects' }
    ]
  },

  // AI.14 INDUSTRY PROJECT: LOGISTICS AUTOMATION
  {
    category: 'ai-industry-logistics',
    keywords: [
      'logistics ai', 'shipping automation', 'manifest validation', 
      'route dispatch optimization', 'fleet ai', 'intelligent logistics'
    ],
    patterns: [
      /\b(logistics ai|shipping manifest|route dispatch optimization|intelligent automation with ai)\b/i,
      /\blogistics automation\b/i
    ],
    answer: `**Logistics Case Study: Intelligent Automation with AI**

• **Challenge**: Manual verification of complex ocean freight manifests, bills of lading, and dispatch routing created severe port and terminal delays.
• **Clyptus Solution**:
  • Automated manifest ingestion and multi-point customs validation using OCR and LLM reasoning.
  • Built algorithmic dispatch schedulers that balance route topology, toll costs, and real-time traffic telemetry.
• **Impact**: Eliminated manual document bottlenecks with 99.4% extraction accuracy, accelerating container turnaround times by 35%.

Click below to learn more on our AI or Industries page.`,
    quickActions: [
      { label: 'Go to AI Solutions', pageTarget: 'AI' },
      { label: 'Explore Industries', pageTarget: 'Industries' }
    ]
  },

  // AI.15 INDUSTRY PROJECT: HEALTHCARE DATA LAKE
  {
    category: 'ai-industry-healthcare',
    keywords: [
      'healthcare ai', 'healthcare data lake', 'clinical insights', 
      'patient analytics', 'hipaa data platform', 'healthcare analytics'
    ],
    patterns: [
      /\b(healthcare (ai|data lake)|clinical insights|patient analytics|hipaa data platform)\b/i,
      /\bhealthcare analytics\b/i
    ],
    answer: `**Healthcare Case Study: Data Lake & Analytics Platform**

• **Challenge**: Clinical patient records, diagnostic imaging, and hospital operational data existed in siloed legacy systems that hindered research.
• **Clyptus Solution**:
  • Architected a HIPAA-compliant, zero-trust cloud data lake unifying EHR feeds, telemetry, and administrative records.
  • Implemented predictive models forecasting ICU bed occupancy and automated clinical trial patient stratification.
• **Impact**: Unified clinical views across hospital networks while ensuring full HIPAA/HITECH compliance.

Click below to view our AI and Data Engineering hubs.`,
    quickActions: [
      { label: 'Go to AI Solutions', pageTarget: 'AI' },
      { label: 'Data Engineering', pageTarget: 'DataEngineering' }
    ]
  },

  // AI.16 INDUSTRY PROJECT: BANKING DATA WAREHOUSE
  {
    category: 'ai-industry-banking',
    keywords: [
      'banking ai', 'banking warehouse', 'fraud detection', 
      'regulatory reporting', 'bfsi data warehouse', 'banking modernization'
    ],
    patterns: [
      /\b(banking (ai|warehouse|data warehouse)|fraud detection|regulatory reporting|data warehouse modernization)\b/i,
      /\bbfsi data\b/i
    ],
    answer: `**Banking Case Study: Data Warehouse Modernization**

• **Challenge**: Legacy mainframe batch processing delayed fraud identification and caused manual reconciliation overhead for regulatory reporting.
• **Clyptus Solution**:
  • Modernized to a high-throughput Snowflake/Databricks streaming warehouse ingesting millions of daily card transactions in real-time.
  • Built ML fraud scoring engines operating under 40ms latency and automated compliance filing pipelines.
• **Impact**: Prevented millions in fraudulent transactions and reduced quarterly compliance audit prep from weeks to hours.

Explore Data Engineering and AI solutions below.`,
    quickActions: [
      { label: 'Go to AI Solutions', pageTarget: 'AI' },
      { label: 'Data Engineering', pageTarget: 'DataEngineering' }
    ]
  },

  // -------------------------------------------------------------
  // GRANULAR SERVICES PRACTICE SUB-TOPICS
  // -------------------------------------------------------------

  // SRV.1 SAP BRIM (BILLING & REVENUE INNOVATION MANAGEMENT)
  {
    category: 'service-sap-brim',
    keywords: [
      'sap brim', 'brim', 'som', 'convergent charging', 'convergent invoicing', 
      'fi-ca', 'fica', 'rar', 'subscription billing', 'convergent mediation', 'revenue recognition',
      'what is sap brim'
    ],
    patterns: [
      /\b(sap\s+)?brim\b/i,
      /\b(subscription order management|convergent charging|convergent invoicing|convergent mediation|fi-ca|fica|revenue recognition)\b/i
    ],
    answer: `**SAP BRIM (Billing & Revenue Innovation Management) — Clyptus Practice**

Clyptus is an established authority in high-volume, consumption-based subscription and monetization architectures:

• **Core BRIM Components**:
  • **SAP SOM (Subscription Order Management)**: Product catalog modeling, subscription lifecycle, and partner revenue sharing.
  • **SAP CC (Convergent Charging)**: Ultra-high-speed real-time rating and charging engine processing millions of consumption events per second.
  • **SAP CI (Convergent Invoicing)**: Aggregating diverse billable items into unified invoices with cross-currency discounting.
  • **SAP CM (Convergent Mediation)**: Ingesting raw network and usage data from edge devices with CDR deduplication.
  • **SAP FI-CA & RAR (IFRS 15)**: Contract accounts receivable and automated revenue recognition compliance.

Click below to navigate directly to our ERP & SAP services page.`,
    quickActions: [
      { label: 'Go to ERP & SAP Services', pageTarget: 'SAP' },
      { label: 'Browse All Services', pageTarget: 'Services' },
      { label: 'Talk to an ERP Specialist', pageTarget: 'Contact' }
    ]
  },

  // SRV.2 SAP CLEAN CORE ARCHITECTURE
  {
    category: 'service-sap-clean-core',
    keywords: [
      'clean core', 'clean-core', 'decoupled architecture', 
      'sap btp extensions', 'zero downtime upgrades', 'clean core strategy',
      'what is clean core'
    ],
    patterns: [
      /\bclean(-|\s+)core\b/i,
      /\bdecoupled (erp|sap) architecture\b/i
    ],
    answer: `**SAP Clean Core Strategy & Decoupled Architecture**

The Clean Core methodology is essential for enterprises migrating to SAP S/4HANA Cloud without inheriting technical debt:

• **Clyptus Clean Core Principles**:
  • **Zero Modifications to Standard Core**: Keeping the S/4HANA core pristine to enable seamless, automated SAP release upgrades.
  • **Side-by-Side Extensions on SAP BTP**: Building bespoke enterprise logic, portals, and AI workflows decoupled on SAP Business Technology Platform.
  • **Standard Public APIs**: Interfacing via standard OData, REST, and RFC APIs rather than direct table writes.
  • **Future-Proof TCO**: Slashes maintenance costs and ensures long-term system agility.

Click below to explore our SAP practice.`,
    quickActions: [
      { label: 'Go to ERP & SAP Services', pageTarget: 'SAP' },
      { label: 'Case Studies', pageTarget: 'Projects' }
    ]
  },

  // SRV.3 SAP BTP (BUSINESS TECHNOLOGY PLATFORM)
  {
    category: 'service-sap-btp',
    keywords: [
      'sap btp', 'btp', 'business technology platform', 'sap cpi', 
      'fiori', 'abap cloud', 'sap integration suite', 'what is sap btp'
    ],
    patterns: [
      /\b(sap\s+)?btp\b/i,
      /\bbusiness technology platform\b/i,
      /\b(sap cpi|sap integration suite|sap fiori)\b/i
    ],
    answer: `**SAP BTP (Business Technology Platform) Solutions**

Clyptus leverages SAP BTP as the digital fabric connecting SAP systems with multi-cloud workloads:

• **Our BTP Specializations**:
  • **Integration Suite (CPI)**: Seamless hybrid integrations connecting S/4HANA with Salesforce, Workday, and banking gateways.
  • **SAP Build & Fiori UX**: Modern responsive mobile and desktop user interfaces replacing legacy SAP GUI screens.
  • **ABAP Cloud**: Cloud-ready ABAP development conforming strictly to clean-core guidelines.
  • **AI Foundation on BTP**: Deploying machine learning models directly accessible within business transactions.

Click below to visit the ERP & SAP Services page.`,
    quickActions: [
      { label: 'Go to ERP & SAP Services', pageTarget: 'SAP' },
      { label: 'Browse All Services', pageTarget: 'Services' }
    ]
  },

  // SRV.4 24/7 MANAGED SOC (SECURITY OPERATIONS CENTER)
  {
    category: 'service-security-soc',
    keywords: [
      'managed soc', 'soc', 'siem', 'soar', '24/7 soc', 
      'security operations center', 'incident response', 'soc as a service',
      'what is managed soc'
    ],
    patterns: [
      /\b(managed\s+soc|24\/7\s+soc|security operations center|siem|soar)\b/i,
      /\bsoc as a service\b/i
    ],
    answer: `**24/7 Managed SOC & Threat Intelligence**

Clyptus operates an enterprise Security Operations Center providing around-the-clock defense:

• **Key Capabilities**:
  • **Continuous Telemetry Monitoring**: Ingesting logs from endpoints, cloud infrastructure (AWS/Azure), and firewalls.
  • **Next-Gen SIEM & SOAR**: AI-powered behavioral correlation and automated containment playbooks.
  • **SLA-Backed Response**: 15-minute mean time to acknowledge (MTTA) and rapid quarantine of compromised hosts.
  • **Threat Hunting**: Proactive reconnaissance tracking global threat feeds and zero-day vulnerabilities.

Click below to navigate to the Cybersecurity page.`,
    quickActions: [
      { label: 'Go to Cybersecurity', pageTarget: 'Security' },
      { label: 'Cloud Services', pageTarget: 'Cloud' }
    ]
  },

  // SRV.5 ZERO-TRUST ARCHITECTURE
  {
    category: 'service-security-zerotrust',
    keywords: [
      'zero trust', 'zero-trust', 'microsegmentation', 'iam', 
      'identity access management', 'least privilege', 'zero trust architecture',
      'what is zero trust'
    ],
    patterns: [
      /\bzero(-|\s+)trust\b/i,
      /\bmicro(-|\s+)?segmentation\b/i,
      /\bleast privilege\b/i
    ],
    answer: `**Zero-Trust Enterprise Architecture**

Clyptus implements strict *"Never Trust, Always Verify"* security frameworks across hybrid enterprise environments:

• **Pillars of Our Zero-Trust Practice**:
  • **Identity-Centric Access (IAM)**: Conditional access policies, Multi-Factor Authentication (MFA), and single sign-on (SSO).
  • **Software-Defined Microsegmentation**: Isolating database, application, and web tiers to prevent lateral attacker movement.
  • **Continuous Posture Assessment**: Verifying device health and compliance before granting application session tokens.
  • **Encrypted Transit & Storage**: End-to-end mTLS encryption for inter-service communication and AES-256 for data at rest.

Click below to view our Cybersecurity page.`,
    quickActions: [
      { label: 'Go to Cybersecurity', pageTarget: 'Security' },
      { label: 'Cloud Services', pageTarget: 'Cloud' }
    ]
  },

  // SRV.6 REGULATORY COMPLIANCE (ISO 27001, SOC 2, HIPAA, GDPR)
  {
    category: 'service-security-compliance',
    keywords: [
      'iso 27001', 'soc 2', 'hipaa', 'gdpr', 'pci dss', 'nist', 
      'compliance audit', 'security compliance', 'soc 2 type ii', 'compliance frameworks'
    ],
    patterns: [
      /\b(iso\s?27001|soc\s?2(\s+type\s+ii)?|hipaa|gdpr|pci\s?dss|nist(\s+csf)?)\b/i,
      /\bsecurity compliance\b/i
    ],
    answer: `**Enterprise Regulatory Compliance & Audit Readiness**

We guide global enterprises through audit preparation, control implementation, and continuous compliance verification:

• **Supported Frameworks**:
  • **ISO/IEC 27001:2022**: Information security management system (ISMS) controls.
  • **SOC 2 Type II**: Trust Services Criteria (Security, Availability, Confidentiality).
  • **HIPAA & HITECH**: Protected Health Information (PHI) encryption and access governance.
  • **GDPR & Regional Privacy**: Data residency, subject access request automation, and consent workflows.
  • **PCI DSS v4.0**: Cardholder data environment (CDE) tokenization and network segmentation.

Click below to open our Cybersecurity page.`,
    quickActions: [
      { label: 'Go to Cybersecurity', pageTarget: 'Security' },
      { label: 'HR Policies Portal', pageTarget: 'HR Policies' }
    ]
  },

  // SRV.7 MODERN DATA LAKEHOUSES (SNOWFLAKE, DATABRICKS, BIGQUERY)
  {
    category: 'service-data-lakehouse',
    keywords: [
      'lakehouse', 'snowflake', 'databricks', 'bigquery', 
      'modern data platform', 'data lake', 'medallion architecture', 'what is snowflake', 'what is databricks'
    ],
    patterns: [
      /\b(lakehouses?|snowflake|databricks|bigquery)\b/i,
      /\bmodern data platforms?\b/i
    ],
    answer: `**Modern Data Lakehouse Architectures (Snowflake & Databricks)**

Clyptus replaces brittle legacy warehouses with unified, high-concurrency cloud data lakehouses:

• **Our Architecture Framework**:
  • **Medallion Data Architecture**: Structuring data into Bronze (raw ingestion), Silver (cleansed/joined), and Gold (business aggregates).
  • **Snowflake & Databricks Deployments**: Auto-scaling compute clusters separating storage from processing for maximum cost efficiency.
  • **Enterprise Data Governance**: Centralized metadata tagging, lineage tracking, and granular row/column access policies.
  • **Direct BI & AI Readiness**: Feeding clean tables directly into Power BI, Tableau, and custom AI models.

Click below to explore our Data Engineering page.`,
    quickActions: [
      { label: 'Go to Data Engineering', pageTarget: 'DataEngineering' },
      { label: 'Go to AI Solutions', pageTarget: 'AI' }
    ]
  },

  // SRV.8 REAL-TIME STREAMING & ETL PIPELINES (KAFKA, SPARK, DBT)
  {
    category: 'service-data-streaming',
    keywords: [
      'kafka', 'apache kafka', 'apache spark', 'spark streaming', 
      'real-time streaming', 'dbt', 'etl', 'elt', 'streaming pipelines', 'what is kafka'
    ],
    patterns: [
      /\b(kafka|apache kafka|spark streaming|apache spark|dbt)\b/i,
      /\breal(-|\s+)time streaming( pipelines)?\b/i
    ],
    answer: `**Real-Time Streaming Pipelines (Kafka, Spark & dbt)**

We engineer distributed event-driven pipelines capable of handling millions of transactions per second:

• **Technologies We Deploy**:
  • **Apache Kafka**: High-throughput distributed message bus connecting edge IoT, webhooks, and transactional databases.
  • **Apache Spark**: Distributed memory computing for high-speed streaming joins and transformations.
  • **dbt (data build tool)**: Version-controlled, modular SQL transformations with automated testing and documentation.
  • **Sub-Second Latency**: Pushing operational telemetry into executive dashboards and fraud models in near real-time.

Click below to visit the Data Engineering page.`,
    quickActions: [
      { label: 'Go to Data Engineering', pageTarget: 'DataEngineering' },
      { label: 'Browse All Services', pageTarget: 'Services' }
    ]
  },

  // SRV.9 IT RECRUITING & ENGAGEMENT MODELS
  {
    category: 'service-recruiting-models',
    keywords: [
      'contract staffing', 'contract to hire', 'permanent staffing', 
      'offshore coe', 'staff augmentation', 'hire developers', 'recruiting models',
      'what is contract staffing'
    ],
    patterns: [
      /\b(contract staffing|contract(-|\s+)to(-|\s+)hire|permanent (staffing|placement)|offshore coe|staff augmentation)\b/i,
      /\bhire (developers|engineers|consultants)\b/i
    ],
    answer: `**IT Staffing & Global Talent Delivery Models**

Clyptus provides flexible talent solutions to rapidly staff critical enterprise technology programs:

• **Engagement Models**:
  • **Contract Staffing**: Rapid on-demand scaling of niche specialists (SAP S/4HANA, Cloud, GenAI) for specific project phases.
  • **Contract-to-Hire**: Evaluate engineering performance and cultural fit on-site before extending permanent offers.
  • **Permanent Placement**: Executive search and senior talent acquisition for long-term technology leadership.
  • **Dedicated Offshore CoE Units**: Cost-optimized dedicated engineering pods working exclusively on your product roadmaps.
• **Vetting Standards**: 330+ enterprise-tested consultants rigorously screened by practicing principal architects.

Click below to visit our Talent Acquisition hub.`,
    quickActions: [
      { label: 'Go to Talent Acquisition', pageTarget: 'Recruiting' },
      { label: 'Explore Careers', pageTarget: 'Careers' }
    ]
  },

  // SRV.10 SALESFORCE AGENTFORCE & CRM
  {
    category: 'service-salesforce-agentforce',
    keywords: [
      'agentforce', 'salesforce agentforce', 'salesforce agents', 
      'autonomous salesforce', 'lwc', 'lightning web components', 'mulesoft',
      'what is agentforce'
    ],
    patterns: [
      /\b(agentforce|salesforce agentforce|salesforce agents?)\b/i,
      /\b(lightning web components|lwc|mulesoft)\b/i
    ],
    answer: `**Salesforce Solutions & Agentforce AI**

Clyptus helps enterprises unlock autonomous customer engagement and pipeline acceleration within Salesforce:

• **Key Capabilities**:
  • **Salesforce Agentforce Deployments**: Autonomous agents resolving customer service inquiries, drafting sales responses, and updating CRM records.
  • **Sales & Service Cloud Modernization**: Streamlining lead-to-opportunity conversions and omni-channel contact center routing.
  • **Custom Lightning Web Components (LWC)**: Bespoke, responsive interfaces built to exact operational workflows.
  • **MuleSoft Enterprise Integrations**: Bi-directional data synchronization connecting Salesforce with SAP ERP and core databases.

Click below to jump to our Salesforce page.`,
    quickActions: [
      { label: 'Go to Salesforce Solutions', pageTarget: 'Salesforce' },
      { label: 'Go to AI Solutions', pageTarget: 'AI' }
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

• **Corporate Hubs & Delivery Centers**:
  India: Hyderabad (Global HQ), Bengaluru (AI Lab), Chennai (Enterprise Systems), Vijayawada & Indore
  Dubai: 101 Sheikh Zayed Rd, DIFC
  California: 45627 Basswood Ct, Temecula, CA

Fill out our interactive form on the Contact page for a response within 24 hours.`,
    quickActions: [
      { label: 'Open Contact Form', pageTarget: 'Contact' },
      { label: 'View All Emails', chatQuery: 'What are your official emails?' },
      { label: 'Company Journey', chatQuery: 'Tell me about the company journey' },
      { label: 'Browse Services', pageTarget: 'Services' }
    ]
  },
  // 19. INSIGHTS & TECHNICAL BLOGS
  {
    category: 'insights',
    keywords: [
      'insights', 'insight', 'blogs', 'blog', 'articles', 'article', 'whitepapers', 
      'technical blog', 'research', 'reads', 'roadmap', 'ecc migration roadmap', 
      'where is insights', 'where is blogs', 'insights page', 'blogs page'
    ],
    patterns: [
      /\b(insights?|blogs?|articles?|whitepapers?)\b/i,
      /\bwhere (is|are) (the )?(insights?|blogs?|articles?)\b/i,
      /\b(open|view|show|see|find|navigate to) (the )?(insights?|blogs?)\b/i
    ],
    answer: `**Clyptus Insights & Technical Thought Leadership**

Our Insights hub features deep-dive architectural analyses, migration roadmaps, and enterprise engineering whitepapers:

• **Featured Technical Publications**:
  1. *Migrating ECC 6.0 to SAP S/4HANA Cloud: A 2026 Strategic Roadmap* — Essential brownfield vs. greenfield conversion frameworks with zero business downtime.
  2. *Building Agentic Workflows for Automated SAP Financials* — Deploying multi-agent LLM systems that slash invoice reconciliation cycle times by 80%.
  3. *Cloud-Native Zero-Trust Architecture* — Microsegmentation and least-privilege governance across AWS and Azure workloads.

Click the navigation button below to explore all published insights directly on the website.`,
    quickActions: [
      { label: 'Go to Insights Page', pageTarget: 'Blogs' },
      { label: 'ERP & SAP Services', pageTarget: 'SAP' },
      { label: 'AI Solutions', pageTarget: 'AI' },
      { label: 'All Services', pageTarget: 'Services' }
    ]
  },

  // 20. HR POLICIES & EMPLOYEE COMPLIANCE PORTAL
  {
    category: 'hr-policies',
    keywords: [
      'hr policies', 'hr policy', 'policies', 'policy', 'employee handbook', 
      'posh', 'leave policy', 'maternity policy', 'disciplinary policy', 
      'code of conduct', 'benefits policy', 'compliance portal', 'hr portal',
      'where is hr policies', 'where is policies', 'where are policies'
    ],
    patterns: [
      /\b(hr\s?policies|employee policies|compliance portal|employee handbook)\b/i,
      /\b(posh|leave policy|maternity policy|disciplinary policy|code of conduct|benefits policy)\b/i,
      /\bwhere (is|are) (the )?(hr\s?policies?|policies?)\b/i
    ],
    answer: `**Clyptus HR Policies & Employee Compliance Portal**

Our official corporate repository contains all workplace guidelines, employee entitlements, and compliance frameworks:

• **Available Policy Documents (Protected PDF Downloads)**:
  1. *Code of Conduct & Professional Ethics*
  2. *Employee Benefits & Healthcare Coverage*
  3. *Leave, Maternity & Paternity Policy*
  4. *Disciplinary Policy & Dispute Resolution*
  5. *Grievance Redressal Procedure*
  6. *Clyptus Employee Handbook*
  7. *POSH (Prevention of Sexual Harassment) Policy*
  8. *Enterprise Data Privacy & Confidentiality Policy*
  9. *Rejoin & Alumni Rehire Policy*

• **Secure Corporate Access**:
  The portal is protected for verified employees and authorized compliance auditors with encrypted credential login.`,
    quickActions: [
      { label: 'Go to HR Policies Portal', pageTarget: 'HR Policies' },
      { label: 'Explore Careers', pageTarget: 'Careers' },
      { label: 'Email HR Team', chatQuery: 'What are your official emails?' }
    ]
  },

  // 21. FULL WEBSITE OVERVIEW & SITE DIRECTORY
  {
    category: 'website-overview',
    keywords: [
      'full website details', 'everything about the website', 'website details', 
      'tell me about the website', 'website map', 'site map', 'website guide', 
      'all pages', 'where is everything', 'what is on this website', 'pages on website'
    ],
    patterns: [
      /\b(full website details|everything about the website|tell me about the website)\b/i,
      /\b(what is on this website|website (details|map|guide|overview)|all pages)\b/i,
      /\b(where is everything|website directory)\b/i
    ],
    answer: `**Clyptus Software Solutions — Complete Website Directory**

Welcome to Clyptus! Here is the complete overview of all sections, pages, and services available on our website:

1. **Company & Leadership**
   • **Home**: 3D interactive hero, core practice cards, and live enterprise metrics.
   • **About Us**: Founded in 2014, decade-long milestones, leadership by **Vamsi Krishna**, and global vision.

2. **8 Core Enterprise Services**
   • **ERP & SAP (SAP Silver Partner)**: S/4HANA migrations, SAP BRIM billing, and SAP BTP clean core.
   • **Artificial Intelligence**: Bespoke GenAI, LLM fine-tuning, RAG, and autonomous Agentic AI swarms.
   • **Cloud & DevOps**: Multi-cloud consulting, IaaS/PaaS, Kubernetes, and zero-downtime migrations.
   • **Cybersecurity**: 24/7 Managed SOC, Zero Trust, ISO 27001, and SOC 2 Type II audit readiness.
   • **CRM Solutions**: SAP Customer Experience (SAP CX), Microsoft Dynamics 365, and omnichannel CPQ.
   • **Salesforce**: Sales Cloud, Service Cloud, Lightning Web Components, and Salesforce Agentforce.
   • **Data Engineering**: Modern Lakehouses on Snowflake, Databricks, BigQuery, and real-time Kafka streaming.
   • **IT Recruiting**: Specialized tech staffing, contract-to-hire, and 330+ vetted engineers.

3. **Resources & Insights**
   • **Insights & Blogs**: In-depth technical articles, 2026 SAP migration roadmaps, and AI architecture guides.
   • **HR Policies**: Secure corporate portal for verified employee handbooks and compliance policies.
   • **Careers**: Active job vacancies, company culture, employee benefits, and resume submission.

4. **Global Contact & Offices**
   • **Contact Us**: Interactive 3D globe and offices in **Hyderabad (HQ)**, **Dubai (DIFC)**, and **California (USA)**.

Use any of the buttons below to jump directly to that page!`,
    quickActions: [
      { label: 'Browse All Services', pageTarget: 'Services' },
      { label: 'Go to Insights Page', pageTarget: 'Blogs' },
      { label: 'Go to ERP & SAP Services', pageTarget: 'SAP' },
      { label: 'Go to About Us', pageTarget: 'About' },
      { label: 'Go to Contact Page', pageTarget: 'Contact' }
    ]
  }
];

// Stopwords that shouldn't inflate keyword matches or mislead category selection
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'by',
  'can', 'clyptus', 'could', 'did', 'do', 'does', 'doing', 'down', 'during',
  'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself',
  'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself',
  'just', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only',
  'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'so', 'some', 'such',
  'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those',
  'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where', 'which',
  'while', 'who', 'whom', 'why', 'will', 'with', 'you', 'your', 'yours', 'yourself', 'yourselves', 'please', 'tell', 'show'
]);

export const ClyptusAiChatbot: React.FC<ClyptusAiChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isTyping]);

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

  // Dedicated Direct Navigation Matrix for all Pages on Clyptus Website
  const PAGE_NAV_DIRECTORY: {
    id: string;
    pageTarget: string;
    name: string;
    buttonLabel: string;
    patterns: RegExp[];
    answer: string;
    secondaryActions: QuickAction[];
  }[] = [
    {
      id: 'insights',
      pageTarget: 'Blogs',
      name: 'Insights & Technical Blogs',
      buttonLabel: 'Go to Insights Page',
      patterns: [
        /\bwhere (is|are) (the )?(insights?|blogs?|articles?|whitepapers?)\b/i,
        /\b(take me to|navigate to|open|show|show me|view|go to|display) (the )?(insights?|blogs?|articles?)\b/i,
        /\b(where can i (find|read|see) (the )?(insights?|blogs?|articles?))\b/i,
        /\b(insights?|blogs?)(\s+page|\s+section)?$/i
      ],
      answer: `**Clyptus Insights & Technical Thought Leadership**\n\nOur Insights hub features deep-dive architectural analyses, migration roadmaps, and enterprise engineering whitepapers:\n\n• **Featured Publications**:\n  1. *Migrating ECC 6.0 to SAP S/4HANA Cloud: A 2026 Strategic Roadmap*\n  2. *Building Agentic Workflows for Automated SAP Financials*\n  3. *Cloud-Native Zero-Trust Architecture across AWS & Azure*\n\nClick the button below to navigate directly to the Insights page.`,
      secondaryActions: [
        { label: 'ERP & SAP Services', pageTarget: 'SAP' },
        { label: 'AI Solutions', pageTarget: 'AI' }
      ]
    },
    {
      id: 'erp',
      pageTarget: 'SAP',
      name: 'ERP & SAP Services',
      buttonLabel: 'Go to ERP & SAP Services',
      patterns: [
        /\bwhere (is|are) (the )?(erp|sap|s4hana|s\/4hana|hana|brim|btp)(\s+services?|\s+page)?\b/i,
        /\b(take me to|navigate to|open|show|show me|view|go to|display) (the )?(erp|sap|s4hana)(\s+services?|\s+page)?\b/i,
        /\b(request\s+)?erp\s+review\b/i,
        /\b(review\s+)?erp(\s+services?|\s+review)?\b/i,
        /\b(where can i (find|see) (the )?(erp|sap))\b/i,
        /\b(erp|sap)(\s+services?|\s+page)?$/i
      ],
      answer: `**Clyptus ERP & SAP Practice (SAP Silver Partner)**\n\nWe provide complete enterprise ERP strategy, implementations, migrations, and ongoing management:\n\n• **Core Offerings**:\n  • **SAP S/4HANA**: Greenfield implementations, brownfield system conversions, and RISE with SAP.\n  • **SAP BRIM**: Subscription Order Management (SOM), Convergent Charging (CC), and FI-CA / RAR.\n  • **SAP BTP**: Cloud-native extensions, CPI integrations, and clean-core architecture.\n  • **24/7 Global AMS**: Post go-live stabilization, hypercare, and proactive SLA-backed support.\n\nClick the button below to jump straight to our ERP & SAP services page.`,
      secondaryActions: [
        { label: 'Browse All Services', pageTarget: 'Services' },
        { label: 'Client Case Studies', pageTarget: 'Projects' }
      ]
    },
    {
      id: 'cloud',
      pageTarget: 'Cloud',
      name: 'Cloud & DevOps Services',
      buttonLabel: 'Go to Cloud Services',
      patterns: [
        /\bwhere (is|are) (the )?(cloud|aws|azure|gcp|devops|multi-cloud)(\s+services?|\s+page)?\b/i,
        /\b(take me to|navigate to|open|show|show me|view|go to|display) (the )?(cloud|aws|azure|devops)(\s+services?|\s+page)?\b/i,
        /\b(where can i (find|see) (the )?cloud)\b/i,
        /\b(cloud|multi-cloud)(\s+services?|\s+page)?$/i
      ],
      answer: `**Multi-Cloud & DevOps Engineering**\n\nWe architect resilient, cost-optimized, and elastic cloud foundations across major providers:\n\n• **Cloud Platforms**: AWS, Microsoft Azure, and Google Cloud Platform (GCP).\n• **Capabilities**: Microservices, containerization (Docker, Kubernetes EKS/AKS/GKE), and serverless architectures.\n• **Zero-Downtime Migration**: End-to-end database and application modernization with rollback guarantees.\n\nClick below to navigate directly to the Cloud Services page.`,
      secondaryActions: [
        { label: 'Cybersecurity', pageTarget: 'Security' },
        { label: 'Browse All Services', pageTarget: 'Services' }
      ]
    },
    {
      id: 'ai',
      pageTarget: 'AI',
      name: 'Artificial Intelligence & GenAI',
      buttonLabel: 'Go to AI Solutions',
      patterns: [
        /\bwhere (is|are) (the )?(ai|genai|generative ai|agentforce|agents?)(\s+solutions?|\s+services?|\s+page)?\b/i,
        /\b(take me to|navigate to|open|show|show me|view|go to|display) (the )?(ai|genai|generative ai)(\s+solutions?|\s+services?|\s+page)?\b/i,
        /\b(where can i (find|see) (the )?(ai|genai))\b/i,
        /\b(ai|genai|generative ai)(\s+solutions?|\s+services?|\s+page)?$/i
      ],
      answer: `**Artificial Intelligence & GenAI Engineering**\n\nClyptus builds enterprise-grade AI applications and autonomous workflow engines:\n\n• **Custom GenAI & Fine-Tuning**: Bespoke enterprise LLMs, secure RAG architectures, and internal copilots.\n• **Autonomous AI Agent Swarms**: Multi-agent systems that autonomously execute multi-step workflows across ERP, CRM, and databases.\n• **MLOps & Governance**: Zero-data-leakage guardrails, drift monitoring, and continuous retraining.\n\nClick below to open our dedicated AI Solutions page.`,
      secondaryActions: [
        { label: 'ERP & SAP Services', pageTarget: 'SAP' },
        { label: 'Data Engineering', pageTarget: 'DataEngineering' }
      ]
    },
    {
      id: 'security',
      pageTarget: 'Security',
      name: 'Cybersecurity & Compliance',
      buttonLabel: 'Go to Cybersecurity',
      patterns: [
        /\bwhere (is|are) (the )?(security|cybersecurity|cyber|zero trust|soc)(\s+services?|\s+page)?\b/i,
        /\b(take me to|navigate to|open|show|show me|view|go to|display) (the )?(security|cybersecurity|cyber)(\s+services?|\s+page)?\b/i,
        /\b(where can i (find|see) (the )?(security|cybersecurity))\b/i,
        /\b(security|cybersecurity)(\s+services?|\s+page)?$/i
      ],
      answer: `**Cybersecurity & Regulatory Compliance**\n\nOur defense-in-depth security practice safeguards enterprise infrastructure and data:\n\n• **24/7 Managed SOC**: Real-time SIEM/SOAR incident detection, automated containment, and threat intelligence.\n• **Compliance Readiness**: ISO/IEC 27001, SOC 2 Type II, HIPAA, GDPR, PCI DSS, and NIST CSF.\n• **Zero-Trust & Pentesting**: Identity & Access Management (IAM), micro-segmentation, and offensive pen testing.\n\nClick below to navigate to the Cybersecurity page.`,
      secondaryActions: [
        { label: 'Cloud Services', pageTarget: 'Cloud' },
        { label: 'Contact Us', pageTarget: 'Contact' }
      ]
    },
    {
      id: 'crm',
      pageTarget: 'CRM',
      name: 'CRM & Customer Experience',
      buttonLabel: 'Go to CRM Services',
      patterns: [
        /\bwhere (is|are) (the )?(crm|dynamics 365|sap cx|customer experience)(\s+services?|\s+page)?\b/i,
        /\b(take me to|navigate to|open|show|show me|view|go to|display) (the )?(crm|dynamics 365)(\s+services?|\s+page)?\b/i,
        /\b(where can i (find|see) (the )?crm)\b/i,
        /\bcrm(\s+services?|\s+page)?$/i
      ],
      answer: `**CRM & Customer Experience Engineering**\n\nClyptus unifies front-office engagement with back-office execution:\n\n• **SAP CX**: Sales Cloud, Service Cloud, Commerce Cloud, Customer Data Platform (CDP), and Emarsys.\n• **Microsoft Dynamics 365**: Connected sales, customer service, and automated field services.\n• **Omnichannel CPQ**: High-speed product configuration and automated subscription pricing.\n\nClick below to open our CRM Services page.`,
      secondaryActions: [
        { label: 'Salesforce Solutions', pageTarget: 'Salesforce' },
        { label: 'Browse All Services', pageTarget: 'Services' }
      ]
    },
    {
      id: 'salesforce',
      pageTarget: 'Salesforce',
      name: 'Salesforce & Agentforce',
      buttonLabel: 'Go to Salesforce Solutions',
      patterns: [
        /\bwhere (is|are) (the )?(salesforce|agentforce|sfdc)(\s+services?|\s+page)?\b/i,
        /\b(take me to|navigate to|open|show|show me|view|go to|display) (the )?(salesforce|agentforce)(\s+services?|\s+page)?\b/i,
        /\b(where can i (find|see) (the )?salesforce)\b/i,
        /\b(salesforce|agentforce)(\s+services?|\s+page)?$/i
      ],
      answer: `**Salesforce Solutions & Agentforce AI**\n\nAccelerate revenue pipelines with customized Salesforce ecosystems and autonomous AI agents:\n\n• **Salesforce Agentforce**: Autonomous AI agents handling customer inquiries, qualifying leads, and taking actions.\n• **Core Cloud Deployments**: Sales Cloud, Service Cloud, Experience Cloud, and Marketing Cloud.\n• **Custom Apex & LWC**: Bespoke Lightning Web Components and MuleSoft enterprise integrations.\n\nClick below to jump to the Salesforce page.`,
      secondaryActions: [
        { label: 'CRM Services', pageTarget: 'CRM' },
        { label: 'Browse All Services', pageTarget: 'Services' }
      ]
    },
    {
      id: 'data',
      pageTarget: 'DataEngineering',
      name: 'Data Engineering & Lakehouses',
      buttonLabel: 'Go to Data Engineering',
      patterns: [
        /\bwhere (is|are) (the )?(data engineering|lakehouses?|snowflake|databricks|bigquery)(\s+page)?\b/i,
        /\b(take me to|navigate to|open|show|show me|view|go to|display) (the )?(data engineering|lakehouse)(\s+page)?\b/i,
        /\b(where can i (find|see) (the )?data engineering)\b/i,
        /\bdata engineering(\s+page)?$/i
      ],
      answer: `**Data Engineering & Modern Lakehouse Architectures**\n\nWe transform enterprise data silos into clean, real-time analytics engines:\n\n• **Modern Data Lakehouses**: Snowflake, Databricks, and Google Cloud BigQuery implementations.\n• **Real-Time Streaming**: Apache Kafka, Spark, and automated dbt transformations.\n• **Enterprise BI**: High-performance executive dashboards in Power BI, Tableau, and Looker.\n\nClick below to open our Data Engineering page.`,
      secondaryActions: [
        { label: 'AI Solutions', pageTarget: 'AI' },
        { label: 'Cloud Services', pageTarget: 'Cloud' }
      ]
    },
    {
      id: 'recruiting',
      pageTarget: 'Recruiting',
      name: 'IT Staffing & Global Talent',
      buttonLabel: 'Go to Talent Acquisition',
      patterns: [
        /\bwhere (is|are) (the )?(recruiting|recruitment|talent acquisition|staffing|hire talent)(\s+page)?\b/i,
        /\b(take me to|navigate to|open|show|show me|view|go to|display) (the )?(recruiting|talent acquisition|staffing)(\s+page)?\b/i,
        /\b(where can i (find|see) (the )?(recruiting|staffing|talent))\b/i,
        /\b(recruiting|talent acquisition|staffing)(\s+page)?$/i
      ],
      answer: `**IT Recruiting & Specialized Talent Delivery**\n\nRapid deployment of rigorously vetted enterprise technology talent:\n\n• **Flexible Models**: Contract staffing, contract-to-hire, permanent placement, and offshore squads.\n• **Specializations**: Certified SAP consultants, Cloud Architects, AI Engineers, and Cybersecurity specialists.\n• **Technical Vetting**: Every candidate is screened by practicing solution architects before submission.\n\nClick below to open our Talent Acquisition page.`,
      secondaryActions: [
        { label: 'Explore Careers', pageTarget: 'Careers' },
        { label: 'Contact Us', pageTarget: 'Contact' }
      ]
    },
    {
      id: 'projects',
      pageTarget: 'Projects',
      name: 'Case Studies & Client Projects',
      buttonLabel: 'Go to Case Studies',
      patterns: [
        /\bwhere (is|are) (the )?(case studies|projects|client work|success stories|portfolio)(\s+page)?\b/i,
        /\b(take me to|navigate to|open|show|show me|view|go to|display) (the )?(case studies|projects|client work)(\s+page)?\b/i,
        /\b(where can i (find|see) (the )?(case studies|projects))\b/i,
        /\b(case studies|projects)(\s+page)?$/i
      ],
      answer: `**Client Case Studies & Enterprise Projects Ledger**\n\nExplore real-world transformation milestones and verified enterprise results:\n\n• **SAP S/4HANA & BRIM Migrations**: Clean-core rollouts for telecom and retail giants in UAE and North America.\n• **Agentic AI & Document Intelligence**: Automated financial audit and invoice reconciliation copilots.\n• **Multi-Cloud Modernization**: Zero-downtime AWS and Azure migrations for healthcare organizations.\n\nClick below to view our Case Studies page.`,
      secondaryActions: [
        { label: 'Explore Industries', pageTarget: 'Industries' },
        { label: 'Browse All Services', pageTarget: 'Services' }
      ]
    },
    {
      id: 'industries',
      pageTarget: 'Industries',
      name: 'Industries Transformed',
      buttonLabel: 'Explore Industries',
      patterns: [
        /\bwhere (is|are) (the )?(industr(ies|y)|sectors?|banking|healthcare|retail|manufacturing|ports)(\s+page)?\b/i,
        /\b(take me to|navigate to|open|show|show me|view|go to|display) (the )?(industries|sectors)(\s+page)?\b/i,
        /\b(where can i (find|see) (the )?industries)\b/i,
        /\bindustr(ies|y)(\s+page)?$/i
      ],
      answer: `**Industries We Transform**\n\nClyptus delivers domain-tailored software and architectures across major global industries:\n\n• **Manufacturing & Industry 4.0**: Smart shop-floor integration, IoT telemetry, and digital twins.\n• **BFSI (Banking & Insurance)**: Secure transaction engines, fraud mitigation, and compliance.\n• **Healthcare & Life Sciences**: HIPAA-compliant patient platforms and medical imaging AI.\n• **Ports & Logistics**: Terminal operating systems and global supply chain automation.\n\nClick below to explore our Industries page.`,
      secondaryActions: [
        { label: 'Case Studies', pageTarget: 'Projects' },
        { label: 'Browse All Services', pageTarget: 'Services' }
      ]
    },
    {
      id: 'about',
      pageTarget: 'About',
      name: 'About Us & Company Journey',
      buttonLabel: 'Go to About Us',
      patterns: [
        /\bwhere (is|are) (the )?(about us|company journey|our story|history|leadership|founder|vamsi krishna|management|team)(\s+page)?\b/i,
        /\b(take me to|navigate to|open|show|show me|view|go to|display) (the )?(about us|about page|company story|team|leadership|management)(\s+page)?\b/i,
        /\b(where can i (find|see) (the )?(about us|company journey|leadership|management))\b/i,
        /\b(about us|about)(\s+page)?$/i
      ],
      answer: `**About Clyptus Software Solutions**\n\nDiscover over a decade of enterprise digital transformation and leadership:\n\n• **Foundation**: Founded in 2014; certified **SAP Silver Partner** with 250+ consultants globally.\n• **Leadership & Management**: Guided by Founder & CEO **Vamsi Krishna Are**, Operations Manager **Satya Narayana K**, and Project Manager **Nandhini P**.\n• **Mission**: *"Turning Ideas Into Impact"* | **Vision**: *"Shaping Tomorrow Through Innovation"*.\n• **Global Footprint**: Delivery hubs across Hyderabad (India), Dubai (UAE DIFC), and California (USA).\n\nClick below to navigate to the About Us page.`,
      secondaryActions: [
        { label: 'Explore Careers', pageTarget: 'Careers' },
        { label: 'Contact Us', pageTarget: 'Contact' }
      ]
    },
    {
      id: 'careers',
      pageTarget: 'Careers',
      name: 'Careers & Job Openings',
      buttonLabel: 'Go to Careers Page',
      patterns: [
        /\bwhere (is|are) (the )?(careers?|carrers?|carreers?|career|carrer|jobs?|openings?|hiring|vacanc(y|ies))(\s+page)?\b/i,
        /\b(take me to|navigate to|open|show|show me|view|go to|display) (the )?(careers?|carrers?|carreers?|career|carrer|jobs?|openings?|hiring)(\s+page)?\b/i,
        /\b(where can i (find|see) (the )?(careers?|carrers?|carreers?|jobs?))\b/i,
        /\b(careers?|carrers?|carreers?|career|carrer|jobs?)(\s+page)?$/i,
        /\b(show\s+)?(carrers?|carreers?)(\s+page)?\b/i
      ],
      answer: `**Careers at Clyptus Software Solutions**\n\nJoin our rapidly expanding global engineering and enterprise consulting teams:\n\n• **Active Roles**: SAP S/4HANA Consultants, Cloud Solutions Architects, GenAI Engineers, SAP BRIM Specialists, Power BI Developers.\n• **Workplace Perks**: Hybrid work model, global mobility, competitive compensation, and sponsored certifications.\n• **Direct Application**: Send resumes directly to hr.india@clyptus.com, hr.uae@clyptus.com, or hr.usa@clyptus.com.\n\nClick below to view the Careers page.`,
      secondaryActions: [
        { label: 'HR Policies Portal', pageTarget: 'HR Policies' },
        { label: 'Email HR Team', chatQuery: 'What are your official emails?' }
      ]
    },
    {
      id: 'hr-policies',
      pageTarget: 'HR Policies',
      name: 'HR Policies Portal',
      buttonLabel: 'Go to HR Policies Portal',
      patterns: [
        /\bwhere (is|are) (the )?(hr policies|employee policies|employee handbook|posh policy|leave policy)(\s+page)?\b/i,
        /\b(take me to|navigate to|open|show|show me|view|go to|display) (the )?(hr policies|policies)(\s+page)?\b/i,
        /\b(where can i (find|see) (the )?(hr policies|policies))\b/i,
        /\b(hr policies|policies)(\s+page)?$/i
      ],
      answer: `**Clyptus HR Policies & Compliance Portal**\n\nOur secure internal repository for company standards, employee entitlements, and compliance:\n\n• **Protected Policy Documents**: Code of Conduct, Employee Benefits, Leave & Maternity Policy, Disciplinary Policy, Grievance Redressal, Employee Handbook, POSH, and Data Privacy.\n• **Secure Login**: Access is protected for verified employees and authorized compliance auditors.\n\nClick below to open the HR Policies Portal.`,
      secondaryActions: [
        { label: 'Explore Careers', pageTarget: 'Careers' },
        { label: 'Contact Us', pageTarget: 'Contact' }
      ]
    },
    {
      id: 'contact',
      pageTarget: 'Contact',
      name: 'Contact Us & Global Offices',
      buttonLabel: 'Go to Contact Page',
      patterns: [
        /\bwhere (is|are) (the )?(contact|contact us|offices?|addresses?|headquarters|branches?|phone|call)(\s+page)?\b/i,
        /\b(take me to|navigate to|open|show|show me|view|go to|display) (the )?(contact|contact us|offices|branches)(\s+page)?\b/i,
        /\b(where can i (find|reach|call) (clyptus|you))\b/i,
        /\b(contact|contact us)(\s+page)?$/i
      ],
      answer: `**Get in Touch with Clyptus Software Solutions**\n\nConnect with our leadership, sales, and engineering teams:\n\n• **Regional Phone Lines**: India: +91 77999 88139 | UAE: +971 52 350 3297 | USA: +1 480 427-6373\n• **Official Emails**: Sales@clyptus.com | hr.india@clyptus.com | contact@clyptus.com\n• **Global Footprint**: India (Hyderabad HQ, Bengaluru, Chennai, Vijayawada, Indore), Dubai DIFC (Sheikh Zayed Rd), California (Temecula).\n\nClick below to open our Contact page with interactive 3D globe and inquiry form.`,
      secondaryActions: [
        { label: 'View All Emails', chatQuery: 'What are your official emails?' },
        { label: 'Browse All Services', pageTarget: 'Services' }
      ]
    },
    {
      id: 'services',
      pageTarget: 'Services',
      name: 'All Enterprise Services',
      buttonLabel: 'Browse All Services',
      patterns: [
        /\bwhere (is|are) (the )?(all services|services page|services hub|services overview|what services|offerings)\b/i,
        /\b(take me to|navigate to|open|show|show me|view|go to|display) (the )?(services|services page)\b/i,
        /\b(where can i (find|see) (all )?services)\b/i,
        /\bservices(\s+page)?$/i
      ],
      answer: `**Clyptus Enterprise Services Portfolio**\n\nWe deliver end-to-end digital transformation across 8 specialized practices:\n\n1. **ERP & SAP (Silver Partner)**: S/4HANA, BRIM, and BTP integrations.\n2. **AI & GenAI**: Agentic swarms, bespoke LLMs, and RAG pipelines.\n3. **Multi-Cloud Architecture**: AWS, Azure, GCP, and Kubernetes.\n4. **Cybersecurity**: 24/7 Managed SOC and Zero-Trust architecture.\n5. **CRM Services**: SAP CX and Microsoft Dynamics 365.\n6. **Salesforce**: Agentforce AI, Sales/Service Cloud, and LWC.\n7. **Data Engineering**: Snowflake, Databricks, and streaming Kafka pipelines.\n8. **IT Staffing**: 330+ vetted tech professionals for rapid deployment.\n\nClick below to view the Services hub.`,
      secondaryActions: [
        { label: 'ERP & SAP', pageTarget: 'SAP' },
        { label: 'AI Solutions', pageTarget: 'AI' }
      ]
    },
    {
      id: 'home',
      pageTarget: 'Home',
      name: 'Home Page',
      buttonLabel: 'Go to Home Page',
      patterns: [
        /\bwhere (is|are) (the )?(home page|main page|landing page)\b/i,
        /\b(take me to|navigate to|open|show|show me|view|go to|display) (the )?(home|home page|main page)\b/i,
        /\bhome(\s+page)?$/i
      ],
      answer: `**Clyptus Home Page**\n\nOur landing page features the 3D spiral slider showcasing our flagship enterprise services, live corporate statistics, and transformation stories.\n\nClick below to return directly to the Home page.`,
      secondaryActions: [
        { label: 'Browse All Services', pageTarget: 'Services' },
        { label: 'Go to Insights Page', pageTarget: 'Blogs' }
      ]
    }
  ];

  // Answer matching engine
  const findAnswer = (query: string): { text: string; quickActions?: QuickAction[] } => {
    const cleanQuery = query.toLowerCase().trim();

    // Strict Scope Guardrail: Block unwanted / off-topic queries immediately to preserve Clyptus website focus
    const OFF_TOPIC_REGEXES = [
      /\b(recipe|recipes|cook|cooking|bake|baking|ingredients?|cake|pizza|burger|pasta|biryani|sandwich|food|dish|restaurant)\b/i,
      /\b(weather|temperature|forecast|rain today|climate|humidity)\b/i,
      /\b(sports?|cricket|football|soccer|tennis|basketball|ipl|world cup|olympics?|messi|ronaldo|kohli|dhoni)\b/i,
      /\b(movie|movies|cinema|actor|actress|hollywood|bollywood|song|songs|lyrics|singer|celebrity)\b/i,
      /\b(politics|politician|president|prime minister|election|elections|government|parliament|congress|bjp|democrat|republican)\b/i,
      /\b(joke|jokes|riddle|riddles|poem|poems|sing a song|tell a story|fairy tale)\b/i,
      /\b(homework|solve this math|calculus|algebra|physics problem|chemistry equation|photosynthesis|biology)\b/i,
      /\b(horoscope|zodiac|astrology|fortune teller)\b/i,
      /\b(who is (elon musk|bill gates|mark zuckerberg|steve jobs|trump|biden|modi))\b/i,
      /\b(write (a )?(python|java|c\+\+|javascript) (code|script|program) for (fibonacci|binary search|sorting|calculator|game))\b/i,
    ];

    if (OFF_TOPIC_REGEXES.some((r) => r.test(cleanQuery))) {
      return {
        text: `I’m here to help with questions about Clyptus Software Solutions and its services. If you have any queries related to our products, support, or anything else Clyptus‑related, feel free to ask!`,
        quickActions: [
          { label: 'Browse All Services', pageTarget: 'Services' },
          { label: 'Go to About Us', pageTarget: 'About' },
          { label: 'Explore Careers', pageTarget: 'Careers' },
          { label: 'Go to Contact Page', pageTarget: 'Contact' }
        ]
      };
    }

    // 0. Dedicated Direct Page Navigation Engine ("where is...", "go to...", "take me to...", page names)
    for (const nav of PAGE_NAV_DIRECTORY) {
      for (const pattern of nav.patterns) {
        if (pattern.test(cleanQuery)) {
          return {
            text: nav.answer,
            quickActions: [
              { label: nav.buttonLabel, pageTarget: nav.pageTarget },
              ...nav.secondaryActions
            ]
          };
        }
      }
    }

    // 1. Direct Regex Pattern Matching against Knowledge Base
    for (const item of KNOWLEDGE_BASE) {
      for (const pattern of item.patterns) {
        if (pattern.test(cleanQuery)) {
          return { text: item.answer, quickActions: item.quickActions };
        }
      }
    }

    // 2. Keyword Scoring Match with Stopword Filtering
    const rawTokens = cleanQuery.split(/[\s,?.!'"()]+/).filter(Boolean);
    const meaningfulTokens = rawTokens.filter((token) => !STOP_WORDS.has(token) && token.length > 2);

    let bestMatch: KnowledgeArticle | null = null;
    let highestScore = 0;

    for (const item of KNOWLEDGE_BASE) {
      let score = 0;

      for (const kw of item.keywords) {
        const lowerKw = kw.toLowerCase().trim();
        
        // Exact full query matches a keyword
        if (cleanQuery === lowerKw) {
          score += 30;
          continue;
        }

        // Multi-word keyword phrase match (e.g. "office locations", "current project", "sap services")
        if (lowerKw.includes(' ') && cleanQuery.includes(lowerKw)) {
          score += lowerKw.split(' ').length * 12;
          continue;
        }

        // Single keyword exact match in cleanQuery as a whole word
        const wordRegex = new RegExp(`\\b${lowerKw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (wordRegex.test(cleanQuery)) {
          score += 10;
          continue;
        }

        // Meaningful token overlap with keyword
        for (const token of meaningfulTokens) {
          if (lowerKw === token) {
            score += 8;
          } else if (lowerKw.length >= 4 && token.length >= 4 && (lowerKw.includes(token) || token.includes(lowerKw))) {
            score += 3;
          }
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    // High confidence threshold (prevents weak coincidences from picking the wrong topic)
    if (bestMatch && highestScore >= 16) {
      return { text: bestMatch.answer, quickActions: bestMatch.quickActions };
    }

    // 3. Fallback when no match is found (Polite website-focused boundary response)
    return {
      text: `I’m here to help with questions about Clyptus Software Solutions and its services. If you have any queries related to our products, support, or anything else Clyptus‑related, feel free to ask!

Here are the key areas you can explore across Clyptus:
• **ERP & SAP Services**: S/4HANA migrations, SAP BRIM billing, and SAP BTP clean core
• **AI Solutions**: Custom enterprise LLMs, Agentic AI swarms, and predictive analytics
• **Multi-Cloud & DevOps**: Multi-cloud consulting across AWS, Azure, GCP, and Kubernetes
• **Cybersecurity & Compliance**: 24/7 Managed SOC, Zero-Trust, and ISO 27001 / SOC 2
• **Data Engineering**: Snowflake, Databricks, and real-time Kafka streaming
• **CRM & Salesforce**: Dynamics 365, SAP CX, and Salesforce Agentforce
• **Careers & Leadership**: Global openings, Founder & CEO Vamsi Krishna Are, and executive leadership

Click any button below to jump directly to a page or ask any question about Clyptus services:`,
      quickActions: [
        { label: 'Browse All Services', pageTarget: 'Services' },
        { label: 'Go to Insights Page', pageTarget: 'Blogs' },
        { label: 'Go to ERP & SAP Services', pageTarget: 'SAP' },
        { label: 'Go to AI Solutions', pageTarget: 'AI' },
        { label: 'Go to Contact Page', pageTarget: 'Contact' }
      ]
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
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

    const cleanQuery = text.toLowerCase().trim();

    // 0. Fast-path check: Direct Page Navigation queries (e.g. "where is insights", "show carrers page")
    let directNavMatch = null;
    for (const nav of PAGE_NAV_DIRECTORY) {
      for (const pattern of nav.patterns) {
        if (pattern.test(cleanQuery)) {
          directNavMatch = {
            text: nav.answer,
            quickActions: [
              { label: nav.buttonLabel, pageTarget: nav.pageTarget },
              ...nav.secondaryActions
            ]
          };
          break;
        }
      }
      if (directNavMatch) break;
    }

    if (directNavMatch) {
      setTimeout(() => {
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: directNavMatch.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickActions: directNavMatch.quickActions
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      }, 250);
      return;
    }

    // 1. Query Groq AI through secure serverless backend endpoint (/api/chat)
    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && !data.useFallback && data.text) {
          const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            quickActions: data.quickActions
          };
          setMessages((prev) => [...prev, aiMessage]);
          setIsTyping(false);
          return;
        }
      }
    } catch (err) {
      console.warn('API Chat call failed, using local knowledge engine fallback:', err);
    }

    // 2. High-speed instant fallback to local question answering system
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
    // 1. Pre-process to eliminate raw <br> tags and convert markdown tables into clean bullet structures
    const rawLines = rawText.split('\n');
    const processedLines: string[] = [];

    for (const rawLine of rawLines) {
      const line = rawLine.trim();
      if (!line) {
        processedLines.push('');
        continue;
      }

      // Skip table header divider rows like |---|---| or |:---|:---|
      if (/^\|[\s:-|-]+\|$/.test(line)) {
        continue;
      }

      // Match table rows: | Col1 | Col2 | Col3? |
      if (line.startsWith('|') && line.endsWith('|')) {
        const cells = line
          .slice(1, -1)
          .split('|')
          .map((c) => c.trim())
          .filter(Boolean);

        // Skip generic table header row
        if (
          cells.some((c) =>
            /^(#|practice|area|service|what we do|category|key offerings|highlights|domain)$/i.test(c)
          )
        ) {
          continue;
        }

        if (cells.length === 1) {
          const subItems = cells[0].split(/<br\s*\/?>/gi).map((s) => s.trim()).filter(Boolean);
          for (const sub of subItems) {
            processedLines.push(sub.startsWith('•') || sub.startsWith('-') ? sub : '• ' + sub);
          }
        } else if (cells.length >= 2) {
          const title = cells[0].replace(/^(\d+\.?\s*|\*+)/g, '').replace(/\*+$/g, '').trim();
          const descRaw = cells.slice(1).join(' — ').trim();
          const subItems = descRaw.split(/<br\s*\/?>/gi).map((s) => s.trim()).filter(Boolean);

          if (subItems.length === 1) {
            const cleanDesc = subItems[0].replace(/^[•-]\s*/, '').trim();
            processedLines.push(`• **${title}**: ${cleanDesc}`);
          } else {
            processedLines.push(`• **${title}**:`);
            for (const sub of subItems) {
              const cleanSub = sub.replace(/^[•-]\s*/, '').trim();
              processedLines.push(`  - ${cleanSub}`);
            }
          }
        }
        continue;
      }

      // Normal line: split any embedded <br> into separate lines
      const subs = line.split(/<br\s*\/?>/gi);
      for (const sub of subs) {
        if (sub.trim()) processedLines.push(sub.trim());
      }
    }

    const lines = processedLines;

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

      // Nested sub-bullets (e.g. "  - " or "  • ")
      const isSubBullet = line.startsWith('  ') || line.startsWith('\t');
      if (isSubBullet && (line.trim().startsWith('•') || line.trim().startsWith('-'))) {
        const bulletText = line.trim().replace(/^[\s•-]+/, '');
        return (
          <div key={idx} className="flex items-start gap-2 my-0.5 pl-5">
            <span className="w-1.5 h-1.5 rounded-full border border-blue-400 bg-white mt-2 shrink-0" />
            <div className="flex-1 text-slate-600 leading-relaxed text-xs sm:text-[14px]">
              {renderInlineContent(bulletText)}
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
    <div className="font-sans">
      {/* ---------------------------------------------------- */}
      {/* FLOATING TRIGGER BUTTON (TOP RIGHT CORNER)           */}
      {/* ---------------------------------------------------- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="keva-trigger-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75, transition: { duration: 0.15 } }}
            transition={{ type: 'spring', stiffness: 420, damping: 25 }}
            className="fixed top-2.5 sm:top-3 right-3 sm:right-5 lg:top-3 lg:right-7 z-50 flex items-center"
          >
            {/* Rotating Glowing Orange Border Effect Container (Clockwise) */}
            <div className="relative group p-[2px] rounded-full overflow-hidden flex items-center justify-center shadow-[0_2px_14px_rgba(255,113,56,0.28)] hover:shadow-[0_4px_24px_rgba(255,113,56,0.55)] transition-all duration-300 hover:scale-[1.05] active:scale-95">
              
              {/* Clockwise Rotating Conic Orange Glow Beam */}
              <div
                className="absolute inset-[-200%] animate-spin-clockwise pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 260deg, #ff9800 310deg, #ff5722 340deg, #ff3d00 360deg)'
                }}
              />

              {/* Ambient Blurred Orange Halo Behind the Border */}
              <div
                className="absolute inset-[-200%] animate-spin-clockwise blur-sm opacity-75 pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 260deg, #ff9800 310deg, #ff5722 340deg, #ff3d00 360deg)'
                }}
              />

              {/* Inner Pill Button with Exact Keva Logo beside 'Ask Keva' */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-white text-slate-900 px-3.5 py-1.5 sm:px-4 sm:py-2 transition-all cursor-pointer select-none"
                title="Ask Keva"
                aria-label="Ask Keva"
              >
                <KevaBotLogo className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900 group-hover:text-orange-600 transition-colors shrink-0" />
                <span className="font-extrabold text-xs sm:text-sm tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors whitespace-nowrap">
                  Ask Keva
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------------------------------------------- */}
      {/* EXPANDABLE CHATBOT WINDOW (STYLE #1: CORNER SPRING)  */}
      {/* ---------------------------------------------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            key="keva-chat-window"
            initial={{ opacity: 0, scale: 0.65, x: 20, y: -20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: 0,
              transition: isResizing 
                ? { duration: 0 } 
                : { type: 'spring', stiffness: 380, damping: 28, mass: 0.85 }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.65, 
              x: 20, 
              y: -20,
              transition: { duration: 0.22, ease: [0.32, 0, 0.67, 0] } 
            }}
            style={{
              width: typeof window !== 'undefined' && window.innerWidth < 640 ? undefined : `${dimensions.width}px`,
              height: typeof window !== 'undefined' && window.innerWidth < 640 ? undefined : `${dimensions.height}px`,
              transformOrigin: 'top right'
            }}
            className={`fixed inset-x-2.5 top-2.5 bottom-2.5 sm:inset-auto sm:top-4 sm:right-6 lg:top-3.5 lg:right-8 z-[70] sm:max-w-[calc(100vw-32px)] sm:max-h-[calc(100dvh-32px)] bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),0_0_25px_rgba(255,113,56,0.18)] border border-slate-200/90 flex flex-col overflow-hidden origin-top-right will-change-transform ${
              isResizing ? 'transition-none select-none' : ''
            }`}
          >
          {/* Edge Drag Handles for Resizing (Desktop Only) */}
          <div className="hidden sm:block">
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
          </div>

          {/* Header Bar (Clean Light Theme) */}
          <div className="shrink-0 relative px-4 sm:px-5 py-3 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2.5 relative z-10">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-sm">
                <KevaBotLogo className="w-5 h-5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div className="flex items-center text-left">
                <h3 className="font-bold text-[15px] text-slate-900 tracking-tight">Ask Keva</h3>
              </div>
            </div>

            {/* Action Buttons: Reset, Close */}
            <div className="flex items-center gap-1 relative z-10">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body - min-h-0 ensures container scrolls and never pushes input off-screen */}
          <div className="flex-1 min-h-0 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 bg-slate-50/60 text-left">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
                  >
                    <div className="flex items-end gap-2 max-w-[92%]">
                      {msg.sender === 'ai' && (
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center shrink-0 mb-1 shadow-2xs">
                          <KevaBotLogo className="w-4 h-4 text-white" />
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
                        ).map((action, aIdx) => {
                          const isPageNav = Boolean(action.pageTarget);
                          return (
                            <button
                              key={aIdx}
                              onClick={() => {
                                if (action.chatQuery) {
                                  handleSendMessage(action.chatQuery);
                                } else if (action.pageTarget) {
                                  handleActionClick(action.pageTarget);
                                }
                              }}
                              className={
                                isPageNav
                                  ? "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white shadow-xs hover:shadow-md hover:scale-[1.03] transition-all cursor-pointer active:scale-95 border border-blue-500/30"
                                  : "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-[13px] font-medium bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-2xs transition-all hover:scale-[1.02] cursor-pointer active:scale-95"
                              }
                            >
                              {isPageNav && <Compass className="w-3.5 h-3.5 text-sky-200 animate-pulse" />}
                              <span>{action.label}</span>
                              <ArrowRight className={`w-3 h-3 ${isPageNav ? 'text-white' : 'text-slate-400'}`} />
                            </button>
                          );
                        })}
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
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center shrink-0">
                      <KevaBotLogo className="w-4 h-4 text-white" />
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

              {/* Input Control Bar - shrink-0 ensures input is always fixed and visible */}
              <div className="shrink-0 p-3 bg-white border-t border-slate-200/80 flex flex-col gap-1.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
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
                    placeholder="Ask Keva..."
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClyptusAiChatbot;
