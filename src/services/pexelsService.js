import { createClient } from 'pexels';

const client = createClient("GXDdrKhCj6aIYFkVr5ozzOQGOvcsNq1VK8OZzUPW4uR1gIXJ2jo8teX9");

export const getCuratedPhotos = async () => {
    try {
        const response = await client.photos.curated({ per_page: 10 });
        return response.photos;
    } catch (error) {
        console.error("Error fetching curated photos: ", error);
        throw error;
    }
};