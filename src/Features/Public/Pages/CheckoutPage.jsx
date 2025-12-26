import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createBooking } from '../../../api/public';
import { useAuth } from '../../../context/AuthContext';
import { fadeIn, staggerContainer, staggerItem } from '../../../utils/animations';
import { toast } from 'react-toastify';
import {
  CreditCard,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Check,
  Loader,
  ArrowLeft,
  Star,
  Clock,
  BadgeCheck,
  Lock
} from 'lucide-react';
import { getHotelImage } from '../../../assets/hotelImages';

function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Get booking data from navigation state
  const bookingDetails = location.state?.bookingDetails;

  const [step, setStep] = useState(1);
  const [guestInfo, setGuestInfo] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    specialRequests: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Redirect if no booking details
  useEffect(() => {
    if (!bookingDetails && !bookingComplete) {
      navigate('/hotels');
      toast.warning('Please select a room first');
    }
  }, [bookingDetails, bookingComplete, navigate]);

  // Booking mutation
  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      setBookingComplete(true);
      setStep(3);
      toast.success('Booking confirmed successfully!');
    },
    onError: (error) => {
      toast.error(`Booking failed: ${error.response?.data?.detail || error.message}`);
      setIsProcessing(false);
    }
  });

  // Calculate nights and total
  const calculateNights = () => {
    if (!bookingDetails?.checkIn || !bookingDetails?.checkOut) return 0;
    const start = new Date(bookingDetails.checkIn);
    const end = new Date(bookingDetails.checkOut);
    return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  };

  const nights = calculateNights();
  const roomTotal = bookingDetails?.room?.price * nights || 0;
  const taxesFees = Math.round(roomTotal * 0.12);
  const total = roomTotal + taxesFees;

  const handleGuestSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create booking
    bookingMutation.mutate({
      hotel_id: bookingDetails.hotelId,
      room_id: bookingDetails.room.id,
      check_in: bookingDetails.checkIn,
      check_out: bookingDetails.checkOut,
      total_price: total
    });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (!bookingDetails && !bookingComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  // Confirmation Step
  if (step === 3 && bookingComplete) {
    return (
      <motion.div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-4" {...fadeIn}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your reservation. A confirmation email has been sent to {guestInfo.email}.
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Hotel</p>
                <p className="font-semibold text-gray-900">{bookingDetails?.hotelName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Room</p>
                <p className="font-semibold text-gray-900">{bookingDetails?.room?.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Check-in</p>
                <p className="font-semibold text-gray-900">{new Date(bookingDetails?.checkIn).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Check-out</p>
                <p className="font-semibold text-gray-900">{new Date(bookingDetails?.checkOut).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Duration</p>
                <p className="font-semibold text-gray-900">{nights} night{nights > 1 ? 's' : ''}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Paid</p>
                <p className="font-semibold text-green-600">${total}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/bookings')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            >
              View My Bookings
            </button>
            <button
              onClick={() => navigate('/hotels')}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-all"
            >
              Browse More Hotels
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4" {...fadeIn}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900">Secure Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {[
              { num: 1, label: 'Guest Details' },
              { num: 2, label: 'Payment' },
              { num: 3, label: 'Confirmation' }
            ].map((s, index) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s.num
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                    }`}>
                    {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                  </div>
                  <span className={`ml-3 font-medium hidden sm:block ${step >= s.num ? 'text-gray-900' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`w-20 md:w-32 h-1 mx-4 rounded transition-all ${step > s.num ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'
                    }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            {/* Step 1: Guest Details */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <div className="flex items-center mb-6">
                  <User className="w-7 h-7 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Guest Information</h2>
                </div>

                <form onSubmit={handleGuestSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={guestInfo.firstName}
                        onChange={(e) => setGuestInfo({ ...guestInfo, firstName: e.target.value })}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={guestInfo.lastName}
                        onChange={(e) => setGuestInfo({ ...guestInfo, lastName: e.target.value })}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={guestInfo.email}
                      onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={guestInfo.phone}
                      onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      rows="3"
                      value={guestInfo.specialRequests}
                      onChange={(e) => setGuestInfo({ ...guestInfo, specialRequests: e.target.value })}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      placeholder="Any special requests for the hotel (early check-in, dietary restrictions, etc.)"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Continue to Payment
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <div className="flex items-center mb-6">
                  <CreditCard className="w-7 h-7 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
                </div>

                {/* Security Badge */}
                <div className="flex items-center bg-green-50 p-4 rounded-xl mb-6">
                  <Lock className="w-5 h-5 text-green-600 mr-3" />
                  <p className="text-green-800 text-sm">
                    Your payment information is encrypted and secure
                  </p>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength="19"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: formatCardNumber(e.target.value) })}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentInfo.cardName}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="JOHN DOE"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength="5"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: formatExpiryDate(e.target.value) })}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength="4"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value.replace(/\D/g, '') })}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold hover:border-gray-400 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isProcessing ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        `Pay $${total}`
                      )}
                    </button>
                  </div>
                </form>

                {/* Payment Methods */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center mb-4">Accepted Payment Methods</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700">VISA</div>
                    <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700">MasterCard</div>
                    <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700">Amex</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-6">
              {/* Hotel Image */}
              <div className="relative h-48">
                <img
                  src={getHotelImage(bookingDetails?.hotelId || 1)}
                  alt={bookingDetails?.hotelName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold">{bookingDetails?.hotelName}</h3>
                  <div className="flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{bookingDetails?.hotelLocation}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">Booking Summary</h4>

                {/* Room Details */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="font-semibold text-gray-900">{bookingDetails?.room?.type}</p>
                  <p className="text-sm text-gray-600">Room {bookingDetails?.room?.room_number}</p>
                </div>

                {/* Dates */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-gray-500">Check-in</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(bookingDetails?.checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-gray-500">Check-out</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(bookingDetails?.checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 text-gray-400 mr-3" />
                    <p className="font-semibold text-gray-900">{nights} night{nights > 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">${bookingDetails?.room?.price} × {nights} nights</span>
                    <span className="font-medium text-gray-900">${roomTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-medium text-gray-900">${taxesFees}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-xl text-green-600">${total}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <BadgeCheck className="w-5 h-5 text-green-500 mr-2" />
                    <span>Best Price Guarantee</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-5 h-5 text-blue-500 mr-2" />
                    <span>Free Cancellation (24hrs)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Lock className="w-5 h-5 text-purple-500 mr-2" />
                    <span>Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CheckoutPage;