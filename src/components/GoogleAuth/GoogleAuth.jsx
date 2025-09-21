import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const GoogleAuth = ({ onSuccess, onError }) => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Cargar el script de Google Identity Services
    const loadGoogleScript = () => {
      if (window.google) {
        initializeGoogleAuth();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleAuth;
      document.head.appendChild(script);
    };

    const initializeGoogleAuth = () => {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

      if (!clientId) {
        console.error(
          "VITE_GOOGLE_CLIENT_ID no está configurado en las variables de entorno"
        );
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      // Renderizar el botón de Google
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        {
          theme: "outline",
          size: "large",
          width: "100%",
          text: "signin_with",
          shape: "rectangular",
          logo_alignment: "left",
        }
      );
    };

    const handleCredentialResponse = async (response) => {
      setIsLoading(true);
      try {
        // Decodificar el JWT token
        const decodedToken = parseJwt(response.credential);

        const userData = {
          id: decodedToken.sub,
          email: decodedToken.email,
          name: decodedToken.name,
          picture: decodedToken.picture,
          given_name: decodedToken.given_name,
          family_name: decodedToken.family_name,
          role: "user", // Por defecto, se puede cambiar según la lógica del backend
          token: response.credential,
        };

        // Guardar en el contexto
        login(userData);

        if (onSuccess) {
          onSuccess(userData);
        }
      } catch (error) {
        console.error("Error al procesar la respuesta de Google:", error);
        if (onError) {
          onError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Función para decodificar JWT
    const parseJwt = (token) => {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        return JSON.parse(jsonPayload);
      } catch (error) {
        console.error("Error al decodificar JWT:", error);
        throw error;
      }
    };

    loadGoogleScript();
  }, [login, onSuccess, onError]);

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex justify-center items-center mb-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Autenticando...</span>
        </div>
      )}
      <div id="google-signin-button" className="w-full"></div>
    </div>
  );
};

export default GoogleAuth;
