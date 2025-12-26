import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Loader, CheckCircle, XCircle } from 'lucide-react';
import { fadeIn, slideUp } from '../../utils/animations';
import { toast } from 'react-toastify';
import { resetPassword } from '../../api/auth';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const ResetPasswordForm = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('form'); // 'form', 'success', 'error'
    const [token, setToken] = useState('');

    useEffect(() => {
        const tokenParam = searchParams.get('token');
        if (tokenParam) {
            setToken(tokenParam);
        } else {
            setStatus('error');
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            await resetPassword(token, password);
            setStatus('success');
            toast.success('Password reset successfully!');
        } catch (error) {
            console.error('Reset password error:', error);
            if (error.response?.status === 400) {
                setStatus('error');
            }
            toast.error(error.response?.data?.detail || 'Failed to reset password.');
        } finally {
            setLoading(false);
        }
    };

    if (status === 'success') {
        return (
            <motion.div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4" {...fadeIn}>
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Password Reset!</h2>
                    <p className="text-gray-600 text-lg">
                        Your password has been successfully reset. You can now log in with your new password.
                    </p>
                    <button
                        onClick={() => navigate('/auth')}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                        Go to Login
                    </button>
                </div>
            </motion.div>
        );
    }

    if (status === 'error') {
        return (
            <motion.div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4" {...fadeIn}>
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                            <XCircle className="w-10 h-10 text-red-600" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Invalid or Expired Link</h2>
                    <p className="text-gray-600 text-lg">
                        This password reset link is invalid or has expired. Please request a new one.
                    </p>
                    <button
                        onClick={() => navigate('/auth')}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                        Back to Login
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4" {...fadeIn}>
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div className="text-center mb-8" {...slideUp}>
                        <h2 className="text-4xl font-bold text-gray-900 mb-3">Reset Password</h2>
                        <p className="text-gray-600 text-lg">Enter your new password below</p>
                    </motion.div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full pl-10 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full pl-10 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {loading ? <Loader className="animate-spin w-6 h-6" /> : 'Reset Password'}
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default ResetPasswordForm;
