import React, { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useProducts } from "../../hooks/useProducts";
import Navbar from "../../components/NavBar/NavBar";

function AdminDashboard() {
  const { data, isLoading, error, refetch } = useProducts({
    page: 1,
    limit: 12,
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' o 'table'
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [productData, setProductData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria_id: "",
    marca_id: "1",
  });
  const [images, setImages] = useState([]);

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

  // Filtrar productos según búsqueda y categoría
  const filteredProducts = React.useMemo(() => {
    if (!data?.items) return [];

    return data.items.filter((product) => {
      const matchesSearch =
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !filterCategory || product.categoria_id === parseInt(filterCategory);

      return matchesSearch && matchesCategory;
    });
  }, [data?.items, searchTerm, filterCategory]);

  // Estadísticas
  const stats = React.useMemo(() => {
    const total = data?.items?.length || 0;
    const lowStock = data?.items?.filter((p) => p.stock < 10).length || 0;
    const totalValue =
      data?.items?.reduce(
        (sum, p) => sum + parseFloat(p.precio) * p.stock,
        0
      ) || 0;

    return { total, lowStock, totalValue };
  }, [data?.items]);

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
          marca_id: "1",
        });
        setImages([]);
        setShowAddForm(false);

        // Recargar los productos
        refetch();
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

  if (isLoading)
    return (
      <p className="flex h-screen justify-center items-center text-2xl font-bold">
        Cargando productos...
      </p>
    );

  return (
    <div>
      <Navbar />

      {/* Login de administrador simple */}
      {/*       {showLogin && (
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
      )} */}

      {/* Panel de administración */}
      <div className="min-h-screen bg-gray-50">
        {/* Header con estadísticas */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <h1 className="text-xl font-bold text-gray-900">
                  Catálogo de Productos
                </h1>
                <p className="text-gray-600 text-sm">
                  Explora nuestra colección
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {filteredProducts.length} productos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Controles de búsqueda y filtros */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Búsqueda */}
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔍</span>
                  </div>
                </div>

                {/* Filtro por categoría */}
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todas las categorías</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>
              {/* Controles de vista */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  🔲 Grid
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "table"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  📋 Tabla
                </button>
              </div>
            </div>
            {/* Indicador de resultados */}
            {(searchTerm || filterCategory) && (
              <div className="mt-3 text-sm text-gray-600">
                Mostrando {filteredProducts.length} productos
                {searchTerm && <span> · Búsqueda: "{searchTerm}"</span>}
                {filterCategory && (
                  <span>
                    · Categoría:{" "}
                    {
                      categorias.find((c) => c.id === parseInt(filterCategory))
                        ?.nombre
                    }
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Lista pública de productos (sin formulario admin) */}
          {error ? (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <div className="text-red-600 text-4xl mb-4">⚠️</div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Error de conexión
                </h3>
                <p className="text-red-600 mb-4">
                  No se pudo conectar al servidor backend.
                </p>
                <p className="text-sm text-red-500 mb-4">{error}</p>
                <button
                  onClick={refetch}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  🔄 Reintentar
                </button>
              </div>
            </div>
          ) : filteredProducts.length === 0 && !isLoading ? (
            <div className="text-center py-12">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
                <div className="text-gray-400 text-4xl mb-4">📦</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {searchTerm || filterCategory
                    ? "No se encontraron productos"
                    : "No hay productos"}
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || filterCategory
                    ? "Intenta cambiar los filtros de búsqueda."
                    : "Aún no hay productos en el catálogo."}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Vista Grid */}
              {viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Vista Tabla */}
              {viewMode === "table" && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Producto
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Categoría
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Precio
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={
                                    product.imagenes?.[0]?.image_url ||
                                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyOEMyNCAyOCAyOCAyNCAyOCAyMEMyOCAxNiAyNCAxMiAyMCAxMkMxNiAxMiAxMiAxNiAxMiAyMEMxMiAyNCAxNiAyOCAyMCAyOFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cg=="
                                  }
                                  alt={product.nombre}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {product.nombre}
                                </div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {product.descripcion}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              {categorias.find(
                                (c) => c.id === product.categoria_id
                              )?.nombre || "Sin categoría"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${parseFloat(product.precio || 0).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
