import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaHeart, FaStar } from "react-icons/fa";

const ProductCard = ({
  product,
  index,
  favorites,
  toggleFavorite,
  openWhatsApp,
  getProductImage,
  getProductRating,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      {/* Imagen del producto - Enlace al detalle */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={getProductImage(product)}
            alt={product.nombre}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badge de stock bajo */}
          {product.stock > 0 && product.stock <= 5 && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              ¡Últimas {product.stock} unidades!
            </div>
          )}

          {/* Overlay con botón rápido */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white text-purple-600 px-6 py-3 rounded-full font-bold transform scale-90 group-hover:scale-100 transition-transform">
              Ver Detalle
            </span>
          </div>
        </div>
      </Link>

      {/* Botón de favorito - Separado del enlace */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(product.id);
        }}
        className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
      >
        <FaHeart
          className={`text-xl ${
            favorites.includes(product.id) ? "text-pink-500" : "text-gray-400"
          } transition-colors`}
        />
      </button>

      {/* Información del producto */}
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-sm ${
                i < Math.floor(getProductRating())
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">
            ({getProductRating()})
          </span>
        </div>

        {/* Título clicable */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2 cursor-pointer">
            {product.nombre}
          </h3>
        </Link>

        {/* Categoría */}
        {product.categoria_nombre && (
          <span className="inline-block text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full mb-3">
            {product.categoria_nombre}
          </span>
        )}

        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            ${parseFloat(product.precio || 0).toFixed(2)}
          </span>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
          >
            Ver Detalle
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openWhatsApp(product.nombre, product.precio);
            }}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
          >
            <FaWhatsapp className="text-lg" />
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
