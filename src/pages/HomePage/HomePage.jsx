import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import NavBar2 from "../../components/NavBar/NavBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";
import {
  FaWhatsapp,
  FaShoppingCart,
  FaStar,
  FaSearch,
  FaFilter,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaShippingFast,
  FaShieldAlt,
  FaTags,
  FaExternalLinkAlt,
} from "react-icons/fa";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [visibleSections, setVisibleSections] = useState({});

  const heroRef = useRef(null);
  const filtersRef = useRef(null);
  const productsRef = useRef(null); // Obtener productos del backend
  const { data, isLoading, error } = useProducts({
    page: 1,
    limit: 100, // Traer todos los productos
  });

  // Intersection Observer para animaciones al hacer scroll
  useEffect(() => {
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
  }, []);

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
    return (
      product.imagenes?.[0]?.image_url ||
      "https://via.placeholder.com/400x400?text=Sin+Imagen"
    );
  };

  // Calcular rating basado en alguna métrica o usar valor por defecto
  const getProductRating = () => {
    return 4.5; // Valor por defecto
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header con NavBar2 */}
      <NavBar2 showBackButton={false} onWhatsAppClick={() => openWhatsApp()} />

      {/* Hero mejorado */}
      <section
        ref={heroRef}
        id="hero-section"
        className={`relative text-white py-24 px-6 overflow-hidden transition-all duration-1000 ${
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
      <section
        ref={filtersRef}
        id="filters-section"
        className={`max-w-7xl mx-auto px-6 -mt-8 relative z-20 transition-all duration-1000 delay-200 ${
          visibleSections["filters-section"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
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
      <main
        ref={productsRef}
        id="products-section"
        className={`max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10 transition-all duration-1000 delay-300 ${
          visibleSections["products-section"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
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

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Error al cargar productos
            </h3>
            <p className="text-gray-600">{error}</p>
          </div>
        )}

        {/* Products grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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
      `}</style>
    </div>
  );
};

export default HomePage;
