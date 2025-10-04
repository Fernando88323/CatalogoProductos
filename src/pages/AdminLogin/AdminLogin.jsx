import { useState, useEffect } from "react";
import NavBar2 from "../../components/NavBar/NavBar2";

const AdminLogin = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
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
      alert(
        "⚠️ Máximo 10 imágenes permitidas. Se seleccionarán las primeras 10."
      );
      setImages(files.slice(0, 10));
    } else {
      setImages(files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Por favor selecciona al menos una imagen");
      return;
    }

    if (images.length > 10) {
      alert("⚠️ Máximo 10 imágenes permitidas");
      return;
    }

    if (!productData.nombre.trim()) {
      alert("Por favor ingresa el nombre del producto");
      return;
    }

    if (!productData.categoria_id) {
      alert("Por favor selecciona una categoría");
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

      const response = await fetch("http://localhost:4000/upload/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert(`✅ Producto creado exitosamente!\n${data.message}`);
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
        alert(`❌ Error: ${data.message || "Error al crear el producto"}`);
        console.error("Error del servidor:", data);
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("❌ Error de conexión al crear el producto");
    } finally {
      setLoading(false);
    }
  };

  // Verificar si ya está autenticado como admin
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    if (adminStatus === "true") {
      setIsAdmin(true);
      setShowLogin(false);
      setShowAdminMenu(true);
    }
  }, []);

  // Simple autenticación de admin (sin roles complejos)
  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Contraseña simple para el admin (en un entorno real usar algo más seguro)
    if (adminPassword === "admin123") {
      setIsAdmin(true);
      setShowLogin(false);
      setShowAdminMenu(true);
      localStorage.setItem("isAdmin", "true");
      alert("✅ Acceso de administrador concedido");
    } else {
      alert("❌ Contraseña incorrecta");
    }
    setAdminPassword("");
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setShowLogin(true);
    setShowAddForm(false);
    setShowAdminMenu(false);
    localStorage.removeItem("isAdmin");
    alert("✅ Sesión de administrador cerrada");
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
      <NavBar2 favorites={[]} showBackButton={false} showAdminButton={true} />

      {showLogin && (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Efectos de fondo animados */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
            {/* Icono de Admin */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl">🔐</span>
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-center text-white mb-2">
              Panel de Administración
            </h2>
            <p className="text-center text-blue-200 mb-8 text-sm">
              Acceso exclusivo para administradores
            </p>

            <form onSubmit={handleAdminLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Contraseña de administrador
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-blue-200/50 transition-all"
                  placeholder="Ingrese la contraseña"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-lg"
              >
                🚀 Ingresar al Panel
              </button>
            </form>
            <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
              <p className="text-xs text-blue-200 text-center">
                💡 <span className="font-semibold">Contraseña de prueba:</span>{" "}
                admin123
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Menú de Administrador */}
      {showAdminMenu && (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Efectos de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-lg">
            {/* Avatar del Admin */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white/20">
                <span className="text-5xl">👨‍💼</span>
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-center text-white mb-2">
              Panel de Control
            </h2>
            <p className="text-blue-200 text-center mb-8">
              Gestiona tu catálogo de productos
            </p>

            <div className="space-y-4">
              {/* Botón Crear Producto */}
              <button
                onClick={handleShowCreateForm}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-lg flex items-center justify-center gap-3"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <span className="text-2xl">➕</span>
                <span className="text-lg">Crear Nuevo Producto</span>
              </button>

              {/* Botón Cerrar Sesión */}
              <button
                onClick={handleLogout}
                className="w-full group relative overflow-hidden bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-3"
              >
                <span className="text-2xl">🚪</span>
                <span className="text-lg">Cerrar Sesión</span>
              </button>
            </div>

            {/* Info adicional */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-center text-blue-200 text-sm">
                ✨ Sesión de administrador activa
              </p>
            </div>
          </div>
        </div>
      )}

      {isAdmin && showAddForm && (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-4 sm:py-8 px-3 sm:px-4 relative overflow-hidden">
          {/* Efectos de fondo animados */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-3xl mx-auto relative z-10">
            {/* Header del formulario */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl p-4 sm:p-6 shadow-lg border border-white/10">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={handleBackToMenu}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-all flex items-center gap-1.5 sm:gap-2 font-semibold border border-white/30 hover:scale-105 transform duration-200 text-sm sm:text-base flex-shrink-0"
                >
                  <span className="text-base sm:text-lg">←</span>
                  <span className="hidden xs:inline">Volver</span>
                </button>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2 sm:gap-3 text-center">
                  <span className="text-xl sm:text-3xl">✨</span>
                  <span className="hidden sm:inline">Crear Nuevo Producto</span>
                  <span className="sm:hidden">Nuevo Producto</span>
                </h2>
                <div className="w-12 sm:w-20 md:w-28"></div>
              </div>
            </div>

            {/* Formulario */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-b-2xl shadow-2xl p-4 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Nombre del producto */}
                <div>
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                    <span className="text-blue-400">📦</span>
                    Nombre del producto *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={productData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all hover:border-blue-400 text-white placeholder-blue-200/50 text-sm sm:text-base"
                    placeholder="Ej: Collar de perlas elegante"
                    required
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                    <span className="text-blue-400">📝</span>
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={productData.descripcion}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all hover:border-blue-400 resize-none text-white placeholder-blue-200/50 text-sm sm:text-base"
                    placeholder="Descripción detallada del producto..."
                  />
                </div>

                {/* Precio y Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                      <span className="text-blue-400">💰</span>
                      Precio
                    </label>
                    <input
                      type="number"
                      name="precio"
                      value={productData.precio}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all hover:border-blue-400 text-white placeholder-blue-200/50 text-sm sm:text-base"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                      <span className="text-blue-400">📊</span>
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={productData.stock}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all hover:border-blue-400 text-white placeholder-blue-200/50 text-sm sm:text-base"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Categoría y Marca */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                      <span className="text-blue-400">🏷️</span>
                      Categoría *
                    </label>
                    <select
                      name="categoria_id"
                      value={productData.categoria_id}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all hover:border-blue-400 cursor-pointer text-white text-sm sm:text-base"
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
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                      <span className="text-blue-400">⭐</span>
                      Marca *
                    </label>
                    <select
                      name="marca_id"
                      value={productData.marca_id}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all hover:border-blue-400 cursor-pointer text-white text-sm sm:text-base"
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
                  <label className="flex items-center justify-between text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                    <span className="flex items-center gap-2">
                      <span className="text-blue-400">📸</span>
                      Imágenes del producto *
                    </span>
                    <span className="text-blue-300 text-xs font-normal">
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
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all hover:border-blue-400 text-white text-xs sm:text-sm file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-indigo-500 file:text-white file:font-semibold file:cursor-pointer hover:file:from-blue-600 hover:file:to-indigo-600 file:text-xs sm:file:text-sm"
                    />
                  </div>
                  {images.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <div className="p-2 sm:p-3 bg-green-500/20 backdrop-blur-sm border-l-4 border-green-400 rounded-lg">
                        <p className="text-xs sm:text-sm text-green-300 font-semibold flex items-center gap-1.5 sm:gap-2">
                          <span>✅</span>
                          {images.length} imagen(es) seleccionada(s)
                        </p>
                      </div>
                      {/* Lista de archivos seleccionados */}
                      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-2 sm:p-3 max-h-32 overflow-y-auto">
                        <p className="text-xs text-blue-300 font-semibold mb-2">
                          Archivos:
                        </p>
                        <ul className="space-y-1 text-xs text-white/80">
                          {images.map((file, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 truncate"
                            >
                              <span className="text-blue-400">•</span>
                              <span className="truncate">{file.name}</span>
                              <span className="text-blue-300/60 text-[10px] flex-shrink-0">
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
                <div className="pt-2 sm:pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-white font-bold text-base sm:text-lg transition-all duration-300 transform ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] hover:shadow-2xl shadow-lg"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2 sm:gap-3">
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
                        Creando producto...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2 sm:gap-3">
                        <span className="text-xl sm:text-2xl">✨</span>
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
