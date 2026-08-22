import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    MessageSquare,
    User,
    ChevronRight,
    Paperclip,
    Send,
    Shield,
    CheckCheck,
    Briefcase,
    ArrowLeft,
    Phone
} from 'lucide-react';
import PortalLayout from '../../components/portal/PortalLayout';
import { useAuth } from '../../context/AuthContext';
import { mockRequests, mockChatMessages } from '../../data/mockData';

export default function ChatPage() {
    const { user } = useAuth();
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [messages, setMessages] = useState(mockChatMessages);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Get user requests with chat history
    const userRequests = mockRequests.filter(r => r.userId === user?.id);
    const requestsWithChat = userRequests.map(request => ({
        ...request,
        messages: messages.filter(m => m.requestId === request.id),
        unreadCount: messages.filter(m => m.requestId === request.id && !m.read && m.senderId !== user?.id).length
    }));

    const filteredRequests = requestsWithChat.filter(req =>
        req.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.requestNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (!selectedRequest && filteredRequests.length > 0) {
            setSelectedRequest(filteredRequests[0]);
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, selectedRequest]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedRequest) return;

        const newMsg = {
            id: messages.length + 1,
            requestId: selectedRequest.id,
            senderId: user?.id,
            message: newMessage.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false
        };

        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');
    };

    return (
        <PortalLayout
            title="Messages & Specialist Chat"
            subtitle="Direct consultation channel with your assigned Optivis tax partners"
        >
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col md:flex-row h-[calc(100vh-12rem)] min-h-137.5">
                {/* Left Panel: Service Conversations */}
                <div className={`w-full md:w-80 lg:w-96 border-r border-slate-200/80 flex flex-col bg-slate-50/50 ${selectedRequest ? 'hidden md:flex' : 'flex'
                    }`}>
                    <div className="p-3.5 border-b border-slate-200/80 bg-white">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search engagements..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map((request) => {
                                const isSelected = selectedRequest?.id === request.id;
                                const lastMsg = request.messages[request.messages.length - 1];
                                return (
                                    <button
                                        key={request.id}
                                        onClick={() => setSelectedRequest(request)}
                                        className={`w-full p-3.5 text-left transition-all flex items-start space-x-3 group relative ${isSelected
                                                ? 'bg-white border-l-4 border-gold shadow-xs'
                                                : 'hover:bg-slate-100/70'
                                            }`}
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-primary to-primary-700 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                                            <Briefcase className="w-4 h-4 text-gold" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <p className="font-semibold text-xs text-slate-800 truncate group-hover:text-primary">
                                                    {request.serviceTitle}
                                                </p>
                                                <span className="text-[10px] text-slate-400 font-mono">
                                                    {request.requestNumber}
                                                </span>
                                            </div>

                                            <p className="text-xs text-slate-500 truncate line-clamp-1">
                                                {lastMsg?.message || 'Chat opened with specialist'}
                                            </p>

                                            <div className="flex items-center justify-between mt-1.5">
                                                <span className="text-[10px] text-slate-400 capitalize">
                                                    Status: {request.status.replace('_', ' ')}
                                                </span>
                                                {request.unreadCount > 0 && (
                                                    <span className="w-5 h-5 bg-gold text-[#0A2A66] font-bold text-[10px] rounded-full flex items-center justify-center shadow-xs animate-pulse">
                                                        {request.unreadCount}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })
                        ) : (
                            <div className="p-8 text-center text-slate-400">
                                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                                <p className="text-xs font-semibold text-slate-600">No active conversations</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Active Thread */}
                <div className={`flex-1 flex flex-col bg-white ${!selectedRequest ? 'hidden md:flex' : 'flex'}`}>
                    {selectedRequest ? (
                        <>
                            {/* Thread Topbar */}
                            <div className="p-3.5 sm:px-6 border-b border-slate-200/80 flex items-center justify-between bg-white z-10 shadow-2xs">
                                <div className="flex items-center space-x-3 min-w-0">
                                    <button
                                        onClick={() => setSelectedRequest(null)}
                                        className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                    </button>

                                    <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-primary to-primary-700 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                                        <Shield className="w-5 h-5 text-gold" />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-sm text-slate-800 truncate">
                                            {selectedRequest.serviceTitle}
                                        </h3>
                                        <p className="text-xs text-slate-400 truncate">
                                            Assigned Specialist • Ref: {selectedRequest.requestNumber}
                                        </p>
                                    </div>
                                </div>

                                <span className={`hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${selectedRequest.status === 'completed'
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                                    }`}>
                                    {selectedRequest.status.replace('_', ' ')}
                                </span>
                            </div>

                            {/* Messages Body */}
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 bg-slate-50/40 custom-scrollbar">
                                <div className="flex justify-center my-2">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[11px] font-medium border border-slate-200/50">
                                        <Shield className="w-3 h-3 text-gold" />
                                        <span>Direct line with Optivis Senior Tax Associate</span>
                                    </div>
                                </div>

                                {selectedRequest.messages.length > 0 ? (
                                    selectedRequest.messages.map((msg) => {
                                        const isClient = msg.senderId === user?.id;
                                        return (
                                            <div
                                                key={msg.id}
                                                className={`flex ${isClient ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`max-w-[85%] sm:max-w-[70%] ${isClient ? 'order-1' : ''}`}>
                                                    <div
                                                        className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${isClient
                                                                ? 'bg-linear-to-r from-primary to-primary-700 text-white rounded-br-xs'
                                                                : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                                                            }`}
                                                    >
                                                        <p>{msg.message}</p>
                                                    </div>

                                                    <div className={`flex items-center space-x-1 text-[10px] text-slate-400 mt-1 ${isClient ? 'justify-end' : 'justify-start'}`}>
                                                        <span>{msg.timestamp}</span>
                                                        {isClient && <CheckCheck className="w-3 h-3 text-gold" />}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-12 text-slate-400">
                                        <MessageSquare className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                                        <p className="text-xs">Start a conversation with your assigned specialist.</p>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Chat Input */}
                            <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-slate-200/80 bg-white">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type your message or question..."
                                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!newMessage.trim()}
                                        className="px-4 py-2.5 bg-linear-to-r from-primary to-primary-600 text-white rounded-xl font-bold text-xs hover:from-primary-600 hover:to-primary-700 shadow-xs transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center space-x-1.5"
                                    >
                                        <span>Send</span>
                                        <Send className="w-3.5 h-3.5 text-gold" />
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 bg-slate-50/30">
                            <MessageSquare className="w-16 h-16 mb-4 text-slate-300" />
                            <h3 className="text-lg font-serif font-bold text-primary mb-1">Select an Engagement Thread</h3>
                            <p className="text-xs text-slate-500 max-w-sm">
                                Choose an open tax matter from the left to communicate directly with your dedicated specialist.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </PortalLayout>
    );
}