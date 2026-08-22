import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Users,
    Mail,
    Phone,
    Building2,
    Eye,
    CheckCircle,
    XCircle,
    UserCheck,
    Calendar,
    Briefcase,
    Shield,
    X,
    Filter,
    ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { mockUsers, mockRequests } from '../../data/mockData';

export default function ClientsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedClient, setSelectedClient] = useState(null);

    const clients = mockUsers.filter(u => u.role === 'client');

    const filteredClients = clients.filter(client => {
        const matchesSearch =
            client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalClients = clients.length;
    const activeClients = clients.filter(c => c.status === 'active').length;
    const corporateClients = clients.filter(c => c.company).length;

    // Get requests for selected client
    const clientRequests = selectedClient ? mockRequests.filter(r => r.userId === selectedClient.id) : [];

    return (
        <AdminLayout
            title="Clients Management"
            subtitle="Directory of individual and corporate clients, compliance history, and contact records"
        >
            {/* Quick Metrics Header */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Clients</p>
                        <p className="text-2xl font-serif font-bold text-primary mt-0.5">{totalClients}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Users className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Retainers</p>
                        <p className="text-2xl font-serif font-bold text-emerald-600 mt-0.5">{activeClients}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <UserCheck className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Corporate Accounts</p>
                        <p className="text-2xl font-serif font-bold text-primary mt-0.5">{corporateClients}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
                        <Building2 className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Main Table Card */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
                {/* Search & Filter Toolbars */}
                <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by client name, email, or company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                            <button
                                onClick={() => setStatusFilter('all')}
                                className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === 'all' ? 'bg-white text-primary shadow-xs' : 'hover:text-primary'
                                    }`}
                            >
                                All ({totalClients})
                            </button>
                            <button
                                onClick={() => setStatusFilter('active')}
                                className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === 'active' ? 'bg-white text-primary shadow-xs' : 'hover:text-primary'
                                    }`}
                            >
                                Active ({activeClients})
                            </button>
                            <button
                                onClick={() => setStatusFilter('inactive')}
                                className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === 'inactive' ? 'bg-white text-primary shadow-xs' : 'hover:text-primary'
                                    }`}
                            >
                                Inactive ({totalClients - activeClients})
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                                <th className="px-6 py-3.5">Client & Organization</th>
                                <th className="px-6 py-3.5">Contact Details</th>
                                <th className="px-6 py-3.5">Entity Type</th>
                                <th className="px-6 py-3.5">Status</th>
                                <th className="px-6 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {filteredClients.length > 0 ? (
                                filteredClients.map((client) => (
                                    <tr key={client.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3.5">
                                                <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-primary to-primary-700 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                                                    {client.fullName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-800 group-hover:text-primary transition-colors">
                                                        {client.fullName}
                                                    </p>
                                                    <p className="text-xs text-slate-400 mt-0.5 flex items-center">
                                                        <Calendar className="w-3 h-3 mr-1" />
                                                        Joined {client.joinedDate}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1 text-xs">
                                                <a
                                                    href={`mailto:${client.email}`}
                                                    className="flex items-center text-slate-600 hover:text-primary transition-colors"
                                                >
                                                    <Mail className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                                                    <span>{client.email}</span>
                                                </a>
                                                <a
                                                    href={`tel:${client.phone}`}
                                                    className="flex items-center text-slate-600 hover:text-primary transition-colors"
                                                >
                                                    <Phone className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                                                    <span>{client.phone}</span>
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-slate-700 text-xs font-medium">
                                                <Building2 className="w-3.5 h-3.5 mr-1.5 text-gold" />
                                                <span>{client.company || 'Private Individual'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize gap-1.5 ${client.status === 'active'
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                                                        : 'bg-rose-50 text-rose-700 border border-rose-200/50'
                                                    }`}
                                            >
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full ${client.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'
                                                        }`}
                                                />
                                                {client.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => setSelectedClient(client)}
                                                    className="inline-flex items-center space-x-1 px-3 py-1.5 bg-slate-100 hover:bg-primary hover:text-white text-slate-700 rounded-lg text-xs font-semibold transition-all"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    <span>View Dossier</span>
                                                </button>
                                                <Link
                                                    to="/admin/chat"
                                                    className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                                                    title="Message Client"
                                                >
                                                    <Mail className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                        <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                                        <p className="font-semibold text-slate-600">No client records found</p>
                                        <p className="text-xs text-slate-400 mt-1">Try adjusting your search criteria or status filter.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Client Dossier Modal */}
            <AnimatePresence>
                {selectedClient && (
                    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                        <div
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
                            onClick={() => setSelectedClient(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 z-10 border border-slate-200 overflow-hidden"
                        >
                            {/* Modal Close Button */}
                            <button
                                onClick={() => setSelectedClient(null)}
                                className="absolute right-5 top-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Client Header Info */}
                            <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-slate-100">
                                <div className="w-16 h-16 rounded-2xl bg-linear-to-tr from-[#0A2A66] to-[#1A4CA1] text-white flex items-center justify-center text-2xl font-bold font-serif shadow-md shrink-0">
                                    {selectedClient.fullName.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center space-x-2">
                                        <h3 className="text-xl font-serif font-bold text-primary truncate">
                                            {selectedClient.fullName}
                                        </h3>
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                            {selectedClient.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                                        {selectedClient.company ? `${selectedClient.company} • Corporate Account` : 'Individual Taxpayer'}
                                    </p>
                                    <p className="text-[11px] text-slate-400 mt-1">Client ID: #CLT-2026-00{selectedClient.id}</p>
                                </div>
                            </div>

                            {/* Contact Details Grid */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                                    <div className="flex items-center space-x-3 text-slate-700">
                                        <Mail className="w-4 h-4 text-gold" />
                                        <span className="font-semibold">Email:</span>
                                    </div>
                                    <span className="font-mono text-primary font-medium">{selectedClient.email}</span>
                                </div>

                                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                                    <div className="flex items-center space-x-3 text-slate-700">
                                        <Phone className="w-4 h-4 text-gold" />
                                        <span className="font-semibold">Phone:</span>
                                    </div>
                                    <span className="font-mono text-primary font-medium">{selectedClient.phone}</span>
                                </div>

                                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                                    <div className="flex items-center space-x-3 text-slate-700">
                                        <Calendar className="w-4 h-4 text-gold" />
                                        <span className="font-semibold">Member Since:</span>
                                    </div>
                                    <span className="text-slate-600">{selectedClient.joinedDate}</span>
                                </div>
                            </div>

                            {/* Recent Matters */}
                            <div className="mb-6">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                    Active & Past Engagements ({clientRequests.length})
                                </h4>
                                {clientRequests.length > 0 ? (
                                    <div className="space-y-2 max-h-36 overflow-y-auto custom-scrollbar">
                                        {clientRequests.map(r => (
                                            <div key={r.id} className="p-2.5 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                                                <div>
                                                    <p className="font-semibold text-slate-800">{r.serviceTitle}</p>
                                                    <span className="text-[10px] text-slate-400 font-mono">{r.requestNumber}</span>
                                                </div>
                                                <span className="text-xs font-bold text-primary">KSh {r.amount?.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-400 italic">No formal service engagements registered yet.</p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <Link
                                    to="/admin/chat"
                                    onClick={() => setSelectedClient(null)}
                                    className="flex-1 py-2.5 px-4 bg-linear-to-r from-primary to-primary-600 text-white rounded-xl text-xs font-bold text-center hover:from-primary-600 hover:to-primary-700 shadow-sm transition-all"
                                >
                                    Open Direct Chat
                                </Link>
                                <button
                                    onClick={() => setSelectedClient(null)}
                                    className="py-2.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
}