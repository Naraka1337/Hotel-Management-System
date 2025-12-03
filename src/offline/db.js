/**
 * Offline Database Layer
 * Uses localStorage to persist data.
 */

const STORAGE_KEYS = {
    USERS: 'hotel_app_users',
    HOTELS: 'hotel_app_hotels',
    BOOKINGS: 'hotel_app_bookings',
    TOKEN: 'hotel_app_token',
};

// Mock Data
const MOCK_HOTELS = [
    {
        id: 1,
        name: 'Grand Plaza Hotel',
        location: 'New York, USA',
        description: 'Experience luxury in the heart of New York City. Features a rooftop pool, spa, and gourmet dining.',
        price: 350,
        rating: 4.8,
        image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        amenities: ['Pool', 'Spa', 'Gym', 'Restaurant', 'Free Wi-Fi'],
        rooms: [
            { id: 101, type: 'Deluxe King', price: 350, capacity: 2, available: true },
            { id: 102, type: 'Suite', price: 550, capacity: 4, available: true },
        ]
    },
    {
        id: 2,
        name: 'Seaside Resort',
        location: 'Miami, USA',
        description: 'Relax by the ocean in our beautiful seaside resort. Private beach access and water sports available.',
        price: 280,
        rating: 4.5,
        image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        amenities: ['Beach Access', 'Pool', 'Bar', 'Water Sports'],
        rooms: [
            { id: 201, type: 'Ocean View', price: 280, capacity: 2, available: true },
            { id: 202, type: 'Family Suite', price: 450, capacity: 5, available: true },
        ]
    },
    {
        id: 3,
        name: 'Mountain Retreat',
        location: 'Aspen, USA',
        description: 'Cozy cabins and stunning mountain views. Perfect for skiing in winter and hiking in summer.',
        price: 400,
        rating: 4.9,
        image_url: 'https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        amenities: ['Ski-in/Ski-out', 'Fireplace', 'Hot Tub', 'Hiking Trails'],
        rooms: [
            { id: 301, type: 'Cabin', price: 400, capacity: 4, available: true },
        ]
    },
    {
        id: 4,
        name: 'Urban Loft',
        location: 'Chicago, USA',
        description: 'Modern loft-style rooms in the bustling city center. Close to all major attractions.',
        price: 220,
        rating: 4.2,
        image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        amenities: ['City View', 'Gym', 'Coworking Space'],
        rooms: [
            { id: 401, type: 'Standard', price: 220, capacity: 2, available: true },
        ]
    },
    {
        id: 5,
        name: 'Desert Oasis',
        location: 'Dubai, UAE',
        description: 'Luxury amidst the dunes. Experience the magic of the desert with 5-star comfort.',
        price: 600,
        rating: 5.0,
        image_url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        amenities: ['Desert Safari', 'Pool', 'Spa', 'Fine Dining'],
        rooms: [
            { id: 501, type: 'Villa', price: 600, capacity: 4, available: true },
        ]
    }
];

const MOCK_USERS = [
    {
        id: 1,
        email: 'user@example.com',
        password: 'password123',
        full_name: 'John Doe',
        role: 'guest'
    },
    {
        id: 2,
        email: 'admin@example.com',
        password: 'admin',
        full_name: 'Admin User',
        role: 'admin'
    },
    {
        id: 3,
        email: 'manager@example.com',
        password: 'manager',
        full_name: 'Manager User',
        role: 'manager'
    }
];

// Helper to get data
const get = (key, defaultVal) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultVal;
};

// Helper to set data
const set = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// Initialize DB with mock data if empty
const init = () => {
    if (!localStorage.getItem(STORAGE_KEYS.HOTELS)) {
        set(STORAGE_KEYS.HOTELS, MOCK_HOTELS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        set(STORAGE_KEYS.USERS, MOCK_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
        set(STORAGE_KEYS.BOOKINGS, []);
    }
};

init();

export const DB = {
    // Hotels
    getHotels: () => get(STORAGE_KEYS.HOTELS, []),
    getHotelById: (id) => get(STORAGE_KEYS.HOTELS, []).find(h => h.id == id),
    addHotel: (hotelData) => {
        const hotels = get(STORAGE_KEYS.HOTELS, []);
        const newHotel = { ...hotelData, id: Date.now(), rooms: [] };
        hotels.push(newHotel);
        set(STORAGE_KEYS.HOTELS, hotels);
        return newHotel;
    },
    updateHotel: (id, hotelData) => {
        const hotels = get(STORAGE_KEYS.HOTELS, []);
        const index = hotels.findIndex(h => h.id == id);
        if (index !== -1) {
            hotels[index] = { ...hotels[index], ...hotelData };
            set(STORAGE_KEYS.HOTELS, hotels);
            return hotels[index];
        }
        throw new Error('Hotel not found');
    },
    deleteHotel: (id) => {
        const hotels = get(STORAGE_KEYS.HOTELS, []);
        const filteredHotels = hotels.filter(h => h.id != id);
        set(STORAGE_KEYS.HOTELS, filteredHotels);
        return { success: true };
    },

    // Users
    getUsers: () => get(STORAGE_KEYS.USERS, []),
    addUser: (user) => {
        const users = get(STORAGE_KEYS.USERS, []);
        const newUser = { ...user, id: Date.now() };
        users.push(newUser);
        set(STORAGE_KEYS.USERS, users);
        return newUser;
    },
    findUser: (email) => get(STORAGE_KEYS.USERS, []).find(u => u.email === email),
    updateUser: (id, userData) => {
        const users = get(STORAGE_KEYS.USERS, []);
        const index = users.findIndex(u => u.id == id);
        if (index !== -1) {
            users[index] = { ...users[index], ...userData };
            set(STORAGE_KEYS.USERS, users);
            return users[index];
        }
        throw new Error('User not found');
    },
    deleteUser: (id) => {
        const users = get(STORAGE_KEYS.USERS, []);
        const filteredUsers = users.filter(u => u.id != id);
        set(STORAGE_KEYS.USERS, filteredUsers);
        return { success: true };
    },

    // Rooms (Nested in Hotels)
    addRoom: (roomData) => {
        const hotels = get(STORAGE_KEYS.HOTELS, []);
        const hotelIndex = hotels.findIndex(h => h.id == roomData.hotel_id);
        if (hotelIndex === -1) throw new Error('Hotel not found');

        const newRoom = { ...roomData, id: Date.now() };
        if (!hotels[hotelIndex].rooms) hotels[hotelIndex].rooms = [];
        hotels[hotelIndex].rooms.push(newRoom);

        set(STORAGE_KEYS.HOTELS, hotels);
        return newRoom;
    },
    updateRoom: (id, roomData) => {
        const hotels = get(STORAGE_KEYS.HOTELS, []);
        let roomFound = false;

        for (let i = 0; i < hotels.length; i++) {
            if (!hotels[i].rooms) continue;
            const roomIndex = hotels[i].rooms.findIndex(r => r.id == id);
            if (roomIndex !== -1) {
                hotels[i].rooms[roomIndex] = { ...hotels[i].rooms[roomIndex], ...roomData };
                set(STORAGE_KEYS.HOTELS, hotels);
                return hotels[i].rooms[roomIndex];
            }
        }
        throw new Error('Room not found');
    },
    deleteRoom: (id) => {
        const hotels = get(STORAGE_KEYS.HOTELS, []);
        let roomFound = false;

        for (let i = 0; i < hotels.length; i++) {
            if (!hotels[i].rooms) continue;
            const initialLength = hotels[i].rooms.length;
            hotels[i].rooms = hotels[i].rooms.filter(r => r.id != id);
            if (hotels[i].rooms.length < initialLength) {
                set(STORAGE_KEYS.HOTELS, hotels);
                return { success: true };
            }
        }
        throw new Error('Room not found');
    },

    // Bookings
    getBookings: () => get(STORAGE_KEYS.BOOKINGS, []),
    getUserBookings: (userId) => get(STORAGE_KEYS.BOOKINGS, []).filter(b => b.userId === userId),
    addBooking: (booking) => {
        const bookings = get(STORAGE_KEYS.BOOKINGS, []);
        const newBooking = { ...booking, id: Date.now(), status: 'confirmed' };
        bookings.push(newBooking);
        set(STORAGE_KEYS.BOOKINGS, bookings);
        return newBooking;
    },

    // Auth Helpers
    login: (email, password) => {
        const user = get(STORAGE_KEYS.USERS, []).find(u => u.email === email && u.password === password);
        if (user) {
            // Create a fake token (just the user ID encoded or similar)
            const token = btoa(JSON.stringify({ id: user.id, role: user.role }));
            localStorage.setItem(STORAGE_KEYS.TOKEN, token);
            return { access_token: token, user };
        }
        throw new Error('Invalid credentials');
    },

    logout: () => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
    },

    getCurrentUser: () => {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        if (!token) throw new Error('Not authenticated');
        try {
            const payload = JSON.parse(atob(token));
            return get(STORAGE_KEYS.USERS, []).find(u => u.id === payload.id);
        } catch (e) {
            throw new Error('Invalid token');
        }
    }
};
