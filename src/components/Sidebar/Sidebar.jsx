import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaWhatsapp,
  // FaHeart,
  FaTimes,
  FaInstagram,
  FaFacebook,
  FaUserShield,
  FaShoppingBag,
  FaExternalLinkAlt,
  FaBox,
} from "react-icons/fa";
import { MdOutlineSchedule } from "react-icons/md";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Bloquear scroll del body cuando el sidebar está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup al desmontar el componente
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const whatsappNumber = "73707035";

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
      path: "/",
      action: () => handleNavigation("/"),
      color: "text-purple-600",
    },
    /*     {
      icon: FaWhatsapp,
      label: "WhatsApp",
      action: handleWhatsApp,
      color: "text-green-600",
    }, */
    {
      icon: FaBox,
      label: "Productos",
      path: "/products",
      action: () => handleNavigation("/products"),
      color: "text-blue-600",
    },
    /*     {
      icon: FaHeart,
      label: "Favoritos",
      path: "/favoritos",
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
              <p className="text-sm text-white/80">Catálogo online</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.instagram.com/jesygbarrera/?utm_source=qr&igsh=MXZsOGlsbGdudmh2bw%3D%3D#"
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
              href="https://www.facebook.com/jesydaniela?rdid=KQ5R4w7U7GpXEET2&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CMAX7u5tS%2F#"
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
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              // Obtener el color base del item (purple, blue, red, etc.)
              const colorBase = item.color
                .replace("text-", "")
                .replace("-600", "");

              return (
                <button
                  key={index}
                  onClick={item.action}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                    isActive
                      ? `bg-gradient-to-r from-${colorBase}-50 to-${colorBase}-50 border border-${colorBase}-200 hover:shadow-md`
                      : "hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50"
                  }`}
                >
                  <item.icon
                    className={`text-xl ${item.color} group-hover:scale-110 transition-transform`}
                  />
                  <span
                    className={`font-medium ${
                      isActive
                        ? "text-gray-800 font-semibold"
                        : "text-gray-800 group-hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
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
            {(() => {
              const isAdminActive = location.pathname.startsWith("/admin");
              return (
                <button
                  onClick={() => handleNavigation("/admin/login")}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left group ${
                    isAdminActive
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-md"
                      : "hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50"
                  }`}
                >
                  <FaUserShield className="text-blue-600 text-lg group-hover:scale-110 transition-transform" />
                  <span className="text-gray-800 text-sm font-semibold">
                    Panel Admin
                  </span>
                </button>
              );
            })()}
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t mt-auto">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
            {/* <p className="text-xs text-gray-600 mb-2 font-semibold">
              📞 Contacto
            </p>
            <p className="text-sm text-gray-700">WhatsApp: {whatsappNumber}</p> */}

            <p className="text-sm text-gray-700 flex items-center gap-1">
              <MdOutlineSchedule className="text-lg" />
              Horarios de Atención
            </p>

            <p className="text-xs text-gray-500 mt-2">
              Lunes - Sábado: 9:00 AM - 6:00 PM
            </p>
            <p className="text-xs text-gray-500 mt-2">Domingo: Cerrado</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
