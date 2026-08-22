import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Menu,
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
    Lock
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useForm } from 'react-hook-form';

export default function SettingsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('company');
    const [saved, setSaved] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            companyName: 'Optivis Tax',
            email: 'info@optivistax.com',
            phone: '+254 700 000 000',
            address: 'Westlands Business Park, Nairobi, Kenya',
            website: 'https://optivistax.com',
            currency: 'KES',
            taxRate: '16'
        }
    });

    const tabs = [
        { id: 'company', name: 'Company Info', icon: Building2 },
        { id: 'contact', name: 'Contact Details', icon: Phone },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: 'payment', name: 'Payment Settings', icon: CreditCard },
        { id: 'security', name: 'Security', icon: Shield },
    ];

    const onSubmit = (data) => {
        console.log('Settings saved:', data);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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
                            <h1 className="text-2xl font-serif font-bold text-primary">Settings</h1>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="max-w-5xl mx-auto">
                        {/* Tabs */}
                        <div className="flex space-x-2 md:space-x-4 mb-8 overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-primary text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    <span>{tab.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl shadow-sm p-6"
                        >
                            {saved && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2"
                                >
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Settings saved successfully!</span>
                                </motion.div>
                            )}

                            {activeTab === 'company' && (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <h3 className="text-lg font-serif font-bold text-primary">Company Information</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                                            <div className="relative">
                                                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    {...register('companyName', { required: 'Company name is required' })}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                                />
                                            </div>
                                            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                                            <div className="relative">
                                                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    {...register('website')}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                                        <div className="flex items-center space-x-4">
                                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <img src="../logo.png" alt="Logo" className="w-16 h-16 object-contain" />
                                            </div>
                                            <div>
                                                <button type="button" className="btn-outline text-sm">Change Logo</button>
                                                <p className="text-xs text-gray-500 mt-2">Recommended: 200x200px, PNG or SVG</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn-primary flex items-center">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </button>
                                </form>
                            )}

                            {activeTab === 'contact' && (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <h3 className="text-lg font-serif font-bold text-primary">Contact Details</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    {...register('email', { required: 'Email is required' })}
                                                    type="email"
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    {...register('phone')}
                                                    type="tel"
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Office Address</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <textarea
                                                {...register('address')}
                                                rows={3}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="btn-primary flex items-center">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </button>
                                </form>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-serif font-bold text-primary">Notification Preferences</h3>
                                    {[
                                        {
                                            label: 'New client registration',
                                            description: 'Get notified when a new client registers'
                                        },
                                        {
                                            label: 'New service request',
                                            description: 'Get notified when a client submits a service request'
                                        },
                                        {
                                            label: 'New message',
                                            description: 'Get notified for new chat messages'
                                        },
                                        {
                                            label: 'Payment received',
                                            description: 'Get notified when a payment is received'
                                        },
                                        {
                                            label: 'New testimonial',
                                            description: 'Get notified when a client submits a testimonial'
                                        },
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <p className="font-medium text-primary">{item.label}</p>
                                                <p className="text-sm text-gray-500">{item.description}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                            </label>
                                        </div>
                                    ))}

                                    <button onClick={() => {
                                        setSaved(true);
                                        setTimeout(() => setSaved(false), 3000);
                                    }} className="btn-primary flex items-center">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Preferences
                                    </button>
                                </div>
                            )}

                            {activeTab === 'payment' && (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <h3 className="text-lg font-serif font-bold text-primary">Payment Settings</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                                            <select
                                                {...register('currency')}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            >
                                                <option value="KES">Kenyan Shilling (KES)</option>
                                                <option value="USD">US Dollar (USD)</option>
                                                <option value="EUR">Euro (EUR)</option>
                                                <option value="GBP">British Pound (GBP)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                                            <input
                                                {...register('taxRate')}
                                                type="number"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold text-primary mb-2">Payment Methods</h4>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Configure payment gateways for accepting client payments
                                        </p>
                                        <div className="space-y-3">
                                            {['M-Pesa', 'Bank Transfer', 'Credit/Debit Card', 'PayPal'].map((method) => (
                                                <div key={method} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                    <span className="font-medium">{method}</span>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button type="submit" className="btn-primary flex items-center">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Payment Settings
                                    </button>
                                </form>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-serif font-bold text-primary">Security Settings</h3>

                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold text-primary mb-2 flex items-center">
                                            <Lock className="w-5 h-5 mr-2" />
                                            Change Password
                                        </h4>
                                        <div className="space-y-4 mt-4 max-w-md">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                                <input
                                                    type="password"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                                <input
                                                    type="password"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                                <input
                                                    type="password"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                                />
                                            </div>
                                            <button className="btn-primary">Update Password</button>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold text-primary mb-2 flex items-center">
                                            <Shield className="w-5 h-5 mr-2" />
                                            Two-Factor Authentication
                                        </h4>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Add an extra layer of security to your admin account
                                        </p>
                                        <button className="btn-outline text-sm">Enable 2FA</button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}