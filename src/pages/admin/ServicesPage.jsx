import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Menu,
    Plus,
    Edit,
    Trash2,
    Shield,
    CheckCircle,
    Globe,
    TrendingUp,
    Users,
    FileText,
    Briefcase
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
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
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [services, setServices] = useState(mockServices);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleAddService = (data) => {
        const newService = {
            id: services.length + 1,
            ...data,
            slug: data.title.toLowerCase().replace(/\s+/g, '-'),
            active: true
        };
        setServices(prev => [...prev, newService]);
        setIsModalOpen(false);
        reset();
    };

    const handleEditService = (service) => {
        setEditingService(service);
        setIsModalOpen(true);
        reset(service);
    };

    const handleDeleteService = (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            setServices(prev => prev.filter(s => s.id !== id));
        }
    };

    const handleToggleActive = (id) => {
        setServices(prev => prev.map(s =>
            s.id === id ? { ...s, active: !s.active } : s
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="lg:pl-64">
                <div className="bg-white border-b sticky top-0 z-30">
                    <div className="px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-gray-600"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <h1 className="text-2xl font-serif font-bold text-primary">Services</h1>
                        </div>
                        <button
                            onClick={() => {
                                setEditingService(null);
                                reset({});
                                setIsModalOpen(true);
                            }}
                            className="btn-primary flex items-center text-sm"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Service
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => {
                            const Icon = iconMap[service.icon] || Briefcase;
                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-xl shadow-sm p-6"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleEditService(service)}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                            >
                                                <Edit className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteService(service.id)}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-serif font-bold text-primary mb-2">{service.title}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-bold text-primary">
                                            KSh {service.basePrice?.toLocaleString()}
                                        </p>
                                        <button
                                            onClick={() => handleToggleActive(service.id)}
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${service.active
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-500'
                                                }`}
                                        >
                                            {service.active ? 'Active' : 'Inactive'}
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Add/Edit Service Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingService ? 'Edit Service' : 'Add New Service'}
                size="lg"
            >
                <form onSubmit={handleSubmit(handleAddService)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Title *</label>
                        <input
                            {...register('title', { required: 'Title is required' })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                        <textarea
                            {...register('description', { required: 'Description is required' })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                {...register('category')}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Base Price (KSh)</label>
                            <input
                                {...register('basePrice', { required: 'Price is required' })}
                                type="number"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            />
                            {errors.basePrice && <p className="text-red-500 text-sm mt-1">{errors.basePrice.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                        <select
                            {...register('icon')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        >
                            <option value="Shield">Shield</option>
                            <option value="CheckCircle">Check Circle</option>
                            <option value="Globe">Globe</option>
                            <option value="TrendingUp">Trending Up</option>
                            <option value="Users">Users</option>
                            <option value="FileText">File Text</option>
                            <option value="Briefcase">Briefcase</option>
                        </select>
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" className="btn-primary flex-1">
                            {editingService ? 'Update Service' : 'Add Service'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="btn-outline flex-1"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}