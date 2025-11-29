// src/Features/Manager/pages/ManagerDashboard.jsx
import { Hotel, Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';

import React, { useState, useEffect } from 'react';
import api from '../../../api/auth';

const ManagerDashboard = () => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/api/manager/dashboard');
        setStatsData(response.data);
      } catch (error) {
        console.error("Error fetching manager stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    {
      title: 'Total Bookings',
      value: statsData ? statsData.total_bookings : '...',
      change: 'Lifetime bookings',
      icon: Calendar,
      color: 'bg-blue-500',
    },
    {
      title: 'Available Rooms',
      value: statsData ? statsData.total_rooms : '...', // Using total rooms for now as "Available" logic is complex
      change: 'Total rooms managed',
      icon: Hotel,
      color: 'bg-green-500',
    },
    {
      title: 'Revenue',
      value: statsData ? `$${statsData.revenue.toLocaleString()}` : '...',
      change: 'Total revenue',
      icon: DollarSign,
      color: 'bg-purple-500',
    },
    {
      title: 'Occupancy Rate',
      value: statsData ? statsData.occupancy : '...',
      change: 'Current active bookings',
      icon: TrendingUp,
      color: 'bg-yellow-500',
    },
  ];

  const recentBookings = statsData ? statsData.recent_bookings : [];
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
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View All
          </button>
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
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {booking.guest}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {booking.room}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {booking.checkIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {booking.checkOut}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
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
  );
};

export default ManagerDashboard;