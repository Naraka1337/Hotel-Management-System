import React from 'react'

const PasswordReset = ({ setAuthView }) => {
  const handleReset = (e) => {
      e.preventDefault();
      // Simulate reset request and navigate back to login
      alert("Password reset link sent to email!"); // NOTE: Using native alert for demonstration, replace with a custom modal.
      setAuthView('login');
      // TODO: Implement actual password reset logic
  };

  return (
    <form onSubmit={handleReset} className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
      <p className="text-gray-500">Enter your email address and we'll send you a link to reset your password.</p>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input 
          type="email" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" 
          placeholder="you@example.com" 
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-500/50"
      >
        Send Reset Link
      </button>

      <p className="text-center text-sm text-gray-600">
        <button 
          type="button" 
          onClick={() => setAuthView('login')}
          className="font-semibold text-blue-600 hover:text-blue-800 transition"
        >
          Back to Sign In
        </button>
      </p>
    </form>
  );
}

export default PasswordReset