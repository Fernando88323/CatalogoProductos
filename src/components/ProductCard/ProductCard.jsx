import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <img
        src={product.images[0]?.url}
        alt={product.images[0]?.alt || product.name}
        className="w-full h-48 object-contain mb-2 rounded bg-white"
      />
      <h2 className="font-bold text-lg">{product.name}</h2>
      <p className="text-gray-700">${product.price}</p>

      {/* Enlace al detalle del producto */}
      <Link
        to={`/product/${product.id}`}
        className="block bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700 transition"
      >
        Ver Detalle
      </Link>
    </div>
  );
}
export default ProductCard;
