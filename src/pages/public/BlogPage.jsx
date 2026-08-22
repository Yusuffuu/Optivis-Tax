import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  TrendingUp,
  Globe,
  FileText,
  Clock,
  Tag,
  Sparkles,
  Shield
} from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';
import { mockBlogPosts } from '../../data/mockData';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Kenyan Tax Updates', 'Global Tax Trends', 'Guides & FAQs'];

  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory && post.status === 'published';
  });

  const featuredPost = mockBlogPosts.find(p => p.status === 'published');

  return (
    <>
      <SEOHead
        title="Tax Insights, Legislative Updates & Analysis | Optivis Tax Kenya"
        description="Expert analysis, Kenyan Finance Act updates, transfer pricing strategies, and practical statutory tax guides from Optivis Tax senior counsel."
      />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 bg-linear-to-b from-[#041129] via-[#0A2A66] to-[#041129] text-white overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-semibold tracking-wide text-gold-200">
              Executive Tax Intelligence
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
            Insights, Legislative Analysis & <br />
            <span className="text-gradient-gold">Strategic Tax Bulletins</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Timely commentary and practical statutory guidance from our senior practice partners on the Kenyan Finance Act, EAC trade treaties, and international tax frameworks.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 sm:py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Search & Category Filter Toolbar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles, legislation, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto custom-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${selectedCategory === cat
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Article Banner (if exists and no search query) */}
          {!searchTerm && selectedCategory === 'All' && featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-linear-to-br from-[#0A2A66] via-[#082252] to-[#041129] rounded-3xl p-8 sm:p-10 text-white shadow-xl border border-white/10 relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-gold px-3 py-1 rounded-full shadow-xs">
                    Featured Insight
                  </span>
                  <span className="text-xs text-slate-300 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-gold" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                  <Link to={`/insights/${featuredPost.slug}`} className="hover:text-gold-200 transition-colors">
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-3 text-xs text-slate-300">
                    <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1 text-gold" /> {featuredPost.author}</span>
                    <span>•</span>
                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-gold" /> {featuredPost.publishedDate}</span>
                  </div>

                  <Link
                    to={`/insights/${featuredPost.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-gold hover:text-gold-200 transition-colors"
                  >
                    <span>Read Full Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Articles Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-gold/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-semibold text-gold bg-gold/10 px-2.5 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-slate-400 flex items-center text-[11px]">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-primary group-hover:text-gold-600 transition-colors leading-snug">
                      <Link to={`/insights/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{post.publishedDate}</span>
                    <Link
                      to={`/insights/${post.slug}`}
                      className="text-gold font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <h3 className="font-serif font-bold text-slate-700 text-base mb-1">No Articles Found</h3>
              <p className="text-xs text-slate-500">Try adjusting your search criteria or category filter.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}