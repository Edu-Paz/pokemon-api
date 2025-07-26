import React from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

function App() {
    const handleSearch = (search) => {
        console.log("Searching for:", search);
        // Aqui você vai integrar com a API depois
    };

    return (
        <div className="App min-h-screen bg-gradient-to-br from-yellow-50 via-red-25 to-blue-50">
            <Header />
            <main className="max-w-4xl mx-auto p-4">
                <SearchBar onSearch={handleSearch} />
                {/* Aqui virão: CardList, Pagination, etc. */}
            </main>
        </div>
    );
}

export default App;
