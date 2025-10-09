import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product, index, getProductImage, getProductRating }) => {
  // En móviles, hacer visibles las tarjetas de inmediato
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [isVisible, setIsVisible] = useState(isMobile); // Visible inmediatamente en móvil
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    // Si ya es visible (móvil), no necesitamos el observer
    if (isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.01, // Reducido para mejor detección
        rootMargin: "100px 0px 100px 0px", // Margen muy amplio para pre-cargar
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
    console.error(`Error loading image for product: ${product.nombre}`);
  };

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
      {/* Imagen del producto */}
      <div className="relative overflow-hidden bg-gray-50 h-56 sm:h-64 flex items-center justify-center">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        )}

        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <span className="text-xs">Sin imagen</span>
          </div>
        )}

        <img
          src={getProductImage(product)}
          alt={product.nombre}
          className={`w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="eager"
          decoding="async"
        />

        {/* Badge de agotado */}
        {product.stock === 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg z-10">
            Agotado
          </div>
        )}

        {/* Badge de stock bajo */}
        {product.stock > 0 && product.stock <= 5 && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg z-10">
            ¡Últimas {product.stock}!
          </div>
        )}

        {/* Overlay con botón rápido - solo en desktop */}
        {/* <div className="hidden sm:flex absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end justify-center pb-6">
          <span className="bg-white text-purple-600 px-6 py-2.5 rounded-full font-bold text-sm shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
            👉 Ver Detalle
          </span>
        </div> */}
      </div>

      {/* Información del producto */}
      <div className="p-3 sm:p-5">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-xs sm:text-sm ${
                i < Math.floor(getProductRating())
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs sm:text-sm text-gray-600 ml-1 sm:ml-2">
            ({getProductRating()})
          </span>
        </div>

        {/* Título */}
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 transition-colors line-clamp-2 min-h-[3rem]">
          {product.nombre}
        </h3>

        {/* Categoría */}
        {product.categoria_nombre && (
          <span className="inline-block text-[10px] sm:text-xs bg-purple-100 text-purple-600 px-2 py-0.5 sm:py-1 rounded-full mb-2 sm:mb-3 font-medium">
            {product.categoria_nombre}
          </span>
        )}

        {/* Precio */}
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <span className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            ${parseFloat(product.precio || 0).toFixed(2)}
          </span>
        </div>

        {/* Botones de acción - Stack en móvil, row en desktop */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            Ver Detalle
          </Link>
          {/*   <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openWhatsApp(product.nombre, product.precio);
            }}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            <FaWhatsapp className="text-base sm:text-lg" />
            {product.stock === 0 ? "Consultar" : "Comprar"}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
