# 🖼️ ProductImage Component

## 📝 Descripción

Componente reutilizable para cargar y mostrar imágenes de productos desde el backend de forma asíncrona. Maneja estados de carga, errores y muestra imágenes de Cloudinary con spinner animado.

## 🎯 Características

- ✅ Carga asíncrona de imágenes desde el backend
- ✅ Spinner animado durante la carga
- ✅ Manejo de errores con mensaje visual
- ✅ Integración con Cloudinary
- ✅ Lazy loading para mejor rendimiento
- ✅ Totalmente personalizable
- ✅ Sin dependencias de archivos externos

## 📦 Ubicación

```
src/components/ProductImage/ProductImage.jsx
```

## 🚀 Uso

### Importación

```javascript
import ProductImage from "../../components/ProductImage/ProductImage";
```

### Ejemplo Básico

```jsx
<ProductImage
  productId={1}
  alt="Nombre del producto"
  className="w-full h-full object-cover"
/>
```

### En una Tabla

```jsx
<ProductImage
  productId={product.id}
  alt={product.nombre}
  className="w-20 h-20 rounded-lg object-contain"
/>
```

## 🎨 Props

| Prop        | Tipo     | Requerido | Descripción                           |
| ----------- | -------- | --------- | ------------------------------------- |
| `productId` | `number` | ✅ Sí     | ID del producto para cargar la imagen |
| `alt`       | `string` | ❌ No     | Texto alternativo para la imagen      |
| `className` | `string` | ❌ No     | Clases CSS de Tailwind para estilizar |

## 🔄 Estados Visuales

### 1. Loading (Cargando)

```jsx
// Muestra un spinner animado morado
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
```

### 2. Error (Sin imagen)

```jsx
// Muestra un mensaje de error
<div className="bg-red-500/10 text-red-400">❌ Sin imagen</div>
```

### 3. Success (Imagen cargada)

```jsx
// Muestra la imagen de Cloudinary
<img src="https://res.cloudinary.com/.../imagen.jpg" />
```

## 📡 Endpoint Consumido

```
GET http://localhost:4000/productos/:id/imagenes
```

### Estructura de Respuesta Esperada

```json
{
  "success": true,
  "message": "X imágenes encontradas...",
  "data": {
    "producto_id": 1,
    "producto_nombre": "Nombre del producto",
    "imagenes": [
      {
        "id": 1,
        "image_url": "https://res.cloudinary.com/...",
        "public_id": "...",
        "fecha_creacion": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

## 🎯 Casos de Uso

### 1. En una Tabla de Inventario

```jsx
<td className="px-6 py-4">
  <div className="w-16 h-16 rounded-lg overflow-hidden">
    <ProductImage
      productId={product.id}
      alt={product.nombre}
      className="w-full h-full object-cover"
    />
  </div>
</td>
```

### 2. En un Modal

```jsx
<div className="flex items-center gap-4">
  <ProductImage
    productId={selectedProduct.id}
    alt={selectedProduct.nombre}
    className="w-24 h-24 object-cover rounded-lg border-2"
  />
  <div>
    <h3>{selectedProduct.nombre}</h3>
  </div>
</div>
```

### 3. En una Card de Producto

```jsx
<div className="product-card">
  <ProductImage
    productId={product.id}
    alt={product.nombre}
    className="w-full h-48 object-contain p-4"
  />
  <h3>{product.nombre}</h3>
</div>
```

### 4. En un Carrusel

```jsx
<div className="carousel-item">
  <ProductImage
    productId={product.id}
    alt={product.nombre}
    className="w-screen h-96 object-cover"
    loadingImage="/skeleton.png"
  />
</div>
```

## 🐛 Debugging

El componente incluye logs en consola para facilitar el debugging:

```javascript
// Logs disponibles:
console.log(`Imágenes del producto ${productId}:`, result);
console.log(`Imagen cargada para producto ${productId}:`, url);
console.warn(`No hay imágenes disponibles para el producto ${productId}`);
console.error(`Error en la respuesta para producto ${productId}:`, result);
console.error(`Error cargando imagen del producto ${productId}:`, err);
```

## ⚡ Optimizaciones

- **Lazy Loading**: Las imágenes se cargan solo cuando son visibles
- **Caché del navegador**: Las imágenes de Cloudinary se cachean automáticamente
- **Estados claros**: Feedback visual en cada estado (carga, éxito, error)
- **Manejo de errores**: Fallback automático a imagen de error

## 🔧 Mantenimiento

### Agregar Más Funcionalidades

```jsx
// Ejemplo: Soporte para múltiples imágenes
const [currentImageIndex, setCurrentImageIndex] = useState(0);

// Cambiar entre imágenes
const nextImage = () => {
  setCurrentImageIndex((prev) => (prev + 1) % imagenes.length);
};
```

### Personalizar Comportamiento

```jsx
// Ejemplo: Reintentar carga en caso de error
const [retryCount, setRetryCount] = useState(0);

const handleRetry = () => {
  if (retryCount < 3) {
    setRetryCount((prev) => prev + 1);
    loadImage();
  }
};
```

## 📋 Checklist de Integración

- [ ] Importar el componente
- [ ] Pasar el `productId` requerido
- [ ] Definir clases CSS con `className`
- [ ] Agregar texto alternativo con `alt`
- [ ] Probar con productos que tengan y no tengan imágenes
- [ ] Verificar la consola para errores de carga
- [ ] Asegurar que el backend esté corriendo en `localhost:4000`

## 🎨 Ejemplos de Estilos Comunes

```jsx
// Circular
<ProductImage className="w-20 h-20 rounded-full object-cover" />

// Cuadrado con borde
<ProductImage className="w-24 h-24 rounded-lg border-2 border-gray-300" />

// Responsive
<ProductImage className="w-full h-auto max-w-md" />

// Con sombra
<ProductImage className="w-32 h-32 rounded-xl shadow-lg" />

// En Grid
<ProductImage className="aspect-square object-cover rounded-md" />
```

## 🔗 Componentes Relacionados

- `ProductCard` - Usa ProductImage para mostrar productos
- `InventoryManagement` - Usa ProductImage en la tabla de gestión
- `ProductDetail` - Podría usar ProductImage para el detalle del producto

## 📚 Referencias

- [Cloudinary Docs](https://cloudinary.com/documentation)
- [React useEffect Hook](https://react.dev/reference/react/useEffect)
- [Lazy Loading Images](https://web.dev/lazy-loading-images/)

---

Creado para reutilización en toda la aplicación 🚀
