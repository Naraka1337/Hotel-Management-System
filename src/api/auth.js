import axiosClient from './axiosClient';

// Test backend connection
export const testConnection = async () => {
  try {
    const response = await axiosClient.get('/health');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error };
  }
};

// Login
export const login = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);

  const response = await axiosClient.post('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.data.access_token) {
    localStorage.setItem('access_token', response.data.access_token);
  }

  return response.data;
};

// Register
export const register = async (userData) => {
  const response = await axiosClient.post('/auth/register', {
    email: userData.email,
    password: userData.password,
    full_name: `${userData.firstName} ${userData.lastName}`.trim(),
    role: userData.role || 'guest',
  });
  return response.data;
};

// Get current user
export const getCurrentUser = async () => {
  const response = await axiosClient.get('/auth/me');
  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem('access_token');
};

// Forgot Password - Request reset email
export const forgotPassword = async (email) => {
  const response = await axiosClient.post('/auth/forgot-password', { email });
  return response.data;
};

// Reset Password - Set new password with token
export const resetPassword = async (token, newPassword) => {
  const response = await axiosClient.post('/auth/reset-password', {
    token,
    new_password: newPassword,
  });
  return response.data;
};

export default { login, register, getCurrentUser, logout, forgotPassword, resetPassword };
