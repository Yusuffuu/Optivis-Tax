import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Clock } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Here you would integrate with EmailJS or your backend API
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <>
      <SEOHead 
        title="Contact Us"
        description="Get in touch with Optivis Tax for expert tax advisory services. Office in Nairobi, Kenya. Schedule a consultation today."
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Let's discuss how we can help you achieve clarity, compliance, and confidence in your tax strategy
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif font-bold text-primary mb-8">Send Us a Message</h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
                >
                  <img src="./check-circle.svg" alt="Success" className="w-16 h-16 text-green-500 mx-auto mb-4" style={{ filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)' }} />
                  <h3 className="text-2xl font-serif font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                        })}
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        {...register('phone')}
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="+254 700 000 000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input
                        {...register('company')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Interested In *</label>
                    <select
                      {...register('service', { required: 'Please select a service' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Select a service</option>
                      <option value="advisory">Tax Advisory & Compliance</option>
                      <option value="audit">Audit Support</option>
                      <option value="international">International Tax Planning</option>
                      <option value="corporate">Corporate Tax Strategy</option>
                      <option value="personal">Personal Tax Solutions</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Tell us about your needs..."
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                  </div>

                  <button type="submit" className="btn-primary w-full flex items-center justify-center">
                    <img src="./send.svg" alt="Send" className="mr-2 w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif font-bold text-primary mb-8">Get in Touch</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-0">
                    <img src="./map-pin.svg" alt="Location" className="w-6 h-6" style={{ filter: 'invert(67%) sepia(38%) saturate(549%) hue-rotate(7deg) brightness(91%) contrast(87%)' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Office Address</h3>
                    <p className="text-gray-600">
                      Westlands Business Park, 5th Floor<br />
                      Waiyaki Way, Westlands<br />
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-0">
                    <img src="./phone.svg" alt="Phone" className="w-6 h-6" style={{ filter: 'invert(67%) sepia(38%) saturate(549%) hue-rotate(7deg) brightness(91%) contrast(87%)' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Phone</h3>
                    <a href="tel:+254700000000" className="text-gray-600 hover:text-primary transition-colors">
                      +254 700 000 000
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Available Mon-Fri, 8am-5pm EAT</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-0">
                    <img src="./mail.svg" alt="Email" className="w-6 h-6" style={{ filter: 'invert(67%) sepia(38%) saturate(549%) hue-rotate(7deg) brightness(91%) contrast(87%)' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Email</h3>
                    <a href="mailto:info@optivistax.com" className="text-gray-600 hover:text-primary transition-colors">
                      info@optivistax.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-0">
                    <Clock className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday: By appointment only<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="rounded-xl overflow-hidden shadow-lg mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.808562923456!2d36.809543!3d-1.263456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1739c5c5c5c5%3A0x5c5c5c5c5c5c5c5c!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-primary mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-gold transition-colors">
                    <img src="./linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-gold transition-colors">
                    <img src="./twitter.svg" alt="Twitter" className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-gold transition-colors">
                    <img src="./facebook.svg" alt="Facebook" className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}