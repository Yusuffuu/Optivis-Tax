import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

export default function Disclaimer() {
  return (
    <>
      <SEOHead 
        title="Disclaimer"
        description="Optivis Tax disclaimer. Important information about the use of our website and services."
      />
      
      <section className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-serif font-bold text-primary mb-8">Disclaimer</h1>
            <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="prose prose-lg max-w-none">
              <h2>General Disclaimer</h2>
              <p>The information provided on the Optivis Tax website is for general informational purposes only. While we strive to keep the information up-to-date and accurate, we make no representations or warranties of any kind about the completeness, accuracy, reliability, suitability, or availability of the information.</p>
              
              <h2>Professional Advice</h2>
              <p>The content on this website does not constitute professional tax, legal, or financial advice. You should consult with a qualified professional for advice tailored to your specific situation. Reliance on any information provided on this website is solely at your own risk.</p>
              
              <h2>No Client Relationship</h2>
              <p>Use of this website or communication through its contact forms does not create a professional-client relationship between you and Optivis Tax. A formal engagement agreement is required to establish such a relationship.</p>
              
              <h2>External Links</h2>
              <p>Our website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
              
              <h2>Limitation of Liability</h2>
              <p>In no event will Optivis Tax be liable for any loss or damage including without limitation, indirect or consequential loss or damage, arising from the use of this website.</p>
              
              <h2>Updates</h2>
              <p>We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting to the website.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}