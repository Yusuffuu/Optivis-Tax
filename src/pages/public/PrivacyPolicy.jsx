import { motion } from 'framer-motion';
import SEOHead from '../../components/seo/SEOHead';

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="Optivis Tax privacy policy. Learn how we collect, use, and protect your personal information."
      />

      <section className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-serif font-bold text-primary mb-8">Privacy Policy</h1>
            <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-lg max-w-none">
              <h2>1. Introduction</h2>
              <p>Optivis Tax ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>

              <h2>2. Information We Collect</h2>
              <h3>Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide to us when you:</p>
              <ul>
                <li>Fill out a contact form</li>
                <li>Subscribe to our newsletter</li>
                <li>Register for our client portal</li>
                <li>Request a consultation</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <p>When you visit our website, we may automatically collect certain information about your device, including:</p>
              <ul>
                <li>IP address</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>Pages visited</li>
                <li>Time and date of visits</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use the collected information for various purposes:</p>
              <ul>
                <li>To provide and maintain our services</li>
                <li>To notify you about changes to our services</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve our services</li>
                <li>To monitor the usage of our website</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>

              <h2>4. Data Protection</h2>
              <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

              <h2>5. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p>Email: info@optivistax.com<br />
                Phone: +254 700 000 000<br />
                Address: Westlands Business Park, Nairobi, Kenya</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}