import React from 'react';
import { Star, MapPin, CreditCard , User, Calendar, Bell , Search } from 'lucide-react';
import { useState } from 'react';
import SearchBar from '../SearchBar';
import HotelCard from '../HotelCard';
import { Link  } from 'react-router-dom';

const HomePage = () => {
  const [featuredHotels] = useState([
    { id: 1, name: 'Luxury Resort', location: 'Miami, FL', rating: 4.5, price: '$200/night' },
    { id: 2, name: 'City Center Hotel', location: 'New York, NY', rating: 4.2, price: '$150/night' },
    { id: 3, name: 'Beachfront Inn', location: 'San Diego, CA', rating: 4.8, price: '$180/night' },
  ]);
    const hotels = [
    { id: 1, name: 'Grand Plaza Hotel', location: 'New York, USA', price: 250, rating: 4.8, image: '🏨', rooms: 15 },
    { id: 2, name: 'Seaside Resort', location: 'Miami, USA', price: 180, rating: 4.6, image: '🏖️', rooms: 22 },
    { id: 3, name: 'Mountain View Lodge', location: 'Aspen, USA', price: 320, rating: 4.9, image: '⛰️', rooms: 8 },
  
  ];

  //
  // but we'll keep it here for completeness.
  const bookings = [
    { id: 1, hotel: 'Grand Plaza Hotel', guest: 'John Doe', checkIn: '2025-10-20', checkOut: '2025-10-25', amount: 1250, status: 'Confirmed' },
    { id: 2, hotel: 'Seaside Resort', guest: 'Jane Smith', checkIn: '2025-10-18', checkOut: '2025-10-22', amount: 720, status: 'Pending' },
    { id: 3, hotel: 'Mountain View Lodge', guest: 'Bob Johnson', checkIn: '2025-11-01', checkOut: '2025-11-05', amount: 1600, status: 'Confirmed' },
  ];
  


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover amazing hotels worldwide with unbeatable prices and exceptional service.
          </p>
          <div className="flex justify-center space-x-8 mb-8">
            <div className="flex items-center">
              <Star className="h-6 w-6 mr-2" />
              <span>Top Rated</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-6 w-6 mr-2" />
              <span>Global Locations</span>
            </div>
            <div className="flex items-center">
              <CreditCard className="h-6 w-6 mr-2" />
              <span>Secure Booking</span>
            </div>
            <div className="flex items-center">
              <User className="h-6 w-6 mr-2" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-6 w-6 mr-2" />
              <span>Flexible Dates</span>

            </div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-xl flex items-center border border-gray-200">
      
      {/* 1. Accessible Label (Visually Hidden) */}
      <label htmlFor="hotel-search" className="sr-only">
        Search for Hotels
      </label>
      
      {/* 2. The Input Field (with the visual placeholder) */}
      <input
        id="hotel-search" // Must match the label's htmlFor
        type="search"
        placeholder="Destination, hotel name, or dates" // This is your visual label
        className="grow p-2 text-gray-800 rounded focus:outline-none"
      />
      
      {/* 3. The Search Button */}
      <button className="ml-3 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
        Search
      </button>
    </div>
          
          
        </div>
      </section>

      {/* Featured Hotels Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {hotels.map(hotel => (
                         <div key={hotel.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
                           <div className="text-6xl p-6 bg-linear-to-br from-blue-50 to-blue-100 text-center">
                             {hotel.image}
                           </div>
                           <div className="p-6">
                             <div className="flex justify-between items-start mb-2">
                               <h3 className="text-xl font-bold text-gray-800">{hotel.name}</h3>
                               <div className="flex items-center bg-blue-100 px-2 py-1 rounded">
                                 <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                 <span className="text-sm font-semibold">{hotel.rating}</span>
                               </div>
                             </div>
                             <div className="flex items-center text-gray-600 mb-4">
                               <MapPin className="w-4 h-4 mr-1" />
                               <span className="text-sm">{hotel.location}</span>
                             </div>
                             <div className="flex justify-between items-center">
                               <div>
                                 <span className="text-2xl font-bold text-blue-600">${hotel.price}</span>
                                 <span className="text-gray-600 text-sm">/night</span>
                               </div>
                               <button 
                                 onClick={() => {
                                   setSelectedHotel(hotel);
                                   setBookingStep('book');
                                 }}
                                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                               >
                                 Book Now
                               </button>
                             </div>
                           </div>
                         </div>
                       ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Next Adventure?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied travelers who trust us for their hotel bookings.
          </p>
          <Link to="/HotelsPage"> 
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
            Explore All Hotels
          </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
