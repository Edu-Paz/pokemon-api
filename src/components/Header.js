import logo from "../assets/pokemon-logo.png";

function Header() {
    return (
        <header className="relative overflow-hidden z-20">
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
            
            <div className="relative z-10 py-16 px-4 flex flex-col items-center">
                <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/30 rounded-2xl blur-lg"></div>
                        <img 
                            src={logo} 
                            alt="Pokemon Logo" 
                            className="relative h-20 sm:h-24 drop-shadow-2xl" 
                        />
                    </div>
                </div>
                
                <div className="text-center">
                    <h1
                        className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-4 drop-shadow-2xl tracking-tight"
                        style={{ fontFamily: "'Fredoka', sans-serif" }}
                    >
                        Pokédex
                    </h1>
                    <p className="text-white/95 text-xl sm:text-2xl font-medium drop-shadow-lg">
                        Discover and explore the world of Pokémon cards
                    </p>
                </div>
            </div>
        </header>
    );
}

export default Header;
