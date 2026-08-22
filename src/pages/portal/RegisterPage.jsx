import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Lock, Mail, User, Phone, Building2, Eye, EyeOff, ArrowLeft, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const result = registerUser(data);
        if (result.success) {
            setSuccess(true);
            setTimeout(() => {
                navigate('/portal/login');
            }, 2000);
        } else {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-primary-900 to-[#020914] flex items-center justify-center py-12 px-4 relative overflow-hidden">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-400/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

            <Link
                to="/"
                className="absolute top-6 left-6 inline-flex items-center text-slate-300 hover:text-white transition-colors z-20 text-xs font-semibold px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md"
            >
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Back to Website
            </Link>

            <div className="max-w-lg w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-7 sm:p-9 border border-white/20"
                >
                    <div className="text-center mb-6">
                        <Link to="/" className="inline-block mb-3">
                            <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-gold to-gold-200 p-0.5 shadow-lg mx-auto flex items-center justify-center">
                                <img src="../logo.png" alt="Optivis Tax" className="w-10 h-10 object-contain" />
                            </div>
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-primary">Open Client Account</h1>
                        <p className="text-xs text-slate-500 mt-1">Register for dedicated tax compliance and filing services</p>
                    </div>

                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-3.5 py-2.5 rounded-xl mb-4 text-center font-semibold"
                        >
                            Account registered successfully! Redirecting to login...
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3.5 py-2.5 rounded-xl mb-4"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                                Full Name *
                            </label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input
                                    {...register('fullName', { required: 'Full name is required' })}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                    placeholder="John Kamau"
                                />
                            </div>
                            {errors.fullName && <p className="text-rose-500 text-xs mt-0.5">{errors.fullName.message}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                                Email Address *
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
                                    placeholder="john@example.com"
                                />
                            </div>
                            {errors.email && <p className="text-rose-500 text-xs mt-0.5">{errors.email.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input
                                        {...register('phone')}
                                        type="tel"
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                        placeholder="+254 700 000 000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                                    Entity / Company
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input
                                        {...register('company')}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                        placeholder="Company Ltd"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                                Password *
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                    })}
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                                    placeholder="Create secure password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-rose-500 text-xs mt-0.5">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-linear-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 mt-2"
                        >
                            Create Client Account
                        </button>
                    </form>

                    <div className="mt-5 text-center text-xs text-slate-600">
                        <span>Already have an account? </span>
                        <Link to="/portal/login" className="text-gold font-bold hover:underline">
                            Sign in here
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}