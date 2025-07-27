/**
 * API configuration for the Pokémon TCG API.
 * Defines the base URL and default headers for all requests.
 */
const API_CONFIG = {
    baseUrl: "/v2", // Uses proxy in package.json for local development
    headers: {
        "Content-Type": "application/json",
    },
};

export default API_CONFIG;
