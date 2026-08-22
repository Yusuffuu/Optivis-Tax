import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Download, Receipt, CheckCircle } from 'lucide-react';
import PortalSidebar from '../../components/portal/PortalSidebar';
import { useAuth } from '../../context/AuthContext';
import { mockRequests } from '../../data/mockData';

export default function ReceiptsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();
    const userRequests = mockRequests.filter(r => r.userId === user?.id);
    const receipts = userRequests.filter(r => r.receipt);

    return (
        <div className="min-h-screen bg-gray-50">
            <PortalSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="lg:pl-64">
                <div className="bg-white border-b sticky top-0 z-30">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-gray-600"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <h1 className="text-2xl font-serif font-bold text-primary">Receipts</h1>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {receipts.length > 0 ? (
                        <div className="space-y-4">
                            {receipts.map((request, index) => (
                                <motion.div
                                    key={request.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-xl shadow-sm p-6"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                                                <CheckCircle className="w-6 h-6 text-green-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-primary">{request.serviceTitle}</h3>
                                                <p className="text-sm text-gray-500">
                                                    Receipt: {request.receipt.receiptNumber}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Issued: {request.receipt.issuedDate}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p className="text-lg font-bold text-primary">
                                                KSh {request.receipt.amount.toLocaleString()}
                                            </p>
                                            <button className="btn-secondary text-sm flex items-center">
                                                <Download className="w-4 h-4 mr-2" />
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-serif font-bold text-primary mb-2">No Receipts Yet</h3>
                            <p className="text-gray-500">
                                Completed service receipts will appear here
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}