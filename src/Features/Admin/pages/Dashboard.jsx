import React, { useState, useEffect } from 'react';
import { Hotel, Users, Calendar, DollarSign, Settings, LayoutDashboard, Plus, Trash2, Edit } from 'lucide-react';

// --- Global Constants ---
const __app_id = typeof window !== 'undefined' && typeof window.__app_id !== 'undefined' ? window.__app_id : 'default-app-id';


// Mock Firebase Imports (Required by instructions, even if logic is simplified)
const mockAuth = { currentUser: { uid: 'mock-admin-user-123' } };
const mockDb = {};

// Helper function to get status badge styling
const getStatusBadge = (status) => {
    switch (status) {
        case 'Confirmed':
            return 'bg-green-100 text-green-800';
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'Active':
            return 'bg-blue-100 text-blue-800';
        case 'Inactive':
            return 'bg-gray-100 text-gray-800';
        case 'Banned':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

import api from '../../../api/auth'; // Using the axios instance from auth.js which handles tokens

const Dashboard = () => {
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/api/admin/dashboard');
                setStatsData(response.data);
            } catch (error) {
                console.error("Error fetching admin stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    // Sample data fallback or use real data
    const stats = [
        {
            title: 'Total Hotels',
            value: statsData ? statsData.total_hotels : '...',
            icon: <Hotel className="w-10 h-10 opacity-80" />,
            gradient: 'from-blue-500 to-blue-600',
            textColor: 'text-blue-100'
        },
        {
            title: 'Total Bookings',
            value: statsData ? statsData.total_bookings : '...',
            icon: <Calendar className="w-10 h-10 opacity-80" />,
            gradient: 'from-green-500 to-green-600',
            textColor: 'text-green-100'
        },
        {
            title: 'Total Revenue',
            value: statsData ? `$${statsData.revenue.toLocaleString()}` : '...',
            icon: <DollarSign className="w-10 h-10 opacity-80" />,
            gradient: 'from-purple-500 to-purple-600',
            textColor: 'text-purple-100'
        },
        {
            title: 'Active Users',
            value: statsData ? statsData.active_users : '...',
            icon: <Users className="w-10 h-10 opacity-80" />,
            gradient: 'from-amber-500 to-amber-600',
            textColor: 'text-amber-100'
        }
    ];

    const recentBookings = statsData ? statsData.recent_bookings : [];

    return (
        <div className=" ml p-6 space-y-6 ">
            <h1 className="text-3xl font-extrabold text-gray-800">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className={`bg-linear-to-br ${stat.gradient} text-white p-6 rounded-xl shadow-xl transition transform hover:scale-[1.02] cursor-pointer`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`${stat.textColor} text-sm font-medium uppercase`}>{stat.title}</p>
                                <p className="text-4xl font-bold mt-1">{stat.value}</p>
                            </div>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-blue-500" /> Recent Bookings
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hotel</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Guest</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Check-in</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Check-out</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {recentBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50 transition duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.hotel}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.guest}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.checkIn}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.checkOut}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">${booking.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-indigo-600 hover:text-indigo-900 transition">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 text-right">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-end float-right">
                            View all bookings <span className="ml-1">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 2. All Hotels Page ---

const AllHotelsPage = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [managers, setManagers] = useState([]);
    const [newHotel, setNewHotel] = useState({
        name: '',
        location: '',
        description: '',
        image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        manager_id: ''
    });

    const fetchHotels = async () => {
        try {
            const response = await api.get('/api/admin/hotels');
            setHotels(response.data);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchManagers = async () => {
        try {
            const response = await api.get('/api/admin/users');
            // Filter only managers
            const managerList = response.data.filter(u => u.role === 'manager');
            setManagers(managerList);
            if (managerList.length > 0) {
                setNewHotel(prev => ({ ...prev, manager_id: managerList[0].id }));
            }
        } catch (error) {
            console.error("Error fetching managers:", error);
        }
    };

    useEffect(() => {
        fetchHotels();
        fetchManagers();
    }, []);

    const handleDelete = async (hotelId) => {
        if (window.confirm('Are you sure you want to delete this hotel?')) {
            try {
                await api.delete(`/api/admin/hotels/${hotelId}`);
                setHotels(hotels.filter(h => h.id !== hotelId));
            } catch (error) {
                console.error("Error deleting hotel:", error);
                alert("Failed to delete hotel");
            }
        }
    };

    const handleAddHotel = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/admin/hotels', newHotel);
            setHotels([...hotels, response.data]);
            setShowModal(false);
            setNewHotel({
                name: '',
                location: '',
                description: '',
                image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                manager_id: managers.length > 0 ? managers[0].id : ''
            });
            alert("Hotel created successfully!");
        } catch (error) {
            console.error("Error creating hotel:", error);
            alert("Failed to create hotel");
        }
    };

    const handleEdit = (hotel) => {
        alert(`Edit feature coming soon for ${hotel.name}`);
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-800">Hotel Management</h1>

            <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">Total Hotels: {hotels.length}</p>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    <Plus className="w-5 h-5 mr-1" /> Add New Hotel
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hotel Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Manager ID</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {hotels.map((hotel) => (
                                <tr key={hotel.id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hotel.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.manager_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center space-x-2">
                                        <button onClick={() => handleEdit(hotel)} className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(hotel.id)} className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Hotel Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Hotel</h2>
                        <form onSubmit={handleAddHotel} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={newHotel.name}
                                    onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={newHotel.location}
                                    onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={newHotel.description}
                                    onChange={(e) => setNewHotel({ ...newHotel, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={newHotel.manager_id}
                                    onChange={(e) => setNewHotel({ ...newHotel, manager_id: e.target.value })}
                                    required
                                >
                                    <option value="">Select a Manager</option>
                                    {managers.map(mgr => (
                                        <option key={mgr.id} value={mgr.id}>
                                            {mgr.full_name || mgr.email} (ID: {mgr.id})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Create Hotel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- 3. User Management Table ---

const UserManagementTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({
        full_name: '',
        email: '',
        password: '',
        role: 'manager'
    });

    const fetchUsers = async () => {
        try {
            const response = await api.get('/api/admin/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/api/admin/users/${userId}`);
                setUsers(users.filter(u => u.id !== userId));
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Failed to delete user");
            }
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/admin/users', newUser);
            setUsers([...users, response.data]);
            setShowModal(false);
            setNewUser({ full_name: '', email: '', password: '', role: 'manager' });
            alert("User created successfully!");
        } catch (error) {
            console.error("Error creating user:", error);
            alert(error.response?.data?.detail || "Failed to create user");
        }
    };

    const handleEdit = (user) => {
        alert(`Edit feature coming soon for ${user.full_name}`);
    };

    return (
        <div className="p-6 ">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold text-gray-800">User Management</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    <Plus className="w-5 h-5 mr-1" /> Add New User
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User ID</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.full_name || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {user.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center space-x-2">
                                        <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add User Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New User</h2>
                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={newUser.full_name}
                                    onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                    <option value="guest">Guest</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- 4. Global Settings Form ---

const GlobalSettingsForm = () => {
    const [settings, setSettings] = useState({
        commissionRate: 15,
        defaultCurrency: 'USD',
        emailEnabled: true,
        supportEmail: 'support@system.com'
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Saving Global Settings:', settings);
        // In a real app, this would be a Firebase call to update a config document
        alert('Settings Saved Successfully!');
        // NOTE: Using a simple JS alert for demonstration since custom modals are complex
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-800">Global System Settings</h1>
            <p className="text-gray-600">Configure core system parameters and behaviors.</p>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl space-y-6 max-w-lg border border-gray-100">
                {/* Commission Rate */}
                <div>
                    <label htmlFor="commissionRate" className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
                    <input
                        type="number"
                        id="commissionRate"
                        name="commissionRate"
                        value={settings.commissionRate}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        required
                    />
                </div>

                {/* Default Currency */}
                <div>
                    <label htmlFor="defaultCurrency" className="block text-sm font-medium text-gray-700">Default Currency</label>
                    <select
                        id="defaultCurrency"
                        name="defaultCurrency"
                        value={settings.defaultCurrency}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border bg-white"
                        required
                    >
                        <option value="USD">USD (US Dollar)</option>
                        <option value="EUR">EUR (Euro)</option>
                        <option value="GBP">GBP (British Pound)</option>
                    </select>
                </div>

                {/* Support Email */}
                <div>
                    <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700">Support Email</label>
                    <input
                        type="email"
                        id="supportEmail"
                        name="supportEmail"
                        value={settings.supportEmail}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        required
                    />
                </div>

                {/* Email Notifications Toggle */}
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="emailEnabled"
                            name="emailEnabled"
                            type="checkbox"
                            checked={settings.emailEnabled}
                            onChange={handleChange}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="emailEnabled" className="font-medium text-gray-700">Enable System Emails</label>
                        <p className="text-gray-500">Automatically send booking confirmations and alerts.</p>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-5">
                    <button
                        type="submit"
                        className="w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                    >
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
};


// --- 5. Main Admin App (Router and Layout) ---

const Sidebar = ({ currentPage, setCurrentPage }) => {
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, component: 'Dashboard' },
        { name: 'Hotels', icon: Hotel, component: 'AllHotelsPage' },
        { name: 'Users', icon: Users, component: 'UserManagementTable' },
        { name: 'Settings', icon: Settings, component: 'GlobalSettingsForm' },
    ];

    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col h-screen fixed md:static z-10">
            <div className="p-6 i text-2xl font-bold  tracking-wider border-b border-gray-800 text-blue-400 flex items-center">
                <span className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                    <LayoutDashboard className="w-5 h-5" />
                </span>
                HBMS Admin
            </div>
            <nav className="grow p-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.component;
                    return (
                        <button
                            key={item.name}
                            onClick={() => setCurrentPage(item.component)}
                            className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-blue-600 text-white shadow-lg transform -translate-x-1'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white hover:translate-x-1'
                                }`}
                        >
                            <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                            <span className="font-medium">{item.name}</span>
                            {isActive && (
                                <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
                            )}
                        </button>
                    );
                })}
            </nav>
            <div className="p-4 text-xs text-gray-500 border-t border-gray-800">
                <div>Version 1.0.0</div>
                <div className="text-gray-600">App ID: {__app_id}</div>
            </div>
        </div>
    );
};

const renderPage = (pageName) => {
    switch (pageName) {
        case 'AllHotelsPage':
            return <AllHotelsPage />;
        case 'UserManagementTable':
            return <UserManagementTable />;
        case 'GlobalSettingsForm':
            return <GlobalSettingsForm />;
        case 'Dashboard':
        default:
            return <Dashboard />;
    }
};

const App = () => {
    const [currentPage, setCurrentPage] = useState('Dashboard');
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userId, setUserId] = useState('admin@luxestay.com');
    const [notifications] = useState([
        { id: 1, message: 'New booking received', time: '2 min ago', read: false },
        { id: 2, message: 'System update available', time: '1 hour ago', read: true },
    ]);

    // Mock Firestore/Auth Setup
    useEffect(() => {
        console.log("Firebase Init/Auth Check started...");
        try {
            setTimeout(() => {
                setUserId(mockAuth.currentUser?.uid);
                setIsAuthReady(true);
            }, 50);
        } catch (error) {
            console.error("Mock Firebase Init Error:", error);
            setIsAuthReady(true);
        }
    }, []);

    if (!isAuthReady) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-600 to-blue-800">
                <div className="text-center p-8 bg-white rounded-xl shadow-2xl">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-2xl font-bold text-gray-800">Loading Dashboard</h2>
                    <p className="text-gray-600 mt-2">Please wait while we prepare your admin panel</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* Mobile menu button */}
            <div className="fixed top-4 left-4 z-50 md:hidden">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-md bg-gray-900 text-white shadow-lg md:hidden"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isSidebarOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </div>

            <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
                onClick={() => setIsSidebarOpen(false)}>
            </div>

            <div className={`w-64 bg-gray-900 text-white flex flex-col h-screen fixed md:static z-30 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-6 text-2xl font-bold tracking-wider border-b border-gray-800 text-blue-400 flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                            <LayoutDashboard className="w-5 h-5" />
                        </span>
                        HBMS Admin
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden text-gray-400 hover:text-white"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="grow p-4 space-y-1">
                    {[
                        { name: 'Dashboard', icon: LayoutDashboard, component: 'Dashboard' },
                        { name: 'Hotels', icon: Hotel, component: 'AllHotelsPage' },
                        { name: 'Users', icon: Users, component: 'UserManagementTable' },
                        { name: 'Settings', icon: Settings, component: 'GlobalSettingsForm' },
                    ].map((item) => {
                        const Icon = item.icon;
                        const isActive = currentPage === item.component;
                        return (
                            <button
                                key={item.name}
                                onClick={() => {
                                    setCurrentPage(item.component);
                                    setIsSidebarOpen(false);
                                }}
                                className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                                <span className="font-medium">{item.name}</span>
                            </button>
                        );
                    })}
                </nav>
                <div className="p-4 text-xs text-gray-500 border-t border-gray-800">
                    <div>Version 1.0.0</div>
                    <div className="text-gray-600">App ID: {__app_id}</div>
                </div>
            </div>

            <div className="flex-1 transition-all duration-300 w-full">
                {/* Top Navigation */}
                <header className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="flex items-center justify-between p-4">
                        <h1 className="text-2xl font-bold text-gray-800 ml-4 md:ml-0">
                            {currentPage.replace(/([A-Z])/g, ' $1').trim()}
                        </h1>

                        <div className="flex items-center space-x-4">
                            {/* Notifications */}
                            <div className="relative">
                                <button className="p-2 text-gray-500 hover:text-gray-700 relative">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    {notifications.some(n => !n.read) && (
                                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                    )}
                                </button>
                            </div>

                            {/* User Profile */}
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                    {userId ? userId.charAt(0).toUpperCase() : 'A'}
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-medium text-gray-800">Admin User</p>
                                    <p className="text-xs text-gray-500">{userId}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="p-4 md:p-6">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        {renderPage(currentPage)}
                    </div>
                </main>
            </div>
        </div>
    )
};

export default App;