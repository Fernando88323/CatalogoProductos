@echo off
echo ========================================
echo 🚀 Desplegando a Vercel (Produccion)
echo ========================================
echo.

echo 📦 Agregando cambios a Git...
git add .

echo.
echo 📝 Commit de cambios...
set /p mensaje="Ingresa el mensaje del commit (o presiona Enter para usar mensaje por defecto): "
if "%mensaje%"=="" (
    git commit -m "Fix: Productos visibles inmediatamente en moviles"
) else (
    git commit -m "%mensaje%"
)

echo.
echo 🔄 Haciendo push a GitHub...
git push origin main

echo.
echo 🌐 Desplegando a Vercel...
vercel --prod

echo.
echo ========================================
echo ✅ Despliegue completado!
echo ========================================
echo.
echo 🔗 URL de producción: https://catalogo-productos.vercel.app
echo 📱 Prueba en tu móvil en 2-3 minutos
echo.
pause
