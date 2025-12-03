import { DB } from '../offline/db';

// Get all hotels
export const getHotels = async (params) => {
  let hotels = DB.getHotels();

  // Basic search filtering
  if (params && params.location) {
    const query = params.location.toLowerCase();
    hotels = hotels.filter(h =>
      h.name.toLowerCase().includes(query) ||
      h.location.toLowerCase().includes(query)
    );
  }

  return hotels;
};

// Get hotel by ID
export const getHotel = async (hotelId) => {
  const hotel = DB.getHotelById(hotelId);
  if (!hotel) throw new Error('Hotel not found');
  return hotel;
};

// Get rooms for a hotel
export const getHotelRooms = async (hotelId) => {
  const hotel = DB.getHotelById(hotelId);
  if (!hotel) throw new Error('Hotel not found');
  return hotel.rooms || [];
};

// Create booking
export const createBooking = async (bookingData) => {
  // In a real app we'd validate user, dates etc.
  const user = DB.getCurrentUser();
  if (!user) throw new Error('Must be logged in');

  const booking = DB.addBooking({
    ...bookingData,
    userId: user.id,
    hotelId: bookingData.hotel_id, // Ensure mapping matches
    roomId: bookingData.room_id
  });

  return booking;
};

// Get user bookings
export const getBookings = async () => {
  const user = DB.getCurrentUser();
  if (!user) throw new Error('Must be logged in');
  return DB.getUserBookings(user.id);
};

