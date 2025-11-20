import React, { useState, useEffect } from 'react';
import { Hotel, Users, Calendar, DollarSign, Settings, LayoutDashboard, Plus, Trash2, Edit } from 'lucide-react';

// --- Global Constants ---
const __app_id = typeof window !== 'undefined' && typeof window.__app_id !== 'undefined' ? window.__app_id : 'default-app-id';


// Mock Firebase Imports (Required by instructions, even if logic is simplified)
const mockAuth = { currentUser: { uid: 'mock-admin-user-123' } };
const mockDb = { }; 

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

// --- 1. Dashboard Component (Based on User's Code) ---

const Dashboard = () => {
  // Sample data
  const stats = [
    { 
      title: 'Total Hotels', 
      value: '12', 
      icon: <Hotel className="w-10 h-10 opacity-80" />,
      gradient: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-100'
    },
    { 
      title: 'Total Bookings', 
      value: '284', 
      icon: <Calendar className="w-10 h-10 opacity-80" />,
      gradient: 'from-green-500 to-green-600',
      textColor: 'text-green-100'
    },
    { 
      title: 'Total Revenue', 
      value: '$24,580', 
      icon: <DollarSign className="w-10 h-10 opacity-80" />,
      gradient: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-100'
    },
    { 
      title: 'Active Users', 
      value: '1,243', 
      icon: <Users className="w-10 h-10 opacity-80" />,
      gradient: 'from-amber-500 to-amber-600',
      textColor: 'text-amber-100'
    }
  ];

  const recentBookings = [
    { id: 1, hotel: 'Grand Plaza Hotel', guest: 'John Doe', checkIn: '2025-10-20', checkOut: '2025-10-25', amount: 1250, status: 'Confirmed' },
    { id: 2, hotel: 'Seaside Resort', guest: 'Jane Smith', checkIn: '2025-10-18', checkOut: '2025-10-22', amount: 720, status: 'Pending' },
    { id: 3, hotel: 'City Inn', guest: 'Bob Johnson', checkIn: '2025-10-15', checkOut: '2025-10-16', amount: 180, status: 'Confirmed' },
  ];

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
    const [hotels, setHotels] = useState([
        { id: 1, name: 'Grand Plaza Hotel', city: 'New York', rooms: 150, rating: 4.5, managerId: 'mgr_001', status: 'Active' },
        { id: 2, name: 'Seaside Resort', city: 'Miami', rooms: 90, rating: 4.8, managerId: 'mgr_002', status: 'Active' },
        { id: 3, name: 'Mountain View Lodge', city: 'Denver', rooms: 45, rating: 4.2, managerId: 'mgr_003', status: 'Inactive' },
    ]);

    const handleAction = (action, hotel) => {
        console.log(`${action} hotel: ${hotel.name}`);
        // In a real app, this would be a Firebase call
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
};

// --- 3. User Management Table ---

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
        <div className="p-6 ">
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
                            className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
                                isActive 
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
                                className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
                                    isActive 
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