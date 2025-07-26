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
            <div className="flex justify-center items-center py-12">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    function renderError() {
        if (error) {
            return (
                <div className="text-center py-8 mx-4">
                    <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-6 shadow-lg">
                        <div className="text-red-500 text-4xl mb-3">⚠️</div>
                        <p className="font-bold text-red-700 mb-2">Search Error</p>
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                </div>
            );
        }
        return null;
    }

    function renderNoResults() {
        if (hasSearched && !isLoading && cards.length === 0 && !error) {
            return (
                <div className="text-center py-12 mx-4">
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-100 border border-yellow-200 rounded-xl p-6 shadow-lg">
                        <div className="text-yellow-500 text-4xl mb-3">🔍</div>
                        <p className="text-lg font-bold text-yellow-700 mb-2">No cards found</p>
                        <p className="text-sm text-yellow-600">
                            Try searching for a different name
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                    {cards.map((card) => (
                        <CardItem key={card.id} card={card} />
                    ))}
                </div>
            );
        }
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-red-200 to-blue-200">
            <Header />
            <main className="max-w-7xl mx-auto p-6">
                <div className="mb-8">
                    <SearchBar onChange={handleSearch} />
                </div>

                {isLoading && renderLoading()}
                {renderError()}
                {renderNoResults()}
                {renderCards()}
            </main>
        </div>
    );
}

export default App;
