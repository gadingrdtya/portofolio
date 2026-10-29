import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react'
import blogsData from '../data/blogs.json'

export default function BlogPreview() {
  const latestBlogs = blogsData.slice(0, 2)

  if (latestBlogs.length === 0) return null

  return (
    <section id="blog-preview" className="py-20 border-t border-light-border dark:border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Automated Tech Dispatch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-light-text-primary dark:text-text-primary uppercase">
              Tech <span className="text-primary">Blog & News</span>
            </h2>
            <p className="text-sm sm:text-base text-light-text-secondary dark:text-text-secondary mt-1 max-w-xl">
              Ulasan tren kecerdasan buatan, perkembangan software engineering, dan berita teknologi terkini yang diperbarui otomatis setiap hari.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded text-sm font-bold uppercase tracking-wide bg-primary text-black hover:bg-primary-dark transition-all hover:translate-x-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]"
          >
            <span>Lihat Semua Artikel</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {latestBlogs.map((blog) => (
            <article
              key={blog.id}
              className="group flex flex-col rounded-xl overflow-hidden border border-light-border dark:border-border bg-light-surface dark:bg-surface hover:border-primary transition-all duration-300 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-xs font-bold uppercase rounded bg-black/75 backdrop-blur-md text-primary border border-white/10">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-light-text-secondary dark:text-text-secondary mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {blog.date}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-light-text-primary dark:text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                    <Link to={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-light-text-secondary dark:text-text-secondary mt-2 line-clamp-2">
                    {blog.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-light-border/60 dark:border-border/60 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium px-2 py-0.5 rounded bg-light-bg dark:bg-background text-light-text-secondary dark:text-text-secondary"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase text-primary hover:underline ml-2 shrink-0"
                  >
                    <span>Baca</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
