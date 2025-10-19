import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import NavBar2 from "../../components/NavBar/NavBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";
// import BottomNav from "../../components/BottomNav/BottomNav";
import {
  FaSearch,
  FaFilter,
  FaShippingFast,
  FaShieldAlt,
  FaTags,
} from "react-icons/fa";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // En móviles, hacer todo visible de inmediato
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [visibleSections, setVisibleSections] = useState(
    isMobile
      ? {
          "hero-section": true,
          "filters-section": true,
          "products-section": true,
        }
      : {}
  );

  const heroRef = useRef(null);
  const filtersRef = useRef(null);
  const productsRef = useRef(null); // Obtener productos del backend
  const { data, isLoading, error } = useProducts({
    page: 1,
    limit: 100, // Traer todos los productos
  });

  // Intersection Observer para animaciones al hacer scroll
  useEffect(() => {
    // Si es móvil, ya está todo visible, no necesitamos observer
    if (isMobile) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observar las secciones
    if (heroRef.current) observer.observe(heroRef.current);
    if (filtersRef.current) observer.observe(filtersRef.current);
    if (productsRef.current) observer.observe(productsRef.current);

    return () => observer.disconnect();
  }, [isMobile]);

  // Catálogo de categorías dinámico desde los productos
  const categories = useMemo(() => {
    if (!data?.items || data.items.length === 0) return ["Todos"];

    const uniqueCategories = new Set(
      data.items.map((product) => product.categoria_nombre).filter((cat) => cat) // Filtrar valores nulos/undefined
    );

    return ["Todos", ...Array.from(uniqueCategories)];
  }, [data?.items]);

  const whatsappNumber = "50373707035";

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

  // Filtrar productos del backend
  const filteredProducts = useMemo(() => {
    if (!data?.items) return [];

    return data.items.filter((product) => {
      // Solo mostrar productos activos (permitir productos sin stock para consultas)
      if (!product.activo) return false;

      const matchesSearch =
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "Todos" ||
        product.categoria_nombre === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [data?.items, searchTerm, selectedCategory]);

  // Obtener imagen del producto o placeholder
  const getProductImage = (product) => {
    // Verificar si hay imágenes disponibles
    if (
      product.imagenes &&
      Array.isArray(product.imagenes) &&
      product.imagenes.length > 0
    ) {
      const imageUrl = product.imagenes[0].image_url;
      if (imageUrl && typeof imageUrl === "string" && imageUrl.trim() !== "") {
        // Forzar HTTPS si la URL es HTTP (problema común en móviles)
        const secureUrl = imageUrl.startsWith("http://")
          ? imageUrl.replace("http://", "https://")
          : imageUrl;
        return secureUrl;
      }
    }

    // Debug en desarrollo
    if (import.meta.env.DEV) {
      console.log(
        `Producto sin imagen válida: ${product.nombre}`,
        product.imagenes
      );
    }

    // Fallback a placeholder
    return "https://via.placeholder.com/400x400?text=Sin+Imagen";
  };

  // Calcular rating basado en alguna métrica o usar valor por defecto
  const getProductRating = () => {
    return 4.5; // Valor por defecto
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header con NavBar2 */}
      <NavBar2 showBackButton={false} onWhatsAppClick={() => openWhatsApp()} />

      {/* Hero mejorado - Optimizado para móviles */}
      <section
        ref={heroRef}
        id="hero-section"
        className={`relative text-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden transition-all duration-1000 ${
          visibleSections["hero-section"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] animate-gradient"></div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold border border-white/30 animate-bounce">
            ✨ Nuevos Productos Disponibles
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 drop-shadow-2xl px-2">
            Encuentra lo que buscas
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 font-light max-w-2xl mx-auto px-4">
            Explora nuestra colección de productos destacados con los mejores
            precios
          </p>

          {/* Beneficios rápidos - Optimizado para móviles */}
          <div className="mt-6 sm:mt-8 md:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8 text-xs sm:text-sm px-2">
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <FaShippingFast className="text-base sm:text-xl" />
              <span>Envío Rápido</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <FaShieldAlt className="text-base sm:text-xl" />
              <span>Compra Segura</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <FaTags className="text-base sm:text-xl" />
              <span>Mejores Precios</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Belcorp - Full Width con diseño profesional y sutil */}
      <section className="relative w-full bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-12 sm:py-16 md:py-20 overflow-hidden border-y border-purple-100">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-pink-200 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-100 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header con título y botón */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-10">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600">
                  Catálogo Belcorp
                </h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                  ✨ Nuevo
                </span>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 font-normal">
                Descubre nuestra línea completa de productos de belleza y
                cuidado personal
              </p>
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden sm:block flex-shrink-0">
              <a
                href="https://catalogodigital.somosbelcorp.com/SV?consultant=MDUxNjEyNg=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 group"
              >
                <span>Ver Catálogo</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Marcas - Grid responsive con imágenes */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
            {/* L'Bel */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 aspect-square border border-gray-100">
                <img
                  src="https://res.cloudinary.com/drfxzdtxm/image/upload/v1760915771/LBEL_ebo4mv.jpg"
                  alt="L'Bel"
                  className="w-full h-full object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 text-white font-semibold text-sm sm:text-base md:text-lg text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 drop-shadow-lg">
                  L'Bel
                </div>
              </div>
            </div>

            {/* Esika */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 aspect-square border border-gray-100">
                <img
                  src="https://res.cloudinary.com/drfxzdtxm/image/upload/v1760915770/ESIKA_gkd2cz.jpg"
                  alt="Esika"
                  className="w-full h-full object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-600/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 text-white font-semibold text-sm sm:text-base md:text-lg text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 drop-shadow-lg">
                  Esika
                </div>
              </div>
            </div>

            {/* Cyzone */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 aspect-square border border-gray-100">
                <img
                  src="https://res.cloudinary.com/drfxzdtxm/image/upload/v1760915770/CYZONE_eo3nvq.jpg"
                  alt="Cyzone"
                  className="w-full h-full object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 text-white font-semibold text-sm sm:text-base md:text-lg text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 drop-shadow-lg">
                  Cyzone
                </div>
              </div>
            </div>
          </div>

          {/* Tags informativos */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm mb-6 sm:mb-0">
            <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm text-purple-700 px-3 sm:px-4 py-2 rounded-full font-semibold shadow-sm border border-purple-100">
              💄 Maquillaje
            </span>
            <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm text-purple-700 px-3 sm:px-4 py-2 rounded-full font-semibold shadow-sm border border-purple-100">
              🧴 Cuidado de la piel
            </span>
            <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm text-purple-700 px-3 sm:px-4 py-2 rounded-full font-semibold shadow-sm border border-purple-100">
              🌸 Fragancias
            </span>
          </div>

          {/* CTA Button - Mobile */}
          <div className="sm:hidden flex justify-center mt-6">
            <a
              href="https://catalogodigital.somosbelcorp.com/SV?consultant=MDUxNjEyNg=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 group w-full justify-center max-w-sm"
            >
              <span>Ver Catálogo Completo</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Filtros por categoría y búsqueda - Optimizado para móviles */}
      <section
        ref={filtersRef}
        id="filters-section"
        className={`max-w-7xl mx-auto px-4 sm:px-6 -mt-4 sm:-mt-6 md:-mt-8 relative z-20 transition-all duration-1000 delay-200 ${
          visibleSections["filters-section"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-5 md:p-6">
          <div className="flex flex-col gap-4">
            {/* Barra de búsqueda - Prioridad en móviles */}
            <div className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 pl-10 pr-10 rounded-full text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-400 border-2 border-gray-200 focus:border-purple-400 transition-all"
                />
                <FaSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
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

            {/* Título y categorías con scroll horizontal en móviles */}
            <div className="flex-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <FaFilter className="text-purple-600 text-base sm:text-xl" />
                <h3 className="font-bold text-base sm:text-lg text-gray-800">
                  Categorías
                </h3>
                <span className="text-xs sm:text-sm text-gray-500 ml-auto">
                  {filteredProducts.length} productos
                </span>
              </div>

              {/* Scroll horizontal en móviles, wrap en desktop */}
              <div className="relative -mx-4 sm:mx-0">
                <div className="overflow-x-auto scrollbar-hide px-4 sm:px-0">
                  <div className="flex sm:flex-wrap gap-2 sm:gap-3 pb-2 sm:pb-0">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`flex-shrink-0 px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 whitespace-nowrap ${
                          selectedCategory === category
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Indicador de scroll en móviles */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none sm:hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de productos mejorado */}
      <main
        ref={productsRef}
        id="products-section"
        className={`max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10 pb-20 md:pb-10 transition-all duration-1000 delay-300 ${
          visibleSections["products-section"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                Productos Destacados
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {isLoading
                  ? "Cargando productos..."
                  : `${filteredProducts.length} producto${
                      filteredProducts.length !== 1 ? "s" : ""
                    } encontrado${filteredProducts.length !== 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mb-4"></div>
            <p className="text-gray-600 animate-pulse">
              Cargando productos increíbles...
            </p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-20 bg-red-50 rounded-2xl p-8">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Error al cargar productos
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Products grid - Optimizado para móviles */}
        {!isLoading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                openWhatsApp={openWhatsApp}
                getProductImage={getProductImage}
                getProductRating={getProductRating}
              />
            ))}
          </div>
        )}

        {!isLoading && !error && filteredProducts.length === 0 && (
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
      <Footer />

      {/* Bottom Navigation - Solo móviles */}
      {/* Comentado de momento posteriormente se verá si se deja */}
      {/* <BottomNav /> */}

      <style>{`
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

        /* Ocultar scrollbar en categorías móviles pero mantener funcionalidad */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Smooth scroll en categorías */
        .overflow-x-auto {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
