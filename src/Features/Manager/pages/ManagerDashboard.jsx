// src/Features/Manager/pages/ManagerDashboard.jsx
import React from 'react';
import { Hotel, Users, Calendar, DollarSign, TrendingUp, Loader } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getManagerDashboard } from '../../../api/manager';

const ManagerDashboard = () => {
    const { data: dashboardData, isLoading, error } = useQuery({
        queryKey: ['managerDashboard'],
        queryFn: getManagerDashboard,
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

    const { stats: apiStats, recent_bookings: apiRecentBookings } = dashboardData || {};

    const stats = [
        {
            title: 'Total Bookings',
            value: apiStats?.total_bookings || 0,
            change: 'Lifetime',
            icon: Calendar,
            color: 'bg-blue-500',
        },
        {
            title: 'Available Rooms',
            value: apiStats?.available_rooms || 0,
            change: 'Currently available',
            icon: Hotel,
            color: 'bg-green-500',
        },
        {
            title: 'Monthly Revenue',
            value: '$' + (apiStats?.monthly_revenue || 0),
            change: 'This Month',
            icon: DollarSign,
            color: 'bg-purple-500',
        },
        {
            title: 'Occupancy Rate',
            value: (apiStats?.occupancy_rate || 0) + '%',
            change: 'Current',
            icon: TrendingUp,
            color: 'bg-yellow-500',
        },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm p-6 flex items-center"
                        >
                            <div
                                className={`p-3 rounded-lg ${stat.color} text-white mr-4`}
                            >
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                                <p className="text-xl font-bold">{stat.value}</p>
                                <p className="text-xs text-gray-400">{stat.change}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Recent Bookings</h2>
                    {/* <button className="text-sm text-blue-600 hover:text-blue-800">
                        View All
                    </button> */}
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Guest
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Room
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Check In
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Check Out
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {apiRecentBookings && apiRecentBookings.length > 0 ? (
                                apiRecentBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">
                                                {booking.user_email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {booking.room_number}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {new Date(booking.check_in_date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {new Date(booking.check_out_date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                    booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        No recent bookings found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;