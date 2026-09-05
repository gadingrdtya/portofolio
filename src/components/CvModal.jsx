import React, { useEffect } from 'react'
import { X, Download, ExternalLink, FileText } from 'lucide-react'
import { useCvModal } from '../context/CvModalContext'

export default function CvModal() {
  const { isOpen, closeCv } = useCvModal()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeCv()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, closeCv])

  if (!isOpen) return null

  const pdfUrl = '/CV_Gading_Raditya_Pratama.pdf'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Preview CV"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm"
      onClick={closeCv}
    >
      <div
        className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-lg border border-neutral-300 dark:border-border bg-white dark:bg-surface overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-300 dark:border-border bg-neutral-100 dark:bg-[#181818]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <span className="w-3 h-3 rounded-full bg-[#10B981]" />
            </div>
            <div className="flex items-center gap-2 pl-2 text-xs sm:text-sm font-semibold tracking-wide uppercase text-neutral-700 dark:text-text-primary">
              <FileText className="w-4 h-4 text-primary" />
              <span>CV_Gading_Raditya_Pratama.pdf</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download="CV_Gading_Raditya_Pratama.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase rounded bg-primary text-black hover:scale-105 transition-transform"
              title="Download CV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase rounded border border-neutral-400 dark:border-border text-neutral-800 dark:text-text-primary hover:border-primary transition-colors"
              title="Buka di Tab Baru"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Buka Tab Baru</span>
            </a>
            <button
              type="button"
              onClick={closeCv}
              aria-label="Tutup modal"
              className="p-1.5 rounded text-neutral-600 dark:text-text-secondary hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 w-full h-full bg-neutral-200 dark:bg-[#121212] overflow-hidden">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0`}
            title="Preview CV Gading Raditya Pratama"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  )
}
