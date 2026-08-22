import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  CheckCircle,
  Globe,
  TrendingUp,
  Users,
  ArrowRight,
  Phone,
  Lock,
  Tag,
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';

const services = [
  {
    id: 'advisory',
    icon: Shield,
    title: 'Tax Advisory & Statutory Compliance',
    subtitle: 'Ensure airtight statutory compliance and minimize liabilities',
    tag: 'Compliance Practice',
    basePrice: '45,000',
    description: 'Comprehensive tax compliance reviews, statutory corporate tax returns, monthly VAT & withholding returns, PAYE payroll compliance, and proactive regulatory risk analysis for entities operating in Kenya.',
    deliverables: [
      'Corporate Income Tax (CIT) Annual Computations & Filings',
      'Monthly VAT & Withholding Tax (WHT) Reconciliations',
      'PAYE Payroll Tax Audit & Remittance Checks',
      'Statutory Tax Health Checks & Due Diligence Dossiers',
      'Finance Act Legislative Impact Assessment'
    ],
    benefits: [
      'Eliminate late statutory filing penalties & KRA interest',
      'Maximize allowable business deductions and tax credits',
      'Proactive regulatory alerts on Kenyan tax amendments'
    ]
  },
  {
    id: 'audit',
    icon: CheckCircle,
    title: 'Audit Support & Dispute Defense',
    subtitle: 'Strategic representation during KRA compliance reviews',
    tag: 'Dispute Resolution',
    basePrice: '75,000',
    description: 'Seasoned defense representation and documentation gathering for KRA comprehensive audits, desk reviews, additional assessments, objection letters, and representation before the Tax Appeals Tribunal (TAT).',
    deliverables: [
      'Pre-Audit Risk Diagnostic & Documentation Review',
      'Direct Representation & Defense Meetings with KRA Officers',
      'Preparation of Formal Objection Memorandums',
      'Tax Appeals Tribunal (TAT) Dossier Preparation',
      'Post-Audit Settlement Negotiations & Payment Plans'
    ],
    benefits: [
      'Shield corporate directors from arbitrary assessments',
      'Negotiate fair statutory compromises and penalty waivers',
      'Expert representation by certified tax litigators'
    ]
  },
  {
    id: 'international',
    icon: Globe,
    title: 'International Tax & Cross-Border Structuring',
    tag: 'Cross-Border Practice',
    basePrice: '90,000',
    description: 'Expert cross-border tax structuring, transfer pricing documentation, Double Taxation Agreement (DTA) optimization, regional East African Community (EAC) trade structuring, and expatriate tax planning.',
    deliverables: [
      'Local File & Master File Transfer Pricing Documentation',
      'Double Tax Avoidance Agreement (DTA) Structuring',
      'Cross-Border Management Fees & Royalty Optimization',
      'EAC Customs & Common Market Protocol Structuring',
      'Expatriate Inbound & Outbound Tax Management'
    ],
    benefits: [
      'Mitigate international transfer pricing audit exposure',
      'Eliminate double taxation on cross-border revenue flows',
      'Tax-efficient holding company and regional branch structures'
    ]
  },
  {
    id: 'corporate',
    icon: TrendingUp,
    title: 'Corporate Tax Strategy & Transaction Advisory',
    tag: 'Transactions & M&A',
    basePrice: '80,000',
    description: 'Comprehensive tax due diligence for mergers, acquisitions, equity investments, corporate restructuring, capital allowances optimization, and shareholder exit planning.',
    deliverables: [
      'Buy-Side & Sell-Side Tax Due Diligence Reviews',
      'Pre- & Post-Acquisition Group Tax Structuring',
      'Industrial Building & Capital Allowances Maximization',
      'Share vs. Asset Purchase Tax Optimization',
      'Corporate Reorganization & Spin-Off Planning'
    ],
    benefits: [
      'Uncover hidden historical tax liabilities before deals close',
      'Maximize post-acquisition cash flow through tax depreciation',
      'Structure transactions to minimize capital gains exposure'
    ]
  },
  {
    id: 'personal',
    icon: Users,
    title: 'Executive & Private Wealth Solutions',
    tag: 'Private Clients',
    basePrice: '35,000',
    description: 'Tailored tax advisory for business founders, high-net-worth families, company directors, and expatriate executives, encompassing wealth preservation and succession planning.',
    deliverables: [
      'Personal Income Tax (PIT) Strategy & Annual Returns',
      'Family Business Succession & Trust Tax Structuring',
      'Executive Remuneration & Employee Share Schemes (ESOPs)',
      'Real Estate & Capital Asset Disposal Structuring',
      'Foreign Asset Declaration & Repatriation Counsel'
    ],
    benefits: [
      'Safeguard generational wealth from excessive tax erosion',
      'Ensure 100% compliance with domestic asset reporting',
      'Bespoke, strictly confidential partner-level advisory'
    ]
  }
];

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredServices = activeFilter === 'all'
    ? services
    : services.filter(s => s.id === activeFilter);

  return (
    <>
      <SEOHead
        title="Tax Advisory & Compliance Services | Optivis Tax Kenya"
        description="Explore Optivis Tax's comprehensive services including corporate tax compliance, KRA audit defense, transfer pricing, and international tax planning in Kenya."
      />

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 bg-linear-to-b from-[#041129] via-[#0A2A66] to-[#041129] text-white overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-semibold tracking-wide text-gold-200">
              Specialized Practice Solutions
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
            Strategic Practice Solutions <br />
            <span className="text-gradient-gold">Engineered for Maximum Efficiency</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Delivering statutory certainty, strategic deduction optimization, and vigorous audit protection for corporations and private clients.
          </p>

          {/* Quick Anchor Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeFilter === 'all'
                  ? 'bg-gold text-[#0A2A66] shadow-md font-bold'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10'
                }`}
            >
              All Practice Areas
            </button>
            {services.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveFilter(s.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeFilter === s.id
                    ? 'bg-gold text-[#0A2A66] shadow-md font-bold'
                    : 'bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10'
                  }`}
              >
                {s.title.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left 7 cols: Service Description & Deliverables */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-primary-50 to-primary-100 text-primary border border-primary-200/50 flex items-center justify-center shadow-xs shrink-0">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-gold bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/20">
                        {service.tag}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mt-1">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-slate-700 font-serif italic">
                    {service.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {service.description}
                  </p>

                  {/* Scope Checklist */}
                  <div className="pt-3 space-y-2.5">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
                      Key Deliverables & Scope
                    </h4>
                    <div className="space-y-2">
                      {service.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-700">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right 5 cols: Strategic Value Card & Retainer CTA */}
                <div className="lg:col-span-5 bg-linear-to-br from-[#0A2A66] via-[#082252] to-[#041129] rounded-2xl p-6 sm:p-7 text-white space-y-5 shadow-lg border border-white/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gold font-bold block mb-1">
                      Engagement Pricing
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xs text-slate-300">From</span>
                      <span className="text-2xl font-serif font-bold text-white">
                        KSh {service.basePrice}
                      </span>
                      <span className="text-[11px] text-slate-400">/ engagement</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gold font-bold block">
                      Strategic Benefits
                    </span>
                    {service.benefits.map((b, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-200">
                        <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 space-y-2">
                    <Link
                      to="/contact"
                      className="w-full py-3 bg-linear-to-r from-gold via-gold-300 to-gold text-[#0A2A66] font-bold text-xs rounded-xl shadow-md hover:scale-102 transition-all active:scale-95 flex items-center justify-center space-x-1.5"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      to="/portal/services"
                      className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/15 transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <Lock className="w-3 h-3 text-gold" />
                      <span>Request via Client Portal</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-[#0A2A66] via-[#0D3685] to-[#041129] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Need a Customized Advisory Solution?
          </h2>
          <p className="text-xs sm:text-base text-slate-200 max-w-xl mx-auto leading-relaxed">
            Our senior tax partners are ready to review your entity structure, cross-border flows, or statutory matters in strict confidence.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-linear-to-r from-gold to-gold-300 text-primary font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:scale-102 transition-all active:scale-95"
            >
              <span>Schedule Discovery Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}