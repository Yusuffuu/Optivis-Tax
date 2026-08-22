import { motion } from 'framer-motion';
import {
  Shield,
  Target,
  Eye,
  Heart,
  Globe,
  Award,
  Users,
  TrendingUp
} from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';

const team = [
  {
    name: 'James Mwangi',
    role: 'Managing Partner',
    bio: 'With over 20 years of experience in tax advisory, James leads our team with strategic vision and deep expertise in international tax planning.',
    image: '/team/james.jpg',
    credentials: 'CPA(K), MBA'
  },
  {
    name: 'Sarah Wanjiku',
    role: 'Senior Tax Consultant',
    bio: 'Sarah specializes in corporate tax strategy and has helped numerous multinational corporations optimize their tax positions in East Africa.',
    image: '/team/sarah.jpg',
    credentials: 'ACCA, BCom'
  },
  {
    name: 'David Ochieng',
    role: 'Head of Audit Support',
    bio: 'David brings extensive experience in tax audit representation and dispute resolution, ensuring our clients receive fair treatment.',
    image: '/team/david.jpg',
    credentials: 'CPA(K), CIA'
  },
  {
    name: 'Amina Hassan',
    role: 'International Tax Specialist',
    bio: 'Amina focuses on cross-border tax planning, transfer pricing, and helping businesses navigate complex international tax treaties.',
    image: '/team/amina.jpg',
    credentials: 'LLM (Tax), ADIT'
  }
];

const timeline = [
  {
    year: '2008',
    title: 'Foundation',
    description: 'Optivis Tax was founded in Nairobi with a vision to provide world-class tax advisory services in Kenya.'
  },
  {
    year: '2012',
    title: 'Regional Expansion',
    description: 'Expanded operations to serve clients across East Africa, building a reputation for excellence in tax strategy.'
  },
  {
    year: '2016',
    title: 'International Reach',
    description: 'Established partnerships with global tax networks, enabling comprehensive international tax planning services.'
  },
  {
    year: '2020',
    title: 'Digital Transformation',
    description: 'Launched our secure client portal and digital tax solutions, adapting to the changing business landscape.'
  },
  {
    year: '2024',
    title: 'Industry Leadership',
    description: 'Recognized as a leading tax consultancy in Kenya, serving over 650 clients across multiple sectors.'
  }
];

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Us"
        description="Learn about Optivis Tax - our mission, vision, and the expert team behind Kenya's leading tax consultancy. Discover our story and commitment to excellence."
      />

      {/* Hero */}
      <section className="relative pt-40 pb-32 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-br from-primary-900 to-primary opacity-90"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold blur-3xl opacity-20 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-white to-gray-300">About Us</h1>
            <p className="text-xl md:text-2xl text-gold-100 max-w-3xl mx-auto italic font-serif">
              Delivering clarity, compliance, and confidence in tax strategy since 2008
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                description: 'Deliver clarity, compliance, and confidence in tax strategy through expert guidance and innovative solutions.',
                color: 'text-blue-600'
              },
              {
                icon: Eye,
                title: 'Our Vision',
                description: 'To be the trusted global partner for tax advisory excellence, setting the standard for quality and integrity.',
                color: 'text-gold'
              },
              {
                icon: Heart,
                title: 'Our Values',
                description: 'Integrity, foresight, and precision guide every decision we make and every client relationship we build.',
                color: 'text-red-600'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass rounded-2xl text-center p-8 card-hover relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <item.icon className={`w-16 h-16 ${item.color} mx-auto mb-6 relative z-10 group-hover:scale-110 transition-transform`} />
                <h2 className="text-2xl font-serif font-bold text-primary mb-4 relative z-10">{item.title}</h2>
                <p className="text-gray-600 relative z-10">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">Our Team</h2>
            <p className="text-xl text-gray-600">Meet the experts behind Optivis Tax</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl overflow-hidden card-hover group"
              >
                <div className="h-64 bg-primary-50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Users className="w-20 h-20 text-primary-200 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6 relative bg-white/50 backdrop-blur-sm">
                  <h3 className="text-xl font-serif font-bold text-primary mb-1">{member.name}</h3>
                  <p className="text-gold font-semibold mb-2">{member.role}</p>
                  <p className="text-sm text-primary-400 mb-3 font-medium">{member.credentials}</p>
                  <p className="text-gray-600 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">The story of Optivis Tax in Kenya & beyond</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gold hidden md:block"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <h3 className="text-2xl font-serif font-bold text-primary">{item.year}</h3>
                    <h4 className="text-xl text-gold font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <div className="relative flex items-center justify-center my-4 md:my-0">
                    <div className="w-4 h-4 bg-gold rounded-full border-4 border-white shadow z-10"></div>
                  </div>
                  <div className="w-full md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}