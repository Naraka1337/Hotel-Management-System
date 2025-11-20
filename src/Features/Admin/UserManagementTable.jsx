import React from 'react'

const UserManagementTable = () => {
  
    const [users, setUsers] = useState([
        { id: 'user_001', name: 'John Doe', role: 'Customer', email: 'john@example.com', status: 'Active' },
        { id: 'user_002', name: 'Hotel Manager A', role: 'Manager', email: 'mgr_a@hotel.com', status: 'Active' },
        { id: 'user_003', name: 'Jane Smith', role: 'Customer', email: 'jane@example.com', status: 'Banned' },
        { id: 'user_004', name: 'Admin User', role: 'Admin', email: 'admin@system.com', status: 'Active' },
    ]);

    const handleAction = (action, user) => {
        console.log(`${action} user: ${user.name}`);
        // In a real app, this would be a Firebase call
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-800">User Management</h1>
            
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center space-x-2">
                                        <button onClick={() => handleAction('Edit', user)} className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleAction('Ban', user)} className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition">
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

export default UserManagementTable