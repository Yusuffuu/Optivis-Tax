import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Users,
    Briefcase,
    CheckCircle,
    DollarSign,
    Activity,
    ArrowUpRight,
    Plus,
    MessageSquare,
    FileText,
    TrendingUp,
    Shield,
    Calendar,
    Clock
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { mockAnalytics, mockRequests, mockUsers } from '../../data/mockData';

export default function AdminDashboard() {
    const stats = [
        {
            label: 'Total Clients',
            value: mockAnalytics.totalClients,
            icon: Users,
            change: '+12% this month',
            isPositive: true,
            iconBg: 'bg-blue-500/10 text-blue-600 border-blue-200/50',
            glow: 'hover:border-blue-300/50',
            href: '/admin/clients'
        },
        {
            label: 'Active Requests',
            value: mockAnalytics.activeRequests,
            icon: Briefcase,
            change: '+5% pending',
            isPositive: true,
            iconBg: 'bg-purple-500/10 text-purple-600 border-purple-200/50',
            glow: 'hover:border-purple-300/50',
            href: '/admin/chat'
        },
        {
            label: 'Completed Tasks',
            value: mockAnalytics.completedRequests,
            icon: CheckCircle,
            change: '+18% completed',
            isPositive: true,
            iconBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-200/50',
            glow: 'hover:border-emerald-300/50',
            href: '/admin/services'
        },
        {
            label: 'Revenue (KES)',
            value: `${(mockAnalytics.revenue / 1000000).toFixed(2)}M`,
            icon: DollarSign,
            change: '+23% YoY',
            isPositive: true,
            iconBg: 'bg-gold/15 text-gold border-gold/30',
            glow: 'hover:border-gold/50',
            href: '/admin/settings'
        },
    ];

    const recentRequests = mockRequests.slice(0, 5);

    const headerActions = (
        <div className="flex items-center space-x-2">
            <Link
                to="/admin/services"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-linear-to-r from-primary to-primary-600 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md hover:from-primary-600 hover:to-primary-700 transition-all active:scale-95"
            >
                <Plus className="w-3.5 h-3.5 text-gold" />
                <span>New Service</span>
            </Link>
            <Link
                to="/admin/newsletter"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 text-xs font-semibold rounded-xl transition-colors"
            >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Send Newsletter</span>
            </Link>
        </div>
    );

    return (
        <AdminLayout
            title="Admin Dashboard"
            subtitle="Executive practice analytics, ongoing client requests, and revenue metrics"
            headerActions={headerActions}
        >
            {/* Welcome Banner Card with Glassmorphic Luxury Gradient */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#0A2A66] via-[#0D3685] to-[#041129] text-white p-6 sm:p-8 shadow-xl border border-white/10 mb-8"
            >
                {/* Background decorative luxury shapes */}
                <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute left-1/3 bottom-0 -mb-12 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-semibold border border-gold/30">
                            <Shield className="w-3.5 h-3.5" />
                            <span>Optivis Practice Management System</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                            Welcome back, Administrator
                        </h2>
                        <p className="text-sm text-slate-200/90 leading-relaxed font-sans">
                            All tax filing pipelines and client advisories are running smoothly. You have <span className="text-gold font-bold">{mockAnalytics.activeRequests} active requests</span> awaiting specialist review today.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            to="/admin/chat"
                            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-gold text-[#0A2A66] hover:bg-gold-300 font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>Open Client Chat</span>
                        </Link>
                        <Link
                            to="/admin/clients"
                            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 backdrop-blur-xs transition-colors"
                        >
                            <Users className="w-4 h-4 text-gold" />
                            <span>Manage Clients</span>
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.25 }}
                    >
                        <Link
                            to={stat.href}
                            className={`block bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 hover:shadow-md transition-all duration-200 group ${stat.glow}`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${stat.iconBg} group-hover:scale-105 transition-transform`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <span className="inline-flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-2xl sm:text-3xl font-serif font-bold text-primary tracking-tight">
                                {stat.value}
                            </p>
                            <div className="flex items-center justify-between mt-1">
                                <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                                <span className="text-xs text-gold font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                    View →
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Service Requests */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="text-lg font-serif font-bold text-primary">Recent Client Requests</h3>
                                <p className="text-xs text-slate-500">Live feed of incoming tax matters & status</p>
                            </div>
                            <Link
                                to="/admin/chat"
                                className="text-xs font-bold text-gold hover:text-gold-600 flex items-center gap-1 transition-colors"
                            >
                                <span>View All</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {recentRequests.map((request) => (
                                <div
                                    key={request.id}
                                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 transition-colors"
                                >
                                    <div className="flex items-center space-x-3.5 min-w-0">
                                        <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary shrink-0">
                                            <FileText className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-slate-800 truncate">{request.serviceTitle}</p>
                                            <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                                                <span className="font-mono">{request.requestNumber}</span>
                                                <span>•</span>
                                                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {request.createdAt}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3 shrink-0">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize flex items-center gap-1.5 ${request.status === 'completed'
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                                                : request.status === 'in_progress'
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-200/50'
                                                    : 'bg-amber-50 text-amber-700 border border-amber-200/50'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${request.status === 'completed' ? 'bg-emerald-500' : request.status === 'in_progress' ? 'bg-blue-500' : 'bg-amber-500'
                                                }`} />
                                            {request.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>Showing top 5 recent requests</span>
                        <Link to="/admin/chat" className="text-primary font-bold hover:underline">Process in Chat</Link>
                    </div>
                </div>

                {/* Popular Advisory Services */}
                <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="text-lg font-serif font-bold text-primary">Service Demand</h3>
                                <p className="text-xs text-slate-500">Volume breakdown by engagement type</p>
                            </div>
                            <Link to="/admin/services" className="text-xs font-bold text-gold hover:text-gold-600 transition-colors">
                                Manage
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {mockAnalytics.servicesPopularity.map((service, idx) => {
                                const percentage = Math.round((service.count / 50) * 100);
                                return (
                                    <div key={service.service} className="space-y-1.5">
                                        <div className="flex justify-between text-xs">
                                            <span className="font-semibold text-slate-700">{service.service}</span>
                                            <span className="text-slate-500 font-mono">{service.count} filings ({percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                                className="bg-linear-to-r from-primary to-gold h-full rounded-full"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-linear-to-brrom-gold/10 to-gold/5 border border-gold/20">
                        <div className="flex items-center space-x-2 text-gold font-bold text-xs">
                            <TrendingUp className="w-4 h-4 text-gold" />
                            <span>Advisory Insight</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                            International Tax & Transfer Pricing demand is up 34% this quarter due to mid-year compliance deadlines.
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}