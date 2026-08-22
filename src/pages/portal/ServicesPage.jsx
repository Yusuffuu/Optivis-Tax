import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield,
    CheckCircle,
    Globe,
    TrendingUp,
    Users,
    FileText,
    Briefcase,
    Search,
    Tag,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import PortalLayout from '../../components/portal/PortalLayout';
import RequestServiceModal from '../../components/portal/RequestServiceModal';
import { mockServices } from '../../data/mockData';

const iconMap = {
    Shield,
    CheckCircle,
    Globe,
    TrendingUp,
    Users,
    FileText,
    Briefcase
};

export default function ServicesPage() {
    const [selectedService, setSelectedService] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(mockServices.map(s => s.category))];

    const filteredServices = mockServices.filter(service => {
        const matchesSearch =
            service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
        return matchesSearch && matchesCategory && service.active;
    });

    return (
        <PortalLayout
            title="Tax & Advisory Services"
            subtitle="Select a practice area or tailored tax compliance solution to submit a request"
        >
            {/* Search & Category Filter */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search tax solutions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto custom-scrollbar">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${selectedCategory === category
                                    ? 'bg-primary text-white shadow-xs'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredServices.map((service, index) => {
                    const Icon = iconMap[service.icon] || Briefcase;
                    return (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 hover:shadow-md hover:border-gold/40 transition-all duration-200 flex flex-col justify-between group"
                        >
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-primary-50 to-primary-100 text-primary border border-primary-200/40 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gold bg-gold/10 px-2.5 py-0.5 rounded-full">
                                        <Tag className="w-3 h-3" />
                                        {service.category}
                                    </span>
                                </div>

                                <h3 className="text-base font-serif font-bold text-primary mb-2 line-clamp-1">
                                    {service.title}
                                </h3>
                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                                    {service.description}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">From</span>
                                        <span className="text-lg font-bold font-serif text-primary">
                                            KSh {service.basePrice?.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedService(service)}
                                    className="w-full py-2.5 px-4 bg-linear-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center space-x-1.5"
                                >
                                    <span>Request Engagement</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-gold" />
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Request Modal */}
            <RequestServiceModal
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                service={selectedService}
            />
        </PortalLayout>
    );
}