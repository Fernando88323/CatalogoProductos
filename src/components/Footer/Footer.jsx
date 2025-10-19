import React from "react";
import { FaShoppingCart, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const facebookUrl =
    "https://www.facebook.com/jesydaniela?rdid=KQ5R4w7U7GpXEET2&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CMAX7u5tS%2F#";
  const instagramUrl =
    "https://www.instagram.com/jesygbarrera/?utm_source=qr&igsh=MXZsOGlsbGdudmh2bw%3D%3D#";

  const openSocialMedia = (platform) => {
    let url = "";
    switch (platform) {
      case "facebook":
        url = facebookUrl;
        break;
      case "instagram":
        url = instagramUrl;
        break;
      default:
        return;
    }
    window.open(url, "_blank");
  };

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Sección Logo y Descripción */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <FaShoppingCart className="text-white" />
              </div>
              <h3 className="font-bold text-xl text-purple-400">Jesé Shop</h3>
            </div>
            <p className="text-gray-400 text-justify text-sm leading-relaxed">
              Es un catálogo de productos con variedad de artículos donde puedes
              buscar por categorías, ver detalles y contactar vía WhatsApp para
              más información.
            </p>
          </div>

          {/* Sección Compra */}
          {/* <div>
            <h3 className="font-bold text-xl mb-4 text-purple-400">Compra</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cómo Comprar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Métodos de Pago
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Envíos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Devoluciones
                </a>
              </li>
            </ul>
          </div> */}

          {/* Sección Ayuda */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-purple-400">Ayuda</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📧 barrerajesica97@gmail.com</li>
              <li>📱 +503 7370-7035</li>
              <li>⏰ Todos los días</li>
              <li>📍 Sonsonate, El Salvador</li>
            </ul>
          </div>

          {/* Sección Redes Sociales */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-purple-400">Síguenos</h3>
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => openSocialMedia("facebook")}
                className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors transform hover:scale-110 cursor-pointer"
                aria-label="Visitar Facebook"
              >
                <FaFacebook />
              </button>
              <button
                onClick={() => openSocialMedia("instagram")}
                className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors transform hover:scale-110 cursor-pointer"
                aria-label="Visitar Instagram"
              >
                <FaInstagram />
              </button>
            </div>
            <p className="text-gray-400 text-justify text-sm">
              Mantente al día con todos los productos que se irán agregando
              próximamente.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 Jesé Shop - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
