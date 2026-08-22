import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
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
            message: newMessage,
            timestamp: new Date().toLocaleString(),
            read: false
        };

        setMessages(prev => [...prev, message]);
        setNewMessage('');
    };

    return (
        <div className="bg-white rounded-xl shadow-sm flex flex-col h-125">
            <div className="p-4 border-b">
                <h3 className="font-serif font-bold text-primary">Chat with Your Specialist</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length > 0 ? (
                    messages.map(message => (
                        <div
                            key={message.id}
                            className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] ${message.senderId === user?.id ? 'order-1' : ''}`}>
                                <div className={`p-3 rounded-lg ${message.senderId === user?.id
                                    ? 'bg-primary text-white rounded-br-none'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                    }`}>
                                    <p className="text-sm">{message.message}</p>
                                </div>
                                <p className={`text-xs text-gray-500 mt-1 ${message.senderId === user?.id ? 'text-right' : ''
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
                    <button type="button" className="text-gray-400 hover:text-primary">
                        <Paperclip className="w-5 h-5" />
                    </button>
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
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}