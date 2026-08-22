import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Shield,
  Briefcase,
  CheckCircle,
  Globe,
  TrendingUp,
  Users,
  Lock,
  Calendar,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const servicesList = [
  {
    name: 'Tax Advisory & Compliance',
    desc: 'Statutory filings, VAT, PAYE & proactive tax health checks',
    href: '/services#advisory',
    icon: Shield
  },
  {
    name: 'Audit Support & Representation',
    desc: 'KRA audit defense, dispute resolution & appeals',
    href: '/services#audit',
    icon: CheckCircle
  },
  {
    name: 'International Tax Planning',
    desc: 'Cross-border structuring, transfer pricing & treaties',
    href: '/services#international',
    icon: Globe
  },
  {
    name: 'Corporate Tax Strategy',
    desc: 'M&A advisory, capital allowances & group restructuring',
    href: '/services#corporate',
    icon: TrendingUp
  },
  {
    name: 'Personal Tax & Expatriate',
    desc: 'High-net-worth wealth preservation & executive tax',
    href: '/services#personal',
    icon: Users
  }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setServicesDropdown(false);
  }, [location.pathname]);

  const isDarkPage = location.pathname === '/' || location.pathname === '/about' || location.pathname === '/services';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[#0A2A66]/95 backdrop-blur-xl shadow-xl shadow-black/10 border-b border-white/10 py-3.5'
        : 'bg-linear-to-b from-[#041129]/80 via-[#0A2A66]/40 to-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="../logo.png"
              alt="Optivis Tax"
              className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-2xl drop-shadow-gold/30 group-hover:scale-110 transition-transform"
            />
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                  Optivis
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-gold px-1.5 py-0.5 rounded-md bg-gold/15 border border-gold/30">
                  Tax
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-sans tracking-wider uppercase hidden sm:block">
                Advisory & Compliance
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${location.pathname === '/'
                ? 'text-gold font-semibold bg-white/10'
                : 'text-slate-200 hover:text-white hover:bg-white/5'
                }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${location.pathname === '/about'
                ? 'text-gold font-semibold bg-white/10'
                : 'text-slate-200 hover:text-white hover:bg-white/5'
                }`}
            >
              About Us
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <Link
                to="/services"
                className={`inline-flex items-center space-x-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${location.pathname.startsWith('/services')
                  ? 'text-gold font-semibold bg-white/10'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdown ? 'rotate-180 text-gold' : 'text-slate-400'}`} />
              </Link>

              <AnimatePresence>
                {servicesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-1 w-80 bg-[#082252] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 p-2 backdrop-blur-2xl"
                  >
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gold">Practice Areas</span>
                    </div>
                    {servicesList.map((service) => (
                      <Link
                        key={service.name}
                        to={service.href}
                        className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-gold/20 text-gold flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                          <service.icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white group-hover:text-gold transition-colors">
                            {service.name}
                          </p>
                          <p className="text-[11px] text-slate-300 line-clamp-1">
                            {service.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <div className="pt-2 mt-1 border-t border-white/10">
                      <Link
                        to="/services"
                        className="block text-center text-xs font-semibold text-gold hover:text-gold-300 py-1.5"
                      >
                        View All Practice Solutions →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/insights"
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${location.pathname.startsWith('/insights')
                ? 'text-gold font-semibold bg-white/10'
                : 'text-slate-200 hover:text-white hover:bg-white/5'
                }`}
            >
              Insights & News
            </Link>

            <Link
              to="/contact"
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${location.pathname === '/contact'
                ? 'text-gold font-semibold bg-white/10'
                : 'text-slate-200 hover:text-white hover:bg-white/5'
                }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/portal/login"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-gold" />
              <span>Client Portal</span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-primary bg-linear-to-r from-gold to-gold-300 hover:from-gold-300 hover:to-gold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <Link
              to="/portal/login"
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gold bg-white/10 border border-white/15"
            >
              Portal
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#082252]/95 backdrop-blur-2xl border-b border-white/15 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto custom-scrollbar">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${location.pathname === '/' ? 'bg-white/15 text-gold font-bold' : 'text-slate-200'
                  }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${location.pathname === '/about' ? 'bg-white/15 text-gold font-bold' : 'text-slate-200'
                  }`}
              >
                About Us
              </Link>
              <Link
                to="/services"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${location.pathname.startsWith('/services') ? 'bg-white/15 text-gold font-bold' : 'text-slate-200'
                  }`}
              >
                Practice Services
              </Link>
              <Link
                to="/insights"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${location.pathname.startsWith('/insights') ? 'bg-white/15 text-gold font-bold' : 'text-slate-200'
                  }`}
              >
                Insights & Blog
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${location.pathname === '/contact' ? 'bg-white/15 text-gold font-bold' : 'text-slate-200'
                  }`}
              >
                Contact & Office
              </Link>

              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <Link
                  to="/portal/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-white/10 border border-white/15"
                >
                  <Lock className="w-4 h-4 text-gold" />
                  <span>Access Client Portal</span>
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-primary bg-linear-to-r from-gold to-gold-300 shadow-md"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}