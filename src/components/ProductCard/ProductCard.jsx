import { Link } from "react-router-dom";

function ProductCard({ product }) {
  // URL de imagen por defecto o placeholder
  const defaultImage =
    product.imagenes?.[0]?.image_url ||
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==";

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 bg-white">
      <img
        src={defaultImage}
        alt={product.imagenes?.[0]?.alt || product.nombre}
        className="w-full h-48 object-contain mb-3 rounded-md bg-gray-50"
      />
      <h2 className="font-bold text-lg mb-2 text-gray-900">{product.nombre}</h2>
      <p className="text-gray-700 font-semibold text-xl mb-3">
        ${parseFloat(product.precio || 0).toFixed(2)}
      </p>

      {/* Stock y estado con mejor diseño */}
      <div className="mt-2 flex flex-wrap items-center gap-2 mb-4">
        {typeof product.stock !== "undefined" && (
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              product.stock <= 0
                ? "bg-red-100 text-red-800 border border-red-200"
                : "bg-green-100 text-green-800 border border-green-200"
            }`}
          >
            {product.stock <= 0 ? "Agotado" : `${product.stock} en stock`}
          </span>
        )}

        {typeof product.activo !== "undefined" && !product.activo && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-200 text-gray-800 border border-gray-300">
            No disponible
          </span>
        )}
      </div>

      {/* Enlace al detalle del producto */}
      <Link
        to={`/product/${product.id}`}
        className="block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg text-center hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition-all duration-200 font-medium"
      >
        Ver Detalle
      </Link>
    </div>
  );
}
export default ProductCard;
