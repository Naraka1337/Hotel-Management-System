import axiosClient from './axiosClient';
import { offlineStorage } from '../utils/offlineStorage';
import { toast } from 'react-toastify';

// Get all hotels
export const getHotels = async (params) => {
  if (!navigator.onLine) {
    const hotels = await offlineStorage.getHotels();
    if (hotels.length > 0) return hotels;
    // If no cache, fall through to error or empty
  }

  try {
    const response = await axiosClient.get('/api/public/hotels', { params });
    // Cache for offline use
    await offlineStorage.saveHotels(response.data);
    return response.data;
  } catch (error) {
    if (!navigator.onLine) {
      return await offlineStorage.getHotels();
    }
    throw error;
  }
};

// Get hotel by ID
export const getHotel = async (hotelId) => {
  if (!navigator.onLine) {
    const hotels = await offlineStorage.getHotels();
    const hotel = hotels.find(h => h.id === parseInt(hotelId));
    if (hotel) return hotel;
  }

  try {
    const response = await axiosClient.get(`/api/public/hotels/${hotelId}`);
    return response.data;
  } catch (error) {
    if (!navigator.onLine) {
      const hotels = await offlineStorage.getHotels();
      const hotel = hotels.find(h => h.id === parseInt(hotelId));
      if (hotel) return hotel;
    }
    throw error;
  }
};

// Get rooms for a hotel
export const getHotelRooms = async (hotelId) => {
  if (!navigator.onLine) {
    const rooms = await offlineStorage.getRooms();
    const hotelRooms = rooms.filter(r => r.hotel_id === parseInt(hotelId));
    if (hotelRooms.length > 0) return hotelRooms;
  }

  try {
    const response = await axiosClient.get(`/api/public/hotels/${hotelId}/rooms`);
    await offlineStorage.saveRooms(response.data);
    return response.data;
  } catch (error) {
    if (!navigator.onLine) {
      const rooms = await offlineStorage.getRooms();
      return rooms.filter(r => r.hotel_id === parseInt(hotelId));
    }
    throw error;
  }
};

// Create booking
export const createBooking = async (bookingData) => {
  if (!navigator.onLine) {
    await offlineStorage.queueAction({
      type: 'CREATE_BOOKING',
      payload: bookingData
    });
    toast.info('You are offline. Booking queued and will sync when online.');
    return { status: 'queued' };
  }

  const response = await axiosClient.post('/api/public/bookings', bookingData);
  return response.data;
};

// Get user bookings
export const getBookings = async () => {
  const response = await axiosClient.get('/api/public/bookings');
  return response.data;
};
