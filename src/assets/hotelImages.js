// Hotel Images - Local assets for fast loading (high quality)
import grandPlazaHotel from './grand_plaza_hotel.png';
import seasideResort from './seaside_resort.png';
import mountainViewLodge from './mountain_view_lodge.png';
import hotelNewYork from './hotel_newyork.png';
import hotelBeverly from './hotel_beverly.png';
import hotelParis from './hotel_paris.png';
import hotelLuxuryGrand from './hotel_luxury_grand.png';
import hotelBeachSunset from './hotel_beach_sunset.png';

// Map hotel IDs or names to local images
// For hotels without specific images, we rotate through available images
const hotelImages = [
    grandPlazaHotel,
    seasideResort,
    mountainViewLodge,
    hotelNewYork,
    hotelBeverly,
    hotelParis,
    hotelLuxuryGrand,
    hotelBeachSunset,
];

// Get image for a hotel based on its ID
export const getHotelImage = (hotelId) => {
    const index = (hotelId - 1) % hotelImages.length;
    return hotelImages[index];
};

// Default fallback image
export const defaultHotelImage = grandPlazaHotel;

export default hotelImages;
