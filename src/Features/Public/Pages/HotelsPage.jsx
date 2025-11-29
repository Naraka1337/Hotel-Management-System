import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, CreditCard, Search, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import grandPlazaImage from '../../../assets/grand_plaza_hotel.png';
import seasideResortImage from '../../../assets/seaside_resort.png';
import mountainLodgeImage from '../../../assets/mountain_view_lodge.png';
import { fadeIn, slideUp, staggerContainer, staggerItem } from '../../../utils/animations';

function HotelsPage() {


  const [userRole, setUserRole] = useState('user');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingStep, setBookingStep] = useState('search');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  // Updated hotels data with real images
  const hotels = [
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'New York, USA',
      price: 250,
      rating: 4.8,
      image: grandPlazaImage,
      rooms: 15,
      description: 'Luxury in the heart of Manhattan',
      amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant']
    },
    {
      id: 2,
      name: 'Seaside Resort',
      location: 'Miami, USA',
      price: 180,
      rating: 4.6,
      image: seasideResortImage,
      rooms: 22,
      description: 'Beachfront paradise awaits',
      amenities: ['Beach Access', 'Pool', 'Bar', 'WiFi']
    },
    {
      id: 3,
      name: 'Mountain View Lodge',
      location: 'Aspen, USA',
      price: 320,
      rating: 4.9,
      image: mountainLodgeImage,
      rooms: 8,
      description: 'Alpine luxury and adventure',
      amenities: ['Ski Access', 'Fireplace', 'Spa', 'Restaurant']
    },
    {
      id: 4,
      name: 'City Center Inn',
      location: 'Chicago, USA',
      price: 150,
      rating: 4.5,
      image: grandPlazaImage,
      rooms: 30,
      description: 'Modern comfort in downtown',
      amenities: ['WiFi', 'Gym', 'Business Center', 'Parking']
    },
  ];

  //
  // but we'll keep it here for completeness.
  const bookings = [
    { id: 1, hotel: 'Grand Plaza Hotel', guest: 'John Doe', checkIn: '2025-10-20', checkOut: '2025-10-25', amount: 1250, status: 'Confirmed' },
    { id: 2, hotel: 'Seaside Resort', guest: 'Jane Smith', checkIn: '2025-10-18', checkOut: '2025-10-22', amount: 720, status: 'Pending' },
    { id: 3, hotel: 'Mountain View Lodge', guest: 'Bob Johnson', checkIn: '2025-11-01', checkOut: '2025-11-05', amount: 1600, status: 'Confirmed' },
  ];


  return (
    <motion.div className="min-h-screen bg-linear-to-b from-gray-50 to-white" {...fadeIn}>
      {bookingStep === 'search' && (
        <>
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
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-1 shadow-lg">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-bold text-gray-900">{hotel.rating}</span>
                      </div>
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Hotel Details */}
                    <div className="p-6">
                      <div className="mb-3">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {hotel.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">{hotel.description}</p>
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                          <span className="text-sm">{hotel.location}</span>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                            <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <span className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ${hotel.price}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">/night</span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedHotel(hotel);
                            setBookingStep('book');
                          }}
                          className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </>
      )}

      {bookingStep === 'book' && selectedHotel && (
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setBookingStep('search')} className="mb-4 text-blue-600 hover:text-blue-800">
            ← Back to Search
          </button>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Complete Your Booking</h2>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-lg">{selectedHotel.name}</h3>
              <p className="text-gray-600">{selectedHotel.location}</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">${selectedHotel.price}/night</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input type="text" className="w-full p-3 border rounded-lg" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input type="email" className="w-full p-3 border rounded-lg" placeholder="john@example.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Check-in</label>
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
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Check-out</label>
                  <input
                    type="date"
                    min={checkInDate || today}
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    disabled={!checkInDate}
                    className={`w-full p-3 border rounded-lg ${!checkInDate ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                </div>
                {dateError && (
                  <div className="col-span-2 text-red-500 text-sm mt-1">
                    {dateError}
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  if (!checkInDate || !checkOutDate) {
                    setDateError('Please select both check-in and check-out dates');
                    return;
                  }
                  if (new Date(checkInDate) >= new Date(checkOutDate)) {
                    setDateError('Check-out date must be after check-in date');
                    return;
                  }
                  setDateError('');
                  setBookingStep('payment');
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!checkInDate || !checkOutDate}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {bookingStep === 'payment' && (
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setBookingStep('book')} className="mb-4 text-blue-600 hover:text-blue-800">
            ← Back
          </button>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <CreditCard className="mr-2" /> Payment Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Card Number</label>
                <input type="text" className="w-full p-3 border rounded-lg" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Expiry Date</label>
                  <input type="text" className="w-full p-3 border rounded-lg" placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">CVV</label>
                  <input type="text" className="w-full p-3 border rounded-lg" placeholder="123" />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mt-6">
                <div className="flex justify-between mb-2">
                  <span>5 nights</span>
                  {/* NOTE: You should calculate nights based on check-in/out dates, but using 5 for demo */}
                  <span>${selectedHotel.price * 5}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Service fee</span>
                  <span>${50}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">${selectedHotel.price * 5 + 50}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  alert('Payment Successful! Booking Confirmed.');
                  setBookingStep('search');
                  setSelectedHotel(null);
                }}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default HotelsPage