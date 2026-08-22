import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Menu,
    Users,
    Briefcase,
    TrendingUp,
    DollarSign,
    CheckCircle,
    Clock,
    Activity
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { mockAnalytics, mockRequests, mockUsers } from '../../data/mockData';

export default function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const stats = [
        {
            label: 'Total Clients',
            value: mockAnalytics.totalClients,
            icon: Users,
            change: '+12%',
            color: 'bg-blue-100 text-blue-600'
        },
        {
            label: 'Active Requests',
            value: mockAnalytics.activeRequests,
            icon: Briefcase,
            change: '+5%',
            color: 'bg-purple-100 text-purple-600'
        },
        {
            label: 'Completed',
            value: mockAnalytics.completedRequests,
            icon: CheckCircle,
            change: '+18%',
            color: 'bg-green-100 text-green-600'
        },
        {
            label: 'Revenue (KSh)',
            value: `${(mockAnalytics.revenue / 1000000).toFixed(1)}M`,
            icon: DollarSign,
            change: '+23%',
            color: 'bg-gold bg-opacity-20 text-gold'
        },
    ];

    const recentRequests = mockRequests.slice(0, 5);

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="lg:pl-64">
                <div className="bg-white border-b sticky top-0 z-30">
                    <div className="px-6 py-4 flex items-center justify-between">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-600"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-serif font-bold text-primary">Admin Dashboard</h1>
                    </div>
                </div>

                <div className="p-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl p-6 shadow-sm"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
                                </div>
                                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Requests */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-xl font-serif font-bold text-primary mb-6">Recent Requests</h3>
                            <div className="space-y-4">
                                {recentRequests.map((request) => (
                                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <p className="font-semibold text-primary">{request.serviceTitle}</p>
                                            <p className="text-sm text-gray-500">{request.requestNumber}</p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${request.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    request.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {request.status.replace('_', ' ')}
                                            </span>
                                            <button className="text-gold hover:text-gold-600">
                                                <Activity className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Services Popularity */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-xl font-serif font-bold text-primary mb-6">Popular Services</h3>
                            <div className="space-y-4">
                                {mockAnalytics.servicesPopularity.map((service) => (
                                    <div key={service.service}>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">{service.service}</span>
                                            <span className="text-sm text-gray-500">{service.count} requests</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gold h-2 rounded-full"
                                                style={{ width: `${(service.count / 50) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}