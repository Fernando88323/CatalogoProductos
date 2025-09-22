import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Por favor selecciona al menos una imagen");
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
      <Navbar />

      {showLogin && (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              🔐 Acceso de Administrador
            </h2>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña de administrador
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese la contraseña"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
              >
                Ingresar como Admin
              </button>
            </form>
            <p className="text-sm text-gray-500 text-center mt-4">
              💡 Contraseña: admin123
            </p>
          </div>
        </div>
      )}

      {/* Menú de Administrador */}
      {showAdminMenu && (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              👨‍💼 Panel de Administrador
            </h2>
            <p className="text-gray-600 text-center mb-8">¿Qué deseas hacer?</p>

            <div className="space-y-4">
              <button
                onClick={handleShowCreateForm}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span>➕</span>
                Crear Nuevo Producto
              </button>

              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span>🚪</span>
                Salir y Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {isAdmin && showAddForm && (
        <div className="min-h-screen bg-gray-100 py-8">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handleBackToMenu}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
              >
                <span>←</span>
                Volver
              </button>
              <h2 className="text-2xl font-bold text-gray-800">
                Crear Nuevo Producto
              </h2>
              <div className="w-20"></div>{" "}
              {/* Espaciado para centrar el título */}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre del producto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del producto *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={productData.nombre}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Collar de perlas elegante"
                  required
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={productData.descripcion}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Descripción detallada del producto..."
                />
              </div>

              {/* Precio y Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio
                  </label>
                  <input
                    type="number"
                    name="precio"
                    value={productData.precio}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={productData.stock}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Categoría y Marca */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría *
                  </label>
                  <select
                    name="categoria_id"
                    value={productData.categoria_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marca *
                  </label>
                  <select
                    name="marca_id"
                    value={productData.marca_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {marcas.map((marca) => (
                      <option key={marca.id} value={marca.id}>
                        {marca.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Imágenes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imágenes del producto *
                </label>
                <input
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    setImages(Array.from(e.target.files));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {images.length > 0 && (
                  <p className="text-sm text-green-600 mt-1">
                    📸 {images.length} imagen(es) seleccionada(s)
                  </p>
                )}
              </div>

              {/* Botón de envío */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                }`}
              >
                {loading ? "⏳ Creando producto..." : "✨ Crear Producto"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
