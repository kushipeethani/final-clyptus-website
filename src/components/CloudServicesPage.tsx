import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp,
  Lock,
  Zap,
  DollarSign,
  ArrowRight
} from 'lucide-react';

interface CloudServicesPageProps {
  onNavigateContact?: () => void;
}

export const CloudServicesPage: React.FC<CloudServicesPageProps> = ({ onNavigateContact }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('aws');
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Cloud & Data Services | Clyptus';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Clyptus delivers scalable cloud and data solutions across AWS, Azure, Google Cloud, and Databricks — modernizing infrastructure, data engineering, and DevOps.'
      );
    }
  }, []);

  const handleContactClick = () => {
    if (onNavigateContact) {
      onNavigateContact();
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCardToggle = (idx: number) => {
    setActiveCardIndex(prev => (prev === idx ? null : idx));
  };

  const heroPlatforms = [
    { num: '01', id: 'aws', name: 'Amazon Web Services', sub: 'Compute, storage, databases, and security' },
    { num: '02', id: 'azure', name: 'Microsoft Azure', sub: 'Enterprise infrastructure, hybrid cloud, and apps' },
    { num: '03', id: 'gcp', name: 'Google Cloud', sub: 'Modern application platforms, BigQuery, and AI' },
    { num: '04', id: 'dbx', name: 'Databricks', sub: 'Unified lakehouse architectures and data engineering' }
  ];

  // The 8 Core Services with High-Quality Images & Sliding Animation
  const coreServices = [
    { 
      title: 'Cloud Consulting & Strategy', 
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
      desc: 'Define your multi-cloud roadmap, evaluate readiness, and build future-proof cloud architectures tailored to enterprise goals.',
      subs: [
        'Cloud readiness assessment', 
        'Cloud adoption strategy', 
        'Cloud architecture design', 
        'Cloud platform selection', 
        'Infrastructure assessment', 
        'Cost and resource planning'
      ] 
    },
    { 
      title: 'Cloud Infrastructure Services (IaaS)', 
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
      desc: 'Deploy resilient compute instances, scalable storage, intelligent load balancers, and secure enterprise network connectivity.',
      subs: [
        'Virtual machine provisioning', 
        'Cloud server management', 
        'Storage management', 
        'Network configuration', 
        'Load balancing', 
        'Infrastructure monitoring', 
        'Backup and disaster recovery'
      ] 
    },
    { 
      title: 'Cloud Application Development (PaaS)', 
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      desc: 'Engineer cloud-native microservices, serverless APIs, and distributed web platforms optimized for continuous deployment.',
      subs: [
        'Cloud-native application development', 
        'Web application deployment', 
        'Backend application development', 
        'API development and management', 
        'Application hosting', 
        'Microservices development', 
        'Serverless application development'
      ] 
    },
    { 
      title: 'Cloud Migration & Modernization', 
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
      desc: 'Seamless migration of mission-critical workloads, databases, and monolithic legacy applications with zero data disruption.',
      subs: [
        'On-premises to cloud migration', 
        'Application migration', 
        'Database migration', 
        'Server migration', 
        'Legacy application modernization', 
        'Cloud transformation', 
        'Post-migration optimization'
      ] 
    },
    { 
      title: 'Cloud Data & Database Services', 
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      desc: 'Modernize enterprise data architectures with high-throughput cloud databases, modern lakehouses, and real-time streaming ETL.',
      subs: [
        'Cloud database management', 
        'Data storage solutions', 
        'Data warehouse implementation', 
        'Data lake development', 
        'ETL/ELT pipeline development', 
        'Data integration', 
        'Database backup and recovery'
      ] 
    },
    { 
      title: 'Cloud Security & Governance', 
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
      desc: 'Zero-trust security postures, automated compliance auditing, cloud IAM governance, and continuous vulnerability telemetry.',
      subs: [
        'Identity and access management', 
        'Network security', 
        'Data encryption', 
        'Security monitoring', 
        'Vulnerability assessment', 
        'Compliance management', 
        'Cloud governance'
      ] 
    },
    { 
      title: 'DevOps & Automation', 
      image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop',
      desc: 'Accelerate release velocity with declarative Infrastructure as Code (IaC), GitOps pipelines, and scalable Kubernetes orchestration.',
      subs: [
        'CI/CD pipeline development', 
        'Infrastructure as Code (IaC)', 
        'Docker containerization', 
        'Kubernetes orchestration', 
        'Deployment automation', 
        'Configuration management', 
        'Monitoring and logging'
      ] 
    },
    { 
      title: 'Cloud Support & Managed Services', 
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
      desc: '24/7 cloud operations monitoring, proactive incident remediation, automated resource scaling, and FinOps cost governance.',
      subs: [
        'Cloud infrastructure monitoring', 
        'Server maintenance', 
        'Incident management', 
        'Performance optimization', 
        'Resource management', 
        'Cost optimization', 
        'Technical support'
      ] 
    }
  ];

  // Platforms Details
  const platformsData: Record<string, {
    label: string;
    name: string;
    kind: string;
    badgeColor: string;
    desc: string;
    colHead: string;
    offerings: string[];
    rows: { cat: string; svc: string }[];
  }> = {
    aws: {
      label: 'AWS',
      name: 'Amazon Web Services (AWS)',
      kind: 'Leading Global Cloud Platform',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      desc: 'We provide end-to-end AWS cloud services that help organizations build, deploy, and manage scalable applications and infrastructure. Our solutions support seamless cloud migrations, elastic compute, distributed storage, resilient networking, managed databases, security postures, and automated delivery pipelines.',
      colHead: 'AWS Services & Stack',
      offerings: [
        'AWS Cloud Consulting',
        'AWS Infrastructure Management',
        'AWS Cloud Migration',
        'AWS Application Development',
        'AWS Database Management',
        'AWS Security & Compliance',
        'AWS DevOps & Automation',
        'AWS Cost & Performance Optimization'
      ],
      rows: [
        { cat: 'Compute', svc: 'EC2, AWS Lambda, ECS, Fargate' },
        { cat: 'Storage', svc: 'S3, EBS, EFS, Glacier' },
        { cat: 'Database', svc: 'Amazon RDS, DynamoDB, Amazon Aurora, Redshift' },
        { cat: 'Networking', svc: 'Amazon VPC, Route 53, CloudFront, Direct Connect' },
        { cat: 'Security', svc: 'AWS IAM, KMS, AWS WAF, GuardDuty, Shield' },
        { cat: 'DevOps', svc: 'CodePipeline, CodeBuild, CodeDeploy, CloudFormation' },
        { cat: 'Monitoring', svc: 'CloudWatch, AWS CloudTrail, X-Ray' },
        { cat: 'Containers', svc: 'Amazon EKS (Kubernetes), Amazon ECS, ECR' }
      ]
    },
    azure: {
      label: 'Microsoft Azure',
      name: 'Microsoft Azure',
      kind: 'Enterprise Hybrid Cloud Platform',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      desc: 'We help businesses leverage Microsoft Azure to build cloud-native applications, orchestrate enterprise infrastructure, modernize legacy core systems, and seamlessly integrate enterprise line-of-business applications with Microsoft ecosystems.',
      colHead: 'Azure Services & Stack',
      offerings: [
        'Azure Cloud Consulting',
        'Azure Infrastructure Management',
        'Azure Cloud Migration',
        'Azure Application Development',
        'Azure Database Services',
        'Azure Security & Governance',
        'Azure DevOps Pipeline Setup',
        'Azure 24/7 Managed Operations'
      ],
      rows: [
        { cat: 'Compute', svc: 'Azure Virtual Machines, Azure Functions, App Services' },
        { cat: 'Storage', svc: 'Azure Blob Storage, Azure Files, Data Lake Storage' },
        { cat: 'Database', svc: 'Azure SQL Database, Cosmos DB, Azure Synapse' },
        { cat: 'Networking', svc: 'Azure Virtual Network, Application Gateway, ExpressRoute' },
        { cat: 'App Platform', svc: 'Azure App Service, API Management, Logic Apps' },
        { cat: 'Containers', svc: 'Azure Kubernetes Service (AKS), Container Instances' },
        { cat: 'Security', svc: 'Microsoft Entra ID, Azure Key Vault, Microsoft Sentinel' },
        { cat: 'DevOps', svc: 'Azure DevOps, Azure Repos, Pipelines & Artifacts' },
        { cat: 'Monitoring', svc: 'Azure Monitor, Log Analytics, Application Insights' }
      ]
    },
    gcp: {
      label: 'Google Cloud',
      name: 'Google Cloud Platform (GCP)',
      kind: 'Advanced Data & AI Cloud Platform',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      desc: 'We deliver Google Cloud solutions that enable organizations to engineer modern containerized applications, manage enterprise data estates, scale high-performance computing, and harness industry-leading data analytics and machine learning tools.',
      colHead: 'Google Cloud Services & Stack',
      offerings: [
        'GCP Cloud Consulting',
        'GCP Infrastructure Engineering',
        'GCP Migration & Cutover',
        'GCP Application Modernization',
        'GCP BigQuery & Data Engineering',
        'GCP Security & IAM',
        'GCP DevOps & GitOps',
        'GCP Continuous Support'
      ],
      rows: [
        { cat: 'Compute', svc: 'Compute Engine, Cloud Run, App Engine' },
        { cat: 'Storage', svc: 'Cloud Storage, Persistent Disk, Filestore' },
        { cat: 'Database', svc: 'Cloud SQL, Cloud Spanner, Firestore, Bigtable' },
        { cat: 'Data Analytics', svc: 'Google BigQuery, Dataproc, Dataflow, Looker' },
        { cat: 'Networking', svc: 'VPC, Cloud Load Balancing, Cloud CDN, Cloud Interconnect' },
        { cat: 'Containers', svc: 'Google Kubernetes Engine (GKE), Artifact Registry' },
        { cat: 'Serverless', svc: 'Cloud Functions, Eventarc, Cloud Workflows' },
        { cat: 'DevOps', svc: 'Cloud Build, Cloud Deploy, Artifact Registry' },
        { cat: 'Security', svc: 'Cloud IAM, Cloud KMS, Security Command Center' },
        { cat: 'Monitoring', svc: 'Google Cloud Monitoring, Cloud Logging, Cloud Trace' }
      ]
    },
    dbx: {
      label: 'Databricks',
      name: 'Databricks Lakehouse Platform',
      kind: 'Unified Data Engineering & AI Platform',
      badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
      desc: 'We engineer cutting-edge data and AI solutions utilizing Databricks. Our practice specializes in unified Lakehouse architectures, distributed Apache Spark processing, streaming data pipelines, production machine learning, and centralized data governance.',
      colHead: 'Databricks Core Technologies',
      offerings: [
        'Databricks Lakehouse Architecture',
        'Spark Data Pipeline Engineering',
        'Unity Catalog Data Governance',
        'Delta Live Tables Automation',
        'Real-Time Streaming Analytics',
        'MLflow Model Deployment',
        'Databricks SQL & BI Dashboards',
        'Platform Migration to Databricks'
      ],
      rows: [
        { cat: 'Platform', svc: 'Databricks Lakehouse, Unified Data Analytics' },
        { cat: 'Processing', svc: 'Apache Spark, Photon Engine, Serverless Compute' },
        { cat: 'Storage Layer', svc: 'Delta Lake, Delta Engine, Parquet' },
        { cat: 'Pipelines', svc: 'Delta Live Tables (DLT), Auto Loader' },
        { cat: 'Data Governance', svc: 'Unity Catalog, Data Lineage, Fine-Grained Access' },
        { cat: 'Machine Learning', svc: 'MLflow, Feature Store, AutoML' },
        { cat: 'BI & Warehousing', svc: 'Databricks SQL, Serverless SQL Warehouses' },
        { cat: 'Orchestration', svc: 'Databricks Workflows, Jobs API, Git Integration' }
      ]
    }
  };

  const currentPlatform = platformsData[selectedPlatform] || platformsData.aws;

  // Cloud Service Models
  const serviceModels = [
    {
      abbr: 'IaaS',
      badge: 'Infrastructure as a Service',
      full: 'Infrastructure as a Service',
      accent: 'border-sky-300 text-sky-700 bg-sky-50',
      desc: 'Provides virtualized computing resources over the cloud — physical servers, virtual machines, raw storage, load balancing, and network perimeters with root operating-system control.',
      examples: 'AWS EC2, Microsoft Azure VMs, Google Compute Engine, VPCs, Object Storage'
    },
    {
      abbr: 'PaaS',
      badge: 'Platform as a Service',
      full: 'Platform as a Service',
      accent: 'border-indigo-300 text-indigo-700 bg-indigo-50',
      desc: 'Delivers a ready-to-run development, build, and runtime framework without server overhead. Developers focus exclusively on application code and API business logic.',
      examples: 'AWS Lambda, Azure App Services, Google Cloud Run, Kubernetes (EKS/AKS/GKE)'
    },
    {
      abbr: 'SaaS',
      badge: 'Software as a Service',
      full: 'Software as a Service',
      accent: 'border-purple-300 text-purple-700 bg-purple-50',
      desc: 'Full-featured enterprise software applications delivered and accessed on-demand over the web with automated security updates, backups, and global availability.',
      examples: 'Salesforce, Microsoft 365, Google Workspace, ServiceNow, Workday'
    }
  ];

  // Business Benefits
  const benefits = [
    {
      title: 'Elastic Scalability & Agility',
      desc: 'Automatically scale computing capacity up or down to match dynamic demand spikes without capital expenditure or provisioning delays.',
      icon: TrendingUp,
      accent: 'text-blue-600 bg-blue-50 border-blue-200/80'
    },
    {
      title: 'Enterprise Security & Compliance',
      desc: 'Defend corporate workloads with zero-trust architectures, end-to-end data encryption, automated posture compliance, and active threat detection.',
      icon: Lock,
      accent: 'text-orange-600 bg-orange-50 border-orange-200/80'
    },
    {
      title: 'High Availability & Speed',
      desc: 'Achieve 99.99% uptime with multi-region redundancy, automated failover, low-latency CDNs, and proactive telemetry.',
      icon: Zap,
      accent: 'text-blue-600 bg-blue-50 border-blue-200/80'
    },
    {
      title: 'FinOps Cost Optimization',
      desc: 'Eliminate idle resources, utilize spot/reserved capacity, optimize licensing, and maintain predictable cloud operational expenditures.',
      icon: DollarSign,
      accent: 'text-orange-600 bg-orange-50 border-orange-200/80'
    }
  ];

  return (
    <div className="relative w-full bg-slate-50 text-slate-900 font-sans selection:bg-sky-500/20 selection:text-sky-800">
      
      {/* ==================================================== */}
      {/* 1. HERO SECTION (HOMEPAGE LIGHT THEME WITH AURORA GLOW) */}
      {/* ==================================================== */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle Ambient Aurora Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-sky-400/15 via-indigo-400/15 to-purple-400/15 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
              Transform Your Business with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                Scalable Cloud Solutions
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              At Clyptus, we deliver comprehensive cloud solutions that help businesses modernize IT infrastructure, accelerate application development, and manage enterprise data efficiently. Our cloud services cover infrastructure management, cloud migration, application development, data engineering, security, and DevOps automation.
            </p>

            <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
              We help organizations build secure, scalable, and reliable cloud environments using leading platforms: AWS, Microsoft Azure, Google Cloud, and Databricks.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleContactClick}
                className="group relative flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Consult Cloud Architects</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Hero Platforms Cards with Hover Sync */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 mb-1">
              Platforms we engineer with
            </span>

            {heroPlatforms.map((p, idx) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                onMouseEnter={() => {
                  setSelectedPlatform(p.id);
                }}
                onClick={() => {
                  setSelectedPlatform(p.id);
                  const el = document.getElementById('platforms');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-400/60 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="flex flex-col gap-1">
                  <div className="text-base font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {p.name}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {p.sub}
                  </div>
                </div>

                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/70 group-hover:bg-sky-50 group-hover:border-sky-200 flex items-center justify-center shrink-0">
                  <span className="font-mono text-xs font-black text-slate-400 group-hover:text-sky-600">
                    {p.num}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 2. CORE SERVICES (THE 8 SERVICE CARDS WITH ANIMATION) */}
      {/* ==================================================== */}
      <section id="cloud-services" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-slate-200/80 bg-white">
        <div className="max-w-[1600px] mx-auto">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs sm:text-sm font-mono font-bold text-orange-600 uppercase tracking-widest block mb-2">
              What we offer
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Main cloud services{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                &amp; sub-services
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium mt-3">
              Eight service lines that Clyptus delivers across every cloud platform we support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {coreServices.map((s, idx) => {
              const isFlipped = activeCardIndex === idx;
              return (
                <div
                  key={s.title}
                  onClick={() => handleCardToggle(idx)}
                  className="group relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Header info - Clean Title */}
                  <div className="p-6 sm:p-8 pb-3 z-10">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                      {s.title}
                    </h3>
                  </div>

                  {/* Mobile View (< sm): Both Image Preview & Matter clearly displayed */}
                  <div className="block sm:hidden px-6 pb-6 pt-1">
                    <div className="w-full h-44 rounded-2xl overflow-hidden shadow-inner border border-slate-100 mb-4">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="space-y-2.5">
                      {s.subs.map((t, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2.5 text-sm text-slate-800 font-semibold leading-snug">
                          <span className="w-2 h-2 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Desktop / Tablet View (sm and above): Smooth Sliding Animation on Hover / Click */}
                  <div className="hidden sm:flex relative flex-1 h-[420px] w-full mx-auto px-6 sm:px-8 pb-7 overflow-hidden flex-col justify-end">
                    
                    {/* Image State */}
                    <div
                      className={`absolute inset-x-6 sm:inset-x-8 bottom-7 top-1 rounded-xl sm:rounded-2xl overflow-hidden shadow-inner border border-slate-100 transition-all duration-500 ease-out transform ${
                        isFlipped
                          ? 'translate-y-full opacity-0 pointer-events-none'
                          : 'translate-y-0 opacity-100 group-hover:translate-y-full group-hover:opacity-0 group-hover:pointer-events-none'
                      }`}
                    >
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Sub-services Matter State */}
                    <div
                      className={`relative h-full flex flex-col justify-center py-2 transition-all duration-500 ease-out transform overflow-hidden ${
                        isFlipped
                          ? 'translate-y-0 opacity-100 pointer-events-auto'
                          : 'translate-y-6 opacity-0 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto'
                      }`}
                    >
                      <div className="space-y-3 overflow-hidden">
                        {s.subs.map((t, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-800 font-semibold leading-snug">
                            <span className="w-2 h-2 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 3. PLATFORMS & TECHNOLOGIES (INTERACTIVE TAB MATRIX) */}
      {/* ==================================================== */}
      <section id="platforms" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            PLATFORMS &amp; TECHNOLOGIES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Expertise Across Leading{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
              Cloud &amp; Data Platforms
            </span>
          </h2>
        </div>

        {/* Tab Buttons with Hover to Display */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {Object.entries(platformsData).map(([key, p]) => {
            const isSelected = selectedPlatform === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedPlatform(key)}
                onMouseEnter={() => setSelectedPlatform(key)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-[1.02]'
                    : 'bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-100 hover:text-slate-950 hover:border-slate-300'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Platform Details Card & Table Split */}
        <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-md flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
          
          {/* Left: Description & Offerings */}
          <div className="lg:w-1/2 flex flex-col gap-5">
            <div className={`self-start px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wide border ${currentPlatform.badgeColor}`}>
              {currentPlatform.kind}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {currentPlatform.name}
            </h3>

            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              {currentPlatform.desc}
            </p>

            <div className="pt-3">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-400 block mb-3">
                Main Service Offerings
              </span>
              <div className="flex flex-wrap gap-2">
                {currentPlatform.offerings.map((off, oIdx) => (
                  <span
                    key={oIdx}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
                  >
                    {off}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Category vs Service Table */}
          <div className="lg:w-1/2 w-full flex flex-col gap-3">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500">
              {currentPlatform.name} Stack &amp; Technologies
            </span>

            <div className="w-full border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
              <div className="flex bg-slate-900 text-white text-xs font-bold font-mono uppercase tracking-wider">
                <div className="w-2/5 p-3.5 pl-4 border-r border-slate-800">Category</div>
                <div className="w-3/5 p-3.5 pl-4">{currentPlatform.colHead}</div>
              </div>

              <div className="divide-y divide-slate-100 bg-white">
                {currentPlatform.rows.map((row, rIdx) => (
                  <div key={rIdx} className="flex text-xs sm:text-sm hover:bg-slate-50/80 transition-colors">
                    <div className="w-2/5 p-3 pl-4 font-bold text-slate-900 bg-slate-50/60 border-r border-slate-100">
                      {row.cat}
                    </div>
                    <div className="w-3/5 p-3 pl-4 text-slate-600 font-medium leading-snug">
                      {row.svc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* ==================================================== */}
      {/* 4. CLOUD SERVICE MODELS (IaaS, PaaS, SaaS)           */}
      {/* ==================================================== */}
      <section className="py-20 sm:py-24 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="max-w-3xl mb-14 text-center mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-orange-700 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              CLOUD SERVICE MODELS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Understand{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                IaaS, PaaS, and SaaS
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium mt-3">
              Comprehensive architectural models aligned to your software and operations strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceModels.map((m) => (
              <div
                key={m.abbr}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
                      {m.abbr}
                    </span>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-md border ${m.accent}`}>
                      {m.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {m.full}
                  </h3>

                  <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80">
                  <span className="text-[11px] font-mono font-bold uppercase text-slate-400 block mb-1">
                    Example Technologies
                  </span>
                  <p className="text-xs font-bold text-slate-800 leading-snug">
                    {m.examples}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 5. BUSINESS BENEFITS                                 */}
      {/* ==================================================== */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            BUSINESS VALUE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Business Benefits of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
              Cloud Services
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const IconComp = b.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 group ${
                  idx % 2 === 0 ? 'hover:border-blue-400' : 'hover:border-orange-400'
                }`}
              >
                <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 mb-1 group-hover:scale-110 transition-transform ${b.accent}`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className={`text-lg font-black text-slate-900 tracking-tight transition-colors ${
                  idx % 2 === 0 ? 'group-hover:text-blue-600' : 'group-hover:text-orange-600'
                }`}>
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default CloudServicesPage;
