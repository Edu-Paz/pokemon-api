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
            </div>
        </div>
    );
}

export default SearchBar;
