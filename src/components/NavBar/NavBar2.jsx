import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaWhatsapp,
  FaShoppingCart,
  FaHeart,
  FaArrowLeft,
  FaUserShield,
  FaHome,
} from "react-icons/fa";

const NavBar2 = ({
  favorites = [],
  showBackButton = false,
  showAdminButton = true,
  onWhatsAppClick,
  onFavoriteClick,
}) => {
  const navigate = useNavigate();

  const whatsappNumber = "50373707035";

  const handleWhatsApp = () => {
    if (onWhatsAppClick) {
      onWhatsAppClick();
    } else {
      const message = "Hola! Estoy interesado en sus productos";
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(url, "_blank");
    }
  };

  const handleFavorite = () => {
    if (onFavoriteClick) {
      onFavoriteClick();
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleAdminClick = () => {
    navigate("/admin/login");
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center gap-3">
          {/* Left side - Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
              <FaShoppingCart className="text-white text-lg sm:text-xl" />
            </div>
            <h1 className="text-lg sm:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 whitespace-nowrap">
              Mi Catálogo
            </h1>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Favoritos */}
            <button
              onClick={handleFavorite}
              className="relative group w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
              title="Favoritos"
            >
              <FaHeart className="text-xl sm:text-2xl text-gray-600 group-hover:text-pink-500 transition-colors" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-md font-bold">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Inicio */}
            <button
              onClick={handleHomeClick}
              className="flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 sm:px-4 h-9 sm:h-10 rounded-full hover:shadow-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-sm flex-shrink-0"
              title="Volver al Inicio"
            >
              <FaHome className="text-base sm:text-lg" />
              <span className="hidden sm:inline">Inicio</span>
            </button>

            {/* Admin */}
            {showAdminButton && (
              <button
                onClick={handleAdminClick}
                className="flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-4 h-9 sm:h-10 rounded-full hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-sm flex-shrink-0"
                title="Panel de Administración"
              >
                <FaUserShield className="text-base sm:text-lg" />
                <span className="hidden lg:inline">Admin</span>
              </button>
            )}

            {/* WhatsApp */}
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 sm:px-5 h-9 sm:h-10 rounded-full hover:shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold text-sm flex-shrink-0"
              title="Contactar por WhatsApp"
            >
              <FaWhatsapp className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Contactar</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar2;
