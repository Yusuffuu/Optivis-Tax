import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Lock, Mail, Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const result = login(data.email, data.password);
        if (result.success) {
            if (result.user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                setError('Access denied. Admin credentials required.');
            }
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center py-12 px-4 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-linear-to-br from-primary to-primary-800"></div>
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
            </div>

            <div className="relative max-w-md w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-2xl p-8"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                                <Shield className="w-10 h-10 text-gold" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-primary">Admin Portal</h1>
                        <p className="text-gray-600 mt-2">Sign in to manage Optivis Tax</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Admin Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                                    })}
                                    type="email"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="admin@optivistax.com"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    {...register('password', { required: 'Password is required' })}
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="Enter admin password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-gold hover:text-gold-600">
                                Forgot password?
                            </a>
                        </div>

                        <button type="submit" className="btn-primary w-full">
                            Sign In to Admin Panel
                        </button>
                    </form>

                    {/* Back to Website */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/"
                            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Website
                        </Link>
                    </div>

                    {/* Demo Credentials */}
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 text-center">Demo Credentials:</p>
                        <p className="text-xs text-gray-500 text-center mt-1">
                            Email: admin@optivistax.com<br />
                            Password: admin123
                        </p>
                    </div>

                    {/* Security Notice */}
                    <div className="mt-6 flex items-center justify-center space-x-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <p className="text-xs text-gray-500">
                            Secured with 256-bit encryption
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}