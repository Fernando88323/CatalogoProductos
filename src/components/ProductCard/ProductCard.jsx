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
      className={`group bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionDelay: `${index * 0.05}s`,
      }}
    >
      {/* Imagen del producto */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 h-48 sm:h-56 md:h-64 flex items-center justify-center">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        )}

        {imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <FaStar className="text-4xl mb-2" />
            <span className="text-xs">Sin imagen</span>
          </div>
        )}

        <img
          src={getProductImage(product)}
          alt={product.nombre}
          className={`w-full h-full object-contain p-3 sm:p-4 group-hover:scale-110 transition-transform duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="eager"
          decoding="async"
        />

        {/* Badge de agotado */}
        {product.stock === 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10 animate-pulse">
            Agotado
          </div>
        )}

        {/* Badge de stock bajo */}
        {product.stock > 0 && product.stock <= 5 && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
            ¡Solo {product.stock}!
          </div>
        )}

        {/* Badge de stock normal */}
        {product.stock > 5 && product.stock <= 20 && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold shadow-md z-10">
            Stock: {product.stock}
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="p-3 sm:p-4">
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
        <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] group-hover:text-purple-600 transition-colors">
          {product.nombre}
        </h3>

        {/* Categoría */}
        {product.categoria_nombre && (
          <span className="inline-block text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded-full mb-2 sm:mb-3 font-medium">
            {product.categoria_nombre}
          </span>
        )}

        {/* Precio */}
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
          <span className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            ${parseFloat(product.precio || 0).toFixed(2)}
          </span>
          {product.stock > 0 && product.stock <= 10 && (
            <span className="text-xs text-orange-600 font-semibold">
              {product.stock} disponibles
            </span>
          )}
        </div>

        {/* Botón de acción */}
        <div className="mt-auto">
          <Link
            to={`/product/${product.id}`}
            className="w-full inline-flex bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 items-center justify-center gap-2 text-xs sm:text-sm"
            aria-label={`Ver detalle de ${product.nombre}`}
          >
            <span>Ver Detalle</span>
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
