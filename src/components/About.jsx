import React from 'react'
import { GraduationCap, Award, Cpu, ShieldCheck, CheckCircle2, ExternalLink } from 'lucide-react'

export default function About() {
  const highlights = [
    'Modern Frontend specialization with React.js, Vite & Tailwind CSS',
    'Robust Backend REST API with Node.js, Express.js & MongoDB',
    'Mobile app development with Flutter, integrated with TensorFlow Lite'
  ]

  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="mb-10 sm:mb-14">
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-primary font-bold">
            // 01. ABOUT ME
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-light-text-primary dark:text-text-primary mt-1">
            BACKGROUND & EDUCATION
          </h2>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Description & Highlights */}
          <div className="lg:col-span-5 rounded-lg border border-light-border dark:border-border bg-light-surface dark:bg-surface p-6 sm:p-8 flex flex-col h-full">
            <h3 className="font-heading text-lg font-black uppercase text-light-text-primary dark:text-text-primary">
              CRAFTING SCALABLE DIGITAL EXPERIENCES
            </h3>
            <div className="space-y-4 mt-3">
              <p className="text-sm sm:text-base text-light-text-secondary dark:text-text-secondary leading-relaxed">
                I am an Informatics graduate from Gunadarma University with a strong passion for building end-to-end digital solutions. My expertise spans full-stack web development, where I specialize in crafting modern, responsive frontends using React.js, supported by robust backends using Node.js and MongoDB.
              </p>
              <p className="text-sm sm:text-base text-light-text-secondary dark:text-text-secondary leading-relaxed">
                Additionally, I have hands-on experience in mobile app development with Flutter, including integrating machine learning models via TensorFlow Lite to deliver smart and seamless cross-platform applications.
              </p>
            </div>

            {/* Checklist highlights */}
            <div className="mt-6 pt-6 border-t border-light-border dark:border-border space-y-2.5">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-light-text-primary dark:text-text-primary font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Certification Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
            {/* 1. Education Card */}
            <div className="rounded-lg border border-light-border dark:border-border bg-light-surface dark:bg-surface p-6 hover:border-primary transition-colors flex h-full flex-col">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded bg-primary/10 text-primary shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] font-mono text-primary font-bold uppercase tracking-wider">FORMAL EDUCATION</span>
                  <h4 className="mt-0.5 flex min-h-[40px] items-center font-heading text-base font-black uppercase text-light-text-primary dark:text-text-primary leading-tight">
                    GUNADARMA UNIVERSITY
                  </h4>
                </div>
              </div>
              <div className="mt-4 flex-1">
                <p className="text-xs font-semibold text-light-text-primary dark:text-text-primary">
                  Bachelor of Informatics
                </p>
                <p className="text-xs font-mono text-light-text-secondary dark:text-text-secondary mt-1">
                  2022 - 2026 • Bekasi, Indonesia
                </p>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded bg-primary/15 dark:bg-primary/20 text-xs font-mono font-black text-primary uppercase w-fit">
                GPA: 3.87 / 4.00
              </div>
            </div>

            {/* 2. Education Card */}
            <div className="rounded-lg border border-light-border dark:border-border bg-light-surface dark:bg-surface p-6 hover:border-primary transition-colors flex h-full flex-col">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded bg-primary/10 text-primary shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] font-mono text-primary font-bold uppercase tracking-wider">FORMAL EDUCATION</span>
                  <h4 className="mt-0.5 flex min-h-[40px] items-center font-heading text-base font-black uppercase text-light-text-primary dark:text-text-primary leading-tight">
                    SMAN 59 JAKARTA
                  </h4>
                </div>
              </div>
              <div className="mt-4 flex-1">
                <p className="text-xs font-semibold text-light-text-primary dark:text-text-primary">
                  Science Major
                </p>
                <p className="text-xs font-mono text-light-text-secondary dark:text-text-secondary mt-1">
                  2019 - 2022 • Jakarta, Indonesia
                </p>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono font-black uppercase w-fit invisible">
                GPA: 3.87 / 4.00
              </div>
            </div>
          
            {/* 1. Certification Card */}
            <div className="rounded-lg border border-light-border dark:border-border bg-light-surface dark:bg-surface p-6 hover:border-primary transition-colors flex h-full flex-col">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded bg-primary/10 text-primary shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] font-mono text-primary font-bold uppercase tracking-wider">PROFESSIONAL CERTIFICATION</span>
                  <h4 className="mt-0.5 flex min-h-[40px] items-center font-heading text-base font-black uppercase text-light-text-primary dark:text-text-primary leading-tight">
                    DICODING INDONESIA
                  </h4>
                </div>
              </div>
              <div className="mt-4 flex-1 space-y-1.5">
                <p className="text-xs font-semibold text-light-text-primary dark:text-text-primary">
                  React & Back-End with AI
                </p>
                <p className="text-xs font-mono text-light-text-secondary dark:text-text-secondary leading-relaxed break-words">
                  Issued Jan 2026 • Credential ID: ASAH/GRAD/XXVI-01/R891D5Y0666
                </p>
                <p className="text-[11px] text-light-text-secondary dark:text-text-secondary leading-relaxed pt-1">
                  Focus on scalable React frontend patterns and AI-augmented backend architecture.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-light-border dark:border-border">
                <a
                  href="https://drive.google.com/file/d/1FOeKhadXKBslQWNYpPRAve4sLyQO_466/view?usp=drivesdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-bold uppercase rounded border border-light-border dark:border-border hover:border-primary hover:text-primary dark:hover:text-primary transition-colors text-light-text-primary dark:text-text-primary"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-primary" />
                  <span>Verify Credential</span>
                </a>
              </div>
            </div>

            {/* 2. Certification Card */}
            <div className="rounded-lg border border-light-border dark:border-border bg-light-surface dark:bg-surface p-6 hover:border-primary transition-colors flex h-full flex-col">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded bg-primary/10 text-primary shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] font-mono text-primary font-bold uppercase tracking-wider">PROFESSIONAL CERTIFICATION</span>
                  <h4 className="mt-0.5 flex min-h-[40px] items-center font-heading text-base font-black uppercase text-light-text-primary dark:text-text-primary leading-tight">
                    GOOGLE DEVELOPER
                  </h4>
                </div>
              </div>
              <div className="mt-4 flex-1 space-y-1.5">
                <p className="text-xs font-semibold text-light-text-primary dark:text-text-primary min-h-[32px] flex items-center">
                  UI, Branding, and the Evolving Role of Designers in the AI Era
                </p>
                <p className="text-xs font-mono text-light-text-secondary dark:text-text-secondary leading-relaxed break-words">
                  Issued Jan 2025 • Certificate Number: WYUIUX17012525PT
                </p>
                <p className="text-[11px] text-light-text-secondary dark:text-text-secondary leading-relaxed pt-1">
                  Covering user interface design, branding strategies, and the impact of artificial intelligence on the design industry.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-light-border dark:border-border">
                <a
                  href="https://drive.google.com/file/d/1rpDAIqTQ-Au6Tg7mm8xfheD4pvJOuO8w/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-bold uppercase rounded border border-light-border dark:border-border hover:border-primary hover:text-primary dark:hover:text-primary transition-colors text-light-text-primary dark:text-text-primary"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-primary" />
                  <span>Verify Credential</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
