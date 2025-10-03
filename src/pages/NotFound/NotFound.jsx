import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";

function NotFoundPage() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <h1 className="text-9xl font-extrabold text-gray-300 animate-pulse">
          404
        </h1>

        <h2 className="text-3xl md:text-5xl font-bold mt-6 text-gray-900">
          Página no encontrada
        </h2>
        <p className="mt-4 text-gray-600 text-center max-w-md">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
        >
          Volver al Inicio
        </Link>

        {/* Imagen o ilustración opcional */}
        {/*  <div className="mt-12 w-full max-w-md">
          <img
            src="/cargando.png"
            alt="Not Found Illustration"
            className="w-full h-auto"
          />
        </div> */}
      </div>
    </div>
  );
}

export default NotFoundPage;
