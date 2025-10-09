# 🔗 Conectar Frontend (Vercel) con Backend (Railway)

## 📋 Paso 1: Obtener la URL de tu Backend en Railway

1. Ve a tu proyecto en Railway: https://railway.app/dashboard
2. Abre tu servicio backend
3. Ve a la pestaña **Settings**
4. Busca la sección **Domains** o **Public Networking**
5. Copia la URL pública (algo como: `https://tu-proyecto.railway.app`)

## ⚙️ Paso 2: Configurar Variables de Entorno en Vercel

### Opción A: Desde el Dashboard de Vercel (Recomendado)

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto
3. Click en **Settings** (en el menú superior)
4. Click en **Environment Variables** (menú lateral)
5. Agrega cada variable una por una:

#### Variables a Configurar:

**Importante**: Reemplaza `https://tu-backend.railway.app` con tu URL real de Railway

```env
VITE_API_BASE_URL=https://tu-backend.railway.app

https://catalogoproductosbackend-production-fcd1.up.railway.app/

VITE_API_UPLOAD_UPLOAD=https://tu-backend.railway.app/upload/upload

VITE_API_PRODUCTOS=https://tu-backend.railway.app/upload/productos

VITE_API_PRODUCTOS_ALL=https://tu-backend.railway.app/upload/productos/all

VITE_API_PRODUCTOS_INACTIVOS=https://tu-backend.railway.app/upload/productos/inactivos

VITE_API_PRODUCTOS_DETAIL=https://tu-backend.railway.app/upload/productos

VITE_API_PRODUCTOS_IMAGENES=https://tu-backend.railway.app/upload/productos

VITE_API_PRODUCTOS_REACTIVAR=https://tu-backend.railway.app/upload/productos

VITE_API_PRODUCTOS_PERMANENTE=https://tu-backend.railway.app/upload/productos

VITE_API_AUTH_LOGIN=https://tu-backend.railway.app/auth/login

VITE_API_AUTH_LOGOUT=https://tu-backend.railway.app/auth/logout

VITE_API_AUTH_VERIFY=https://tu-backend.railway.app/auth/verify
```

6. Para cada variable:

   - Click en **Add New**
   - Ingresa el **Name** (ejemplo: `VITE_API_BASE_URL`)
   - Ingresa el **Value** (ejemplo: `https://tu-backend.railway.app`)
   - Selecciona los ambientes: **Production**, **Preview**, **Development** (todos)
   - Click en **Save**

7. Una vez agregadas todas las variables, **Redeploy** tu proyecto:
   - Ve a la pestaña **Deployments**
   - Click en los 3 puntos del último deployment
   - Click en **Redeploy**

### Opción B: Desde la CLI de Vercel

```bash
# Configurar variables de entorno
vercel env add VITE_API_BASE_URL production
# Ingresa el valor: https://tu-backend.railway.app

# Repetir para cada variable...

# Luego redesplegar
vercel --prod
```

## 🔒 Paso 3: Configurar CORS en el Backend (Railway)

Tu backend debe permitir peticiones desde tu dominio de Vercel. Asegúrate de tener algo como esto en tu backend:

```javascript
// Ejemplo en Node.js/Express
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Desarrollo local
      "https://tu-frontend.vercel.app", // Tu dominio de Vercel
      "https://tu-dominio-personalizado.com", // Si tienes dominio custom
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

**Importante**: Agrega esta configuración como variable de entorno en Railway también:

En Railway → Settings → Variables:

```
FRONTEND_URL=https://tu-frontend.vercel.app
```

Y en tu código del backend:

```javascript
origin: process.env.FRONTEND_URL || "http://localhost:5173";
```

## ✅ Paso 4: Verificar la Conexión

1. Espera a que termine el redespliegue en Vercel (1-3 minutos)
2. Abre tu aplicación en el navegador
3. Abre las **DevTools** (F12) → **Console**
4. Abre la pestaña **Network**
5. Intenta cargar productos o hacer alguna petición
6. Verifica que las peticiones vayan a tu URL de Railway
7. Verifica que no haya errores de CORS

## 🐛 Solución de Problemas

### Error: "CORS policy blocked"

**Solución**: Configura CORS en el backend (ver Paso 3)

### Error: "Network Error" o "Failed to fetch"

Verifica:

- ✅ Las variables de entorno están correctamente escritas (sin espacios)
- ✅ La URL de Railway es correcta y el backend está funcionando
- ✅ El backend está escuchando en el puerto correcto
- ✅ Redesplegaste después de agregar las variables

### Las variables no se aplican

- Las variables de entorno en Vercel solo se aplican en **build time**
- Después de cambiar variables, debes **redesplegar**
- Verifica que las variables tengan el prefijo `VITE_` (requerido por Vite)

### Probar las variables localmente

Puedes crear un archivo `.env.production` local para probar:

```bash
# .env.production
VITE_API_BASE_URL=https://tu-backend.railway.app
# ... resto de variables
```

Luego ejecuta:

```bash
pnpm build
pnpm preview
```

## 📝 Checklist Final

- [ ] URL de Railway obtenida
- [ ] Todas las variables agregadas en Vercel
- [ ] Proyecto redesplegado en Vercel
- [ ] CORS configurado en el backend
- [ ] URL del frontend agregada en Railway (variable FRONTEND_URL)
- [ ] Backend redesplegado con la configuración CORS
- [ ] Aplicación probada en el navegador
- [ ] Sin errores en la consola
- [ ] Peticiones funcionando correctamente

## 🎯 Comandos Rápidos

### Para ver tus deployments en Vercel:

```bash
vercel ls
```

### Para ver los logs en tiempo real:

```bash
vercel logs <deployment-url>
```

### Para verificar las variables de entorno:

```bash
vercel env ls
```

---

**¡Listo!** Tu frontend en Vercel ahora debería estar conectado a tu backend en Railway. 🚀
