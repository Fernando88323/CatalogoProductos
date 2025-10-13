import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaHeart,
  FaUser,
  FaWhatsapp,
  FaBox,
  FaEllipsisH,
  FaTimes,
  FaUserShield,
  FaExternalLinkAlt,
} from "react-icons/fa";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const whatsappNumber = "50373707035";

  const navItems = [
    { icon: FaHome, label: "Inicio", path: "/", color: "text-purple-600" },
    {
      icon: FaBox,
      label: "Productos",
      path: "/",
      color: "text-blue-600",
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      action: "whatsapp",
      color: "text-green-600",
    },
    {
      icon: FaEllipsisH,
      label: "Más",
      action: "more",
      color: "text-gray-600",
    },
  ];

  const moreMenuItems = [
    {
      icon: FaSearch,
      label: "Buscar Productos",
      action: "search",
      color: "text-blue-600",
    },
    {
      icon: FaExternalLinkAlt,
      label: "Catálogo Belcorp",
      action: "belcorp",
      color: "text-purple-600",
    },
    {
      icon: FaUserShield,
      label: "Panel Admin",
      path: "/admin/login",
      color: "text-indigo-600",
    },
  ];

  const handleAction = (item) => {
    if (item.action === "whatsapp") {
      const message = "Hola! Estoy interesado en sus productos";
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(url, "_blank");
    } else if (item.action === "search") {
      const searchInput = document.querySelector(
        'input[type="text"][placeholder*="Buscar"]'
      );
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setShowMoreMenu(false);
    } else if (item.action === "belcorp") {
      window.open(
        "https://catalogodigital.somosbelcorp.com/SV?consultant=MDUxNjEyNg==",
        "_blank"
      );
      setShowMoreMenu(false);
    } else if (item.action === "more") {
      setShowMoreMenu(!showMoreMenu);
    } else if (item.path) {
      navigate(item.path);
      setShowMoreMenu(false);
    }
  };

  const isActive = (path) => {
    if (!path) return false;
    return location.pathname === path;
  };

  return (
    <>
      {/* More Menu Overlay */}
      {showMoreMenu && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setShowMoreMenu(false)}
        />
      )}

      {/* More Menu */}
      <div
        className={`md:hidden fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40 transition-all duration-300 ease-in-out ${
          showMoreMenu
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-700">Más Opciones</h3>
            <button
              onClick={() => setShowMoreMenu(false)}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
          <div className="space-y-2">
            {moreMenuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleAction(item)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 text-left group"
                >
                  <Icon
                    className={`text-lg ${item.color} group-hover:scale-110 transition-transform`}
                  />
                  <span className="text-gray-800 font-medium group-hover:text-gray-900 text-sm">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Contact Info */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-xl">
              <p className="text-xs text-gray-600 mb-1 font-semibold">
                📞 Contacto
              </p>
              <p className="text-sm text-gray-700 font-medium">
                WhatsApp: {whatsappNumber}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Lun - Sab: 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="flex justify-around items-center px-2 py-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={index}
                onClick={() => handleAction(item)}
                className={`flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-lg transition-all duration-200 ${
                  active
                    ? "text-purple-600 bg-purple-50"
                    : item.action === "more"
                    ? showMoreMenu
                      ? "text-purple-600 bg-purple-50"
                      : "text-gray-600 hover:bg-gray-50"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon
                  className={`text-xl mb-1 ${
                    active || (item.action === "more" && showMoreMenu)
                      ? "scale-110"
                      : ""
                  } transition-transform`}
                />
                <span
                  className={`text-[10px] font-medium ${
                    active || (item.action === "more" && showMoreMenu)
                      ? "font-bold"
                      : ""
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Safe area spacing for iOS devices */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </>
  );
};

export default BottomNav;
