import axiosClient from './axiosClient';

// Get all hotels
export const getHotels = async (params) => {
  const response = await axiosClient.get('/api/public/hotels', { params });
  return response.data;
};

// Get hotel by ID
export const getHotel = async (hotelId) => {
  const response = await axiosClient.get(`/api/public/hotels/${hotelId}`);
  return response.data;
};

// Get rooms for a hotel
export const getHotelRooms = async (hotelId) => {
  const response = await axiosClient.get(`/api/public/hotels/${hotelId}/rooms`);
  return response.data;
};

// Create booking
export const createBooking = async (bookingData) => {
  const response = await axiosClient.post('/api/public/bookings', bookingData);
  return response.data;
};

// Get user bookings
export const getBookings = async () => {
  const response = await axiosClient.get('/api/public/bookings');
  return response.data;
};
