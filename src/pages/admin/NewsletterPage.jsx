import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Send,
    Mail,
    Clock,
    Users,
    CheckCircle,
    FileText,
    TrendingUp,
    Radio,
    Calendar,
    Sparkles
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/ui/Modal';
import { mockNewsletters, mockSubscribers } from '../../data/mockData';
import { useForm } from 'react-hook-form';

export default function NewsletterPage() {
    const [newsletters, setNewsletters] = useState(mockNewsletters || []);
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('newsletters');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const activeSubscribers = (mockSubscribers || []).filter(s => s.active);

    const handleSendNewsletter = (data) => {
        const newNewsletter = {
            id: newsletters.length + 1,
            subject: data.subject,
            content: data.content,
            status: 'sent',
            sentAt: new Date().toLocaleString(),
            recipients: activeSubscribers.length
        };
        setNewsletters(prev => [newNewsletter, ...prev]);
        setIsComposeOpen(false);
        reset();
    };

    const handleSaveDraft = (data) => {
        const newDraft = {
            id: newsletters.length + 1,
            subject: data.subject,
            content: data.content,
            status: 'draft',
            sentAt: null,
            recipients: 0
        };
        setNewsletters(prev => [newDraft, ...prev]);
        setIsComposeOpen(false);
        reset();
    };

    const headerActions = (
        <button
            onClick={() => {
                reset();
                setIsComposeOpen(true);
            }}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-linear-to-r from-primary to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95"
        >
            <Plus className="w-4 h-4 text-gold" />
            <span>Compose Newsletter</span>
        </button>
    );

    return (
        <AdminLayout
            title="Newsletters & Dispatches"
            subtitle="Broadcast monthly statutory tax bulletins, compliance alerts, and policy changes"
            headerActions={headerActions}
        >
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Subscribers</p>
                        <p className="text-2xl font-serif font-bold text-primary mt-0.5">{activeSubscribers.length}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Users className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Broadcasts Sent</p>
                        <p className="text-2xl font-serif font-bold text-emerald-600 mt-0.5">
                            {newsletters.filter(n => n.status === 'sent').length}
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Send className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg. Engagement</p>
                        <p className="text-2xl font-serif font-bold text-gold mt-0.5">94.2%</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600 max-w-xs mb-6">
                <button
                    onClick={() => setSelectedTab('newsletters')}
                    className={`flex-1 py-2 rounded-lg transition-all ${selectedTab === 'newsletters' ? 'bg-white text-primary shadow-xs' : 'hover:text-primary'
                        }`}
                >
                    Dispatches ({newsletters.length})
                </button>
                <button
                    onClick={() => setSelectedTab('subscribers')}
                    className={`flex-1 py-2 rounded-lg transition-all ${selectedTab === 'subscribers' ? 'bg-white text-primary shadow-xs' : 'hover:text-primary'
                        }`}
                >
                    Subscribers ({activeSubscribers.length})
                </button>
            </div>

            {/* Tab 1: Newsletters List */}
            {selectedTab === 'newsletters' ? (
                <div className="space-y-4">
                    {newsletters.length > 0 ? (
                        newsletters.map((newsletter, index) => (
                            <motion.div
                                key={newsletter.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5 hover:shadow-md transition-all"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-start space-x-4 min-w-0">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${newsletter.status === 'sent'
                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200/50'
                                                : 'bg-amber-50 text-amber-600 border-amber-200/50'
                                            }`}>
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-primary text-base truncate">{newsletter.subject}</h3>
                                            <p className="text-xs text-slate-500 line-clamp-2 mt-1">{newsletter.content}</p>
                                            <div className="flex items-center space-x-3 mt-2 text-xs">
                                                <span className={`px-2.5 py-0.5 rounded-full font-semibold capitalize ${newsletter.status === 'sent'
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                                                    }`}>
                                                    {newsletter.status}
                                                </span>
                                                {newsletter.sentAt && (
                                                    <span className="text-slate-400 flex items-center">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        Sent: {newsletter.sentAt}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:text-right shrink-0 bg-slate-50 p-3 rounded-xl border border-slate-100 min-w-32">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Audience</span>
                                        <p className="text-xl font-bold font-serif text-primary mt-0.5">
                                            {newsletter.recipients} <span className="text-xs font-sans font-normal text-slate-500">recipients</span>
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400">
                            <Mail className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                            <p className="font-semibold text-slate-600">No newsletters dispatched yet</p>
                            <p className="text-xs text-slate-400 mt-1">Click "Compose Newsletter" to send your first bulletin.</p>
                        </div>
                    )}
                </div>
            ) : (
                /* Tab 2: Subscribers Table */
                <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                                    <th className="px-6 py-3.5">Subscriber</th>
                                    <th className="px-6 py-3.5">Email Address</th>
                                    <th className="px-6 py-3.5">Subscribed Date</th>
                                    <th className="px-6 py-3.5">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {(mockSubscribers || []).map((subscriber) => (
                                    <tr key={subscriber.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-bold text-xs">
                                                    {subscriber.name?.charAt(0) || 'S'}
                                                </div>
                                                <span className="font-semibold text-slate-800">{subscriber.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-mono text-slate-600">{subscriber.email}</td>
                                        <td className="px-6 py-4 text-xs text-slate-500">{subscriber.subscribedAt}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${subscriber.active
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                {subscriber.active ? 'Subscribed' : 'Unsubscribed'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Compose Newsletter Modal */}
            <Modal
                isOpen={isComposeOpen}
                onClose={() => setIsComposeOpen(false)}
                title="Compose Tax Dispatch Newsletter"
                size="lg"
            >
                <form onSubmit={handleSubmit(handleSendNewsletter)} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            Newsletter Subject *
                        </label>
                        <input
                            {...register('subject', { required: 'Subject line is required' })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                            placeholder="e.g. Optivis Monthly Tax Brief: Q3 VAT Filing Deadlines & Amendments"
                        />
                        {errors.subject && <p className="text-rose-500 text-xs mt-1">{errors.subject.message}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            Bulletin Content *
                        </label>
                        <textarea
                            {...register('content', { required: 'Content is required' })}
                            rows={8}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all font-sans"
                            placeholder="Write your email body, key takeaways, and advisory notes..."
                        />
                        {errors.content && <p className="text-rose-500 text-xs mt-1">{errors.content.message}</p>}
                    </div>

                    <div className="bg-blue-50/80 border border-blue-200/60 p-3.5 rounded-xl flex items-center space-x-3 text-xs text-blue-800">
                        <Users className="w-5 h-5 text-blue-600 shrink-0" />
                        <p>
                            This dispatch will be immediately broadcast to <strong className="text-primary">{activeSubscribers.length} verified active subscribers</strong>.
                        </p>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={handleSubmit(handleSaveDraft)}
                            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                        >
                            Save Draft
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 px-4 bg-linear-to-r from-primary to-primary-600 text-white rounded-xl text-xs font-bold hover:from-primary-600 hover:to-primary-700 shadow-sm transition-all flex items-center justify-center space-x-1.5"
                        >
                            <Send className="w-3.5 h-3.5 text-gold" />
                            <span>Broadcast Newsletter</span>
                        </button>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}