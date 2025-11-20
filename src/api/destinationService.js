import axios from 'axios';



const Destination_API = 'https://api.stayapi.com/v1/booking/destinations/lookup';

const searchDestination = async (query) => {
    try {
        const response = await axios.get(Destination_API, {
            params: {
                q: query,
                locale: 'en_US',
            },
            headers: {
                'X-Api-Key': '4c4b1c6f-7d6e-4a5b-9d4b-6c4b1c6f7d6e',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching destination:', error);
        throw error;
    }
};
export default searchDestination;