import api from './auth';

// Get manager dashboard data
export const getManagerDashboard = async () => {
  const response = await api.get('/api/manager/dashboard');
  return response.data;
};

// Get manager rooms
export const getManagerRooms = async () => {
  const response = await api.get('/api/manager/rooms');
  return response.data;
};

// Create room
export const createRoom = async (roomData) => {
  const response = await api.post('/api/manager/rooms', roomData);
  return response.data;
};

// Update room
export const updateRoom = async (roomId, roomData) => {
  const response = await api.put(`/api/manager/rooms/${roomId}`, roomData);
  return response.data;
};

// Delete room
export const deleteRoom = async (roomId) => {
  const response = await api.delete(`/api/manager/rooms/${roomId}`);
  return response.data;
};

