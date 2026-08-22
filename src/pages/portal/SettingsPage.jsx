import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Menu,
    User,
    Lock,
    Bell,
    Shield,
    Save,
    CheckCircle
} from 'lucide-react';
import PortalSidebar from '../../components/portal/PortalSidebar';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';

export default function SettingsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [saved, setSaved] = useState(false);
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            fullName: user?.fullName || '',
            email: user?.email || '',
            phone: user?.phone || '',
            company: user?.company || ''
        }
    });

    const tabs = [
        { id: 'profile', name: 'Profile', icon: User },
        { id: 'password', name: 'Password', icon: Lock },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: 'security', name: 'Security', icon: Shield },
    ];

    const onSubmit = (data) => {
        console.log('Settings saved:', data);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

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
                            <h1 className="text-2xl font-serif font-bold text-primary">Settings</h1>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Tabs */}
                        <div className="flex space-x-4 mb-8 overflow-x-auto">
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

                            {activeTab === 'profile' && (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <input
                                                {...register('fullName', { required: 'Full name is required' })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            />
                                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                            <input
                                                {...register('email', { required: 'Email is required' })}
                                                type="email"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                            <input
                                                {...register('phone')}
                                                type="tel"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                                            <input
                                                {...register('company')}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="btn-primary flex items-center">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </button>
                                </form>
                            )}

                            {activeTab === 'password' && (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
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
                                    <button type="submit" className="btn-primary">
                                        Update Password
                                    </button>
                                </form>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-serif font-bold text-primary mb-4">Notification Preferences</h3>
                                    {[
                                        { label: 'Service request updates', description: 'Get notified when your request status changes' },
                                        { label: 'New messages', description: 'Receive notifications for new chat messages' },
                                        { label: 'Newsletter', description: 'Subscribe to our monthly newsletter' },
                                        { label: 'Tax deadlines', description: 'Reminders for upcoming tax deadlines' },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center justify-between p-4 border rounded-lg">
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
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-serif font-bold text-primary mb-4">Security Settings</h3>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold text-primary mb-2">Two-Factor Authentication</h4>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Add an extra layer of security to your account
                                        </p>
                                        <button className="btn-outline text-sm">Enable 2FA</button>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold text-primary mb-2">Active Sessions</h4>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Manage your active login sessions
                                        </p>
                                        <button className="btn-outline text-sm">View Sessions</button>
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