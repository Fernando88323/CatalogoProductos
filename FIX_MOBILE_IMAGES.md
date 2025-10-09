# 🔧 Solución: Imágenes no aparecen en móviles

## 📋 Problema

Las imágenes de productos no se mostraban en dispositivos móviles, pero sí funcionaban correctamente en modo escritorio.

## 🎯 Causas Identificadas

### 1. **Problema de Mixed Content (HTTP vs HTTPS)**

Los navegadores móviles son más estrictos con el contenido mixto. Si tu sitio está en HTTPS pero las imágenes están en HTTP, los navegadores móviles bloquean la carga.

### 2. **Lazy Loading Agresivo**

El `IntersectionObserver` con configuración muy estricta (`threshold: 0.1`) no detectaba correctamente las imágenes en móviles debido a comportamientos de scroll diferentes.

### 3. **Falta de Manejo de Estados de Carga**

No había feedback visual cuando las imágenes estaban cargando o fallaban, causando confusión.

### 4. **Content Security Policy (CSP)**

Faltaba una política explícita para permitir imágenes desde diferentes orígenes.

## ✅ Soluciones Implementadas

### 1. **Forzar HTTPS en URLs de Imágenes**

**Archivos modificados:**

- `src/pages/HomePage/HomePage.jsx`
- `src/pages/ProductDetail/ProductDetail.jsx`

```javascript
const getProductImage = (product) => {
  if (
    product.imagenes &&
    Array.isArray(product.imagenes) &&
    product.imagenes.length > 0
  ) {
    const imageUrl = product.imagenes[0].image_url;
    if (imageUrl && typeof imageUrl === "string" && imageUrl.trim() !== "") {
      // Forzar HTTPS si la URL es HTTP
      const secureUrl = imageUrl.startsWith("http://")
        ? imageUrl.replace("http://", "https://")
        : imageUrl;
      return secureUrl;
    }
  }
  return "https://via.placeholder.com/400x400?text=Sin+Imagen";
};
```

### 2. **Optimizar IntersectionObserver para Móviles**

**Archivo modificado:** `src/components/ProductCard/ProductCard.jsx`

```javascript
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
      observer.unobserve(entry.target);
    }
  },
  {
    threshold: 0.01, // Reducido para móviles
    rootMargin: "50px 0px 50px 0px", // Margen más amplio para pre-cargar
  }
);
```

### 3. **Agregar Estados de Carga y Error**

**Archivo modificado:** `src/components/ProductCard/ProductCard.jsx`

```javascript
const [imageLoaded, setImageLoaded] = useState(false);
const [imageError, setImageError] = useState(false);

const handleImageLoad = () => {
  setImageLoaded(true);
  setImageError(false);
};

const handleImageError = () => {
  setImageError(true);
  setImageLoaded(false);
  console.error(`Error loading image for product: ${product.nombre}`);
};
```

**Feedback visual:**

- **Cargando**: Spinner animado
- **Error**: Mensaje "Sin imagen"
- **Éxito**: Transición suave de opacidad

### 4. **Configurar Content Security Policy**

**Archivo modificado:** `index.html`

```html
<meta
  http-equiv="Content-Security-Policy"
  content="img-src 'self' data: https: http:;"
/>
```

### 5. **Optimizar Carga de Imágenes**

```html
<img src={getProductImage(product)} alt={product.nombre} className={`w-full
h-full object-contain p-4 ${ imageLoaded ? "opacity-100" : "opacity-0" }`}
onLoad={handleImageLoad} onError={handleImageError} loading="eager"
decoding="async" />
```

- `loading="eager"`: Carga inmediata, sin lazy loading
- `decoding="async"`: Decodificación asíncrona para mejor rendimiento

### 6. **Mejorar Altura de Contenedor**

```jsx
<div className="relative overflow-hidden bg-gray-50 h-56 sm:h-64 flex items-center justify-center">
```

- Altura fija para mantener el layout estable
- `flex items-center justify-center` para centrar imágenes

## 📱 Cómo Probar

### En Desarrollo Local:

1. Ejecuta el proyecto: `npm run dev`
2. Abre DevTools (F12)
3. Activa el modo responsive (Ctrl + Shift + M)
4. Selecciona un dispositivo móvil (iPhone, Android)
5. Recarga la página (Ctrl + R)
6. Verifica que las imágenes carguen correctamente

### En Producción (Vercel):

1. Haz push de los cambios:

```bash
git add .
git commit -m "Fix: Imágenes no aparecían en móviles"
git push origin main
```

2. Vercel desplegará automáticamente

3. Prueba desde tu teléfono:
   - Abre el sitio en el navegador móvil
   - Verifica que las imágenes carguen
   - Intenta hacer scroll para ver lazy loading

## 🐛 Debugging Adicional

Si las imágenes aún no cargan en móvil:

### 1. Verifica las URLs en la consola

Abre DevTools en tu móvil (puedes usar Chrome Remote Debugging) y verifica:

```javascript
// Esto imprimirá las URLs de imágenes en desarrollo
if (import.meta.env.DEV) {
  console.log(
    `Producto sin imagen válida: ${product.nombre}`,
    product.imagenes
  );
}
```

### 2. Verifica el Backend

Asegúrate de que tu backend esté devolviendo las URLs de imágenes correctamente:

```bash
curl https://tu-backend.railway.app/upload/productos
```

### 3. Verifica CORS

Si las imágenes están en un dominio diferente, verifica que CORS esté configurado correctamente en tu backend.

Ver: `CONFIGURAR_CORS_RAILWAY.md`

### 4. Verifica las URLs de las Imágenes

Las URLs deben ser:

- **✅ HTTPS** (no HTTP)
- **✅ Accesibles** públicamente
- **✅ Con CORS** habilitado (si están en dominio externo)

## 📊 Mejoras de Rendimiento

### Antes:

- ❌ Sin feedback de carga
- ❌ HTTP bloqueado en móviles
- ❌ Lazy loading muy agresivo
- ❌ Sin manejo de errores

### Después:

- ✅ Spinner durante carga
- ✅ HTTPS forzado automáticamente
- ✅ Lazy loading optimizado para móviles
- ✅ Manejo completo de errores
- ✅ Transiciones suaves
- ✅ Placeholder en caso de error

## 🚀 Despliegue

1. **Commitear cambios:**

```bash
git add .
git commit -m "Fix: Imágenes no aparecían en móviles - forzar HTTPS, optimizar lazy loading, agregar estados de carga"
git push origin main
```

2. **Vercel desplegará automáticamente** (2-3 minutos)

3. **Probar en móvil real:**
   - Abre la URL de Vercel en tu teléfono
   - Verifica que las imágenes carguen
   - Prueba en diferentes navegadores (Chrome, Safari)

## ✅ Checklist de Verificación

- [x] URLs de imágenes convertidas a HTTPS
- [x] IntersectionObserver optimizado
- [x] Estados de carga agregados (loading, error)
- [x] CSP configurado en index.html
- [x] Atributos de imagen optimizados
- [x] Feedback visual implementado
- [x] Console.log para debugging
- [x] Altura de contenedor fija
- [x] Transiciones suaves

## 📝 Notas Importantes

1. **Backend debe servir URLs HTTPS**: Si tu backend está devolviendo URLs HTTP, considera actualizar la base de datos o usar un proxy.

2. **Cloudinary u otro CDN**: Si usas un servicio de almacenamiento de imágenes, asegúrate de que soporte HTTPS.

3. **Actualizar URLs en BD**: Eventualmente, deberías actualizar las URLs en tu base de datos de HTTP a HTTPS para evitar la conversión en runtime.

## 🎯 Resultado Esperado

Después de estos cambios:

- ✅ Las imágenes se cargan correctamente en móviles
- ✅ Feedback visual durante la carga
- ✅ Mejor rendimiento con lazy loading optimizado
- ✅ Manejo robusto de errores
- ✅ Compatibilidad con HTTP y HTTPS

---

**Si el problema persiste después de estos cambios, verifica:**

1. Las URLs en la base de datos
2. La configuración de CORS en el backend
3. Los logs del navegador en el dispositivo móvil
