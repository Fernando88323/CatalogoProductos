import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaWhatsapp,
  // FaHeart,
  FaSearch,
  FaTimes,
  FaInstagram,
  FaFacebook,
  FaUserShield,
  FaShoppingBag,
  FaUserCircle,
  FaExternalLinkAlt,
  FaBox,
} from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const whatsappNumber = "50373707035";

  const handleWhatsApp = () => {
    const message = "Hola! Estoy interesado en sus productos";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
    onClose();
  };

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const menuItems = [
    {
      icon: FaHome,
      label: "Inicio",
      action: () => handleNavigation("/"),
      color: "text-purple-600",
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      action: handleWhatsApp,
      color: "text-green-600",
    },
    {
      icon: FaBox,
      label: "Productos",
      action: () => handleNavigation("/"),
      color: "text-blue-600",
    },
    /*     {
      icon: FaHeart,
      label: "Favoritos",
      action: () => handleNavigation("/favoritos"),
      color: "text-red-600",
    }, */
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/90 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
            aria-label="Cerrar menú"
          >
            <FaTimes className="text-xl" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <FaShoppingBag className="text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Jesé Shop</h2>
              <p className="text-sm text-white/80">Tu tienda online</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
              aria-label="Instagram"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="text-xl" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
              aria-label="Facebook"
            >
              <FaFacebook className="text-xl" />
            </a>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
            Navegación
          </h3>
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 text-left group"
              >
                <item.icon
                  className={`text-xl ${item.color} group-hover:scale-110 transition-transform`}
                />
                <span className="text-gray-800 font-medium group-hover:text-gray-900">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Enlaces Rápidos */}
        <div className="p-4 border-t">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
            Enlaces Rápidos
          </h3>
          <div className="space-y-1">
            <a
              href="https://catalogodigital.somosbelcorp.com/SV?consultant=MDUxNjEyNg=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-all text-left group"
            >
              <FaExternalLinkAlt className="text-purple-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-800 text-sm font-medium">
                Catálogo Belcorp
              </span>
            </a>
          </div>
        </div>

        {/* Acceso Admin */}
        <div className="p-4 border-t">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
            Administración
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => handleNavigation("/admin/login")}
              className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:shadow-md transition-all text-left group"
            >
              <FaUserShield className="text-blue-600 text-lg group-hover:scale-110 transition-transform" />
              <span className="text-gray-800 text-sm font-semibold">
                Panel Admin
              </span>
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t mt-auto">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
            <p className="text-xs text-gray-600 mb-2 font-semibold">
              📞 Contacto
            </p>
            <p className="text-sm text-gray-700">WhatsApp: {whatsappNumber}</p>
            <p className="text-xs text-gray-500 mt-2">
              Lun - Sab: 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
