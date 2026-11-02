import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, ChevronRight, ArrowLeft, Newspaper } from 'lucide-react'
import blogsData from '../data/blogs.json'

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Tech Dispatch & Articles | Gading Raditya Pratama'
  }, [])

  const categories = useMemo(() => {
    const set = new Set(blogsData.map((b) => b.category).filter(Boolean))
    return ['All', ...Array.from(set)]
  }, [])

  const filteredBlogs = useMemo(() => {
    return blogsData.filter((blog) => {
      const matchCat = selectedCategory === 'All' || blog.category === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      const matchQuery =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.summary.toLowerCase().includes(query) ||
        (blog.tags && blog.tags.some((t) => t.toLowerCase().includes(query)))
      return matchCat && matchQuery
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-light-text-secondary dark:text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Portofolio</span>
          </Link>
        </div>

        {/* Section Heading — Neubrutalist Style */}
        <div className="mb-12 border-b border-light-border dark:border-border pb-8">
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-primary font-bold">
            // 05. TECH BLOG & DISPATCH
          </p>
          <h1 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-light-text-primary dark:text-text-primary mt-1">
            TECH ARTICLES & EXPLAINERS
          </h1>
          <p className="text-sm sm:text-base text-light-text-secondary dark:text-text-secondary mt-3 max-w-2xl leading-relaxed">
            Berita dan analisis mendalam seputar perkembangan frontier AI, model LLM terbaru, dan arsitektur software masa kini yang dikurasi dari media teknologi terkemuka dunia.
          </p>
        </div>

        {/* Controls: Search & Category Chips */}
        <div className="mb-10 space-y-4">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-light-text-secondary dark:text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari artikel atau topik berita..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-lg border border-light-border dark:border-border bg-light-surface dark:bg-surface text-light-text-primary dark:text-text-primary placeholder-light-text-secondary dark:placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-light-text-secondary dark:text-text-secondary hover:text-primary"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-primary text-black'
                    : 'border border-light-border dark:border-border bg-light-surface dark:bg-surface text-light-text-secondary dark:text-text-secondary hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid: 1 col mobile, 2 col iPad/tablet, 3 col desktop */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="rounded-3xl border border-light-border dark:border-border bg-light-surface dark:bg-surface p-6 sm:p-8 flex flex-col justify-between h-full hover:border-primary transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-light-text-primary dark:text-text-primary mb-4">
                    <Calendar className="w-4 h-4 shrink-0 text-light-text-primary dark:text-text-primary" />
                    <span>{blog.date}</span>
                  </div>

                  <h2 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-light-text-primary dark:text-text-primary group-hover:text-primary transition-colors leading-snug mb-3">
                    <Link to={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-light-text-secondary dark:text-text-secondary leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>
                </div>

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
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-light-border dark:border-border">
            <Newspaper className="w-10 h-10 text-light-text-secondary dark:text-text-secondary mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold text-light-text-primary dark:text-text-primary uppercase">
              Tidak ada artikel yang cocok
            </h3>
            <p className="text-xs text-light-text-secondary dark:text-text-secondary mt-1">
              Coba kata kunci pencarian lain atau pilih kategori "All".
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
