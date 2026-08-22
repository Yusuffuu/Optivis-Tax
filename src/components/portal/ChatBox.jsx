import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Shield, CheckCheck, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ChatBox({ requestId, messages: initialMessages }) {
    const [messages, setMessages] = useState(initialMessages || []);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const { user } = useAuth();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message = {
            id: messages.length + 1,
            requestId,
            senderId: user?.id,
            message: newMessage.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false
        };

        setMessages(prev => [...prev, message]);
        setNewMessage('');
    };

    return (
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 flex flex-col h-130 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-serif font-bold text-primary text-sm">Engagement Consultation</h3>
                        <p className="text-[11px] text-slate-400">Assigned Specialist Channel</p>
                    </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Specialist Online
                </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30 custom-scrollbar">
                {messages.length > 0 ? (
                    messages.map(message => {
                        const isClient = message.senderId === user?.id;
                        return (
                            <div
                                key={message.id}
                                className={`flex ${isClient ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[85%] ${isClient ? 'order-1' : ''}`}>
                                    <div
                                        className={`p-3 rounded-2xl text-xs leading-relaxed shadow-2xs ${isClient
                                                ? 'bg-linear-to-r from-primary to-primary-700 text-white rounded-br-xs'
                                                : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                                            }`}
                                    >
                                        <p>{message.message}</p>
                                    </div>
                                    <div className={`flex items-center space-x-1 text-[10px] text-slate-400 mt-1 ${isClient ? 'justify-end' : 'justify-start'}`}>
                                        <span>{message.timestamp}</span>
                                        {isClient && <CheckCheck className="w-3 h-3 text-gold" />}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center text-slate-400 py-12">
                        <MessageSquare className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                        <p className="text-xs font-semibold text-slate-600">No messages in this engagement</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Ask questions directly to your tax team</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-100 bg-white">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Write a message to your specialist..."
                        className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="p-2 bg-linear-to-r from-primary to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 shadow-xs transition-all disabled:opacity-40"
                    >
                        <Send className="w-4 h-4 text-gold" />
                    </button>
                </div>
            </form>
        </div>
    );
}