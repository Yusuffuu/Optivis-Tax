import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Search,
    FileText,
    ChevronRight,
    Clock,
    Plus,
    Calendar,
    CheckCircle,
    ArrowUpRight
} from 'lucide-react';
import PortalLayout from '../../components/portal/PortalLayout';
import { useAuth } from '../../context/AuthContext';
import { mockRequests } from '../../data/mockData';

export default function RequestsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const { user } = useAuth();

    const userRequests = mockRequests.filter(r => r.userId === user?.id);

    const filteredRequests = userRequests.filter(request => {
        const matchesSearch =
            request.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.requestNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const statuses = [
        { id: 'all', label: 'All Requests' },
        { id: 'in_progress', label: 'In Progress' },
        { id: 'pending', label: 'Pending' },
        { id: 'completed', label: 'Completed' }
    ];

    const headerActions = (
        <Link
            to="/portal/services"
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-linear-to-r from-primary to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95"
        >
            <Plus className="w-4 h-4 text-gold" />
            <span>New Request</span>
        </Link>
    );

    return (
        <PortalLayout
            title="My Requests & Engagements"
            subtitle="Track document submissions, specialist review stages, and completed tax filings"
            headerActions={headerActions}
        >
            {/* Search & Filter Toolbar */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by title or reference number..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                    />
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600 overflow-x-auto custom-scrollbar">
                    {statuses.map(st => (
                        <button
                            key={st.id}
                            onClick={() => setStatusFilter(st.id)}
                            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${statusFilter === st.id ? 'bg-white text-primary shadow-xs' : 'hover:text-primary'
                                }`}
                        >
                            {st.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Requests List */}
            {filteredRequests.length > 0 ? (
                <div className="space-y-3.5">
                    {filteredRequests.map((request, index) => (
                        <motion.div
                            key={request.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                to={`/portal/requests/${request.id}`}
                                className="block bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5 hover:shadow-md hover:border-gold/40 transition-all group"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-start space-x-4 min-w-0">
                                        <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-primary-50 to-primary-100 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-primary-200/40">
                                            <FileText className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-semibold text-slate-800 text-base truncate group-hover:text-primary transition-colors">
                                                    {request.serviceTitle}
                                                </h3>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1">
                                                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">{request.requestNumber}</span>
                                                <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> Submitted: {request.createdAt}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 line-clamp-1 mt-2">
                                                {request.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end space-x-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                                        <div className="sm:text-right">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize gap-1.5 ${request.status === 'completed'
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                                                    : request.status === 'in_progress'
                                                        ? 'bg-blue-50 text-blue-700 border border-blue-200/50'
                                                        : 'bg-amber-50 text-amber-700 border border-amber-200/50'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${request.status === 'completed' ? 'bg-emerald-500' : request.status === 'in_progress' ? 'bg-blue-500' : 'bg-amber-500'
                                                    }`} />
                                                {request.status.replace('_', ' ')}
                                            </span>
                                            <p className="text-xs font-mono font-bold text-primary mt-1.5">
                                                KSh {request.amount?.toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-primary group-hover:text-white flex items-center justify-center text-slate-400 transition-colors">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <h3 className="font-serif font-bold text-slate-700 text-base mb-1">No Engagements Found</h3>
                    <p className="text-xs text-slate-500 mb-4">
                        {searchTerm || statusFilter !== 'all'
                            ? 'No requests match your search criteria.'
                            : 'You have no open tax service requests.'}
                    </p>
                    <Link to="/portal/services" className="btn-primary text-xs">
                        Browse Tax Services
                    </Link>
                </div>
            )}
        </PortalLayout>
    );
}