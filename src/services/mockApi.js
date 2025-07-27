// src/services/mockApi.js
import mockCards from '../data/mockCards';

/**
 * Mock API service that simulates the real Pokémon TCG API.
 * Used for development and testing when the real API is unavailable.
 */
async function fetchMockCards(searchTerm = '', page = 1) {
    // Simulate API delay to mimic real network request
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Filter cards by search term if provided
    if (searchTerm) {
        return mockCards.filter(card => 
            card.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Return paginated results (20 cards per page)
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;
    return mockCards.slice(startIndex, endIndex);
}

export { fetchMockCards };
