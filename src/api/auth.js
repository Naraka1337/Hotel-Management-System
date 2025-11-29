import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Test backend connection
export const testConnection = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      details: error.code === 'ECONNREFUSED' ? 'Backend server is not running' : error.message
    };
  }
};

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login
export const login = async (email, password) => {
  // OAuth2PasswordRequestForm expects form-urlencoded data
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);
  
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    // Store tokens
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }
    
    return response.data;
  } catch (error) {
    // Re-throw with better error info
    if (error.response) {
      throw error;
    } else if (error.request) {
      // Network error
      const networkError = new Error('Network Error: Cannot connect to backend server. Make sure it is running on http://localhost:8000');
      networkError.request = error.request;
      throw networkError;
    } else {
      throw error;
    }
  }
};

// Register
export const register = async (userData) => {
  try {
    const response = await api.post('/api/auth/register', {
      email: userData.email,
      password: userData.password,
      name: `${userData.firstName} ${userData.lastName}`.trim(),
      role: userData.role || 'guest',
    });
    return response.data;
  } catch (error) {
    // Re-throw with better error info
    if (error.response) {
      throw error;
    } else if (error.request) {
      // Network error
      const networkError = new Error('Network Error: Cannot connect to backend server. Make sure it is running on http://localhost:8000');
      networkError.request = error.request;
      throw networkError;
    } else {
      throw error;
    }
  }
};

// Get current user
export const getCurrentUser = async () => {
  const response = await api.get('/api/auth/me');
  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem('access_token');
};

export default api;

