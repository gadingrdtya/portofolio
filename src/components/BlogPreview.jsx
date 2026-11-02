import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ChevronRight, ArrowRight } from 'lucide-react'
import blogsData from '../data/blogs.json'

export default function BlogPreview() {
  const latestBlogs = blogsData.slice(0, 3)

  if (latestBlogs.length === 0) return null

  return (
    <section id="blog-preview" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-light-border dark:border-border">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading — Matching Projects & Experience exact style */}
        <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-primary font-bold">
              // 05. TECH BLOG & DISPATCH
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-light-text-primary dark:text-text-primary mt-1">
              LATEST ARTICLES
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-light-text-secondary dark:text-text-secondary hover:text-primary dark:hover:text-primary transition-colors"
          >
            <span>LIHAT SEMUA BERITA</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 col on tablet/ipad, 3 col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {latestBlogs.map((blog) => (
            <article
              key={blog.id}
              className="rounded-3xl border border-light-border dark:border-border bg-light-surface dark:bg-surface p-6 sm:p-8 flex flex-col justify-between h-full hover:border-primary transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                {/* Date Header with Blue Calendar Icon */}
                <div className="flex items-center gap-2 text-xs font-semibold text-light-text-primary dark:text-text-primary mb-4">
                  <Calendar className="w-4 h-4 shrink-0 text-light-text-primary dark:text-text-primary" />
                  <span>{blog.date}</span>
                </div>

                {/* Question Hook Headline */}
                <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-light-text-primary dark:text-text-primary group-hover:text-primary transition-colors leading-snug mb-3">
                  <Link to={`/blog/${blog.slug}`}>
                    {blog.title}
                  </Link>
                </h3>

                {/* 2-3 Line Factual Summary */}
                <p className="text-xs sm:text-sm text-light-text-secondary dark:text-text-secondary leading-relaxed line-clamp-3">
                  {blog.summary}
                </p>
              </div>

              {/* Bottom Action: Wrap-safe flex to prevent overlapping on split screen */}
              <div className="pt-5 mt-5 border-t border-light-border/50 dark:border-border/50 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase text-light-text-secondary dark:text-text-secondary truncate max-w-[150px]">
                  {blog.category}
                </span>

                <Link
                  to={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-light-text-primary dark:text-text-primary group-hover:text-primary transition-colors shrink-0 ml-auto"
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
