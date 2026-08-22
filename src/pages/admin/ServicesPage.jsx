import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Edit,
    Trash2,
    Shield,
    CheckCircle,
    Globe,
    TrendingUp,
    Users,
    FileText,
    Briefcase,
    Tag,
    ToggleLeft,
    ToggleRight,
    Search,
    Sparkles
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/ui/Modal';
import { mockServices } from '../../data/mockData';
import { useForm } from 'react-hook-form';

const iconMap = {
    Shield,
    CheckCircle,
    Globe,
    TrendingUp,
    Users,
    FileText,
    Briefcase
};

export default function AdminServicesPage() {
    const [services, setServices] = useState(mockServices);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const categories = ['All', ...new Set(services.map(s => s.category))];

    const filteredServices = services.filter(service => {
        const matchesCat = selectedCategory === 'All' || service.category === selectedCategory;
        const matchesSearch =
            service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCat && matchesSearch;
    });

    const handleAddService = (data) => {
        if (editingService) {
            setServices(prev => prev.map(s =>
                s.id === editingService.id ? { ...s, ...data, basePrice: Number(data.basePrice) } : s
            ));
        } else {
            const newService = {
                id: services.length + 1,
                ...data,
                basePrice: Number(data.basePrice),
                slug: data.title.toLowerCase().replace(/\s+/g, '-'),
                active: true
            };
            setServices(prev => [...prev, newService]);
        }
        setIsModalOpen(false);
        setEditingService(null);
        reset();
    };

    const handleEditService = (service) => {
        setEditingService(service);
        setIsModalOpen(true);
        reset(service);
    };

    const handleDeleteService = (id) => {
        if (window.confirm('Are you sure you want to remove this service offering?')) {
            setServices(prev => prev.filter(s => s.id !== id));
        }
    };

    const handleToggleActive = (id) => {
        setServices(prev => prev.map(s =>
            s.id === id ? { ...s, active: !s.active } : s
        ));
    };

    const headerActions = (
        <button
            onClick={() => {
                setEditingService(null);
                reset({ category: 'Advisory', icon: 'Shield', active: true });
                setIsModalOpen(true);
            }}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-linear-to-r from-primary to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95"
        >
            <Plus className="w-4 h-4 text-gold" />
            <span>Add Service</span>
        </button>
    );

    return (
        <AdminLayout
            title="Service Catalog"
            subtitle="Manage practice service packages, advisory fees, and catalog visibility"
            headerActions={headerActions}
        >
            {/* Category & Search Toolbar */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search */}
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                    />
                </div>

                {/* Categories Pills */}
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
                            className={`bg-white rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between group ${service.active
                                    ? 'border-slate-200/80 shadow-xs hover:shadow-md hover:border-gold/40'
                                    : 'border-dashed border-slate-300 opacity-60 bg-slate-50/50'
                                }`}
                        >
                            <div>
                                {/* Header / Icon & Actions */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-primary-50 to-primary-100 text-primary border border-primary-200/40 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>

                                    <div className="flex items-center space-x-1">
                                        <button
                                            onClick={() => handleEditService(service)}
                                            className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                                            title="Edit Service"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteService(service.id)}
                                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                            title="Delete Service"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Category Tag */}
                                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-md mb-2">
                                    <Tag className="w-3 h-3" />
                                    <span>{service.category}</span>
                                </div>

                                <h3 className="text-base font-serif font-bold text-primary mb-2 line-clamp-1">
                                    {service.title}
                                </h3>
                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                                    {service.description}
                                </p>
                            </div>

                            {/* Footer / Price & Active Switch */}
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Base Retainer</span>
                                    <span className="text-base font-bold font-serif text-primary">
                                        KSh {service.basePrice?.toLocaleString()}
                                    </span>
                                </div>

                                <button
                                    onClick={() => handleToggleActive(service.id)}
                                    className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${service.active
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                                        }`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${service.active ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                                    <span>{service.active ? 'Active' : 'Hidden'}</span>
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Add / Edit Service Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingService(null);
                }}
                title={editingService ? 'Edit Service Details' : 'Add New Service Package'}
                size="lg"
            >
                <form onSubmit={handleSubmit(handleAddService)} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            Service Title *
                        </label>
                        <input
                            {...register('title', { required: 'Service title is required' })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                            placeholder="e.g. Corporate Tax Compliance & Return Filing"
                        />
                        {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            Detailed Description *
                        </label>
                        <textarea
                            {...register('description', { required: 'Description is required' })}
                            rows={3}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                            placeholder="Summary of scope, filings included, and advisory support..."
                        />
                        {errors.description && <p className="text-rose-500 text-xs mt-1">{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                Category
                            </label>
                            <select
                                {...register('category')}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                            >
                                <option value="Advisory">Advisory</option>
                                <option value="Compliance">Compliance</option>
                                <option value="International">International</option>
                                <option value="Corporate">Corporate</option>
                                <option value="Personal">Personal</option>
                                <option value="Registration">Registration</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                Base Retainer (KES) *
                            </label>
                            <input
                                {...register('basePrice', { required: 'Base price is required' })}
                                type="number"
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                placeholder="50000"
                            />
                            {errors.basePrice && <p className="text-rose-500 text-xs mt-1">{errors.basePrice.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            Visual Icon
                        </label>
                        <select
                            {...register('icon')}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                        >
                            <option value="Shield">Shield (Protection / Audit)</option>
                            <option value="CheckCircle">CheckCircle (Compliance)</option>
                            <option value="Globe">Globe (Cross-Border / International)</option>
                            <option value="TrendingUp">TrendingUp (Planning / Wealth)</option>
                            <option value="Users">Users (Corporate / Payroll)</option>
                            <option value="FileText">FileText (Filings & Returns)</option>
                            <option value="Briefcase">Briefcase (General Advisory)</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => {
                                setIsModalOpen(false);
                                setEditingService(null);
                            }}
                            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 px-4 bg-linear-to-r from-primary to-primary-600 text-white rounded-xl text-xs font-bold hover:from-primary-600 hover:to-primary-700 shadow-sm transition-all"
                        >
                            {editingService ? 'Update Service' : 'Publish Service'}
                        </button>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}