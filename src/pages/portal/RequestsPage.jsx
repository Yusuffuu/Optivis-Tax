import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Menu,
    Search,
    Filter,
    FileText,
    Download,
    ChevronRight,
    Clock
} from 'lucide-react';
import PortalSidebar from '../../components/portal/PortalSidebar';
import { useAuth } from '../../context/AuthContext';
import { mockRequests } from '../../data/mockData';
import { REQUEST_STATUS_COLORS } from '../../utils/constants';

export default function RequestsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const { user } = useAuth();

    const userRequests = mockRequests.filter(r => r.userId === user?.id);

    const filteredRequests = userRequests.filter(request => {
        const matchesSearch = request.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.requestNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const statuses = ['all', 'pending', 'in_review', 'in_progress', 'completed', 'cancelled'];

    return (
        <div className="min-h-screen bg-gray-50">
            <PortalSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="lg:pl-64">
                {/* Top bar */}
                <div className="bg-white border-b sticky top-0 z-30">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-gray-600"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <h1 className="text-2xl font-serif font-bold text-primary">My Requests</h1>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {/* Search and Filter */}
                    <div className="mb-8 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by service or request number..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div className="flex gap-2 overflow-x-auto">
                                {statuses.map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${statusFilter === status
                                            ? 'bg-primary text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        {status === 'all' ? 'All' : status.replace('_', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Requests List */}
                    {filteredRequests.length > 0 ? (
                        <div className="space-y-4">
                            {filteredRequests.map((request, index) => (
                                <motion.div
                                    key={request.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
                                >
                                    <Link to={`/portal/requests/${request.id}`} className="block p-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-start space-x-4">
                                                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                                                    <FileText className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-primary text-lg">{request.serviceTitle}</h3>
                                                    <p className="text-sm text-gray-500">{request.requestNumber}</p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Created: {request.createdAt}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                <div className="text-right">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${REQUEST_STATUS_COLORS[request.status]}`}>
                                                        {request.status.replace('_', ' ')}
                                                    </span>
                                                    <p className="text-sm font-semibold text-primary mt-2">
                                                        KSh {request.amount?.toLocaleString()}
                                                    </p>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-serif font-bold text-primary mb-2">No Requests Found</h3>
                            <p className="text-gray-500 mb-6">
                                {searchTerm || statusFilter !== 'all'
                                    ? 'Try adjusting your search or filter criteria'
                                    : 'Start by requesting a service'}
                            </p>
                            {!searchTerm && statusFilter === 'all' && (
                                <Link to="/portal/services" className="btn-primary">
                                    Request a Service
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}