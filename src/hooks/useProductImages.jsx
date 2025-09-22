import { useState, useEffect } from "react";

export const useProductImages = (productId) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductImages = async () => {
      if (!productId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        // Obtener imágenes del producto usando el endpoint específico
        const response = await fetch(
          `http://localhost:4000/upload/productos/${productId}/imagenes`
        );

        if (response.ok) {
          const result = await response.json();
          setImages(result);
        } else {
          throw new Error(
            `Error al obtener imágenes: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Error al obtener imágenes del producto:", error);
        setError(error.message);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductImages();
  }, [productId]);

  const refetch = () => {
    if (!productId) return;

    const fetchProductImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:4000/upload/productos/${productId}/imagenes`
        );

        if (response.ok) {
          const result = await response.json();
          setImages(result);
        } else {
          throw new Error(
            `Error al obtener imágenes: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Error al obtener imágenes del producto:", error);
        setError(error.message);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductImages();
  };

  return {
    images,
    isLoading,
    error,
    refetch,
  };
};
