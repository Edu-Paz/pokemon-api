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
        <div className="App min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
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
