import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    MessageSquare,
    Receipt,
    Settings,
    LogOut,
    X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
    { name: 'Dashboard', href: '/portal/dashboard', icon: LayoutDashboard },
    { name: 'Request Service', href: '/portal/services', icon: Briefcase },
    { name: 'My Requests', href: '/portal/requests', icon: FileText },
    { name: 'Messages', href: '/portal/chat', icon: MessageSquare },
    { name: 'Receipts', href: '/portal/receipts', icon: Receipt },
    { name: 'Settings', href: '/portal/settings', icon: Settings },
];

export default function PortalSidebar({ isOpen, onClose }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-primary text-white z-50 transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-primary-700">
                        <div className="flex items-center justify-between">
                            <Link to="/portal/dashboard" className="flex items-center space-x-3">
                                <img src="../logo.png" alt="Optivis" className="w-10 h-10 object-contain" />
                                <div>
                                    <h2 className="text-xl font-serif font-bold">Optivis</h2>
                                    <p className="text-xs text-gold uppercase tracking-widest">Client Portal</p>
                                </div>
                            </Link>
                            <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* User info */}
                    <div className="p-4 border-b border-primary-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                                <span className="text-primary font-bold text-lg">
                                    {user?.fullName?.charAt(0) || 'U'}
                                </span>
                            </div>
                            <div>
                                <p className="font-semibold">{user?.fullName}</p>
                                <p className="text-xs text-gray-400">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={onClose}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-gold text-primary font-semibold'
                                        : 'text-gray-300 hover:bg-primary-700'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-primary-700">
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-primary-700 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
