import { Helmet } from 'react-helmet-async';

export default function SEOHead({ 
  title, 
  description, 
  keywords = 'tax consultancy Kenya, international tax advisory, tax compliance, corporate tax strategy, Optivis Tax',
  ogImage = '/og-image.jpg',
  ogUrl = 'https://optivistax.com'
}) {
  const fullTitle = `${title} | Optivis Tax - Clarity. Compliance. Confidence.`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <link rel="canonical" href={ogUrl} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}