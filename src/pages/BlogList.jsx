import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, Clock, ArrowRight, ArrowLeft, Sparkles, Tag, Newspaper } from 'lucide-react'
import blogsData from '../data/blogs.json'

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Blog & Tech News | Gading Raditya Pratama'
  }, [])

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(blogsData.map((b) => b.category).filter(Boolean))
    return ['All', ...Array.from(set)]
  }, [])

  // Filtered blogs
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
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-light-text-secondary dark:text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Portofolio</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="mb-12 border-b border-light-border dark:border-border pb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Daily AI Tech Dispatch</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-light-text-primary dark:text-text-primary uppercase">
            Tech <span className="text-primary">Blog & Insights</span>
          </h1>
          <p className="text-sm sm:text-base text-light-text-secondary dark:text-text-secondary mt-2 max-w-2xl">
            Kumpulan artikel dan ringkasan berita teknologi terkini seputar Artificial Intelligence, Software Engineering, dan ekosistem developer modern—dianalisis dan diterbitkan secara otomatis setiap hari.
          </p>
        </div>

        {/* Controls: Search & Category Filter */}
        <div className="mb-10 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-light-text-secondary dark:text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari artikel berdasarkan judul, topik, atau tag..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded border border-light-border dark:border-border bg-light-surface dark:bg-surface text-light-text-primary dark:text-text-primary placeholder-light-text-secondary dark:placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
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

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]'
                    : 'border border-light-border dark:border-border bg-light-surface dark:bg-surface text-light-text-secondary dark:text-text-secondary hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="group flex flex-col rounded-xl overflow-hidden border border-light-border dark:border-border bg-light-surface dark:bg-surface hover:border-primary transition-all duration-300 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
              >
                {/* Cover Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[11px] font-bold uppercase rounded bg-black/80 backdrop-blur-md text-primary border border-white/10">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 text-xs text-light-text-secondary dark:text-text-secondary mb-2.5">
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

                    <h2 className="text-base sm:text-lg font-bold tracking-tight text-light-text-primary dark:text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                      <Link to={`/blog/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-light-text-secondary dark:text-text-secondary mt-2 line-clamp-3">
                      {blog.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-light-border/60 dark:border-border/60 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-light-bg dark:bg-background text-light-text-secondary dark:text-text-secondary"
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
        ) : (
          <div className="text-center py-16 px-4 rounded-xl border border-dashed border-light-border dark:border-border">
            <Newspaper className="w-10 h-10 text-light-text-secondary dark:text-text-secondary mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold text-light-text-primary dark:text-text-primary uppercase">
              Tidak ada artikel yang cocok
            </h3>
            <p className="text-xs text-light-text-secondary dark:text-text-secondary mt-1">
              Coba kata kunci pencarian lain atau pilih kategori "All".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="mt-4 px-4 py-2 rounded text-xs font-bold uppercase bg-primary text-black hover:bg-primary-dark transition-all"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
