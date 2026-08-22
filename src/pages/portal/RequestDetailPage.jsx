import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    FileText,
    Download,
    Clock,
    CheckCircle,
    MessageSquare,
    Shield,
    Receipt,
    ChevronRight,
    CreditCard
} from 'lucide-react';
import PortalLayout from '../../components/portal/PortalLayout';
import ChatBox from '../../components/portal/ChatBox';
import { mockRequests, mockChatMessages } from '../../data/mockData';
import { REQUEST_STATUS_COLORS } from '../../utils/constants';

export default function RequestDetailPage() {
    const { id } = useParams();
    const request = mockRequests.find(r => r.id === parseInt(id));
    const chatMessages = mockChatMessages.filter(m => m.requestId === parseInt(id));

    if (!request) {
        return (
            <PortalLayout title="Request Not Found">
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                    <h2 className="text-xl font-serif font-bold text-primary mb-2">Request Not Found</h2>
                    <p className="text-xs text-slate-500 mb-6">The requested engagement record does not exist or has expired.</p>
                    <Link to="/portal/requests" className="btn-primary text-xs">
                        Back to My Requests
                    </Link>
                </div>
            </PortalLayout>
        );
    }

    const headerActions = (
        <Link
            to="/portal/requests"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
        >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Requests</span>
        </Link>
    );

    return (
        <PortalLayout
            title={request.serviceTitle}
            subtitle={`Engagement Dossier • Reference: ${request.requestNumber}`}
            headerActions={headerActions}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main 2-column details & timeline */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Request Summary Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-4">
                            <div>
                                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                                    Reference ID
                                </span>
                                <p className="text-lg font-bold font-mono text-primary">{request.requestNumber}</p>
                            </div>

                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize gap-1.5 self-start sm:self-auto ${request.status === 'completed'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : request.status === 'in_progress'
                                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${request.status === 'completed' ? 'bg-emerald-500' : request.status === 'in_progress' ? 'bg-blue-500' : 'bg-amber-500'
                                    }`} />
                                {request.status.replace('_', ' ')}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Scope of Engagement</h4>
                                <p className="text-sm text-slate-700 leading-relaxed">{request.description}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <div>
                                    <span className="text-xs text-slate-500">Agreed Professional Retainer</span>
                                    <p className="text-lg font-serif font-bold text-primary">KSh {request.amount?.toLocaleString()}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-500">Payment Status</span>
                                    <div className="mt-1">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${request.paymentStatus === 'paid'
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : 'bg-amber-100 text-amber-800'
                                            }`}>
                                            {request.paymentStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Documents Section */}
                        {request.documents?.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-slate-100">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                                    Associated Documents ({request.documents.length})
                                </h4>
                                <div className="space-y-2">
                                    {request.documents.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                                        >
                                            <div className="flex items-center space-x-3 min-w-0">
                                                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-semibold text-slate-800 truncate">{doc.name}</p>
                                                    <span className="text-[11px] text-slate-400 font-mono">{doc.size}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => alert(`Downloading ${doc.name}`)}
                                                className="inline-flex items-center space-x-1 px-3 py-1.5 bg-white border border-slate-200 hover:border-gold text-slate-700 hover:text-gold rounded-lg text-xs font-semibold shadow-2xs transition-colors"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                <span>Download</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Progress Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6"
                    >
                        <h3 className="text-base font-serif font-bold text-primary mb-6 pb-3 border-b border-slate-100">
                            Engagement Progress & Milestones
                        </h3>

                        <div className="space-y-6">
                            {request.timeline.map((item, index) => {
                                const isLast = index === request.timeline.length - 1;
                                return (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="relative flex flex-col items-center">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isLast
                                                    ? 'bg-gold text-[#0A2A66] shadow-sm'
                                                    : 'bg-emerald-500 text-white'
                                                }`}>
                                                <CheckCircle className="w-3.5 h-3.5" />
                                            </div>
                                            {index < request.timeline.length - 1 && (
                                                <div className="w-0.5 h-12 bg-slate-200 my-1" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0 pt-0.5">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold text-sm text-slate-800 capitalize">
                                                    {item.status.replace('_', ' ')}
                                                </p>
                                                <span className="text-[11px] text-slate-400 font-mono">{item.date}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.note}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Official Receipt Card */}
                    {request.receipt && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="bg-linear-to-r from-emerald-500/10 via-emerald-500/5 to-transparent rounded-2xl border border-emerald-200/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                            <div className="flex items-center space-x-3.5">
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                    <Receipt className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-emerald-950 text-sm">Official Tax Remittance Receipt</h4>
                                    <p className="text-xs text-emerald-700 font-mono">Invoice #{request.receipt.receiptNumber}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => alert(`Downloading Receipt #${request.receipt.receiptNumber}`)}
                                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all self-start sm:self-auto"
                            >
                                <Download className="w-3.5 h-3.5" />
                                <span>Download PDF</span>
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* Right Chat Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <ChatBox requestId={request.id} messages={chatMessages} />
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}