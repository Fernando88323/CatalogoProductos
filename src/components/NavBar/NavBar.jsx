import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaWhatsapp,
  FaShoppingCart,
  FaUserShield,
  FaHome,
  FaExternalLinkAlt,
  FaBars,
} from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";

const NavBar = ({
  showBackButton = false,
  showAdminButton = true,
  onWhatsAppClick,
}) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleAdminClick = () => {
    navigate("/admin/login");
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <header className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-3">
            {/* Left side - Menu + Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Hamburger Menu - Solo en móvil */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden flex items-center justify-center w-9 h-9 hover:bg-purple-50 rounded-full transition-colors"
                aria-label="Abrir menú"
              >
                <FaBars className="text-purple-600 text-xl" />
              </button>

              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                <FaShoppingCart className="text-white text-lg sm:text-xl" />
              </div>
              <h1 className="text-lg sm:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 whitespace-nowrap">
                Jesé Shop
              </h1>
            </div>

            {/* Right side - Actions - Solo visible en desktop */}
            <div className="hidden md:flex items-center gap-2 sm:gap-3">
              {/* Catálogo Externo */}
              <a
                href="https://catalogodigital.somosbelcorp.com/SV?consultant=MDUxNjEyNg=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 sm:px-4 h-9 sm:h-10 rounded-full hover:shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold text-sm flex-shrink-0"
                title="Catálogo Digital Belcorp"
              >
                <FaExternalLinkAlt className="text-base sm:text-lg" />
                <span className="hidden xl:inline">Catálogo</span>
              </a>

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
    </>
  );
};

export default NavBar;
