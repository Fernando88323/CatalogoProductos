import { useParams } from "react-router-dom"; // si usas React Router
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import { products } from "../../data/products.js"; // tu JSON de productos
import { FaStar } from "react-icons/fa";
import ZoomImage from "../../components/ZoomImage/ZoomImage.jsx";

function ProductDetail() {
  const { id } = useParams(); // obtiene el id del producto desde la URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Buscar el producto por id en tu data
    const foundProduct = products.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Producto no encontrado...</p>
      </div>
    );
  }

  // filtra relacionados (ejemplo: mismos categoryId, o los 3 primeros distintos)
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

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
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              className="w-full h-[400px] object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex gap-4">
            {product.images.slice(1).map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={img.alt || product.name}
                className="w-20 h-20 object-cover rounded cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
              />
            ))}
          </div>
        </div>

        {/* Información */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            {/* Rating */}
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`mr-1 ${
                  i < product.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-gray-600">{product.rating}.0</span>
          </div>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <p className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>

          {/* Selector de cantidad */}
          <div className="flex items-center gap-4 mb-6">
            <label className="font-semibold">Cantidad:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 border rounded px-2 py-1 text-center"
            />
          </div>

          <button className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition">
            Agregar al Carrito
          </button>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="max-w-6xl mx-auto p-6 mt-12">
        <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              className="bg-white shadow p-4 rounded-lg hover:shadow-xl transition"
            >
              <img
                src={rel.images[0].url}
                alt={rel.images[0].alt || rel.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="font-bold">{rel.name}</h3>
              <p className="text-gray-700">${rel.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
