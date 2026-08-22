import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    MessageSquare,
    User,
    Paperclip,
    Send,
    MoreVertical,
    Check,
    CheckCheck,
    Briefcase,
    Shield,
    Phone,
    Mail,
    ArrowLeft
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { mockUsers, mockRequests, mockChatMessages } from '../../data/mockData';

export default function AdminChatPage() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, unread
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState(mockChatMessages);
    const messagesEndRef = useRef(null);

    // Auto-scroll chat to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, selectedChat]);

    // Group chats by client
    const clientChats = mockUsers
        .filter(u => u.role === 'client')
        .map(client => {
            const clientRequests = mockRequests.filter(r => r.userId === client.id);
            const clientMessages = messages.filter(m =>
                clientRequests.some(r => r.id === m.requestId)
            );
            const unreadCount = clientMessages.filter(m => !m.read && m.senderId === client.id).length;
            const lastMessage = clientMessages[clientMessages.length - 1];

            return {
                client,
                messages: clientMessages,
                unreadCount,
                lastMessage,
                requests: clientRequests
            };
        })
        .filter(chat => chat.messages.length > 0);

    const filteredChats = clientChats.filter(chat => {
        const matchesSearch =
            chat.client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chat.client.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' ? true : chat.unreadCount > 0;
        return matchesSearch && matchesFilter;
    });

    // Auto-select first chat on load if none selected
    useEffect(() => {
        if (!selectedChat && filteredChats.length > 0) {
            setSelectedChat(filteredChats[0]);
        }
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedChat) return;

        const newMsg = {
            id: messages.length + 1,
            requestId: selectedChat.requests[0]?.id || 1,
            senderId: 2, // Admin ID
            message: newMessage.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: true
        };

        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');
    };

    const handleMarkAsRead = (chatId) => {
        setMessages(prev => prev.map(m =>
            m.senderId === chatId ? { ...m, read: true } : m
        ));
    };

    const totalUnread = clientChats.reduce((sum, chat) => sum + chat.unreadCount, 0);

    return (
        <AdminLayout
            title="Client Messages"
            subtitle="Direct real-time consultation channel between clients and tax specialists"
        >
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col md:flex-row h-[calc(100vh-12rem)] min-h-137.5">
                {/* Left Column: Conversations List */}
                <div className={`w-full md:w-80 lg:w-96 border-r border-slate-200/80 flex flex-col bg-slate-50/50 ${selectedChat ? 'hidden md:flex' : 'flex'
                    }`}>
                    {/* Search & Filter Header */}
                    <div className="p-3.5 border-b border-slate-200/80 space-y-2.5 bg-white">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search client chats..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-gold/30 outline-none transition-all"
                            />
                        </div>

                        <div className="flex gap-1.5 text-xs font-semibold">
                            <button
                                onClick={() => setFilter('all')}
                                className={`flex-1 py-1.5 rounded-lg transition-all ${filter === 'all'
                                        ? 'bg-primary text-white shadow-xs'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                All ({clientChats.length})
                            </button>
                            <button
                                onClick={() => setFilter('unread')}
                                className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${filter === 'unread'
                                        ? 'bg-primary text-white shadow-xs'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                <span>Unread</span>
                                {totalUnread > 0 && (
                                    <span className="w-4 h-4 rounded-full bg-gold text-[#0A2A66] text-[10px] font-bold flex items-center justify-center">
                                        {totalUnread}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Chat Item List */}
                    <div className="flex-1 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
                        {filteredChats.length > 0 ? (
                            filteredChats.map((chat) => {
                                const isSelected = selectedChat?.client.id === chat.client.id;
                                return (
                                    <button
                                        key={chat.client.id}
                                        onClick={() => {
                                            setSelectedChat(chat);
                                            handleMarkAsRead(chat.client.id);
                                        }}
                                        className={`w-full p-3.5 text-left transition-all flex items-start space-x-3 group relative ${isSelected
                                                ? 'bg-white border-l-4 border-gold shadow-xs'
                                                : 'hover:bg-slate-100/70'
                                            }`}
                                    >
                                        <div className="relative shrink-0">
                                            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-primary to-primary-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                                                {chat.client.fullName.charAt(0)}
                                            </div>
                                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <p className="font-semibold text-xs text-slate-800 truncate group-hover:text-primary">
                                                    {chat.client.fullName}
                                                </p>
                                                <span className="text-[10px] text-slate-400 font-mono">
                                                    {chat.lastMessage?.timestamp?.split(' ')[0] || 'Active'}
                                                </span>
                                            </div>

                                            <p className="text-xs text-slate-500 truncate line-clamp-1">
                                                {chat.lastMessage?.message || 'No messages yet'}
                                            </p>

                                            <div className="flex items-center justify-between mt-1.5">
                                                <span className="text-[10px] text-slate-400 truncate max-w-36 font-medium">
                                                    {chat.client.company || 'Private Client'}
                                                </span>
                                                {chat.unreadCount > 0 && (
                                                    <span className="w-5 h-5 bg-gold text-[#0A2A66] font-bold text-[10px] rounded-full flex items-center justify-center shadow-xs animate-pulse">
                                                        {chat.unreadCount}
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
                                <p className="text-xs font-semibold text-slate-600">No client conversations</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Active Conversation Pane */}
                <div className={`flex-1 flex flex-col bg-white ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
                    {selectedChat ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-3.5 sm:px-6 border-b border-slate-200/80 flex items-center justify-between bg-white z-10 shadow-2xs">
                                <div className="flex items-center space-x-3 min-w-0">
                                    {/* Mobile Back Button */}
                                    <button
                                        onClick={() => setSelectedChat(null)}
                                        className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                    </button>

                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-primary to-primary-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                                            {selectedChat.client.fullName.charAt(0)}
                                        </div>
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex items-center space-x-2">
                                            <h3 className="font-semibold text-sm text-slate-800 truncate">
                                                {selectedChat.client.fullName}
                                            </h3>
                                            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.2 rounded-full">
                                                Online
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 truncate">
                                            {selectedChat.client.company ? `${selectedChat.client.company} • ` : ''}{selectedChat.client.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 text-xs">
                                    <a
                                        href={`tel:${selectedChat.client.phone}`}
                                        className="hidden sm:inline-flex items-center space-x-1 p-2 rounded-xl text-slate-600 hover:text-primary hover:bg-slate-50 border border-slate-200 transition-colors"
                                        title="Call Client"
                                    >
                                        <Phone className="w-3.5 h-3.5 text-gold" />
                                    </a>
                                </div>
                            </div>

                            {/* Message Thread */}
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 bg-slate-50/40 custom-scrollbar">
                                {/* Encrypted Channel Banner */}
                                <div className="flex justify-center my-2">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[11px] font-medium border border-slate-200/50">
                                        <Shield className="w-3 h-3 text-gold" />
                                        <span>256-bit encrypted tax advisory thread</span>
                                    </div>
                                </div>

                                {selectedChat.messages.length > 0 ? (
                                    selectedChat.messages.map((message) => {
                                        const isAdmin = message.senderId === 2;
                                        return (
                                            <div
                                                key={message.id}
                                                className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`max-w-[85%] sm:max-w-[70%] ${isAdmin ? 'order-1' : ''}`}>
                                                    <div
                                                        className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${isAdmin
                                                                ? 'bg-linear-to-r from-primary to-primary-700 text-white rounded-br-xs'
                                                                : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                                                            }`}
                                                    >
                                                        <p>{message.message}</p>
                                                    </div>

                                                    <div className={`flex items-center space-x-1 text-[10px] text-slate-400 mt-1 ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                                                        <span>{message.timestamp}</span>
                                                        {isAdmin && (
                                                            <CheckCheck className="w-3 h-3 text-gold" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-12 text-slate-400">
                                        <MessageSquare className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                                        <p className="text-xs">No prior messages with this client.</p>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Message Input Form */}
                            <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-slate-200/80 bg-white">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type specialist advice or reply..."
                                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-gold/30 outline-none transition-all"
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
                            <h3 className="text-lg font-serif font-bold text-primary mb-1">Select a Client Conversation</h3>
                            <p className="text-xs text-slate-500 max-w-sm">
                                Choose an engagement thread from the left panel to review client inquiries and send advisory guidance.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}