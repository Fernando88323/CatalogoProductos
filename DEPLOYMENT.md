# 🚀 Guía de Despliegue en Vercel

## ✅ Checklist Pre-Despliegue

- [x] Dependencias instaladas
- [x] Build exitoso localmente (`pnpm build`)
- [x] Archivo `vercel.json` configurado
- [x] `.gitignore` actualizado
- [x] `.env.example` creado
- [ ] Variables de entorno de producción preparadas
- [ ] Backend desplegado y funcionando
- [ ] URLs del backend actualizadas

## 📋 Pasos para Desplegar

### 1. Preparar el Backend

Antes de desplegar el frontend, asegúrate de que tu backend esté desplegado y funcionando. Necesitarás su URL.

### 2. Subir el Código a GitHub

```bash
git add .
git commit -m "Preparar proyecto para producción"
git push origin main
```

### 3. Desplegar en Vercel

#### Opción A: Desde la Web (Recomendado)

1. Ve a https://vercel.com
2. Haz clic en "Add New" → "Project"
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Vite
5. **IMPORTANTE**: Antes de hacer clic en "Deploy", configura las variables de entorno

#### Configurar Variables de Entorno

En la sección "Environment Variables", agrega:

```
VITE_API_BASE_URL=https://TU-BACKEND-URL.com
VITE_API_UPLOAD_UPLOAD=https://TU-BACKEND-URL.com/upload/upload
VITE_API_PRODUCTOS=https://TU-BACKEND-URL.com/upload/productos
VITE_API_PRODUCTOS_ALL=https://TU-BACKEND-URL.com/upload/productos/all
VITE_API_PRODUCTOS_INACTIVOS=https://TU-BACKEND-URL.com/upload/productos/inactivos
VITE_API_PRODUCTOS_DETAIL=https://TU-BACKEND-URL.com/upload/productos
VITE_API_PRODUCTOS_IMAGENES=https://TU-BACKEND-URL.com/upload/productos
VITE_API_PRODUCTOS_REACTIVAR=https://TU-BACKEND-URL.com/upload/productos
VITE_API_PRODUCTOS_PERMANENTE=https://TU-BACKEND-URL.com/upload/productos
VITE_API_AUTH_LOGIN=https://TU-BACKEND-URL.com/auth/login
VITE_API_AUTH_LOGOUT=https://TU-BACKEND-URL.com/auth/logout
VITE_API_AUTH_VERIFY=https://TU-BACKEND-URL.com/auth/verify
```

**Nota**: Reemplaza `TU-BACKEND-URL.com` con la URL real de tu backend en producción.

6. Haz clic en "Deploy"
7. Espera a que termine el despliegue (1-3 minutos)

#### Opción B: Desde la CLI

```bash
# Iniciar sesión (solo la primera vez)
vercel login

# Desplegar en preview
vercel

# Desplegar a producción
vercel --prod
```

**Nota**: Si usas la CLI, deberás configurar las variables de entorno manualmente en el dashboard de Vercel.

### 4. Configurar CORS en el Backend

Una vez desplegado, asegúrate de que tu backend permita peticiones desde tu dominio de Vercel:

```javascript
// Ejemplo de configuración CORS en Node.js/Express
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Para desarrollo
      "https://tu-app.vercel.app", // Tu dominio de Vercel
      "https://tu-dominio-custom.com", // Si tienes dominio personalizado
    ],
    credentials: true,
  })
);
```

### 5. Verificar el Despliegue

1. Abre la URL que te proporciona Vercel
2. Verifica que la aplicación cargue correctamente
3. Prueba todas las funcionalidades principales:
   - ✅ Listado de productos
   - ✅ Detalle de producto
   - ✅ Login de administrador
   - ✅ Crear/editar productos
   - ✅ Subir imágenes

### 6. Configurar Dominio Personalizado (Opcional)

1. En Vercel Dashboard, ve a tu proyecto
2. Settings → Domains
3. Agrega tu dominio personalizado
4. Sigue las instrucciones para configurar los DNS

## 🔄 Redesplegar con Cambios

### Automático (desde GitHub)

Cada vez que hagas `git push` a tu rama principal, Vercel desplegará automáticamente los cambios.

### Manual (desde CLI)

```bash
vercel --prod
```

## 🐛 Solución de Problemas

### Error: "Network Error" o "Failed to fetch"

- Verifica que las variables de entorno estén correctamente configuradas
- Verifica que la URL del backend sea correcta
- Verifica que el backend esté funcionando
- Verifica la configuración CORS del backend

### Error: 404 en rutas

El archivo `vercel.json` ya incluye la configuración para manejar el enrutamiento de React Router. Si aún tienes problemas, verifica que el archivo exista en la raíz del proyecto.

### Las variables de entorno no se actualizan

Después de cambiar variables de entorno en Vercel:

1. Ve a Deployments
2. Encuentra el último despliegue
3. Haz clic en los 3 puntos → "Redeploy"

## 📊 Monitoreo

Vercel proporciona:

- **Analytics**: Estadísticas de visitas
- **Logs**: Logs de errores en tiempo real
- **Performance**: Métricas de rendimiento

Accede a ellos desde el dashboard de tu proyecto.

## 🔐 Seguridad

- ✅ Nunca subas el archivo `.env` a GitHub
- ✅ Usa variables de entorno para URLs sensibles
- ✅ Configura CORS correctamente en el backend
- ✅ Implementa autenticación/autorización en el backend

## 📞 Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Guía de Vite + Vercel](https://vercel.com/docs/frameworks/vite)
- [Variables de entorno en Vercel](https://vercel.com/docs/environment-variables)

---

**¡Listo!** Tu aplicación debería estar funcionando en producción. 🎉
