import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Menu,
    Plus,
    Send,
    Mail,
    Clock
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Modal from '../../components/ui/Modal';
import { mockNewsletters, mockSubscribers } from '../../data/mockData';
import { useForm } from 'react-hook-form';

export default function NewsletterPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
                            <h1 className="text-2xl font-serif font-bold text-primary">Newsletter</h1>
                        </div>
                        <button
                            onClick={() => setIsComposeOpen(true)}
                            className="btn-primary flex items-center text-sm"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Compose Newsletter
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {/* Tabs */}
                    <div className="flex space-x-4 mb-8">
                        <button
                            onClick={() => setSelectedTab('newsletters')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedTab === 'newsletters'
                                ? 'bg-primary text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Newsletters
                        </button>
                        <button
                            onClick={() => setSelectedTab('subscribers')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedTab === 'subscribers'
                                ? 'bg-primary text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Subscribers ({activeSubscribers.length})
                        </button>
                    </div>

                    {selectedTab === 'newsletters' ? (
                        <div className="space-y-4">
                            {newsletters.length > 0 ? (
                                newsletters.map((newsletter, index) => (
                                    <motion.div
                                        key={newsletter.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-xl shadow-sm p-6"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-4">
                                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${newsletter.status === 'sent'
                                                    ? 'bg-green-50'
                                                    : 'bg-yellow-50'
                                                    }`}>
                                                    <Mail className={`w-6 h-6 ${newsletter.status === 'sent'
                                                        ? 'text-green-600'
                                                        : 'text-yellow-600'
                                                        }`} />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-primary text-lg">{newsletter.subject}</h3>
                                                    <p className="text-sm text-gray-500 mt-1">{newsletter.content}</p>
                                                    <div className="flex items-center space-x-4 mt-2">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${newsletter.status === 'sent'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                            {newsletter.status}
                                                        </span>
                                                        {newsletter.sentAt && (
                                                            <span className="text-xs text-gray-500 flex items-center">
                                                                <Clock className="w-3 h-3 mr-1" />
                                                                Sent: {newsletter.sentAt}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">Recipients</p>
                                                <p className="text-2xl font-bold text-primary">{newsletter.recipients}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    No newsletters yet. Click "Compose Newsletter" to create one.
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Subscriber</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Subscribed Date</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {(mockSubscribers || []).map((subscriber) => (
                                            <tr key={subscriber.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                                                            <span className="text-sm font-semibold text-primary">
                                                                {subscriber.name?.charAt(0) || 'S'}
                                                            </span>
                                                        </div>
                                                        <span className="font-medium text-primary">{subscriber.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{subscriber.email}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{subscriber.subscribedAt}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${subscriber.active
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-500'
                                                        }`}>
                                                        {subscriber.active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Compose Newsletter Modal */}
            <Modal
                isOpen={isComposeOpen}
                onClose={() => setIsComposeOpen(false)}
                title="Compose Newsletter"
                size="lg"
            >
                <form onSubmit={handleSubmit(handleSendNewsletter)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                        <input
                            {...register('subject', { required: 'Subject is required' })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Enter newsletter subject..."
                        />
                        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                        <textarea
                            {...register('content', { required: 'Content is required' })}
                            rows={10}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Write your newsletter content here..."
                        />
                        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-700">
                            This newsletter will be sent to {activeSubscribers.length} active subscribers.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleSubmit(handleSaveDraft)}
                            className="btn-outline flex-1"
                        >
                            Save as Draft
                        </button>
                        <button type="submit" className="btn-primary flex-1 flex items-center justify-center">
                            <Send className="w-4 h-4 mr-2" />
                            Send Newsletter
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}