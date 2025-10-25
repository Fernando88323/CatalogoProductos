import React, { useState, useEffect, useRef } from "react";
import NavBar2 from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { FaShippingFast, FaShieldAlt, FaTags } from "react-icons/fa";

const HomePageLanding = () => {
  // En móviles, hacer todo visible de inmediato
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [visibleSections, setVisibleSections] = useState(
    isMobile
      ? {
          "hero-section": true,
          "belcorp-section": true,
        }
      : {}
  );

  const heroRef = useRef(null);
  const belcorpRef = useRef(null);

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
    if (belcorpRef.current) observer.observe(belcorpRef.current);

    return () => observer.disconnect();
  }, [isMobile]);

  const whatsappNumber = "50360120492";

  const openWhatsApp = () => {
    const message =
      "Hola! Estoy interesado en conocer más sobre sus productos Belcorp";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative">
      {/* Header con NavBar2 - Posición fija */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar2
          showBackButton={false}
          onWhatsAppClick={() => openWhatsApp()}
        />
      </div>

      {/* Contenedor con scroll-snap */}
      <div className="snap-y snap-mandatory overflow-y-scroll h-screen">
        {/* Hero mejorado - Optimizado para móviles */}
        <section
          ref={heroRef}
          id="hero-section"
          className={`snap-start relative text-white overflow-hidden transition-all duration-1000 min-h-screen flex items-center pt-16 sm:pt-20 ${
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

          <div className="relative z-10 w-full py-8 sm:py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto text-center">
              <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold border border-white/30 animate-bounce">
                ✨ Nuevos Productos Disponibles
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 drop-shadow-2xl px-2">
                Belleza y Estilo a tu Alcance
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 font-light max-w-2xl mx-auto px-4">
                Descubre las mejores marcas de belleza y cuidado personal con
                Belcorp
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
          </div>
        </section>

        {/* Sección Belcorp - Full Width con diseño profesional y sutil */}
        <section
          ref={belcorpRef}
          id="belcorp-section"
          className={`snap-start relative w-full bg-gradient-to-br from-slate-100 via-purple-100 to-pink-100 overflow-hidden border-y border-purple-100 transition-all duration-1000 delay-200 min-h-screen flex items-center pt-16 sm:pt-20 ${
            visibleSections["belcorp-section"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* Decoración de fondo */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-pink-200 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-100 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 w-full py-6 sm:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              {/* Header con título y botón */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 sm:mb-8">
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
                    cuidado personal.
                  </p>
                </div>

                {/* CTA Button - Desktop */}
                {/* <div className="hidden sm:block flex-shrink-0">
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
                </div> */}
              </div>

              {/* Marcas - Grid responsive con imágenes */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
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
              {/* <div className="sm:hidden flex justify-center mt-6">
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
              </div> */}
            </div>
          </div>
        </section>

        {/* Sección de Contacto y CTA - Full Width */}
        <section className="snap-start relative w-full bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 overflow-hidden min-h-screen flex items-center">
          {/* Decoración de fondo */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-10 left-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-pink-200 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-100 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 w-full py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 mb-4 sm:mb-6">
                ¿Listo para descubrir más?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10 max-w-2xl mx-auto">
                Consulta nuestro catálogo completo de productos Belcorp o
                contáctanos directamente por WhatsApp
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://catalogodigital.somosbelcorp.com/SV?consultant=MDUxNjEyNg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Ver Catálogo Digital</span>
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

                <button
                  onClick={openWhatsApp}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span>Contactar por WhatsApp</span>
                </button>
              </div>

              {/* Información adicional */}
              <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm text-purple-700 px-4 sm:px-5 py-2.5 rounded-full font-semibold shadow-sm border border-purple-100">
                  <FaShieldAlt className="text-lg sm:text-xl" />
                  <span>Productos Originales</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm text-purple-700 px-4 sm:px-5 py-2.5 rounded-full font-semibold shadow-sm border border-purple-100">
                  <FaTags className="text-lg sm:text-xl" />
                  <span>Mejores Precios</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm text-purple-700 px-4 sm:px-5 py-2.5 rounded-full font-semibold shadow-sm border border-purple-100">
                  <FaShippingFast className="text-lg sm:text-xl" />
                  <span>Envío Disponible</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Footer */}
        <section className="snap-start min-h-screen w-full flex items-center justify-center bg-gray-900">
          <div className="w-full">
            <Footer />
          </div>
        </section>
      </div>

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

        /* Smooth scroll behavior with snap */
        html {
          scroll-behavior: smooth;
        }

        /* Optimización del scroll-snap */
        .snap-y {
          scroll-snap-type: y mandatory;
          scroll-padding: 0;
          scrollbar-width: thin;
          -webkit-overflow-scrolling: touch;
        }

        .snap-start {
          scroll-snap-align: start;
          scroll-snap-stop: normal;
        }
        
        /* Asegurar que las secciones ocupen toda la altura */
        section.snap-start {
          min-height: 100vh;
          min-height: 100dvh; /* Dynamic viewport height para móviles */
        }

        /* Custom scrollbar para el contenedor principal */
        .snap-y::-webkit-scrollbar {
          width: 8px;
        }

        .snap-y::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .snap-y::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #9333ea, #ec4899);
          border-radius: 4px;
        }

        .snap-y::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #7c3aed, #db2777);
        }
      `}</style>
    </div>
  );
};

export default HomePageLanding;
