// src/Features/Admin/UserManagementTable.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, User, Mail, Shield, X, Save, Ban, CheckCircle, Loader } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers, updateUser, deleteUser } from '../../api/admin';
import { fadeIn, staggerContainer, staggerItem, scaleIn, modalBackdrop } from '../../utils/animations';

const UserManagementTable = () => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        id: '',
        email: '',
        role: 'customer',
        is_active: true
    });

    // Fetch Users
    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ['adminUsers'],
        queryFn: getAllUsers,
    });

    // Mutations
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['adminUsers']);
            toast.success('User updated successfully!');
            handleCloseModal();
        },
        onError: (error) => {
            toast.error('Failed to update user: ' + (error.response?.data?.detail || error.message));
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries(['adminUsers']);
            toast.success('User deleted successfully!');
        },
        onError: (error) => {
            toast.error('Failed to delete user: ' + (error.response?.data?.detail || error.message));
        }
    });

    const handleOpenModal = (user = null) => {
        if (user) {
            setCurrentUser(user);
            setIsEditMode(true);
        } else {
            // Creating users via admin might not be supported by backend yet (usually requires signup)
            // But we'll leave the UI for it if needed, or just for editing.
            // For now, let's assume we can only edit existing users.
            toast.info("Creating new users from admin panel is not yet supported. Please use the signup page.");
            return;
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentUser(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            updateMutation.mutate({ id: currentUser.id, data: currentUser });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteMutation.mutate(id);
        }
    };

    const handleBanToggle = (user) => {
        const newStatus = !user.is_active;
        updateMutation.mutate({
            id: user.id,
            data: { ...user, is_active: newStatus }
        });
    };

    const getStatusBadge = (isActive) => {
        return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-purple-100 text-purple-800';
            case 'manager':
                return 'bg-blue-100 text-blue-800';
            case 'customer':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
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
                Error loading users: {error.message}
            </div>
        );
    }

    return (
        <motion.div className="p-6 space-y-6" {...fadeIn}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800">User Management</h1>
                    <p className="text-gray-600 mt-1">Manage all system users and their permissions</p>
                </div>
            </div>

            {/* Stats */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                <motion.div className="bg-white rounded-lg shadow-sm p-4" variants={staggerItem}>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-800">{users.length}</p>
                </motion.div>
                <motion.div className="bg-green-50 rounded-lg shadow-sm p-4" variants={staggerItem}>
                    <p className="text-sm text-green-600">Active</p>
                    <p className="text-2xl font-bold text-green-800">
                        {users.filter(u => u.is_active).length}
                    </p>
                </motion.div>
                <motion.div className="bg-blue-50 rounded-lg shadow-sm p-4" variants={staggerItem}>
                    <p className="text-sm text-blue-600">Managers</p>
                    <p className="text-2xl font-bold text-blue-800">
                        {users.filter(u => u.role === 'manager').length}
                    </p>
                </motion.div>
                <motion.div className="bg-red-50 rounded-lg shadow-sm p-4" variants={staggerItem}>
                    <p className="text-sm text-red-600">Banned</p>
                    <p className="text-2xl font-bold text-red-800">
                        {users.filter(u => !u.is_active).length}
                    </p>
                </motion.div>
            </motion.div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
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
                            {users.map((user) => (
                                <motion.tr
                                    key={user.id}
                                    className="hover:bg-gray-50 transition duration-150"
                                    variants={staggerItem}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        #{user.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-900">
                                            <Mail className="w-4 h-4 text-gray-400 mr-1" />
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadge(user.role)}`}>
                                            <Shield className="w-3 h-3 mr-1" />
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(user.is_active)}`}>
                                            {user.is_active ? 'Active' : 'Banned'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center space-x-2">
                                        <button
                                            onClick={() => handleOpenModal(user)}
                                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition inline-flex"
                                            title="Edit user"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleBanToggle(user)}
                                            className={`${!user.is_active ? 'text-green-600 hover:text-green-900 hover:bg-green-50' : 'text-orange-600 hover:text-orange-900 hover:bg-orange-50'} p-1 rounded-full transition inline-flex`}
                                            title={!user.is_active ? 'Unban user' : 'Ban user'}
                                        >
                                            {!user.is_active ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition inline-flex"
                                            title="Delete user"
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

            {/* Edit User Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50"
                        {...modalBackdrop}
                    >
                        <motion.div
                            className="bg-white rounded-xl shadow-xl w-full max-w-md"
                            {...scaleIn}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {isEditMode ? 'Edit User' : 'Add New User'}
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
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentUser.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Role
                                            </label>
                                            <select
                                                name="role"
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentUser.role}
                                                onChange={handleInputChange}
                                            >
                                                <option value="customer">Customer</option>
                                                <option value="manager">Manager</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="is_active"
                                                name="is_active"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                checked={currentUser.is_active}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                                                Active Account
                                            </label>
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
                                            Save Changes
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

export default UserManagementTable;