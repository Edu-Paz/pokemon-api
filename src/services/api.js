import API_CONFIG from "../config/api";

function getApiKey() {
    const apiKey = process.env.REACT_APP_POKEMON_API_KEY;
    console.log("API Key loaded:", apiKey); // Debug
    if (!apiKey) {
        throw new Error("API key not configured");
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
    console.log("Requesting URL:", url);

    const response = await fetch(url, {
        headers: {
            ...API_CONFIG.headers,
            "X-Api-Key": apiKey,
        },
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText);

        // Create more specific error messages for API issues
        let errorMessage;
        if (response.status === 504) {
            errorMessage = `API Gateway Timeout (504) - The Pokémon TCG API is currently unavailable. This is an external service issue.`;
        } else if (response.status >= 500) {
            errorMessage = `API Server Error (${response.status}) - The Pokémon TCG API is experiencing issues. This is an external service problem.`;
        } else if (response.status === 429) {
            errorMessage = `API Rate Limit (429) - Too many requests to the Pokémon TCG API. Please wait a moment and try again.`;
        } else {
            errorMessage = `API error: ${response.status} - ${errorText}`;
        }

        throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("Cards found:", data.data?.length || 0);
    console.log("Total count from API:", data.totalCount);

    // Return the full response object to access totalCount
    return data;
}

export { fetchCards };
