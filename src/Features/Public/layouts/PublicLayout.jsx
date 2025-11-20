// src/Features/Public/Layouts/PublicLayout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Home, Hotel, User, LogIn, Bell, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

const PublicLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                Luxe Stay
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/HotelsPage" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Hotels
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hidden md:block">
                <Search className="h-5 w-5" />
              </button>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium hidden md:block">
                login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hidden md:block"
              >
                Sign Up
              </Link>
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                Home
              </Link>
              <Link to="/HotelsPage" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                Hotels
              </Link>
              <Link to="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                About
              </Link>
              <Link to="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                Contact
              </Link>
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="shrink-0">
                    <button className="p-2 rounded-full text-gray-500 hover:text-gray-700">
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                    Login
                  </Link>
                  <Link to="/register" className="block px-3 py-2 text-base font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="mb-4 mt-4  grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">HotelBooking</h3>
              <p className="text-gray-300 text-sm">
                Find and book the best hotels around the world. Experience luxury and comfort with our handpicked selection.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-300 hover:text-white text-sm">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white text-sm">Contact Us</Link></li>
                <li><Link to="/faq" className="text-gray-300 hover:text-white text-sm">FAQs</Link></li>
                <li><Link to="/terms" className="text-gray-300 hover:text-white text-sm">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-300 hover:text-white text-sm">Help Center</Link></li>
                <li><Link to="/privacy" className="text-gray-300 hover:text-white text-sm">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-gray-300 hover:text-white text-sm">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact Us</h4>
              <address className="not-italic text-gray-300 text-sm">
                <p>123 Hotel Street</p>
                <p>New York, NY 10001</p>
                <p>Email: info@hotelbooking.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-center text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} HotelBooking. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>

  );


};

export default PublicLayout;