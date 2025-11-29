// src/Features/Admin/pages/AllRoomsPage.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, Search, Filter, Bed, Hotel as HotelIcon } from 'lucide-react';

const AllRoomsPage = () => {
    // Sample rooms data from all hotels
    const [rooms, setRooms] = useState([
        { id: '1', hotelId: '1', hotelName: 'Grand Plaza Hotel', roomNumber: '101', type: 'Single', price: 99, capacity: 1, status: 'Available' },
        { id: '2', hotelId: '1', hotelName: 'Grand Plaza Hotel', roomNumber: '201', type: 'Double', price: 149, capacity: 2, status: 'Occupied' },
        { id: '3', hotelId: '2', hotelName: 'Seaside Resort', roomNumber: '301', type: 'Suite', price: 299, capacity: 4, status: 'Available' },
        { id: '4', hotelId: '2', hotelName: 'Seaside Resort', roomNumber: '102', type: 'Single', price: 89, capacity: 1, status: 'Maintenance' },
        { id: '5', hotelId: '3', hotelName: 'Mountain View Lodge', roomNumber: '205', type: 'Deluxe', price: 199, capacity: 2, status: 'Available' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentRoom, setCurrentRoom] = useState({
        id: '',
        hotelId: '',
        hotelName: '',
        roomNumber: '',
        type: 'Single',
        price: '',
        capacity: 1,
        status: 'Available'
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filterHotel, setFilterHotel] = useState('all');

    // Available hotels (in real app, fetch from API)
    const availableHotels = [
        { id: '1', name: 'Grand Plaza Hotel' },
        { id: '2', name: 'Seaside Resort' },
        { id: '3', name: 'Mountain View Lodge' },
        { id: '4', name: 'City Center Hotel' },
    ];

    const roomTypes = ['Single', 'Double', 'Suite', 'Deluxe'];
    const roomStatuses = ['Available', 'Occupied', 'Maintenance', 'Reserved'];

    const handleOpenModal = (room = null) => {
        if (room) {
            setCurrentRoom(room);
            setIsEditMode(true);
        } else {
            setCurrentRoom({
                id: '',
                hotelId: '',
                hotelName: '',
                roomNumber: '',
                type: 'Single',
                price: '',
                capacity: 1,
                status: 'Available'
            });
            setIsEditMode(false);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

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

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            setRooms(rooms.filter(room => room.id !== id));
            toast.success('Room deleted successfully!');
        }
    };

    // Filter rooms
    const filteredRooms = rooms.filter(room => {
        const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.hotelName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterHotel === 'all' || room.hotelId === filterHotel;
        return matchesSearch && matchesFilter;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Available':
                return 'bg-green-100 text-green-800';
            case 'Occupied':
                return 'bg-blue-100 text-blue-800';
            case 'Maintenance':
                return 'bg-yellow-100 text-yellow-800';
            case 'Reserved':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800">All Rooms Management</h1>
                    <p className="text-gray-600 mt-1">Manage rooms across all hotels</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition mt-4 md:mt-0"
                >
                    <Plus className="w-5 h-5 mr-1" />
                    Add New Room
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by room number or hotel..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            value={filterHotel}
                            onChange={(e) => setFilterHotel(e.target.value)}
                        >
                            <option value="all">All Hotels</option>
                            {availableHotels.map(hotel => (
                                <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <p className="text-sm text-gray-600">Total Rooms</p>
                    <p className="text-2xl font-bold text-gray-800">{rooms.length}</p>
                </div>
                <div className="bg-green-50 rounded-lg shadow-sm p-4">
                    <p className="text-sm text-green-600">Available</p>
                    <p className="text-2xl font-bold text-green-800">
                        {rooms.filter(r => r.status === 'Available').length}
                    </p>
                </div>
                <div className="bg-blue-50 rounded-lg shadow-sm p-4">
                    <p className="text-sm text-blue-600">Occupied</p>
                    <p className="text-2xl font-bold text-blue-800">
                        {rooms.filter(r => r.status === 'Occupied').length}
                    </p>
                </div>
                <div className="bg-yellow-50 rounded-lg shadow-sm p-4">
                    <p className="text-sm text-yellow-600">Maintenance</p>
                    <p className="text-2xl font-bold text-yellow-800">
                        {rooms.filter(r => r.status === 'Maintenance').length}
                    </p>
                </div>
            </div>

            {/* Rooms Table */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Room</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hotel</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Capacity</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredRooms.map((room) => (
                                <tr key={room.id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Bed className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">Room {room.roomNumber}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <HotelIcon className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-sm text-gray-900">{room.hotelName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {room.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ${room.price}/night
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(room.status)}`}>
                                            {room.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center space-x-2">
                                        <button
                                            onClick={() => handleOpenModal(room)}
                                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition inline-flex"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(room.id)}
                                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition inline-flex"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredRooms.length === 0 && (
                    <div className="text-center py-12">
                        <Bed className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No rooms found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                    </div>
                )}
            </div>

            {/* Add/Edit Room Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
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
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Hotel *
                                        </label>
                                        <select
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Room Number *
                                        </label>
                                        <input
                                            type="text"
                                            name="roomNumber"
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={currentRoom.roomNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Room Type *
                                        </label>
                                        <select
                                            name="type"
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={currentRoom.type}
                                            onChange={handleInputChange}
                                        >
                                            {roomTypes.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Price per Night ($) *
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            required
                                            min="0"
                                            step="0.01"
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={currentRoom.price}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Capacity (Guests) *
                                        </label>
                                        <input
                                            type="number"
                                            name="capacity"
                                            required
                                            min="1"
                                            max="10"
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={currentRoom.capacity}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Status *
                                        </label>
                                        <select
                                            name="status"
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={currentRoom.status}
                                            onChange={handleInputChange}
                                        >
                                            {roomStatuses.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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

export default AllRoomsPage;
