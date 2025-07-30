/**
 * API configuration for the Pokémon TCG API.
 * Uses proxy in development, full URL in production.
 */
const API_CONFIG = {
    baseUrl: process.env.NODE_ENV === 'production' 
        ? "https://api.pokemontcg.io/v2"  // Produção: URL completa
        : "/v2",                          // Desenvolvimento: usa proxy
    headers: {
        "Content-Type": "application/json",
    },
};

export default API_CONFIG;
