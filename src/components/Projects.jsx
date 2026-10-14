import React from 'react'
import { ExternalLink, CheckCircle, Activity, Smartphone, Server, Layers } from 'lucide-react'
import { GithubIcon } from './SocialIcons'

export default function Projects() {
  const projects = [
    {
      title: 'Dokterklik',
      type: 'Full-Stack Web App',
      tagline: 'Online Doctor Appointment & Consultation System',
      description:
        'End-to-end medical booking web platform featuring multi-role authentication (patient & doctor), dynamic real-time schedule management, and automated online payment gateway integration.',
      keyFeatures: [
        'Secure multi-role authentication for patients and healthcare providers',
        'Interactive real-time doctor schedule management & booking system',
        'Automated online payment gateway processing for medical consultations',
        'Responsive, modern UI designed with accessible patient-first UX flow',
      ],
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      githubUrl: 'https://github.com/gadingrdtya/Dokterklik',
      liveUrl: 'https://dokterklik.gadingrdtya.my.id/',
      image: '/dokterklik.webp',
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      icon: <Activity className="w-5 h-5 text-primary" />,
    },
    {
      title: 'CornDoc',
      type: 'Mobile App & Machine Learning',
      tagline: 'On-Device AI Maize Leaf Disease Detection System',
      description:
        'Intelligent mobile application built with Flutter to detect plant diseases directly via camera or photo gallery, leveraging TensorFlow Lite models for high-speed offline inference alongside Cloud Firestore data sync.',
      keyFeatures: [
        'Instant on-device ML inference without requiring continuous internet access',
        'Camera & gallery integration with digital image preprocessing',
        'Diagnosis history and cloud data synchronization via Firebase Firestore & Storage',
        'Fluid UI enriched with Lottie animations, shimmer placeholders & smart image caching',
      ],
      techStack: ['Flutter', 'Dart', 'TensorFlow Lite', 'Firebase Firestore'],
      githubUrl: 'https://github.com/gadingrdtya/CornDoc',
      liveUrl: 'https://play.google.com/store/apps/details?id=com.corndoc.app&pcampaignid=web_share',
      image: '/corndoc.webp',
      badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      icon: <Smartphone className="w-5 h-5 text-primary" />,
    },
    {
      title: 'Convertify',
      type: 'Full-Stack Web App',
      tagline: 'All-in-One Document Conversion & PDF Toolkit',
      description:
        'Modern, privacy-focused document processing web application engineered for seamless file conversions. Features zero-knowledge client-side PDF manipulation, multi-format document transforms, batch image exports, and optimized file compression without server retention.',
      keyFeatures: [
        'Client-side PDF management enabling secure instant merging, splitting, and page reordering',
        'Multi-format conversion engine supporting PDF to Word, Image to PDF, and PDF to high-res images',
        'Batch processing with interactive drag-and-drop file organization and dynamic ZIP packaging',
        'Zero-knowledge privacy architecture processing sensitive documents locally in the browser'
      ],
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Python', 'Groq AI'],
      githubUrl: 'https://github.com/gadingrdtya/Convertify',
      liveUrl: 'https://convertify.gadingrdtya.my.id/',
      image: '/convertify.webp',
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      icon: <Activity className="w-5 h-5 text-primary" />,
    },
    {
      title: 'ATSify',
      type: 'Full-Stack Web App',
      tagline: 'AI-Powered ATS Resume Builder & Job Matcher',
      description:
        'Comprehensive resume building and optimization platform engineered to streamline job applications. Features an interactive live-preview editor, LLM-powered bullet point & summary enhancement, an intelligent Job Description matcher for ATS compliance scoring, and secure payment processing via Midtrans.',
      keyFeatures: [
        'Interactive real-time ATS-compliant resume builder with live A4 preview and instant PDF export',
        'AI-powered content assistant to transform raw bullet points into high-impact accomplishments',
        'Automated Job Description matching engine analyzing keyword gaps and calculating ATS fit score',
        'Secure user authentication and cloud resume synchronization powered by Supabase and Midtrans payment',
      ],
      techStack: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'Supabase'],
      githubUrl: 'https://github.com/gadingrdtya/ATSify',
      liveUrl: 'https://atsify.gadingrdtya.my.id/',
      image: '/atsify.webp',
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      icon: <Activity className="w-5 h-5 text-primary" />,
    },
    {
      title: 'MockDrop',
      type: '3D WebGL Web App',
      tagline: 'Curated 3D Device Mockup Studio',
      description:
        'Interactive browser-based 3D device showcase studio engineered with Three.js and WebGL. Enables designers and developers to transform raw screenshots into high-fidelity device mockups with real-time screen texture mapping, dynamic camera angle presets, customizable studio backdrops, and instant high-resolution exports.',
      keyFeatures: [
        'Real-time WebGL canvas featuring interactive orbit controls, realistic contact shadows, and studio lighting',
        'Dynamic screen texture mapping with intelligent aspect-ratio fitting across various device viewports',
        'Multi-device catalog supporting flagship smartphones, tablets, modern laptops, and browser frames',
        'High-resolution client-side export engine rendering crisp production-ready images with zero watermarks',
      ],
      techStack: ['React.js', 'Three.js', 'TypeScript', 'Vite', 'Tailwind CSS'],
      githubUrl: 'https://github.com/gadingrdtya/MockDrop',
      liveUrl: 'https://mockdrop.gadingrdtya.my.id/',
      image: '/mockdrop.webp',
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      icon: <Activity className="w-5 h-5 text-primary" />,
    },
    {
      title: 'StockOS',
      type: 'Full-Stack Web App',
      tagline: 'Smart Inventory System',
      description:
        'End-to-end inventory management web application featuring real-time stock monitoring, automated stock-in and stock-out transaction logging, critical inventory alerts, and comprehensive downloadable reporting capabilities.',
      keyFeatures: [
        'Real-time inventory dashboard overview tracking total items, stock-in, and stock-out volumes',
        'Automated tracking and instant alerts for critical low-stock items requiring restock',
        'Comprehensive transaction reporting with date-range filters and export options',
        'Clean, modern, and fully responsive dark-themed UI optimized for seamless multi-device usage',
      ],
      techStack: ['React.js', 'Vite', 'Supabase', 'Tailwind CSS'],
      githubUrl: 'https://github.com/gadingrdtya/StockOS',
      liveUrl: 'https://stockos.gadingrdtya.my.id/',
      image: '/stockos.webp',
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      icon: <Activity className="w-5 h-5 text-primary" />,
    },
  ]

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-primary font-bold">
              // 04. FEATURED PROJECTS
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-light-text-primary dark:text-text-primary mt-1">
              SELECTED WORKS
            </h2>
          </div>
          <a
            href="https://github.com/gadingrdtya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-light-text-secondary dark:text-text-secondary hover:text-primary dark:hover:text-primary transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>EXPLORE GITHUB</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {projects.map((project, index) => (
            <div
              key={index}
              className="rounded-lg border border-light-border dark:border-border bg-light-surface dark:bg-surface p-6 sm:p-8 flex flex-col h-full hover:border-primary transition-all duration-200 group"
            >
              <div className="flex-1 flex flex-col">
                {/* Header Card */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded bg-neutral-100 dark:bg-[#161616] border border-light-border dark:border-border">
                      {project.icon}
                    </div>
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded border ${project.badgeColor}`}
                    >
                      {project.type}
                    </span>
                  </div>

                  {/* Action Link Icons */}
                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded border border-light-border dark:border-border text-light-text-secondary dark:text-text-secondary hover:text-primary hover:border-primary transition-colors"
                      title="Lihat Source Code GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded border border-light-border dark:border-border text-light-text-secondary dark:text-text-secondary hover:text-primary hover:border-primary transition-colors"
                      title={project.title === 'CornDoc' ? 'View On Play Store' : 'Buka Live Demo'}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Project Image Showcase: Clean Flat Neubrutalist Showcase */}
                <div className="relative mb-6 rounded-lg border border-light-border dark:border-border bg-neutral-100/70 dark:bg-[#141414] overflow-hidden group/img transition-colors hover:border-primary">
                  {/* Technical top bar */}
                  <div className="flex items-center justify-between px-3.5 py-2 border-b border-light-border dark:border-border bg-neutral-200/50 dark:bg-[#1a1a1a]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                      <span className="ml-2 text-[11px] font-mono text-light-text-secondary dark:text-text-secondary">
                        {project.title.toLowerCase()}.dev
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase">
                      PREVIEW
                    </span>
                  </div>

                  {/* Clean Stage: fixed height so both cards match, image fits inside */}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex h-48 sm:h-56 w-full items-center justify-center overflow-hidden cursor-pointer p-4 sm:p-5"
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} Preview`}
                      className="relative z-10 h-full w-full object-contain transition-transform duration-200 group-hover/img:scale-[1.02]"
                      loading="lazy"
                      width="600"
                      height="340"
                      decoding="async"
                    />

                    {/* Clean Pill Button (No Backdrop Blur, Pure Contrast) */}
                    <div className="absolute inset-0 z-20 bg-black/25 opacity-0 group-hover/img:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded font-heading font-black text-xs uppercase tracking-wider bg-primary text-black">
                        <ExternalLink className="w-3.5 h-3.5" />
                        {project.title === 'CornDoc' ? 'View on Play Store' : 'Visit Live App'}
                      </span>
                    </div>
                  </a>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-heading text-2xl font-black uppercase text-light-text-primary dark:text-text-primary group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-primary font-bold mt-1">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-light-text-secondary dark:text-text-secondary mt-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Features List */}
                <div className="mt-5 space-y-2">
                  <span className="text-[11px] font-mono text-light-text-secondary dark:text-text-secondary uppercase font-bold tracking-wider">
                    KEY CAPABILITIES:
                  </span>
                  {project.keyFeatures.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-light-text-secondary dark:text-text-secondary">
                      <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: Tech Stack Pills & Direct Links */}
              <div className="mt-6 pt-5 border-t border-light-border dark:border-border space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-light-text-secondary dark:text-text-secondary uppercase font-bold tracking-wider block mb-2">
                    TECH STACK:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-[11px] font-mono font-semibold uppercase rounded bg-neutral-100 dark:bg-[#161616] border border-light-border dark:border-border text-light-text-primary dark:text-text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold uppercase rounded border border-light-border dark:border-border hover:border-primary text-light-text-primary dark:text-text-primary transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub Repo</span>
                  </a>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold uppercase rounded bg-amber-400 dark:bg-primary text-neutral-950 hover:scale-[1.02] transition-transform"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{project.title === 'CornDoc' ? 'View On Play Store' : 'Live Demo'}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
