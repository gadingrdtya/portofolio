import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Check,
  ExternalLink,
  Tag,
  ChevronRight
} from 'lucide-react'
import blogsData from '../data/blogs.json'

export default function BlogPost() {
  const { slug } = useParams()
  const [copied, setCopied] = useState(false)

  const blog = blogsData.find((b) => b.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (blog) {
      document.title = `${blog.title} | Raditya.dev`
    }
  }, [slug, blog])

  if (!blog) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-heading font-black text-light-text-primary dark:text-text-primary uppercase mb-3">
          Artikel Tidak Ditemukan
        </h1>
        <p className="text-sm text-light-text-secondary dark:text-text-secondary mb-6">
          Artikel dengan tautan ini tidak tersedia atau mungkin telah dipindahkan.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-bold uppercase bg-primary text-black hover:bg-primary-dark transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Blog</span>
        </Link>
      </div>
    )
  }

  const relatedPosts = blogsData.filter((b) => b.id !== blog.id).slice(0, 2)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareTwitter = () => {
    const text = encodeURIComponent(`${blog.title}`)
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const shareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }

  return (
    <article className="py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-light-border/60 dark:border-border/60">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-light-text-secondary dark:text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Semua Berita</span>
          </Link>

          <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-full border border-light-border dark:border-border bg-light-surface dark:bg-surface text-light-text-secondary dark:text-text-secondary">
            {blog.category}
          </span>
        </div>

        {/* Header Metadata with responsive wrap */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs font-semibold text-light-text-primary dark:text-text-primary mb-4">
            <span className="inline-flex items-center gap-1.5 shrink-0">
              <Calendar className="w-4 h-4" />
              <span>{blog.date}</span>
            </span>
            <span className="text-light-text-secondary/50 dark:text-text-secondary/50">•</span>
            <span className="inline-flex items-center gap-1.5 shrink-0">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime}</span>
            </span>
            {blog.sourceName && (
              <>
                <span className="text-light-text-secondary/50 dark:text-text-secondary/50">•</span>
                <span className="text-light-text-secondary dark:text-text-secondary font-normal shrink-0">
                  Rujukan: <b className="font-semibold text-light-text-primary dark:text-text-primary">{blog.sourceName}</b>
                </span>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-light-text-primary dark:text-text-primary leading-tight mb-6">
            {blog.title}
          </h1>

          <p className="text-base sm:text-lg text-light-text-secondary dark:text-text-secondary leading-relaxed font-normal mb-8">
            {blog.summary}
          </p>

          {/* Author & Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-light-border dark:border-border bg-light-surface dark:bg-surface">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-black font-heading font-black flex items-center justify-center text-sm shadow">
                G
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-light-text-primary dark:text-text-primary">
                  Gading Raditya Pratama
                </p>
                <p className="text-[11px] font-mono text-light-text-secondary dark:text-text-secondary">
                  Tech Explainer & Engineering Dispatch
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold uppercase rounded border border-light-border dark:border-border hover:border-primary hover:text-primary transition-all"
                title="Salin Tautan Artikel"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin' : 'Bagikan'}</span>
              </button>

              <button
                type="button"
                onClick={shareTwitter}
                className="px-3 py-1.5 text-xs font-mono font-bold uppercase rounded border border-light-border dark:border-border hover:border-primary hover:text-primary transition-all"
                title="Bagikan ke X"
              >
                X
              </button>

              <button
                type="button"
                onClick={shareLinkedIn}
                className="px-3 py-1.5 text-xs font-mono font-bold uppercase rounded border border-light-border dark:border-border hover:border-primary hover:text-primary transition-all"
                title="Bagikan ke LinkedIn"
              >
                in
              </button>
            </div>
          </div>
        </header>

        {/* Markdown Content */}
        <div className="prose dark:prose-invert max-w-none text-light-text-primary dark:text-text-primary leading-relaxed space-y-6">
          <ReactMarkdown
            components={{
              h2: ({ node, ...props }) => (
                <h2
                  className="font-heading text-xl sm:text-2xl font-black tracking-tight uppercase text-light-text-primary dark:text-text-primary pt-6 pb-2 border-b border-light-border/60 dark:border-border/60"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="font-heading text-lg sm:text-xl font-bold text-light-text-primary dark:text-text-primary pt-4 text-primary"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p className="text-sm sm:text-base leading-relaxed text-light-text-secondary dark:text-text-secondary font-normal" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-light-text-secondary dark:text-text-secondary pl-2" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-light-text-secondary dark:text-text-secondary pl-2" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-primary pl-4 py-2.5 my-4 italic bg-light-surface/80 dark:bg-surface/80 rounded-r text-light-text-primary dark:text-text-primary text-sm sm:text-base"
                  {...props}
                />
              ),
              img: () => null,
              code: ({ node, inline, ...props }) => (
                <code
                  className="px-1.5 py-0.5 rounded text-xs font-mono bg-light-bg dark:bg-background text-primary border border-light-border dark:border-border"
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-primary underline underline-offset-4 font-semibold hover:text-primary-dark transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>

        {/* Article Footer & Tags */}
        <footer className="mt-12 pt-8 border-t border-light-border dark:border-border">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-primary" />
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-light-surface dark:bg-surface border border-light-border dark:border-border text-light-text-secondary dark:text-text-secondary"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {blog.sourceUrl && (
              <a
                href={blog.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-light-text-secondary dark:text-text-secondary hover:text-primary transition-colors"
              >
                <span>Sumber Kredibel: {blog.sourceName}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-light-border/60 dark:border-border/60">
              <h2 className="text-lg sm:text-xl font-heading font-black tracking-tight text-light-text-primary dark:text-text-primary uppercase mb-6">
                Artikel Terkait Lainnya
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/blog/${rel.slug}`}
                    className="group block p-6 rounded-2xl border border-light-border dark:border-border bg-light-surface dark:bg-surface hover:border-primary transition-all duration-300 shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-light-text-primary dark:text-text-primary mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{rel.date}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold tracking-tight text-light-text-primary dark:text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                    <div className="mt-4 flex items-center gap-1 text-xs font-bold text-light-text-primary dark:text-text-primary group-hover:text-primary">
                      <span>Read Article</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </footer>
      </div>
    </article>
  )
}
