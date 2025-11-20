import React, { useState, useEffect } from 'react';
import { Star, MapPin, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

function HotelsPage() {
  
 
  const [userRole, setUserRole] = useState('user'); 
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingStep, setBookingStep] = useState('search');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [dateError, setDateError] = useState('');
  
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  // Sample data (can be moved to a separate file like 'src/data/hotels.js' later)
  const hotels = [
    { id: 1, name: 'Grand Plaza Hotel', location: 'New York, USA', price: 250, rating: 4.8, image: '🏨', rooms: 15 },
    { id: 2, name: 'Seaside Resort', location: 'Miami, USA', price: 180, rating: 4.6, image: '🏖️', rooms: 22 },
    { id: 3, name: 'Mountain View Lodge', location: 'Aspen, USA', price: 320, rating: 4.9, image: '⛰️', rooms: 8 },
    { id: 4, name: 'City Center Inn', location: 'Chicago, USA', price: 150, rating: 4.5, image: '🏙️', rooms: 30 },
  ];

  //
  // but we'll keep it here for completeness.
  const bookings = [
    { id: 1, hotel: 'Grand Plaza Hotel', guest: 'John Doe', checkIn: '2025-10-20', checkOut: '2025-10-25', amount: 1250, status: 'Confirmed' },
    { id: 2, hotel: 'Seaside Resort', guest: 'Jane Smith', checkIn: '2025-10-18', checkOut: '2025-10-22', amount: 720, status: 'Pending' },
    { id: 3, hotel: 'Mountain View Lodge', guest: 'Bob Johnson', checkIn: '2025-11-01', checkOut: '2025-11-05', amount: 1600, status: 'Confirmed' },
  ];
  

  return (
    <div className="space-y-6">
      {bookingStep === 'search' && (
        <>
          <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Find Your Perfect Stay</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-2">Location</label>
                <input type="text" placeholder="Where are you going?" className="w-full p-3 rounded bg-white text-gray-800" />
              </div>
              <div>
                <label className="block text-sm mb-2">Check-in</label>
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
                  className="w-full p-3 rounded bg-white text-gray-800" 
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Check-out</label>
                <input 
                  type="date" 
                  min={checkInDate || today}
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  disabled={!checkInDate}
                  className={`w-full p-3 rounded bg-white text-gray-800 ${!checkInDate ? 'opacity-50 cursor-not-allowed' : ''}`} 
                />
              </div>
              {dateError && (
                <div className="col-span-2 text-red-500 text-sm mt-1">
                  {dateError}
                </div>
              )}

              <div>
                <label className="block text-sm mb-2">Guests</label>
                <select className="w-full p-3 rounded bg-white text-gray-800">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3+ Guests</option>
                </select>
              </div>
            </div>
            <button className="mt-4 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              Search Hotels
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
}

export default HotelsPage