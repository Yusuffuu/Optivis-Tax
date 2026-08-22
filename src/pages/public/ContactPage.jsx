import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Shield,
  Lock,
  ArrowRight,
  Sparkles,
  Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <>
      <SEOHead
        title="Contact Senior Tax Counsel | Optivis Tax Nairobi"
        description="Get in touch with Optivis Tax for expert corporate tax advisory, audit defense, and international structuring. Schedule an executive discovery session today."
      />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 bg-linear-to-b from-[#041129] via-[#0A2A66] to-[#041129] text-white overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-semibold tracking-wide text-gold-200">
              Confidential Discovery Consultations
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
            Connect with Our Senior <br />
            <span className="text-gradient-gold">Tax Partners & Counsel</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Whether you require assistance responding to a statutory KRA inquiry, structuring cross-border operations, or reviewing annual corporate returns, our partners are ready to assist.
          </p>
        </div>
      </section>

      {/* Contact Form & Office Cards Section */}
      <section className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left 7 cols: Interactive Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs"
            >
              <div className="mb-6 pb-4 border-b border-slate-100">
                <h2 className="text-2xl font-serif font-bold text-primary">
                  Request Case Consultation
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  All communications are strictly confidential and governed by client privilege.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-emerald-950">Inquiry Dispatched Successfully</h3>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Thank you. A Senior Tax Partner from our Nairobi office will review your case notes and respond within 24 business hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                        placeholder="John Kamau"
                      />
                      {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Corporate Email *
                      </label>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                        })}
                        type="email"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                        placeholder="cfo@company.com"
                      />
                      {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Telephone Number
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                        placeholder="+254 700 000 000"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Company / Entity Name
                      </label>
                      <input
                        {...register('company')}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                        placeholder="Acme Holdings Ltd"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Practice Area *
                      </label>
                      <select
                        {...register('service', { required: 'Please select a practice area' })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                      >
                        <option value="">Select practice solution...</option>
                        <option value="advisory">Corporate Tax Compliance & Returns</option>
                        <option value="audit">KRA Audit Support & Defense</option>
                        <option value="international">International Tax & Transfer Pricing</option>
                        <option value="corporate">M&A and Transaction Structuring</option>
                        <option value="personal">Private Wealth & Executive Tax</option>
                        <option value="other">General Tax Advisory Retainer</option>
                      </select>
                      {errors.service && <p className="text-rose-500 text-xs mt-1">{errors.service.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Urgency Level
                      </label>
                      <select
                        {...register('urgency')}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                      >
                        <option value="standard">Standard Inquiry (1-2 business days)</option>
                        <option value="urgent">Urgent Matter (24 business hours)</option>
                        <option value="critical">Critical Statutory Notice / Assessment</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Case Summary & Specific Inquiries *
                    </label>
                    <textarea
                      {...register('message', { required: 'Please provide a case summary' })}
                      rows={4}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all font-sans"
                      placeholder="Briefly describe your entity structure, filing period, or specific tax challenge..."
                    />
                    {errors.message && <p className="text-rose-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-linear-to-r from-primary via-primary-600 to-primary text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:from-primary-600 hover:to-primary-700 transition-all active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4 text-gold" />
                    <span>Submit Confidential Inquiry</span>
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right 5 cols: Direct Office Details & Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Office Contact Dossier */}
              <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs space-y-5">
                <h3 className="text-lg font-serif font-bold text-primary pb-3 border-b border-slate-100">
                  Nairobi Practice Headquarters
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Physical Address</h4>
                      <p className="text-slate-500 mt-0.5 leading-relaxed">
                        Westlands Business Park, 7th Floor<br />
                        Waiyaki Way, Nairobi, Kenya
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Telephone Hotline</h4>
                      <a href="tel:+254700000000" className="text-gold font-mono font-bold hover:underline">
                        +254 700 000 000
                      </a>
                      <p className="text-slate-400 mt-0.5">Mon - Fri: 8:00 AM - 5:00 PM EAT</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Electronic Inquiries</h4>
                      <a href="mailto:info@optivistax.com" className="text-gold font-bold hover:underline">
                        info@optivistax.com
                      </a>
                      <p className="text-slate-400 mt-0.5">Secure client mailbox</p>
                    </div>
                  </div>
                </div>

                {/* Map Card */}
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner h-44 w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.808562923456!2d36.809543!3d-1.263456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1739c5c5c5c5%3A0x5c5c5c5c5c5c5c5c!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Optivis Nairobi Office Location"
                  />
                </div>
              </div>

              {/* Portal Quick Access Card */}
              <div className="bg-linear-to-br from-[#0A2A66] via-[#082252] to-[#041129] rounded-3xl p-6 text-white shadow-md border border-white/10 space-y-3">
                <div className="flex items-center space-x-2 text-gold font-bold text-xs font-mono uppercase">
                  <Lock className="w-4 h-4" />
                  <span>Existing Client?</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Log in directly to your client portal to review pending filing milestones or message your assigned specialist.
                </p>
                <Link
                  to="/portal/login"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-gold hover:text-gold-200 transition-colors"
                >
                  <span>Go to Client Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}