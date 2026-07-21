import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import SEOHead from '../components/SEOHead';

// This would typically come from an API or CMS
const blogContent = {
  'kenya-tax-changes-2024': {
    title: 'Key Tax Changes in Kenya for 2024: What Businesses Need to Know',
    category: 'Kenyan Tax Updates',
    author: 'James Mwangi',
    date: 'December 15, 2024',
    readTime: '8 min read',
    image: '/blog/tax-changes.jpg',
    content: `
      <p>The Kenyan tax landscape continues to evolve with significant changes introduced in the Finance Act 2024. Businesses operating in Kenya need to stay informed and adapt their tax strategies accordingly.</p>
      
      <h2>Major Tax Changes</h2>
      
      <h3>1. Corporate Tax Rate Adjustments</h3>
      <p>The corporate income tax rate has been adjusted for certain sectors, with specific provisions for manufacturing and technology companies. Understanding these changes is crucial for effective tax planning.</p>
      
      <h3>2. Digital Services Tax Updates</h3>
      <p>The digital services tax framework has been expanded to cover additional digital services, affecting both local and international digital businesses operating in Kenya.</p>
      
      <h3>3. VAT Modifications</h3>
      <p>Several changes to VAT regulations have been implemented, including new exemptions and modified rates for specific goods and services.</p>
      
      <h2>Impact on Businesses</h2>
      <p>These changes will have varying impacts depending on your business structure, industry, and operations. It's essential to review your tax strategy in light of these updates.</p>
      
      <h2>Recommendations</h2>
      <ul>
        <li>Review your current tax structure</li>
        <li>Update compliance procedures</li>
        <li>Consider restructuring opportunities</li>
        <li>Consult with tax professionals</li>
      </ul>
    `,
    tags: ['Kenya Tax', 'Finance Act 2024', 'Corporate Tax', 'VAT']
  },
  'international-tax-planning-strategies': {
    title: '5 International Tax Planning Strategies for Multinational Corporations',
    category: 'Global Tax Trends',
    author: 'Amina Hassan',
    date: 'December 10, 2024',
    readTime: '6 min read',
    image: '/blog/international-tax.jpg',
    content: `
      <p>In today's globalized economy, effective international tax planning is crucial for multinational corporations. Here are five strategies to optimize your global tax position.</p>
      
      <h2>1. Transfer Pricing Optimization</h2>
      <p>Implement robust transfer pricing policies that align with your business operations and comply with local regulations.</p>
      
      <h2>2. Tax Treaty Planning</h2>
      <p>Leverage bilateral tax treaties to minimize withholding taxes and avoid double taxation on cross-border transactions.</p>
      
      <h2>3. Intellectual Property Structuring</h2>
      <p>Strategically locate IP assets in jurisdictions with favorable tax treatment for intellectual property income.</p>
      
      <h2>4. Supply Chain Management</h2>
      <p>Structure your supply chain to optimize customs duties, VAT, and corporate tax implications.</p>
      
      <h2>5. Financing Structures</h2>
      <p>Design efficient financing arrangements that balance tax benefits with commercial objectives.</p>
    `,
    tags: ['International Tax', 'Transfer Pricing', 'Tax Planning', 'Multinational']
  }
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogContent[slug];

  if (!post) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-4xl font-serif font-bold text-primary">Article Not Found</h1>
        <Link to="/insights" className="btn-primary mt-8 inline-flex items-center">
          <img src="./arrow-right.svg" alt="" className="mr-2 w-5 h-5 rotate-180" style={{ filter: 'brightness(0) invert(1)' }} />
          Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title={post.title}
        description={post.content.replace(/<[^>]*>/g, '').substring(0, 160)}
        ogUrl={`https://optivistax.com/insights/${slug}`}
      />

      <article>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-primary">
          <div className="container-custom max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white"
            >
              <Link to="/insights" className="inline-flex items-center text-gold hover:text-gold-300 mb-6">
                <img src="./arrow-right.svg" alt="" className="mr-2 w-5 h-5 rotate-180" style={{ filter: 'invert(67%) sepia(38%) saturate(549%) hue-rotate(7deg) brightness(91%) contrast(87%)' }} />
                Back to Insights
              </Link>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-sm bg-gold text-primary px-3 py-1 rounded-full font-semibold">
                  {post.category}
                </span>
                <span className="text-gray-300 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{post.title}</h1>
              <div className="flex items-center space-x-4 text-gray-300">
                <div className="flex items-center">
                  <img src="./user.svg" alt="" className="w-5 h-5 mr-2" style={{ filter: 'brightness(0) invert(1)' }} />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <img src="./calendar.svg" alt="" className="w-5 h-5 mr-2" style={{ filter: 'brightness(0) invert(1)' }} />
                  {post.date}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl">
            <div className="flex gap-12">
              {/* Share buttons */}
              <div className="hidden lg:block">
                <div className="sticky top-24 space-y-4">
                  <p className="text-sm text-gray-500 font-semibold">Share</p>
                  <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-gold transition-colors">
                    <img src="./facebook.svg" alt="Facebook" className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-gold transition-colors">
                    <img src="./twitter.svg" alt="Twitter" className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-gold transition-colors">
                    <img src="./linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Article content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-primary">
          <div className="container-custom text-center max-w-3xl">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Need Expert Tax Advice?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Contact our team for personalized guidance on your tax matters.
            </p>
            <Link to="/contact" className="btn-secondary text-lg">
              Schedule a Consultation
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}