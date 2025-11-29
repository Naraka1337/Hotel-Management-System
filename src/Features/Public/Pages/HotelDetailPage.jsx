// src/Features/HotelDetails/HotelDetails.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { fadeIn, staggerContainer, staggerItem } from '../../../utils/animations';

const HotelDetails = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with API call
  const hotel = {
    id: hotelId,
    name: `Luxury Hotel ${hotelId}`,
    address: '123 Luxury Street, City, Country',
    rating: 4.7,
    reviewCount: 128,
    description: 'Experience luxury at its finest with our world-class amenities and exceptional service. Our hotel offers breathtaking views, exquisite dining, and a central location that puts you close to all the major attractions. Whether you\'re here for business or leisure, our dedicated staff will ensure your stay is nothing short of perfect.',
    pricePerNight: 249,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    ],
    amenities: [
      'Free High-Speed WiFi',
      'Swimming Pool',
      'Spa & Wellness Center',
      '24/7 Room Service',
      'Restaurant & Bar',
      'Fitness Center',
      'Business Center',
      'Airport Shuttle',
      'Parking Available',
      'Pet Friendly'
    ],
    roomTypes: [
      {
        id: 'deluxe',
        name: 'Deluxe Room',
        description: 'Spacious room with a king-size bed and city view',
        price: 249,
        maxGuests: 2,
        available: 5
      },
      {
        id: 'suite',
        name: 'Executive Suite',
        description: 'Luxurious suite with separate living area and premium amenities',
        price: 399,
        maxGuests: 3,
        available: 3
      }
    ],
    policies: [
      'Check-in: 3:00 PM',
      'Check-out: 12:00 PM',
      'Free cancellation up to 24 hours before check-in',
      'No smoking in rooms',
      'Pets allowed with additional fee'
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );
  };

  const renderRatingStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-gray-600">
          {rating} ({hotel.reviewCount} reviews)
        </span>
      </div>
    );
  };

  return (
    <motion.div className="container mx-auto px-4 py-8 max-w-7xl" {...fadeIn}>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Hotels
      </button>

      {/* Hotel Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
        <div className="flex flex-wrap items-center gap-4 mt-2">
          {renderRatingStars(hotel.rating)}
          <span className="text-gray-600">•</span>
          <span className="text-gray-600">{hotel.address}</span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative mb-8 rounded-xl overflow-hidden bg-gray-100" style={{ height: '500px' }}>
        <img
          src={hotel.images[currentImageIndex]}
          alt={`${hotel.name} - ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {hotel.images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {hotel.images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
              className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'rooms', 'amenities', 'policies'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">About {hotel.name}</h2>
                <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
              </div>
            )}

            {activeTab === 'rooms' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Rooms & Suites</h2>
                <motion.div
                  className="space-y-6"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {hotel.roomTypes.map((room) => (
                    <motion.div key={room.id} className="border rounded-lg overflow-hidden" variants={staggerItem}>
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div className="mb-4 md:mb-0">
                            <h3 className="text-xl font-semibold">{room.name}</h3>
                            <p className="text-gray-600 mt-1">{room.description}</p>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <span className="mr-4">Max Guests: {room.maxGuests}</span>
                              <span>Available: {room.available}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-2xl font-bold text-gray-900">${room.price}</div>
                            <div className="text-sm text-gray-500 mb-3">per night</div>
                            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'policies' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Hotel Policies</h2>
                <ul className="space-y-3">
                  {hotel.policies.map((policy, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span>{policy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Booking Widget */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-6">
            <div className="p-6 border-b">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">${hotel.pricePerNight}</span>
                <span className="ml-1 text-gray-500">/ night</span>
              </div>
              <div className="mt-1 text-sm text-green-600 font-medium">Free cancellation available</div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>3 Adults</option>
                    <option>4 Adults</option>
                  </select>
                </div>
              </div>

              <button className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                Book Now
              </button>

              <div className="mt-4 text-center text-sm text-gray-500">
                You won't be charged yet
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-3">What's included</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Free cancellation
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    No prepayment needed
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Best price guarantee
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div >
  );
};

export default HotelDetails;