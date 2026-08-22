// src/pages/public/HomePage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  CheckCircle,
  Globe,
  TrendingUp,
  Users,
  ArrowRight,
  Star,
  Award,
  Building2,
  Lock,
  ChevronRight,
  Sparkles,
  Phone,
  Clock
} from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';
import { mockTestimonials } from '../../data/mockData';

const services = [
  {
    icon: Shield,
    title: 'Tax Advisory & Compliance',
    tag: 'Statutory Filings',
    description: 'Proactive tax compliance reviews, statutory corporate tax returns, VAT reconciliations, and tax health checks tailored for Kenyan corporations.',
    features: ['Corporate Income Tax & VAT Returns', 'Withholding Tax & PAYE Management', 'KRA Compliance Health Check'],
    link: '/services#advisory'
  },
  {
    icon: CheckCircle,
    title: 'Audit Support & Dispute Resolution',
    tag: 'Representation',
    description: 'Seasoned defense representation and documentation gathering for KRA audits, assessments, objection letters, and tax appeals tribunal proceedings.',
    features: ['Pre-Audit Risk Analysis', 'KRA Assessment Objections', 'Tax Appeals Representation'],
    link: '/services#audit'
  },
  {
    icon: Globe,
    title: 'International Tax & Cross-Border',
    tag: 'Global Practice',
    description: 'Strategic cross-border tax architecture, transfer pricing documentation, Double Tax Treaty (DTA) optimization, and regional expansion structures.',
    features: ['Transfer Pricing Policies', 'DTA Treaty Structuring', 'Expatriate Tax Planning'],
    link: '/services#international'
  },
  {
    icon: TrendingUp,
    title: 'Corporate Strategy & M&A Tax',
    tag: 'Transaction Advisory',
    description: 'Tax due diligence, capital allowances, group restructuring, and post-merger integration to safeguard capital and maximize shareholder value.',
    features: ['M&A Tax Due Diligence', 'Group Restructuring', 'Capital Allowance Maximization'],
    link: '/services#corporate'
  },
  {
    icon: Users,
    title: 'Executive & Private Wealth Solutions',
    tag: 'Private Clients',
    description: 'High-net-worth individual tax planning, succession structuring, family office advisory, and personal statutory filing management.',
    features: ['Wealth Preservation Structuring', 'Estate & Succession Advisory', 'Individual Tax Returns'],
    link: '/services#personal'
  },
  {
    icon: Award,
    title: 'Custom Advisory Engagements',
    tag: 'Tailored Retainers',
    description: 'Dedicated senior tax partner retainers for ongoing counsel, legislative tracking of Finance Act amendments, and board-level strategy.',
    features: ['Dedicated Partner Channel', 'Monthly Legislative Bulletins', 'Direct Portal Inquiries'],
    link: '/contact'
  }
];

const stats = [
  { value: 'KES 4.5B+', label: 'Filings & Retainers Optimized', icon: TrendingUp },
  { value: '150+', label: 'Corporate & Institutional Clients', icon: Building2 },
  { value: '15+ Yrs', label: 'East Africa Practice Experience', icon: Award },
  { value: '99.4%', label: 'KRA Statutory Compliance Rate', icon: CheckCircle }
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <SEOHead
        title="Optivis Tax | Premier Tax Advisory, Compliance & Strategy in Kenya"
        description="Optivis Tax delivers clarity, compliance, and confidence in tax strategy. Leading tax consultancy in Kenya offering corporate tax advisory, audit defense, and international tax planning."
      />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center bg-linear-to-b from-[#041129] via-[#0A2A66] to-[#041129] text-white pt-28 pb-20 overflow-hidden">
        {/* Background Mesh Glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-400/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-gold/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Col: Hero Copy */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-xs font-semibold tracking-wide text-gold-200">
                  Premier Tax Advisory & Statutory Compliance in Kenya
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.12]">
                Clarity. Compliance. <br className="hidden sm:block" />
                <span className="text-gold">Confidence in Tax Strategy.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-sans leading-relaxed">
                We empower corporations, institutions, and private clients across East Africa with proactive tax advisory, statutory filing excellence, KRA audit representation, and international structuring.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/contact"
                  className="px-6 py-3.5 bg-linear-to-rrom-gold via-gold-300 to-gold text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:scale-105 transition-all active:scale-95 flex items-center space-x-2"
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/services"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-md transition-all flex items-center space-x-2"
                >
                  <span>Explore Practice Areas</span>
                  <ChevronRight className="w-4 h-4 text-gold" />
                </Link>

                <Link
                  to="/portal/login"
                  className="px-5 py-3.5 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-gold" />
                  <span>Client Portal</span>
                </Link>
              </div>
            </motion.div>

            {/* Right Col: Interactive Trust Card / Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative">
                {/* Glow Behind Card */}
                <div className="absolute -inset-1 bg-linear-to-r from-gold/30 to-primary-400/30 rounded-3xl blur-xl opacity-75" />

                <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-6">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-gold to-gold-200 p-0.5 shadow-md flex items-center justify-center">
                        <img src="/logo.png" alt="Optivis" className="w-9 h-9 object-contain rounded-xl" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-base text-white">Optivis Tax Advisory</h3>
                        <p className="text-xs text-gold-200">Certified Tax Practitioners</p>
                      </div>
                    </div>

                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-400/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                      Active Counsel
                    </span>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      <Shield className="w-5 h-5 text-gold mb-1.5" />
                      <p className="text-lg font-bold font-serif text-white">100%</p>
                      <p className="text-[11px] text-slate-300">Confidential & 256-bit Secure</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      <TrendingUp className="w-5 h-5 text-gold mb-1.5" />
                      <p className="text-lg font-bold font-serif text-white">Top 1%</p>
                      <p className="text-[11px] text-slate-300">Tax Optimization Results</p>
                    </div>
                  </div>

                  {/* Quick Service Request Hook */}
                  <div className="p-4 rounded-2xl bg-black/20 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">Direct Tax Support</span>
                      <span className="text-gold font-mono text-[11px]">Nairobi • Global</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Need urgent assistance with a statutory filing deadline or KRA assessment notice?
                    </p>
                    <Link
                      to="/contact"
                      className="block w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-center font-bold text-xs rounded-xl border border-white/20 transition-colors"
                    >
                      Request Immediate Case Review →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Executive Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 pt-12 border-t border-white/10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-2 text-gold mb-1">
                  <stat.icon className="w-4 h-4" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-gold-200">
                    Metric
                  </span>
                </div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-300 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Solutions Section */}
      <section className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
              Specialized Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary tracking-tight">
              Comprehensive Tax Advisory & Statutory Practice
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              From corporate compliance to high-stakes dispute resolution, our specialized practice groups deliver measurable tax efficiency and peace of mind.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-gold/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-primary-50 to-primary-100 text-primary border border-primary-200/50 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-[11px] font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-primary mb-2.5 group-hover:text-gold-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-slate-100 mb-6">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to={service.link}
                  className="w-full py-2.5 px-4 bg-slate-50 group-hover:bg-primary group-hover:text-white text-slate-700 font-bold text-xs rounded-xl border border-slate-200 group-hover:border-primary transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Explore Practice Area</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Optivis Tax */}
      <section className="py-20 sm:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 6 cols: Text highlights */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 space-y-6"
            >
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                The Optivis Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary tracking-tight leading-snug">
                Why Industry Leaders & Fast-Growing Businesses Choose Optivis
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Taxation is no longer just a statutory compliance box—it is a critical pillar of corporate competitiveness, investor assurance, and shareholder value.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: 'Senior Partner-Led Advisory',
                    desc: 'Every client matter is overseen directly by senior tax partners with decades of revenue authority and private practice experience.'
                  },
                  {
                    title: 'Proactive Legislative Foresight',
                    desc: 'We analyze proposed Finance Bills and regional EAC treaty revisions early, positioning your business before changes become law.'
                  },
                  {
                    title: 'Seamless Digital Client Portal',
                    desc: 'Instant tracking of filing milestones, document exchange with 256-bit encryption, and official tax receipt archives.'
                  },
                  {
                    title: 'Proven Audit Defense Track Record',
                    desc: 'Specialized representation defending complex corporate tax assessments and dispute negotiations before the Tax Appeals Tribunal.'
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="w-8 h-8 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right 6 cols: Luxury Feature Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6"
            >
              <div className="relative rounded-3xl bg-linear-to-br from-[#0A2A66] via-[#082252] to-[#041129] p-8 sm:p-10 text-white shadow-2xl border border-white/10 overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-semibold border border-gold/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Executive Standards</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    Our Uncompromising Practice Pillars
                  </h3>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-base text-gold">Integrity</span>
                        <Shield className="w-4 h-4 text-gold" />
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Strict adherence to international ethical tax codes and full statutory conformity.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-base text-gold">Foresight</span>
                        <TrendingUp className="w-4 h-4 text-gold" />
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Anticipating regulatory and market shifts to shield your operations from unexpected liabilities.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-base text-gold">Precision</span>
                        <Award className="w-4 h-4 text-gold" />
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Meticulous numerical accuracy and airtight legal grounding in every return and advisory dossier.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/about"
                      className="inline-flex items-center space-x-2 text-xs font-bold text-gold hover:text-gold-200 transition-colors"
                    >
                      <span>Read More About Our Practice & History</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Verified Client Testimonials */}
      <section className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary tracking-tight">
              Trusted by East Africa's Leading Entities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Read how our strategic tax counsel has safeguarded corporate operations and private wealth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(mockTestimonials || [])
              .filter(t => t.visible)
              .slice(0, 3)
              .map((testimonial, i) => (
                <motion.div
                  key={testimonial.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${idx < (testimonial.rating || 5) ? 'text-gold fill-gold' : 'text-slate-200'}`}
                        />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      "{testimonial.comment || testimonial.review || 'Outstanding professional service.'}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-trrom-primary to-primary-700 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                      {(testimonial.userName || testimonial.name || 'C').charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-800">
                        {testimonial.userName || testimonial.name || 'Client'}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {testimonial.company || testimonial.service || 'Optivis Tax Client'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Executive Call to Action Banner */}
      <section className="py-20 bg-linear-to-r from-[#0A2A66] via-[#0D3685] to-[#041129] text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold/20 text-gold text-xs font-semibold border border-gold/30">
            <Clock className="w-3.5 h-3.5" />
            <span>Ready for Next-Level Tax Confidence?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Schedule a Confidential Strategic Tax Review
          </h2>

          <p className="text-xs sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Speak directly with an Optivis Senior Partner to review your statutory filings, cross-border exposure, or upcoming tax audit milestones.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-linear-to-r from-gold via-gold-300 to-gold text-[#0A2A66] font-bold text-xs sm:text-sm rounded-xl shadow-xl hover:scale-105 transition-all active:scale-95 flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Book Discovery Session</span>
            </Link>

            <Link
              to="/portal/register"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-md transition-colors flex items-center space-x-2"
            >
              <Lock className="w-4 h-4 text-gold" />
              <span>Create Client Portal Account</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}