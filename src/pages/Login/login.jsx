import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [error, setError] = useState("");

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated()) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleGoogleSuccess = (userData) => {
    console.log("Login exitoso:", userData);
    setError("");

    // Redirigir a la página de donde vino o al home
    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  };

  const handleGoogleError = (error) => {
    console.error("Error en login:", error);
    setError(
      "Error al iniciar sesión con Google. Por favor, inténtalo de nuevo."
    );
  };

  if (isAuthenticated()) {
    return null; // No mostrar nada mientras redirige
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accede a tu cuenta para continuar
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Iniciar sesión con Google
              </label>
              <GoogleAuth
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    ¿Necesitas ayuda?
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate("/")}
                className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
