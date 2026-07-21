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
  Building2
} from 'lucide-react';
import SEOHead from '../components/SEOHead';

const services = [
  {
    icon: Shield,
    title: 'Tax Advisory & Compliance',
    description: 'Navigate complex tax regulations with confidence. We ensure full compliance while optimizing your tax position.',
    link: '/services#advisory'
  },
  {
    icon: CheckCircle,
    title: 'Audit Support',
    description: 'Expert representation and support during tax audits. We protect your interests and ensure fair treatment.',
    link: '/services#audit'
  },
  {
    icon: Globe,
    title: 'International Tax Planning',
    description: 'Strategic cross-border tax solutions for multinational operations and international investments.',
    link: '/services#international'
  },
  {
    icon: TrendingUp,
    title: 'Corporate Tax Strategy',
    description: 'Tailored tax strategies that align with your business goals and maximize shareholder value.',
    link: '/services#corporate'
  },
  {
    icon: Users,
    title: 'Personal Tax Solutions',
    description: 'Comprehensive personal tax planning for high-net-worth individuals and expatriates.',
    link: '/services#personal'
  }
];

const stats = [
  { icon: Building2, value: '150+', label: 'Corporate Clients' },
  { icon: Users, value: '500+', label: 'Individual Clients' },
  { icon: Award, value: '15+', label: 'Years Experience' },
  { icon: Star, value: '98%', label: 'Client Satisfaction' }
];

export default function HomePage() {
  return (
    <>
      <SEOHead 
        title="Home"
        description="Optivis Tax delivers clarity, compliance, and confidence in tax strategy. Leading tax consultancy in Kenya offering international tax advisory, corporate tax planning, and personal tax solutions."
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-linear from-primary to-primary-800 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Logo replaced Shield icon */}
            <div className="flex justify-center mb-8">
              <img 
                src="/logo.png" 
                alt="Optivis Tax" 
                className="w-100 h-100 md:w-90 md:h-90 object-contain"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
              Optivis <span className="text-gold">Tax</span>
            </h1>
            <p className="text-2xl md:text-3xl font-serif italic text-gold-100 mb-4">
              Clarity. Compliance. Confidence.
            </p>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Your trusted partner for comprehensive tax strategy and solutions. 
              Navigating complexity, delivering excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-secondary text-lg">
                Book Consultation
              </Link>
              <Link to="/services" className="btn-outline border-white text-white hover:bg-white hover:text-primary text-lg">
                Our Services
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 text-gold mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tax solutions tailored to your unique needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <service.icon className="w-12 h-12 text-gold mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-serif font-bold text-primary mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <Link
                  to={service.link}
                  className="text-gold font-semibold flex items-center group-hover:gap-2 transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-primary mb-6">
                Why Choose Optivis Tax?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Expertise You Can Trust',
                    description: 'Our team brings decades of combined experience in tax advisory, ensuring you receive the highest quality guidance.'
                  },
                  {
                    title: 'Global Perspective, Local Insight',
                    description: 'Based in Nairobi with international reach, we understand both local regulations and global tax landscapes.'
                  },
                  {
                    title: 'Client-Centered Approach',
                    description: 'We build lasting partnerships, taking time to understand your unique situation and goals.'
                  },
                  {
                    title: 'Proactive Strategy',
                    description: 'We don\'t just react to changes—we anticipate them, keeping you ahead of regulatory shifts.'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-0 w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-primary rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-serif font-bold mb-6">Our Values</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                      <img src="/icons/shield.svg" alt="Integrity" className="w-6 h-6" style={{ filter: 'brightness(0) saturate(100%) invert(11%) sepia(53%) saturate(2102%) hue-rotate(191deg) brightness(34%) contrast(98%)' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Integrity</h4>
                      <p className="text-gray-300">Unwavering ethical standards in every engagement</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Foresight</h4>
                      <p className="text-gray-300">Anticipating challenges before they arise</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Precision</h4>
                      <p className="text-gray-300">Meticulous attention to detail in all we do</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Ready to Optimize Your Tax Strategy?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Schedule a consultation with our expert team and discover how we can help you achieve clarity, compliance, and confidence.
            </p>
            <Link to="/contact" className="btn-secondary text-lg inline-flex items-center">
              Get Started Today <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}