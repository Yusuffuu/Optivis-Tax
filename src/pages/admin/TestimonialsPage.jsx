import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star,
    CheckCircle,
    XCircle,
    Eye,
    EyeOff,
    User,
    Building2,
    Trash2,
    Search,
    MessageSquare,
    Sparkles
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { mockTestimonials } from '../../data/mockData';

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState(mockTestimonials);
    const [filter, setFilter] = useState('all'); // all, visible, pending
    const [searchTerm, setSearchTerm] = useState('');

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
        if (window.confirm('Are you sure you want to remove this client review?')) {
            setTestimonials(prev => prev.filter(t => t.id !== id));
        }
    };

    const filteredTestimonials = testimonials.filter(t => {
        const matchesFilter =
            filter === 'all' ? true : filter === 'visible' ? t.visible : !t.visible;
        const matchesSearch =
            t.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.service.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const visibleCount = testimonials.filter(t => t.visible).length;
    const pendingCount = testimonials.filter(t => !t.visible).length;

    return (
        <AdminLayout
            title="Client Testimonials"
            subtitle="Curate and approve public feedback and client endorsements displayed on the website"
        >
            {/* Filter Toolbar */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search testimonials..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                    />
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'all' ? 'bg-white text-primary shadow-xs' : 'hover:text-primary'
                            }`}
                    >
                        All ({testimonials.length})
                    </button>
                    <button
                        onClick={() => setFilter('visible')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'visible' ? 'bg-white text-primary shadow-xs' : 'hover:text-primary'
                            }`}
                    >
                        Live on Site ({visibleCount})
                    </button>
                    <button
                        onClick={() => setFilter('pending')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'pending' ? 'bg-white text-primary shadow-xs' : 'hover:text-primary'
                            }`}
                    >
                        Pending ({pendingCount})
                    </button>
                </div>
            </div>

            {/* Testimonials Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredTestimonials.length > 0 ? (
                    filteredTestimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5 flex flex-col justify-between hover:shadow-md transition-all"
                        >
                            <div>
                                {/* Header / User + Stars */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-11 h-11 rounded-2xl bg-linear-to-tr from-primary to-primary-700 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                                            {testimonial.userName.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-800 text-sm">{testimonial.userName}</h3>
                                            <p className="text-xs text-gold font-medium">{testimonial.service}</p>
                                        </div>
                                    </div>

                                    {/* Star Rating */}
                                    <div className="flex items-center space-x-0.5 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3.5 h-3.5 ${i < testimonial.rating
                                                        ? 'text-gold fill-gold'
                                                        : 'text-slate-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Review Quote */}
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-4 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                                    "{testimonial.review}"
                                </p>
                            </div>

                            {/* Footer / Status & Action Buttons */}
                            <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                                <span
                                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold gap-1.5 ${testimonial.visible
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                                        }`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${testimonial.visible ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                    <span>{testimonial.visible ? 'Live on Website' : 'Pending Approval'}</span>
                                </span>

                                <div className="flex items-center space-x-1.5">
                                    {!testimonial.visible ? (
                                        <button
                                            onClick={() => handleApprove(testimonial.id)}
                                            className="inline-flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-all"
                                            title="Approve and Show on Website"
                                        >
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            <span>Approve</span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleHide(testimonial.id)}
                                            className="inline-flex items-center space-x-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                                            title="Hide from Public View"
                                        >
                                            <EyeOff className="w-3.5 h-3.5" />
                                            <span>Hide</span>
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(testimonial.id)}
                                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                        title="Delete Review"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400">
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p className="font-semibold text-slate-600">No testimonials match your filter</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}