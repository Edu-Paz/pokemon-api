import { useState, useEffect, useRef } from "react";

/**
 * SearchBar component for searching Pokémon cards by name.
 * Implements a 2-second debounce before triggering the search.
 */
function SearchBar({ onChange }) {
    // State for the search input value
    const [search, setSearch] = useState("");
    // Ref to keep track of the previous search term (for debounce)
    const previousSearch = useRef("");

    useEffect(() => {
        // Debounce: wait 2 seconds after user stops typing before searching
        const timer = setTimeout(() => {
            // Only trigger search if the term has changed and is not empty
            if (
                search.trim() &&
                onChange &&
                search !== previousSearch.current
            ) {
                previousSearch.current = search;
                onChange(search);
            }
        }, 2000);

        // Cleanup the timer if the user types again before 2 seconds
        return () => clearTimeout(timer);
    }, [search, onChange]);

    return (
<<<<<<< HEAD
        <div className="mb-12 flex justify-center relative z-30">
            <div className="relative w-full max-w-2xl">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/40 p-2">
                    <div className="relative">
                        {/* Search icon */}
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        
                        <input
                            type="text"
                            placeholder="Search for your favorite Pokémon cards..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 text-lg bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 placeholder-gray-500 text-gray-900 font-medium transition-all duration-200"
                            style={{ fontFamily: "'Fredoka', sans-serif" }}
                        />
                        
                        {/* Clear button */}
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
                
                {/* Search hint */}
                {search && (
                    <div className="absolute top-full left-0 right-0 mt-2 text-center">
                        <p className="text-sm text-white/90 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 inline-block shadow-lg">
                            Searching in 2 seconds...
                        </p>
                    </div>
                )}
=======
        <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-md">
                {/* Search input field */}
                <input
                    type="text"
                    placeholder="Search for Pokémon cards..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-6 py-4 text-lg rounded-full border-2 border-white/20 bg-white/90 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:border-blue-400 transition-all duration-300 placeholder-gray-500"
                    style={{ fontFamily: "'Fredoka', sans-serif" }}
                />
>>>>>>> docs/code-comments
            </div>
        </div>
    );
}

export default SearchBar;
