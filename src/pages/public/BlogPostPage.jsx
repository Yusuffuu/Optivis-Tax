import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock,
  ArrowLeft,
  Calendar,
  User,
  Share2,
  Shield,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';
import { mockBlogPosts } from '../../data/mockData';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = mockBlogPosts.find(p => p.slug === slug) || mockBlogPosts[0];

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = encodeURIComponent(post.title);

    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <>
      <SEOHead
        title={`${post.title} | Optivis Tax Insights`}
        description={post.excerpt}
      />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 bg-linear-to-b from-[#041129] via-[#0A2A66] to-[#041129] text-white overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
          <Link
            to="/insights"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gold hover:text-gold-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Insights</span>
          </Link>

          <div className="flex items-center space-x-3">
            <span className="text-[11px] font-semibold text-primary bg-gold px-3 py-0.5 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-slate-300 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-gold" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center space-x-4 text-xs text-slate-300 pt-2 border-t border-white/10">
            <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1 text-gold" /> {post.author}</span>
            <span>•</span>
            <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-gold" /> {post.date || post.publishedDate}</span>
          </div>
        </div>
      </section>

      {/* Article Body Section */}
      <section className="py-16 sm:py-20 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Executive Summary Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200/80 mb-10 space-y-2">
            <div className="flex items-center space-x-2 text-primary font-bold text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Executive Briefing</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans italic">
              "{post.excerpt}"
            </p>
          </div>

          {/* Article Main Text Content */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-sm sm:text-base">
            <p>
              The Kenyan tax and fiscal landscape has undergone considerable transformation with recent amendments introduced by the revenue authority and National Treasury. For corporate directors and financial controllers, staying abreast of these regulatory shifts is paramount to optimizing effective tax rates and avoiding costly statutory penalties.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary pt-4">
              1. Statutory Filing Adjustments & Compliance Mandates
            </h2>
            <p>
              Under recent statutory guidance, entities operating in the manufacturing, services, and digital economy sectors are subject to expanded withholding tax obligations and refined electronic tax invoice documentation standards. Failure to adhere to e-TIMS reconciliation protocols exposes corporations to deduction disallowances during annual returns assessment.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary pt-4">
              2. Cross-Border Transactions & Transfer Pricing Focus
            </h2>
            <p>
              The revenue authority has intensified scrutiny over related-party management fees, software licenses, and cross-border intra-group financing. Having robust, contemporaneous transfer pricing documentation that mirrors genuine economic substance is no longer optional—it is a critical shield against arbitrary tax reassessments.
            </p>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 my-6">
              <h4 className="font-bold text-amber-900 text-xs uppercase font-mono tracking-wider mb-1">
                Strategic Partner Recommendation
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                Prior to the close of each fiscal quarter, management should conduct a comprehensive statutory health check of all VAT input credits, withholding tax certificates, and related-party agreements.
              </p>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary pt-4">
              3. Practical Action Steps for Corporate Management
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
              <li>Conduct an internal audit of all input tax claims against validated e-TIMS records.</li>
              <li>Re-evaluate existing intra-group agreements against updated EAC transfer pricing guidelines.</li>
              <li>Engage certified tax counsel early when responding to pre-assessment audit inquiries from revenue officers.</li>
            </ul>
          </div>

          {/* Social Share & Tags */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-slate-500">Share Analysis:</span>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 rounded-xl bg-slate-100 hover:bg-gold hover:text-primary text-slate-600 transition-colors"
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
              >
                <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 rounded-xl bg-slate-100 hover:bg-gold hover:text-primary text-slate-600 transition-colors"
                aria-label="Share on Twitter"
                title="Share on Twitter"
              >
                <img src="/icons/twitter.svg" alt="Twitter" className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="p-2 rounded-xl bg-slate-100 hover:bg-gold hover:text-primary text-slate-600 transition-colors"
                aria-label="Share on Facebook"
                title="Share on Facebook"
              >
                <img src="/icons/facebook.svg" alt="Facebook" className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
                className="p-2 rounded-xl bg-slate-100 hover:bg-gold hover:text-primary text-slate-600 transition-colors"
                aria-label="Copy link"
                title="Copy link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">Kenyan Tax</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">Finance Act</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">Corporate Compliance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory CTA Banner */}
      <section className="py-20 bg-linear-to-r from-[#0A2A66] via-[#0D3685] to-[#041129] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Need Expert Counsel on This Matter?
          </h2>
          <p className="text-xs sm:text-base text-slate-200 leading-relaxed">
            Schedule a direct consultation with our practice partners to discuss how these legislative provisions apply to your corporate operations.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-linear-to-r from-gold to-gold-300 text-primary font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:scale-102 transition-all active:scale-95"
            >
              <span>Schedule Case Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}