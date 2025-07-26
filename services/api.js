import API_CONFIG from "../config/api";

// Function to get API key
function getApiKey() {
    const apiKey = process.env.REACT_APP_API_KEY;
    if (!apiKey) {
        throw new Error("API key not found");
    }
    return apiKey;
}

// Function to fetch cards
async function fetchCards(search) {
    const apiKey = getApiKey();

    const response = await fetch(`${API_CONFIG.baseUrl}/cards?name=${search}`, {
        headers: {
            ...API_CONFIG.headers,
            "X-Api-Key": apiKey,
        },
    });
    
    if (!response.ok) {
        throw new Error("API error: " + response.status);
    }
    
    const data = await response.json();
    return data.data || [];
}

export { fetchCards };
