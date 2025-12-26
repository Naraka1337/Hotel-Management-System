import axiosClient from './axiosClient';

// Get manager dashboard data
export const getManagerDashboard = async () => {
  const response = await axiosClient.get('/manager/dashboard');
  return response.data;
};

// Get manager rooms
export const getManagerRooms = async () => {
  const response = await axiosClient.get('/manager/rooms');
  return response.data;
};

// Create room
export const createRoom = async (roomData) => {
  const response = await axiosClient.post('/manager/rooms', roomData);
  return response.data;
};

// Update room
export const updateRoom = async (roomId, roomData) => {
  const response = await axiosClient.put(`/manager/rooms/${roomId}`, roomData);
  return response.data;
};

// Delete room
export const deleteRoom = async (roomId) => {
  const response = await axiosClient.delete(`/manager/rooms/${roomId}`);
  return response.data;
};
// Get manager hotels
export const getManagerHotels = async () => {
  const response = await axiosClient.get('/manager/hotels');
  return response.data;
};
