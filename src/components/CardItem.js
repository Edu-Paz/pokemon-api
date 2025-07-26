function CardItem({ card }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-4">
                <img 
                    src={card.images?.small || '/placeholder-card.png'} 
                    alt={card.name || 'Pokemon card'}
                    className="w-full h-auto rounded-lg"
                    onError={(e) => {
                        e.target.src = '/placeholder-card.png';
                    }}
                />
                <h3 className="text-center mt-3 text-lg font-semibold text-gray-800">
                    {card.name || 'Unknown Pokemon'}
                </h3>
            </div>
        </div>
    );
}

export default CardItem;
