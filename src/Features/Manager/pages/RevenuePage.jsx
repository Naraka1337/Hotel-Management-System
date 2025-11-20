// src/Features/Manager/pages/RevenuePage.jsx
import { BarChart, DollarSign, TrendingUp, Users, CreditCard } from 'lucide-react';

const RevenuePage = () => {
  const stats = [
    {
      title: 'Total Revenue',
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
      color: 'bg-blue-500',
    },
    {
      title: 'Total Bookings',
      value: '156',
      change: '+12% from last month',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Average Daily Rate',
      value: '$158',
      change: '+3.5% from last month',
      icon: CreditCard,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Revenue Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Revenue Overview</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">
              Monthly
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
              Weekly
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
              Daily
            </button>
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Revenue chart will be displayed here</p>
        </div>
      </div>

      {/* Top Performing Rooms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Top Performing Rooms</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Deluxe Suite #{100 + item}</p>
                  <p className="text-sm text-gray-500">${150 + item * 20}/night</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(150 + item * 20) * 5}</p>
                  <p className="text-sm text-green-600">+{5 + item}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue by Room Type</h3>
          <div className="space-y-4">
            {[
              { type: 'Deluxe Suite', revenue: 12500, percentage: 45 },
              { type: 'Executive Room', revenue: 8560, percentage: 30 },
              { type: 'Family Suite', revenue: 4560, percentage: 15 },
              { type: 'Standard Room', revenue: 2960, percentage: 10 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.type}</span>
                  <span className="font-medium">${item.revenue.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;