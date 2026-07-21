import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Lock, 
  Shield, 
  FileText, 
  TrendingUp, 
  Bell, 
  Eye,
  EyeOff,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

export default function ClientPortal() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle authentication
  };

  const features = [
    {
      icon: FileText,
      title: 'Secure Document Sharing',
      description: 'Upload and share tax documents securely with your dedicated advisor.'
    },
    {
      icon: TrendingUp,
      title: 'Personalized Dashboard',
      description: 'Track your tax filings, deadlines, and financial metrics in real-time.'
    },
    {
      icon: Bell,
      title: 'Deadline Reminders',
      description: 'Never miss a filing deadline with automated reminders and alerts.'
    },
    {
      icon: Shield,
      title: 'End-to-End Encryption',
      description: 'Your data is protected with bank-level security and encryption.'
    }
  ];

  return (
    <>
      <SEOHead 
        title="Client Portal"
        description="Secure client portal for Optivis Tax clients. Access your personalized dashboard, share documents, and track your tax matters."
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <Lock className="w-16 h-16 text-gold mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Client Portal</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Secure access to your tax documents, personalized dashboard, and advisor communications
            </p>
          </motion.div>
        </div>
      </section>

      {/* Login Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-serif font-bold text-primary mb-6 text-center">Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    {...register('password', { required: 'Password is required' })}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-gold hover:text-gold-600">Forgot password?</a>
              </div>

              <button type="submit" className="btn-primary w-full">
                Sign In
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Portal Features</h2>
            <p className="text-xl text-gray-600">Everything you need to manage your tax matters efficiently</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-lg font-serif font-bold text-primary mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-white mb-4">Not a Client Yet?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join Optivis Tax and get access to our secure client portal and expert tax advisory services.
            </p>
            <Link to="/contact" className="btn-secondary text-lg inline-flex items-center">
              Become a Client <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}