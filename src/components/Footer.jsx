import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img src="./shield.svg" alt="Optivis" className="w-10 h-10 text-gold" style={{ filter: 'invert(67%) sepia(38%) saturate(549%) hue-rotate(7deg) brightness(91%) contrast(87%)' }} />
              <div>
                <h2 className="text-2xl font-serif font-bold">Optivis</h2>
                <p className="text-xs tracking-widest uppercase text-gold">Tax</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Delivering clarity, compliance, and confidence in tax strategy for businesses and individuals worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="./linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="./x.svg" alt="Twitter" className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="./facebook.svg" alt="Facebook" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Services', href: '/services' },
                { name: 'Insights', href: '/insights' },
                { name: 'Client Portal', href: '/portal' },
                { name: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-gold transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <img src="./mappin.svg" alt="Location" className="w-5 h-5 mt-1 flex-0" style={{ filter: 'invert(67%) sepia(38%) saturate(549%) hue-rotate(7deg) brightness(91%) contrast(87%)' }} />
                <span className="text-gray-300">
                  Westlands Business Park,<br />
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <img src="./phone.svg" alt="Phone" className="w-5 h-5 flex-0" style={{ filter: 'invert(67%) sepia(38%) saturate(549%) hue-rotate(7deg) brightness(91%) contrast(87%)' }} />
                <a href="tel:+254700000000" className="text-gray-300 hover:text-gold transition-colors">
                  +254 700 000 000
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <img src="./mail.svg" alt="Email" className="w-5 h-5 flex-0" style={{ filter: 'invert(67%) sepia(38%) saturate(549%) hue-rotate(7deg) brightness(91%) contrast(87%)' }} />
                <a href="mailto:info@optivistax.com" className="text-gray-300 hover:text-gold transition-colors">
                  info@optivistax.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Subscribe for tax insights and updates.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-primary-700 border border-primary-400 rounded-lg focus:outline-none focus:border-gold text-white placeholder-gray-400"
              />
              <button type="submit" className="btn-secondary w-full text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Optivis Tax. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-gold text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-gold text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/disclaimer" className="text-gray-400 hover:text-gold text-sm transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;