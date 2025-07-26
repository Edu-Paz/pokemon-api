import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CardItem from "./components/CardItem";

function App() {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle search
    const handleSearch = (searchTerm) => {
        console.log("Searching for:", searchTerm);

        setIsLoading(true);

        const mockCards = [
            {
                id: 1,
                name: "Pikachu",
                images: {
                },
            },
            {
                id: 2,
                name: "Charizard",
                images: {
                },
            },
            {
                id: 3,
                name: "Bulbasaur",
                images: {
                },
            },
        ];

        // Simulate a 2-second delay
        setTimeout(() => {
            // Filter cards based on search term
            const filteredCards = mockCards.filter((card) =>
                card.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            setCards(filteredCards);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="App min-h-screen bg-gradient-to-br from-yellow-100 via-red-50 to-blue-100">
            <Header />
            <main className="max-w-4xl mx-auto p-4">
                <SearchBar onChange={handleSearch} />

                {isLoading && (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {!isLoading && cards.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {cards.map((card) => (
                            <CardItem key={card.id} card={card} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
