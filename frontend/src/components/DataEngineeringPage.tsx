import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface DataEngineeringPageProps {
  onNavigateContact?: () => void;
}

export const DataEngineeringPage: React.FC<DataEngineeringPageProps> = ({ onNavigateContact }) => {
  const [openTiles, setOpenTiles] = useState<Record<number, boolean>>({ 1: true });
  const [pipelineHoverKey, setPipelineHoverKey] = useState(0);
  const [hoveredStageIdx, setHoveredStageIdx] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Data Engineering Services | Clyptus';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Data engineering that turns raw data into decisions. Clyptus builds scalable, secure, and reliable pipelines, warehouses, and lakehouses across Azure, AWS, GCP, Databricks, and Snowflake.'
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



  const toggleTile = (id: number) => {
    setOpenTiles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const stages = [
    { num: '01', name: 'Sources', chips: ['ERP', 'CRM', 'Applications', 'Files'] },
    { num: '02', name: 'Ingest', chips: ['ETL', 'ELT', 'Streaming'] },
    { num: '03', name: 'Transform', chips: ['Spark', 'dbt', 'Python', 'SQL'] },
    { num: '04', name: 'Store', chips: ['Warehouse', 'Data lake', 'Lakehouse'] },
    { num: '05', name: 'Serve', chips: ['BI & reporting', 'AI & ML'] },
  ];

  const figures = [
    { value: '6', caption: 'Core data engineering services' },
    { value: '18+', caption: 'Platforms and technologies we build on' },
    { value: '9', caption: 'Tool and technology categories' },
    { value: '5', caption: 'Clyptus services connected to your data' },
  ];

  const services = [
    {
      num: '01',
      short: 'PIPELINES',
      title: 'Data Pipeline Development',
      desc: 'Move data from every source into one place, in batch or in real time, with automated and monitored workflows.',
      subs: [
        'ETL (Extract, Transform, Load)',
        'ELT Pipeline Development',
        'Real-Time Data Processing',
        'Batch Data Processing',
        'Data Workflow Automation',
      ],
    },
    {
      num: '02',
      short: 'WAREHOUSE',
      title: 'Data Warehousing',
      desc: 'Model and consolidate business data into a fast, trusted warehouse built for reporting and analytics.',
      subs: [
        'Enterprise Data Warehouse (EDW)',
        'Data Warehouse Design',
        'Data Modeling',
        'Data Integration',
        'Data Warehouse Optimization',
      ],
    },
    {
      num: '03',
      short: 'LAKEHOUSE',
      title: 'Data Lake & Lakehouse Solutions',
      desc: 'Store structured and unstructured data at scale and process it with a modern lakehouse architecture.',
      subs: [
        'Data Lake Implementation',
        'Data Lakehouse Architecture',
        'Structured & Unstructured Data Management',
        'Data Storage Optimization',
        'Big Data Processing',
      ],
    },
    {
      num: '04',
      short: 'REAL-TIME',
      title: 'Real-Time Data Engineering',
      desc: 'React to events as they happen with streaming, event-driven processing and live synchronization.',
      subs: [
        'Real-Time Data Streaming',
        'Event-Driven Data Processing',
        'Stream Processing',
        'Message Queue Integration',
        'Real-Time Data Synchronization',
      ],
    },
    {
      num: '05',
      short: 'GOVERNANCE',
      title: 'Data Governance & Quality',
      desc: 'Keep data accurate, documented and traceable with quality rules, catalogs, lineage and master data.',
      subs: [
        'Data Quality Management',
        'Data Validation',
        'Data Cataloging',
        'Metadata Management',
        'Data Lineage',
        'Master Data Management (MDM)',
      ],
    },
    {
      num: '06',
      short: 'CLOUD',
      title: 'Cloud Data Engineering',
      desc: 'Migrate, integrate and optimize your data platform on Azure, AWS and Google Cloud.',
      subs: [
        'Cloud Data Migration',
        'Cloud Data Integration',
        'Cloud Data Warehousing',
        'Data Infrastructure Management',
        'Cloud Data Optimization',
      ],
    },
  ];

  const areas = [
    {
      num: '01',
      title: 'Data Pipeline & Integration',
      items: ['ETL / ELT Development', 'Data Integration', 'Pipeline Automation'],
    },
    {
      num: '02',
      title: 'Data Warehousing & Lakehouse',
      items: ['Enterprise Data Warehouse', 'Data Lake Implementation', 'Lakehouse Architecture'],
    },
    {
      num: '03',
      title: 'Cloud Data Engineering',
      items: ['Azure Data Engineering', 'AWS Data Engineering', 'Google Cloud Data Engineering'],
    },
    {
      num: '04',
      title: 'Big Data & Real-Time Processing',
      items: ['Apache Spark', 'Kafka Streaming', 'Real-Time Analytics'],
    },
    {
      num: '05',
      title: 'Data Governance & Management',
      items: ['Data Quality', 'Data Security', 'Data Cataloging', 'Data Lineage'],
    },
    {
      num: '06',
      title: 'Data Migration & Modernization',
      items: ['Legacy Data Migration', 'Cloud Migration', 'Data Platform Modernization'],
    },
  ];

  const platforms = [
    {
      id: 'A',
      label: 'Microsoft Data Engineering',
      items: [
        { name: 'Azure Data Factory', desc: 'ETL and data integration pipelines' },
        { name: 'Microsoft Fabric', desc: 'Unified data engineering and analytics' },
        { name: 'Azure Synapse Analytics', desc: 'Enterprise analytics and data warehousing' },
      ],
    },
    {
      id: 'B',
      label: 'AWS Data Engineering',
      items: [
        { name: 'AWS Glue', desc: 'ETL and data integration' },
        { name: 'Amazon Redshift', desc: 'Cloud data warehousing' },
        { name: 'Amazon S3', desc: 'Data lake storage' },
        { name: 'Amazon Kinesis', desc: 'Real-time data streaming' },
        { name: 'Amazon EMR', desc: 'Big data processing' },
      ],
    },
    {
      id: 'C',
      label: 'Google Cloud Data Engineering',
      items: [
        { name: 'BigQuery', desc: 'Data warehousing and analytics' },
        { name: 'Dataflow', desc: 'Batch and stream processing' },
        { name: 'Dataproc', desc: 'Apache Spark and Hadoop processing' },
        { name: 'Pub/Sub', desc: 'Event streaming and messaging' },
        { name: 'Cloud Data Fusion', desc: 'Data integration' },
      ],
    },
    {
      id: 'D',
      label: 'Other Data Engineering Platforms',
      items: [
        { name: 'Databricks', desc: 'Lakehouse and big data engineering' },
        { name: 'Snowflake', desc: 'Cloud data warehousing' },
        { name: 'Apache Spark', desc: 'Distributed data processing' },
        { name: 'Apache Kafka', desc: 'Real-time data streaming' },
        { name: 'Apache Airflow', desc: 'Workflow orchestration' },
        { name: 'dbt', desc: 'Data transformation' },
      ],
    },
  ];

  const tools = [
    { cat: 'Programming', techs: ['Python', 'SQL', 'Scala'] },
    { cat: 'ETL / ELT', techs: ['Azure Data Factory', 'Informatica', 'Talend'] },
    { cat: 'Big Data', techs: ['Apache Spark', 'Hadoop'] },
    { cat: 'Streaming', techs: ['Apache Kafka', 'Flink'] },
    { cat: 'Databases', techs: ['PostgreSQL', 'MySQL', 'Oracle'] },
    { cat: 'Data Warehousing', techs: ['Snowflake', 'Redshift', 'BigQuery'] },
    { cat: 'Orchestration', techs: ['Apache Airflow', 'Dagster'] },
    { cat: 'Data Transformation', techs: ['dbt'] },
    { cat: 'Visualization', techs: ['Power BI', 'Tableau'] },
  ];

  const links = [
    { name: 'AI & Machine Learning', rel: 'Provides clean data for AI models' },
    { name: 'Business Intelligence', rel: 'Supplies data for dashboards and reports' },
    { name: 'ERP', rel: 'Integrates SAP, Oracle and Microsoft business data' },
    { name: 'CRM', rel: 'Consolidates customer and sales data' },
    { name: 'Cybersecurity', rel: 'Protects enterprise data and infrastructure' },
  ];

  const steps = [
    { num: '01', title: 'Assess', desc: 'Map your data sources, quality and goals to find what matters first.' },
    { num: '02', title: 'Architect', desc: 'Design the pipelines, storage and platform that fit your scale and budget.' },
    { num: '03', title: 'Build', desc: 'Develop, test and automate pipelines, models and integrations.' },
    { num: '04', title: 'Govern', desc: 'Add quality checks, catalogs, lineage and access controls.' },
    { num: '05', title: 'Operate', desc: 'Monitor, optimize and support the platform as your data grows.' },
  ];

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
        <span className="text-slate-900">{firstPart} </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
          {secondPart}
        </span>
      </>
    );
  };

  // Procedural cell data generator with glowing and blinking effects (Blue & Orange brand palette)
  const getCellData = (tileIdx: number, cellIdx: number) => {
    // Uniform pseudo-random distribution across all tileIdx and cellIdx
    const n = (cellIdx + 1) * 37 + (tileIdx + 1) * 73;
    const hash = Math.abs(Math.sin(n * 12.9898) * 10000);
    const v = Math.floor(hash) % 10;
    const isOrange = tileIdx % 2 !== 0;
    const isSuperActive = v === 9;
    const isActive = v >= 7;
    const isBlinking = (cellIdx * 3 + tileIdx) % 5 === 0;

    const mainColor = isOrange ? '#f97316' : '#2563eb';
    const glowColor = isOrange ? 'rgba(249, 115, 22, 0.85)' : 'rgba(37, 99, 235, 0.85)';
    const borderColor = isOrange ? 'rgba(254, 215, 170, 0.85)' : 'rgba(191, 219, 254, 0.85)';

    let bg = '';
    let shadow = 'none';

    if (isSuperActive) {
      bg = mainColor;
      shadow = `0 0 10px ${glowColor}`;
    } else if (isActive) {
      const alpha = 0.52 + (v - 7) * 0.2;
      bg = isOrange ? `rgba(249, 115, 22, ${alpha.toFixed(2)})` : `rgba(37, 99, 235, ${alpha.toFixed(2)})`;
      shadow = `0 0 5px ${glowColor}`;
    } else {
      const alpha = 0.12 + v * 0.025;
      bg = isOrange ? `rgba(249, 115, 22, ${alpha.toFixed(2)})` : `rgba(37, 99, 235, ${alpha.toFixed(2)})`;
    }

    const delay = `${((cellIdx * 0.17 + tileIdx * 0.25) % 2.5).toFixed(2)}s`;
    const duration = isSuperActive ? '1.8s' : isBlinking ? '2.2s' : '3s';

    return {
      bg,
      glowColor,
      borderColor,
      isSuperActive,
      isActive,
      isBlinking,
      delay,
      duration,
      isOrange,
      shadow
    };
  };

  return (
    <div className="relative w-full bg-white text-slate-900 font-sans selection:bg-sky-500/20 selection:text-sky-800 overflow-hidden">
      
      {/* ==================================================== */}
      {/* 1. HERO SECTION                                      */}
      {/* ==================================================== */}
      <section className="relative w-full flex flex-col items-center pt-16 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-10 bg-white">
        {/* Subtle Ambient Aurora Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-r from-sky-400/15 via-indigo-400/15 to-purple-400/15 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 w-full max-w-[1320px] flex flex-col items-center">
          
          {/* Centered Hero Content */}
          <div className="w-full max-w-5xl flex flex-col items-center text-center gap-6 sm:gap-7 pb-4">
            {/* Main Hero Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.06] max-w-5xl mx-auto">
              Data engineering that turns raw data into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                decisions.
              </span>
            </h1>

            {/* Subheading */}
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight leading-snug max-w-3xl mx-auto">
              Building scalable, secure and reliable data infrastructure for modern enterprises.
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
              Data engineering is the process of collecting, transforming, processing, storing and managing data to make it reliable, accessible and ready for analytics, reporting and AI applications.
            </p>
          </div>

          {/* From raw data to decisions diagram banner (Interactive left-to-right animated pipeline) */}
          <div 
            onMouseEnter={() => setPipelineHoverKey((prev) => prev + 1)}
            className="w-full mt-8 bg-slate-50/90 rounded-3xl p-8 sm:p-12 lg:p-14 flex flex-col gap-8 shadow-xs border border-slate-200/90 transition-all duration-300 hover:shadow-lg hover:border-blue-300 group/card relative overflow-hidden"
          >
            {/* Top flowing light beam effect across the card on hover */}
            <motion.div
              key={`beam-${pipelineHoverKey}`}
              initial={{ x: '-100%', opacity: 0 }}
              animate={pipelineHoverKey > 0 ? { x: '250%', opacity: [0, 0.8, 0] } : {}}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent pointer-events-none z-20"
            />

            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-mono font-bold tracking-wider text-slate-800 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span>From raw data to decisions</span>
              </div>
              <span className="hidden sm:inline-block text-xs font-mono text-slate-400 font-semibold group-hover/card:text-blue-600 transition-colors">
                Hover to flow pipeline →
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative">
              {stages.map((st, idx) => {
                const isHovered = hoveredStageIdx === idx;
                return (
                  <motion.div
                    key={`${st.num}-${pipelineHoverKey}`}
                    initial={pipelineHoverKey > 0 ? { opacity: 0, x: -32 } : { opacity: 1, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onMouseEnter={() => setHoveredStageIdx(idx)}
                    onMouseLeave={() => setHoveredStageIdx(null)}
                    className="flex flex-col gap-4 group/col cursor-pointer transition-transform duration-200 hover:translate-x-1"
                  >
                    {/* Connecting Tracker with Animated Light Pulse */}
                    <div className="flex items-center gap-2.5 relative">
                      {/* Pulse Dot */}
                      <motion.div
                        animate={
                          pipelineHoverKey > 0
                            ? {
                                scale: [1, 1.4, 1],
                                transition: { delay: idx * 0.12 + 0.1, duration: 0.3 },
                              }
                            : {}
                        }
                        className={`w-3.5 h-3.5 rounded-full transition-all duration-300 shrink-0 ${
                          isHovered
                            ? 'bg-orange-500 ring-4 ring-orange-100 scale-125'
                            : idx % 2 === 0
                            ? 'bg-blue-600 ring-4 ring-blue-100 group-hover/col:ring-blue-200'
                            : 'bg-indigo-600 ring-4 ring-indigo-100 group-hover/col:ring-indigo-200'
                        }`}
                      />

                      {/* Connecting Line Track */}
                      {idx < stages.length - 1 && (
                        <div className="flex-1 h-[2px] bg-slate-200 relative overflow-hidden">
                          <motion.div
                            key={`track-${idx}-${pipelineHoverKey}`}
                            initial={pipelineHoverKey > 0 ? { width: '0%' } : { width: '100%' }}
                            animate={{ width: '100%' }}
                            transition={{
                              duration: 0.35,
                              delay: idx * 0.12 + 0.05,
                              ease: 'easeOut',
                            }}
                            className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500"
                          />
                        </div>
                      )}
                    </div>

                    <div className={`text-xs font-mono font-bold tracking-wider transition-colors duration-200 ${
                      isHovered ? 'text-orange-600' : 'text-blue-600'
                    }`}>
                      {st.num}
                    </div>

                    <div className="font-bold text-xl sm:text-2xl tracking-tight leading-tight text-slate-900 group-hover/col:text-blue-600 transition-colors duration-200">
                      {st.name}
                    </div>

                    <div className="flex flex-col gap-1.5 text-sm sm:text-base leading-snug text-slate-600 font-medium">
                      {st.chips.map((chip, cIdx) => (
                        <motion.span
                          key={cIdx}
                          initial={pipelineHoverKey > 0 ? { opacity: 0, x: -16 } : { opacity: 1, x: 0 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: idx * 0.12 + cIdx * 0.04 + 0.12,
                            ease: 'easeOut',
                          }}
                          className="hover:text-slate-950 transition-colors"
                        >
                          {chip}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 2. FIGURES STRIP                                     */}
      {/* ==================================================== */}
      <section className="w-full flex flex-col items-center border-y border-slate-200/80 bg-slate-50">
        <div className="w-full max-w-[1320px] px-4 sm:px-6 lg:px-10 py-12 sm:py-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {figures.map((fig, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <div className="font-black text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                {fig.value}
              </div>
              <div className="text-sm sm:text-base font-semibold text-slate-700 leading-snug max-w-[220px]">
                {fig.caption}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================== */}
      {/* 3. SERVICE TILES (WHAT WE DO)                        */}
      {/* ==================================================== */}
      <section id="services" className="w-full flex flex-col items-center py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-white">
        <div className="w-full max-w-[1320px] flex flex-col gap-12 sm:gap-14">
          
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-xs font-mono font-bold tracking-wider text-orange-700 uppercase">
              What we do
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Reinvent how your business{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                works with data.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              From automated ingestion pipelines to modern enterprise lakehouses, we build robust data platforms tailored to your business scale.
            </p>
          </div>

          <div className="flex flex-col border-t border-slate-200 divide-y divide-slate-200/80">
            {services.map((tile, tIdx) => {
              const tileId = tIdx + 1;
              const isOpen = !!openTiles[tileId];

              return (
                <div
                  key={tile.num}
                  className="py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
                >
                  {/* Left Column: Abstract Data Grid Visual Card (5 cols) with Glowing & Blinking Boxes */}
                  <div className={`lg:col-span-5 bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col gap-5 shadow-xs transition-all duration-300 hover:shadow-lg ${
                    tIdx % 2 === 0 ? 'hover:border-blue-400/80 hover:shadow-blue-500/10' : 'hover:border-orange-400/80 hover:shadow-orange-500/10'
                  }`}>
                    <div className="flex justify-between items-center text-xs font-mono font-bold tracking-wider text-slate-500">
                      <span className={`font-bold ${tIdx % 2 === 0 ? 'text-blue-600' : 'text-orange-600'}`}>{tile.num}</span>
                      <span>DATA / {tile.short}</span>
                    </div>

                    <div className="grid grid-cols-8 gap-1.5 p-1 bg-white/60 rounded-xl border border-slate-200/60 shadow-inner">
                      {Array.from({ length: 40 }).map((_, cIdx) => {
                        const cell = getCellData(tIdx, cIdx);
                        return (
                          <div
                            key={cIdx}
                            className={`aspect-square rounded-[4px] border transition-all duration-300 relative cursor-pointer ${
                              cell.isSuperActive || cell.isBlinking ? 'animate-pulse' : ''
                            } hover:scale-135 hover:z-20 hover:brightness-125`}
                            style={{
                              backgroundColor: cell.bg,
                              borderColor: cell.borderColor,
                              boxShadow: cell.shadow,
                              animationDuration: cell.duration,
                              animationDelay: cell.delay,
                            }}
                          >
                            {/* Inner subtle glow ping for super-active boxes */}
                            {cell.isSuperActive && (
                              <span
                                className="absolute inset-0 rounded-[4px] animate-ping opacity-50 pointer-events-none"
                                style={{
                                  backgroundColor: cell.isOrange ? '#f97316' : '#2563eb',
                                  animationDuration: '2.4s',
                                  animationDelay: cell.delay,
                                }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Title, Description, and Sub-services (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    <h3 className="font-bold text-2xl sm:text-3xl lg:text-[34px] leading-tight tracking-tight text-slate-900">
                      {renderStyledHeading(tile.title)}
                    </h3>

                    <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-normal max-w-2xl">
                      {tile.desc}
                    </p>

                    <div>
                      <button
                        onClick={() => toggleTile(tileId)}
                        className="bg-transparent border-none py-1.5 text-base font-semibold text-blue-600 hover:text-orange-600 underline underline-offset-4 cursor-pointer transition-colors"
                      >
                        {isOpen ? 'Hide what is included' : 'See what is included'}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="flex flex-wrap gap-2.5 pt-2">
                        {tile.subs.map((sub, sIdx) => (
                          <span
                            key={sIdx}
                            className={`border rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                              (tIdx + sIdx) % 2 === 0
                                ? 'bg-blue-50/70 border-blue-200/80 text-blue-900 hover:bg-blue-100'
                                : 'bg-orange-50/70 border-orange-200/80 text-orange-900 hover:bg-orange-100'
                            }`}
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 4. SOLUTION AREAS                                    */}
      {/* ==================================================== */}
      <section id="areas" className="w-full flex flex-col items-center py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-slate-50/70 border-t border-slate-200/80">
        <div className="w-full max-w-[1320px] flex flex-col gap-12 sm:gap-14">
          
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-wider text-blue-700 uppercase">
              Solution areas
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Start with the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                outcome you need.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              Targeted implementations designed to solve specific data bottlenecks and accelerate time-to-insight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
            {areas.map((area, aIdx) => (
              <div
                key={area.num}
                className={`bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 flex flex-col gap-6 justify-between shadow-xs hover:shadow-md transition-all min-h-[260px] group ${
                  aIdx % 2 === 0 ? 'hover:border-blue-400' : 'hover:border-orange-400'
                }`}
              >
                <div className={`inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                  aIdx % 2 === 0 ? 'bg-blue-50 border-blue-200/80 text-blue-700' : 'bg-orange-50 border-orange-200/80 text-orange-700'
                }`}>
                  <span>AREA {area.num}</span>
                </div>

                <h3 className="font-bold text-2xl sm:text-3xl leading-tight tracking-tight text-slate-900 max-w-[480px]">
                  {renderStyledHeading(area.title)}
                </h3>

                <div className="flex flex-wrap gap-2 mt-auto pt-3">
                  {area.items.map((it, itIdx) => (
                    <span
                      key={itIdx}
                      className="bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 text-sm font-semibold text-slate-800"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 5. PLATFORMS & ECOSYSTEM                             */}
      {/* ==================================================== */}
      <section id="platforms" className="w-full flex flex-col items-center py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-white border-y border-slate-200/80">
        <div className="w-full max-w-[1320px] flex flex-col gap-12 sm:gap-14">
          
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-xs font-mono font-bold tracking-wider text-orange-700 uppercase">
              Platforms &amp; ecosystem
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Built on the platforms{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                enterprises trust.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              We engineer deep integrations across enterprise cloud giants and modern lakehouse leaders.
            </p>
          </div>

          <div className="flex flex-col border-t border-slate-200 divide-y divide-slate-200/80">
            {platforms.map((p) => (
              <div
                key={p.id}
                className="py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start group"
              >
                <div className="lg:col-span-4 flex flex-col gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-orange-600">Platform {p.id}</span>
                  <h3 className="font-bold text-2xl sm:text-3xl leading-tight tracking-tight text-slate-900">
                    {renderStyledHeading(p.label)}
                  </h3>
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  {p.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex flex-col gap-1">
                      <div className="font-bold text-base sm:text-lg leading-snug text-slate-900">
                        {item.name}
                      </div>
                      <div className="text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 6. TOOLS & TECHNOLOGIES                              */}
      {/* ==================================================== */}
      <section id="tools" className="w-full flex flex-col items-center py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-slate-50/60">
        <div className="w-full max-w-[1320px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-wider text-blue-700 uppercase">
              Tools &amp; technologies
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              The stack behind{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                every pipeline.
              </span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
              We work with the languages, engines and tools your teams already know.
            </p>
          </div>

          <div className="lg:col-span-8 flex flex-col border-t border-slate-200 divide-y divide-slate-200/80">
            {tools.map((row, rIdx) => (
              <div
                key={rIdx}
                className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 group"
              >
                <div className="sm:w-[200px] shrink-0 font-bold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                  {row.cat}
                </div>
                <div className="flex-1 flex flex-wrap gap-2">
                  {row.techs.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className={`border rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-all shadow-2xs ${
                        (rIdx + tIdx) % 2 === 0
                          ? 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/60 text-slate-800'
                          : 'bg-white border-slate-200 hover:border-orange-400 hover:bg-orange-50/60 text-slate-800'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 7. CONNECTED SERVICES                                */}
      {/* ==================================================== */}
      <section id="connect" className="w-full flex flex-col items-center py-20 sm:py-28 px-4 sm:px-6 lg:px-10 bg-white border-t border-slate-200/80">
        <div className="w-full max-w-[1320px] flex flex-col gap-12 sm:gap-14">
          
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-xs font-mono font-bold tracking-wider text-orange-700 uppercase">
              Connected services
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              One data foundation behind{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                every Clyptus service.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              Data pipelines seamlessly connect your core applications with downstream intelligence and analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {links.map((link, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden flex flex-col shadow-xs hover:shadow-md hover:border-blue-400 transition-all group"
              >
                <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500" />
                <div className="p-7 sm:p-8 flex flex-col gap-4 flex-1">
                  <div className="self-start text-xs font-mono font-bold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-200/60 rounded-full px-3 py-1">
                    {link.name}
                  </div>
                  <div className="font-bold text-lg sm:text-xl leading-snug tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                    {link.rel}
                  </div>
                  <button
                    onClick={handleContact}
                    className="mt-auto pt-2 font-semibold text-sm sm:text-base text-blue-600 hover:text-orange-600 flex items-center gap-1.5 self-start cursor-pointer transition-colors"
                  >
                    <span>Explore with us</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 8. HOW WE DELIVER (APPROACH)                         */}
      {/* ==================================================== */}
      <section id="approach" className="w-full flex flex-col items-center pt-20 sm:pt-28 pb-24 sm:pb-36 px-4 sm:px-6 lg:px-10 bg-slate-50/70 border-t border-slate-200/80">
        <div className="w-full max-w-[1320px] flex flex-col gap-12 sm:gap-14">
          
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-wider text-blue-700 uppercase">
              How we deliver
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              From first assessment to a platform that{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                runs itself.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              A structured, enterprise-grade engineering methodology delivering high security and reliability at every phase.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {steps.map((st, sIdx) => (
              <div
                key={st.num}
                className={`bg-white text-slate-900 rounded-2xl sm:rounded-3xl p-7 sm:p-8 flex flex-col gap-4 min-h-[260px] shadow-xs border border-slate-200/90 hover:shadow-md hover:-translate-y-1 transition-all group ${
                  sIdx % 2 === 0 ? 'hover:border-blue-400' : 'hover:border-orange-400'
                }`}
              >
                <div className="font-mono font-black text-4xl sm:text-5xl leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
                  {st.num}
                </div>
                <div className={`font-bold text-xl sm:text-2xl leading-snug tracking-tight text-slate-900 mt-auto transition-colors ${
                  sIdx % 2 === 0 ? 'group-hover:text-blue-600' : 'group-hover:text-orange-600'
                }`}>
                  {st.title}
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>





    </div>
  );
};