import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Menu,
    Star,
    CheckCircle,
    XCircle,
    Eye,
    EyeOff,
    User
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { mockTestimonials } from '../../data/mockData';

export default function TestimonialsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [testimonials, setTestimonials] = useState(mockTestimonials);

    const handleApprove = (id) => {
        setTestimonials(prev => prev.map(t =>
            t.id === id ? { ...t, visible: true } : t
        ));
    };

    const handleHide = (id) => {
        setTestimonials(prev => prev.map(t =>
            t.id === id ? { ...t, visible: false } : t
        ));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            setTestimonials(prev => prev.filter(t => t.id !== id));
        }
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
                            <h1 className="text-2xl font-serif font-bold text-primary">Testimonials</h1>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-sm p-6"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                                            <User className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-primary">{testimonial.userName}</h3>
                                            <p className="text-sm text-gray-500">{testimonial.service}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < testimonial.rating
                                                        ? 'text-gold fill-current'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-4">{testimonial.review}</p>

                                <div className="flex items-center justify-between">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${testimonial.visible
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {testimonial.visible ? 'Visible on Website' : 'Pending Review'}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        {!testimonial.visible ? (
                                            <button
                                                onClick={() => handleApprove(testimonial.id)}
                                                className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                                                title="Approve"
                                            >
                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleHide(testimonial.id)}
                                                className="p-2 hover:bg-yellow-50 rounded-lg transition-colors"
                                                title="Hide from website"
                                            >
                                                <EyeOff className="w-5 h-5 text-yellow-600" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(testimonial.id)}
                                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <XCircle className="w-5 h-5 text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}