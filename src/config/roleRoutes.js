export const roleRoutes = {
    guest: ['/', '/login', '/register', '/hotels', '/hotels/:hotelId'],
    user: ['/', '/hotels', '/hotels/:hotelId', '/bookings', '/profile'],
    admin: ['/admin', '/admin/dashboard', '/admin/users', '/admin/hotels', '/admin/hotels/new', '/admin/hotels/:hotelId'],
    manager: ['/manager', '/manager/dashboard', '/manager/rooms', '/manager/hotels'],
};

export const DEFAULT_REDIRECT = {
    guest: '/',
    user: '/',
    admin: '/admin/dashboard',
    manager: '/manager/dashboard',
};
