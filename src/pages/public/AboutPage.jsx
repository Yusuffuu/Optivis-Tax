import { motion } from 'framer-motion';
import {
  Shield,
  Target,
  Eye,
  Heart,
  Globe,
  Award,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Building2,
  Lock,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';

const team = [
  {
    name: 'James Mwangi',
    role: 'Senior Managing Partner',
    bio: 'Over 20 years leading strategic tax planning, corporate group restructuring, and revenue authority negotiations across East Africa.',
    credentials: 'CPA(K), MBA (Finance), Member ICPAK',
    specialty: 'Corporate & M&A Strategy'
  },
  {
    name: 'Sarah Wanjiku',
    role: 'Partner, Tax Compliance & Audit Defense',
    bio: 'Specialist in complex KRA dispute defense, statutory returns management, and indirect tax optimization for multinational entities.',
    credentials: 'ACCA Fellow, BCom, ADIT',
    specialty: 'Audit Defense & Compliance'
  },
  {
    name: 'Amina Hassan',
    role: 'Head of International Tax & Transfer Pricing',
    bio: 'Dedicated to cross-border transfer pricing policies, Double Tax Avoidance treaties, and international supply chain tax structuring.',
    credentials: 'LLM (International Tax), ADIT',
    specialty: 'International Tax & Treaties'
  },
  {
    name: 'David Ochieng',
    role: 'Senior Counsel, Private Client & Wealth',
    bio: 'Advising family businesses, high-net-worth individuals, and expatriates on wealth preservation, succession planning, and statutory estate tax.',
    credentials: 'CPA(K), LLB (Hons)',
    specialty: 'Private Wealth & Family Office'
  }
];

const timeline = [
  {
    year: '2008',
    title: 'Firm Inception',
    description: 'Optivis Tax established in Nairobi as a specialized boutique tax practice serving local enterprises.'
  },
  {
    year: '2014',
    title: 'Regional Cross-Border Expansion',
    description: 'Expanded advisory services across Uganda, Tanzania, and Rwanda, structuring regional trade operations.'
  },
  {
    year: '2019',
    title: 'International Tax & Treaty Desk',
    description: 'Formed dedicated international tax and transfer pricing division to support multinational corporate entrants.'
  },
  {
    year: '2023',
    title: 'Client Portal & Digital Practice',
    description: 'Launched secure 256-bit encrypted digital portal for real-time document exchange and filing status tracking.'
  },
  {
    year: '2026',
    title: 'Practice Leadership',
    description: 'Advising over 150+ corporate entities and institutional clients, managing upwards of KES 4.5B+ in compliance assets.'
  }
];

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Optivis Tax | Firm History, Senior Leadership & Practice Values"
        description="Learn about Optivis Tax - our mission, vision, and the senior tax partners behind Kenya's leading tax advisory practice."
      />

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 bg-linear-to-b from-[#041129] via-[#0A2A66] to-[#041129] text-white overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-semibold tracking-wide text-gold-200">
              Established Practice • Nairobi & East Africa
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
            Distinguished Tax Counsel Built on <br />
            <span className="text-gradient-gold">Integrity, Precision & Foresight</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Since 2008, Optivis Tax has served as a trusted strategic advisor to corporate directors, institutional CFOs, and private clients navigating complex statutory tax environments.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Target,
                title: 'Our Practice Mission',
                desc: 'To deliver absolute clarity, proactive statutory compliance, and strategic tax efficiency through senior partner-led counsel and digital innovation.'
              },
              {
                icon: Eye,
                title: 'Our Strategic Vision',
                desc: 'To be the benchmark tax consultancy firm in East Africa, universally recognized for technical excellence, ethical integrity, and measurable value.'
              },
              {
                icon: Heart,
                title: 'Our Core Values',
                desc: 'Integrity in every statutory submission, foresight in anticipating legislative shifts, and rigorous numerical precision in all client dossiers.'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-gold/40 transition-all text-center space-y-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-primary-50 to-primary-100 text-primary border border-primary-200/50 flex items-center justify-center mx-auto shadow-xs">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary pt-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Senior Leadership */}
      <section className="py-20 sm:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
              Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary tracking-tight">
              Senior Partners & Practice Counsel
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Seasoned advisors bringing decades of combined private sector and revenue authority insight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {team.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-gold/40 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-tr from-primary to-primary-700 text-white font-serif font-bold text-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    {partner.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-base font-serif font-bold text-primary group-hover:text-gold-600 transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-xs font-semibold text-gold mt-0.5">{partner.role}</p>
                    <p className="text-[11px] font-mono text-slate-400 mt-1">{partner.credentials}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {partner.bio}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Focus Area</span>
                  <span className="text-xs font-semibold text-slate-800">{partner.specialty}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Milestones Timeline */}
      <section className="py-20 bg-slate-50 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
              Practice Milestones
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary tracking-tight">
              Our Journey of Strategic Growth
            </h2>
          </div>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-4">
                  <div className="px-3.5 py-1.5 rounded-xl bg-linear-to-r from-gold to-gold-300 text-primary font-serif font-bold text-base shadow-xs shrink-0">
                    {item.year}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-slate-800 text-base">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-[#0A2A66] via-[#0D3685] to-[#041129] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Partner with Trusted Tax Strategists
          </h2>
          <p className="text-xs sm:text-base text-slate-200 max-w-xl mx-auto leading-relaxed">
            Schedule an introductory consultation with our senior advisory team to explore corporate tax compliance and audit defense solutions.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-linear-to-r from-gold to-gold-300 text-primary font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:scale-102 transition-all active:scale-95"
            >
              <span>Schedule Initial Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}