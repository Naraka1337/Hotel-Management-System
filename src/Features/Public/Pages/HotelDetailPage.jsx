// src/Features/HotelDetails/HotelDetails.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getHotel, getHotelRooms, createBooking } from '../../../api/public';
import { useAuth } from '../../../context/AuthContext';
import { fadeIn } from '../../../utils/animations';
import { Loader, Star, MapPin, Users } from 'lucide-react';
import { toast } from 'react-toastify';

const HotelDetails = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  // Booking state
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  // Fetch hotel details
  const { data: hotel, isLoading: hotelLoading, error: hotelError } = useQuery({
    queryKey: ['hotel', hotelId],
    queryFn: () => getHotel(hotelId),
  });

  // Fetch hotel rooms
  const { data: rooms = [], isLoading: roomsLoading } = useQuery({
    queryKey: ['hotelRooms', hotelId],
    queryFn: () => getHotelRooms(hotelId),
    enabled: !!hotelId,
  });

  // Booking mutation
  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success('Booking created successfully!');
      // Small delay to ensure toast is seen and state is updated
      setTimeout(() => navigate('/bookings'), 500);
    },
    onError: (error) => {
      toast.error(`Booking failed: ${error.response?.data?.detail || error.message}`);
    },
  });

  const handleBookNow = () => {
    if (!user) {
      toast.info('Please login to book a room');
      navigate('/login', { state: { from: `/hotels/${hotelId}` } });
      return;
    }
    if (!selectedRoom) {
      toast.warning('Please select a room first');
      setActiveTab('rooms');
      return;
    }
    if (!checkIn || !checkOut) {
      toast.warning('Please select check-in and check-out dates');
      return;
    }

    bookingMutation.mutate({
      hotel_id: parseInt(hotelId),
      room_id: selectedRoom.id,
      check_in: checkIn,
      check_out: checkOut,
      total_price: calculateTotal(), // Backend should verify this
    });
  };

  const calculateTotal = () => {
    if (!selectedRoom || !checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = (end - start) / (1000 * 60 * 60 * 24);
    return nights > 0 ? nights * selectedRoom.price : 0;
  };

  if (hotelLoading || roomsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (hotelError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error loading hotel: {hotelError.message}
      </div>
    );
  }

  // Use hotel images or fallback
  const images = hotel.image_url ? [hotel.image_url] : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80'];

  // Mock amenities/policies if not in API yet
  const amenities = hotel.amenities || ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'];
  const policies = hotel.policies || ['Check-in: 3:00 PM', 'Check-out: 11:00 PM', 'No smoking'];

  return (
    <motion.div className="container mx-auto px-4 py-8 max-w-7xl" {...fadeIn}>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Back to Hotels
      </button>

      {/* Hotel Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
        <div className="flex flex-wrap items-center gap-4 mt-2">
          <div className="flex items-center text-yellow-500">
            <Star className="w-5 h-5 fill-current" />
            <span className="ml-1 font-bold text-gray-900">{hotel.rating || 'New'}</span>
          </div>
          <span className="text-gray-600">•</span>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{hotel.location}</span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative mb-8 rounded-xl overflow-hidden bg-gray-100 h-[400px] md:h-[500px]">
        <img
          src={images[currentImageIndex]}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {['overview', 'rooms', 'amenities', 'policies'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">About {hotel.name}</h2>
                <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
              </div>
            )}

            {activeTab === 'rooms' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
                {rooms.length === 0 ? (
                  <p className="text-gray-500">No rooms available at the moment.</p>
                ) : (
                  rooms.map((room) => (
                    <div
                      key={room.id}
                      className={`border rounded-lg p-6 transition-all cursor-pointer ${selectedRoom?.id === room.id ? 'border-blue-500 ring-2 ring-blue-100' : 'hover:border-blue-300'}`}
                      onClick={() => setSelectedRoom(room)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{room.type} - Room {room.room_number}</h3>
                          <p className="text-gray-600 mt-1">{room.description}</p>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <Users className="w-4 h-4 mr-1" />
                            <span>Max Guests: 2</span> {/* Assuming 2 for now as backend model doesn't have capacity */}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">${room.price}</div>
                          <div className="text-sm text-gray-500">per night</div>
                          {selectedRoom?.id === room.id && (
                            <span className="inline-block mt-2 text-sm text-blue-600 font-medium">Selected</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'amenities' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'policies' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Hotel Policies</h2>
                <ul className="space-y-3">
                  {policies.map((policy, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="mr-2">•</span>
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
          <div className="bg-white rounded-xl shadow-lg sticky top-6 p-6 border border-gray-100">
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${selectedRoom ? selectedRoom.price : hotel.rooms && hotel.rooms.length > 0 ? 'From ' + Math.min(...hotel.rooms.map(r => r.price)) : 'Check'}
              </span>
              <span className="text-gray-500 ml-1">/ night</span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                  <input
                    type="date"
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Selection</label>
                <div
                  className="w-full p-3 border rounded-md bg-gray-50 cursor-pointer flex justify-between items-center"
                  onClick={() => setActiveTab('rooms')}
                >
                  <span className={selectedRoom ? 'text-gray-900' : 'text-gray-500'}>
                    {selectedRoom ? `${selectedRoom.type} ($${selectedRoom.price})` : 'Select a room'}
                  </span>
                  <span className="text-blue-600 text-sm">Change</span>
                </div>
              </div>

              {selectedRoom && checkIn && checkOut && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{selectedRoom.price} x {calculateTotal() / selectedRoom.price} nights</span>
                    <span>${calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleBookNow}
                disabled={bookingMutation.isPending}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {bookingMutation.isPending ? <Loader className="animate-spin w-5 h-5" /> : 'Book Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelDetails;