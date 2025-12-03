import { DB } from '../offline/db';

// Test backend connection (Mocked)
export const testConnection = async () => {
  return { success: true, data: { message: 'Offline Mode Active' } };
};

// Login
export const login = async (email, password) => {
  try {
    const response = DB.login(email, password);
    return response;
  } catch (error) {
    throw { response: { data: { detail: error.message } } };
  }
};

// Register
export const register = async (userData) => {
  try {
    // Check if user exists
    const existingUser = DB.findUser(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = {
      email: userData.email,
      password: userData.password,
      full_name: `${userData.firstName} ${userData.lastName}`.trim(),
      role: userData.role || 'guest',
      profile_picture: userData.profile_picture || null
    };

    DB.addUser(newUser);
    return { message: 'Registration successful' };
  } catch (error) {
    throw { response: { data: { detail: error.message } } };
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const user = DB.getCurrentUser();
    return user;
  } catch (error) {
    throw { response: { status: 401 } };
  }
};

// Logout
export const logout = () => {
  DB.logout();
};

export default { login, register, getCurrentUser, logout };

