const API_URL = 'https://api.deezer.com/radio/30771/tracks';

export const fetchSongs = async () => {
    try {
        const response = await fetch(API_URL);
        const responseData = await response.json();
        const data = responseData.data;
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
