// src/services/mockApi.js
import mockCards from '../data/mockCards';

async function fetchMockCards(searchTerm = '', page = 1) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (searchTerm) {
        return mockCards.filter(card => 
            card.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Return paginated results (20 per page)
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;
    return mockCards.slice(startIndex, endIndex);
}

export { fetchMockCards };
