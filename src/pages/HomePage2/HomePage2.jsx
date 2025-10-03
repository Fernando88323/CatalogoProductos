import React, { useState } from "react";
import {
  FaWhatsapp,
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaSearch,
  FaFilter,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaShippingFast,
  FaShieldAlt,
  FaTags,
} from "react-icons/fa";

const HomePage2 = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const products = [
    {
      id: 1,
      name: "Zapatos Deportivos",
      price: 59.99,
      image:
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      category: "Calzado",
      rating: 4.5,
      discount: 15,
    },
    {
      id: 2,
      name: "Reloj Clásico",
      price: 120.0,
      image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
      category: "Accesorios",
      rating: 5,
      discount: 0,
    },
    {
      id: 3,
      name: "Bolso Elegante",
      price: 75.0,
      image:
        "https://images.pexels.com/photos/5418938/pexels-photo-5418938.jpeg",
      category: "Bolsos",
      rating: 4.8,
      discount: 20,
    },
    {
      id: 4,
      name: "Auriculares Inalámbricos",
      price: 89.99,
      image: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg",
      category: "Tecnología",
      rating: 4.7,
      discount: 10,
    },
  ];

  const categories = ["Todos", "Calzado", "Accesorios", "Bolsos", "Tecnología"];

  const whatsappNumber = "50373707035";

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const openWhatsApp = (productName = "", productPrice = "") => {
    let message = "Hola! Estoy interesado en sus productos";
    if (productName) {
      message = `Hola! Me interesa el producto: *${productName}* ($${productPrice}). ¿Está disponible?`;
    }
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "Todos" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header mejorado */}
      <header className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <FaShoppingCart className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Mi Catálogo
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative group">
                <FaHeart className="text-2xl text-gray-600 hover:text-pink-500 transition-colors" />
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {favorites.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => openWhatsApp()}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
              >
                <FaWhatsapp className="text-xl" />
                <span className="hidden sm:inline">Contactar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero mejorado */}
      <section className="relative text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] animate-gradient"></div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30 animate-bounce">
            ✨ Nuevos Productos Disponibles
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-2xl">
            Encuentra lo que buscas
          </h2>

          <p className="text-xl md:text-2xl mb-8 text-white/90 font-light max-w-2xl mx-auto">
            Explora nuestra colección de productos destacados con los mejores
            precios
          </p>

          {/* Beneficios rápidos */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <FaShippingFast className="text-xl" />
              <span>Envío Rápido</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <FaShieldAlt className="text-xl" />
              <span>Compra Segura</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <FaTags className="text-xl" />
              <span>Mejores Precios</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros por categoría y búsqueda */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            {/* Título y categorías */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <FaFilter className="text-purple-600 text-xl" />
                <h3 className="font-bold text-lg text-gray-800">Categorías</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Barra de búsqueda compacta */}
            <div className="lg:w-80">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 pr-10 rounded-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 border-2 border-gray-200 focus:border-purple-400 transition-all"
                />
                <FaSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg font-bold transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de productos mejorado */}
      <main className="max-w-7xl mx-auto p-6 md:p-10">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            Productos Destacados
          </h2>
          <p className="text-gray-600">
            {filteredProducts.length} productos encontrados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Imagen del producto */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badge de descuento */}
                {product.discount > 0 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    -{product.discount}%
                  </div>
                )}

                {/* Botón de favorito */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <FaHeart
                    className={`text-xl ${
                      favorites.includes(product.id)
                        ? "text-pink-500"
                        : "text-gray-400"
                    } transition-colors`}
                  />
                </button>

                {/* Overlay con botón rápido */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-bold transform scale-90 group-hover:scale-100 transition-transform">
                    Vista Rápida
                  </button>
                </div>
              </div>

              {/* Información del producto */}
              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    ({product.rating})
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  {product.discount > 0 && (
                    <span className="text-gray-400 line-through text-sm">
                      $
                      {(product.price / (1 - product.discount / 100)).toFixed(
                        2
                      )}
                    </span>
                  )}
                  <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    ${product.price}
                  </span>
                </div>

                <button
                  onClick={() => openWhatsApp(product.name, product.price)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-xl" />
                  Comprar por WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-600">
              Intenta con otra búsqueda o categoría
            </p>
          </div>
        )}
      </main>

      {/* Footer mejorado */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <FaShoppingCart className="text-white" />
                </div>
                <h3 className="font-bold text-xl text-purple-400">
                  Mi Catálogo
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tu tienda online de confianza con los mejores productos y
                precios del mercado.
              </p>
            </div>

            <div>
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
            </div>

            <div>
              <h3 className="font-bold text-xl mb-4 text-purple-400">Ayuda</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📧 soporte@catalogo.com</li>
                <li>📱 +1 234 567 890</li>
                <li>⏰ Lun - Vie: 9am - 6pm</li>
                <li>📍 Tu Ciudad, País</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-4 text-purple-400">
                Síguenos
              </h3>
              <div className="flex gap-3 mb-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors transform hover:scale-110"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors transform hover:scale-110"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors transform hover:scale-110"
                >
                  <FaTwitter />
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                Mantente al día con nuestras últimas ofertas
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Mi Catálogo - Todos los derechos reservados</p>
            <p className="mt-2">Hecho con ❤️ para nuestros clientes</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage2;
