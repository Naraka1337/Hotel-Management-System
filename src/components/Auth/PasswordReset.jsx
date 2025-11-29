import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { fadeIn, slideUp } from '../../utils/animations';

const PasswordReset = ({ setAuthView }) => {
  const handleReset = (e) => {
    e.preventDefault();
    // Simulate reset request and navigate back to login
    alert("Password reset link sent to email!"); // NOTE: Using native alert for demonstration, replace with a custom modal.
    setAuthView('login');
    // TODO: Implement actual password reset logic
  };

  return (
    <motion.form onSubmit={handleReset} className="space-y-6" {...fadeIn}>
      <motion.div className="text-center mb-8" {...slideUp}>
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Reset Password</h2>
        <p className="text-gray-600 text-lg">Enter your email to receive reset instructions</p>
      </motion.div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            required
            className="w-full pl-10 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Send Reset Link
      </button>

      <p className="text-center text-sm text-gray-600">
        <button
          type="button"
          onClick={() => setAuthView('login')}
          className="font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center mx-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Sign In
        </button>
      </p>
    </motion.form>
  );
}

export default PasswordReset