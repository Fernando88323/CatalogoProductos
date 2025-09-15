import React from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useProducts } from "../../hooks/useProducts";
import Navbar from "../../components/Navbar/navbar";

function AdminDashboard() {
  const { data, isLoading } = useProducts({ page: 1, limit: 12 });
  if (isLoading)
    return (
      <p className="flex h-screen justify-center items-center text-2xl font-bold">
        Cargando productos...
      </p>
    );

  return (
    <div>
      <Navbar />
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
