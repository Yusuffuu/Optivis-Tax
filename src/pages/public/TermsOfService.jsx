import { motion } from 'framer-motion';
import SEOHead from '../../components/seo/SEOHead';

export default function TermsOfService() {
  return (
    <>
      <SEOHead
        title="Terms of Service"
        description="Optivis Tax terms of service. Read our terms and conditions for using our website and services."
      />

      <section className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-serif font-bold text-primary mb-8">Terms of Service</h1>
            <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-lg max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing and using the Optivis Tax website and services, you agree to be bound by these Terms of Service.</p>

              <h2>2. Services Description</h2>
              <p>Optivis Tax provides tax advisory, compliance, and consulting services as described on our website. We reserve the right to modify or discontinue any service without prior notice.</p>

              <h2>3. User Obligations</h2>
              <p>As a user of our services, you agree to:</p>
              <ul>
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use our services in compliance with applicable laws</li>
                <li>Not engage in any activity that interferes with our services</li>
              </ul>

              <h2>4. Intellectual Property</h2>
              <p>All content on this website, including text, graphics, logos, and software, is the property of Optivis Tax and is protected by intellectual property laws.</p>

              <h2>5. Limitation of Liability</h2>
              <p>Optivis Tax shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>

              <h2>6. Governing Law</h2>
              <p>These terms shall be governed by and construed in accordance with the laws of Kenya.</p>

              <h2>7. Contact</h2>
              <p>For questions about these Terms of Service, contact us at info@optivistax.com.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}