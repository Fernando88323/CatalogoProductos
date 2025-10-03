import Navbar from "../../components/Navbar/navbar";
import { useState, useEffect } from "react";
import {
  FaShippingFast,
  FaCheckCircle,
  FaBoxes,
  FaUsers,
  FaStar,
  FaArrowRight,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaShieldAlt,
  FaHeadset,
  FaTags,
} from "react-icons/fa";
import bisuteriaImage from "../../assets/bisuteria.jpeg";
import testimonialImage from "../../assets/testimonial.jpeg";
import testimonialHombre from "../../assets/testimonialHombre.jpeg";

function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    // Auto-rotate categories
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: "Bisutería", icon: "💎", color: "from-purple-500 to-pink-500" },
    { name: "Accesorios", icon: "👜", color: "from-blue-500 to-cyan-500" },
    { name: "Regalos", icon: "🎁", color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero / Banner con animación mejorada */}
      <section
        className="relative text-white min-h-[600px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${bisuteriaImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay con gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-purple-900/70"></div>

        {/* Efectos de partículas flotantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-purple-300 rounded-full animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
        </div>

        <div
          className={`relative z-10 text-center px-6 max-w-5xl transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-semibold animate-pulse">
            ✨ Nueva Colección 2025
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 leading-tight">
            Tu Estilo, Nuestra Pasión
          </h1>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 drop-shadow-lg text-gray-100 font-light">
            Descubre productos únicos y exclusivos que reflejan tu personalidad.
            <span className="block mt-2 font-semibold text-purple-200">
              Calidad premium al mejor precio
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/admin/dashboard"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 transform"
            >
              Ver Catálogo Completo
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#benefits"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white font-bold px-8 py-4 rounded-full border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300 transform"
            >
              Conoce Más
            </a>
          </div>

          {/* Indicadores de confianza */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="font-semibold">4.9/5 Valoración</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-blue-400" />
              <span className="font-semibold">+10,000 Clientes</span>
            </div>
            <div className="flex items-center gap-2">
              <FaShippingFast className="text-green-400" />
              <span className="font-semibold">Envío Garantizado</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator animado */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Categorías destacadas con animación */}
      <section className="py-16 px-6 -mt-20 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden bg-gradient-to-br ${
                  category.color
                } rounded-2xl p-8 text-white cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  activeCategory === index
                    ? "scale-105 shadow-2xl"
                    : "scale-100"
                }`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                <div className="relative z-10">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/90 mb-4">
                    Explora nuestra colección
                  </p>
                  <div className="flex items-center gap-2 font-semibold group-hover:gap-4 transition-all">
                    Ver más{" "}
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios mejorados */}
      {/*       <section id="benefits" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Nos comprometemos a brindarte la mejor experiencia de compra
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <FaBoxes className="text-5xl" />,
              color: "text-purple-600",
              bgColor: "bg-purple-100",
              title: "Amplio Catálogo",
              description:
                "Miles de productos únicos y exclusivos para todos los gustos",
            },
            {
              icon: <FaCheckCircle className="text-5xl" />,
              color: "text-green-600",
              bgColor: "bg-green-100",
              title: "Calidad Premium",
              description:
                "Productos certificados con garantía de satisfacción 100%",
            },
            {
              icon: <FaShippingFast className="text-5xl" />,
              color: "text-blue-600",
              bgColor: "bg-blue-100",
              title: "Envío Express",
              description:
                "Entrega rápida y segura a todo el país con seguimiento",
            },
            {
              icon: <FaTags className="text-5xl" />,
              color: "text-pink-600",
              bgColor: "bg-pink-100",
              title: "Mejores Precios",
              description:
                "Ofertas exclusivas y descuentos especiales todo el año",
            },
            {
              icon: <FaShieldAlt className="text-5xl" />,
              color: "text-indigo-600",
              bgColor: "bg-indigo-100",
              title: "Compra Segura",
              description: "Protección total en todas tus transacciones online",
            },
            {
              icon: <FaHeadset className="text-5xl" />,
              color: "text-orange-600",
              bgColor: "bg-orange-100",
              title: "Soporte 24/7",
              description: "Atención personalizada siempre que lo necesites",
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <div
                className={`${benefit.bgColor} ${benefit.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
              >
                {benefit.icon}
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Testimonios mejorados */}
      {/*    <section className="py-24 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="text-gray-600 text-lg">
              Miles de clientes satisfechos respaldan nuestra calidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                image: testimonialHombre,
                name: "Juan Pérez",
                role: "Cliente frecuente",
                rating: 5,
                text: "¡Increíble experiencia! Los productos superaron todas mis expectativas. La calidad es excepcional y el servicio de entrega fue rapidísimo. Definitivamente volveré a comprar.",
              },
              {
                image: testimonialImage,
                name: "María López",
                role: "Compradora satisfecha",
                rating: 5,
                text: "Me encanta este catálogo. Encuentro todo lo que busco, los precios son justos y la atención al cliente es de primera. ¡Totalmente recomendado para todos!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-purple-100"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-4 border-purple-200 mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="text-purple-600 font-semibold text-sm">
                    ✓ Compra Verificada
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Estadísticas de confianza */}
      {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Clientes Felices" },
              { number: "50,000+", label: "Productos Vendidos" },
              { number: "4.9/5", label: "Valoración Media" },
              { number: "100%", label: "Satisfacción" },
            ].map((stat, index) => (
              <div
                key={index}
                className="transform hover:scale-110 transition-transform"
              >
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  {stat.number}
                </div>
                <div className="text-gray-600 mt-2 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div> 
        </section> */}

      {/* CTA mejorado */}
      <section className="relative py-24 px-6 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] animate-gradient"></div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
            🎉 Ofertas Especiales Disponibles
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            ¿Listo Para Descubrir Tu Estilo?
          </h2>

          <p className="text-xl md:text-2xl mb-10 text-white/90 font-light max-w-2xl mx-auto">
            Explora nuestro catálogo completo y encuentra productos únicos que
            te encantarán
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/admin/dashboard"
              className="group inline-flex items-center justify-center gap-3 bg-white text-purple-600 font-bold px-10 py-5 rounded-full shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300 transform text-lg"
            >
              Explorar Catálogo
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </a>

            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white font-bold px-10 py-5 rounded-full border-2 border-white/40 hover:bg-white/20 hover:scale-105 transition-all duration-300 transform text-lg"
            >
              Contáctanos
              <FaWhatsapp />
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <FaShieldAlt />
              <span>Pago Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <FaShippingFast />
              <span>Envío Gratis +$50</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle />
              <span>Garantía 30 Días</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer mejorado */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-4 text-purple-400">
                Sobre Nosotros
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Aquí en Jesé Shop, nos apasiona ofrecer productos de alta
                calidad que reflejen tu estilo único. Nuestra misión es
                brindarte una experiencia de compra excepcional con atención
                personalizada y envío rápido.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-4 text-purple-400">
                Enlaces Rápidos
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/admin/dashboard"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Catálogo
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Beneficios
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Términos y Condiciones
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Política de Privacidad
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-4 text-purple-400">
                Contacto
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📧 barrerajesica97@gmail.com</li>
                <li>📱 +503 7370-7035</li>
                <li>📍 Sonsonate, El Salvador</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-4 text-purple-400">
                Síguenos
              </h3>
              <div className="flex gap-4">
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
                  className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors transform hover:scale-110"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Catálogo de Productos. Todos los derechos reservados.</p>
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
}

export default HomePage;
