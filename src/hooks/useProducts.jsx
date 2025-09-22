import { useState, useEffect } from "react";

export const useProducts = ({ page = 1, limit = 12 } = {}) => {
  const [data, setData] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Obtener productos únicamente del servidor usando el nuevo endpoint
        const response = await fetch(
          `http://localhost:4000/upload/productos?page=${page}&limit=${limit}`
        );

        if (response.ok) {
          const result = await response.json();

          // Validar que la respuesta tenga la estructura esperada
          if (result && typeof result === "object") {
            // El backend devuelve: { success: true, message: "...", data: [...] }
            if (result.data && Array.isArray(result.data)) {
              // Usar directamente los datos del backend sin transformaciones
              setData({ items: result.data });
            } else if (result.items && Array.isArray(result.items)) {
              setData(result);
            } else if (Array.isArray(result)) {
              setData({ items: result });
            } else {
              setData({ items: [] });
            }
          } else {
            setData({ items: [] });
          }
        } else {
          throw new Error(
            `Error del servidor: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("❌ Error al obtener productos:", error);
        setError(error.message);
        setData({ items: [] }); // Mostrar lista vacía en caso de error
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit]);

  const refetch = () => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:4000/upload/productos?page=${page}&limit=${limit}`
        );

        if (response.ok) {
          const result = await response.json();
          // Validar que la respuesta tenga la estructura esperada
          if (result && typeof result === "object") {
            // El backend devuelve: { success: true, message: "...", data: [...] }
            if (result.data && Array.isArray(result.data)) {
              // Usar directamente los datos del backend sin transformaciones
              setData({ items: result.data });
            } else if (result.items && Array.isArray(result.items)) {
              setData(result);
            } else if (Array.isArray(result)) {
              setData({ items: result });
            } else {
              setData({ items: [] });
            }
          } else {
            setData({ items: [] });
          }
        } else {
          throw new Error(
            `Error del servidor: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setError(error.message);
        setData({ items: [] });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  };

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
