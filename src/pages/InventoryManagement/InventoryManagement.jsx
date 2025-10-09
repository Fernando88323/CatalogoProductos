import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../../components/NavBar/NavBar";
import ProductImage from "../../components/ProductImage";
import toast, { Toaster } from "react-hot-toast";
import API_CONFIG from "../../config/api";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaImage,
  FaTimes,
  FaSave,
  FaArrowLeft,
  FaBan,
  FaPlus,
} from "react-icons/fa";

const InventoryManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("activos"); // 'activos', 'inactivos', 'todos'
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPermanentDeleteModal, setShowPermanentDeleteModal] =
    useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showReactivateModal, setShowReactivateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria_id: "",
    marca_id: "",
  });
  const [createFormData, setCreateFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria_id: "",
    marca_id: "1",
  });
  const [newImages, setNewImages] = useState([]);
  const [createImages, setCreateImages] = useState([]);

  // Función para mostrar confirmación con toast personalizado
  const showConfirmToast = (message, onConfirm, options = {}) => {
    const {
      confirmText = "Confirmar",
      cancelText = "Cancelar",
      icon = "⚠️",
      confirmIcon = "✅",
      cancelIcon = "❌",
    } = options;

    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{icon}</span>
            <p className="text-white font-semibold flex-1">{message}</p>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                toast.dismiss(t.id);
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all flex items-center gap-2 border border-white/30"
            >
              <span>{cancelIcon}</span>
              {cancelText}
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                onConfirm();
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <span>{confirmIcon}</span>
              {confirmText}
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: {
          maxWidth: "500px",
          background: "linear-gradient(135deg, #1e293b 0%, #881337 100%)",
          padding: "20px",
        },
      }
    );
  };

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

  const marcas = [{ id: 1, nombre: "Genérica" }];

  // Verificar autenticación al montar el componente
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch(API_CONFIG.AUTH.VERIFY, {
          method: "GET",
          credentials: "include", // Incluir cookies en la petición
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setIsAuthenticated(true);
        } else {
          // Si no está autenticado, redirigir al login
          toast.error("Debes iniciar sesión para acceder a esta página", {
            icon: "🔒",
            duration: 3000,
          });
          navigate("/admin/login");
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
        toast.error("Error de conexión. Redirigiendo al login...", {
          icon: "❌",
          duration: 3000,
        });
        navigate("/admin/login");
      } finally {
        setCheckingAuth(false);
      }
    };

    verifyAuth();
  }, [navigate]);

  // Cargar productos al montar el componente y cuando cambie el filtro de estado
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [filterStatus, isAuthenticated]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Seleccionar el endpoint según el filtro de estado
      let endpoint = API_CONFIG.PRODUCTOS.LIST; // Solo activos

      if (filterStatus === "todos") {
        endpoint = API_CONFIG.PRODUCTOS.ALL;
      } else if (filterStatus === "inactivos") {
        endpoint = API_CONFIG.PRODUCTOS.INACTIVOS;
      }

      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.success) {
        // Si es /all, los productos están en data.data.productos
        const productosData = data.data?.productos || data.data || [];
        setProducts(productosData);
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
      toast.error("Error al cargar los productos", {
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filtrar productos
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.nombre
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory
      ? product.categoria_id === parseInt(filterCategory)
      : true;

    // Filtro de stock agotado
    const matchesStock =
      filterStatus === "agotados" ? product.stock === 0 : true;

    return matchesSearch && matchesCategory && matchesStock;
  });

  // Abrir modal de edición
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditFormData({
      nombre: product.nombre || "",
      descripcion: product.descripcion || "",
      precio: product.precio || "",
      stock: product.stock || "",
      categoria_id: product.categoria_id || "",
      marca_id: product.marca_id || "1",
    });
    setNewImages([]);
    setShowEditModal(true);
  };

  // Actualizar producto
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Agregar datos del producto (el backend espera estos campos en el body)
      if (editFormData.nombre) formData.append("nombre", editFormData.nombre);
      if (editFormData.descripcion)
        formData.append("descripcion", editFormData.descripcion);
      if (editFormData.precio) formData.append("precio", editFormData.precio);
      if (editFormData.stock !== "")
        formData.append("stock", editFormData.stock);
      if (editFormData.categoria_id)
        formData.append("categoria_id", editFormData.categoria_id);
      if (editFormData.marca_id)
        formData.append("marca_id", editFormData.marca_id);

      // Agregar nuevas imágenes si existen (el backend espera "images" - plural)
      if (newImages.length > 0) {
        Array.from(newImages).forEach((file) => {
          formData.append("images", file);
        });
      }

      // Endpoint correcto según el backend: PUT /upload/productos/:id
      const response = await fetch(
        API_CONFIG.PRODUCTOS.UPDATE(selectedProduct.id),
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Producto actualizado exitosamente", {
          icon: "✅",
        });
        setShowEditModal(false);
        fetchProducts();
        setNewImages([]);
      } else {
        toast.error(data.message || "Error al actualizar", {
          icon: "❌",
        });
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      toast.error("Error de conexión al actualizar el producto", {
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto (soft delete)
  const handleDeleteProduct = async () => {
    setLoading(true);
    try {
      console.log("🔍 Desactivando producto:", selectedProduct);
      console.log("🔍 ID del producto:", selectedProduct.id);

      // Endpoint correcto según el backend: DELETE /upload/productos/:id (soft delete)
      const response = await fetch(
        API_CONFIG.PRODUCTOS.DELETE(selectedProduct.id),
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      console.log("📥 Respuesta del servidor (desactivar):", data);

      if (data.success) {
        toast.success(data.message || "Producto desactivado exitosamente", {
          icon: "🚫",
        });
        setShowDeleteModal(false);
        fetchProducts();
      } else {
        toast.error(data.message || "Error al desactivar", {
          icon: "❌",
        });
      }
    } catch (error) {
      console.error("Error al desactivar producto:", error);
      toast.error("Error de conexión al desactivar el producto", {
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto permanentemente (hard delete)
  const handlePermanentDeleteProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        API_CONFIG.PRODUCTOS.DELETE_PERMANENT(selectedProduct.id),
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "Producto eliminado permanentemente", {
          icon: "💥",
          duration: 4000,
        });
        setShowPermanentDeleteModal(false);
        fetchProducts();
      } else {
        toast.error(data.message || "Error al eliminar permanentemente", {
          icon: "❌",
        });
      }
    } catch (error) {
      console.error("Error al eliminar producto permanentemente:", error);
      toast.error("Error de conexión al eliminar el producto permanentemente", {
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  };

  // Reactivar producto
  const handleReactivateProduct = async (product) => {
    setSelectedProduct(product);
    setShowReactivateModal(true);
  };

  // Confirmar reactivación
  const confirmReactivateProduct = async () => {
    setLoading(true);
    try {
      console.log("🔍 Reactivando producto:", selectedProduct);

      const response = await fetch(
        API_CONFIG.PRODUCTOS.REACTIVATE(selectedProduct.id),
        {
          method: "PATCH",
        }
      );

      const data = await response.json();
      console.log("📥 Respuesta del servidor (reactivar):", data);

      if (data.success) {
        toast.success(data.message || "Producto reactivado exitosamente", {
          icon: "♻️",
        });
        setShowReactivateModal(false);
        fetchProducts();
      } else {
        toast.error(data.message || "Error al reactivar", {
          icon: "❌",
        });
      }
    } catch (error) {
      console.error("Error al reactivar producto:", error);
      toast.error("Error de conexión al reactivar el producto", {
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      toast.error("Máximo 10 imágenes permitidas", {
        icon: "⚠️",
      });
      setNewImages(files.slice(0, 10));
    } else {
      setNewImages(files);
    }
  };

  const handleCreateImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      toast.error(
        "Máximo 10 imágenes permitidas. Se seleccionarán las primeras 10.",
        {
          icon: "⚠️",
          duration: 4000,
        }
      );
      setCreateImages(files.slice(0, 10));
    } else {
      setCreateImages(files);
    }
  };

  // Crear nuevo producto
  const handleCreateProduct = async (e) => {
    e.preventDefault();

    if (createImages.length === 0) {
      toast.error("Por favor selecciona al menos una imagen", {
        icon: "📸",
      });
      return;
    }

    if (!createFormData.nombre.trim()) {
      toast.error("Por favor ingresa el nombre del producto", {
        icon: "📦",
      });
      return;
    }

    if (!createFormData.categoria_id) {
      toast.error("Por favor selecciona una categoría", {
        icon: "🏷️",
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Agregar datos del producto
      Object.keys(createFormData).forEach((key) => {
        if (createFormData[key]) {
          formData.append(key, createFormData[key]);
        }
      });

      // Agregar imágenes
      Array.from(createImages).forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(API_CONFIG.PRODUCTOS.CREATE, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Producto creado exitosamente!", {
          icon: "✨",
          duration: 4000,
        });
        console.log("Producto creado:", data.data);

        // Limpiar formulario
        setCreateFormData({
          nombre: "",
          descripcion: "",
          precio: "",
          stock: "",
          categoria_id: "",
          marca_id: "1",
        });
        setCreateImages([]);
        setShowCreateModal(false);
        fetchProducts(); // Recargar la lista
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

  const getCategoryName = (categoryId) => {
    const category = categorias.find((cat) => cat.id === categoryId);
    return category ? category.nombre : "Sin categoría";
  };

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-rose-500 mb-4"></div>
          <p className="text-white text-xl font-semibold">
            Verificando autenticación...
          </p>
        </div>
      </div>
    );
  }

  // No mostrar nada si no está autenticado (se redirigirá automáticamente)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-slate-900">
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

      <NavBar2 showBackButton={true} showAdminButton={true} />

      {/* Efectos de fondo */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-rose-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3">
                <span className="text-4xl">📦</span>
                Gestión de Inventario
              </h1>
              <p className="text-rose-200 mt-2">
                Total de productos: {filteredProducts.length}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-2 font-semibold border border-green-500/30 hover:scale-105 transform duration-200 shadow-lg"
              >
                <FaPlus />
                Crear Producto
              </button>
              <button
                onClick={() => window.history.back()}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-2 font-semibold border border-white/30 hover:scale-105 transform duration-200"
              >
                <FaArrowLeft />
                Volver al Panel
              </button>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Búsqueda */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                <FaSearch className="text-rose-400" />
                Buscar producto
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre..."
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-white placeholder-rose-200/50"
              />
            </div>

            {/* Filtro por categoría */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                <span className="text-rose-400">🏷️</span>
                Filtrar por categoría
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-white cursor-pointer"
              >
                <option value="" className="bg-slate-800">
                  Todas las categorías
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

            {/* Filtro por estado */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                <span className="text-rose-400">🔄</span>
                Estado del producto
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-white cursor-pointer"
              >
                <option value="activos" className="bg-slate-800">
                  ✅ Solo Activos
                </option>
                <option value="inactivos" className="bg-slate-800">
                  ⏸️ Solo Inactivos
                </option>
                <option value="agotados" className="bg-slate-800">
                  ⚠️ Solo Agotados (Stock 0)
                </option>
                <option value="todos" className="bg-slate-800">
                  📋 Todos
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          {loading && !showEditModal && !showDeleteModal ? (
            <div className="flex items-center justify-center p-12">
              <div className="text-center">
                <svg
                  className="animate-spin h-12 w-12 text-rose-400 mx-auto mb-4"
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
                <p className="text-white font-semibold">
                  Cargando productos...
                </p>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex items-center justify-center p-12">
              <div className="text-center">
                <span className="text-6xl mb-4 block">📭</span>
                <p className="text-white font-semibold text-xl">
                  No se encontraron productos
                </p>
                <p className="text-rose-200 mt-2">
                  Intenta con otros términos de búsqueda
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-rose-600 to-pink-600 text-white">
                    <th className="px-4 py-4 text-center font-bold">#</th>
                    <th className="px-6 py-4 text-left font-bold">Imagen</th>
                    <th className="px-6 py-4 text-left font-bold">Producto</th>
                    <th className="px-6 py-4 text-left font-bold">Categoría</th>
                    <th className="px-6 py-4 text-left font-bold">Precio</th>
                    <th className="px-6 py-4 text-left font-bold">Stock</th>
                    <th className="px-6 py-4 text-center font-bold">Estado</th>
                    <th className="px-6 py-4 text-center font-bold">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className="hover:bg-white/5 transition-colors"
                      style={{
                        animation: `fadeIn 0.3s ease-in-out ${
                          index * 0.05
                        }s both`,
                      }}
                    >
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white font-bold text-sm shadow-lg">
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-white/10 border border-white/20 p-1">
                          <ProductImage
                            key={`product-image-${product.id}`}
                            productId={product.id}
                            alt={product.nombre}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">
                          {product.nombre}
                        </div>
                        {product.descripcion && (
                          <div className="text-sm text-rose-200/70 line-clamp-2 mt-1">
                            {product.descripcion}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium border border-purple-500/30">
                          {getCategoryName(product.categoria_id)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-bold text-lg">
                          ${parseFloat(product.precio || 0).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                            product.stock === 0
                              ? "bg-red-500/20 text-red-300 border border-red-500/30 animate-pulse"
                              : product.stock > 10
                              ? "bg-green-500/20 text-green-300 border border-green-500/30"
                              : "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                          }`}
                        >
                          {product.stock === 0
                            ? "⚠️ Agotado"
                            : `${product.stock} unid.`}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                            product.activo
                              ? "bg-green-500/20 text-green-300 border border-green-500/30"
                              : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                          }`}
                        >
                          {product.activo ? "✅ Activo" : "⏸️ Inactivo"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          {/* Mostrar según el estado del producto */}
                          {product.activo ? (
                            <>
                              {/* Botón Editar - Solo para activos */}
                              <button
                                onClick={() => handleEditClick(product)}
                                className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 p-3 rounded-lg transition-all hover:scale-110 border border-blue-500/30 group"
                                title="Editar"
                              >
                                <FaEdit className="text-lg group-hover:rotate-12 transition-transform" />
                              </button>
                              {/* Botón Desactivar */}
                              <button
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setShowDeleteModal(true);
                                }}
                                className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 p-3 rounded-lg transition-all hover:scale-110 border border-orange-500/30 group"
                                title="Desactivar"
                              >
                                <FaBan className="text-lg group-hover:scale-110 transition-transform" />
                              </button>
                            </>
                          ) : (
                            <>
                              {/* Botón Reactivar - Solo para inactivos */}
                              <button
                                onClick={() => handleReactivateProduct(product)}
                                className="bg-green-500/20 hover:bg-green-500/30 text-green-300 p-3 rounded-lg transition-all hover:scale-110 border border-green-500/30 group"
                                title="Reactivar"
                              >
                                <span className="text-lg group-hover:rotate-12 transition-transform">
                                  🔄
                                </span>
                              </button>
                              {/* Botón Eliminar Permanentemente - Solo para inactivos */}
                              <button
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setShowPermanentDeleteModal(true);
                                }}
                                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 p-3 rounded-lg transition-all hover:scale-110 border border-red-500/30 group"
                                title="Eliminar Permanentemente"
                              >
                                <FaTrash className="text-lg group-hover:scale-110 transition-transform" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Edición */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-slate-900 to-rose-900 border-2 border-white/20 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-3xl my-4 sm:my-8">
            {/* Header del modal */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 sm:p-4 md:p-6 rounded-t-xl sm:rounded-t-2xl border-b border-white/20">
              <div className="flex items-center justify-center relative">
                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white flex items-center gap-2 sm:gap-3">
                  <FaEdit className="text-xl sm:text-2xl md:text-3xl" />
                  <span>Editar Producto</span>
                </h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setNewImages([]);
                  }}
                  className="absolute right-0 text-white hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition-all"
                >
                  <FaTimes className="text-xl sm:text-2xl" />
                </button>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="p-3 sm:p-4 md:p-6 max-h-[70vh] overflow-y-auto">
              <form
                onSubmit={handleUpdateProduct}
                className="space-y-3 sm:space-y-4"
              >
                {/* Imagen actual */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-white mb-2 sm:mb-3">
                    <FaImage className="text-rose-400 text-sm sm:text-base" />
                    Imagen actual
                  </label>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-lg overflow-hidden bg-white/10 border-2 border-white/20 p-1.5 sm:p-2 flex items-center justify-center flex-shrink-0">
                      <ProductImage
                        productId={selectedProduct.id}
                        alt={selectedProduct.nombre}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-rose-200 text-xs sm:text-sm">
                      {selectedProduct.imagenes?.length || 0} imagen(es)
                      asociada(s)
                    </div>
                  </div>
                </div>

                {/* Nombre */}
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                    <span className="text-rose-400">📦</span>
                    Nombre del producto *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={editFormData.nombre}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-rose-200/50 text-sm sm:text-base"
                    required
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                    <span className="text-rose-400">📝</span>
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={editFormData.descripcion}
                    onChange={handleEditInputChange}
                    rows="3"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-white placeholder-rose-200/50 text-sm sm:text-base"
                  />
                </div>

                {/* Precio y Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                      <span className="text-rose-400">💰</span>
                      Precio
                    </label>
                    <input
                      type="number"
                      name="precio"
                      value={editFormData.precio}
                      onChange={handleEditInputChange}
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-rose-200/50 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                      <span className="text-rose-400">📊</span>
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={editFormData.stock}
                      onChange={handleEditInputChange}
                      min="0"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-rose-200/50 text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Categoría */}
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                    <span className="text-rose-400">🏷️</span>
                    Categoría *
                  </label>
                  <select
                    name="categoria_id"
                    value={editFormData.categoria_id}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer text-white text-sm sm:text-base"
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

                {/* Nuevas imágenes */}
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                    <span className="text-rose-400">📸</span>
                    <span className="truncate">
                      Agregar nuevas imágenes (opcional)
                    </span>
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-white text-xs sm:text-sm file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-cyan-500 file:text-white file:font-semibold file:cursor-pointer hover:file:from-blue-600 hover:file:to-cyan-600 file:text-xs sm:file:text-sm"
                  />
                  {newImages.length > 0 && (
                    <div className="mt-2 p-2 sm:p-3 bg-blue-500/20 backdrop-blur-sm border-l-4 border-blue-400 rounded-lg">
                      <p className="text-xs sm:text-sm text-blue-300 font-semibold">
                        ✅ {newImages.length} nueva(s) imagen(es)
                        seleccionada(s)
                      </p>
                    </div>
                  )}
                </div>

                {/* Botones */}
                <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setNewImages([]);
                    }}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-bold transition-all border border-white/30 text-sm sm:text-base"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-white font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:scale-[1.02] hover:shadow-xl"
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
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
                        Guardando...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Guardar Cambios
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-gradient-to-br from-slate-900 to-rose-900 border-2 border-red-500/50 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header del modal */}
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-3 sm:p-4 md:p-5 rounded-t-xl sm:rounded-t-2xl border-b border-white/20 sticky top-0 z-10">
              <div className="flex items-center justify-center relative">
                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white flex items-center gap-2 sm:gap-3">
                  <FaBan className="text-xl sm:text-2xl md:text-3xl" />
                  <span>Desactivar Producto</span>
                </h2>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="absolute right-0 text-white hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition-all"
                >
                  <FaTimes className="text-xl sm:text-2xl" />
                </button>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="p-3 sm:p-4 md:p-6">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
                <p className="text-white text-center font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                  ¿Desactivar este producto?
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-white/10 border-2 border-white/20 p-1.5 sm:p-2 flex items-center justify-center flex-shrink-0">
                    <ProductImage
                      productId={selectedProduct.id}
                      alt={selectedProduct.nombre}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-rose-200 font-bold text-base sm:text-lg line-clamp-2">
                      {selectedProduct.nombre}
                    </p>
                    <p className="text-rose-300/70 text-xs sm:text-sm mt-1">
                      ${parseFloat(selectedProduct.precio || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 mb-3 sm:mb-4">
                <p className="text-yellow-300 text-xs sm:text-sm text-center">
                  ⚠️ El producto quedará oculto del catálogo pero podrás
                  reactivarlo después
                </p>
              </div>

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-bold transition-all border border-white/30 text-sm sm:text-base"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteProduct}
                  disabled={loading}
                  className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-white font-bold transition-all text-sm sm:text-base ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 hover:scale-[1.02] hover:shadow-xl"
                  }`}
                >
                  {loading ? "Desactivando..." : "Sí, Desactivar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación Permanente */}
      {showPermanentDeleteModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-gradient-to-br from-slate-900 to-red-900 border-2 border-red-600/70 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header del modal */}
            <div className="bg-gradient-to-r from-red-700 to-red-900 p-3 sm:p-4 md:p-5 rounded-t-xl sm:rounded-t-2xl border-b border-white/20 sticky top-0 z-10">
              <div className="flex items-center justify-center relative">
                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white flex items-center gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl">💥</span>
                  <span>Eliminar Permanentemente</span>
                </h2>
                <button
                  onClick={() => setShowPermanentDeleteModal(false)}
                  className="absolute right-0 text-white hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition-all"
                >
                  <FaTimes className="text-xl sm:text-2xl" />
                </button>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="p-3 sm:p-4 md:p-6">
              <div className="bg-red-600/20 border-2 border-red-500/50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
                <p className="text-white text-center font-bold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">
                  ⚠️ ADVERTENCIA: ACCIÓN IRREVERSIBLE
                </p>
                <p className="text-red-200 text-center text-xs sm:text-sm mb-3 sm:mb-4">
                  Se eliminará permanentemente el producto y todas sus imágenes.
                  No podrá recuperarse.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-white/10 border-2 border-white/20 p-1.5 sm:p-2 flex items-center justify-center flex-shrink-0">
                    <ProductImage
                      productId={selectedProduct.id}
                      alt={selectedProduct.nombre}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-white font-bold text-base sm:text-lg line-clamp-2">
                      {selectedProduct.nombre}
                    </p>
                    <p className="text-rose-300/70 text-xs sm:text-sm mt-1">
                      ${parseFloat(selectedProduct.precio || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/20 border-2 border-yellow-500/50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 mb-3 sm:mb-4">
                <p className="text-yellow-200 text-xs sm:text-sm text-center font-semibold leading-relaxed">
                  ⚠️ Se eliminará:
                  <br />
                  • Registro de la base de datos
                  <br />
                  • Todas las imágenes
                  <br />• No se puede deshacer
                </p>
              </div>

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setShowPermanentDeleteModal(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-bold transition-all border border-white/30 text-sm sm:text-base"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePermanentDeleteProduct}
                  disabled={loading}
                  className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-white font-bold transition-all text-xs sm:text-sm md:text-base ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 hover:scale-[1.02] hover:shadow-xl border-2 border-red-600"
                  }`}
                >
                  {loading ? "Eliminando..." : "Sí, Eliminar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Reactivación */}
      {showReactivateModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-gradient-to-br from-slate-900 to-green-900 border-2 border-green-500/50 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header del modal */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 sm:p-4 md:p-5 rounded-t-xl sm:rounded-t-2xl border-b border-white/20 sticky top-0 z-10">
              <div className="flex items-center justify-center relative">
                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white flex items-center gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl">♻️</span>
                  <span>Reactivar Producto</span>
                </h2>
                <button
                  onClick={() => setShowReactivateModal(false)}
                  className="absolute right-0 text-white hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition-all"
                >
                  <FaTimes className="text-xl sm:text-2xl" />
                </button>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="p-3 sm:p-4 md:p-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
                <p className="text-white text-center font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                  ¿Reactivar este producto?
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-white/10 border-2 border-white/20 p-1.5 sm:p-2 flex items-center justify-center flex-shrink-0">
                    <ProductImage
                      productId={selectedProduct.id}
                      alt={selectedProduct.nombre}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-green-100 font-bold text-base sm:text-lg line-clamp-2">
                      {selectedProduct.nombre}
                    </p>
                    <p className="text-green-300/70 text-xs sm:text-sm mt-1">
                      ${parseFloat(selectedProduct.precio || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 mb-3 sm:mb-4">
                <p className="text-blue-300 text-xs sm:text-sm text-center">
                  ✅ El producto volverá a estar activo y visible en el catálogo
                  público
                </p>
              </div>

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setShowReactivateModal(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-bold transition-all border border-white/30 text-sm sm:text-base"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmReactivateProduct}
                  disabled={loading}
                  className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-white font-bold transition-all text-sm sm:text-base ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:scale-[1.02] hover:shadow-xl"
                  }`}
                >
                  {loading ? "Reactivando..." : "Sí, Reactivar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Creación de Producto */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-slate-900 to-rose-900 border-2 border-white/20 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-3xl my-4 sm:my-8">
            {/* Header del modal */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 sm:p-4 md:p-6 rounded-t-xl sm:rounded-t-2xl border-b border-white/20">
              <div className="flex items-center justify-center relative">
                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white flex items-center gap-2 sm:gap-3">
                  <FaPlus className="text-xl sm:text-2xl md:text-3xl" />
                  <span>Crear Nuevo Producto</span>
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setCreateImages([]);
                    setCreateFormData({
                      nombre: "",
                      descripcion: "",
                      precio: "",
                      stock: "",
                      categoria_id: "",
                      marca_id: "1",
                    });
                  }}
                  className="absolute right-0 text-white hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition-all"
                >
                  <FaTimes className="text-xl sm:text-2xl" />
                </button>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="p-3 sm:p-4 md:p-6 max-h-[70vh] overflow-y-auto">
              <form
                onSubmit={handleCreateProduct}
                className="space-y-3 sm:space-y-4"
              >
                {/* Nombre */}
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                    <span className="text-rose-400">📦</span>
                    Nombre del producto *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={createFormData.nombre}
                    onChange={handleCreateInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-rose-200/50 text-sm sm:text-base"
                    placeholder="Ej: Collar de perlas elegante"
                    required
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                    <span className="text-rose-400">📝</span>
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={createFormData.descripcion}
                    onChange={handleCreateInputChange}
                    rows="3"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 resize-none text-white placeholder-rose-200/50 text-sm sm:text-base"
                    placeholder="Descripción detallada del producto..."
                  />
                </div>

                {/* Precio y Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                      <span className="text-rose-400">💰</span>
                      Precio
                    </label>
                    <input
                      type="number"
                      name="precio"
                      value={createFormData.precio}
                      onChange={handleCreateInputChange}
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-rose-200/50 text-sm sm:text-base"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                      <span className="text-rose-400">📊</span>
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={createFormData.stock}
                      onChange={handleCreateInputChange}
                      min="0"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-rose-200/50 text-sm sm:text-base"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Categoría y Marca */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                      <span className="text-rose-400">🏷️</span>
                      Categoría *
                    </label>
                    <select
                      name="categoria_id"
                      value={createFormData.categoria_id}
                      onChange={handleCreateInputChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer text-white text-sm sm:text-base"
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
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2">
                      <span className="text-rose-400">⭐</span>
                      Marca *
                    </label>
                    <select
                      name="marca_id"
                      value={createFormData.marca_id}
                      onChange={handleCreateInputChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer text-white text-sm sm:text-base"
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
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-rose-400">📸</span>
                      <span className="truncate">Imágenes del producto *</span>
                    </span>
                    <span className="text-rose-300 text-[10px] sm:text-xs font-normal flex-shrink-0">
                      Máx. 10
                    </span>
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleCreateImageChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-white text-xs sm:text-sm file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-green-500 file:to-emerald-500 file:text-white file:font-semibold file:cursor-pointer hover:file:from-green-600 hover:file:to-emerald-600 file:text-xs sm:file:text-sm"
                  />
                  {createImages.length > 0 && (
                    <div className="mt-2 space-y-2">
                      <div className="p-2 sm:p-3 bg-green-500/20 backdrop-blur-sm border-l-4 border-green-400 rounded-lg">
                        <p className="text-xs sm:text-sm text-green-300 font-semibold flex items-center gap-1.5 sm:gap-2">
                          <span>✅</span>
                          {createImages.length} imagen(es) seleccionada(s)
                        </p>
                      </div>
                      {/* Lista de archivos */}
                      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-2 sm:p-3 max-h-32 overflow-y-auto">
                        <p className="text-[10px] sm:text-xs text-rose-300 font-semibold mb-1.5 sm:mb-2">
                          Archivos:
                        </p>
                        <ul className="space-y-1 text-[10px] sm:text-xs text-white/80">
                          {createImages.map((file, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-1.5 sm:gap-2 truncate"
                            >
                              <span className="text-rose-400 flex-shrink-0">
                                •
                              </span>
                              <span className="truncate">{file.name}</span>
                              <span className="text-rose-300/60 text-[9px] sm:text-[10px] flex-shrink-0">
                                ({(file.size / 1024).toFixed(1)} KB)
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Botones */}
                <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setCreateImages([]);
                      setCreateFormData({
                        nombre: "",
                        descripcion: "",
                        precio: "",
                        stock: "",
                        categoria_id: "",
                        marca_id: "1",
                      });
                    }}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-bold transition-all border border-white/30 text-sm sm:text-base"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-white font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:scale-[1.02] hover:shadow-xl"
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
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
                        Creando...
                      </>
                    ) : (
                      <>
                        <FaPlus />
                        Crear Producto
                      </>
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

export default InventoryManagement;
