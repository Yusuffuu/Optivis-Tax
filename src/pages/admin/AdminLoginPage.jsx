import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Lock, Mail, Eye, EyeOff, Shield, ArrowLeft, User, Sparkles } from 'lucide-react';
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
            if (result.user.role !== 'admin') {
                setError('Access denied. This portal is for firm administrators only.');
                return;
            }
            navigate('/admin/dashboard');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-primary-900 to-[#020914] flex items-center justify-center py-12 px-4 relative overflow-hidden">
            {/* Background Decorative Glows */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-400/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

            {/* Back to website */}
            <Link
                to="/"
                className="absolute top-6 left-6 inline-flex items-center text-slate-300 hover:text-white transition-colors z-20 text-xs font-semibold px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md"
            >
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Back to Website
            </Link>

            <div className="max-w-md w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-7 sm:p-9 border border-white/20"
                >
                    <div className="text-center mb-7">
                        <div className="flex justify-center mb-3">
                            <div className="w-16 h-16 rounded-2xl bg-linear-to-tr from-primary to-primary-700 p-0.5 shadow-lg flex items-center justify-center border border-white/10">
                                <Shield className="w-8 h-8 text-gold" />
                            </div>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-primary">Admin Gateway</h1>
                        <p className="text-xs text-slate-500 mt-1">Optivis Practice Management & Staff Access</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3.5 py-2.5 rounded-xl mb-5"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                Administrator Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                                    })}
                                    type="email"
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                    placeholder="admin@optivistax.com"
                                />
                            </div>
                            {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                    Master Password
                                </label>
                                <a href="#" className="text-[11px] text-gold hover:underline font-semibold">Forgot?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input
                                    {...register('password', { required: 'Password is required' })}
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-linear-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 mt-2"
                        >
                            Sign In as Administrator
                        </button>
                    </form>

                    <div className="relative my-5">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400">
                            <span className="px-3 bg-white">OR</span>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link
                            to="/portal/login"
                            className="inline-flex items-center text-xs text-slate-500 hover:text-primary transition-colors font-medium"
                        >
                            <User className="w-3.5 h-3.5 mr-1.5 text-gold" />
                            Looking for Client Workspace? <span className="text-gold font-bold ml-1">Client Portal</span>
                        </Link>
                    </div>

                    <div className="mt-5 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 text-center">
                        <p className="font-semibold text-slate-700">Demo Admin Credentials:</p>
                        <p className="font-mono mt-0.5">admin@optivistax.com / password123</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}