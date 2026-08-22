import { motion } from 'framer-motion';
import {
  Shield,
  CheckCircle,
  Globe,
  TrendingUp,
  Users,
  ArrowRight,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';

const services = [
  {
    id: 'advisory',
    icon: Shield,
    title: 'Tax Advisory & Compliance',
    subtitle: 'Navigate complexity with confidence',
    description: 'Our comprehensive tax advisory services ensure your business remains compliant while optimizing your tax position. We stay ahead of regulatory changes to provide proactive guidance.',
    features: [
      'Tax compliance review and filing',
      'Regulatory change impact analysis',
      'Tax risk assessment and management',
      'VAT and indirect tax advisory',
      'Tax health checks and due diligence'
    ],
    benefits: [
      'Reduced compliance risks',
      'Optimized tax positions',
      'Proactive regulatory updates',
      'Peace of mind'
    ]
  },
  {
    id: 'audit',
    icon: CheckCircle,
    title: 'Audit Support',
    subtitle: 'Expert representation when you need it most',
    description: 'Facing a tax audit can be daunting. Our experienced team provides comprehensive support throughout the audit process, protecting your interests and ensuring fair treatment.',
    features: [
      'Pre-audit preparation and review',
      'Audit representation and negotiation',
      'Documentation and evidence gathering',
      'Dispute resolution and appeals',
      'Post-audit recommendations'
    ],
    benefits: [
      'Professional representation',
      'Minimized penalties',
      'Efficient resolution',
      'Future audit preparedness'
    ]
  },
  {
    id: 'international',
    icon: Globe,
    title: 'International Tax Planning',
    subtitle: 'Strategic cross-border solutions',
    description: 'Navigate the complexities of international taxation with our expert guidance. We help businesses and individuals optimize their global tax positions while ensuring full compliance.',
    features: [
      'Cross-border transaction planning',
      'Transfer pricing advisory',
      'Tax treaty analysis and application',
      'Expatriate tax planning',
      'International structuring'
    ],
    benefits: [
      'Global tax optimization',
      'Double taxation avoidance',
      'Compliant international operations',
      'Strategic market entry'
    ]
  },
  {
    id: 'corporate',
    icon: TrendingUp,
    title: 'Corporate Tax Strategy',
    subtitle: 'Maximize value, minimize liability',
    description: 'Develop and implement tax strategies that align with your business objectives. We help corporations of all sizes optimize their tax positions while maintaining full compliance.',
    features: [
      'Corporate tax planning and structuring',
      'M&A tax advisory',
      'Group restructuring',
      'Tax incentive optimization',
      'Shareholder tax planning'
    ],
    benefits: [
      'Enhanced shareholder value',
      'Reduced effective tax rate',
      'Strategic business alignment',
      'Competitive advantage'
    ]
  },
  {
    id: 'personal',
    icon: Users,
    title: 'Personal Tax Solutions',
    subtitle: 'Tailored strategies for individuals',
    description: 'Comprehensive tax planning for high-net-worth individuals, professionals, and expatriates. We help you preserve and grow your wealth through smart tax strategies.',
    features: [
      'Personal income tax planning',
      'Investment tax optimization',
      'Estate and succession planning',
      'Expatriate tax services',
      'Retirement planning'
    ],
    benefits: [
      'Wealth preservation',
      'Tax-efficient investments',
      'Future security',
      'Family legacy planning'
    ]
  }
];

export default function ServicesPage() {
  return (
    <>
      <SEOHead
        title="Services"
        description="Explore Optivis Tax's comprehensive services including tax advisory, audit support, international tax planning, corporate tax strategy, and personal tax solutions in Kenya."
      />

      {/* Hero */}
      <section className="relative pt-40 pb-32 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-br from-primary-900 to-primary opacity-90"></div>
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold blur-3xl opacity-20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-white to-gray-300">Our Services</h1>
            <p className="text-xl md:text-2xl text-gold-100 max-w-3xl mx-auto italic font-serif">
              Comprehensive tax solutions designed to deliver clarity, compliance, and confidence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`section-padding ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <service.icon className="w-16 h-16 text-gold mb-6" />
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-3">
                  {service.title}
                </h2>
                <p className="text-xl text-gold font-semibold mb-6">{service.subtitle}</p>
                <p className="text-gray-600 mb-8">{service.description}</p>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-primary mb-4">What We Offer:</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-gold flex-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to="/contact" className="btn-primary inline-flex items-center">
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-dark rounded-2xl p-8 relative overflow-hidden text-white shadow-2xl"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold opacity-20 blur-2xl rounded-full"></div>
                <h3 className="text-2xl font-serif font-bold mb-6 text-gradient-gold">Key Benefits</h3>
                <div className="space-y-6 relative z-10">
                  {service.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center flex-0">
                        <TrendingUp className="w-5 h-5 text-gold" />
                      </div>
                      <p className="text-gray-200">{benefit}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact us today for a consultation and discover how we can help optimize your tax strategy.
            </p>
            <Link to="/contact" className="btn-secondary text-lg inline-flex items-center">
              <Phone className="mr-2 w-5 h-5" />
              Schedule Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}