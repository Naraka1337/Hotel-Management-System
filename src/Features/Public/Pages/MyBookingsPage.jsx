import React, { useState, useEffect } from 'react';
import { getBookings } from '../../../api/public';
import { Calendar, CreditCard, Clock } from 'lucide-react';

function MyBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getBookings();
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">My Bookings</h1>

            {bookings.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-lg">You haven't made any bookings yet.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-blue-600 mb-2">Booking #{booking.id}</h3>
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span>{booking.check_in} - {booking.check_out}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <CreditCard className="w-4 h-4 mr-2" />
                                        <span>Total: ${booking.total_price}</span>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {booking.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBookingsPage;
