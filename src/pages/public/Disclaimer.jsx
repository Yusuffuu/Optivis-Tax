import { motion } from 'framer-motion';
import { Shield, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';

export default function Disclaimer() {
  return (
    <>
      <SEOHead
        title="Regulatory & Legal Disclaimer | Optivis Tax"
        description="Optivis Tax legal and regulatory disclaimer regarding published tax commentary and advisory content."
      />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 bg-linear-to-b from-[#041129] via-[#0A2A66] to-[#041129] text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
            <AlertCircle className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-semibold tracking-wide text-gold-200">
              Regulatory Information
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Legal & Regulatory Disclaimer
          </h1>

          <p className="text-xs sm:text-sm text-slate-300">
            Last Updated: February 2026 • General Information Notice
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 space-y-6">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-primary">1. Nature of Published Tax Intelligence</h2>
            <p>
              The articles, legislative summaries, bulletins, and calculators published on this website are provided solely for general educational and informational purposes. They do not constitute formal legal, accounting, or individualized tax advice.
            </p>

            <h2 className="text-lg sm:text-xl font-serif font-bold text-primary">2. No Automatic Attorney/Practitioner-Client Privilege</h2>
            <p>
              Browsing this website, submitting an inquiry via our contact form, or subscribing to our newsletters does not establish a formal tax practitioner-client relationship. A privileged professional relationship is established solely upon mutual execution of a formal Letter of Engagement.
            </p>

            <h2 className="text-lg sm:text-xl font-serif font-bold text-primary">3. Legislative Amendments & Timeliness</h2>
            <p>
              Tax statutes, statutory rates, and administrative KRA procedures change rapidly. While we strive to maintain up-to-date analysis, past commentary may not reflect subsequent statutory amendments or judicial rulings.
            </p>

            <h2 className="text-lg sm:text-xl font-serif font-bold text-primary">4. Specific Advice Requirement</h2>
            <p>
              Before undertaking any corporate transaction, group reorganization, or statutory filing, corporations and individuals should consult a qualified tax partner from Optivis Tax for an individualized diagnostic based on specific facts.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}