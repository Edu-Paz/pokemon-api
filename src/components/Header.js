import logo from "../assets/pokemon-logo.png";

function Header() {
    return (
        <header className="py-8 bg-gradient-to-r from-yellow-300 via-red-400 to-blue-400 shadow-lg pb-8 flex flex-col items-center">
            <img src={logo} alt="Pokemon Logo" className="h-12 mb-2 drop-shadow-lg" />
            <h1
                className="text-4xl font-bold text-white drop-shadow-lg"
                style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
                Pokedex
            </h1>
        </header>
    );
}

export default Header;
