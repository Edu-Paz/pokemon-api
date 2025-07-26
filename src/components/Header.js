import logo from "../assets/pokemon-logo.png";

function Header() {
    return (
        <header className="relative overflow-hidden">
            {/* Background with animated gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 animate-pulse"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-300/20 rounded-full blur-lg"></div>
                <div className="absolute bottom-4 left-1/4 w-20 h-20 bg-red-400/15 rounded-full blur-xl"></div>
            </div>
            
            <div className="relative z-10 py-12 px-4 flex flex-col items-center">
                <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg"></div>
                        <img 
                            src={logo} 
                            alt="Pokemon Logo" 
                            className="relative h-16 sm:h-20 drop-shadow-2xl" 
                        />
                    </div>
                </div>
                
                <div className="text-center">
                    <h1
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-3 drop-shadow-2xl tracking-tight"
                        style={{ fontFamily: "'Fredoka', sans-serif" }}
                    >
                        Pokédex
                    </h1>
                    <p className="text-white/90 text-lg sm:text-xl font-medium drop-shadow-lg">
                        Discover and explore the world of Pokémon cards
                    </p>
                </div>
                
                {/* Decorative bottom wave */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-blue-50"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-blue-50"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-blue-50"></path>
                    </svg>
                </div>
            </div>
        </header>
    );
}

export default Header;
