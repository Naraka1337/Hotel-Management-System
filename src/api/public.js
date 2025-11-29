import api from './auth';

// Get all hotels
export const getHotels = async () => {
  const response = await api.get('/api/public/hotels');
  return response.data;
};

// Get hotel by ID
export const getHotel = async (hotelId) => {
  const response = await api.get(`/api/public/hotels/${hotelId}`);
  return response.data;
};

// Get rooms for a hotel
export const getHotelRooms = async (hotelId) => {
  const response = await api.get(`/api/public/hotels/${hotelId}/rooms`);
  return response.data;
};

// Create booking
export const createBooking = async (bookingData) => {
  const response = await api.post('/api/public/bookings', bookingData);
  return response.data;
};

