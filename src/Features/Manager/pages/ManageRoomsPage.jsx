import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Bed, Wifi, Tv, Coffee, Wind, Users, DollarSign } from 'lucide-react';
import api from '../../../api/auth';

const roomTypes = [
  { id: 'Single', name: 'Single Room' },
  { id: 'Double', name: 'Double Room' },
  { id: 'Suite', name: 'Suite' },
  { id: 'Deluxe', name: 'Deluxe Room' },
  { id: 'Executive', name: 'Executive Suite' }
];

const roomAmenities = [
  { id: 'wifi', name: 'WiFi', icon: <Wifi className="w-4 h-4" /> },
  { id: 'tv', name: 'TV', icon: <Tv className="w-4 h-4" /> },
  { id: 'ac', name: 'Air Conditioning', icon: <Wind className="w-4 h-4" /> },
  { id: 'breakfast', name: 'Breakfast', icon: <Coffee className="w-4 h-4" /> }
];

const initialRoomData = {
  id: '',
  room_number: '',
  type: 'Single',
  price: '',
  description: '',
  is_available: true
};

const ManageRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(initialRoomData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsRes, hotelsRes] = await Promise.all([
          api.get('/api/manager/rooms'),
          api.get('/api/manager/hotels')
        ]);
        setRooms(roomsRes.data);
        setHotels(hotelsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRoom(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure we have a hotel to assign to
    if (hotels.length === 0) {
      alert("You need to be assigned to a hotel first!");
      return;
    }
    const hotelId = hotels[0].id; // Default to first hotel for now

    const payload = {
      room_number: currentRoom.room_number,
      type: currentRoom.type,
      price: Number(currentRoom.price),
      description: currentRoom.description,
      is_available: currentRoom.is_available
    };

    try {
      if (isEditMode) {
        const response = await api.put(`/api/manager/rooms/${currentRoom.id}`, payload);
        setRooms(rooms.map(r => r.id === currentRoom.id ? response.data : r));
        alert("Room updated successfully!");
      } else {
        const response = await api.post(`/api/manager/rooms?hotel_id=${hotelId}`, payload);
        setRooms([...rooms, response.data]);
        alert("Room created successfully!");
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving room:", error);
      alert("Failed to save room. Check console for details.");
    }
  };

  const handleEdit = (room) => {
    setCurrentRoom({
      id: room.id,
      room_number: room.room_number,
      type: room.type,
      price: room.price,
      description: room.description || '',
      is_available: room.is_available
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await api.delete(`/api/manager/rooms/${id}`);
        setRooms(rooms.filter(room => room.id !== id));
      } catch (error) {
        console.error("Error deleting room:", error);
        alert("Failed to delete room");
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentRoom(initialRoomData);
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.room_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'available' ? room.is_available : !room.is_available);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Room Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Room
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search by room number or type..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Bed className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Room {room.room_number}</div>
                          <div className="text-xs text-gray-500">{room.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {room.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm font-medium text-gray-900">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {room.price.toFixed(2)}/night
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${room.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {room.is_available ? 'Available' : 'Occupied'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(room)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(room.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No rooms found. Add a new room to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Room Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {isEditMode ? 'Edit Room' : 'Add New Room'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="room_number" className="block text-sm font-medium text-gray-700 mb-1">
                      Room Number *
                    </label>
                    <input
                      type="text"
                      id="room_number"
                      name="room_number"
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={currentRoom.room_number}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                      Room Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={currentRoom.type}
                      onChange={handleInputChange}
                    >
                      {roomTypes.map(type => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                      Price per Night ($) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        required
                        min="0"
                        step="0.01"
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={currentRoom.price}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <select
                      id="status"
                      name="is_available"
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={currentRoom.is_available}
                      onChange={(e) => setCurrentRoom(prev => ({ ...prev, is_available: e.target.value === 'true' }))}
                    >
                      <option value="true">Available</option>
                      <option value="false">Occupied</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="3"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={currentRoom.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isEditMode ? 'Update Room' : 'Add Room'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRoomsPage;