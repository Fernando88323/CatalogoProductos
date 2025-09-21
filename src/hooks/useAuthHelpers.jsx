import { useAuth } from "../context/AuthContext";

/**
 * Hook personalizado para facilitar el uso de la autenticación
 * Proporciona funciones y estados comunes relacionados con auth
 */
export const useAuthHelpers = () => {
  const { user, loading, login, logout, isAuthenticated, isAdmin } = useAuth();

  // Función para obtener el token de Google del usuario actual
  const getGoogleToken = () => {
    return user?.token || null;
  };

  // Función para obtener información básica del usuario
  const getUserInfo = () => {
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      firstName: user.given_name,
      lastName: user.family_name,
      role: user.role,
    };
  };

  // Función para verificar si el usuario actual tiene un email específico
  const isUserEmail = (email) => {
    return user?.email === email;
  };

  // Función para verificar si el usuario está completamente cargado
  const isUserLoaded = () => {
    return !loading && user !== null;
  };

  // Función para obtener las iniciales del usuario
  const getUserInitials = () => {
    if (!user) return "";

    const firstName = user.given_name || "";
    const lastName = user.family_name || "";

    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Función para obtener el nombre de display del usuario
  const getDisplayName = () => {
    if (!user) return "";

    return user.given_name || user.name || user.email;
  };

  return {
    // Estados básicos
    user,
    loading,
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),

    // Funciones de autenticación
    login,
    logout,

    // Funciones helper
    getGoogleToken,
    getUserInfo,
    isUserEmail,
    isUserLoaded,
    getUserInitials,
    getDisplayName,
  };
};

export default useAuthHelpers;
