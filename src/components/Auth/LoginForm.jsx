import React from 'react'

const LoginForm = ({ setAuthView }) => {
   const handleLogin = (e) => {
      e.preventDefault();
      // Simulate successful login
      alert('Login successful!'); // Placeholder
      // TODO: Implement actual login logic
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
      <p className="text-gray-500">Sign in to book your next luxurious stay.</p>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input 
          type="email" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" 
          placeholder="you@example.com" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
          type="password" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" 
          placeholder="••••••••" 
        />
      </div>

      <div className="flex justify-end">
        <button 
          type="button" 
          onClick={() => setAuthView('reset')}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
        >
          Forgot password?
        </button>
      </div>

      <button 
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/50"
      >
        Sign In
      </button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account? 
        <button 
          type="button" 
          onClick={() => setAuthView('register')}
          className="font-semibold text-blue-600 hover:text-blue-800 ml-1 transition"
        >
          Create Account
        </button>
      </p>
    </form>
  );
}

export default LoginForm