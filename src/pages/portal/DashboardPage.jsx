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
    ArrowUpRight,
    Plus,
    Receipt,
    Shield,
    Sparkles
} from 'lucide-react';
import PortalLayout from '../../components/portal/PortalLayout';
import { useAuth } from '../../context/AuthContext';
import { mockRequests } from '../../data/mockData';

export default function DashboardPage() {
    const { user } = useAuth();
    const userRequests = mockRequests.filter(r => r.userId === user?.id);

    const activeRequests = userRequests.filter(r => r.status === 'in_progress' || r.status === 'pending');
    const completedRequests = userRequests.filter(r => r.status === 'completed');
    const totalSpent = userRequests.reduce((sum, r) => sum + (r.amount || 0), 0);
    const unreadMessages = 2;

    const stats = [
        {
            label: 'Ongoing Requests',
            value: activeRequests.length,
            icon: Briefcase,
            color: 'bg-blue-500/10 text-blue-600 border-blue-200/50',
            href: '/portal/requests',
            hint: 'In progress or pending review'
        },
        {
            label: 'Completed Filings',
            value: completedRequests.length,
            icon: CheckCircle,
            color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200/50',
            href: '/portal/requests',
            hint: 'Successfully processed'
        },
        {
            label: 'Consultation Chat',
            value: `${unreadMessages} New`,
            icon: MessageSquare,
            color: 'bg-purple-500/10 text-purple-600 border-purple-200/50',
            href: '/portal/chat',
            hint: 'Tax specialist channel'
        },
        {
            label: 'Total Invoiced',
            value: `KES ${totalSpent.toLocaleString()}`,
            icon: Receipt,
            color: 'bg-gold/15 text-gold border-gold/30',
            href: '/portal/receipts',
            hint: 'View official receipts'
        },
    ];

    const headerActions = (
        <Link
            to="/portal/services"
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-linear-to-r from-primary to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95"
        >
            <Plus className="w-4 h-4 text-gold" />
            <span>Request Service</span>
        </Link>
    );

    return (
        <PortalLayout
            title="Client Dashboard"
            subtitle="Real-time overview of your tax compliance status, advisory engagements, and receipts"
            headerActions={headerActions}
        >
            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#0A2A66] via-[#0D3685] to-[#041129] text-white p-6 sm:p-8 shadow-xl border border-white/10 mb-8"
            >
                <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 bg-gold/15 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute left-1/3 bottom-0 -mb-12 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-semibold border border-gold/30">
                            <Shield className="w-3.5 h-3.5" />
                            <span>Optivis Secure Client Portal</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                            Welcome back, {user?.fullName || 'Valued Client'}
                        </h2>
                        <p className="text-sm text-slate-200/90 leading-relaxed font-sans">
                            Track the progress of your statutory returns, tax advisory requests, and direct communication with assigned specialists.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            to="/portal/services"
                            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-gold text-[#0A2A66] hover:bg-gold-300 font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                        >
                            <Plus className="w-4 h-4" />
                            <span>New Service Request</span>
                        </Link>
                        <Link
                            to="/portal/chat"
                            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 backdrop-blur-xs transition-colors"
                        >
                            <MessageSquare className="w-4 h-4 text-gold" />
                            <span>Specialist Chat</span>
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Stats Cards */}
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
                            className="block bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 hover:shadow-md hover:border-gold/40 transition-all duration-200 group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${stat.color} group-hover:scale-105 transition-transform`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-gold transition-colors" />
                            </div>
                            <p className="text-2xl font-serif font-bold text-primary tracking-tight">
                                {stat.value}
                            </p>
                            <p className="text-xs font-semibold text-slate-700 mt-0.5">{stat.label}</p>
                            <p className="text-[11px] text-slate-400 mt-1">{stat.hint}</p>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Recent Requests Section */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6">
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                    <div>
                        <h3 className="text-lg font-serif font-bold text-primary">Your Active & Recent Matters</h3>
                        <p className="text-xs text-slate-500">Real-time status updates from Optivis tax team</p>
                    </div>
                    <Link
                        to="/portal/requests"
                        className="text-xs font-bold text-gold hover:text-gold-600 flex items-center gap-1 transition-colors"
                    >
                        <span>View All Requests</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                {userRequests.length > 0 ? (
                    <div className="space-y-3">
                        {userRequests.slice(0, 4).map((request) => (
                            <Link
                                key={request.id}
                                to={`/portal/requests/${request.id}`}
                                className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 transition-all group"
                            >
                                <div className="flex items-center space-x-3.5 min-w-0">
                                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                        <FileText className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-slate-800 text-sm truncate group-hover:text-primary transition-colors">
                                            {request.serviceTitle}
                                        </h4>
                                        <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                                            <span className="font-mono">{request.requestNumber}</span>
                                            <span>•</span>
                                            <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {request.createdAt}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 shrink-0">
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
                                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-400">
                        <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <h4 className="font-serif font-bold text-slate-700 text-base mb-1">No Active Requests</h4>
                        <p className="text-xs text-slate-500 mb-4">You have not submitted any tax service requests yet.</p>
                        <Link to="/portal/services" className="btn-primary text-xs">
                            Explore Tax Advisory Services
                        </Link>
                    </div>
                )}
            </div>
        </PortalLayout>
    );
}