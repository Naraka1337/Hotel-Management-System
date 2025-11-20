// src/Features/Manager/pages/ManagerDashboard.jsx
import { Hotel, Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'Total Bookings',
    value: '1,234',
    change: '+12% from last month',
    icon: Calendar,
    color: 'bg-blue-500',
  },
  {
    title: 'Available Rooms',
    value: '24',
    change: '5 rooms available',
    icon: Hotel,
    color: 'bg-green-500',
  },
  {
    title: 'Monthly Revenue',
    value: '$24,580',
    change: '+8.2% from last month',
    icon: DollarSign,
    color: 'bg-purple-500',
  },
  {
    title: 'Occupancy Rate',
    value: '78%',
    change: '+5% from last month',
    icon: TrendingUp,
    color: 'bg-yellow-500',
  },
];

const recentBookings = [
  {
    id: 1,
    guest: 'John Doe',
    room: 'Deluxe Suite',
    checkIn: '2023-11-15',
    checkOut: '2023-11-18',
    status: 'Confirmed',
  },
  // Add more sample data...
];

const ManagerDashboard = () => {
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