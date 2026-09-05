import React from 'react'
import { Mail, Phone, MessageSquare, ArrowUpRight, Send, Heart } from 'lucide-react'
import { LinkedinIcon, GithubIcon, InstagramIcon } from './SocialIcons'

export default function Footer() {
  const contactMethods = [
    {
      label: 'Direct WhatsApp',
      value: '+62 857-7807-2040',
      href: 'https://wa.me/6285778072040',
      icon: <MessageSquare className="w-5 h-5 text-black" />,
      subtext: 'Quick Response & Instant Chat',
    },
    {
      label: 'Direct Email',
      value: 'gadingraditya77@gmail.com',
      href: 'mailto:gadingraditya77@gmail.com',
      icon: <Mail className="w-5 h-5 text-black" />,
      subtext: 'Inquiries & Opportunities',
    },
  ]

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/gadingraditya', icon: <LinkedinIcon className="w-4 h-4" /> },
    { name: 'GitHub', url: 'https://github.com/gadingrdtya', icon: <GithubIcon className="w-4 h-4" /> },
    { name: 'Instagram', url: 'https://instagram.com/gadingradityaa', icon: <InstagramIcon className="w-4 h-4" /> },
  ]

  return (
    <footer id="contact" className="relative mt-20 sm:mt-28 border-t-2 border-neutral-300 dark:border-primary">
      {/* Massive Orange Banner */}
      <div className="relative bg-amber-400 dark:bg-primary overflow-hidden px-4 sm:px-6 py-16 sm:py-24">
        {/* Background Large Faded Typography Watermark */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-5 dark:opacity-10 overflow-hidden"
        >
          <span className="font-heading text-[18vw] font-black uppercase text-neutral-900 leading-none whitespace-nowrap">
            RADITYA DEV
          </span>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-900/80 font-black">
              // 05. GET IN TOUCH
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
              LET'S BUILD SOMETHING TOGETHER.
            </h2>
            <p className="text-sm sm:text-base font-medium text-neutral-900/85">
              Open for Software Engineering roles, freelance collaborations, and technical discussions.
            </p>
          </div>

          {/* Floating Contact Cards on top of Orange Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {contactMethods.map((method, idx) => (
              <a
                key={idx}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-lg border border-neutral-300 dark:border-black bg-white dark:bg-[#181818] p-4 sm:p-6 flex items-center justify-between transition-transform duration-200 hover:-translate-y-1 shadow-sm overflow-hidden"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1 mr-2">
                  <div className="p-2.5 sm:p-3 rounded bg-amber-400 dark:bg-primary text-black font-black shrink-0">
                    {method.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase text-neutral-500 dark:text-text-secondary tracking-wider block">
                      {method.label}
                    </span>
                    <span className="font-heading text-sm sm:text-base font-black text-neutral-900 dark:text-text-primary group-hover:text-amber-600 dark:group-hover:text-primary transition-colors block break-all leading-snug">
                      {method.value}
                    </span>
                    <span className="text-[11px] sm:text-xs text-neutral-600 dark:text-text-secondary mt-0.5 block">
                      {method.subtext}
                    </span>
                  </div>
                </div>

                <div className="p-2 rounded border border-neutral-300 dark:border-border text-neutral-600 dark:text-text-secondary group-hover:bg-amber-400 dark:group-hover:bg-primary group-hover:text-black group-hover:border-black transition-colors shrink-0">
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </a>
            ))}
          </div>

          {/* Direct CTA Button */}
          <div className="flex justify-center mt-10">
            <a
              href="mailto:gadingraditya77@gmail.com?subject=Job%20Opportunity%20/%20Collaboration"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-heading font-black text-sm uppercase tracking-wider bg-neutral-900 text-white hover:bg-black hover:scale-105 transition-all text-center"
            >
              <Send className="w-4 h-4 text-amber-400 dark:text-primary" />
              <span>SEND EMAIL NOW</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sub-Footer Bottom Bar */}
      <div className="bg-neutral-950 text-neutral-400 py-8 px-4 sm:px-6 border-t border-neutral-800">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-primary font-bold">© {new Date().getFullYear()}</span>
            <span className="text-neutral-300 font-bold uppercase">Gading Raditya Pratama</span>
            <span className="hidden sm:inline">— All rights reserved.</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors uppercase font-bold py-1"
              >
                {social.icon}
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
