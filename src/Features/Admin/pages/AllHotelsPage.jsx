// src/Features/Admin/pages/AllHotelsPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, Hotel, MapPin, Star, X, Save } from 'lucide-react';
import { fadeIn, staggerContainer, staggerItem, scaleIn, modalBackdrop } from '../../../utils/animations';

const AllHotelsPage = () => {
    const [hotels, setHotels] = useState([
        { id: '1', name: 'Grand Plaza Hotel', city: 'New York', address: '123 Main St', rooms: 150, rating: 4.5, managerId: 'mgr_001', status: 'Active', description: 'Luxury hotel in downtown' },
        { id: '2', name: 'Seaside Resort', city: 'Miami', address: '456 Beach Blvd', rooms: 90, rating: 4.8, managerId: 'mgr_002', status: 'Active', description: 'Beautiful beachfront resort' },
        { id: '3', name: 'Mountain View Lodge', city: 'Denver', address: '789 Mountain Rd', rooms: 45, rating: 4.2, managerId: 'mgr_003', status: 'Inactive', description: 'Cozy mountain retreat' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentHotel, setCurrentHotel] = useState({
        id: '',
        name: '',
        city: '',
        address: '',
        rooms: '',
        rating: '',
        managerId: '',
        status: 'Active',
        description: ''
    });

    const handleOpenModal = (hotel = null) => {
        if (hotel) {
            setCurrentHotel(hotel);
            setIsEditMode(true);
        } else {
            setCurrentHotel({
                id: '',
                name: '',
                city: '',
                address: '',
                rooms: '',
                rating: '',
                managerId: '',
                status: 'Active',
                description: ''
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
        setCurrentHotel(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            setHotels(hotels.map(hotel =>
                hotel.id === currentHotel.id ? currentHotel : hotel
            ));
            toast.success('Hotel updated successfully!');
        } else {
            const newHotel = {
                ...currentHotel,
                id: Date.now().toString()
            };
            setHotels([...hotels, newHotel]);
            toast.success('Hotel added successfully!');
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this hotel? This will also affect all associated rooms.')) {
            setHotels(hotels.filter(hotel => hotel.id !== id));
            toast.success('Hotel deleted successfully!');
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Inactive':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <motion.div className="p-6 space-y-6" {...fadeIn}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800">Hotel Management</h1>
                    <p className="text-gray-600 mt-1">Manage all hotels in the system</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition mt-4 md:mt-0"
                >
                    <Plus className="w-5 h-5 mr-1" />
                    Add New Hotel
                </button>
            </div>

            {/* Stats */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                <motion.div className="bg-white rounded-lg shadow-sm p-4" variants={staggerItem}>
                    <p className="text-sm text-gray-600">Total Hotels</p>
                    <p className="text-2xl font-bold text-gray-800">{hotels.length}</p>
                </motion.div>
                <motion.div className="bg-green-50 rounded-lg shadow-sm p-4" variants={staggerItem}>
                    <p className="text-sm text-green-600">Active</p>
                    <p className="text-2xl font-bold text-green-800">
                        {hotels.filter(h => h.status === 'Active').length}
                    </p>
                </motion.div>
                <motion.div className="bg-red-50 rounded-lg shadow-sm p-4" variants={staggerItem}>
                    <p className="text-sm text-red-600">Inactive</p>
                    <p className="text-2xl font-bold text-red-800">
                        {hotels.filter(h => h.status === 'Inactive').length}
                    </p>
                </motion.div>
            </motion.div>

            {/* Hotels Table */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hotel Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rooms</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rating</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <motion.tbody
                            className="bg-white divide-y divide-gray-100"
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            {hotels.map((hotel) => (
                                <motion.tr
                                    key={hotel.id}
                                    className="hover:bg-gray-50 transition duration-150"
                                    variants={staggerItem}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Hotel className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{hotel.name}</div>
                                                <div className="text-xs text-gray-500">{hotel.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-900">
                                            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                                            {hotel.city}
                                        </div>
                                        <div className="text-xs text-gray-500">{hotel.address}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.rooms}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                            <span className="text-sm text-gray-900">{hotel.rating} / 5</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(hotel.status)}`}>
                                            {hotel.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center space-x-2">
                                        <button
                                            onClick={() => handleOpenModal(hotel)}
                                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition inline-flex"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(hotel.id)}
                                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition inline-flex"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Hotel Modal */}
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
                                        {isEditMode ? 'Edit Hotel' : 'Add New Hotel'}
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
                                                Hotel Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentHotel.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentHotel.city}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Address *
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentHotel.address}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Number of Rooms *
                                            </label>
                                            <input
                                                type="number"
                                                name="rooms"
                                                required
                                                min="1"
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentHotel.rooms}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Rating (1-5) *
                                            </label>
                                            <input
                                                type="number"
                                                name="rating"
                                                required
                                                min="1"
                                                max="5"
                                                step="0.1"
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentHotel.rating}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Manager ID
                                            </label>
                                            <input
                                                type="text"
                                                name="managerId"
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentHotel.managerId}
                                                onChange={handleInputChange}
                                                placeholder="e.g., mgr_001"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status *
                                            </label>
                                            <select
                                                name="status"
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentHotel.status}
                                                onChange={handleInputChange}
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                rows="3"
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentHotel.description}
                                                onChange={handleInputChange}
                                                placeholder="Brief description of the hotel"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                        >
                                            <X className="w-4 h-4 mr-2" />
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {isEditMode ? 'Update Hotel' : 'Add Hotel'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div >
    );
};

export default AllHotelsPage;