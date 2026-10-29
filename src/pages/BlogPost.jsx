import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Check,
  ExternalLink,
  Tag,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react'
import blogsData from '../data/blogs.json'

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const blog = blogsData.find((b) => b.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (blog) {
      document.title = `${blog.title} | Raditya.dev Blog`
    }
  }, [slug, blog])

  if (!blog) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-heading font-black text-light-text-primary dark:text-text-primary uppercase mb-3">
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

  // Related posts (excluding current)
  const relatedPosts = blogsData.filter((b) => b.id !== blog.id).slice(0, 2)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareTwitter = () => {
    const text = encodeURIComponent(`${blog.title} via @gadingrdtya`)
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const shareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }

  return (
    <article className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-light-border/60 dark:border-border/60">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-light-text-secondary dark:text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Semua Artikel</span>
          </Link>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            {blog.category}
          </span>
        </div>

        {/* Header Metadata */}
        <header className="mb-8">
          <div className="flex items-center gap-3 text-xs text-light-text-secondary dark:text-text-secondary mb-4">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              {blog.date}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              {blog.readTime}
            </span>
            {blog.sourceName && (
              <>
                <span>•</span>
                <span className="hidden sm:inline">Sumber: <b>{blog.sourceName}</b></span>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-light-text-primary dark:text-text-primary uppercase leading-tight mb-6">
            {blog.title}
          </h1>

          <p className="text-base sm:text-lg text-light-text-secondary dark:text-text-secondary leading-relaxed font-medium mb-6">
            {blog.summary}
          </p>

          {/* Author & Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-light-border dark:border-border bg-light-surface dark:bg-surface">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-black font-heading font-black flex items-center justify-center text-sm shadow">
                G
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-light-text-primary dark:text-text-primary">
                  Gading Raditya Pratama
                </p>
                <p className="text-[11px] text-light-text-secondary dark:text-text-secondary">
                  AI Tech Dispatch • Software Engineer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase rounded border border-light-border dark:border-border hover:border-primary hover:text-primary transition-all"
                title="Salin Tautan Artikel"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin' : 'Bagikan'}</span>
              </button>

              <button
                type="button"
                onClick={shareTwitter}
                className="px-2.5 py-1.5 text-xs font-bold uppercase rounded border border-light-border dark:border-border hover:border-primary hover:text-primary transition-all"
                title="Bagikan ke X"
              >
                X
              </button>

              <button
                type="button"
                onClick={shareLinkedIn}
                className="px-2.5 py-1.5 text-xs font-bold uppercase rounded border border-light-border dark:border-border hover:border-primary hover:text-primary transition-all"
                title="Bagikan ke LinkedIn"
              >
                in
              </button>
            </div>
          </div>
        </header>

        {/* Featured Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-light-border dark:border-border shadow-lg mb-10 bg-neutral-900">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Markdown Content */}
        <div className="prose dark:prose-invert max-w-none text-light-text-primary dark:text-text-primary leading-relaxed space-y-5">
          <ReactMarkdown
            components={{
              h2: ({ node, ...props }) => (
                <h2
                  className="text-xl sm:text-2xl font-heading font-black tracking-tight uppercase text-light-text-primary dark:text-text-primary pt-6 pb-2 border-b border-light-border/60 dark:border-border/60 flex items-center gap-2"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-lg sm:text-xl font-bold text-light-text-primary dark:text-text-primary pt-4 text-primary"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p className="text-sm sm:text-base leading-relaxed text-light-text-secondary dark:text-text-secondary" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-light-text-secondary dark:text-text-secondary pl-2" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal list-inside space-y-1.5 text-sm sm:text-base text-light-text-secondary dark:text-text-secondary pl-2" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-primary pl-4 py-2 my-4 italic bg-light-surface/70 dark:bg-surface/70 rounded-r text-light-text-primary dark:text-text-primary text-sm sm:text-base"
                  {...props}
                />
              ),
              img: ({ node, ...props }) => (
                <div className="my-8">
                  <div className="rounded-xl overflow-hidden border border-light-border dark:border-border shadow-md">
                    <img className="w-full max-h-[460px] object-cover" loading="lazy" {...props} />
                  </div>
                  {props.alt && (
                    <p className="text-center text-xs text-light-text-secondary dark:text-text-secondary mt-2 italic">
                      {props.alt}
                    </p>
                  )}
                </div>
              ),
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
                  className="text-xs font-medium px-2.5 py-1 rounded bg-light-surface dark:bg-surface border border-light-border dark:border-border text-light-text-secondary dark:text-text-secondary"
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
                className="inline-flex items-center gap-1.5 text-xs font-bold text-light-text-secondary dark:text-text-secondary hover:text-primary transition-colors"
              >
                <span>Baca Berita Asal ({blog.sourceName})</span>
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
                    className="group block p-4 rounded-xl border border-light-border dark:border-border bg-light-surface dark:bg-surface hover:border-primary transition-all duration-300 shadow-sm"
                  >
                    <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-neutral-900 mb-3">
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-primary">
                      {rel.category}
                    </span>
                    <h3 className="text-sm font-bold tracking-tight text-light-text-primary dark:text-text-primary group-hover:text-primary transition-colors line-clamp-2 mt-1">
                      {rel.title}
                    </h3>
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
