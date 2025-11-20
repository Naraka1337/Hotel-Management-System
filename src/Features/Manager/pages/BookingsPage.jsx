// src/Features/Manager/pages/BookingsPage.jsx
import { Calendar, Clock, Search, Filter, Download } from 'lucide-react';

const BookingsPage = () => {
  const bookings = [
    {
      id: 1,
      guest: 'John Doe',
      room: 'Deluxe Suite',
      checkIn: '2023-11-15',
      checkOut: '2023-11-18',
      status: 'Confirmed',
      total: '$1,200',
    },
    // Add more sample data...
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            New Booking
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search bookings..."
            />
          </div>
          <button className="text-sm text-gray-600 hover:text-blue-600 flex items-center">
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check In/Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{booking.guest}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {booking.room}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{booking.checkIn}</div>
                    <div className="text-xs text-gray-400 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {booking.checkOut}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {booking.total}
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

export default BookingsPage;