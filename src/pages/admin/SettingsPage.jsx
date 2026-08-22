import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2,
    Mail,
    Phone,
    MapPin,
    Globe,
    Bell,
    Shield,
    Save,
    CheckCircle,
    CreditCard,
    Lock,
    Sparkles
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useForm } from 'react-hook-form';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('company');
    const [saved, setSaved] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            companyName: 'Optivis Tax & Advisory Partners',
            email: 'info@optivistax.com',
            phone: '+254 700 000 000',
            address: 'Westlands Business Park, 7th Floor, Nairobi, Kenya',
            website: 'https://optivistax.com',
            currency: 'KES',
            taxRate: '16'
        }
    });

    const tabs = [
        { id: 'company', name: 'Practice Info', icon: Building2 },
        { id: 'contact', name: 'Contact & Office', icon: Phone },
        { id: 'notifications', name: 'Notification Alerts', icon: Bell },
        { id: 'payment', name: 'Billing & Gateway', icon: CreditCard },
        { id: 'security', name: 'Security & 2FA', icon: Shield },
    ];

    const onSubmit = (data) => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <AdminLayout
            title="System & Practice Settings"
            subtitle="Configure firm profile, notifications, billing integrations, and administrative access controls"
        >
            <div className="max-w-5xl">
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

                {/* Save Feedback Banner */}
                <AnimatePresence>
                    {saved && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl mb-6 flex items-center space-x-2.5 shadow-xs"
                        >
                            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                            <span className="text-xs sm:text-sm font-semibold">Settings updated and saved successfully!</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Tab 1: Practice Info */}
                {activeTab === 'company' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 sm:p-8"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <h3 className="text-base font-serif font-bold text-primary pb-3 border-b border-slate-100">
                                Practice Identity
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                        Firm Legal Name
                                    </label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input
                                            {...register('companyName', { required: 'Firm name is required' })}
                                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                        Official Website
                                    </label>
                                    <div className="relative">
                                        <Globe className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input
                                            {...register('website')}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                    Brand Logo
                                </label>
                                <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                                    <img
                                        src="logo.png"
                                        alt="Logo"
                                        className="w-20 h-20 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                                    />
                                    <div>
                                        <button type="button" className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold shadow-sm transition-colors">
                                            Replace Logo
                                        </button>
                                        <p className="text-[11px] text-slate-400 mt-1">Recommended: 200x200px PNG or SVG with transparency</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <button
                                    type="submit"
                                    className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-linear-to-r from-primary to-primary-600 text-white rounded-xl text-xs font-bold hover:from-primary-600 hover:to-primary-700 shadow-xs transition-all"
                                >
                                    <Save className="w-4 h-4 text-gold" />
                                    <span>Save Practice Info</span>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* Tab 2: Contact Details */}
                {activeTab === 'contact' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 sm:p-8"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <h3 className="text-base font-serif font-bold text-primary pb-3 border-b border-slate-100">
                                Official Contact & Office Location
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                        General Inquiries Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input
                                            {...register('email', { required: 'Email is required' })}
                                            type="email"
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                        Telephone Hotline
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input
                                            {...register('phone')}
                                            type="tel"
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                    Physical Office Address
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
                                    <textarea
                                        {...register('address')}
                                        rows={3}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <button
                                    type="submit"
                                    className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-linear-to-r from-primary to-primary-600 text-white rounded-xl text-xs font-bold hover:from-primary-600 hover:to-primary-700 shadow-xs transition-all"
                                >
                                    <Save className="w-4 h-4 text-gold" />
                                    <span>Save Contact Details</span>
                                </button>
                            </div>
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
                            Automated Administrative Alerts
                        </h3>

                        <div className="space-y-3 mb-6">
                            {[
                                { title: 'New Client Registration', desc: 'Notify practice partners when a corporate or individual client creates an account.' },
                                { title: 'Service Engagement Request', desc: 'Instant alert when a client requests a new tax filing or advisory package.' },
                                { title: 'Client Chat Inquiries', desc: 'Push alert for urgent questions submitted in the client portal.' },
                                { title: 'Remittance & Payment Confirmation', desc: 'Notify finance team when retainers or fees are settled.' },
                                { title: 'Public Testimonial Submitted', desc: 'Alert admins to review and approve newly posted client feedback.' }
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
                            <span>Save Notification Preferences</span>
                        </button>
                    </motion.div>
                )}

                {/* Tab 4: Payments */}
                {activeTab === 'payment' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 sm:p-8"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <h3 className="text-base font-serif font-bold text-primary pb-3 border-b border-slate-100">
                                Billing & Payment Gateways
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                        Base Currency
                                    </label>
                                    <select
                                        {...register('currency')}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                    >
                                        <option value="KES">Kenyan Shilling (KES)</option>
                                        <option value="USD">US Dollar (USD)</option>
                                        <option value="EUR">Euro (EUR)</option>
                                        <option value="GBP">British Pound (GBP)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                        Statutory VAT Rate (%)
                                    </label>
                                    <input
                                        {...register('taxRate')}
                                        type="number"
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                    Enabled Channels
                                </label>
                                {['M-Pesa Express & Till', 'Direct Bank Wire (RTGS / SWIFT)', 'Credit & Debit Cards (Visa / Mastercard)'].map((method) => (
                                    <div key={method} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                                        <span className="text-xs font-semibold text-slate-700">{method}</span>
                                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <button
                                    type="submit"
                                    className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-linear-to-r from-primary to-primary-600 text-white rounded-xl text-xs font-bold hover:from-primary-600 hover:to-primary-700 shadow-xs transition-all"
                                >
                                    <Save className="w-4 h-4 text-gold" />
                                    <span>Save Payment Settings</span>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* Tab 5: Security */}
                {activeTab === 'security' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 sm:p-8 space-y-6"
                    >
                        <h3 className="text-base font-serif font-bold text-primary pb-3 border-b border-slate-100">
                            Authentication & Access Controls
                        </h3>

                        <div className="space-y-4 max-w-md">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center">
                                <Lock className="w-4 h-4 mr-1.5 text-gold" />
                                <span>Change Master Password</span>
                            </h4>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">New Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                                />
                            </div>

                            <button className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-600 transition-colors">
                                Update Password
                            </button>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h4 className="text-sm font-bold text-slate-800 flex items-center">
                                    <Shield className="w-4 h-4 mr-1.5 text-gold" />
                                    <span>Two-Factor Authentication (2FA)</span>
                                </h4>
                                <p className="text-xs text-slate-500 mt-0.5">Protect admin operations with TOTP authenticator code verification.</p>
                            </div>
                            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors shrink-0">
                                Configure 2FA
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </AdminLayout>
    );
}