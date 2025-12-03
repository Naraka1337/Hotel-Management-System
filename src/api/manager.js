import { DB } from '../offline/db';

// Get manager dashboard data
export const getManagerDashboard = async () => {
  // Mock data based on DB
  const bookings = DB.getBookings();
  const hotels = DB.getHotels();
  // Calculate some stats
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((acc, b) => acc + (b.price || 0), 0);

  return {
    stats: {
      total_bookings: totalBookings,
      available_rooms: hotels.reduce((acc, h) => acc + (h.rooms ? h.rooms.filter(r => r.is_available).length : 0), 0),
      monthly_revenue: totalRevenue, // Simplified
      occupancy_rate: 75 // Mock
    },
    recent_bookings: bookings.slice(0, 5).map(b => ({
      id: b.id,
      user_email: 'user@example.com', // Mock, ideally fetch user
      room_number: '101', // Mock
      check_in_date: b.checkIn || new Date().toISOString(),
      check_out_date: b.checkOut || new Date().toISOString(),
      status: b.status || 'confirmed'
    }))
  };
};

// Get manager rooms
export const getManagerRooms = async () => {
  // Return all rooms from all hotels for now, or mock specific ones
  const hotels = DB.getHotels();
  return hotels.flatMap(h => h.rooms || []);
};

// Create room
export const createRoom = async (roomData) => {
  try {
    const newRoom = DB.addRoom(roomData);
    return { message: 'Room created successfully', room: newRoom };
  } catch (error) {
    throw { response: { data: { detail: error.message } } };
  }
};

// Update room
export const updateRoom = async (roomId, roomData) => {
  try {
    const updatedRoom = DB.updateRoom(roomId, roomData);
    return { message: 'Room updated successfully', room: updatedRoom };
  } catch (error) {
    throw { response: { data: { detail: error.message } } };
  }
};

// Delete room
export const deleteRoom = async (roomId) => {
  try {
    DB.deleteRoom(roomId);
    return { message: 'Room deleted successfully' };
  } catch (error) {
    throw { response: { data: { detail: error.message } } };
  }
};

