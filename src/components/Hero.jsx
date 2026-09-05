import React from 'react'
import { ArrowRight, FileText, Send, Sparkles, Terminal, Code2, MapPin } from 'lucide-react'
import { useCvModal } from '../context/CvModalContext'

export default function Hero() {
  const { openCv } = useCvModal()

  return (
    <section className="pt-8 pb-16 sm:pt-14 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-light-border dark:border-border bg-light-surface dark:bg-surface text-xs font-semibold uppercase tracking-wider">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-light-text-secondary dark:text-text-secondary">Available for New Roles & Projects</span>
        </div>

        {/* Browser Window Mockup */}
        <div className="rounded-lg border border-light-border dark:border-border bg-light-surface dark:bg-surface overflow-hidden transition-colors">
          {/* Mockup Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-light-border dark:border-border bg-neutral-100 dark:bg-[#181818]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <span className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span className="ml-3 hidden sm:inline-block text-xs font-mono text-light-text-secondary dark:text-text-secondary">
                ~/portfolio/gading-raditya.jsx
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-light-text-secondary dark:text-text-secondary">
              <span className="inline-block w-2 h-2 rounded-full bg-primary" />
              <span>bash - grp</span>
            </div>
          </div>

          {/* Mockup Content Body (Split Layout) */}
          <div className="p-6 sm:p-10 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
            {/* Left Content */}
            <div className="md:col-span-7 space-y-5">
              <div className="space-y-2">
                <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-primary font-bold">
                  // WEB DEVELOPER ENTHUSIAST & INFORMATICS GRADUATE
                </p>
                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-light-text-primary dark:text-text-primary leading-[1.05]">
                  GADING RADITYA <span className="text-primary">PRATAMA.</span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-light-text-secondary dark:text-text-secondary leading-relaxed">
                Building scalable web applications with <span className="font-semibold text-light-text-primary dark:text-text-primary">React, Node.js, Express, and MongoDB</span>. Also experienced in developing mobile apps with Flutter and Machine Learning integration.
              </p>

              <div className="flex items-center gap-3 pt-1 text-xs font-mono text-light-text-secondary dark:text-text-secondary">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> Jakarta, Indonesia
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5 text-primary" /> Web Dev
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-sm font-black uppercase tracking-wide bg-primary text-black hover:scale-105 active:scale-95 transition-all text-center"
                >
                  <Send className="w-4 h-4" />
                  GET IN TOUCH
                </a>

                <button
                  type="button"
                  onClick={openCv}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-sm font-bold uppercase tracking-wide border border-light-border dark:border-border text-light-text-primary dark:text-text-primary hover:border-primary hover:text-primary dark:hover:text-primary active:scale-95 transition-all text-center"
                >
                  <FileText className="w-4 h-4 text-primary" />
                  VIEW RESUME (PREVIEW)
                </button>
              </div>
            </div>

            {/* Right Content: Profile / Code Card */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="relative w-full max-w-[280px] aspect-[7/8] rounded-lg border-2 border-dashed border-light-border dark:border-border bg-neutral-100 dark:bg-[#161616] p-4 flex flex-col items-center justify-between text-center group hover:border-primary transition-colors">
                <div className="w-full flex justify-between items-center text-[10px] font-mono text-light-text-secondary dark:text-text-secondary">
                  <span>DIM: 280x320</span>
                  <span className="text-primary font-bold">GADING</span>
                </div>

                <div className="my-auto flex flex-col items-center gap-3">
                  <div className="w-24 h-24 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Terminal className="w-12 h-12" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-black uppercase text-light-text-primary dark:text-text-primary">
                      WEB DEV
                    </h2>
                    <p className="text-xs font-mono text-light-text-secondary dark:text-text-secondary mt-1">
                      React • Node • Express • MongoDB
                    </p>
                  </div>
                </div>

                <div className="w-full py-1.5 rounded bg-primary/15 dark:bg-primary/20 text-[11px] font-mono font-bold text-primary uppercase">
                  Verified Developer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
