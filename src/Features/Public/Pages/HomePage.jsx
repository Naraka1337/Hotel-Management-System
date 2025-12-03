import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Search, Award, Shield, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import heroImage from '../../../assets/luxury_hotel_hero.png';
import grandPlazaImage from '../../../assets/grand_plaza_hotel.png';
import seasideResortImage from '../../../assets/seaside_resort.png';
import mountainLodgeImage from '../../../assets/mountain_view_lodge.png';
import { fadeIn, slideUp, staggerContainer, staggerItem, scrollFadeIn, scrollFadeLeft, scrollFadeRight } from '../../../utils/animations';
import ScrollReveal from '../../../components/ScrollReveal';



const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/hotels?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const hotels = [
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'New York, USA',
      price: 250,
      rating: 4.8,
      image: grandPlazaImage,
      rooms: 15,
      description: 'Luxury in the heart of Manhattan'
    },
    {
      id: 2,
      name: 'Seaside Resort',
      location: 'Miami, USA',
      price: 180,
      rating: 4.6,
      image: seasideResortImage,
      rooms: 22,
      description: 'Beachfront paradise awaits'
    },
    {
      id: 3,
      name: 'Mountain View Lodge',
      location: 'Aspen, USA',
      price: 320,
      rating: 4.9,
      image: mountainLodgeImage,
      rooms: 8,
      description: 'Alpine luxury and adventure'
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-linear-to-b from-gray-50 to-white"
      {...fadeIn}
    >
      {/* Hero Section with Background Image */}
      <section className="relative h-[700px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury Hotel"
            className="w-full h-full object-cover brightness-110"
          />
          <div className="absolute inset-0 bg-linear-to-r from-blue-900/70 via-purple-900/60 to-blue-900/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <motion.div className="text-center text-white" {...slideUp}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-95">
              Discover amazing hotels worldwide with unbeatable prices and exceptional service.
            </p>

            {/* Feature Icons */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12">
              <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-md px-5 py-3 rounded-full hover:bg-white/25 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Star className="h-5 w-5" />
                <span className="text-sm md:text-base font-medium">Top Rated</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-md px-5 py-3 rounded-full hover:bg-white/25 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <MapPin className="h-5 w-5" />
                <span className="text-sm md:text-base font-medium">Global Locations</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-md px-5 py-3 rounded-full hover:bg-white/25 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Shield className="h-5 w-5" />
                <span className="text-sm md:text-base font-medium">Secure Booking</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-md px-5 py-3 rounded-full hover:bg-white/25 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Clock className="h-5 w-5" />
                <span className="text-sm md:text-base font-medium">24/7 Support</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 hover:shadow-3xl transition duration-300">
                <Search className="h-6 w-6 text-gray-400 ml-2" />
                <input
                  id="hotel-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Where do you want to go? Search destinations, hotels..."
                  className="flex-1 p-3 text-gray-800 rounded-lg focus:outline-none text-base"
                />
                <button
                  onClick={handleSearch}
                  className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Featured Hotels Section */}
      <ScrollReveal variants={scrollFadeIn}>
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Featured Hotels
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Handpicked luxury accommodations for unforgettable experiences
              </p>
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
                  <div className="relative h-72 overflow-hidden">
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
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                        <span className="text-sm">{hotel.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ${hotel.price}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">/night</span>
                      </div>
                      <Link to={`/hotels/${hotel.id}`}>
                        <button className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                          Book Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* Why Choose Us Section */}
      <ScrollReveal variants={scrollFadeIn}>
        <section className="py-20 bg-linear-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-xl text-gray-600">
                Experience the difference with our premium service
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
                variants={staggerItem}
                whileHover={{ y: -4 }}
              >
                <div className="bg-linear-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Best Price Guarantee</h3>
                <p className="text-gray-600">
                  Find a lower price? We'll match it and give you an extra 10% off
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
                variants={staggerItem}
                whileHover={{ y: -4 }}
              >
                <div className="bg-linear-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Payments</h3>
                <p className="text-gray-600">
                  Your transactions are protected with bank-level encryption
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
                variants={staggerItem}
                whileHover={{ y: -4 }}
              >
                <div className="bg-linear-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
                <p className="text-gray-600">
                  Our dedicated team is always here to help you anytime, anywhere
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* Call to Action Section */}
      <ScrollReveal variants={scrollFadeIn}>
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-blue-600"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Book Your Next Adventure?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied travelers who trust us for their hotel bookings and create memories that last a lifetime.
            </p>
            <Link to="/hotels">
              <button className="bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                Explore All Hotels
              </button>
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </motion.div>
  );
};

export default HomePage;
