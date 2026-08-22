import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Menu,
    Search,
    Users,
    Mail,
    Phone,
    Building2,
    MoreVertical,
    CheckCircle,
    XCircle,
    Eye
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { mockUsers } from '../../data/mockData';

export default function ClientsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);

    const clients = mockUsers.filter(u => u.role === 'client');

    const filteredClients = clients.filter(client =>
        client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            <h1 className="text-2xl font-serif font-bold text-primary">Clients</h1>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search clients..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Client</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Contact</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Company</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredClients.map((client) => (
                                        <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                                                        <span className="text-primary font-semibold">
                                                            {client.fullName.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-primary">{client.fullName}</p>
                                                        <p className="text-sm text-gray-500">Since {client.joinedDate}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <p className="text-sm flex items-center text-gray-600">
                                                        <Mail className="w-4 h-4 mr-2" />
                                                        {client.email}
                                                    </p>
                                                    <p className="text-sm flex items-center text-gray-600">
                                                        <Phone className="w-4 h-4 mr-2" />
                                                        {client.phone}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center text-gray-600">
                                                    <Building2 className="w-4 h-4 mr-2" />
                                                    <span className="text-sm">{client.company || 'N/A'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${client.status === 'active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {client.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => setSelectedClient(client)}
                                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                        title="View details"
                                                    >
                                                        <Eye className="w-5 h-5 text-gray-600" />
                                                    </button>
                                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="More">
                                                        <MoreVertical className="w-5 h-5 text-gray-600" />
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

            {/* Client Detail Modal */}
            {selectedClient && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedClient(null)} />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-8"
                        >
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl font-bold text-primary">
                                        {selectedClient.fullName.charAt(0)}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-primary">{selectedClient.fullName}</h3>
                                <p className="text-gray-500">{selectedClient.company || 'Individual Client'}</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <Mail className="w-5 h-5 text-primary" />
                                    <span>{selectedClient.email}</span>
                                </div>
                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <Phone className="w-5 h-5 text-primary" />
                                    <span>{selectedClient.phone}</span>
                                </div>
                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <Users className="w-5 h-5 text-primary" />
                                    <span>Client since {selectedClient.joinedDate}</span>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button className="btn-primary flex-1">Send Message</button>
                                <button
                                    onClick={() => setSelectedClient(null)}
                                    className="btn-outline flex-1"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </div>
    );
}