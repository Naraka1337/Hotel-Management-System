// src/Features/Manager/pages/ManageRoomsPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, Bed, Wifi, Tv, Coffee, Wind, Users, DollarSign, Loader, X, Save } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getManagerRooms, createRoom, updateRoom, deleteRoom } from '../../../api/manager';
import { getHotels } from '../../../api/public';
import { fadeIn, staggerContainer, staggerItem, scaleIn, modalBackdrop } from '../../../utils/animations';

const roomTypes = [
  { id: 'single', name: 'Single Room' },
  { id: 'double', name: 'Double Room' },
  { id: 'deluxe', name: 'Deluxe Room' },
  { id: 'suite', name: 'Suite' },
  { id: 'executive', name: 'Executive Suite' }
];

const roomAmenities = [
  { id: 'wifi', name: 'WiFi', icon: <Wifi className="w-4 h-4" /> },
  { id: 'tv', name: 'TV', icon: <Tv className="w-4 h-4" /> },
  { id: 'ac', name: 'Air Conditioning', icon: <Wind className="w-4 h-4" /> },
  { id: 'breakfast', name: 'Breakfast', icon: <Coffee className="w-4 h-4" /> }
];

const initialRoomData = {
  id: '',
  hotel_id: '',
  room_number: '',
  room_type: 'single',
  price_per_night: '',
  capacity: 1,
  amenities: [], // Assuming backend handles this or we store as JSON/string
  is_available: true,
  description: ''
};

const ManageRoomsPage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(initialRoomData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch Rooms
  const { data: rooms = [], isLoading: isLoadingRooms, error: roomsError } = useQuery({
    queryKey: ['managerRooms'],
    queryFn: getManagerRooms,
  });

  // Fetch Hotels (for dropdown)
  const { data: hotels = [], isLoading: isLoadingHotels } = useQuery({
    queryKey: ['publicHotels'],
    queryFn: getHotels,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries(['managerRooms']);
      toast.success('Room added successfully!');
      handleCloseModal();
    },
    onError: (error) => {
      toast.error(`Failed to add room: ${error.response?.data?.detail || error.message}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateRoom(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['managerRooms']);
      toast.success('Room updated successfully!');
      handleCloseModal();
    },
    onError: (error) => {
      toast.error(`Failed to update room: ${error.response?.data?.detail || error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      queryClient.invalidateQueries(['managerRooms']);
      toast.success('Room deleted successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to delete room: ${error.response?.data?.detail || error.message}`);
    }
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentRoom(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAmenityChange = (amenityId) => {
    // This logic depends on how backend expects amenities. 
    // Assuming array of strings for now.
    setCurrentRoom(prev => {
      const currentAmenities = prev.amenities || [];
      return {
        ...prev,
        amenities: currentAmenities.includes(amenityId)
          ? currentAmenities.filter(id => id !== amenityId)
          : [...currentAmenities, amenityId]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data for backend
    const roomData = {
      ...currentRoom,
      price_per_night: parseFloat(currentRoom.price_per_night),
      capacity: parseInt(currentRoom.capacity),
      hotel_id: parseInt(currentRoom.hotel_id)
    };

    if (isEditMode) {
      updateMutation.mutate({ id: currentRoom.id, data: roomData });
    } else {
      // Remove id for creation
      const { id, ...newRoomData } = roomData;
      createMutation.mutate(newRoomData);
    }
  };

  const handleEdit = (room) => {
    setCurrentRoom({
      ...room,
      // Ensure types match for form fields
      hotel_id: room.hotel_id?.toString() || '',
      price_per_night: room.price_per_night?.toString() || '',
      capacity: room.capacity || 1,
      amenities: room.amenities || []
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentRoom(initialRoomData);
  };

  const getStatusBadge = (isAvailable) => {
    return isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  // Filter logic
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = (room.room_number?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.room_type?.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'available' && room.is_available) ||
      (statusFilter === 'occupied' && !room.is_available); // Simplified status logic

    return matchesSearch && matchesStatus;
  });

  if (isLoadingRooms || isLoadingHotels) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (roomsError) {
    return (
      <div className="text-red-600 p-6">
        Error loading rooms: {roomsError.message}
      </div>
    );
  }

  return (
    <motion.div className="p-6" {...fadeIn}>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amenities</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <motion.tbody
              className="bg-white divide-y divide-gray-200"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => {
                  // Find hotel name
                  const hotel = hotels.find(h => h.id === room.hotel_id);
                  return (
                    <motion.tr
                      key={room.id}
                      className="hover:bg-gray-50"
                      variants={staggerItem}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Bed className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Room {room.room_number}</div>
                            <div className="text-xs text-gray-500">{room.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{hotel?.name || 'Unknown Hotel'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {roomTypes.find(t => t.id === room.room_type)?.name || room.room_type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {room.amenities && room.amenities.map(amenityId => {
                            const amenity = roomAmenities.find(a => a.id === amenityId);
                            return amenity ? (
                              <span key={amenityId} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {amenity.icon}
                                <span className="ml-1">{amenity.name}</span>
                              </span>
                            ) : null;
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-1" />
                          {room.capacity} {room.capacity > 1 ? 'Guests' : 'Guest'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {room.price_per_night?.toFixed(2)}/night
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(room.is_available)}`}>
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
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                    No rooms found. Add a new room to get started.
                  </td>
                </tr>
              )}
            </motion.tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Room Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50"
            {...modalBackdrop}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              {...scaleIn}
            >
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
                    <div className="md:col-span-2">
                      <label htmlFor="hotel_id" className="block text-sm font-medium text-gray-700 mb-1">
                        Hotel *
                      </label>
                      <select
                        id="hotel_id"
                        name="hotel_id"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={currentRoom.hotel_id}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a hotel</option>
                        {hotels.map(hotel => (
                          <option key={hotel.id} value={hotel.id}>
                            {hotel.name}
                          </option>
                        ))}
                      </select>
                    </div>

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
                      <label htmlFor="room_type" className="block text-sm font-medium text-gray-700 mb-1">
                        Room Type *
                      </label>
                      <select
                        id="room_type"
                        name="room_type"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={currentRoom.room_type}
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
                      <label htmlFor="price_per_night" className="block text-sm font-medium text-gray-700 mb-1">
                        Price per Night ($) *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="price_per_night"
                          name="price_per_night"
                          required
                          min="0"
                          step="0.01"
                          className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={currentRoom.price_per_night}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                        Capacity *
                      </label>
                      <select
                        id="capacity"
                        name="capacity"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={currentRoom.capacity}
                        onChange={handleInputChange}
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amenities
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {roomAmenities.map(amenity => (
                          <label key={amenity.id} className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              checked={currentRoom.amenities?.includes(amenity.id)}
                              onChange={() => handleAmenityChange(amenity.id)}
                            />
                            <span className="ml-2 text-sm text-gray-700 flex items-center">
                              {amenity.icon}
                              <span className="ml-1">{amenity.name}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="is_available" className="block text-sm font-medium text-gray-700 mb-1">
                        Status *
                      </label>
                      <select
                        id="is_available"
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
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isEditMode ? 'Update Room' : 'Add Room'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageRoomsPage;