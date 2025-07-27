import React, { useState } from "react";
import placeholderCard from "../assets/placeholder-card.png";
import pokeball from "../assets/pokeball.png";

/**
 * Card component that displays individual Pokémon cards with flip functionality
 * Shows card details on the back when flipped
 */
function CardItem({ card }) {
    // State to control card flip animation
    const [flipped, setFlipped] = useState(false);

    /**
     * Toggle card flip state to show/hide card details
     */
    function handleFlip() {
        setFlipped((prev) => !prev);
    }

    return (
        <div className="w-full h-[480px]">
            <div className="relative w-full h-full">
                {/* Front of Card - Main card display */}
                <div
                    className={`absolute w-full h-full transition-all duration-500 ${
                        flipped
                            ? "opacity-0 pointer-events-none"
                            : "opacity-100"
                    }`}>
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-full flex flex-col relative">
                        {/* Card image container */}
                        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl p-4">
                            <img
                                src={
                                    card.images?.large ||
                                    card.images?.small ||
                                    placeholderCard
                                }
                                alt={card.name || "Pokemon card"}
                                className="max-h-[280px] w-auto object-contain"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.nextSibling.style.display = "flex";
                                }}
                            />
                        </div>
                        
                        {/* Card information section */}
                        <div className="p-4 flex flex-col items-center">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center truncate">
                                {card.name || "Unknown Pokemon"}
                            </h3>

                            {/* Pokeball icon in bottom-left corner */}
                            <div className="absolute bottom-3 left-3">
                                <img 
                                    src={pokeball} 
                                    alt="Pokeball" 
                                    className="w-8 h-8 opacity-70 hover:opacity-100 transition-opacity duration-200"
                                />
                            </div>
                            
                            {/* Flip button to view details */}
                            <button
                                onClick={handleFlip}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 flex items-center">
                                View Details
                                <span className="ml-1">→</span>
                            </button>
                        </div>
                        
                        {/* Pokemon badge in top-right corner */}
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            Pokemon
                        </div>
                    </div>
                </div>

                {/* Back of Card - Detailed information */}
                <div
                    className={`absolute w-full h-full transition-all duration-500 ${
                        flipped
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                    }`}>
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
                        {/* Card details content */}
                        <div className="flex-1 flex flex-col justify-center items-center p-6 w-full">
                            {/* Card name with star icon */}
                            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center flex items-center gap-2">
                                <span className="inline-block text-yellow-400 text-2xl">
                                    ★
                                </span>
                                {card.name || "Unknown Pokemon"}
                            </h3>
                            
                            {/* Card description/flavor text */}
                            <div className="w-full max-w-xs bg-gradient-to-br from-yellow-100 via-red-50 to-blue-100 border-2 border-yellow-300 rounded-lg shadow-inner p-4 mb-6">
                                <p className="text-gray-800 text-base text-center leading-relaxed font-medium italic">
                                    {card.flavorText ||
                                        card.text?.[0] ||
                                        "No description available for this card."}
                                </p>
                            </div>
                            
                            {/* Card metadata badges */}
                            <div className="text-xs text-gray-700 space-y-2 text-center w-full max-w-xs">
                                {/* Rarity information */}
                                {card.rarity && (
                                    <div className="bg-gradient-to-r from-yellow-300 to-red-300 px-3 py-1 rounded text-white font-semibold shadow">
                                        Rarity:{" "}
                                        <span className="font-normal">
                                            {card.rarity}
                                        </span>
                                    </div>
                                )}
                                
                                {/* Set information */}
                                {card.set && card.set.name && (
                                    <div className="bg-gradient-to-r from-blue-400 to-purple-400 px-3 py-1 rounded text-white font-semibold shadow">
                                        Set:{" "}
                                        <span className="font-normal">
                                            {card.set.name}
                                        </span>
                                    </div>
                                )}
                                
                                {/* Artist information */}
                                {card.artist && (
                                    <div className="bg-gradient-to-r from-gray-300 to-gray-400 px-3 py-1 rounded text-gray-800 font-semibold shadow">
                                        Artist:{" "}
                                        <span className="font-normal">
                                            {card.artist}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Back button to return to front */}
                        <div className="p-4 flex justify-center">
                            <button
                                onClick={handleFlip}
                                className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow hover:from-yellow-500 hover:to-red-600 transition-colors duration-200 flex items-center">
                                ← Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardItem;
