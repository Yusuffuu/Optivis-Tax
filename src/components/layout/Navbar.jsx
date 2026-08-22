import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: 'Tax Advisory & Compliance', href: '/services#advisory' },
      { name: 'Audit Support', href: '/services#audit' },
      { name: 'International Tax Planning', href: '/services#international' },
      { name: 'Corporate Tax Strategy', href: '/services#corporate' },
      { name: 'Personal Tax Solutions', href: '/services#personal' },
    ]
  },
  { name: 'Insights', href: '/insights' },
  { name: 'Client Portal', href: '/portal/login' },
  { name: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
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
  }, [location.pathname]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="./logo.png"
              alt="Optivis Tax"
              className={`h-12 w-auto object-contain transition-all duration-300 ${isScrolled ? 'brightness-100' : 'brightness-0 invert'
                }`}
            />
            <div>
              <span className={`text-2xl font-serif font-bold transition-colors duration-300 ${isScrolled ? 'text-primary' : 'text-white'
                }`}>
                Optivis
              </span>
              <span className="block text-xs tracking-widest uppercase text-gold">
                Tax
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => item.children && setOpenDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button className={`flex items-center space-x-1 font-medium transition-colors ${isScrolled ? 'text-gray-800 hover:text-gold' : 'text-white hover:text-gold'
                      }`}>
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                    </button>

                    {/* Dropdown with padding bridge to prevent gap */}
                    <div
                      className={`absolute top-full left-0 pt-3 transition-all duration-200 ${openDropdown === item.name
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-1'
                        }`}
                    >
                      <div className="w-64 bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-gold transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={`font-medium transition-colors ${location.pathname === item.href
                      ? 'text-gold'
                      : isScrolled
                        ? 'text-gray-800 hover:text-gold'
                        : 'text-white hover:text-gold'
                      }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/contact" className="btn-secondary text-sm">
              Book Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden ${isScrolled ? 'text-primary' : 'text-white'}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t shadow-xl"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div>
                      <p className="px-4 py-2 text-gray-700 font-semibold">{item.name}</p>
                      <div className="pl-6 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center btn-primary mt-4"
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}