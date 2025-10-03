import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import ZoomImage from "../../components/ZoomImage/ZoomImage.jsx";
// import { useProductImages } from "../../hooks/useProductImages.jsx"; // Opcional: para usar el endpoint de imágenes específico

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        // Obtener producto específico del backend usando el nuevo endpoint
        const response = await fetch(
          `http://localhost:4000/upload/productos/${id}`
        );

        if (response.ok) {
          const productData = await response.json();

          // El backend podría devolver { success: true, data: {...} } o directamente el producto
          let product = productData;
          if (productData.data) {
            product = productData.data;
          }

          setProduct(product);

          // Resetear la imagen seleccionada al cargar un nuevo producto
          setSelectedImageIndex(0);

          // Obtener productos relacionados usando el endpoint de todos los productos
          const relatedResponse = await fetch(
            `http://localhost:4000/upload/productos?limit=3`
          );
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            // El backend devuelve { success: true, data: [...] }
            const relatedItems = relatedData.data || relatedData.items || [];
            const filtered = relatedItems
              .filter((p) => p.id !== parseInt(id))
              .slice(0, 3);
            setRelatedProducts(filtered);
          }
        } else {
          throw new Error(`Producto no encontrado: ${response.status}`);
        }
      } catch (error) {
        console.error("Error al obtener producto:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto py-12 px-6 md:flex md:gap-12">
          {/* Skeleton para imágenes */}
          <div className="md:w-1/2">
            <div className="w-full h-[400px] bg-gray-200 rounded-lg animate-pulse mb-4"></div>
            <div className="flex gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-20 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
          {/* Skeleton para información */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-1/2"></div>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 bg-gray-200 rounded animate-pulse mr-1"
                ></div>
              ))}
            </div>
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <p className="text-xl text-red-600 mb-4">
            {error || "Producto no encontrado"}
          </p>
          <p className="text-sm text-gray-500 mb-4">ID del producto: {id}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Volver atrás
          </button>
        </div>
      </div>
    );
  }

  // Verificar que el producto tenga las propiedades mínimas necesarias
  if (!product.nombre) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-yellow-600 text-4xl mb-4">⚠️</div>
          <p className="text-xl text-yellow-600 mb-4">
            Producto con datos incompletos
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {JSON.stringify(product, null, 2)}
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Volver atrás
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Detalle del Producto */}
      <div className="max-w-6xl mx-auto py-12 px-6 md:flex md:gap-12">
        {/* Imágenes */}
        <div className="md:w-1/2">
          <div className="relative group">
            <ZoomImage
              src={
                product.imagenes?.[selectedImageIndex]?.image_url ||
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg=="
              }
              alt={
                product.imagenes?.[selectedImageIndex]?.alt || product.nombre
              }
              className="w-full h-[400px] object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
            />

            {/* Navegación con flechas (solo si hay más de una imagen) */}
            {product.imagenes && product.imagenes.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) =>
                      prev === 0 ? product.imagenes.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                >
                  &#8249;
                </button>
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) =>
                      prev === product.imagenes.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                >
                  &#8250;
                </button>

                {/* Indicador de imagen actual */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {product.imagenes.length}
                </div>
              </>
            )}
          </div>

          {/* Miniaturas de imágenes */}
          {product.imagenes && product.imagenes.length > 1 && (
            <div className="flex gap-4 mt-4">
              {product.imagenes.map((img, idx) => (
                <img
                  key={idx}
                  src={img.image_url}
                  alt={img.alt || product.nombre}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition ${
                    idx === selectedImageIndex
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Información */}
        <div className="md:w-1/2 mt-8 md:mt-0 bg-white p-8 rounded-xl shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-montserrat font-bold  md:text-3xl mb-1">
                {product.nombre || "Producto sin nombre"}
              </h1>
              <div className="flex items-center gap-3 mt-4">
                <div className="text-2xl font-montserrat font-extrabold text-blue-500">
                  ${parseFloat(product.precio || 0).toFixed(2)}
                </div>
                {/* Badges compactos */}
                {typeof product.stock !== "undefined" && (
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      product.stock <= 0
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {product.stock <= 0
                      ? "Agotado"
                      : `${product.stock} en stock`}
                  </span>
                )}
                {typeof product.activo !== "undefined" && !product.activo && (
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-200 text-gray-800">
                    No disponible
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Rating */}

          {/* Descripción con toggle y transición */}
          <div className="text-gray-700 mb-4 mt-6">
            <p
              className={`transition-all duration-300 font-sans text-base ${
                showFullDescription ? "" : "line-clamp-3"
              }`}
            >
              {product.descripcion}
            </p>
            {product.descripcion && product.descripcion.length > 220 && (
              <button
                onClick={() => setShowFullDescription((s) => !s)}
                className="mt-2 text-sm text-blue-600 hover:underline transition-colors duration-200"
              >
                {showFullDescription ? "Mostrar menos" : "Leer más"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Productos relacionados mejorados */}
      <div className="max-w-6xl mx-auto p-6 mt-12">
        <h2 className="text-2xl font-montserrat font-bold mb-6 text-gray-900">
          Productos Relacionados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              className="bg-white shadow-md p-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100"
            >
              <img
                src={
                  rel.imagenes?.[0]?.image_url ||
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg=="
                }
                alt={rel.imagenes?.[0]?.alt || rel.nombre}
                className="w-full h-48 object-cover rounded-md mb-4 bg-gray-50"
              />
              <h3 className="font-montserrat font-bold text-lg mb-2 text-gray-900">
                {rel.nombre}
              </h3>
              <p className="text-blue-500 font-montserrat font-extrabold text-xl mb-3">
                ${parseFloat(rel.precio || 0).toFixed(2)}
              </p>
              <Link
                to={`/product/${rel.id}`}
                className="block bg-gradient-to-r font-sans from-gray-600 to-gray-700 text-white px-4 py-2 rounded-lg text-center hover:from-gray-700 hover:to-gray-800 hover:shadow-md transition-all duration-200 font-medium"
              >
                Ver Detalle
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
