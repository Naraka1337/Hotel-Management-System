// src/Features/Public/Layouts/PublicLayout.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Outlet } from 'react-router-dom';
import { Home, Hotel, User, LogIn, Bell, Search, Menu, X } from 'lucide-react';
import { navbar, slideDown, footer } from '../../../utils/animations';
import { useAuth } from '../../../context/AuthContext';
import DarkModeToggle from '../../../components/DarkModeToggle';

const PublicLayout = () => {
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <motion.header className="bg-white shadow-md sticky top-0 z-50 dark:bg-gray-900 dark:border-b dark:border-gray-800 transition-colors duration-300" {...navbar}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-2">
                                <div className="bg-linear-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                                    <Hotel className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Luxe Stay
                                </span>
                            </Link>
                        </div>
                        <nav className="hidden md:flex space-x-1">
                            <Link to="/" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-400">
                                Home
                            </Link>
                            <Link to="/hotels" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-400">
                                Hotels
                            </Link>
                            <Link to="/about" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-400">
                                About
                            </Link>
                            <Link to="/contact" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-400">
                                Contact
                            </Link>
                        </nav>
                        <div className="flex items-center space-x-3">
                            <DarkModeToggle />
                            <button className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 hidden md:block transition-all duration-300">
                                <Search className="h-5 w-5" />
                            </button>

                            {user ? (
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg transition-all">
                                        {user.profile_picture ? (
                                            <img
                                                src={user.profile_picture}
                                                alt="Profile"
                                                className="h-8 w-8 rounded-full object-cover border-2 border-blue-100"
                                            />
                                        ) : (
                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                <User className="h-5 w-5" />
                                            </div>
                                        )}
                                        <span className="font-medium hidden md:block">{user.full_name}</span>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50 border border-gray-100">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <Link to="/bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            My Bookings
                                        </Link>
                                        {user.role === 'admin' && (
                                            <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hidden md:block transition-all duration-300">
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 hidden md:block transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                            >
                                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="md:hidden bg-white border-t border-gray-200 shadow-lg dark:bg-gray-900 dark:border-gray-800"
                            {...slideDown}
                        >
                            <div className="px-4 pt-2 pb-3 space-y-1">
                                <div className="flex justify-end px-4 pt-2">
                                    <DarkModeToggle />
                                </div>
                                <Link
                                    to="/"
                                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/hotels"
                                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Hotels
                                </Link>
                                <Link
                                    to="/about"
                                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    About
                                </Link>

                                <div className="border-t border-gray-200 pt-3 mt-3 dark:border-gray-800">
                                    {user ? (
                                        <>
                                            <div className="px-4 py-2">
                                                <div className="flex items-center space-x-3">
                                                    {user.profile_picture ? (
                                                        <img src={user.profile_picture} alt="Profile" className="h-10 w-10 rounded-full object-cover" />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-gray-800 dark:text-blue-400">
                                                            <User className="h-6 w-6" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">{user.full_name}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link
                                                to="/bookings"
                                                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                My Bookings
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setMobileMenuOpen(false);
                                                }}
                                                className="block w-full text-left px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg dark:hover:bg-red-900/20"
                                            >
                                                Sign Out
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 dark:text-gray-200 dark:hover:bg-gray-800"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to="/register"
                                                className="block px-4 py-3 text-base font-semibold bg-linear-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-300 mt-2"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Main Content */}
            <main className="mb-4 mt-4 grow">
                <Outlet />
            </main>

            {/* Footer */}
            <motion.footer className="bg-gray-800 text-white dark:bg-gray-900 transition-colors duration-300" {...footer}>
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-white">HotelBooking</h3>
                            <p className="text-gray-300 text-sm dark:text-gray-400">
                                Find and book the best hotels around the world. Experience luxury and comfort with our handpicked selection.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><Link to="/about" className="text-gray-300 hover:text-white text-sm dark:text-gray-400 dark:hover:text-white">About Us</Link></li>
                                <li><Link to="/contact" className="text-gray-300 hover:text-white text-sm dark:text-gray-400 dark:hover:text-white">Contact Us</Link></li>
                                <li><Link to="/faq" className="text-gray-300 hover:text-white text-sm dark:text-gray-400 dark:hover:text-white">FAQs</Link></li>
                                <li><Link to="/terms" className="text-gray-300 hover:text-white text-sm dark:text-gray-400 dark:hover:text-white">Terms of Service</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">Support</h4>
                            <ul className="space-y-2">
                                <li><Link to="/help" className="text-gray-300 hover:text-white text-sm dark:text-gray-400 dark:hover:text-white">Help Center</Link></li>
                                <li><Link to="/privacy" className="text-gray-300 hover:text-white text-sm dark:text-gray-400 dark:hover:text-white">Privacy Policy</Link></li>
                                <li><Link to="/cookies" className="text-gray-300 hover:text-white text-sm dark:text-gray-400 dark:hover:text-white">Cookie Policy</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">Contact Us</h4>
                            <address className="not-italic text-gray-300 text-sm dark:text-gray-400">
                                <p>123 Hotel Street</p>
                                <p>New York, NY 10001</p>
                                <p>Email: info@hotelbooking.com</p>
                                <p>Phone: (123) 456-7890</p>
                            </address>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-700 dark:border-gray-800">
                        <p className="text-center text-gray-400 text-sm">
                            &copy; {new Date().getFullYear()} HotelBooking. All rights reserved.
                        </p>
                    </div>
                </div>
            </motion.footer>
        </div>
    );
};

export default PublicLayout;
