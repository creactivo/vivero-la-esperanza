# Plan de Despliegue en Producción

Este plan detalla los pasos necesarios para desplegar de manera segura y eficiente tu aplicación. Como asistente de IA, te ayudaré preparando los archivos de configuración locales, pero **necesitarás realizar algunos pasos manualmente en las consolas de Vercel, Strapi y Firebase**.

## User Review Required

> [!WARNING]
> **Acciones Manuales Requeridas:**
> Dado que no tengo acceso a tus cuentas de Vercel, Firebase o Strapi Cloud, deberás realizar el registro de variables de entorno y conexión de repositorios por tu cuenta. ¿Estás de acuerdo en que yo prepare los archivos locales y tú te encargues de los pasos en las consolas web?

## Proposed Changes

### Preparación Local (Lo que haré yo)

1. **Reglas de Seguridad de Firebase:**
   Crearé un archivo `firestore.rules` en la raíz del proyecto para proteger la colección de `ordenes`. Solo los usuarios autenticados podrán crear órdenes, y solo podrán leer/escribir las que les pertenecen.

2. **Actualización de la Lista de Tareas:**
   Marcaré en `Lista-Futuras-Caracteristicas.md` las tareas de revisión de `.gitignore` (que ya está correcto) y la creación de las reglas de seguridad.

#### [NEW] [firestore.rules](file:///c:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/firestore.rules)
#### [MODIFY] [Lista-Futuras-Caracteristicas.md](file:///c:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/Lista-Futuras-Caracteristicas.md)

### Pasos de Despliegue (Lo que harás tú)

A continuación te detallo la guía paso a paso que deberás seguir una vez que apruebes este plan:

#### 1. Subir el código a GitHub
Asegúrate de que todos los cambios estén commiteados y subidos a un repositorio en GitHub.

#### 2. Desplegar Strapi en Strapi Cloud
1. Ve a [Strapi Cloud](https://cloud.strapi.io/) y crea un nuevo proyecto.
2. Conecta tu repositorio de GitHub. Configura el **Root Directory** como `backend`.
3. Strapi Cloud aprovisionará la base de datos PostgreSQL y el almacenamiento de medios automáticamente.
4. **Configurar CORS:** En el panel de Strapi Cloud, ve a Settings -> CORS y agrega tu futuro dominio de Vercel (por ahora puedes poner `*` o el temporal de Vercel, pero luego cámbialo a tu dominio final).
5. **Token de API:** Ve al panel de administración de tu Strapi ya en la nube (`https://tu-proyecto.strapiapp.com/admin`), ve a Settings -> API Tokens, crea un nuevo token con permisos **Read-Only** y cópialo.

#### 3. Desplegar Astro en Vercel
1. Ve a [Vercel](https://vercel.com/) y crea un nuevo proyecto conectando el mismo repositorio de GitHub.
2. Configura el **Framework Preset** como `Astro`.
3. Configura el **Root Directory** como `frontend`.
4. En **Environment Variables**, debes agregar las siguientes:
   * `PUBLIC_STRAPI_URL` = `https://tu-proyecto.strapiapp.com` (La URL de tu Strapi Cloud)
   * `STRAPI_API_TOKEN` = `El token Read-Only que copiaste`
   * Todas tus variables de Firebase (`PUBLIC_FIREBASE_API_KEY`, etc.) que tienes en tu `.env` local.
5. Haz clic en **Deploy**.

#### 4. Configurar Firebase Firestore
1. Ve a la Consola de Firebase -> Firestore Database -> Rules.
2. Copia y pega el contenido del archivo `firestore.rules` que voy a crear para proteger tus datos.

#### 5. Configurar Webhooks (Opcional pero recomendado)
1. En Vercel, ve a Settings -> Git -> Deploy Hooks y crea uno nuevo. Copia la URL.
2. En tu Strapi admin (producción), ve a Settings -> Webhooks. Crea uno nuevo y pega la URL de Vercel. Selecciona los eventos de creación/actualización/borrado de productos. Esto hará que Vercel recompile la página estática cada vez que actualices el inventario.

## Verification Plan

### Manual Verification
- Ingresar a la URL de producción de Vercel y verificar que la tienda cargue correctamente los productos desde Strapi Cloud.
- Intentar realizar un pedido e iniciar sesión para verificar que la conexión con Firebase funciona desde el dominio en producción.
- Revisar en Firebase Firestore que el pedido se haya guardado correctamente con el `userId` correspondiente.
