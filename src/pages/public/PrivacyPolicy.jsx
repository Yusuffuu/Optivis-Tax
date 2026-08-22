import { motion } from 'framer-motion';
import { Shield, Lock, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title="Privacy & Data Protection Policy | Optivis Tax"
        description="Optivis Tax data protection policy. Learn how we protect sensitive corporate and individual financial records."
      />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 bg-linear-to-b from-[#041129] via-[#0A2A66] to-[#041129] text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
            <Lock className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-semibold tracking-wide text-gold-200">
              Data Privacy & Client Privilege
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Privacy & Data Protection Policy
          </h1>

          <p className="text-xs sm:text-sm text-slate-300">
            Last Updated: February 2026 • Kenyan Data Protection Act & GDPR Compliant
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 space-y-6">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-primary">1. Commitment to Confidentiality</h2>
            <p>
              At Optivis Tax & Advisory Partners ("Optivis", "we", "our"), we uphold the highest standards of professional discretion, confidentiality, and data privacy. This Policy details how we collect, process, and secure corporate and personal financial information in accordance with the Kenya Data Protection Act and international privacy principles.
            </p>

            <h2 className="text-lg sm:text-xl font-serif font-bold text-primary">2. Information We Process</h2>
            <p>
              In the course of providing tax advisory, statutory filing, and audit representation services, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Corporate registration documents, PIN certificates, and statutory records.</li>
              <li>Financial statements, payroll records, and electronic tax invoices (e-TIMS).</li>
              <li>Director, shareholder, and executive tax documentation.</li>
              <li>Direct consultation communications exchanged through our 256-bit encrypted client portal.</li>
            </ul>

            <h2 className="text-lg sm:text-xl font-serif font-bold text-primary">3. Purpose of Data Processing</h2>
            <p>
              All client information is utilized strictly to compute statutory returns, structure tax strategies, defend audit inquiries before revenue authorities, and maintain official engagement archives. We do not sell, license, or disclose client records to third parties without prior written instruction.
            </p>

            <h2 className="text-lg sm:text-xl font-serif font-bold text-primary">4. Security & Encryption Standards</h2>
            <p>
              Client records submitted through our portal or during advisory engagements are stored on Tier-IV cloud infrastructure with 256-bit AES encryption at rest and TLS 1.3 in transit.
            </p>

            <h2 className="text-lg sm:text-xl font-serif font-bold text-primary">5. Contact Data Protection Officer</h2>
            <p>
              For data access requests or privacy questions, contact our practice compliance desk at: <br />
              <strong className="text-slate-800">Email:</strong> privacy@optivistax.com <br />
              <strong className="text-slate-800">Office:</strong> Westlands Business Park, 7th Floor, Nairobi, Kenya
            </p>
          </div>
        </div>
      </section>
    </>
  );
}