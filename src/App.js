import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CardItem from "./components/CardItem";
import { fetchCards } from "./services/api";

function App() {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    // Load initial cards when page loads
    useEffect(() => {
        loadInitialCards();
    }, []);

    const loadInitialCards = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const cardsData = await fetchCards("", 1);
            setCards(cardsData);
        } catch (error) {
            console.error("Error loading cards: ", error);
            setError("Error loading cards. Please check your API key.");
            setCards([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle search
    const handleSearch = async (searchTerm) => {
        console.log("Searching for:", searchTerm);

        if (!searchTerm.trim()) {
            // If empty search, return to initial cards
            setHasSearched(false);
            loadInitialCards();
            return;
        }

        setIsLoading(true);
        setError(null);
        setHasSearched(true);
        try {
            const cardsData = await fetchCards(searchTerm, 1);
            setCards(cardsData);
        } catch (error) {
            console.error("Error searching cards: ", error);
            setError("Error searching cards. Please check your API key.");
            setCards([]);
        } finally {
            setIsLoading(false);
        }
    };

    function renderLoading() {
        return (
            <div className="flex flex-col justify-center items-center py-16">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
                </div>
                <p className="mt-4 text-gray-600 font-medium animate-pulse">Searching for Pokémon...</p>
            </div>
        );
    }

    function renderError() {
        if (error) {
            return (
                <div className="max-w-md mx-auto mt-8">
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-red-800 text-center mb-2">Oops! Something went wrong</h3>
                        <p className="text-red-600 text-center text-sm leading-relaxed">{error}</p>
                    </div>
                </div>
            );
        }
        return null;
    }

    function renderNoResults() {
        if (hasSearched && !isLoading && cards.length === 0 && !error) {
            return (
                <div className="max-w-md mx-auto mt-12">
                    <div className="text-center py-12 px-6">
                        <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">No Pokémon found</h3>
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
    }

    function renderCards() {
        if (cards.length > 0) {
            return (
                <div className="mt-12">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {hasSearched ? 'Search Results' : 'Featured Cards'}
                        </h2>
                        <p className="text-gray-600">
                            {cards.length} card{cards.length !== 1 ? 's' : ''} found
                        </p>
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
    }

    return (
        <div className="App min-h-screen relative overflow-hidden">
            {/* Dynamic Background */}
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
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>
            
            <Header />
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <SearchBar onChange={handleSearch} />

                {isLoading && renderLoading()}
                {renderError()}
                {renderNoResults()}
                {renderCards()}
            </main>
        </div>
    );
}

export default App;
