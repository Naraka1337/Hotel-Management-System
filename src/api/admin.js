import api from './auth';

// Get admin dashboard data
export const getAdminDashboard = async () => {
  const response = await api.get('/api/admin/dashboard');
  return response.data;
};

// Get all hotels (admin)
export const getAllHotels = async () => {
  const response = await api.get('/api/admin/hotels');
  return response.data;
};

// Get all users (admin)
export const getAllUsers = async () => {
  const response = await api.get('/api/admin/users');
  return response.data;
};

// Create hotel (admin)
export const createHotel = async (hotelData) => {
  const response = await api.post('/api/admin/hotels', hotelData);
  return response.data;
};

// Update hotel (admin)
export const updateHotel = async (hotelId, hotelData) => {
  const response = await api.put(`/api/admin/hotels/${hotelId}`, hotelData);
  return response.data;
};

// Delete hotel (admin)
export const deleteHotel = async (hotelId) => {
  const response = await api.delete(`/api/admin/hotels/${hotelId}`);
  return response.data;
};

// Update user (admin)
export const updateUser = async (userId, userData) => {
  const response = await api.put(`/api/admin/users/${userId}`, userData);
  return response.data;
};

// Delete user (admin)
export const deleteUser = async (userId) => {
  const response = await api.delete(`/api/admin/users/${userId}`);
  return response.data;
};

