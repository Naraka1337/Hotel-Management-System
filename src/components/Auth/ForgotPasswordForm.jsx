import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader, ArrowLeft, CheckCircle } from 'lucide-react';
import { fadeIn, slideUp } from '../../utils/animations';
import { toast } from 'react-toastify';
import { forgotPassword } from '../../api/auth';

export const ForgotPasswordForm = ({ setAuthView }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await forgotPassword(email);
            setSubmitted(true);
            toast.success('Password reset email sent!');
        } catch (error) {
            console.error('Forgot password error:', error);
            toast.error(error.response?.data?.detail || 'Failed to send reset email.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <motion.div className="text-center space-y-6" {...fadeIn}>
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Check Your Email</h2>
                <p className="text-gray-600 text-lg max-w-sm mx-auto">
                    We've sent a password reset link to <span className="font-semibold text-blue-600">{email}</span>
                </p>
                <p className="text-gray-500 text-sm">
                    Didn't receive the email? Check your spam folder or try again.
                </p>
                <div className="flex flex-col gap-3 mt-6">
                    <button
                        onClick={() => setSubmitted(false)}
                        className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all"
                    >
                        Try Different Email
                    </button>
                    <button
                        onClick={() => setAuthView('login')}
                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                    >
                        Back to Login
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.form onSubmit={handleSubmit} className="space-y-6" {...fadeIn}>
            <motion.div className="text-center mb-8" {...slideUp}>
                <h2 className="text-4xl font-bold text-gray-900 mb-3">Forgot Password?</h2>
                <p className="text-gray-600 text-lg">No worries, we'll send you reset instructions</p>
            </motion.div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-10 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                        placeholder="you@example.com"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
                {loading ? <Loader className="animate-spin w-6 h-6" /> : 'Send Reset Link'}
            </button>

            <button
                type="button"
                onClick={() => setAuthView('login')}
                className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 font-semibold transition-colors mt-4"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
            </button>
        </motion.form>
    );
};

export default ForgotPasswordForm;
