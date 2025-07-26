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
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    function renderError() {
        if (error) {
            return (
                <div className="text-center py-8 text-red-500 bg-red-50 rounded-lg mx-4">
                    <p className="font-semibold">Search Error</p>
                    <p className="text-sm">{error}</p>
                </div>
            );
        }
        return null;
    }

    function renderNoResults() {
        if (hasSearched && !isLoading && cards.length === 0 && !error) {
            return (
                <div className="text-center py-8 text-gray-500">
                    <p className="text-lg font-semibold">No cards found</p>
                    <p className="text-sm">
                        Try searching for a different name
                    </p>
                </div>
            );
        }
        return null;
    }

    function renderCards() {
        if (cards.length > 0) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {cards.map((card) => (
                        <CardItem key={card.id} card={card} />
                    ))}
                </div>
            );
        }
        return null;
    }

    return (
        <div className="App min-h-screen bg-gradient-to-br from-yellow-100 via-red-50 to-blue-100">
            <Header />
            <main className="max-w-4xl mx-auto p-4">
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
