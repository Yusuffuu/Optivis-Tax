import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Shield,
    CheckCircle,
    Globe,
    TrendingUp,
    Users,
    FileText,
    Briefcase,
    Menu,
    Search
} from 'lucide-react';
import PortalSidebar from '../../components/portal/PortalSidebar';
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
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(mockServices.map(s => s.category))];

    const filteredServices = mockServices.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
        return matchesSearch && matchesCategory && service.active;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <PortalSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="lg:pl-64">
                {/* Top bar */}
                <div className="bg-white border-b sticky top-0 z-30">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-gray-600"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <h1 className="text-2xl font-serif font-bold text-primary">Request a Service</h1>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {/* Search and Filter */}
                    <div className="mb-8 space-y-4">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search services..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category
                                            ? 'bg-primary text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredServices.map((service, index) => {
                            const Icon = iconMap[service.icon] || Briefcase;
                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                                >
                                    <Icon className="w-12 h-12 text-gold mb-4" />
                                    <h3 className="text-lg font-serif font-bold text-primary mb-2">{service.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-500">Starting from</p>
                                        <p className="text-2xl font-bold text-primary">
                                            KSh {service.basePrice?.toLocaleString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedService(service)}
                                        className="btn-primary w-full text-sm"
                                    >
                                        Request This Service
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Request Modal */}
            <RequestServiceModal
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                service={selectedService}
            />
        </div>
    );
}