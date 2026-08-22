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
  FileText
} from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';

const blogPosts = [
  {
    id: 1,
    slug: 'kenya-tax-changes-2024',
    title: 'Key Tax Changes in Kenya for 2024: What Businesses Need to Know',
    excerpt: 'Stay ahead of the latest tax regulatory changes in Kenya. We break down the Finance Act 2024 and its implications for businesses.',
    category: 'Kenyan Tax Updates',
    author: 'James Mwangi',
    date: 'December 15, 2024',
    readTime: '8 min read',
    image: '/blog/tax-changes.jpg',
    featured: true
  },
  {
    id: 2,
    slug: 'international-tax-planning-strategies',
    title: '5 International Tax Planning Strategies for Multinational Corporations',
    excerpt: 'Discover effective tax planning strategies for multinational corporations operating across borders, including transfer pricing optimization.',
    category: 'Global Tax Trends',
    author: 'Amina Hassan',
    date: 'December 10, 2024',
    readTime: '6 min read',
    image: '/blog/international-tax.jpg',
    featured: true
  },
  {
    id: 3,
    slug: 'vat-compliance-guide',
    title: 'The Complete Guide to VAT Compliance in Kenya',
    excerpt: 'Everything you need to know about VAT registration, filing, and compliance in Kenya. A practical guide for business owners.',
    category: 'Guides & FAQs',
    author: 'Sarah Wanjiku',
    date: 'December 5, 2024',
    readTime: '10 min read',
    image: '/blog/vat-guide.jpg',
    featured: false
  },
  {
    id: 4,
    slug: 'tax-audit-preparation',
    title: 'How to Prepare for a Tax Audit: A Step-by-Step Guide',
    excerpt: 'Being prepared for a tax audit can make all the difference. Learn the essential steps to take before, during, and after an audit.',
    category: 'Guides & FAQs',
    author: 'David Ochieng',
    date: 'November 28, 2024',
    readTime: '7 min read',
    image: '/blog/audit-prep.jpg',
    featured: false
  },
  {
    id: 5,
    slug: 'digital-services-tax-kenya',
    title: 'Understanding Digital Services Tax in Kenya',
    excerpt: 'An in-depth analysis of Kenya\'s digital services tax and its impact on online businesses and digital platforms.',
    category: 'Kenyan Tax Updates',
    author: 'James Mwangi',
    date: 'November 20, 2024',
    readTime: '5 min read',
    image: '/blog/digital-tax.jpg',
    featured: false
  },
  {
    id: 6,
    slug: 'transfer-pricing-best-practices',
    title: 'Transfer Pricing Best Practices for East African Businesses',
    excerpt: 'Navigate transfer pricing regulations in East Africa with confidence. Learn best practices for documentation and compliance.',
    category: 'Global Tax Trends',
    author: 'Amina Hassan',
    date: 'November 15, 2024',
    readTime: '9 min read',
    image: '/blog/transfer-pricing.jpg',
    featured: false
  }
];

const categories = [
  { name: 'Kenyan Tax Updates', icon: FileText, count: 12 },
  { name: 'Global Tax Trends', icon: Globe, count: 8 },
  { name: 'Guides & FAQs', icon: TrendingUp, count: 15 }
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <>
      <SEOHead
        title="Insights & Blog"
        description="Stay informed with the latest tax insights, Kenyan tax updates, global tax trends, and practical guides from Optivis Tax experts."
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Insights & Blog</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Expert analysis, tax updates, and practical guides to keep you informed
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-serif font-bold text-primary mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="h-48 bg-primary-100 flex items-center justify-center">
                  <FileText className="w-16 h-16 text-primary-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-sm text-gold font-semibold">{post.category}</span>
                    <span className="text-sm text-gray-400">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    <Link to={`/insights/${post.slug}`} className="hover:text-gold transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                    </div>
                    <Link
                      to={`/insights/${post.slug}`}
                      className="text-gold hover:text-gold-600 font-semibold flex items-center"
                    >
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-lg font-serif font-bold text-primary mb-4">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory('All')}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === 'All'
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                        }`}
                    >
                      All Articles ({blogPosts.length})
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full text-left px-4 py-2 rounded-lg flex items-center justify-between transition-colors ${selectedCategory === category.name
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-50 text-gray-700'
                          }`}
                      >
                        <span className="flex items-center">
                          <category.icon className="w-4 h-4 mr-2" />
                          {category.name}
                        </span>
                        <span>{category.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-primary rounded-xl p-6 text-white">
                  <h3 className="text-lg font-serif font-bold mb-3">Stay Updated</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    Get the latest tax insights delivered to your inbox.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 bg-primary-700 border border-primary-400 rounded-lg focus:outline-none focus:border-gold text-white mb-3"
                  />
                  <button className="btn-secondary w-full text-sm">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      <FileText className="w-12 h-12 text-gray-300" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-xs text-gold font-semibold uppercase">{post.category}</span>
                        <span className="text-xs text-gray-400">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-primary mb-2">
                        <Link to={`/insights/${post.slug}`} className="hover:text-gold transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-gray-500">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}