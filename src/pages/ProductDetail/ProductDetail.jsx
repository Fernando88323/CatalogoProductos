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
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-12 pb-20 md:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Miniaturas skeleton */}
              <div className="flex sm:flex-col gap-2 order-2 sm:order-1 justify-center sm:justify-start">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg animate-pulse flex-shrink-0"
                  ></div>
                ))}
              </div>
              {/* Imagen principal skeleton */}
              <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl sm:rounded-2xl animate-pulse flex-1 order-1 sm:order-2"></div>
            </div>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="h-8 sm:h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 sm:h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-24 sm:h-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 sm:h-16 bg-gray-200 rounded animate-pulse"></div>
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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-12 pb-20 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {/* Galería de Imágenes */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Miniaturas al lado izquierdo */}
            {product.imagenes && product.imagenes.length > 1 && (
              <div className="flex sm:flex-col gap-2 order-2 sm:order-1 flex-wrap sm:flex-nowrap justify-center sm:justify-start">
                {product.imagenes.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative rounded-lg overflow-hidden transition-all bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0 ${
                      idx === selectedImageIndex
                        ? "ring-2 ring-purple-500 scale-105"
                        : "ring-1 ring-gray-200 hover:ring-purple-300"
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt={img.alt || product.nombre}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain p-1.5"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Imagen Principal */}
            <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl group flex-1 order-1 sm:order-2">
              <img
                src={getProductImage(selectedImageIndex)}
                alt={product.nombre}
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-contain p-3 sm:p-4"
              />

              {/* Badge de stock agotado */}
              {product.stock === 0 && (
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                  Agotado
                </div>
              )}

              {/* Badge de stock bajo */}
              {product.stock > 0 && product.stock <= 5 && (
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-pulse">
                  ¡Solo {product.stock}!
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
                    className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                  >
                    <span className="text-lg sm:text-xl">‹</span>
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImageIndex((prev) =>
                        prev === product.imagenes.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                  >
                    <span className="text-lg sm:text-xl">›</span>
                  </button>

                  {/* Indicador */}
                  <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm">
                    {selectedImageIndex + 1} / {product.imagenes.length}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Información del Producto */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {/* Título y Precio */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-lg sm:shadow-xl">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-3 leading-tight">
                {product.nombre}
              </h1>

              {/* Categoría */}
              {product.categoria_nombre && (
                <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-2 sm:mb-3 shadow-sm">
                  {product.categoria_nombre}
                </span>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-yellow-400 text-xs sm:text-sm md:text-base"
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-xs sm:text-sm">(4.5)</span>
              </div>

              {/* Precio */}
              <div className="mb-3 sm:mb-4 md:mb-5">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
                  ${parseFloat(product.precio || 0).toFixed(2)}
                </div>
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
                <div className="flex items-center gap-2">
                  <FaBox
                    className={`text-sm sm:text-base ${
                      product.stock === 0 ? "text-red-600" : "text-green-600"
                    }`}
                  />
                  <span
                    className={`font-semibold text-xs sm:text-sm md:text-base ${
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
                <div className="mb-3 sm:mb-4 md:mb-5">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Cantidad
                  </label>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 active:from-gray-300 active:to-gray-400 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-base sm:text-lg transition-all shadow-sm hover:shadow"
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
                      className="w-14 h-9 sm:w-16 sm:h-10 text-center text-base sm:text-lg font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    />
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 active:from-gray-300 active:to-gray-400 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-base sm:text-lg transition-all shadow-sm hover:shadow"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Botones de Acción - Producto Agotado */}
              {product.stock === 0 && (
                <div className="p-3 sm:p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg sm:rounded-xl mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className="text-red-600 font-bold text-sm sm:text-base md:text-lg">
                      ⚠️ Producto Agotado
                    </span>
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    Este producto está temporalmente agotado. Contáctanos por
                    WhatsApp para consultar disponibilidad y tiempo de
                    reposición.
                  </p>
                  <button
                    onClick={() =>
                      openWhatsApp(product.nombre, product.precio, 1)
                    }
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp className="text-lg sm:text-xl" />
                    Consultar Disponibilidad
                  </button>
                </div>
              )}

              {/* Botones de Acción - Producto con Stock */}
              {product.stock > 0 && (
                <div className="space-y-2 sm:space-y-2.5">
                  <button
                    onClick={() =>
                      openWhatsApp(product.nombre, product.precio, quantity)
                    }
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp className="text-lg sm:text-xl" />
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
          <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-12 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-lg sm:shadow-xl">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">
              Descripción del Producto
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {product.descripcion}
            </p>
          </div>
        )}

        {/* Productos Relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-3 sm:mb-4 md:mb-6 text-gray-900">
              También te podría interesar
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md transition-all duration-300"
                >
                  <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
                    <img
                      src={
                        rel.imagenes?.[0]?.image_url ||
                        "https://via.placeholder.com/400x400?text=Sin+Imagen"
                      }
                      alt={rel.nombre}
                      className="w-full h-36 sm:h-48 md:h-56 object-contain p-2 sm:p-3 md:p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 sm:p-4 md:p-5">
                    <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {rel.nombre}
                    </h3>
                    {rel.categoria_nombre && (
                      <span className="inline-block text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 px-2 py-0.5 sm:py-1 rounded-full mb-2 sm:mb-3">
                        {rel.categoria_nombre}
                      </span>
                    )}
                    <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                      ${parseFloat(rel.precio || 0).toFixed(2)}
                    </div>

                    {/* Botón Ver Detalle — solo este es clickeable */}
                    <div className="mt-3">
                      <Link
                        to={`/product/${rel.id}`}
                        className="w-full inline-flex bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 items-center justify-center gap-2 text-xs sm:text-sm"
                        aria-label={`Ver detalle de ${rel.nombre}`}
                      >
                        <span>Ver Detalle</span>
                        <span className="group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
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
