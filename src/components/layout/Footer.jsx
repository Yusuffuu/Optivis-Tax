import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Lock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-linear-to-b from-[#082252] via-[#061A3D] to-[#020914] text-white border-t border-white/10 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <img
                src="/logo.png"
                alt="Optivis"
                className="w-30 h-30 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform"
              />
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-2xl font-serif font-bold text-white tracking-tight">Optivis</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold px-1.5 py-0.5 rounded-md bg-gold/15 border border-gold/30">Tax</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans tracking-wider uppercase">Strategic Advisory & Compliance</p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-sm">
              Providing premier tax advisory, cross-border structuring, statutory compliance, and KRA audit support for corporations, institutions, and private clients across East Africa and globally.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-gold hover:text-primary text-slate-300 flex items-center justify-center border border-white/10 transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.59 1.59 0 0 0-1.6 1.6c0 .88.72 1.6 1.6 1.6a1.6 1.6 0 0 0 1.6-1.6c0-.88-.72-1.6-1.6-1.6Z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-gold hover:text-primary text-slate-300 flex items-center justify-center border border-white/10 transition-all"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-gold hover:text-primary text-slate-300 flex items-center justify-center border border-white/10 transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Practice Areas */}
          <div>
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-gold mb-4">
              Practice Areas
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/services#advisory" className="hover:text-gold transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-gold shrink-0" />
                  <span>Tax Compliance & Filings</span>
                </Link>
              </li>
              <li>
                <Link to="/services#audit" className="hover:text-gold transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-gold shrink-0" />
                  <span>Audit Support & Defense</span>
                </Link>
              </li>
              <li>
                <Link to="/services#international" className="hover:text-gold transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-gold shrink-0" />
                  <span>International Tax Planning</span>
                </Link>
              </li>
              <li>
                <Link to="/services#corporate" className="hover:text-gold transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-gold shrink-0" />
                  <span>Corporate Strategy & M&A</span>
                </Link>
              </li>
              <li>
                <Link to="/services#personal" className="hover:text-gold transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-gold shrink-0" />
                  <span>Executive & Private Wealth</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Office Contact */}
          <div>
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-gold mb-4">
              Nairobi Office
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>
                  Westlands Business Park, 7th Floor<br />
                  Waiyaki Way, Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href="tel:+254700000000" className="hover:text-gold transition-colors font-mono">
                  +254 700 000 000
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:info@optivistax.com" className="hover:text-gold transition-colors">
                  info@optivistax.com
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Executive Newsletter */}
          <div>
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-gold mb-4">
              Executive Briefing
            </h3>
            <p className="text-xs text-slate-300/90 mb-3 leading-relaxed">
              Subscribe to our monthly legislative tax alerts and Finance Act bulletins.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="corporate@domain.com"
                  required
                  className="w-full px-3.5 py-2 text-xs bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-3 bg-linear-to-r from-gold to-gold-300 hover:from-gold-300 hover:to-gold text-primary font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center space-x-1"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <AnimatePresence>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[11px] text-emerald-400 font-semibold mt-2 flex items-center"
                >
                  <CheckCircle className="w-3.5 h-3.5 mr-1" />
                  Subscribed successfully to tax dispatches!
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-gold" />
            <span>&copy; {new Date().getFullYear()} Optivis Tax & Advisory Partners. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-5 text-xs">
            <Link to="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
            <Link to="/disclaimer" className="hover:text-gold transition-colors">
              Regulatory Disclaimer
            </Link>
            <Link to="/portal/login" className="text-gold font-bold hover:underline flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Client Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}