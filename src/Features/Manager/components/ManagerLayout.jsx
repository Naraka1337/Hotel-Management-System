// src/Features/Manager/components/ManagerLayout.jsx
import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Hotel, Users, DollarSign, Settings, Sliders, LogOut } from 'lucide-react';

const ManagerLayout = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/manager' },
        { name: 'Rooms', icon: Hotel, path: '/manager/rooms' },
        { name: 'Bookings', icon: Users, path: '/manager/bookings' },
        { name: 'Revenue', icon: DollarSign, path: '/manager/revenue' },
        { name: 'Revenue Settings', icon: Sliders, path: '/manager/revenue-settings' },
        { name: 'Settings', icon: Settings, path: '/manager/settings' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* Mobile menu button */}
            <div className="fixed top-4 left-4 z-50 md:hidden">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-md bg-blue-600 text-white shadow-lg"
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

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`w-64 bg-gray-800 text-white flex flex-col h-screen fixed md:static z-30 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-6 text-xl font-bold tracking-wider border-b border-gray-700 text-white flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                            <LayoutDashboard className="w-5 h-5" />
                        </span>
                        Manager
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden text-gray-400 hover:text-white"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="grow p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                                <span className="font-medium">{item.name}</span>
                                {isActive && (
                                    <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button className="flex items-center w-full p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                        <LogOut className="w-5 h-5 mr-3 text-red-400" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full">
                {/* Top Navigation */}
                <header className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="flex items-center justify-between p-4">
                        <h1 className="text-xl font-semibold text-gray-800 ml-4 md:ml-0">
                            {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
                        </h1>
                        {/* User menu would go here */}
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ManagerLayout;