import { DB } from '../offline/db';

// Get admin dashboard data
export const getAdminDashboard = async () => {
  const users = DB.getUsers();
  const hotels = DB.getHotels();
  const bookings = DB.getBookings();

  return {
    stats: {
      total_users: users.length,
      total_hotels: hotels.length,
      total_bookings: bookings.length,
      total_revenue: bookings.reduce((acc, b) => acc + (b.price || 0), 0),
      active_users: users.length // Mock active users
    },
    recent_bookings: bookings.slice(0, 5).map(b => ({
      id: b.id,
      user_id: b.userId,
      room_id: b.roomId,
      check_in: b.checkIn || 'N/A',
      check_out: b.checkOut || 'N/A',
      total_price: b.price || 0,
      status: b.status || 'Confirmed'
    }))
  };
};

// Get all hotels (admin)
export const getAllHotels = async () => {
  return DB.getHotels();
};

// Get all users (admin)
export const getAllUsers = async () => {
  return DB.getUsers();
};

// Create hotel (admin)
export const createHotel = async (hotelData) => {
  try {
    const newHotel = DB.addHotel(hotelData);
    return { message: 'Hotel created successfully', hotel: newHotel };
  } catch (error) {
    throw { response: { data: { detail: error.message } } };
  }
};

// Update hotel (admin)
export const updateHotel = async (hotelId, hotelData) => {
  try {
    const updatedHotel = DB.updateHotel(hotelId, hotelData);
    return { message: 'Hotel updated successfully', hotel: updatedHotel };
  } catch (error) {
    throw { response: { data: { detail: error.message } } };
  }
};

// Delete hotel (admin)
export const deleteHotel = async (hotelId) => {
  try {
    DB.deleteHotel(hotelId);
    return { message: 'Hotel deleted successfully' };
  } catch (error) {
    throw { response: { data: { detail: error.message } } };
  }
};

// Update user (admin)
export const updateUser = async (userId, userData) => {
  try {
    const updatedUser = DB.updateUser(userId, userData);
    return { message: 'User updated successfully', user: updatedUser };
  } catch (error) {
    throw { response: { data: { detail: error.message } } };
  }
};

// Delete user (admin)
export const deleteUser = async (userId) => {
  try {
    DB.deleteUser(userId);
    return { message: 'User deleted successfully' };
  } catch (error) {
    throw { response: { data: { detail: error.message } } };
  }
};

