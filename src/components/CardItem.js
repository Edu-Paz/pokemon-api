function CardItem({ card }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <img 
                    src={card.images?.small || '/placeholder-card.png'} 
                    alt={card.name || 'Pokemon card'}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
                <div className="hidden text-gray-500 text-sm font-medium">
                    {card.name || 'Pokemon'}
                </div>
            </div>
            
            <p className="text-center text-sm font-semibold text-gray-800">
                {card.name || 'Unknown Pokemon'}
            </p>
        </div>
    );
}

export default CardItem;
