import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Search, SlidersHorizontal, Loader } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getHotels } from '../../../api/public';
import { fadeIn, staggerContainer, staggerItem } from '../../../utils/animations';

// Fallback image if API doesn't provide one
import grandPlazaImage from '../../../assets/grand_plaza_hotel.png';

function HotelsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearchQuery = searchParams.get('search') || '';

  const [searchLocation, setSearchLocation] = useState(initialSearchQuery);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  // Fetch hotels using React Query
  const { data: hotels = [], isLoading, error } = useQuery({
    queryKey: ['hotels', initialSearchQuery],
    queryFn: () => getHotels(initialSearchQuery ? { location: initialSearchQuery } : {}),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error loading hotels: {error.message}
      </div>
    );
  }

  return (
    <motion.div className="min-h-screen bg-linear-to-b from-gray-50 to-white" {...fadeIn}>
      {/* Search Section */}
      <section className="relative bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl opacity-95">
              Discover amazing hotels at the best prices
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="Where are you going?"
                    className="w-full pl-10 p-3 border-2 border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
                <input
                  type="date"
                  min={today}
                  value={checkInDate}
                  onChange={(e) => {
                    setCheckInDate(e.target.value);
                    if (checkOutDate && new Date(e.target.value) >= new Date(checkOutDate)) {
                      setCheckOutDate('');
                    }
                  }}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
                <input
                  type="date"
                  min={checkInDate || today}
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  disabled={!checkInDate}
                  className={`w-full p-3 border-2 border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:outline-none transition-colors ${!checkInDate ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Guests</label>
                <select className="w-full p-3 border-2 border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:outline-none transition-colors">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3+ Guests</option>
                </select>
              </div>
            </div>

            {dateError && (
              <div className="mt-4 text-red-500 text-sm">
                {dateError}
              </div>
            )}

            <button className="mt-6 w-full bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center">
              <Search className="w-5 h-5 mr-2" />
              Search Hotels
            </button>
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Available Hotels</h2>
              <p className="text-gray-600 mt-1">{hotels.length} properties found</p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="font-medium">Filters</span>
            </button>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {hotels.map((hotel) => (
              <motion.div
                key={hotel.id}
                variants={staggerItem}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                whileHover={{ y: -8 }}
              >
                {/* Hotel Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={hotel.image_url || grandPlazaImage}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.target.src = grandPlazaImage; }}
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-1 shadow-lg">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-gray-900">{hotel.rating || 'New'}</span>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Hotel Details */}
                <div className="p-6">
                  <div className="mb-3">
                    <Link to={`/hotels/${hotel.id}`}>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {hotel.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">{hotel.description}</p>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                      <span className="text-sm">{hotel.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${hotel.rooms && hotel.rooms.length > 0 ? Math.min(...hotel.rooms.map(r => r.price)) : 'N/A'}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">/night</span>
                    </div>
                    <Link
                      to={`/hotels/${hotel.id}`}
                      className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

export default HotelsPage;