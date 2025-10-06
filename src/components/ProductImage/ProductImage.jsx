import { useState, useEffect } from "react";

/**
 * Componente para cargar y mostrar imágenes de productos desde el backend
 * @param {number} productId - ID del producto
 * @param {string} alt - Texto alternativo para la imagen
 * @param {string} className - Clases CSS para estilizar la imagen
 */
const ProductImage = ({ productId, alt, className }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Resetear estado cuando cambia el productId
    setLoading(true);
    setError(false);
    setImageUrl(null);

    const loadImage = async () => {
      if (!productId) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:4000/upload/productos/${productId}/imagenes`
        );
        const result = await response.json();

        if (result.success && result.data) {
          const imagenes = result.data.imagenes;

          if (imagenes && imagenes.length > 0) {
            const firstImage = imagenes[0];

            if (firstImage.image_url) {
              setImageUrl(firstImage.image_url);
            } else {
              console.error("No se encontró image_url en:", firstImage);
              setError(true);
            }
          } else {
            console.warn(
              `No hay imágenes disponibles para el producto ${productId}`
            );
            setError(true);
          }
        } else {
          console.error(
            `Error en la respuesta para producto ${productId}:`,
            result
          );
          setError(true);
        }
      } catch (err) {
        console.error(`Error cargando imagen del producto ${productId}:`, err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [productId]);

  // Mostrar spinner mientras carga
  if (loading) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-white/5`}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Mostrar mensaje de error si falló
  if (error || !imageUrl) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-red-500/10 text-red-400 text-xs font-bold`}
      >
        <span>❌ Sin imagen</span>
      </div>
    );
  }

  // Mostrar imagen
  return (
    <img
      src={imageUrl}
      alt={alt || `Producto ${productId}`}
      className={className}
      onError={(e) => {
        console.error(
          `Error al cargar la imagen del producto ${productId}. URL: ${e.target.src}`
        );
        setError(true);
      }}
      loading="lazy"
    />
  );
};

export default ProductImage;
