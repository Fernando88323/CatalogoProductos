# Catálogo de Productos - Frontend

Aplicación web para gestión de catálogo de productos construida con React, Vite y Tailwind CSS.

## 🚀 Tecnologías

- **React 19** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS
- **React Router DOM** - Enrutamiento
- **React Hot Toast** - Notificaciones
- **React Icons** - Iconos

## 📦 Instalación

1. Clona el repositorio
2. Instala las dependencias:

```bash
pnpm install
```

3. Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

4. Configura las variables de entorno con las URLs de tu backend

## 🛠️ Desarrollo

Para ejecutar el proyecto en modo desarrollo:

```bash
pnpm dev
```

El servidor se iniciará en `http://localhost:5173`

## 🏗️ Build para Producción

Para crear el build de producción:

```bash
pnpm build
```

Para previsualizar el build:

```bash
pnpm preview
```

## 🚢 Despliegue en Vercel

### Opción 1: Despliegue automático desde GitHub

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com) e inicia sesión
3. Click en "Add New Project"
4. Importa tu repositorio de GitHub
5. Vercel detectará automáticamente que es un proyecto Vite
6. Configura las **Variables de Entorno** en la sección "Environment Variables":
   - `VITE_API_BASE_URL`: URL de tu backend API
   - Y todas las demás variables que están en tu archivo `.env`
7. Click en "Deploy"

### Opción 2: Despliegue desde CLI

1. Instala Vercel CLI globalmente (si aún no lo has hecho):

```bash
npm i -g vercel
```

2. Inicia sesión en Vercel:

```bash
vercel login
```

3. Despliega tu proyecto:

```bash
vercel
```

4. Para despliegue a producción:

```bash
vercel --prod
```

### ⚙️ Configuración de Variables de Entorno en Vercel

Es **MUY IMPORTANTE** configurar las variables de entorno en Vercel:

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega todas las variables que están en tu `.env.example`
4. Asegúrate de usar las URLs de producción de tu backend
5. Guarda y vuelve a desplegar si es necesario

### 📝 Ejemplo de Variables de Entorno para Producción

```env
VITE_API_BASE_URL=https://tu-backend-api.com
VITE_API_UPLOAD_UPLOAD=https://tu-backend-api.com/upload/upload
VITE_API_PRODUCTOS=https://tu-backend-api.com/upload/productos
# ... etc
```

## 📁 Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
├── pages/           # Páginas/Vistas
├── hooks/           # Custom hooks
├── config/          # Configuraciones (API, etc.)
└── assets/          # Recursos estáticos
```

## 🔧 Scripts Disponibles

- `pnpm dev` - Inicia servidor de desarrollo
- `pnpm build` - Crea build de producción
- `pnpm preview` - Previsualiza el build
- `pnpm lint` - Ejecuta ESLint

## 📄 Licencia

Este proyecto es privado.
