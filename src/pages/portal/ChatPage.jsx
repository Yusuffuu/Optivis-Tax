import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Menu,
    Search,
    MessageSquare,
    User,
    ChevronRight
} from 'lucide-react';
import PortalSidebar from '../../components/portal/PortalSidebar';
import { useAuth } from '../../context/AuthContext';
import { mockRequests, mockChatMessages } from '../../data/mockData';

export default function ChatPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();

    // Get all requests that have chat messages
    const userRequests = mockRequests.filter(r => r.userId === user?.id);
    const requestsWithChat = userRequests.map(request => ({
        ...request,
        messages: mockChatMessages.filter(m => m.requestId === request.id),
        unreadCount: mockChatMessages.filter(m => m.requestId === request.id && !m.read && m.senderId !== user?.id).length
    }));

    const filteredRequests = requestsWithChat.filter(req =>
        req.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            <h1 className="text-2xl font-serif font-bold text-primary">Messages</h1>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Chat List */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-4 border-b">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Search conversations..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="divide-y divide-gray-100 max-h-150 overflow-y-auto">
                                    {filteredRequests.length > 0 ? (
                                        filteredRequests.map((request) => (
                                            <button
                                                key={request.id}
                                                onClick={() => setSelectedRequest(request)}
                                                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${selectedRequest?.id === request.id ? 'bg-primary-50' : ''
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center shrink-0">
                                                        <MessageSquare className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-semibold text-primary text-sm truncate">
                                                                {request.serviceTitle}
                                                            </p>
                                                            {request.unreadCount > 0 && (
                                                                <span className="bg-gold text-white text-xs font-bold px-2 py-1 rounded-full">
                                                                    {request.unreadCount}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-500 truncate mt-1">
                                                            {request.requestNumber}
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 px-4">
                                            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                            <p className="text-gray-500 text-sm">No conversations yet</p>
                                            <p className="text-gray-400 text-xs mt-1">
                                                Messages with your tax specialist will appear here
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Chat Window */}
                        <div className="lg:col-span-2">
                            {selectedRequest ? (
                                <ChatWindow request={selectedRequest} currentUser={user} />
                            ) : (
                                <div className="bg-white rounded-xl shadow-sm h-full flex items-center justify-center">
                                    <div className="text-center py-16">
                                        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-serif font-bold text-primary mb-2">
                                            Select a Conversation
                                        </h3>
                                        <p className="text-gray-500">
                                            Choose a service request to view your messages
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Chat Window Component
function ChatWindow({ request, currentUser }) {
    const [messages, setMessages] = useState(request.messages || []);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useState(null);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message = {
            id: messages.length + 1,
            requestId: request.id,
            senderId: currentUser?.id,
            message: newMessage,
            timestamp: new Date().toLocaleString(),
            read: false
        };

        setMessages(prev => [...prev, message]);
        setNewMessage('');
    };

    return (
        <div className="bg-white rounded-xl shadow-sm flex flex-col h-150">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary">{request.serviceTitle}</h3>
                        <p className="text-xs text-gray-500">{request.requestNumber}</p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${request.status === 'completed' ? 'bg-green-100 text-green-700' :
                    request.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                    }`}>
                    {request.status.replace('_', ' ')}
                </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[70%] ${message.senderId === currentUser?.id ? 'order-1' : ''}`}>
                                <div className={`p-3 rounded-lg ${message.senderId === currentUser?.id
                                    ? 'bg-primary text-white rounded-br-none'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                    }`}>
                                    <p className="text-sm">{message.message}</p>
                                </div>
                                <p className={`text-xs text-gray-500 mt-1 ${message.senderId === currentUser?.id ? 'text-right' : ''
                                    }`}>
                                    {message.timestamp}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        <p>No messages yet</p>
                        <p className="text-sm">Start a conversation with your tax specialist</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                    <button
                        type="submit"
                        className="btn-primary p-2"
                        disabled={!newMessage.trim()}
                    >
                        <MessageSquare className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}