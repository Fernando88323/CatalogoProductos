import Navbar from "../../components/Navbar/navbar";
import {
  FaShippingFast,
  FaCheckCircle,
  FaBoxes,
  FaUsers,
} from "react-icons/fa";
import bisuteriaImage from "../../assets/bisuteria.jpeg";
import testimonialImage from "../../assets/testimonial.jpeg";
import testimonialHombre from "../../assets/testimonialHombre.jpeg";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero / Banner */}
      <section
        className="relative bg-blue-600 text-white h-[500px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${bisuteriaImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Descubre Nuestro Catálogo de Productos
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6 drop-shadow">
            Productos de calidad que facilitan tu vida y se adaptan a tus
            necesidades.
          </p>
          <a
            href="#benefits"
            className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
          >
            Conoce Más
          </a>
        </div>
      </section>

      {/* Beneficios / Features */}
      <section id="benefits" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Por qué elegirnos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-xl transition">
            <FaBoxes className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Variedad de Productos</h3>
            <p className="text-gray-700">
              Amplia gama de productos adaptados a todos los gustos y
              necesidades.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow hover:shadow-xl transition">
            <FaCheckCircle className="text-4xl text-green-600 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Calidad Garantizada</h3>
            <p className="text-gray-700">
              Cada producto cumple con altos estándares de durabilidad y
              confianza.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow hover:shadow-xl transition">
            <FaShippingFast className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Envío Rápido</h3>
            <p className="text-gray-700">
              Recibe tus pedidos a tiempo con nuestro servicio eficiente y
              seguro.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow hover:shadow-xl transition">
            <FaUsers className="text-4xl text-yellow-500 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Clientes Satisfechos</h3>
            <p className="text-gray-700">
              Miles de clientes confían en nuestros productos y servicios.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">
          Testimonios de Clientes
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <img
              src={testimonialHombre}
              alt="Cliente satisfecho"
              className="w-24 h-24 rounded-full mb-4"
            />
            <p className="text-gray-700 mb-2">
              "Los productos son excelentes, llegaron rápido y superaron mis
              expectativas. ¡Totalmente recomendados!"
            </p>
            <span className="font-bold text-gray-900">Juan Pérez</span>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <img
              src={testimonialImage}
              alt="Cliente satisfecho"
              className="w-24 h-24 rounded-full mb-4"
            />
            <p className="text-gray-700 mb-2">
              "Gran catálogo de productos, todos de alta calidad y con un
              excelente servicio al cliente."
            </p>
            <span className="font-bold text-gray-900">María López</span>
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Explora Nuestro Catálogo Ahora
        </h2>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Descubre todos los productos y encuentra exactamente lo que necesitas.
        </p>
        <a
          href="/admin/dashboard"
          className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
        >
          Ir al Catálogo
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-12">
        <p>© 2025 Catálogo de Productos. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default HomePage;
