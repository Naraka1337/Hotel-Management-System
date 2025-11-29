// src/Features/Admin/UserManagementTable.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, User, Mail, Shield, X, Save, Ban, CheckCircle } from 'lucide-react';
import { fadeIn, staggerContainer, staggerItem, scaleIn, modalBackdrop } from '../../utils/animations';

const UserManagementTable = () => {
    const [users, setUsers] = useState([
        { id: 'user_001', name: 'John Doe', role: 'Customer', email: 'john@example.com', phone: '+1234567890', status: 'Active', joinDate: '2024-01-15' },
        { id: 'user_002', name: 'Hotel Manager A', role: 'Manager', email: 'mgr_a@hotel.com', phone: '+1234567891', status: 'Active', joinDate: '2024-02-20' },
        { id: 'user_003', name: 'Jane Smith', role: 'Customer', email: 'jane@example.com', phone: '+1234567892', status: 'Banned', joinDate: '2024-03-10' },
        { id: 'user_004', name: 'Admin User', role: 'Admin', email: 'admin@system.com', phone: '+1234567893', status: 'Active', joinDate: '2024-01-01' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        role: 'Customer',
        status: 'Active',
        joinDate: ''
    });

    const roles = ['Customer', 'Manager', 'Admin'];
    const statuses = ['Active', 'Inactive', 'Banned'];

    const handleOpenModal = (user = null) => {
        if (user) {
            setCurrentUser(user);
            setIsEditMode(true);
        } else {
            setCurrentUser({
                id: '',
                name: '',
                email: '',
                phone: '',
                role: 'Customer',
                status: 'Active',
                joinDate: new Date().toISOString().split('T')[0]
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
        setCurrentUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            setUsers(users.map(user =>
                user.id === currentUser.id ? currentUser : user
            ));
            toast.success('User updated successfully!');
        } else {
            const newUser = {
                ...currentUser,
                id: `user_${Date.now()}`
            };
            setUsers([...users, newUser]);
            toast.success('User added successfully!');
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(user => user.id !== id));
            toast.success('User deleted successfully!');
        }
    };

    const handleBanToggle = (user) => {
        const newStatus = user.status === 'Banned' ? 'Active' : 'Banned';
        setUsers(users.map(u =>
            u.id === user.id ? { ...u, status: newStatus } : u
        ));
        toast.success(newStatus === 'Banned' ? 'User banned successfully!' : 'User unbanned successfully!');
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Inactive':
                return 'bg-gray-100 text-gray-800';
            case 'Banned':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case 'Admin':
                return 'bg-purple-100 text-purple-800';
            case 'Manager':
                return 'bg-blue-100 text-blue-800';
            case 'Customer':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <motion.div className="p-6 space-y-6" {...fadeIn}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800">User Management</h1>
                    <p className="text-gray-600 mt-1">Manage all system users and their permissions</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition mt-4 md:mt-0"
                >
                    <Plus className="w-5 h-5 mr-1" />
                    Add New User
                </button>
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
                        {users.filter(u => u.status === 'Active').length}
                    </p>
                </motion.div>
                <motion.div className="bg-blue-50 rounded-lg shadow-sm p-4" variants={staggerItem}>
                    <p className="text-sm text-blue-600">Managers</p>
                    <p className="text-2xl font-bold text-blue-800">
                        {users.filter(u => u.role === 'Manager').length}
                    </p>
                </motion.div>
                <motion.div className="bg-red-50 rounded-lg shadow-sm p-4" variants={staggerItem}>
                    <p className="text-sm text-red-600">Banned</p>
                    <p className="text-2xl font-bold text-red-800">
                        {users.filter(u => u.status === 'Banned').length}
                    </p>
                </motion.div>
            </motion.div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Join Date</th>
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
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <User className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-xs text-gray-500">{user.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-900">
                                            <Mail className="w-4 h-4 text-gray-400 mr-1" />
                                            {user.email}
                                        </div>
                                        <div className="text-xs text-gray-500">{user.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadge(user.role)}`}>
                                            <Shield className="w-3 h-3 mr-1" />
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.joinDate}
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
                                            className={`${user.status === 'Banned' ? 'text-green-600 hover:text-green-900 hover:bg-green-50' : 'text-orange-600 hover:text-orange-900 hover:bg-orange-50'} p-1 rounded-full transition inline-flex`}
                                            title={user.status === 'Banned' ? 'Unban user' : 'Ban user'}
                                        >
                                            {user.status === 'Banned' ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
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

            {/* Add/Edit User Modal */}
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
                                        {isEditMode ? 'Edit User' : 'Add New User'}
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
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentUser.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email *
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
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentUser.phone}
                                                onChange={handleInputChange}
                                                placeholder="+1234567890"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Role *
                                            </label>
                                            <select
                                                name="role"
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentUser.role}
                                                onChange={handleInputChange}
                                            >
                                                {roles.map(role => (
                                                    <option key={role} value={role}>{role}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status *
                                            </label>
                                            <select
                                                name="status"
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={currentUser.status}
                                                onChange={handleInputChange}
                                            >
                                                {statuses.map(status => (
                                                    <option key={status} value={status}>{status}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {!isEditMode && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Join Date *
                                                </label>
                                                <input
                                                    type="date"
                                                    name="joinDate"
                                                    required
                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    value={currentUser.joinDate}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        )}
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
                                            {isEditMode ? 'Update User' : 'Add User'}
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