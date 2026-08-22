import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu,
    Search,
    Bell,
    ChevronDown,
    User,
    Settings,
    LogOut,
    Shield,
    CheckCircle,
    ExternalLink,
    PanelLeftClose,
    PanelLeftOpen,
    Sparkles,
    MessageSquare,
    Briefcase
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout({ children, title, subtitle, headerActions }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // Persistent sidebar collapse state
    const [collapsed, setCollapsed] = useState(() => {
        const saved = localStorage.getItem('optivis_admin_collapsed');
        return saved !== null ? JSON.parse(saved) : false;
    });

    const [mobileOpen, setMobileOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('optivis_admin_collapsed', JSON.stringify(collapsed));
    }, [collapsed]);

    // Mock live notifications for the admin
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: 'New Service Request',
            desc: 'Acme Corp requested Corporate Tax Filing',
            time: '10m ago',
            read: false,
            type: 'request'
        },
        {
            id: 2,
            title: 'New Client Message',
            desc: 'Sarah Jenkins sent a tax compliance query',
            time: '45m ago',
            read: false,
            type: 'message'
        },
        {
            id: 3,
            title: 'Payment Confirmed',
            desc: 'KSh 120,000 received for Transfer Pricing advisory',
            time: '2h ago',
            read: true,
            type: 'payment'
        }
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAllNotificationsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Derive auto-title if not provided
    const pageTitle = title || location.pathname.replace('/admin/', '').split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') || 'Dashboard';

    return (
        <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans selection:bg-gold/20 selection:text-primary">
            {/* Sidebar Navigation */}
            <AdminSidebar
                isOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            {/* Main Content Area - Smooth dynamic left margin/padding based on collapsed state */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${collapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
                {/* Premium Glass TopBar */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
                    <div className="px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
                        {/* Left Side: Mobile Menu Button, Collapse Toggle, Page Title & Breadcrumbs */}
                        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                            {/* Mobile drawer toggle */}
                            <button
                                onClick={() => setMobileOpen(true)}
                                className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-primary hover:bg-slate-100 transition-colors"
                                aria-label="Open navigation menu"
                            >
                                <Menu className="w-5 h-5" />
                            </button>

                            {/* Desktop Quick Toggle */}
                            <button
                                onClick={() => setCollapsed(!collapsed)}
                                className="hidden lg:flex p-2 rounded-xl text-slate-500 hover:text-primary hover:bg-slate-100 transition-colors"
                                title={collapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
                            >
                                {collapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
                            </button>

                            {/* Title & Breadcrumbs */}
                            <div className="truncate">
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    <span>Optivis Admin</span>
                                    <span>/</span>
                                    <span className="text-gold font-bold">{pageTitle}</span>
                                </div>
                                <h1 className="text-lg sm:text-xl font-serif font-bold text-primary truncate leading-tight mt-0.5">
                                    {pageTitle}
                                </h1>
                            </div>
                        </div>

                        {/* Right Side: Global Search / Actions / Notifications / Profile */}
                        <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
                            {/* Optional Header Actions passed by the page */}
                            {headerActions && (
                                <div className="hidden sm:flex items-center">
                                    {headerActions}
                                </div>
                            )}

                            {/* Notifications Center */}
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setNotificationsOpen(!notificationsOpen);
                                        setProfileOpen(false);
                                    }}
                                    className={`relative p-2.5 rounded-xl border transition-all duration-200 ${notificationsOpen
                                            ? 'bg-primary/5 border-primary/20 text-primary'
                                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                    aria-label="Notifications"
                                >
                                    <Bell className="w-4 h-4" />
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-xs animate-pulse">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>

                                {/* Notifications Dropdown */}
                                <AnimatePresence>
                                    {notificationsOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setNotificationsOpen(false)}
                                            />
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden"
                                            >
                                                <div className="p-4 bg-linear-to-r from-primary to-primary-700 text-white flex items-center justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-sm">Notifications</h3>
                                                        <p className="text-xs text-slate-300">{unreadCount} unread alerts</p>
                                                    </div>
                                                    {unreadCount > 0 && (
                                                        <button
                                                            onClick={handleMarkAllNotificationsRead}
                                                            className="text-xs text-gold hover:underline font-medium"
                                                        >
                                                            Mark all read
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto custom-scrollbar">
                                                    {notifications.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className={`p-3.5 hover:bg-slate-50 transition-colors flex items-start space-x-3 cursor-pointer ${!item.read ? 'bg-amber-50/40' : ''
                                                                }`}
                                                        >
                                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.type === 'request'
                                                                    ? 'bg-blue-100 text-blue-600'
                                                                    : item.type === 'message'
                                                                        ? 'bg-purple-100 text-purple-600'
                                                                        : 'bg-emerald-100 text-emerald-600'
                                                                }`}>
                                                                {item.type === 'request' && <Briefcase className="w-4 h-4" />}
                                                                {item.type === 'message' && <MessageSquare className="w-4 h-4" />}
                                                                {item.type === 'payment' && <CheckCircle className="w-4 h-4" />}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                                                                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{item.desc}</p>
                                                                <span className="text-[10px] text-slate-400 mt-1 block">{item.time}</span>
                                                            </div>
                                                            {!item.read && (
                                                                <span className="w-2 h-2 rounded-full bg-gold shrink-0 mt-1.5" />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="p-2.5 text-center bg-slate-50 border-t border-slate-100">
                                                    <Link
                                                        to="/admin/chat"
                                                        onClick={() => setNotificationsOpen(false)}
                                                        className="text-xs font-semibold text-primary hover:text-gold transition-colors"
                                                    >
                                                        View All Messages & Activity
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* User Profile Pill & Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setProfileOpen(!profileOpen);
                                        setNotificationsOpen(false);
                                    }}
                                    className="flex items-center space-x-2.5 p-1.5 pr-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all duration-200"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-linear-to-tr from-gold to-gold-600 flex items-center justify-center text-primary font-bold text-xs shadow-xs">
                                        {user?.fullName?.charAt(0) || 'A'}
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <p className="text-xs font-bold text-slate-800 leading-none truncate max-w-28">
                                            {user?.fullName?.split(' ')[0] || 'Admin'}
                                        </p>
                                        <span className="text-[10px] text-slate-500 leading-none font-medium">Administrator</span>
                                    </div>
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                </button>

                                {/* Profile Dropdown */}
                                <AnimatePresence>
                                    {profileOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setProfileOpen(false)}
                                            />
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-2 overflow-hidden"
                                            >
                                                <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                                                    <p className="text-xs font-bold text-slate-800 truncate">{user?.fullName || 'Administrator'}</p>
                                                    <p className="text-[11px] text-slate-500 truncate">{user?.email || 'admin@optivistax.com'}</p>
                                                </div>

                                                <Link
                                                    to="/admin/settings"
                                                    onClick={() => setProfileOpen(false)}
                                                    className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                                                >
                                                    <Settings className="w-4 h-4 text-slate-400" />
                                                    <span>Admin Settings</span>
                                                </Link>

                                                <Link
                                                    to="/"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={() => setProfileOpen(false)}
                                                    className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                                                >
                                                    <ExternalLink className="w-4 h-4 text-slate-400" />
                                                    <span>View Website</span>
                                                </Link>

                                                <div className="border-t border-slate-100 my-1"></div>

                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center space-x-2.5 w-full px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4 text-red-400" />
                                                    <span>Sign Out</span>
                                                </button>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Subtitle / Breadcrumb ribbon if provided */}
                {subtitle && (
                    <div className="px-4 sm:px-6 lg:px-8 py-2 bg-slate-100/60 border-b border-slate-200/50 text-xs text-slate-500">
                        {subtitle}
                    </div>
                )}

                {/* Main Body */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
