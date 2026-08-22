import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    FileText,
    Clock,
    Tag,
    User,
    Calendar,
    Search,
    CheckCircle,
    Send
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/ui/Modal';
import { mockBlogPosts } from '../../data/mockData';
import { useForm } from 'react-hook-form';

export default function AdminBlogPage() {
    const [posts, setPosts] = useState(mockBlogPosts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const filteredPosts = posts.filter(post => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleAddPost = (data) => {
        if (editingPost) {
            setPosts(prev => prev.map(p =>
                p.id === editingPost.id ? { ...p, ...data } : p
            ));
        } else {
            const newPost = {
                id: posts.length + 1,
                ...data,
                slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                status: 'published',
                date: new Date().toISOString().split('T')[0],
                readTime: '5 min read'
            };
            setPosts(prev => [newPost, ...prev]);
        }
        setIsModalOpen(false);
        setEditingPost(null);
        reset();
    };

    const handleEditPost = (post) => {
        setEditingPost(post);
        setIsModalOpen(true);
        reset(post);
    };

    const handleDeletePost = (id) => {
        if (window.confirm('Are you sure you want to delete this publication?')) {
            setPosts(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleToggleStatus = (id) => {
        setPosts(prev => prev.map(p =>
            p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p
        ));
    };

    const headerActions = (
        <button
            onClick={() => {
                setEditingPost(null);
                reset({
                    category: 'Kenyan Tax Updates',
                    author: 'Optivis Tax Research Team'
                });
                setIsModalOpen(true);
            }}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-linear-to-r from-primary to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95"
        >
            <Plus className="w-4 h-4 text-gold" />
            <span>New Insight Article</span>
        </button>
    );

    return (
        <AdminLayout
            title="Insights & Articles"
            subtitle="Author and publish tax legislation analysis, regulatory updates, and client advisories"
            headerActions={headerActions}
        >
            {/* Toolbar */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search publications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                    />
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                    <button
                        onClick={() => setStatusFilter('all')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === 'all' ? 'bg-white text-primary shadow-xs' : 'hover:text-primary'}`}
                    >
                        All ({posts.length})
                    </button>
                    <button
                        onClick={() => setStatusFilter('published')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === 'published' ? 'bg-white text-primary shadow-xs' : 'hover:text-primary'}`}
                    >
                        Published ({posts.filter(p => p.status === 'published').length})
                    </button>
                    <button
                        onClick={() => setStatusFilter('draft')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === 'draft' ? 'bg-white text-primary shadow-xs' : 'hover:text-primary'}`}
                    >
                        Drafts ({posts.filter(p => p.status === 'draft').length})
                    </button>
                </div>
            </div>

            {/* Articles Table */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                                <th className="px-6 py-3.5">Article Title</th>
                                <th className="px-6 py-3.5">Category</th>
                                <th className="px-6 py-3.5">Author</th>
                                <th className="px-6 py-3.5">Status</th>
                                <th className="px-6 py-3.5">Date</th>
                                <th className="px-6 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {filteredPosts.length > 0 ? (
                                filteredPosts.map((post) => (
                                    <tr key={post.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4 max-w-sm">
                                            <p className="font-semibold text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
                                                {post.title}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1 flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {post.readTime}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-600 font-medium">
                                            <div className="flex items-center space-x-1.5">
                                                <User className="w-3.5 h-3.5 text-slate-400" />
                                                <span>{post.author}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleStatus(post.id)}
                                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize gap-1.5 transition-all ${post.status === 'published'
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                                        : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                                                    }`}
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full ${post.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                {post.status}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-500 font-mono">
                                            {post.date}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-1.5">
                                                <button
                                                    onClick={() => handleEditPost(post)}
                                                    className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                                                    title="Edit Post"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeletePost(post.id)}
                                                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                    title="Delete Post"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                        <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                                        <p className="font-semibold text-slate-600">No insight articles found</p>
                                        <p className="text-xs text-slate-400 mt-1">Click "New Insight Article" to publish thought leadership.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Compose / Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingPost(null);
                }}
                title={editingPost ? 'Edit Insight Article' : 'Draft New Insight Article'}
                size="xl"
            >
                <form onSubmit={handleSubmit(handleAddPost)} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            Headline / Title *
                        </label>
                        <input
                            {...register('title', { required: 'Headline is required' })}
                            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                            placeholder="e.g. Navigating the 2026 Kenyan Finance Act Provisions"
                        />
                        {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
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
                                <option value="Kenyan Tax Updates">Kenyan Tax Updates</option>
                                <option value="Global Tax Trends">Global Tax Trends</option>
                                <option value="Corporate Tax Advisory">Corporate Tax Advisory</option>
                                <option value="Guides & FAQs">Guides & FAQs</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                Lead Author / Team *
                            </label>
                            <input
                                {...register('author', { required: 'Author is required' })}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                placeholder="Optivis Advisory Practice"
                            />
                            {errors.author && <p className="text-rose-500 text-xs mt-1">{errors.author.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            Executive Excerpt *
                        </label>
                        <textarea
                            {...register('excerpt', { required: 'Excerpt is required' })}
                            rows={2}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                            placeholder="A concise summary highlighting the key regulatory impact for clients..."
                        />
                        {errors.excerpt && <p className="text-rose-500 text-xs mt-1">{errors.excerpt.message}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            Article Body Content *
                        </label>
                        <textarea
                            {...register('content', { required: 'Content is required' })}
                            rows={8}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all font-sans"
                            placeholder="Draft your full article text, analysis, and statutory recommendations here..."
                        />
                        {errors.content && <p className="text-rose-500 text-xs mt-1">{errors.content.message}</p>}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => {
                                setIsModalOpen(false);
                                setEditingPost(null);
                            }}
                            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 px-4 bg-linear-to-r from-primary to-primary-600 text-white rounded-xl text-xs font-bold hover:from-primary-600 hover:to-primary-700 shadow-sm transition-all"
                        >
                            {editingPost ? 'Save Updates' : 'Publish to Insights'}
                        </button>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}