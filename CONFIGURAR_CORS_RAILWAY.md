# 🔧 Configurar CORS en Railway (Backend)

## 📋 Guía Paso a Paso

### Paso 1: Instalar el paquete CORS

En tu proyecto backend (en Railway), necesitas instalar el paquete `cors`.

Si usas **npm**:

```bash
npm install cors
```

Si usas **pnpm**:

```bash
pnpm add cors
```

Si usas **yarn**:

```bash
yarn add cors
```

### Paso 2: Configurar CORS en tu archivo principal

Abre el archivo principal de tu backend (probablemente `index.js`, `server.js`, o `app.js`).

**⚠️ IMPORTANTE**: La configuración de CORS debe ir **ANTES** de tus rutas.

#### Opción A: Configuración Específica (RECOMENDADO para producción)

```javascript
const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CONFIGURACIÓN DE CORS - DEBE IR ANTES DE LAS RUTAS
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Desarrollo local
      "https://catalogo-productos-4z7dr29cn-fernandos-projects-9d4a6279.vercel.app", // Tu deployment de Vercel
      "https://catalogo-productos.vercel.app", // Si tienes dominio personalizado
      "https://*.vercel.app", // Todos tus deployments de Vercel
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    maxAge: 600, // 10 minutos
  })
);

// ✅ MIDDLEWARE ADICIONAL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ TUS RUTAS DEBEN IR DESPUÉS
app.use("/upload", uploadRoutes);
app.use("/auth", authRoutes);

// ... resto de tu código
```

#### Opción B: Permitir Todos los Orígenes (SOLO PARA TESTING)

```javascript
const express = require("express");
const cors = require("cors");

const app = express();

// ⚠️ SOLO PARA TESTING - Permite todos los orígenes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tus rutas...
app.use("/upload", uploadRoutes);
app.use("/auth", authRoutes);
```

### Paso 3: Usar Variables de Entorno (MEJOR PRÁCTICA)

Es mejor manejar las URLs permitidas con variables de entorno:

#### 3.1 En tu código backend:

```javascript
const cors = require("cors");

// Obtener orígenes permitidos desde variables de entorno
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
```

#### 3.2 En Railway Dashboard:

1. Ve a tu proyecto en Railway
2. Selecciona tu servicio backend
3. Ve a **Variables**
4. Agrega una nueva variable:

```
Name: ALLOWED_ORIGINS
Value: http://localhost:5173,https://catalogo-productos-4z7dr29cn-fernandos-projects-9d4a6279.vercel.app,https://catalogo-productos.vercel.app
```

### Paso 4: Verificar el orden del código

**MUY IMPORTANTE**: El orden correcto debe ser:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// 1️⃣ PRIMERO: CORS
app.use(cors({...}));

// 2️⃣ SEGUNDO: Middleware de parseo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3️⃣ TERCERO: Tus rutas
app.use('/upload', uploadRoutes);
app.use('/auth', authRoutes);

// 4️⃣ CUARTO: Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
```

### Paso 5: Commit y Push

Después de hacer los cambios:

```bash
git add .
git commit -m "Configurar CORS para permitir peticiones desde Vercel"
git push origin main
```

Railway detectará automáticamente los cambios y redesplegará tu backend.

### Paso 6: Verificar el Redespliegue

1. Ve a Railway Dashboard
2. Verás que el servicio se está redespliegando
3. Espera 1-3 minutos a que termine
4. Verifica en los logs que no haya errores

### Paso 7: Probar la Conexión

1. Abre tu frontend en Vercel
2. Abre DevTools (F12) → Network
3. Hard Reload: Ctrl + Shift + R
4. Verifica que las peticiones ahora funcionen sin errores de CORS

## 🐛 Solución de Problemas

### Error: "cors is not a function"

Asegúrate de importar correctamente:

```javascript
const cors = require("cors"); // ✅ Correcto
// NO: import cors from 'cors';  (a menos que uses ES modules)
```

### Error: "Cannot find module 'cors'"

Instala el paquete:

```bash
npm install cors
```

Y verifica que esté en tu `package.json`:

```json
{
  "dependencies": {
    "cors": "^2.8.5",
    ...
  }
}
```

### Sigue sin funcionar

1. Verifica los logs de Railway
2. Asegúrate de que el código de CORS esté ANTES de las rutas
3. Verifica que redesplegaste después de los cambios
4. Prueba primero con `app.use(cors())` (permite todos) para confirmar que el problema es CORS

## 📝 Ejemplo Completo

```javascript
// Importaciones
const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./routes/upload");
const authRoutes = require("./routes/auth");

// Crear app
const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CONFIGURAR CORS (PRIMERO)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://catalogo-productos-4z7dr29cn-fernandos-projects-9d4a6279.vercel.app",
      "https://catalogo-productos.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/upload", uploadRoutes);
app.use("/auth", authRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "API funcionando con CORS configurado" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log(`✅ CORS configurado para Vercel`);
});
```

## ✅ Checklist

- [ ] Instalar paquete `cors`
- [ ] Importar `cors` en archivo principal
- [ ] Configurar `app.use(cors({...}))` ANTES de las rutas
- [ ] Agregar el dominio de Vercel en `origin`
- [ ] Commit y push de los cambios
- [ ] Verificar redespliegue en Railway
- [ ] Probar desde el frontend en Vercel
- [ ] Verificar en DevTools que no haya errores de CORS

---

**Una vez que configures CORS y redespliegues, tu aplicación debería funcionar correctamente!** 🚀
