import { offlineStorage } from './offlineStorage';
import { createBooking } from '../api/public';
import { toast } from 'react-toastify';

export const syncQueue = async () => {
    if (!navigator.onLine) return;

    const queue = await offlineStorage.getQueue();
    if (queue.length === 0) return;

    toast.info('Syncing offline actions...');

    for (const item of queue) {
        try {
            if (item.type === 'CREATE_BOOKING') {
                await createBooking(item.payload);
                await offlineStorage.clearQueue(item.id);
                toast.success('Offline booking synced successfully!');
            }
        } catch (error) {
            console.error('Sync failed for item:', item, error);
            // Optional: Handle permanent failures (e.g., remove from queue or notify user)
        }
    }
};

// Listen for online event
window.addEventListener('online', syncQueue);
