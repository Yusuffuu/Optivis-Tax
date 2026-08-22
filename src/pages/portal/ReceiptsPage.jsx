import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Receipt, CheckCircle, Calendar, CreditCard, Shield, FileText } from 'lucide-react';
import PortalLayout from '../../components/portal/PortalLayout';
import { useAuth } from '../../context/AuthContext';
import { mockRequests } from '../../data/mockData';

export default function ReceiptsPage() {
    const { user } = useAuth();
    const userRequests = mockRequests.filter(r => r.userId === user?.id);
    const receipts = userRequests.filter(r => r.receipt);

    const totalAmount = receipts.reduce((sum, r) => sum + (r.receipt.amount || 0), 0);

    return (
        <PortalLayout
            title="Official Tax Receipts"
            subtitle="Verified payment vouchers, invoices, and statutory filing receipts for accounting & audit"
        >
            {/* Receipts Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Invoiced Amount</p>
                        <p className="text-2xl font-serif font-bold text-primary mt-1">KSh {totalAmount.toLocaleString()}</p>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
                        <CreditCard className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Verified Receipts</p>
                        <p className="text-2xl font-serif font-bold text-emerald-600 mt-1">{receipts.length} Documents</p>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Receipts List */}
            {receipts.length > 0 ? (
                <div className="space-y-3.5">
                    {receipts.map((request, index) => (
                        <motion.div
                            key={request.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5 hover:shadow-md transition-all"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-start space-x-4 min-w-0">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-slate-800 text-base truncate">{request.serviceTitle}</h3>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1">
                                            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold">
                                                Receipt #{request.receipt.receiptNumber}
                                            </span>
                                            <span className="flex items-center">
                                                <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                                                Issued: {request.receipt.issuedDate}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end space-x-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                                    <div className="sm:text-right">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Paid Amount</span>
                                        <p className="text-base font-serif font-bold text-primary">
                                            KSh {request.receipt.amount.toLocaleString()}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => alert(`Downloading PDF receipt #${request.receipt.receiptNumber}`)}
                                        className="inline-flex items-center space-x-1.5 px-4 py-2 bg-linear-to-r from-primary to-primary-600 text-white text-xs font-bold rounded-xl shadow-xs hover:from-primary-600 hover:to-primary-700 transition-all active:scale-95"
                                    >
                                        <Download className="w-3.5 h-3.5 text-gold" />
                                        <span>Download PDF</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400">
                    <Receipt className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <h3 className="font-serif font-bold text-slate-700 text-base mb-1">No Receipts Yet</h3>
                    <p className="text-xs text-slate-500">Official tax receipts and invoices will be issued upon payment completion.</p>
                </div>
            )}
        </PortalLayout>
    );
}