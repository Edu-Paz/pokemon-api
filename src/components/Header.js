import logo from "../assets/pokemon-logo.png";

/**
 * Header component that displays the application logo and title.
 * Provides a visual identity for the Pokédex app.
 */
function Header() {
    return (
        <header className="relative z-20 py-20 px-4">
            <div className="flex flex-col items-center">
                {/* Logo with hover effect */}
                <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
                    <img 
                        src={logo} 
                        alt="Pokemon Logo" 
                        className="h-20 sm:h-24 drop-shadow-2xl filter brightness-110" 
                    />
                </div>
                
                {/* App title and subtitle */}
                <div className="text-center">
                    <h1
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl tracking-tight"
                        style={{ fontFamily: "'Fredoka', sans-serif" }}
                    >
                        Pokédex
                    </h1>
                    <p className="text-white/95 text-lg sm:text-xl font-medium drop-shadow-lg max-w-2xl mx-auto">
                        Discover and explore the world of Pokémon cards
                    </p>
                </div>
            </div>
        </header>
    );
}

export default Header;
