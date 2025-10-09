// Configuración centralizada de las URLs de la API
// Utiliza las variables de entorno definidas en .env

const API_CONFIG = {
  // Base URL del backend
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000",

  // Endpoints de productos
  PRODUCTOS: {
    // Listar productos activos (con paginación)
    LIST:
      import.meta.env.VITE_API_PRODUCTOS ||
      "http://localhost:4000/upload/productos",
    // Crear producto
    CREATE:
      import.meta.env.VITE_API_UPLOAD_UPLOAD ||
      "http://localhost:4000/upload/upload",
    // Todos los productos (activos e inactivos)
    ALL:
      import.meta.env.VITE_API_PRODUCTOS_ALL ||
      "http://localhost:4000/upload/productos/all",
    // Solo productos inactivos
    INACTIVOS:
      import.meta.env.VITE_API_PRODUCTOS_INACTIVOS ||
      "http://localhost:4000/upload/productos/inactivos",
    // Detalle de un producto específico
    DETAIL: (id) =>
      `${
        import.meta.env.VITE_API_PRODUCTOS_DETAIL ||
        "http://localhost:4000/upload/productos"
      }/${id}`,
    // Actualizar producto
    UPDATE: (id) =>
      `${
        import.meta.env.VITE_API_PRODUCTOS_DETAIL ||
        "http://localhost:4000/upload/productos"
      }/${id}`,
    // Eliminar producto (soft delete)
    DELETE: (id) =>
      `${
        import.meta.env.VITE_API_PRODUCTOS_DETAIL ||
        "http://localhost:4000/upload/productos"
      }/${id}`,
    // Eliminar producto permanentemente
    DELETE_PERMANENT: (id) =>
      `${
        import.meta.env.VITE_API_PRODUCTOS_PERMANENTE ||
        "http://localhost:4000/upload/productos"
      }/${id}/permanente`,
    // Reactivar producto
    REACTIVATE: (id) =>
      `${
        import.meta.env.VITE_API_PRODUCTOS_REACTIVAR ||
        "http://localhost:4000/upload/productos"
      }/${id}/reactivar`,
    // Imágenes de un producto
    IMAGES: (id) =>
      `${
        import.meta.env.VITE_API_PRODUCTOS_IMAGENES ||
        "http://localhost:4000/upload/productos"
      }/${id}/imagenes`,
  },

  // Endpoints de autenticación
  AUTH: {
    LOGIN:
      import.meta.env.VITE_API_AUTH_LOGIN || "http://localhost:4000/auth/login",
    LOGOUT:
      import.meta.env.VITE_API_AUTH_LOGOUT ||
      "http://localhost:4000/auth/logout",
    VERIFY:
      import.meta.env.VITE_API_AUTH_VERIFY ||
      "http://localhost:4000/auth/verify",
  },
};

export default API_CONFIG;
