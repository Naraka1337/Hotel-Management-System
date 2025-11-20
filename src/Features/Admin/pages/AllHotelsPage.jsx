import React from 'react'

const AllHotelsPage = () => {
const [hotels, setHotels] = useState([
        { id: 1, name: 'Grand Plaza Hotel', city: 'New York', rooms: 150, rating: 4.5, managerId: 'mgr_001', status: 'Active' },
        { id: 2, name: 'Seaside Resort', city: 'Miami', rooms: 90, rating: 4.8, managerId: 'mgr_002', status: 'Active' },
        { id: 3, name: 'Mountain View Lodge', city: 'Denver', rooms: 45, rating: 4.2, managerId: 'mgr_003', status: 'Inactive' },
    ]);

    const handleAction = (action, hotel) => {
        console.log(`${action} hotel: ${hotel.name}`);
        // In a real app, this would be a Firebase call
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Inactive':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-800">Hotel Management</h1>
            
            <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">Total Hotels: {hotels.length}</p>
                <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition">
                    <Plus className="w-5 h-5 mr-1" /> Add New Hotel
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hotel Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">City</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rooms</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rating</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {hotels.map((hotel) => (
                                <tr key={hotel.id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hotel.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.city}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.rooms}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.rating} / 5</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(hotel.status)}`}>
                                            {hotel.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center space-x-2">
                                        <button onClick={() => handleAction('Edit', hotel)} className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleAction('Delete', hotel)} className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AllHotelsPage