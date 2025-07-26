import { useState, useEffect, useRef } from "react";

function SearchBar({ onChange }) {
    const [search, setSearch] = useState("");
    const previousSearch = useRef(""); // Keeps track of the previous search term

    useEffect(() => {
        const timer = setTimeout(() => {
            // Only search if the search term has changed
            if (
                search.trim() &&
                onChange &&
                search !== previousSearch.current
            ) {
                previousSearch.current = search;
                onChange(search);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [search, onChange]);

    return (
        <div className="mb-12 flex justify-center -mt-12 relative z-30">
            <div className="relative w-full max-w-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/20 rounded-3xl blur-lg"></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-2">
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
                            className="w-full pl-14 pr-6 py-5 text-lg bg-transparent rounded-2xl focus:outline-none focus:ring-0 placeholder-gray-600 text-gray-900 font-medium"
                            style={{ fontFamily: "'Fredoka', sans-serif" }}
                        />
                        
                        {/* Clear button */}
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
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
                        <p className="text-sm text-white/90 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 inline-block shadow-lg">
                            Searching in 2 seconds...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
