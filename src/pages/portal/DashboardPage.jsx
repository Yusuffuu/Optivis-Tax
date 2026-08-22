import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Briefcase,
    FileText,
    MessageSquare,
    CheckCircle,
    Clock,
    TrendingUp,
    ChevronRight,
    Menu
} from 'lucide-react';
import PortalSidebar from '../../components/portal/PortalSidebar';
import { useAuth } from '../../context/AuthContext';
import { mockRequests } from '../../data/mockData';

export default function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();
    const userRequests = mockRequests.filter(r => r.userId === user?.id);

    const activeRequests = userRequests.filter(r => r.status === 'in_progress' || r.status === 'pending');
    const completedRequests = userRequests.filter(r => r.status === 'completed');
    const totalSpent = userRequests.reduce((sum, r) => sum + (r.amount || 0), 0);
    const unreadMessages = 3; // Mock data

    const stats = [
        {
            label: 'Active Requests',
            value: activeRequests.length,
            icon: Briefcase,
            color: 'bg-blue-100 text-blue-600',
            href: '/portal/requests'
        },
        {
            label: 'Completed',
            value: completedRequests.length,
            icon: CheckCircle,
            color: 'bg-green-100 text-green-600',
            href: '/portal/requests'
        },
        {
            label: 'Messages',
            value: unreadMessages,
            icon: MessageSquare,
            color: 'bg-purple-100 text-purple-600',
            href: '/portal/chat'
        },
        {
            label: 'Total Spent',
            value: `KSh ${totalSpent.toLocaleString()}`,
            icon: TrendingUp,
            color: 'bg-gold bg-opacity-20 text-gold',
            href: '/portal/receipts'
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <PortalSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="lg:pl-64">
                {/* Top bar */}
                <div className="bg-white border-b sticky top-0 z-30">
                    <div className="px-6 py-4 flex items-center justify-between">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-600"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-serif font-bold text-primary">Dashboard</h1>
                        <Link to="/portal/services" className="btn-primary text-sm">
                            New Request
                        </Link>
                    </div>
                </div>

                <div className="p-6">
                    {/* Welcome */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-primary rounded-2xl p-8 mb-8 text-white"
                    >
                        <h2 className="text-2xl font-serif font-bold mb-2">
                            Welcome back, {user?.fullName?.split(' ')[0] || 'Client'}!
                        </h2>
                        <p className="text-gray-300">
                            Here's an overview of your tax matters with Optivis.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <Link to={stat.href}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                                            <stat.icon className="w-6 h-6" />
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Requests */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-serif font-bold text-primary">Recent Requests</h3>
                            <Link to="/portal/requests" className="text-gold hover:text-gold-600 font-semibold">
                                View All
                            </Link>
                        </div>

                        {userRequests.length > 0 ? (
                            <div className="space-y-4">
                                {userRequests.slice(0, 3).map((request) => (
                                    <Link
                                        key={request.id}
                                        to={`/portal/requests/${request.id}`}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-primary">{request.serviceTitle}</p>
                                                <p className="text-sm text-gray-500">{request.requestNumber}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${request.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    request.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {request.status.replace('_', ' ')}
                                            </span>
                                            <ChevronRight className="w-5 h-5 text-gray-400" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 mb-4">No requests yet</p>
                                <Link to="/portal/services" className="btn-primary text-sm">
                                    Request a Service
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}