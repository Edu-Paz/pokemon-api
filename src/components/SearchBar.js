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
            </div>
        </div>
    );
}

export default SearchBar;
