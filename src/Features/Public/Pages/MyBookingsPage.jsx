import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../../api/public';
import { Calendar, CreditCard, Clock, Loader } from 'lucide-react';
import { fadeIn } from '../../../utils/animations';
import { motion } from 'framer-motion';

function MyBookingsPage() {
    const { data: bookings = [], isLoading, error } = useQuery({
        queryKey: ['myBookings'],
        queryFn: getBookings,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-600">
                Error loading bookings: {error.message}
            </div>
        );
    }

    return (
        <motion.div className="container mx-auto px-4 py-8" {...fadeIn}>
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">My Bookings</h1>

            {bookings.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg dark:bg-gray-800">
                    <p className="text-gray-600 text-lg dark:text-gray-400">You haven't made any bookings yet.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-blue-600 mb-2 dark:text-blue-400">Booking #{booking.id}</h3>
                                    <div className="flex items-center text-gray-600 mb-1 dark:text-gray-300">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span>{booking.check_in} - {booking.check_out}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <CreditCard className="w-4 h-4 mr-2" />
                                        <span>Total: ${booking.total_price}</span>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                                        }`}>
                                        {booking.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

export default MyBookingsPage;
