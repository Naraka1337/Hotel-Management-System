import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, Bed, Wifi, Tv, Coffee, Wind, Users, DollarSign } from 'lucide-react';
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

// Sample hotels list (in real app, this would come from admin/API)
const availableHotels = [
  { id: '1', name: 'Grand Plaza Hotel' },
  { id: '2', name: 'Seaside Resort & Spa' },
  { id: '3', name: 'Mountain View Lodge' },
  { id: '4', name: 'City Center Hotel' },
  { id: '5', name: 'Luxury Suites Downtown' }
];

const initialRoomData = {
  id: '',
  hotelId: '',
  hotelName: '',
  roomNumber: '',
  type: 'single',
  price: '',
  capacity: 1,
  amenities: [],
  status: 'available',
  description: ''
};

const ManageRoomsPage = () => {
  const [rooms, setRooms] = useState([
    { id: '1', hotelId: '1', hotelName: 'Grand Plaza Hotel', roomNumber: '101', type: 'single', price: 99, capacity: 1, amenities: ['wifi', 'tv'], status: 'available', description: 'Cozy single room with city view' },
    { id: '2', hotelId: '1', hotelName: 'Grand Plaza Hotel', roomNumber: '201', type: 'double', price: 149, capacity: 2, amenities: ['wifi', 'tv', 'ac'], status: 'occupied', description: 'Spacious double room' },
    { id: '3', hotelId: '2', hotelName: 'Seaside Resort & Spa', roomNumber: '301', type: 'suite', price: 299, capacity: 4, amenities: ['wifi', 'tv', 'ac', 'breakfast'], status: 'maintenance', description: 'Luxury suite with jacuzzi' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(initialRoomData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If hotel is selected, update both hotelId and hotelName
    if (name === 'hotelId') {
      const selectedHotel = availableHotels.find(h => h.id === value);
      setCurrentRoom(prev => ({
        ...prev,
        hotelId: value,
        hotelName: selectedHotel ? selectedHotel.name : ''
      }));
    } else {
      setCurrentRoom(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAmenityChange = (amenityId) => {
    setCurrentRoom(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      setRooms(rooms.map(room =>
        room.id === currentRoom.id ? currentRoom : room
      ));
      toast.success('Room updated successfully!');
    } else {
      const newRoom = {
        ...currentRoom,
        id: Date.now().toString()
      };
      setRooms([...rooms, newRoom]);
      toast.success('Room added successfully!');
    }
    handleCloseModal();
  };

  const handleEdit = (room) => {
    setCurrentRoom(room);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      setRooms(rooms.filter(room => room.id !== id));
      toast.success('Room deleted successfully!');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentRoom(initialRoomData);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
              <option value="maintenance">Maintenance</option>
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
                filteredRooms.map((room) => (
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
                          <div className="text-sm font-medium text-gray-900">Room {room.roomNumber}</div>
                          <div className="text-xs text-gray-500">{room.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{room.hotelName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {roomTypes.find(t => t.id === room.type)?.name || room.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {room.amenities.map(amenityId => {
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
                        {room.price.toFixed(2)}/night
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(room.status)}`}>
                        {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
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
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
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
                      <label htmlFor="hotelId" className="block text-sm font-medium text-gray-700 mb-1">
                        Hotel *
                      </label>
                      <select
                        id="hotelId"
                        name="hotelId"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={currentRoom.hotelId}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a hotel</option>
                        {availableHotels.map(hotel => (
                          <option key={hotel.id} value={hotel.id}>
                            {hotel.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Room Number *
                      </label>
                      <input
                        type="text"
                        id="roomNumber"
                        name="roomNumber"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={currentRoom.roomNumber}
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
                              checked={currentRoom.amenities.includes(amenity.id)}
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
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Status *
                      </label>
                      <select
                        id="status"
                        name="status"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={currentRoom.status}
                        onChange={handleInputChange}
                      >
                        <option value="available">Available</option>
                        <option value="occupied">Occupied</option>
                        <option value="maintenance">Maintenance</option>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageRoomsPage;