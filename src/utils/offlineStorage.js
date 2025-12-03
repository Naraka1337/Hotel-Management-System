import { openDB } from 'idb';

const DB_NAME = 'hotel-db';
const DB_VERSION = 1;

export const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('hotels')) {
                db.createObjectStore('hotels', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('rooms')) {
                db.createObjectStore('rooms', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('bookings')) {
                db.createObjectStore('bookings', { keyPath: 'id', autoIncrement: true });
            }
            if (!db.objectStoreNames.contains('syncQueue')) {
                db.createObjectStore('syncQueue', { keyPath: 'id', autoIncrement: true });
            }
        },
    });
};

export const offlineStorage = {
    async saveHotels(hotels) {
        const db = await initDB();
        const tx = db.transaction('hotels', 'readwrite');
        await Promise.all(hotels.map(hotel => tx.store.put(hotel)));
        await tx.done;
    },

    async getHotels() {
        const db = await initDB();
        return db.getAll('hotels');
    },

    async saveRooms(rooms) {
        const db = await initDB();
        const tx = db.transaction('rooms', 'readwrite');
        await Promise.all(rooms.map(room => tx.store.put(room)));
        await tx.done;
    },

    async getRooms() {
        const db = await initDB();
        return db.getAll('rooms');
    },

    async queueAction(action) {
        const db = await initDB();
        await db.add('syncQueue', { ...action, timestamp: Date.now() });
    },

    async getQueue() {
        const db = await initDB();
        return db.getAll('syncQueue');
    },

    async clearQueue(id) {
        const db = await initDB();
        await db.delete('syncQueue', id);
    }
};
