import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  RotateCcw, 
  ChevronDown, 
  ArrowRight, 
  Bot,
  Mail,
  Phone
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
    answer: `**Official Clyptus Contact & Email Channels:**

You can reach our leadership, sales, and HR teams directly via our dedicated corporate email addresses:

• 💼 **Sales & Enterprise Proposals**: Sales@clyptus.com
  *For project scoping, RFPs, pricing quotes, and enterprise architecture consultations.*
  *Direct Line: +91 77999 88139*

• 🌐 **General Corporate & Business Inquiries**: info@clyptus.com / contact@clyptus.com
  *For strategic alliances, general communications, and client support.*

• 👥 **Careers & HR (India & APAC Delivery Center)**: hr.india@clyptus.com
  *For job openings, resume submissions, campus drives, and recruiter inquiries.*

• 🇦🇪 **Careers & HR (UAE & Middle East Regional Hub)**: hr.uae@clyptus.com
  *DIFC Operations | Direct Line: +971 52 350 3297*

• 🇺🇸 **Careers & HR (USA & North America Hub)**: hr.usa@clyptus.com
  *California Operations | Direct Line: +1 (480) 427-6373*

You can also submit an inquiry directly using our website contact form!`,
    quickActions: [
      { label: '📝 Open Contact Form', pageTarget: 'Contact' },
      { label: '🚀 Company Journey & Milestones', chatQuery: 'Tell me about Clyptus journey and history' },
      { label: '👥 Explore Careers & Jobs', pageTarget: 'Careers' },
      { label: '🏢 Global Office Locations', chatQuery: 'Where are your office locations?' }
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
    answer: `**The Clyptus Journey & Milestones (2014 – Present):**

Over a decade of engineering mission-critical architectures, scaling global teams, and delivering digital transformation:

1. 🚀 **2014 – 2016: Foundation & Initial Expansion**
   • Founded in 2014 with a core SAP ERP & HCM consulting practice.
   • Delivered our first international enterprise SAP project in Dubai, UAE.
   • Established our high-velocity ERP delivery center in Hyderabad, India.

2. 🌐 **2016 – 2018: Global Footprint Growth**
   • Expanded international SAP delivery operations across 3+ countries.
   • Successfully served 15+ large enterprise clients with major UAE and India rollouts.
   • Scaled consulting squad to 65+ senior enterprise consultants.

3. ☁️ **2018 – 2020: S/4HANA & Cloud Leadership**
   • Launched comprehensive SAP Cloud Services & multi-cloud migration portfolio.
   • Scaled consulting team to 87+ senior SAP engineers and architects.
   • Established dedicated SAP S/4HANA migration & clean-core modernization practice.

4. 🥈 **2020 – 2022: Analytics & Official SAP Silver Partner**
   • Introduced Enterprise Data Platforms & SAP BRIM (Billing & Revenue Innovation Management) practices.
   • Achieved prestigious **SAP Silver Partner** official certification.
   • Scaled to 120+ team strength and expanded to a 110+ customer base.

5. 🤖 **2022 – Present: BTP, AI & Next-Gen Innovation**
   • Introduced SAP BTP (Business Technology Platform) & Clean-Core extensions practice.
   • Built proprietary SAP add-on assets and integrated Agentic AI & Generative AI capabilities.
   • Expanded global squad to 250+ consultants across India, UAE, and North America.`,
    quickActions: [
      { label: '📖 Read About Us Page', pageTarget: 'About' },
      { label: '✉️ Official Emails & Contact', chatQuery: 'What are your official emails?' },
      { label: '💼 Our SAP & ERP Practice', pageTarget: 'SAP' },
      { label: '🤖 AI & GenAI Solutions', pageTarget: 'AI' }
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
    answer: `**Clyptus Global Delivery Centers & Office Locations:**

We operate 3 strategic regional hubs delivering 24/7 enterprise engineering and consulting:

🇮🇳 **Hyderabad, India (Global Headquarters & Delivery Center)**
• **Address**: 12A01A, 13th Floor, Manjeera Trinity Corporate, JNTU–Hitech City Road, Kukatpally, Hyderabad, Telangana 500072
• **Emails**: Sales@clyptus.com | hr.india@clyptus.com
• **Phone**: +91 77999 88139 (Sales & Enterprise Delivery)

🇦🇪 **Dubai, UAE (Middle East Regional Center & DIFC Operations)**
• **Address**: 101 Sheikh Zayed Rd, Trade Centre, DIFC, Dubai, UAE
• **Email**: hr.uae@clyptus.com
• **Phone**: +971 52 350 3297

🇺🇸 **California, USA (North America Business Hub)**
• **Address**: 45627 Basswood Ct, Temecula, California 92592
• **Email**: hr.usa@clyptus.com
• **Phone**: +1 (480) 427-6373`,
    quickActions: [
      { label: '🌍 View Interactive Globe', pageTarget: 'Contact' },
      { label: '✉️ View Official Emails', chatQuery: 'What are your official emails?' },
      { label: '🚀 Company Journey', chatQuery: 'Tell me about the company journey' }
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
    answer: `**Clyptus at a Glance (Key Enterprise Metrics):**

• 🏆 **10+ Years of Experience**: Delivering mission-critical enterprise engineering since 2014.
• 👥 **250+ Global Consultants**: Elite squad including 120+ certified SAP & cloud specialists.
• 🌐 **50+ Global Enterprise Projects**: Delivered across North America, EMEA, and APAC regions.
• 🗺️ **30+ Country Localizations**: Supporting cross-border operations and tax/statutory compliances.
• 🚀 **330+ Tech Professionals Deployed**: Specialized talent matched with enterprise transformation programs.
• 📦 **5+ Pre-Built RDS Packages**: Rapid deployment packages reducing enterprise go-live lead times.
• 🧩 **50+ Add-on Assets**: Ready-to-use software components for SAP, cloud, and data integration.
• 🥈 **Official SAP Silver Partner**: Certified partner for S/4HANA, BRIM, and BTP delivery.`,
    quickActions: [
      { label: '🚀 Company Journey & History', chatQuery: 'Tell me about Clyptus journey and history' },
      { label: '📁 Verified Case Studies', pageTarget: 'Projects' },
      { label: '✉️ Contact Sales', chatQuery: 'What are your official emails?' }
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
    answer: `**Clyptus Leadership & Vision:**

• **Founder & Strategic Leader**: **Vamsi Krishna** guides Clyptus's strategic vision, global partnerships, and technology innovation across the USA, UAE, and India.
• **Vision**: *"Shaping Tomorrow Through Innovation"* — Empowering enterprises to thrive in an AI-first, cloud-native world through scalable intelligence and technical agility.
• **Mission**: *"Turning Ideas Into Impact"* — Transforming complex enterprise challenges into resilient, high-performance systems with clear business ROI.
• **Core Philosophy**: A commitment to technical rigor, clean-core architectures, transparent client relationships, and proactive innovation.`,
    quickActions: [
      { label: '🏢 About Clyptus Page', pageTarget: 'About' },
      { label: '🚀 Company Journey & Story', chatQuery: 'Tell me about the company journey' },
      { label: '✉️ Contact Leadership', pageTarget: 'Contact' }
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
    answer: `**Careers at Clyptus Software Solutions:**

We are continuously hiring exceptional developers, enterprise consultants, and tech leaders:

• **Hot Job Openings**:
  1. SAP S/4HANA Functional & Technical Consultants (3–6 yrs)
  2. Cloud Solutions Architects (AWS / Azure / OCI, 5–10 yrs)
  3. Generative AI & LLM Engineers (Python, PyTorch, Azure AI, 3–5 yrs)
  4. SAP BRIM / Billing Consultants (Convergent Invoicing, FI-CA, 3–7 yrs)
  5. SAP SuccessFactors & HCM Specialists (2–5 yrs)
  6. Power BI & Enterprise Data Engineers (2–5 yrs)

• **How to Apply**:
  Send your resume directly to our regional talent acquisition team:
  📧 **hr.india@clyptus.com** (India & APAC)
  📧 **hr.uae@clyptus.com** (UAE & Middle East)
  📧 **hr.usa@clyptus.com** (USA & Americas)`,
    quickActions: [
      { label: '💼 View All Job Openings', pageTarget: 'Careers' },
      { label: '📜 HR Policy & Culture', pageTarget: 'HrPolicy' },
      { label: '✉️ Email HR Team', chatQuery: 'What are your official emails?' }
    ]
  },

  // 7. GREETINGS & INTRO
  {
    category: 'greetings',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'who are you', 'what is clyptus ai', 'help me', 'start'],
    patterns: [/^(hi|hello|hey|hola|greetings)/i, /who are you/i, /what (can you do|is clyptus ai)/i],
    answer: `Hello! I'm **Clyptus AI**, your virtual guide to Clyptus Software Solutions.

I can help you explore everything about our company, including:
• ✉️ **Contact & Emails**: Departmental emails, phones, and global delivery centers.
• 🚀 **Company Journey**: Founded in 2014, milestones, expansion, and SAP Silver Partnership.
• 💼 **Enterprise Practices**: SAP & ERP, Artificial Intelligence, Multi-Cloud, Cybersecurity, CRM, Salesforce, and Data Engineering.
• 🏆 **Key Metrics**: 10+ years experience, 250+ consultants, 50+ global projects across 30+ countries.
• 👥 **Careers**: Open roles and direct HR application emails.

What would you like to explore today?`,
    quickActions: [
      { label: '✉️ Official Emails', chatQuery: 'What are your official emails?' },
      { label: '🚀 Company Journey', chatQuery: 'Tell me about Clyptus journey and history' },
      { label: '💼 ERP & SAP Services', pageTarget: 'SAP' },
      { label: '🤖 AI Engineering', pageTarget: 'AI' },
      { label: '📞 Contact Us', pageTarget: 'Contact' }
    ]
  },

  // 8. ERP & SAP SERVICES
  {
    category: 'erp',
    keywords: ['sap', 'erp', 's4hana', 's/4hana', 'hana', 'brim', 'btp', 'clean core', 'migration', 'oracle erp', 'dynamics 365', 'ams', 'silver partner'],
    patterns: [/sap/i, /s\/4hana/i, /erp/i, /brim/i, /btp/i, /clean core/i, /oracle erp/i, /dynamics 365/i],
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
      { label: 'Request ERP Assessment', pageTarget: 'Contact' },
      { label: '✉️ Email Sales Team', chatQuery: 'What are your official emails?' }
    ]
  },

  // 9. ARTIFICIAL INTELLIGENCE & GENAI
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
      { label: 'Schedule an AI Discovery Session', pageTarget: 'Contact' },
      { label: '✉️ Email AI Squad', chatQuery: 'What are your official emails?' }
    ]
  },

  // 10. MULTI-CLOUD & DEVOPS
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
      { label: 'Request Cloud Architecture Review', pageTarget: 'Contact' }
    ]
  },

  // 11. CYBERSECURITY & COMPLIANCE
  {
    category: 'security',
    keywords: ['security', 'cybersecurity', 'cyber', 'soc', 'compliance', 'iso 27001', 'soc 2', 'hipaa', 'gdpr', 'nist', 'pentest', 'vulnerability', 'zero trust', 'siem', 'soar'],
    patterns: [/security/i, /cyber/i, /soc/i, /iso\s?27001/i, /soc\s?2/i, /hipaa/i, /gdpr/i, /zero trust/i, /pen(etration)?\s?test/i],
    answer: `**Cybersecurity & Regulatory Compliance:**

Our defense-in-depth security practice protects your intellectual property, infrastructure, and reputation:

• **24/7 Managed SOC**: Real-time SIEM/SOAR incident detection, automated containment, and threat intelligence.
• **Compliance & Governance**: ISO/IEC 27001, SOC 2 Type II, HIPAA, GDPR, PCI DSS, and NIST CSF audit readiness.
• **Offensive Security & Pen Testing**: Web app, cloud infrastructure, and internal network penetration testing with remediation roadmaps.
• **Zero-Trust Architecture**: Identity & Access Management (IAM), micro-segmentation, and least-privilege enforcement.
• **Cloud Security Posture (CSPM)**: Automated compliance scanning across AWS, Azure, and Google Cloud workloads.`,
    quickActions: [
      { label: 'Explore Cybersecurity Page', pageTarget: 'Security' },
      { label: 'Request Security Assessment', pageTarget: 'Contact' }
    ]
  },

  // 12. CRM SERVICES (SAP CX, ORACLE CX, DYNAMICS)
  {
    category: 'crm',
    keywords: ['crm', 'customer', 'sap cx', 'sales cloud', 'service cloud', 'commerce cloud', 'oracle cx', 'dynamics 365 crm', 'cpq', 'emarsys'],
    patterns: [/crm/i, /sap cx/i, /sales cloud/i, /service cloud/i, /oracle cx/i, /customer relationship/i],
    answer: `**CRM & Customer Experience Engineering:**

Clyptus unifies front-office engagement with back-office execution across industry-leading CRM platforms:

• **SAP Customer Experience (SAP CX)**: SAP Sales Cloud, SAP Service Cloud, SAP Commerce Cloud, Customer Data Platform (CDP), and Emarsys Marketing Automation.
• **SAP CPQ & Subscription Billing**: Fast product configuration, complex tiered pricing, and quoting engines.
• **Oracle CX & Salesforce Integrations**: Enterprise-wide pipeline visibility and synchronized master customer records.
• **Microsoft Dynamics 365 CRM**: Connected sales, customer care, and automated field services.`,
    quickActions: [
      { label: 'Explore CRM Services', pageTarget: 'CRM' },
      { label: 'Request CRM Architecture Session', pageTarget: 'Contact' }
    ]
  },

  // 13. SALESFORCE & AGENTFORCE
  {
    category: 'salesforce',
    keywords: ['salesforce', 'agentforce', 'sfdc', 'apex', 'lwc', 'lightning', 'flow', 'experience cloud', 'marketing cloud', 'einstein'],
    patterns: [/salesforce/i, /agentforce/i, /sfdc/i, /apex/i, /lwc/i],
    answer: `**Salesforce Solutions & Agentforce AI:**

Accelerate revenue pipelines with customized Salesforce ecosystems and autonomous AI agents:

• **Salesforce Agentforce**: Deploying autonomous AI agents that handle service inquiries, qualify sales leads, and execute business actions.
• **Core Cloud Deployments**: Sales Cloud, Service Cloud, Experience Cloud (Community), and Marketing Cloud.
• **Custom Development**: Apex architecture, Lightning Web Components (LWC), and complex third-party ERP integrations.
• **Omnichannel Automation**: Flow orchestration, automated SLAs, and unified customer 360-degree views.`,
    quickActions: [
      { label: 'Open Salesforce Page', pageTarget: 'Salesforce' },
      { label: 'Talk to Salesforce Specialist', pageTarget: 'Contact' }
    ]
  },

  // 14. DATA ENGINEERING & LAKEHOUSES
  {
    category: 'data',
    keywords: ['data', 'data engineering', 'analytics', 'snowflake', 'databricks', 'kafka', 'spark', 'etl', 'elt', 'dbt', 'lakehouse', 'bi', 'bigquery'],
    patterns: [/data/i, /analytics/i, /snowflake/i, /databricks/i, /kafka/i, /spark/i, /lakehouse/i, /bigquery/i],
    answer: `**Data Engineering & Modern Lakehouse Architectures:**

We transform fragmented enterprise data silos into clean, real-time analytics engines:

• **Modern Data Lakehouses**: Snowflake, Databricks, and Google Cloud BigQuery implementations.
• **Streaming Data Pipelines**: Real-time event streaming architectures using Apache Kafka and Apache Spark.
• **Automated ETL/ELT**: Scalable data transformations with dbt, Airflow, and Azure Data Factory.
• **Data Governance & Quality**: Automated data lineage, cataloging, schema validation, and GDPR masking.
• **Enterprise BI**: High-performance executive dashboards in Power BI, Tableau, and Looker.`,
    quickActions: [
      { label: 'View Data Engineering Services', pageTarget: 'DataEngineering' },
      { label: 'Book Data Discovery Workshop', pageTarget: 'Contact' }
    ]
  },

  // 15. IT RECRUITMENT & TALENT DELIVERY
  {
    category: 'recruiting',
    keywords: ['recruitment', 'recruiting', 'staffing', 'talent', 'hire', 'contractors', 'placement', 'developers', 'consultants'],
    patterns: [/recruitment/i, /recruiting/i, /staffing/i, /hire talent/i, /contractors/i],
    answer: `**IT Recruiting & Specialized Talent Delivery:**

Rapid deployment of rigorously vetted enterprise technology talent:

• **Flexible Models**: Contract staffing, permanent placement, contract-to-hire, and dedicated offshore squads.
• **Specializations**: Certified SAP functional/technical consultants, Cloud Architects, AI Engineers, Cybersecurity Analysts, and Salesforce Developers.
• **Technical Vetting**: Every candidate is evaluated by Clyptus practicing solution architects before submission.
• **Looking to Join Clyptus?**: Send your resume to hr.india@clyptus.com or explore our Careers page!`,
    quickActions: [
      { label: 'View IT Recruiting Services', pageTarget: 'Recruiting' },
      { label: 'Explore Clyptus Careers', pageTarget: 'Careers' },
      { label: '✉️ Send Resume via Email', chatQuery: 'What are your official emails?' }
    ]
  },

  // 16. INDUSTRIES TRANSFORMED
  {
    category: 'industries',
    keywords: ['industries', 'sectors', 'banking', 'healthcare', 'retail', 'manufacturing', 'ports', 'logistics', 'energy', 'telecom'],
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

  // 17. CLIENTS & PARTNERS
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

  // 18. GENERAL CONTACT & CONSULTATION
  {
    category: 'contact',
    keywords: ['contact', 'reach', 'talk', 'consultation', 'quote', 'pricing', 'cost', 'inquire', 'support', 'get in touch', 'book call', 'schedule meeting'],
    patterns: [/contact/i, /consultation|quote|pricing|cost/i, /how (to|can I) (reach|connect)/i, /get in touch/i],
    answer: `**Get in Touch with Clyptus Software Solutions:**

We are here to assist you with technical assessments, architecture roadmaps, or project staffing:

• ✉️ **Primary Email Contacts**:
  - Sales & Client Proposals: Sales@clyptus.com
  - General Inquiries: info@clyptus.com / contact@clyptus.com
  - Talent & HR: hr.india@clyptus.com

• 📞 **Direct Regional Phone Lines**:
  - India: +91 77999 88139
  - UAE: +971 52 350 3297
  - USA: +1 (480) 427-6373

• 🏢 **Corporate Hubs**:
  - Hyderabad: Manjeera Trinity Corporate, JNTU-Hitech City Rd
  - Dubai: 101 Sheikh Zayed Rd, DIFC
  - California: 45627 Basswood Ct, Temecula, CA

Click below to fill out our interactive form or browse our services!`,
    quickActions: [
      { label: '📝 Open Contact Form', pageTarget: 'Contact' },
      { label: '✉️ View All Emails', chatQuery: 'What are your official emails?' },
      { label: '🚀 Company Journey', chatQuery: 'Tell me about the company journey' },
      { label: '💼 Browse Services', pageTarget: 'Services' }
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
      text: `Hello! 👋 I'm **Clyptus AI**, your intelligent assistant for Clyptus Software Solutions.

I can provide instant details on our **official emails & contact info**, our **company journey (2014–Present)**, our **SAP Silver Partnership**, and our 7 core practices:
• 💼 **ERP & SAP** (S/4HANA, BRIM, BTP)
• 🤖 **Artificial Intelligence & GenAI**
• ☁️ **Multi-Cloud & DevOps**
• 🔒 **Cybersecurity & Compliance**
• 📈 **CRM, Salesforce & Data Engineering**

How can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        { label: '✉️ Official Emails', chatQuery: 'What are your official emails?' },
        { label: '🚀 Company Journey & Milestones', chatQuery: 'Tell me about Clyptus journey and history' },
        { label: '🏢 Global Office Locations', chatQuery: 'Where are your office locations?' },
        { label: '💼 ERP & SAP Services', pageTarget: 'SAP' },
        { label: '🤖 AI & GenAI Solutions', pageTarget: 'AI' },
        { label: '📝 Contact Us', pageTarget: 'Contact' }
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
      text: `Thank you for asking! While I don't have an exact match for that specific inquiry, Clyptus provides complete enterprise technology services:

• ✉️ **Contact & Emails**: Sales@clyptus.com | hr.india@clyptus.com | +91 77999 88139
• 🚀 **Company Journey**: Founded in 2014, official SAP Silver Partner, 10+ years experience, 250+ consultants across USA, UAE, and India.
• 💼 **Enterprise Practices**: SAP S/4HANA & BRIM, Artificial Intelligence, Multi-Cloud, Cybersecurity, CRM, Salesforce, and Data Engineering.

Would you like to connect directly with our solution architects or explore our journey?`,
      quickActions: [
        { label: '✉️ View All Emails', chatQuery: 'What are your official emails?' },
        { label: '🚀 Company Journey & Milestones', chatQuery: 'Tell me about Clyptus journey and history' },
        { label: '🏢 Global Office Locations', chatQuery: 'Where are your office locations?' },
        { label: '💼 Browse All Services', pageTarget: 'Services' },
        { label: '📝 Contact Form', pageTarget: 'Contact' }
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
    }, 450);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: `Conversation refreshed! How else can I assist you with Clyptus's emails, company journey, architectures, or services?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: [
          { label: '✉️ Official Emails', chatQuery: 'What are your official emails?' },
          { label: '🚀 Company Journey', chatQuery: 'Tell me about Clyptus journey and history' },
          { label: '💼 ERP Services', pageTarget: 'SAP' },
          { label: '🤖 AI Engineering', pageTarget: 'AI' },
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

  // Helper to parse bold, emails, phones, and italics inline
  const renderInlineContent = (text: string) => {
    // Regex matches: bold (**...**), email address, phone number (+...), italic (*...*)
    const pattern = /(\*\*.*?\*\*|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+\d[\d\s()-]{8,}\d|\*.*?\*)/g;
    const parts = text.split(pattern);

    return parts.map((part, pIdx) => {
      if (!part) return null;

      // Bold
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} className="font-extrabold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Email address
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
        return (
          <a
            key={pIdx}
            href={`mailto:${part}`}
            className="font-bold text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600 inline-flex items-center gap-1 bg-blue-50/90 hover:bg-blue-100/90 px-1.5 py-0.5 rounded-md border border-blue-200/70 transition-colors cursor-pointer select-text"
            title={`Send email to ${part}`}
          >
            <Mail className="w-3 h-3 text-blue-500 inline shrink-0" />
            <span>{part}</span>
          </a>
        );
      }

      // Phone number
      if (/^\+\d[\d\s()-]{8,}\d$/.test(part)) {
        const cleanPhone = part.replace(/[^+\d]/g, '');
        return (
          <a
            key={pIdx}
            href={`tel:${cleanPhone}`}
            className="font-semibold text-slate-800 hover:text-blue-600 underline decoration-slate-300 hover:decoration-blue-500 inline-flex items-center gap-1 bg-slate-100/80 hover:bg-slate-200/80 px-1.5 py-0.5 rounded-md border border-slate-200 transition-colors cursor-pointer select-text"
            title={`Call ${part}`}
          >
            <Phone className="w-3 h-3 text-slate-500 inline shrink-0" />
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

  // Format bold, numbered milestones, and list text cleanly
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }

      // Numbered items (e.g. "1. ", "2. ")
      const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
      if (numberedMatch) {
        const num = numberedMatch[1];
        const rest = numberedMatch[2];
        return (
          <div key={idx} className="flex items-start gap-2 my-1.5 pl-1">
            <span className="w-5 h-5 rounded-md bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              {num}
            </span>
            <div className="flex-1 text-slate-800 leading-relaxed text-xs sm:text-sm">
              {renderInlineContent(rest)}
            </div>
          </div>
        );
      }

      // Bullet items (e.g. "• ", "- ")
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        const bulletText = line.replace(/^[\s•-]+/, '');
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
            <div className="flex-1 text-slate-800 leading-relaxed text-xs sm:text-sm">
              {renderInlineContent(bulletText)}
            </div>
          </div>
        );
      }

      return (
        <p key={idx} className="text-xs sm:text-sm text-slate-800 leading-relaxed my-1">
          {renderInlineContent(line)}
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

            {/* Bot Icon */}
            <div className="relative z-10 flex items-center justify-center">
              <Bot className="w-7 h-7 text-white stroke-[2.2] group-hover:scale-110 transition-transform" />
            </div>
          </button>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* EXPANDABLE CHATBOT WINDOW                            */}
      {/* ---------------------------------------------------- */}
      {isOpen && (
        <div 
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] w-[calc(100vw-32px)] sm:w-[440px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-5 ${
            isMinimized ? 'h-16' : 'h-[600px] max-h-[88vh]'
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
                  Online • Company & Journey Assistant
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
                    <div className="flex items-end gap-2 max-w-[90%]">
                      {msg.sender === 'ai' && (
                        <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 mb-1 shadow-sm">
                          <Bot className="w-4 h-4 stroke-[2.2]" />
                        </div>
                      )}

                      <div
                        className={`rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-xs ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-br-none shadow-blue-500/10'
                            : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none shadow-slate-100'
                        }`}
                      >
                        {msg.sender === 'user' ? (
                          <p className="whitespace-pre-wrap font-medium">{msg.text}</p>
                        ) : (
                          <div>{renderFormattedText(msg.text)}</div>
                        )}
                      </div>
                    </div>

                    {/* Quick Interactive Actions inside AI message */}
                    {msg.sender === 'ai' && msg.quickActions && msg.quickActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 ml-9 max-w-[90%]">
                        {msg.quickActions.map((action, aIdx) => (
                          <button
                            key={aIdx}
                            onClick={() => {
                              if (action.chatQuery) {
                                handleSendMessage(action.chatQuery);
                              } else if (action.pageTarget) {
                                handleActionClick(action.pageTarget);
                              }
                            }}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold shadow-2xs transition-all hover:scale-102 cursor-pointer active:scale-95 ${
                              action.chatQuery
                                ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 hover:text-amber-950 border border-amber-200/90 hover:border-amber-300'
                                : 'bg-white hover:bg-blue-50 text-blue-700 hover:text-blue-900 border border-blue-200/80'
                            }`}
                          >
                            <span>{action.label}</span>
                            {action.chatQuery ? (
                              <Sparkles className="w-3 h-3 text-orange-500" />
                            ) : (
                              <ArrowRight className="w-3 h-3 text-blue-600" />
                            )}
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
                    placeholder="Ask about emails, company journey, ERP, AI..."
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
