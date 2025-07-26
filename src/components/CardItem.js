import React, { useState } from "react";
import placeholderCard from "../assets/placeholder-card.png";
import pokeball from "../assets/pokeball.png";

<<<<<<< HEAD
function CardItem({ card, index }) {
    return (
        <div 
            className="group relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 overflow-hidden border border-white/20"
            style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
            }}
        >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Card image container */}
            <div className="relative p-6 pb-4">
                <div className="relative w-full h-64 bg-gradient-to-br from-white/80 to-gray-50/80 rounded-2xl mb-4 flex items-center justify-center overflow-hidden shadow-inner backdrop-blur-sm">
                    {/* Decorative background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-2 left-2 w-4 h-4 bg-blue-400 rounded-full"></div>
                        <div className="absolute top-4 right-4 w-3 h-3 bg-purple-400 rounded-full"></div>
                        <div className="absolute bottom-4 left-4 w-2 h-2 bg-pink-400 rounded-full"></div>
                        <div className="absolute bottom-2 right-2 w-5 h-5 bg-yellow-400 rounded-full"></div>
                    </div>
                    
                    <img
                        src={card.images?.small || placeholderCard}
                        alt={card.name || "Pokemon card"}
                        className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                        }}
                    />
                    <div className="hidden absolute inset-0 flex items-center justify-center text-gray-500 text-lg font-bold bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-sm">{card.name || "Pokemon"}</p>
                        </div>
                    </div>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000 ease-out"></div>
                </div>
                
                {/* Card name */}
                <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {card.name || "Unknown Pokemon"}
                    </h3>
                    
                    {/* Card type badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        Trading Card
                    </div>
                </div>
            </div>
            
            {/* Hover overlay with additional info */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-medium text-center">
                    Click to view details
                </p>
            </div>
=======
function CardItem({ card }) {
    const [flipped, setFlipped] = useState(false);

    // Function to handle card flip
    function handleFlip() {
        setFlipped((prev) => !prev);
    }

    return (
        <div className="w-full h-[480px]">
            <div className="relative w-full h-full">
                {/* Front of Card */}
                <div
                    className={`absolute w-full h-full transition-all duration-500 ${
                        flipped
                            ? "opacity-0 pointer-events-none"
                            : "opacity-100"
                    }`}>
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-full flex flex-col relative">
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
                        <div className="p-4 flex flex-col items-center">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center truncate">
                                {card.name || "Unknown Pokemon"}
                            </h3>

                            <div className="absolute bottom-3 left-3">
                                <img 
                                    src={pokeball} 
                                    alt="Pokeball" 
                                    className="w-8 h-8 opacity-70 hover:opacity-100 transition-opacity duration-200"
                                />
                            </div>
                            
                            <button
                                onClick={handleFlip}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 flex items-center">
                                View Details
                                <span className="ml-1">→</span>
                            </button>
                        </div>
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            Pokemon
                        </div>
                    </div>
                </div>

                {/* Back of Card */}
                <div
                    className={`absolute w-full h-full transition-all duration-500 ${
                        flipped
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                    }`}>
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
                        <div className="flex-1 flex flex-col justify-center items-center p-6 w-full">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center flex items-center gap-2">
                                <span className="inline-block text-yellow-400 text-2xl">
                                    ★
                                </span>
                                {card.name || "Unknown Pokemon"}
                            </h3>
                            <div className="w-full max-w-xs bg-gradient-to-br from-yellow-100 via-red-50 to-blue-100 border-2 border-yellow-300 rounded-lg shadow-inner p-4 mb-6">
                                <p className="text-gray-800 text-base text-center leading-relaxed font-medium italic">
                                    {card.flavorText ||
                                        card.text?.[0] ||
                                        "No description available for this card."}
                                </p>
                            </div>
                            <div className="text-xs text-gray-700 space-y-2 text-center w-full max-w-xs">
                                {card.rarity && (
                                    <div className="bg-gradient-to-r from-yellow-300 to-red-300 px-3 py-1 rounded text-white font-semibold shadow">
                                        Rarity:{" "}
                                        <span className="font-normal">
                                            {card.rarity}
                                        </span>
                                    </div>
                                )}
                                {card.set && card.set.name && (
                                    <div className="bg-gradient-to-r from-blue-400 to-purple-400 px-3 py-1 rounded text-white font-semibold shadow">
                                        Set:{" "}
                                        <span className="font-normal">
                                            {card.set.name}
                                        </span>
                                    </div>
                                )}
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
>>>>>>> feat/card-visual-enhancement
        </div>
    );
}

export default CardItem;
