import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Menu,
    ArrowLeft,
    FileText,
    Download,
    Clock,
    CheckCircle,
    MessageSquare,
    ChevronRight
} from 'lucide-react';
import PortalSidebar from '../../components/portal/PortalSidebar';
import ChatBox from '../../components/portal/ChatBox';
import { mockRequests, mockChatMessages } from '../../data/mockData';
import { REQUEST_STATUS_COLORS } from '../../utils/constants';

export default function RequestDetailPage() {
    const { id } = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const request = mockRequests.find(r => r.id === parseInt(id));
    const chatMessages = mockChatMessages.filter(m => m.requestId === parseInt(id));

    if (!request) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-serif font-bold text-primary mb-4">Request Not Found</h1>
                    <Link to="/portal/requests" className="btn-primary">
                        Back to Requests
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PortalSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="lg:pl-64">
                {/* Top bar */}
                <div className="bg-white border-b sticky top-0 z-30">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="lg:hidden text-gray-600"
                                >
                                    <Menu className="w-6 h-6" />
                                </button>
                                <Link to="/portal/requests" className="text-gray-600 hover:text-primary">
                                    <ArrowLeft className="w-5 h-5" />
                                </Link>
                                <h1 className="text-2xl font-serif font-bold text-primary">
                                    {request.requestNumber}
                                </h1>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${REQUEST_STATUS_COLORS[request.status]}`}>
                                {request.status.replace('_', ' ')}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Request Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl shadow-sm p-6"
                            >
                                <h2 className="text-xl font-serif font-bold text-primary mb-4">
                                    {request.serviceTitle}
                                </h2>
                                <p className="text-gray-600 mb-6">{request.description}</p>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <p className="text-sm text-gray-500">Amount</p>
                                        <p className="text-lg font-bold text-primary">
                                            KSh {request.amount?.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Payment Status</p>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${request.paymentStatus === 'paid'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {request.paymentStatus}
                                        </span>
                                    </div>
                                </div>

                                {/* Documents */}
                                {request.documents?.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold text-primary mb-3">Documents</h3>
                                        <div className="space-y-2">
                                            {request.documents.map(doc => (
                                                <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                                    <div className="flex items-center space-x-3">
                                                        <FileText className="w-5 h-5 text-primary" />
                                                        <div>
                                                            <p className="text-sm font-medium">{doc.name}</p>
                                                            <p className="text-xs text-gray-500">{doc.size}</p>
                                                        </div>
                                                    </div>
                                                    <button className="text-gold hover:text-gold-600">
                                                        <Download className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            {/* Timeline */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-xl shadow-sm p-6"
                            >
                                <h3 className="text-xl font-serif font-bold text-primary mb-6">Progress Timeline</h3>
                                <div className="space-y-6">
                                    {request.timeline.map((item, index) => (
                                        <div key={index} className="flex items-start space-x-4">
                                            <div className="relative">
                                                <div className={`w-4 h-4 rounded-full border-2 ${index === request.timeline.length - 1
                                                        ? 'bg-gold border-gold'
                                                        : 'bg-white border-gray-300'
                                                    }`} />
                                                {index < request.timeline.length - 1 && (
                                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-200" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-primary">
                                                    {item.status.replace('_', ' ')}
                                                </p>
                                                <p className="text-sm text-gray-500">{item.date}</p>
                                                <p className="text-sm text-gray-600 mt-1">{item.note}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Receipt */}
                            {request.receipt && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white rounded-xl shadow-sm p-6"
                                >
                                    <h3 className="text-xl font-serif font-bold text-primary mb-4">Receipt</h3>
                                    <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <CheckCircle className="w-8 h-8 text-green-600" />
                                            <div>
                                                <p className="font-semibold">Payment Completed</p>
                                                <p className="text-sm text-gray-600">
                                                    Receipt: {request.receipt.receiptNumber}
                                                </p>
                                            </div>
                                        </div>
                                        <button className="btn-secondary text-sm flex items-center">
                                            <Download className="w-4 h-4 mr-2" />
                                            Download PDF
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Chat Section */}
                        <div className="lg:col-span-1">
                            <ChatBox requestId={request.id} messages={chatMessages} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}