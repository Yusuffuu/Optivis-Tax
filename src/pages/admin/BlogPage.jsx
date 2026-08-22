import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Menu,
    Plus,
    Edit,
    Trash2,
    Eye,
    FileText,
    Clock
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Modal from '../../components/ui/Modal';
import { mockBlogPosts } from '../../data/mockData';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function AdminBlogPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [posts, setPosts] = useState(mockBlogPosts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleAddPost = (data) => {
        const newPost = {
            id: posts.length + 1,
            ...data,
            slug: data.title.toLowerCase().replace(/\s+/g, '-'),
            status: 'draft',
            date: new Date().toISOString().split('T')[0],
            readTime: '5 min read'
        };
        setPosts(prev => [newPost, ...prev]);
        setIsModalOpen(false);
        reset();
    };

    const handleEditPost = (post) => {
        setEditingPost(post);
        setIsModalOpen(true);
        reset(post);
    };

    const handleDeletePost = (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setPosts(prev => prev.filter(p => p.id !== id));
        }
    };

    const handlePublish = (id) => {
        setPosts(prev => prev.map(p =>
            p.id === id ? { ...p, status: 'published' } : p
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
                            <h1 className="text-2xl font-serif font-bold text-primary">Blog Posts</h1>
                        </div>
                        <button
                            onClick={() => {
                                setEditingPost(null);
                                reset({});
                                setIsModalOpen(true);
                            }}
                            className="btn-primary flex items-center text-sm"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            New Post
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Title</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Category</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Author</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {posts.map((post) => (
                                        <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-primary">{post.title}</p>
                                                <p className="text-xs text-gray-500 flex items-center mt-1">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {post.readTime}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                                    {post.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{post.author}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${post.status === 'published'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {post.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{post.date}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    {post.status !== 'published' && (
                                                        <button
                                                            onClick={() => handlePublish(post.id)}
                                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                            title="Publish"
                                                        >
                                                            <Eye className="w-4 h-4 text-green-600" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleEditPost(post)}
                                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                    >
                                                        <Edit className="w-4 h-4 text-gray-600" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeletePost(post.id)}
                                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-600" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Post Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingPost ? 'Edit Post' : 'New Blog Post'}
                size="xl"
            >
                <form onSubmit={handleSubmit(handleAddPost)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                        <input
                            {...register('title', { required: 'Title is required' })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                {...register('category')}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            >
                                <option value="Kenyan Tax Updates">Kenyan Tax Updates</option>
                                <option value="Global Tax Trends">Global Tax Trends</option>
                                <option value="Guides & FAQs">Guides & FAQs</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                            <input
                                {...register('author', { required: 'Author is required' })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            />
                            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                        <textarea
                            {...register('excerpt', { required: 'Excerpt is required' })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        />
                        {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                        <textarea
                            {...register('content', { required: 'Content is required' })}
                            rows={10}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Write your blog post content here..."
                        />
                        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                        <input
                            {...register('tags')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            placeholder="tax, compliance, kenya"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" className="btn-primary flex-1">
                            {editingPost ? 'Update Post' : 'Create Post'}
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