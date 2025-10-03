import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logoOficial.jpg"; // Asegúrate de tener un logo en esta ruta

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-30 bg-white text-black shadow-lg">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Mi Tienda" className="h-8 w-auto" />
              <span className="text-black font-bold text-lg md:text-xl">
                Jesé Shop
              </span>
            </Link>
          </div>

          {/* Links de navegación - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-black font-semibold hover:text-blue-500 transition-colors duration-200"
            >
              Inicio
            </Link>
            <Link
              to="/admin/dashboard"
              className="text-black font-semibold hover:text-blue-500 transition-colors duration-200"
            >
              Catálogo
            </Link>
            <Link
              to="/contacto"
              className="text-black font-semibold hover:text-blue-500 transition-colors duration-200"
            >
              Contacto
            </Link>
            <Link
              to="/admin/login"
              className="block px-3 py-2 font-semibold text-black hover:text-blue-500 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </div>

          {/* Botón hamburguesa - Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none transition-colors duration-200"
              aria-label="Abrir menú"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-64 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="py-2 space-y-1 border-t border-gray-500">
            <Link
              to="/"
              className="block px-3 py-2 text-black font-semibold hover:text-blue-500 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/admin/dashboard"
              className="block px-3 py-2 text-black font-semibold hover:text-blue-500 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Catálogo
            </Link>
            <Link
              to="/contacto"
              className="block px-3 py-2 text-black font-semibold hover:text-blue-500 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
            <Link
              to="/admin/login"
              className="block px-3 py-2 text-black font-semibold hover:text-blue-500 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
