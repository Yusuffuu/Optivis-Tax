import { motion } from 'framer-motion';
import { Shield, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';

export default function TermsOfService() {
  return (
    <>
      <SEOHead
        title="Terms of Engagement & Service | Optivis Tax"
        description="Optivis Tax terms and conditions of professional tax advisory engagement."
      />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 bg-linear-to-b from-[#041129] via-[#0A2A66] to-[#041129] text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
            <FileText className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-semibold tracking-wide text-gold-200">
              Professional Engagement Terms
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Terms of Professional Service
          </h1>

          <p className="text-xs sm:text-sm text-slate-300">
            Last Updated: February 2026 • Governing Laws of the Republic of Kenya
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 space-y-6">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-primary">1. Engagement Scope & Authority</h2>
            <p>
              By accessing this website, registering on our Client Portal, or executing a formal Letter of Engagement with Optivis Tax & Advisory Partners, you acknowledge and agree to these Terms of Professional Service.
            </p>

            <h2 className="text-lg sm:text-xl font-serif font-bold text-primary">2. Professional Standards</h2>
            <p>
              All advisory opinions, returns computations, and representation dossiers are prepared by certified tax practitioners adhering strictly to the Institute of Certified Public Accountants of Kenya (ICPAK) standards and the Tax Procedures Act.
            </p>

            <h2 className="text-lg sm:text-xl font-serif font-bold text-primary">3. Client Responsibilities</h2>
            <p>
              Clients are required to provide complete, accurate, and timely financial documentation. Optivis Tax relies on the veracity of records submitted by client representatives when preparing statutory filings.
            </p>

            <h2 className="text-lg sm:text-xl font-serif font-bold text-primary">4. Digital Portal Usage & Credentials</h2>
            <p>
              Users of the Optivis Client Portal are responsible for maintaining the confidentiality of their login credentials. Any advisory engagement requested through authenticated accounts will be treated as authorized by the entity.
            </p>

            <h2 className="text-lg sm:text-xl font-serif font-bold text-primary">5. Governing Jurisdiction</h2>
            <p>
              These Terms of Service and any contractual disputes arising hereunder shall be governed by and construed in accordance with the laws of Kenya.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}