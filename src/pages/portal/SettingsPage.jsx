import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Lock,
    Bell,
    Shield,
    Save,
    CheckCircle,
    Building2,
    Mail,
    Phone
} from 'lucide-react';
import PortalLayout from '../../components/portal/PortalLayout';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';

export default function PortalSettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [saved, setSaved] = useState(false);
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            fullName: user?.fullName || 'John Doe',
            email: user?.email || 'client@example.com',
            phone: user?.phone || '+254 712 345 678',
            company: user?.company || 'Acme Enterprises Ltd'
        }
    });

    const tabs = [
        { id: 'profile', name: 'Profile Details', icon: User },
        { id: 'password', name: 'Password & Auth', icon: Lock },
        { id: 'notifications', name: 'Alert Preferences', icon: Bell },
        { id: 'security', name: 'Account Security', icon: Shield },
    ];

    const onSubmit = (data) => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <PortalLayout
            title="Account & Security Settings"
            subtitle="Manage your personal profile, company details, login credentials, and notification settings"
        >
            <div className="max-w-4xl">
                {/* Tabs Switcher */}
                <div className="flex space-x-2 pb-2 mb-6 overflow-x-auto custom-scrollbar">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${isActive
                                        ? 'bg-primary text-white shadow-xs'
                                        : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
                                    }`}
                            >
                                <tab.icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-slate-400'}`} />
                                <span>{tab.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Save Feedback Alert */}
                <AnimatePresence>
                    {saved && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl mb-6 flex items-center space-x-2.5 shadow-xs"
                        >
                            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                            <span className="text-xs sm:text-sm font-semibold">Account preferences updated successfully!</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Tab 1: Profile */}
                {activeTab === 'profile' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 sm:p-8"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <h3 className="text-base font-serif font-bold text-primary pb-3 border-b border-slate-100">
                                Client Identity & Entity Info
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                        Full Name *
                                    </label>
                                    <input
                                        {...register('fullName', { required: 'Full name is required' })}
                                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                    />
                                    {errors.fullName && <p className="text-rose-500 text-xs mt-1">{errors.fullName.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                        Email Address *
                                    </label>
                                    <input
                                        {...register('email', { required: 'Email is required' })}
                                        type="email"
                                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                    />
                                    {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                        Phone / Mobile
                                    </label>
                                    <input
                                        {...register('phone')}
                                        type="tel"
                                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                        Company / Entity Name
                                    </label>
                                    <input
                                        {...register('company')}
                                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <button
                                    type="submit"
                                    className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-linear-to-r from-primary to-primary-600 text-white rounded-xl text-xs font-bold hover:from-primary-600 hover:to-primary-700 shadow-xs transition-all"
                                >
                                    <Save className="w-4 h-4 text-gold" />
                                    <span>Save Profile</span>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* Tab 2: Password */}
                {activeTab === 'password' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 sm:p-8 max-w-lg"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <h3 className="text-base font-serif font-bold text-primary pb-3 border-b border-slate-100 mb-4">
                                Update Password
                            </h3>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-600 transition-colors shadow-xs"
                            >
                                Change Password
                            </button>
                        </form>
                    </motion.div>
                )}

                {/* Tab 3: Notifications */}
                {activeTab === 'notifications' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 sm:p-8"
                    >
                        <h3 className="text-base font-serif font-bold text-primary pb-3 border-b border-slate-100 mb-5">
                            Client Portal Notification Preferences
                        </h3>

                        <div className="space-y-3 mb-6">
                            {[
                                { title: 'Service Request Status Changes', desc: 'Receive instant email/push notifications when your tax filing progresses to a new stage.' },
                                { title: 'Specialist Direct Messages', desc: 'Get alerted when your assigned tax specialist replies to your advisory inquiries.' },
                                { title: 'Statutory Tax Deadlines', desc: 'Upcoming monthly VAT, PAYE, and annual return filing reminders from Optivis.' },
                                { title: 'Monthly Tax Insights & Bulletins', desc: 'Receive our curated executive tax legislative digest.' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                    <div>
                                        <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                                        <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => {
                                setSaved(true);
                                setTimeout(() => setSaved(false), 3000);
                            }}
                            className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-linear-to-r from-primary to-primary-600 text-white rounded-xl text-xs font-bold hover:from-primary-600 hover:to-primary-700 shadow-xs transition-all"
                        >
                            <Save className="w-4 h-4 text-gold" />
                            <span>Save Preferences</span>
                        </button>
                    </motion.div>
                )}

                {/* Tab 4: Security */}
                {activeTab === 'security' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 sm:p-8 space-y-6"
                    >
                        <h3 className="text-base font-serif font-bold text-primary pb-3 border-b border-slate-100">
                            Security & Authentications
                        </h3>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h4 className="text-sm font-bold text-slate-800 flex items-center">
                                    <Shield className="w-4 h-4 mr-1.5 text-gold" />
                                    <span>Two-Factor Authentication (2FA)</span>
                                </h4>
                                <p className="text-xs text-slate-500 mt-0.5">Protect sensitive financial filings and personal records with SMS / Authenticator codes.</p>
                            </div>
                            <button className="px-4 py-2 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-600 shadow-xs transition-colors shrink-0">
                                Enable 2FA
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </PortalLayout>
    );
}