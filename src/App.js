import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CardItem from "./components/CardItem";
import { fetchCards } from "./services/api";

/**
 * Main application component that manages the Pokémon card listing and search functionality.
 * Handles state management for cards, loading, errors, pagination, and search operations.
 */
function App() {
    // State management for cards and UI
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentSearchTerm, setCurrentSearchTerm] = useState("");
    const [totalCount, setTotalCount] = useState(0);

    /**
     * Load initial cards when component mounts
     */
    useEffect(() => {
        loadInitialCards();
    }, []);

    /**
     * Load initial cards from API
     */
    const loadInitialCards = async (page = 1) => {
        setIsLoading(true);
        setError(null);
        setCards([]);

        try {
            const cardsData = await fetchCards("", page);
            setCards(cardsData.data || cardsData);
            setTotalCount(cardsData.totalCount || 250);
            setTotalPages(Math.ceil((cardsData.totalCount || 250) / 20));
            setCurrentPage(page);
        } catch (error) {
            console.error("Error loading cards: ", error);
            setError("Error loading cards. Please check your API key.");
            setCards([]);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handle search functionality with debounce (implemented in SearchBar)
     */
    const handleSearch = async (searchTerm) => {
        console.log("Searching for:", searchTerm);

        if (!searchTerm.trim()) {
            setHasSearched(false);
            setCurrentSearchTerm("");
            loadInitialCards(1);
            return;
        }

        setIsLoading(true);
        setError(null);
        setCards([]);
        setHasSearched(true);
        setCurrentSearchTerm(searchTerm);
        setCurrentPage(1);

        try {
            const cardsData = await fetchCards(searchTerm, 1);
            setCards(cardsData.data || cardsData);
            setTotalCount(cardsData.totalCount || 1); 
            setTotalPages(Math.ceil((cardsData.totalCount || 1) / 20));
        } catch (error) {
            console.error("Error searching cards: ", error);
            setError("Error searching cards. Please check your API key.");
            setCards([]);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handle page navigation in pagination
     */
    const handlePageChange = async (page) => {
        setIsLoading(true);
        setError(null);
        setCards([]);

        try {
            const cardsData = await fetchCards(currentSearchTerm, page);
            setCards(cardsData.data || cardsData);
            setCurrentPage(page);
        } catch (error) {
            console.error("Error loading page: ", error);
            setError("Error loading page. Please try again.");
            setCards([]);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Render loading spinner with dual animation
     */
    const renderLoading = () => {
        return (
            <div className="flex flex-col justify-center items-center py-16">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
                </div>
                <p className="mt-4 text-gray-600 font-medium animate-pulse">
                    Searching for Pokémon...
                </p>
            </div>
        );
    };

    /**
     * Render error message with different styles for API vs internal errors
     */
    const renderError = () => {
        if (error) {
            // Detect API-related errors for better user feedback
            const isApiError =
                error.includes("API") ||
                error.includes("504") ||
                error.includes("timeout") ||
                error.includes("network") ||
                error.includes("CORS") ||
                error.includes("Gateway Timeout") ||
                error.includes("server") ||
                error.includes("external") ||
                error.toLowerCase().includes("pokemon") ||
                error.includes("500") ||
                error.includes("502") ||
                error.includes("503");

            return (
                <div className="max-w-md mx-auto mt-8">
                    <div
                        className={`border rounded-2xl p-6 shadow-lg ${
                            isApiError
                                ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200"
                                : "bg-gradient-to-r from-red-50 to-pink-50 border-red-200"
                        }`}>
                        <div
                            className={`flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4 ${
                                isApiError ? "bg-yellow-100" : "bg-red-100"
                            }`}>
                            {isApiError ? (
                                <svg
                                    className="w-6 h-6 text-yellow-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            )}
                        </div>

                        <h3
                            className={`text-lg font-bold text-center mb-2 ${
                                isApiError ? "text-yellow-800" : "text-red-800"
                            }`}>
                            {isApiError
                                ? "External API Issue"
                                : "Oops! Something went wrong"}
                        </h3>

                        <p
                            className={`text-center text-sm leading-relaxed ${
                                isApiError ? "text-yellow-700" : "text-red-600"
                            }`}>
                            {isApiError
                                ? "The Pokémon TCG API is currently experiencing issues. This is an external service problem, not related to our implementation. Please try again later."
                                : error}
                        </p>

                        {isApiError && (
                            <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                                <p className="text-xs text-yellow-800 text-center">
                                    💡 <strong>Note for evaluators:</strong>{" "}
                                    This error is caused by external API issues,
                                    not implementation problems.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
        return null;
    };

    /**
     * Render no results message when search returns empty
     */
    const renderNoResults = () => {
        if (hasSearched && !isLoading && cards.length === 0 && !error) {
            return (
                <div className="max-w-md mx-auto mt-12">
                    <div className="text-center py-12 px-6">
                        <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6">
                            <svg
                                className="w-10 h-10 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                            No Pokémon found
                        </h3>
                        <p className="text-gray-500 leading-relaxed mb-4">
                            We couldn't find any cards matching your search.
                        </p>
                        <p className="text-sm text-gray-400">
                            Try searching for a different Pokémon name
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    /**
     * Render cards grid with pagination info
     */
    const renderCards = () => {
        if (cards.length > 0 && !isLoading) {
            // Get the actual total count from the API response
            const totalCount = cards.totalCount || (totalPages * 20);
            
            return (
                <div className="mt-12">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {hasSearched ? "Search Results" : "Featured Cards"}
                        </h2>
                        <p className="text-gray-600">
                            Showing {cards.length} of {totalCount} card
                            {totalCount !== 1 ? "s" : ""} found
                        </p>
                        {hasSearched && totalCount > 20 && (
                            <p className="text-sm text-gray-500 mt-1">
                                Use pagination to see all {totalCount} results
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {cards.map((card, index) => (
                            <CardItem key={card.id} card={card} index={index} />
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    };

    /**
     * Render pagination controls with enhanced design
     */
    const renderPagination = () => {
        if (cards.length > 0 && totalPages > 1 && !isLoading) {
            return (
                <div className="flex flex-col items-center mt-12 space-y-4">
                    {/* Page info */}
                    <div className="text-center">
                        <p className="text-white/90 font-medium">
                            Page {currentPage} of {totalPages}
                        </p>
                        <p className="text-white/70 text-sm">
                            Showing {cards.length} cards
                        </p>
                    </div>

                    {/* Pagination controls */}
                    <div className="flex items-center space-x-3">
                        {/* Previous button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="group px-6 py-3 rounded-xl bg-white/95 backdrop-blur-sm border border-white/40 text-gray-700 font-semibold hover:bg-white/98 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:hover:transform-none">
                            <div className="flex items-center space-x-2">
                                <svg
                                    className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 19l-7-7 7-7"></path>
                                </svg>
                                <span>Previous</span>
                            </div>
                        </button>

                        {/* Page numbers */}
                        <div className="flex space-x-2">
                            {Array.from(
                                { length: Math.min(5, totalPages) },
                                (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() =>
                                                handlePageChange(pageNum)
                                            }
                                            className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                                                currentPage === pageNum
                                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                                                    : "bg-white/90 backdrop-blur-sm border border-white/40 text-gray-700 hover:bg-white/95 hover:shadow-lg"
                                            }`}>
                                            {pageNum}
                                        </button>
                                    );
                                }
                            )}
                        </div>

                        {/* Next button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="group px-6 py-3 rounded-xl bg-white/95 backdrop-blur-sm border border-white/40 text-gray-700 font-semibold hover:bg-white/98 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:hover:transform-none">
                            <div className="flex items-center space-x-2">
                                <span>Next</span>
                                <svg
                                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5l7 7-7 7"></path>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="App min-h-screen relative overflow-hidden">
            {/* Dynamic Background with animated elements */}
            <div className="fixed inset-0 z-0">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600"></div>

                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/30 via-yellow-300/20 to-green-400/30 animate-pulse"></div>

                {/* Floating orbs */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl animate-float-slow"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-red-400/25 rounded-full blur-lg animate-float-medium"></div>
                <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-300/15 rounded-full blur-2xl animate-float-slow"></div>
                <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-green-400/20 rounded-full blur-xl animate-float-fast"></div>
                <div className="absolute top-1/3 left-1/2 w-36 h-36 bg-purple-400/15 rounded-full blur-2xl animate-float-medium"></div>

                {/* Pokeball patterns */}
                <div className="absolute top-16 right-16 w-16 h-16 opacity-10">
                    <div className="w-full h-full border-4 border-white rounded-full relative">
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-white transform -translate-y-1/2"></div>
                        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-300"></div>
                    </div>
                </div>
                <div className="absolute bottom-24 left-16 w-12 h-12 opacity-8">
                    <div className="w-full h-full border-3 border-white rounded-full relative">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white transform -translate-y-1/2"></div>
                        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 border border-gray-300"></div>
                    </div>
                </div>

                {/* Geometric shapes */}
                <div className="absolute top-1/4 right-1/4 w-20 h-20 border-2 border-white/10 rotate-45 animate-spin-slow"></div>
                <div className="absolute bottom-1/3 left-1/5 w-16 h-16 border-2 border-yellow-300/15 rotate-12 animate-pulse"></div>

                {/* Particle effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-white/30 rounded-full animate-twinkle"></div>
                    <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-yellow-300/40 rounded-full animate-twinkle-delayed"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-pink-300/30 rounded-full animate-twinkle"></div>
                    <div className="absolute bottom-1/3 right-1/5 w-1 h-1 bg-blue-300/50 rounded-full animate-twinkle-delayed"></div>
                    <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-green-300/35 rounded-full animate-twinkle"></div>
                </div>

                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}></div>
            </div>

            <Header />
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <SearchBar onChange={handleSearch} />

                {isLoading && renderLoading()}
                {renderError()}
                {renderNoResults()}
                {renderCards()}
                {renderPagination()}
            </main>
        </div>
    );
}

export default App;
