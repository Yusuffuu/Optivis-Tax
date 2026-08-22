import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    FileText,
    Mail,
    Star,
    Settings,
    MessageSquare,
    LogOut,
    X,
    ChevronLeft,
    ChevronRight,
    Shield,
    ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Clients', href: '/admin/clients', icon: Users, badge: null },
    { name: 'Services', href: '/admin/services', icon: Briefcase },
    { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
    { name: 'Newsletters', href: '/admin/newsletter', icon: Mail },
    { name: 'Messages', href: '/admin/chat', icon: MessageSquare, badge: '3' },
    { name: 'Testimonials', href: '/admin/testimonials', icon: Star },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar({ isOpen, onClose, collapsed, setCollapsed }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Aside */}
            <aside
                className={`fixed inset-y-0 left-0 bg-linear-to-b from-[#0A2A66] via-[#082252] to-[#041129] text-white z-50 transform transition-all duration-300 ease-in-out border-r border-white/10 shadow-2xl flex flex-col ${collapsed ? 'w-20' : 'w-64'
                    } ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
            >
                {/* Header / Logo */}
                <div className="h-18 px-4 flex items-center justify-between border-b border-white/10 relative">
                    {!collapsed ? (
                        <Link to="/admin/dashboard" className="flex items-center space-x-3 group">
                            <img
                                src="logo.png"
                                alt="Optivis"
                                className="w-30 h-30 object-contain drop-shadow-[0_0_15px_rgba(197,162,74,0.4)] group-hover:scale-110 transition-transform"
                            />
                            <div className="overflow-hidden">
                                <h2 className="text-lg font-serif font-bold tracking-tight text-white flex items-center gap-1.5">
                                    Optivis <span className="text-gold text-xs px-1.5 py-0.5 rounded bg-gold/20 font-sans uppercase tracking-wider font-semibold">Admin</span>
                                </h2>
                                <p className="text-[11px] text-gray-300 font-sans tracking-wide truncate">Tax & Advisory Portal</p>
                            </div>
                        </Link>
                    ) : (
                        <Link to="/admin/dashboard" className="mx-auto group" title="Optivis Admin">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-gold to-gold-200 p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
                                <img src="logo.png" alt="Optivis" className="w-8 h-8 object-contain rounded-lg" />
                            </div>
                        </Link>
                    )}

                    {/* Mobile Close Button */}
                    <button
                        onClick={onClose}
                        className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Desktop Collapse Toggle on Sidebar Edge */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden lg:flex absolute -right-3.5 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-gold text-[#0A2A66] rounded-full items-center justify-center shadow-lg hover:bg-gold-300 hover:scale-110 active:scale-95 transition-all duration-200 z-50 border-2 border-[#0A2A66]"
                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? <ChevronRight className="w-4 h-4 font-bold" /> : <ChevronLeft className="w-4 h-4 font-bold" />}
                    </button>
                </div>

                {/* User Mini Card */}
                <div className={`p-3 border-b border-white/10 ${collapsed ? 'flex justify-center' : ''}`}>
                    <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3 bg-white/5 p-2 rounded-xl border border-white/5'}`}>
                        <div className="relative shrink-0">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-gold to-gold-600 flex items-center justify-center text-primary font-bold shadow-inner">
                                {user?.fullName?.charAt(0) || 'A'}
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0A2A66] rounded-full"></span>
                        </div>
                        {!collapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate">{user?.fullName || 'Administrator'}</p>
                                <div className="flex items-center text-xs text-gold/90">
                                    <Shield className="w-3 h-3 mr-1 text-gold" />
                                    <span>Super Admin</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <div
                                key={item.name}
                                className="relative"
                                onMouseEnter={() => setHoveredItem(item.name)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <Link
                                    to={item.href}
                                    onClick={onClose}
                                    className={`group flex items-center ${collapsed ? 'justify-center px-2 py-3' : 'px-3.5 py-2.5 space-x-3'
                                        } rounded-xl text-sm font-medium transition-all duration-200 relative ${isActive
                                            ? 'bg-linear-to-r from-gold to-gold-400 text-primary font-semibold shadow-md'
                                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {/* Active Left Indicator Pill */}
                                    {isActive && !collapsed && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></span>
                                    )}

                                    <item.icon
                                        className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isActive ? 'text-primary scale-110' : 'text-gray-400 group-hover:text-gold group-hover:scale-110'
                                            }`}
                                    />

                                    {!collapsed && (
                                        <span className="truncate flex-1 tracking-wide">{item.name}</span>
                                    )}

                                    {/* Badge Count */}
                                    {!collapsed && item.badge && (
                                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-primary text-gold' : 'bg-gold text-primary'
                                            }`}>
                                            {item.badge}
                                        </span>
                                    )}

                                    {/* Dot Indicator for collapsed when badge exists */}
                                    {collapsed && item.badge && (
                                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                                    )}
                                </Link>

                                {/* Floating Tooltip in Collapsed Mode */}
                                {collapsed && hoveredItem === item.name && (
                                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 px-3 py-1.5 bg-[#041129] text-white text-xs font-semibold rounded-lg shadow-xl border border-gold/30 whitespace-nowrap tooltip-animate flex items-center gap-2 pointer-events-none">
                                        <span>{item.name}</span>
                                        {item.badge && (
                                            <span className="bg-gold text-primary text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                                                {item.badge}
                                            </span>
                                        )}
                                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#041129]"></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Bottom Actions / Logout */}
                <div className="p-3 border-t border-white/10 space-y-1 bg-black/10">
                    <Link
                        to="/"
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center ${collapsed ? 'justify-center p-2.5' : 'px-3.5 py-2 space-x-3'
                            } rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors`}
                        title="View Public Website"
                    >
                        <ExternalLink className="w-4 h-4 shrink-0" />
                        {!collapsed && <span>Live Website</span>}
                    </Link>

                    <button
                        onClick={handleLogout}
                        className={`flex items-center w-full ${collapsed ? 'justify-center p-2.5' : 'px-3.5 py-2 space-x-3'
                            } rounded-xl text-xs font-medium text-red-300 hover:text-white hover:bg-red-500/20 transition-colors group`}
                        title="Sign Out"
                    >
                        <LogOut className="w-4 h-4 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
                        {!collapsed && <span>Sign Out</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}