import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';

const LoginForm = ({ setAuthView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      // Store user info if needed
      if (result.access_token) {
        // Get user info using the API function
        const { getCurrentUser } = await import('../../api/auth');
        try {
          const user = await getCurrentUser();
          
          // Redirect based on role
          if (user.role === 'admin') {
            navigate('/admin');
          } else if (user.role === 'manager') {
            navigate('/manager');
          } else {
            navigate('/');
          }
        } catch (userErr) {
          // If getting user fails, still redirect to home
          console.error('Error getting user info:', userErr);
          navigate('/');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      let errorMessage = 'Login failed. Please check your credentials.';
      
      if (err.response) {
        // Server responded with error
        errorMessage = err.response.data?.detail || err.response.data?.message || errorMessage;
      } else if (err.request || err.message?.includes('Network Error')) {
        // Request made but no response (network error)
        errorMessage = 'Cannot connect to backend server. Please make sure the backend is running on http://localhost:8000';
      } else {
        // Something else happened
        errorMessage = err.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
      <p className="text-gray-500">Sign in to book your next luxurious stay.</p>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input 
          type="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" 
          placeholder="you@example.com" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
          type="password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Signing in...' : 'Sign In'}
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