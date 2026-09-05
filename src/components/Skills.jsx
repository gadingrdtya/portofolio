import React from 'react'
import { Code, Database, Layout, Smartphone, Server, GitBranch, Cpu, Layers } from 'lucide-react'

export default function Skills() {
  const stackItemsRow1 = [
    'REACT.JS',
    'NODE.JS',
    'EXPRESS.JS',
    'JAVASCRIPT',
    'POSTGRESQL',
    'MONGODB',
    'TAILWIND CSS',
    'FLUTTER',
    'TENSORFLOW LITE',
  ]

  const stackItemsRow2 = [
    'FIREBASE',
    'GIT',
    'GITHUB',
    'GITLAB',
    'POSTMAN',
    'CANVA',
    'FIGMA',
    'PHP',
    'VISUAL STUDIO CODE',
  ]

  const categories = [
    {
      title: 'Frontend Development',
      icon: <Layout className="w-5 h-5 text-primary" />,
      skills: ['React.js', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
    },
    {
      title: 'Backend & Database',
      icon: <Server className="w-5 h-5 text-primary" />,
      skills: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'PHP', 'Supabase', 'Firebase'],
    },
    {
      title: 'Mobile & Machine Learning',
      icon: <Cpu className="w-5 h-5 text-primary" />,
      skills: ['Flutter', 'Dart', 'TensorFlow Lite', 'Digital Image Processing'],
    },
    {
      title: 'Tools & Workflow',
      icon: <GitBranch className="w-5 h-5 text-primary" />,
      skills: ['Git', 'GitHub', 'GitLab', 'Postman', 'Figma', 'Visual Studio Code'],
    },
  ]

  return (
    <section id="skills" className="py-16 sm:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-10">
        <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-primary font-bold">
          // 03. TECH STACK
        </p>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-light-text-primary dark:text-text-primary mt-1">
          SKILLS & CAPABILITIES
        </h2>
      </div>

      {/* Infinite Marquee Banner (Dual Row) */}
      <div className="w-full bg-amber-400 dark:bg-primary py-3 overflow-hidden select-none border-y border-neutral-300 dark:border-primary">
        {/* Row 1 - Left translation */}
        <div className="flex w-max animate-marquee-left whitespace-nowrap">
          {[...stackItemsRow1, ...stackItemsRow1, ...stackItemsRow1].map((item, idx) => (
            <div key={idx} className="flex items-center text-neutral-900 font-heading font-black text-sm sm:text-base tracking-wider uppercase mx-4">
              <span>{item}</span>
              <span className="ml-8 text-neutral-900/40">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-neutral-200 dark:bg-[#161616] py-3 overflow-hidden select-none border-b border-neutral-300 dark:border-border">
        {/* Row 2 - Right translation */}
        <div className="flex w-max animate-marquee-right whitespace-nowrap">
          {[...stackItemsRow2, ...stackItemsRow2, ...stackItemsRow2].map((item, idx) => (
            <div key={idx} className="flex items-center text-neutral-700 dark:text-text-primary font-heading font-black text-xs sm:text-sm tracking-wider uppercase mx-4">
              <span>{item}</span>
              <span className="ml-8 text-amber-600 dark:text-primary">●</span>
            </div>
          ))}
        </div>
      </div>

      {/* Categorized Skills Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-light-border dark:border-border bg-light-surface dark:bg-surface p-6 hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded bg-primary/10 text-primary">
                  {cat.icon}
                </div>
                <h3 className="font-heading text-lg font-black uppercase text-light-text-primary dark:text-text-primary">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 text-xs font-mono font-bold uppercase rounded border border-light-border dark:border-border bg-neutral-100 dark:bg-[#161616] text-light-text-primary dark:text-text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
