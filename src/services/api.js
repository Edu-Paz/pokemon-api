import API_CONFIG from "../config/api";

function getApiKey() {
    const apiKey = process.env.REACT_APP_POKEMON_API_KEY;
    console.log('API Key loaded:', apiKey); // Debug
    if (!apiKey) {
        throw new Error('API key not configured');
    }
    return apiKey;
}

async function fetchCards(searchTerm = "", page = 1) {
    const apiKey = getApiKey();

    // If searchTerm is empty, search for all cards
    const query = searchTerm ? `q=name:${searchTerm}` : "";
    const pageParam = `page=${page}`;
    const pageSizeParam = "pageSize=20";

    const url = `${API_CONFIG.baseUrl}/cards?${query}&${pageParam}&${pageSizeParam}`;
    console.log('Requesting URL:', url); // Debug

    const response = await fetch(url, {
        headers: {
            ...API_CONFIG.headers,
            "X-Api-Key": apiKey,
        },
    });

    console.log('Response status:', response.status); // Debug

    if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText); // Debug
        throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Cards found:', data.data?.length || 0); // Debug
    return data.data || [];
}

export { fetchCards };
