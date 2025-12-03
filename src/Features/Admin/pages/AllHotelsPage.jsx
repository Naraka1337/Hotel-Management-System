// src/Features/Admin/pages/AllHotelsPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, MapPin, Star, X, Save, Hotel, Loader, Image as ImageIcon } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllHotels, createHotel, updateHotel, deleteHotel } from '../../../api/admin';
import { fadeIn, staggerContainer, staggerItem, scaleIn, modalBackdrop } from '../../../utils/animations';

const AllHotelsPage = () => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentHotel, setCurrentHotel] = useState({
        name: '',
        location: '',
        description: '',
        manager_id: '', // Assuming we might assign a manager, but maybe optional
        image_url: ''
    });

    // Fetch Hotels
    const { data: hotels = [], isLoading, error } = useQuery({
        queryKey: ['adminHotels'],
        queryFn: getAllHotels,
    });

    // Mutations
    const createMutation = useMutation({
        mutationFn: createHotel,
        onSuccess: () => {
            queryClient.invalidateQueries(['adminHotels']);
            toast.success('Hotel added successfully!');
            handleCloseModal();
        },
        onError: (error) => {
            toast.error('Failed to add hotel: ' + (error.response?.data?.detail || error.message));
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateHotel(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['adminHotels']);
            toast.success('Hotel updated successfully!');
            handleCloseModal();
        },
        onError: (error) => {
            toast.error('Failed to update hotel: ' + (error.response?.data?.detail || error.message));
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteHotel,
        onSuccess: () => {
            queryClient.invalidateQueries(['adminHotels']);
            toast.success('Hotel deleted successfully!');
        },
        onError: (error) => {
            toast.error('Failed to delete hotel: ' + (error.response?.data?.detail || error.message));
        }
    });

    const handleOpenModal = (hotel = null) => {
        if (hotel) {
            setCurrentHotel(hotel);
            setIsEditMode(true);
        } else {
            setCurrentHotel({
                name: '',
                location: '',
                description: '',
                manager_id: '',
                image_url: ''
            });
            setIsEditMode(false);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setCurrentHotel({
            name: '',
            location: '',
            description: '',
            manager_id: '',
            image_url: ''
        });
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
        // Ensure manager_id is a number if present, else null/undefined
        const hotelData = {
            ...currentHotel,
            manager_id: currentHotel.manager_id ? parseInt(currentHotel.manager_id) : null
        };

        if (isEditMode) {
            updateMutation.mutate({ id: currentHotel.id, data: hotelData });
        } else {
            createMutation.mutate(hotelData);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this hotel?')) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 p-6">
                Error loading hotels: {error.message}
            </div>
        );
    }

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {hotels.map((hotel) => (
                        <motion.div
                            key={hotel.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                            variants={staggerItem}
                            initial="initial"
                            animate="animate"
                            exit={{ opacity: 0, scale: 0.9 }}
                            layout
                        >
                            <div className="h-48 bg-gray-200 relative">
                                {hotel.image_url ? (
                                    <img
                                        src={hotel.image_url}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'; }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <ImageIcon className="w-12 h-12" />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex space-x-2">
                                    <button
                                        onClick={() => handleOpenModal(hotel)}
                                        className="p-2 bg-white/90 rounded-full text-blue-600 hover:text-blue-800 shadow-sm backdrop-blur-sm"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(hotel.id)}
                                        className="p-2 bg-white/90 rounded-full text-red-600 hover:text-red-800 shadow-sm backdrop-blur-sm"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{hotel.name}</h3>
                                <div className="flex items-center text-gray-600 mb-2">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span className="text-sm">{hotel.location}</span>
                                </div>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                    {hotel.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
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
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <div>
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
                                                Location *
                                            </label>
                                            <input
                                                type="text"
                                                name="location"
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentHotel.location}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                rows="3"
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentHotel.description}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Image URL
                                            </label>
                                            <input
                                                type="url"
                                                name="image_url"
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentHotel.image_url}
                                                onChange={handleInputChange}
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Manager ID (Optional)
                                            </label>
                                            <input
                                                type="number"
                                                name="manager_id"
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentHotel.manager_id}
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
                                            <Save className="w-4 h-4 mr-2 inline" />
                                            {isEditMode ? 'Update Hotel' : 'Add Hotel'}
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

export default AllHotelsPage;