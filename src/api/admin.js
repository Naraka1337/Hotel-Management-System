import axiosClient from './axiosClient';

// Get admin dashboard data
export const getAdminDashboard = async () => {
  const response = await axiosClient.get('/api/admin/dashboard');
  return response.data;
};

// Get all hotels (admin)
export const getAllHotels = async () => {
  const response = await axiosClient.get('/api/admin/hotels');
  return response.data;
};

// Get all users (admin)
export const getAllUsers = async () => {
  const response = await axiosClient.get('/api/admin/users');
  return response.data;
};

// Create hotel (admin)
export const createHotel = async (hotelData) => {
  const response = await axiosClient.post('/api/admin/hotels', hotelData);
  return response.data;
};

// Update hotel (admin)
export const updateHotel = async (hotelId, hotelData) => {
  const response = await axiosClient.put(`/api/admin/hotels/${hotelId}`, hotelData);
  return response.data;
};

// Delete hotel (admin)
export const deleteHotel = async (hotelId) => {
  const response = await axiosClient.delete(`/api/admin/hotels/${hotelId}`);
  return response.data;
};

// Update user (admin)
export const updateUser = async (userId, userData) => {
  const response = await axiosClient.put(`/api/admin/users/${userId}`, userData);
  return response.data;
};

// Delete user (admin)
export const deleteUser = async (userId) => {
  const response = await axiosClient.delete(`/api/admin/users/${userId}`);
  return response.data;
};
