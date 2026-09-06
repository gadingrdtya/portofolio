import React from 'react'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

export default function Experience() {
  const experiences = [
    {
      role: 'Frontend Web Developer (Freelance)',
      company: 'PT. JUARA ANGKUTAN SEJAHTERA LOGISTIK',
      location: 'Jakarta, Indonesia',
      period: 'May 2025 - June 2025',
      points: [
        'Engineered responsive user interfaces for JasExpress, a logistics and cargo shipping platform',
        'Implemented modern React.js and Tailwind CSS architectures to deliver interactive and engaging web experiences',
        'Developed modular UI components optimized for performance and enhanced user engagement',
        'Ensured cross-browser consistency and responsive design across all screen breakpoints',
      ],
      skills: ['React.js', 'Tailwind CSS', 'JavaScript'],
    },
    {
      role: 'React & Back-End Cohort',
      company: 'ASAH LED BY DICODING',
      location: 'Jakarta, Indonesia',
      period: 'August 2025 - January 2026',
      points: [
        'Mastered modern web application development using React.js for frontend architecture',
        'Integrated AI-based backend systems to enhance application capabilities and logic',
        'Completed an intensive training program focused on scalable web architecture and data management',
        'Implemented AI-powered features to optimize application performance and user experience',
      ],
      skills: ['React.js', 'Tailwind CSS'],
    },
  ]

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="mb-10 sm:mb-14">
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-primary font-bold">
            // 02. EXPERIENCE
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-light-text-primary dark:text-text-primary mt-1">
            WORK HISTORY
          </h2>
        </div>

        {/* Timeline Stepper Container */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-light-border dark:border-border space-y-12 sm:space-y-14">
          {experiences.map((exp, index) => (
            <div key={index} className="relative group">
              {/* Stepper Dot */}
              <span className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-light-surface dark:bg-surface border-2 border-primary group-hover:scale-125 transition-transform" />

              {/* Card Body */}
              <div className="rounded-lg border border-light-border dark:border-border bg-light-surface dark:bg-surface p-6 sm:p-8 group-hover:border-primary transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-black uppercase text-light-text-primary dark:text-text-primary">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-primary mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-light-text-secondary dark:text-text-secondary shrink-0">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-2 mt-4 text-sm text-light-text-secondary dark:text-text-secondary leading-relaxed">
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-light-border dark:border-border">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 text-[11px] font-mono font-bold uppercase rounded border border-light-border dark:border-border bg-neutral-100 dark:bg-[#141414] text-light-text-secondary dark:text-text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
