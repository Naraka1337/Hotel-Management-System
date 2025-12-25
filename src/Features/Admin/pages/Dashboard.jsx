import React, { useState } from 'react';
import { Hotel, Users, Calendar, DollarSign, Settings, LayoutDashboard, Bed, Loader } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import DarkModeToggle from '../../../components/DarkModeToggle';
import { getAdminDashboard } from '../../../api/admin';
import AllRoomsPage from './AllRoomsPage';
import AllHotelsPage from './AllHotelsPage';
import UserManagementTable from '../UserManagementTable';

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

// --- 1. Dashboard Component (Integrated with API) ---
const DashboardHome = () => {
    const { data: dashboardData, isLoading, error } = useQuery({
        queryKey: ['adminDashboard'],
        queryFn: getAdminDashboard,
    });

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
                Error loading dashboard: {error.message}
            </div>
        );
    }

    const { recent_bookings: apiRecentBookings = [], ...apiStats } = dashboardData || {};

    // Map API stats to UI format
    const stats = [
        {
            title: 'Total Hotels',
            value: apiStats.total_hotels || 0,
            icon: <Hotel className="w-10 h-10 opacity-80" />,
            gradient: 'from-blue-500 to-blue-600',
            textColor: 'text-blue-100'
        },
        {
            title: 'Total Bookings',
            value: apiStats.total_bookings || 0,
            icon: <Calendar className="w-10 h-10 opacity-80" />,
            gradient: 'from-green-500 to-green-600',
            textColor: 'text-green-100'
        },
        {
            title: 'Total Revenue',
            value: `$${apiStats.revenue || 0}`,
            icon: <DollarSign className="w-10 h-10 opacity-80" />,
            gradient: 'from-purple-500 to-purple-600',
            textColor: 'text-purple-100'
        },
        {
            title: 'Active Users',
            value: apiStats.active_users || 0,
            icon: <Users className="w-10 h-10 opacity-80" />,
            gradient: 'from-amber-500 to-amber-600',
            textColor: 'text-amber-100'
        }
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-800">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className={`bg-linear-to-br ${stat.gradient} text-white p-6 rounded-xl shadow-xl transition transform hover:scale-[1.02] cursor-pointer`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`${stat.textColor} text-sm font-medium uppercase opacity-90`}>{stat.title}</p>
                                <p className="text-4xl font-bold mt-1 text-white">{stat.value}</p>
                            </div>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center dark:text-white">
                        <Calendar className="w-5 h-5 mr-2 text-blue-500" /> Recent Bookings
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300">Room</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300">Check-in</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300">Check-out</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100 dark:bg-gray-800 dark:divide-gray-700">
                                {apiRecentBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50 transition duration-150 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">#{booking.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{booking.guest}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{booking.hotel || booking.room}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{booking.checkIn}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{booking.checkOut}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold dark:text-white">${booking.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
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
        // In a real app, this would call an API
        alert('Settings Saved Successfully!');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">Global System Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Configure core system parameters and behaviors.</p>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl space-y-6 max-w-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                {/* Commission Rate */}
                <div>
                    <label htmlFor="commissionRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Commission Rate (%)</label>
                    <input
                        type="number"
                        id="commissionRate"
                        name="commissionRate"
                        value={settings.commissionRate}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>

                {/* Default Currency */}
                <div>
                    <label htmlFor="defaultCurrency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Currency</label>
                    <select
                        id="defaultCurrency"
                        name="defaultCurrency"
                        value={settings.defaultCurrency}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    >
                        <option value="USD">USD (US Dollar)</option>
                        <option value="EUR">EUR (Euro)</option>
                        <option value="GBP">GBP (British Pound)</option>
                    </select>
                </div>

                {/* Support Email */}
                <div>
                    <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Support Email</label>
                    <input
                        type="email"
                        id="supportEmail"
                        name="supportEmail"
                        value={settings.supportEmail}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="emailEnabled" className="font-medium text-gray-700 dark:text-gray-300">Enable System Emails</label>
                        <p className="text-gray-500 dark:text-gray-400">Automatically send booking confirmations and alerts.</p>
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

const renderPage = (pageName) => {
    switch (pageName) {
        case 'AllHotelsPage':
            return <AllHotelsPage />;
        case 'AllRoomsPage':
            return <AllRoomsPage />;
        case 'UserManagementTable':
            return <UserManagementTable />;
        case 'GlobalSettingsForm':
            return <GlobalSettingsForm />;
        case 'Dashboard':
        default:
            return <DashboardHome />;
    }
};

const AdminDashboard = () => {
    const [currentPage, setCurrentPage] = useState('Dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [notifications] = useState([
        { id: 1, message: 'New booking received', time: '2 min ago', read: false },
        { id: 2, message: 'System update available', time: '1 hour ago', read: true },
    ]);

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

            <div className={`w-64 bg-gray-900 text-white flex flex-col min-h-screen shrink-0 fixed md:sticky md:top-0 z-30 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
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
                        { name: 'Rooms', icon: Bed, component: 'AllRoomsPage' },
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
                </div>
            </div>

            <div className="flex-1 transition-all duration-300 w-full overflow-x-hidden dark:bg-gray-900">
                {/* Top Navigation */}
                <header className="bg-white shadow-sm sticky top-0 z-10 dark:bg-gray-900 dark:border-b dark:border-gray-800 dark:shadow-none transition-colors duration-300">
                    <div className="flex items-center justify-between p-4">
                        <h1 className="text-2xl font-bold text-gray-800 ml-4 md:ml-0 dark:text-white">
                            {currentPage.replace(/([A-Z])/g, ' $1').trim()}
                        </h1>

                        <div className="flex items-center space-x-4">
                            <div className="relative z-50">
                                <DarkModeToggle />
                            </div>
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
                                    A
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-medium text-gray-800">Admin User</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="p-4 md:p-6 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
                    <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800 dark:text-white transition-colors duration-300">
                        {renderPage(currentPage)}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;