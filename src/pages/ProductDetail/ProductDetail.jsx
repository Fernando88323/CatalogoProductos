import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar2 from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { FaWhatsapp, FaStar, FaBox } from "react-icons/fa";
import API_CONFIG from "../../config/api";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const whatsappNumber = "50373707035";

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_CONFIG.PRODUCTOS.DETAIL(id));

        if (response.ok) {
          const productData = await response.json();
          let product = productData;
          if (productData.data) {
            product = productData.data;
          }
          setProduct(product);
          setSelectedImageIndex(0);

          // Obtener productos relacionados
          const relatedResponse = await fetch(
            `${API_CONFIG.PRODUCTOS.LIST}?limit=4`
          );
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            const relatedItems = relatedData.data || relatedData.items || [];
            const filtered = relatedItems
              .filter((p) => p.id !== parseInt(id) && p.activo && p.stock > 0)
              .slice(0, 4);
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
      window.scrollTo(0, 0);
    }
  }, [id]);

  const openWhatsApp = (productName = "", productPrice = "", qty = 1) => {
    let message = `Hola! Me interesa el producto: *${productName}* ($${productPrice}). Cantidad: ${qty}. ¿Está disponible?`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const getProductImage = (imageIndex) => {
    if (
      product?.imagenes &&
      Array.isArray(product.imagenes) &&
      product.imagenes[imageIndex]
    ) {
      const imageUrl = product.imagenes[imageIndex].image_url;
      if (imageUrl && typeof imageUrl === "string" && imageUrl.trim() !== "") {
        // Forzar HTTPS si la URL es HTTP (problema común en móviles)
        const secureUrl = imageUrl.startsWith("http://")
          ? imageUrl.replace("http://", "https://")
          : imageUrl;
        return secureUrl;
      }
    }
    return "https://via.placeholder.com/600x600?text=Sin+Imagen";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header con NavBar2 */}
        <NavBar2 showBackButton={true} onWhatsAppClick={() => openWhatsApp()} />

        {/* Loading Skeleton */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Miniaturas skeleton */}
              <div className="flex sm:flex-col gap-3 order-2 sm:order-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg animate-pulse flex-shrink-0"
                  ></div>
                ))}
              </div>
              {/* Imagen principal skeleton */}
              <div className="w-full h-[400px] sm:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl animate-pulse flex-1 order-1 sm:order-2"></div>
            </div>
            <div className="space-y-6">
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Producto no encontrado
          </h3>
          <p className="text-gray-600 mb-6">
            {error || "El producto no existe"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all"
          >
            Volver al Catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header con NavBar2 */}
      <NavBar2
        showBackButton={true}
        onWhatsAppClick={() =>
          openWhatsApp(product.nombre, product.precio, quantity)
        }
      />

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galería de Imágenes */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Miniaturas al lado izquierdo */}
            {product.imagenes && product.imagenes.length > 1 && (
              <div className="flex sm:flex-col gap-3 order-2 sm:order-1 flex-wrap sm:flex-nowrap">
                {product.imagenes.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative rounded-xl overflow-hidden transition-all bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0 ${
                      idx === selectedImageIndex
                        ? "ring-4 ring-purple-500 scale-105"
                        : "ring-2 ring-gray-200 hover:ring-purple-300"
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt={img.alt || product.nombre}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Imagen Principal */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-xl group flex-1 order-1 sm:order-2">
              <img
                src={getProductImage(selectedImageIndex)}
                alt={product.nombre}
                className="w-full h-[400px] sm:h-[500px] object-contain p-4"
              />

              {/* Badge de stock agotado */}
              {product.stock === 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Agotado
                </div>
              )}

              {/* Badge de stock bajo */}
              {product.stock > 0 && product.stock <= 5 && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                  ¡Solo quedan {product.stock}!
                </div>
              )}

              {/* Navegación de imágenes */}
              {product.imagenes && product.imagenes.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImageIndex((prev) =>
                        prev === 0 ? product.imagenes.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                  >
                    <span className="text-xl sm:text-2xl">‹</span>
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImageIndex((prev) =>
                        prev === product.imagenes.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                  >
                    <span className="text-xl sm:text-2xl">›</span>
                  </button>

                  {/* Indicador */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm">
                    {selectedImageIndex + 1} / {product.imagenes.length}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Información del Producto */}
          <div className="space-y-4 sm:space-y-6">
            {/* Título y Precio */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">
                {product.nombre}
              </h1>

              {/* Categoría */}
              {product.categoria_nombre && (
                <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                  {product.categoria_nombre}
                </span>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-yellow-400 text-sm sm:text-base md:text-lg"
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-xs sm:text-sm">(4.5)</span>
              </div>

              {/* Precio */}
              <div className="mb-4 sm:mb-6">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  ${parseFloat(product.precio || 0).toFixed(2)}
                </div>
              </div>

              {/* Stock */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <FaBox
                    className={`text-sm sm:text-base ${
                      product.stock === 0 ? "text-red-600" : "text-green-600"
                    }`}
                  />
                  <span
                    className={`font-semibold text-sm sm:text-base ${
                      product.stock === 0
                        ? "text-red-600"
                        : product.stock > 5
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  >
                    {product.stock === 0
                      ? "Agotado"
                      : `${product.stock} unidades disponibles`}
                  </span>
                </div>
              </div>

              {/* Cantidad - Solo mostrar si hay stock */}
              {product.stock > 0 && (
                <div className="mb-4 sm:mb-6">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Cantidad
                  </label>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.max(
                            1,
                            Math.min(
                              product.stock,
                              parseInt(e.target.value) || 1
                            )
                          )
                        )
                      }
                      className="w-16 h-10 sm:w-20 sm:h-12 text-center text-lg sm:text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Botones de Acción - Producto Agotado */}
              {product.stock === 0 && (
                <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-red-600 font-bold text-base sm:text-lg">
                      ⚠️ Producto Agotado
                    </span>
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm mb-4">
                    Este producto está temporalmente agotado. Contáctanos por
                    WhatsApp para consultar disponibilidad y tiempo de
                    reposición.
                  </p>
                  <button
                    onClick={() =>
                      openWhatsApp(product.nombre, product.precio, 1)
                    }
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                  >
                    <FaWhatsapp className="text-xl sm:text-2xl" />
                    Consultar Disponibilidad
                  </button>
                </div>
              )}

              {/* Botones de Acción - Producto con Stock */}
              {product.stock > 0 && (
                <div className="space-y-2.5 sm:space-y-3">
                  <button
                    onClick={() =>
                      openWhatsApp(product.nombre, product.precio, quantity)
                    }
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                  >
                    <FaWhatsapp className="text-xl sm:text-2xl" />
                    Comprar por WhatsApp
                  </button>
                </div>
              )}
            </div>

            {/* Beneficios */}
            {/* <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold text-lg mb-4 text-gray-800">
                Beneficios de Compra
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <FaShippingFast className="text-blue-500 text-xl" />
                  <span>Envío rápido y seguro</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FaShieldAlt className="text-green-500 text-xl" />
                  <span>Compra 100% segura</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FaTags className="text-purple-500 text-xl" />
                  <span>Mejor precio garantizado</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-pink-500 text-xl" />
                  <span>Satisfacción garantizada</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Descripción */}
        {product.descripcion && (
          <div className="mt-8 sm:mt-12 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">
              Descripción del Producto
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
              {product.descripcion}
            </p>
          </div>
        )}

        {/* Productos Relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 md:mb-8 text-gray-900">
              También te podría interesar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/product/${rel.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <img
                      src={
                        rel.imagenes?.[0]?.image_url ||
                        "https://via.placeholder.com/400x400?text=Sin+Imagen"
                      }
                      alt={rel.nombre}
                      className="w-full h-56 object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {rel.nombre}
                    </h3>
                    {rel.categoria_nombre && (
                      <span className="inline-block text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full mb-3">
                        {rel.categoria_nombre}
                      </span>
                    )}
                    <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                      ${parseFloat(rel.precio || 0).toFixed(2)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default ProductDetail;
