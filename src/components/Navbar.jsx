import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon, FileText, Menu, X, Sparkles } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useCvModal } from '../context/CvModalContext'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { openCv } = useCvModal()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isHome = location.pathname === '/'
  const isBlog = location.pathname.startsWith('/blog')

  const navLinks = [
    { label: 'About', hash: '#about' },
    { label: 'Experience', hash: '#experience' },
    { label: 'Tech Stack', hash: '#skills' },
    { label: 'Projects', hash: '#projects' },
    { label: 'Blog', path: '/blog', isSpecial: true },
    { label: 'Contact', hash: '#contact' },
  ]

  const handleNavClick = (link, e) => {
    if (link.path) {
      // It's a route navigation
      setMobileMenuOpen(false)
      return
    }

    if (!isHome) {
      e.preventDefault()
      setMobileMenuOpen(false)
      navigate(`/${link.hash}`)
      setTimeout(() => {
        const el = document.querySelector(link.hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-light-bg/85 dark:bg-background/85 border-b border-light-border dark:border-border transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          aria-label="Home Raditya.dev"
          className="flex items-center gap-2 group"
          onClick={() => {
            if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-heading font-black text-black text-lg group-hover:scale-105 transition-transform">
            G
          </div>
          <span className="font-heading text-lg sm:text-xl tracking-tight text-light-text-primary dark:text-text-primary font-black uppercase">
            RADITYA<span className="text-primary">.DEV</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            if (link.path) {
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-sm font-semibold tracking-wide uppercase transition-colors flex items-center gap-1 ${
                    isBlog
                      ? 'text-primary font-bold'
                      : 'text-light-text-secondary dark:text-text-secondary hover:text-primary dark:hover:text-primary'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                </Link>
              )
            }

            return (
              <a
                key={link.label}
                href={isHome ? link.hash : `/${link.hash}`}
                onClick={(e) => handleNavClick(link, e)}
                className="text-sm font-semibold tracking-wide uppercase text-light-text-secondary dark:text-text-secondary hover:text-primary dark:hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* CV Button */}
          <button
            type="button"
            onClick={openCv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold uppercase rounded border border-light-border dark:border-border text-light-text-primary dark:text-text-primary hover:border-primary hover:text-primary dark:hover:text-primary transition-all"
            title="Lihat CV"
          >
            <FileText className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline">Preview CV</span>
            <span className="sm:hidden">CV</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded border border-light-border dark:border-border text-light-text-primary dark:text-text-primary hover:border-primary transition-colors"
            title={`Mode: ${theme === 'dark' ? 'Dark' : 'Light'}`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-primary animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-primary" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded border border-light-border dark:border-border text-light-text-primary dark:text-text-primary"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-light-border dark:border-border bg-light-surface dark:bg-surface px-4 py-4 space-y-3">
          {navLinks.map((link) => {
            if (link.path) {
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-sm font-bold uppercase tracking-wide py-1 ${
                    isBlog ? 'text-primary' : 'text-light-text-secondary dark:text-text-secondary hover:text-primary'
                  }`}
                >
                  {link.label} ✦
                </Link>
              )
            }
            return (
              <a
                key={link.label}
                href={isHome ? link.hash : `/${link.hash}`}
                onClick={(e) => handleNavClick(link, e)}
                className="block text-sm font-bold uppercase tracking-wide text-light-text-secondary dark:text-text-secondary hover:text-primary py-1"
              >
                {link.label}
              </a>
            )
          })}
          <div className="pt-2 border-t border-light-border dark:border-border">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false)
                openCv()
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase rounded bg-primary text-black"
            >
              <FileText className="w-4 h-4" />
              Preview Curriculum Vitae
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
