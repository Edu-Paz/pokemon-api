import { useState, useEffect } from "react";

function SearchBar({ onSearch }) {
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Simulate search with a 2 second delay
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search.trim() && onSearch) {
                setIsLoading(true);
                onSearch(search);

                // Stops loading after 2 seconds
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            }
        }, 2000);
        
        return () => clearTimeout(timer);
    }, [search, onSearch]);

    return (
        <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search for Pokémon cards..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-6 py-4 text-lg rounded-full border-2 border-white/20 bg-white/90 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:border-blue-400 transition-all duration-300 placeholder-gray-500"
                    style={{ fontFamily: "'Fredoka', sans-serif" }}
                />
                
                {/* Loading indicator */}
                {isLoading && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
