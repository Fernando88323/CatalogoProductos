import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../../components/NavBar/NavBar";
import toast, { Toaster } from "react-hot-toast";
import API_CONFIG from "../../config/api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [productData, setProductData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria_id: "",
    marca_id: "1", // Por defecto "Genérica" que será ID 1
  });

  // Catálogo de categorías
  const categorias = [
    { id: 1, nombre: "Accesorios de cabello" },
    { id: 2, nombre: "Joyería" },
    { id: 3, nombre: "Perfumería" },
    { id: 4, nombre: "Otros accesorios" },
    { id: 5, nombre: "Ellos" },
    { id: 6, nombre: "Maquillaje" },
    { id: 7, nombre: "Ropa" },
    { id: 8, nombre: "Calzado" },
  ];

  // Catálogo de marcas (solo Genérica por ahora)
  const marcas = [{ id: 1, nombre: "Genérica" }];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 10) {
      toast.error(
        "Máximo 10 imágenes permitidas. Se seleccionarán las primeras 10.",
        {
          icon: "⚠️",
          duration: 4000,
        }
      );
      setImages(files.slice(0, 10));
    } else {
      setImages(files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Por favor selecciona al menos una imagen", {
        icon: "📸",
      });
      return;
    }

    if (images.length > 10) {
      toast.error("Máximo 10 imágenes permitidas", {
        icon: "⚠️",
      });
      return;
    }

    if (!productData.nombre.trim()) {
      toast.error("Por favor ingresa el nombre del producto", {
        icon: "📦",
      });
      return;
    }

    if (!productData.categoria_id) {
      toast.error("Por favor selecciona una categoría", {
        icon: "🏷️",
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Agregar datos del producto
      Object.keys(productData).forEach((key) => {
        if (productData[key]) {
          formData.append(key, productData[key]);
        }
      });

      // Agregar imágenes
      Array.from(images).forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(API_CONFIG.PRODUCTOS.CREATE, {
        method: "POST",
        credentials: "include", // Incluir cookies en la petición
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Producto creado exitosamente!\n${data.message}`, {
          icon: "✨",
          duration: 4000,
        });
        console.log("Producto creado:", data.data);

        // Limpiar formulario
        setProductData({
          nombre: "",
          descripcion: "",
          precio: "",
          stock: "",
          categoria_id: "",
          marca_id: "1", // Volver a seleccionar "Genérica" por defecto
        });
        setImages([]);

        // Limpiar input de archivos
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";
      } else {
        toast.error(data.message || "Error al crear el producto", {
          icon: "❌",
        });
        console.error("Error del servidor:", data);
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      toast.error("Error de conexión al crear el producto", {
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  };

  // Verificar si ya está autenticado como admin
  useEffect(() => {
    // Verificar si existe una sesión activa en el backend (cookie HTTP-only)
    const checkSession = async () => {
      try {
        const response = await fetch(API_CONFIG.AUTH.VERIFY, {
          method: "GET",
          credentials: "include", // Incluir cookies en la petición
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // El usuario tiene una sesión válida
          setIsAdmin(true);
          setShowLogin(false);
          setShowAdminMenu(true);
        }
      } catch (error) {
        console.error("Error al verificar sesión:", error);
        // Si hay error, simplemente mantener el login visible
      }
    };

    checkSession();
  }, []);

  // Validación de email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Manejo de cambios en el formulario de login
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Simple autenticación de admin (sin roles complejos)
  const handleAdminLogin = async (e) => {
    e.preventDefault();

    // Validaciones del cliente
    if (!loginData.email.trim()) {
      toast.error("Por favor ingresa tu email", {
        icon: "📧",
      });
      return;
    }

    if (!validateEmail(loginData.email)) {
      toast.error("Por favor ingresa un email válido", {
        icon: "⚠️",
      });
      return;
    }

    if (!loginData.password) {
      toast.error("Por favor ingresa tu contraseña", {
        icon: "🔒",
      });
      return;
    }

    if (loginData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres", {
        icon: "⚠️",
      });
      return;
    }

    setLoginLoading(true);

    try {
      const response = await fetch(API_CONFIG.AUTH.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Incluir cookies en la petición
        body: JSON.stringify({
          email: loginData.email.trim(),
          password: loginData.password,
        }),
      });

      const data = await response.json();

      // Log para debugging
      console.log("Response status:", response.status);
      console.log("Response data:", data);

      // Verificar si el login fue exitoso
      if (data.success === true || response.ok) {
        // El backend maneja las cookies HTTP-only automáticamente
        // No necesitamos guardar nada en localStorage

        // Actualizar estados para mostrar el panel
        setIsAdmin(true);
        setShowLogin(false);
        setShowAdminMenu(true);

        const adminName =
          data.user && data.user.nombre ? data.user.nombre : "Administrador";
        toast.success(`¡Bienvenido, ${adminName}!`, {
          icon: "🎉",
          duration: 3000,
        });

        // Limpiar formulario
        setLoginData({ email: "", password: "" });
      } else {
        // Manejar diferentes errores del servidor
        const errorMessage =
          data.message || data.error || "Credenciales incorrectas";
        console.error("Error de login:", errorMessage);
        toast.error(errorMessage, {
          icon: "❌",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      toast.error("Error de conexión con el servidor", {
        icon: "🔌",
        duration: 4000,
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Llamar al endpoint de logout en el backend para limpiar la cookie
      await fetch(API_CONFIG.AUTH.LOGOUT, {
        method: "POST",
        credentials: "include", // Incluir cookies en la petición
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }

    // Actualizar estados locales
    setIsAdmin(false);
    setShowLogin(true);
    setShowAddForm(false);
    setShowAdminMenu(false);
    setLoginData({ email: "", password: "" });

    toast.success("Sesión cerrada correctamente", {
      icon: "👋",
      duration: 3000,
    });
  };

  // Función para mostrar el formulario de crear producto
  const handleShowCreateForm = () => {
    setShowAdminMenu(false);
    setShowAddForm(true);
  };

  // Función para volver al menú admin
  const handleBackToMenu = () => {
    setShowAddForm(false);
    setShowAdminMenu(true);
  };

  return (
    <div>
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "linear-gradient(135deg, #1e293b 0%, #881337 100%)",
            color: "#fff",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
            fontSize: "14px",
            fontWeight: "bold",
            padding: "16px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <NavBar2 showBackButton={false} showAdminButton={true} />

      {showLogin && (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-slate-900 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
          {/* Efectos de fondo animados */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-rose-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md">
            {/* Icono de Admin */}
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl sm:text-3xl">🔐</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center text-white mb-1 sm:mb-2 tracking-tight">
              Panel Administrativo
            </h2>
            <p className="text-center text-rose-200/80 mb-4 sm:mb-6 text-xs sm:text-sm font-medium">
              Ingresa tus credenciales para continuar
            </p>

            <form
              onSubmit={handleAdminLogin}
              className="space-y-3 sm:space-y-4"
            >
              {/* Campo de Email */}
              <div>
                <label className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white mb-1.5">
                  <span className="text-rose-400">📧</span>
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginInputChange}
                  className="w-full px-3 py-2 sm:py-2.5 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 text-white placeholder-rose-200/50 transition-all hover:border-white/40 text-sm"
                  placeholder="admin@ejemplo.com"
                  required
                  autoComplete="email"
                  disabled={loginLoading}
                />
              </div>

              {/* Campo de Contraseña */}
              <div>
                <label className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white mb-1.5">
                  <span className="text-rose-400">🔒</span>
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginInputChange}
                    className="w-full px-3 py-2 sm:py-2.5 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 text-white placeholder-rose-200/50 transition-all hover:border-white/40 pr-10 text-sm"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    disabled={loginLoading}
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1"
                    disabled={loginLoading}
                  >
                    {showPassword ? (
                      <span className="text-lg">👁️</span>
                    ) : (
                      <span className="text-lg">👁️‍🗨️</span>
                    )}
                  </button>
                </div>
                <p className="mt-1 text-[10px] sm:text-xs text-rose-200/60">
                  Mínimo 6 caracteres
                </p>
              </div>

              {/* Botón de Login */}
              <button
                type="submit"
                disabled={loginLoading}
                className={`w-full py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base transition-all duration-300 transform shadow-lg ${
                  loginLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-700 hover:via-pink-700 hover:to-purple-700 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
                }`}
              >
                {loginLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verificando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-lg sm:text-xl">🚀</span>
                    Iniciar Sesión
                  </span>
                )}
              </button>
            </form>

            {/* Footer de seguridad */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
              <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs text-rose-200/70">
                <span>🔒</span>
                <span>Conexión segura y encriptada</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menú de Administrador */}
      {showAdminMenu && (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-slate-900 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
          {/* Efectos de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-rose-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg">
            {/* Avatar del Admin */}
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white/20">
                <span className="text-3xl sm:text-4xl">👨‍💼</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-white mb-1 sm:mb-2">
              Panel de Control
            </h2>
            <p className="text-rose-200 text-center mb-4 sm:mb-6 text-sm">
              Gestiona tu catálogo de productos
            </p>

            <div className="space-y-3">
              {/* Botón Gestión de Inventario */}
              <button
                onClick={() => navigate("/admin/inventory")}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 sm:py-3.5 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-lg flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <span className="text-xl sm:text-2xl">📦</span>
                <span>Gestión de Inventario</span>
              </button>

              {/* Botón Cerrar Sesión */}
              <button
                onClick={handleLogout}
                className="w-full group relative overflow-hidden bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white py-3 sm:py-3.5 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <span className="text-xl sm:text-2xl">🚪</span>
                <span>Cerrar Sesión</span>
              </button>
            </div>

            {/* Info adicional */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/20">
              <p className="text-center text-rose-200 text-xs sm:text-sm">
                ✨ Sesión de administrador activa
              </p>
            </div>
          </div>
        </div>
      )}

      {isAdmin && showAddForm && (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-slate-900 py-3 sm:py-6 px-3 sm:px-4 relative overflow-hidden">
          {/* Efectos de fondo animados */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-rose-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-3xl mx-auto relative z-10">
            {/* Header del formulario */}
            <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-t-xl sm:rounded-t-2xl p-3 sm:p-4 shadow-lg border border-white/10">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={handleBackToMenu}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all flex items-center gap-1 sm:gap-1.5 font-semibold border border-white/30 hover:scale-105 transform duration-200 text-xs sm:text-sm flex-shrink-0"
                >
                  <span className="text-sm sm:text-base">←</span>
                  <span>Volver</span>
                </button>
                <h2 className="text-base sm:text-xl md:text-2xl font-extrabold text-white flex items-center gap-1.5 sm:gap-2 text-center">
                  <span className="text-lg sm:text-2xl">✨</span>
                  <span className="hidden xs:inline">Crear Nuevo Producto</span>
                  <span className="xs:hidden">Nuevo Producto</span>
                </h2>
                <div className="w-12 sm:w-16 md:w-20"></div>
              </div>
            </div>

            {/* Formulario */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-b-xl sm:rounded-b-2xl shadow-2xl p-3 sm:p-5 md:p-6">
              <form
                onSubmit={handleSubmit}
                className="space-y-2.5 sm:space-y-3"
              >
                {/* Nombre del producto */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-white mb-1">
                    <span className="text-rose-400">📦</span>
                    Nombre del producto *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={productData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all hover:border-rose-400 text-white placeholder-rose-200/50 text-xs sm:text-sm"
                    placeholder="Ej: Collar de perlas elegante"
                    required
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-white mb-1">
                    <span className="text-rose-400">📝</span>
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={productData.descripcion}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all hover:border-rose-400 resize-none text-white placeholder-rose-200/50 text-xs sm:text-sm"
                    placeholder="Descripción detallada del producto..."
                  />
                </div>

                {/* Precio y Stock */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-white mb-1">
                      <span className="text-rose-400">💰</span>
                      Precio
                    </label>
                    <input
                      type="number"
                      name="precio"
                      value={productData.precio}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all hover:border-rose-400 text-white placeholder-rose-200/50 text-xs sm:text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-white mb-1">
                      <span className="text-rose-400">📊</span>
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={productData.stock}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all hover:border-rose-400 text-white placeholder-rose-200/50 text-xs sm:text-sm"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Categoría y Marca */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-white mb-1">
                      <span className="text-rose-400">🏷️</span>
                      Categoría *
                    </label>
                    <select
                      name="categoria_id"
                      value={productData.categoria_id}
                      onChange={handleInputChange}
                      className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all hover:border-rose-400 cursor-pointer text-white text-xs sm:text-sm"
                      required
                    >
                      <option value="" className="bg-slate-800">
                        Selecciona una categoría
                      </option>
                      {categorias.map((categoria) => (
                        <option
                          key={categoria.id}
                          value={categoria.id}
                          className="bg-slate-800"
                        >
                          {categoria.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-white mb-1">
                      <span className="text-rose-400">⭐</span>
                      Marca *
                    </label>
                    <select
                      name="marca_id"
                      value={productData.marca_id}
                      onChange={handleInputChange}
                      className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all hover:border-rose-400 cursor-pointer text-white text-xs sm:text-sm"
                      required
                    >
                      {marcas.map((marca) => (
                        <option
                          key={marca.id}
                          value={marca.id}
                          className="bg-slate-800"
                        >
                          {marca.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Imágenes */}
                <div>
                  <label className="flex items-center justify-between text-xs font-bold text-white mb-1">
                    <span className="flex items-center gap-1.5">
                      <span className="text-rose-400">📸</span>
                      Imágenes del producto *
                    </span>
                    <span className="text-rose-300 text-[10px] font-normal">
                      Máx. 10 imágenes
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="images"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all hover:border-rose-400 text-white text-[10px] sm:text-xs file:mr-2 sm:file:mr-3 file:py-1 sm:file:py-1.5 file:px-2 sm:file:px-3 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-rose-500 file:to-pink-500 file:text-white file:font-semibold file:cursor-pointer hover:file:from-rose-600 hover:file:to-pink-600 file:text-[10px] sm:file:text-xs"
                    />
                  </div>
                  {images.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      <div className="p-2 bg-green-500/20 backdrop-blur-sm border-l-4 border-green-400 rounded-lg">
                        <p className="text-[10px] sm:text-xs text-green-300 font-semibold flex items-center gap-1">
                          <span>✅</span>
                          {images.length} imagen(es) seleccionada(s)
                        </p>
                      </div>
                      {/* Lista de archivos seleccionados */}
                      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-2 max-h-24 overflow-y-auto">
                        <p className="text-[10px] text-rose-300 font-semibold mb-1">
                          Archivos:
                        </p>
                        <ul className="space-y-0.5 text-[10px] text-white/80">
                          {images.map((file, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-1.5 truncate"
                            >
                              <span className="text-rose-400">•</span>
                              <span className="truncate">{file.name}</span>
                              <span className="text-rose-300/60 text-[9px] flex-shrink-0">
                                ({(file.size / 1024).toFixed(1)} KB)
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Botón de envío */}
                <div className="pt-2 sm:pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 sm:py-2.5 px-4 rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base transition-all duration-300 transform ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 hover:scale-[1.02] hover:shadow-2xl shadow-lg"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creando producto...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-lg sm:text-xl">✨</span>
                        Crear Producto
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
