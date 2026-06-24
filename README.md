# Tienda Mayorista de Plantas - Esperanza

Plataforma de e-commerce mayorista de plantas construida con Astro, Strapi y Firebase.

## 🌿 Características

- **Catálogo de productos** con precios mayoristas
- **Carrito de compras** con localStorage
- **Autenticación de usuarios** con Firebase
- **Sistema de órdenes** almacenado en Firestore
- **CMS headless** con Strapi para gestión de productos
- **Diseño moderno y responsivo** con animaciones

## 📋 Requisitos Previos

- Node.js 18+ y npm
- Cuenta de Firebase (para autenticación y Firestore)
- Git (opcional)

## 🚀 Instalación

Este es un monorepo gestionado con **pnpm workspaces**. La instalación de todas las dependencias (tanto del frontend como del backend) se realiza con un único comando desde la raíz del proyecto.

```bash
# Desde la raíz del proyecto
pnpm install
```

## ⚙️ Configuración

### Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Activa **Authentication** (método Email/Password)
4. Activa **Cloud Firestore**
5. En configuración del proyecto, copia las credenciales

### Variables de Entorno (Frontend)

Crea un archivo `.env` en la carpeta `frontend/` basado en `.env.example`:

```env
PUBLIC_STRAPI_URL=http://localhost:1337
PUBLIC_FIREBASE_API_KEY=tu_api_key
PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
PUBLIC_FIREBASE_APP_ID=tu_app_id
```

## 🎯 Uso en Desarrollo

### 1. Iniciar Strapi (Terminal 1)

```bash
cd backend
npm run develop
```

Strapi estará disponible en: http://localhost:1337

### 2. Configurar Strapi

1. Crea un usuario administrador en http://localhost:1337/admin
2. Ve a **Content-Type Builder**
3. Crea los Content Types necesarios:

#### Content Type: Producto

- nombre (Text, required)
- descripcion (Rich text, required)
- precio (Decimal, required)
- precioMayorista (Decimal, required)
- cantidadMinima (Number, required)
- stock (Number, required)
- slug (UID from nombre, required)
- activo (Boolean, default: true)
- imagenes (Media, multiple)
- categoria (Relation: many-to-one with Categoria)

#### Content Type: Categoria

- nombre (Text, required)
- descripcion (Text)
- slug (UID from nombre, required)
- productos (Relation: one-to-many with Producto)

4. Ve a **Settings > Users & Permissions > Public**
5. Activa permisos públicos para:
   - `producto: find, findOne`
   - `categoria: find, findOne`

## 📝 Notas de Arquitectura y Dependencias

Esta sección documenta decisiones clave y soluciones a conflictos de dependencias para mantener la estabilidad del proyecto.

### 1. Gestor de Paquetes: `pnpm workspaces`

- **Regla:** Utilizar siempre `pnpm` para la gestión de dependencias.
- **Instalación:** Ejecutar `pnpm install` únicamente desde la raíz del proyecto.
- **Scripts:** Ejecutar scripts con `pnpm --filter <nombre_workspace> <script>`, por ejemplo: `pnpm --filter frontend dev`.

### 2. Resolución de Conflictos de Dependencias (`pnpm.overrides`)

Para resolver conflictos de `peer dependencies` entre los workspaces, se utiliza la propiedad `pnpm.overrides` en el archivo `package.json` de la **raíz del proyecto**.

- **Conflicto `codemirror` en `backend` (Strapi):**
  - **Problema:** Una dependencia de Strapi (`@uiw/react-codemirror`) requiere `codemirror@^6.0.0`, pero otra dependencia transitiva intentaba instalar `codemirror@^5.0.0`, causando un conflicto.
  - **Solución:** Se ha añadido un `override` en el `package.json` de la raíz para forzar la versión correcta en todo el monorepo.
    ```json
    "pnpm": {
      "overrides": {
        "codemirror": "6.0.1"
      }
    }
    ```
  - **Ubicación:** Esta configuración **debe** estar en el `package.json` de la raíz, no en los `package.json` de los workspaces individuales.

### 3. Agregar Productos

1. En Strapi admin, crea algunas categorías
2. Agrega productos con imágenes
3. Publica el contenido

### 4. Iniciar Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

El sitio estará disponible en: http://localhost:4321

## 📂 Estructura del Proyecto

```
tienda-esperanza/
├── frontend/           # Aplicación Astro
│   ├── src/
│   │   ├── components/ # Componentes React y Astro
│   │   ├── layouts/    # Layout principal
│   │   ├── lib/        # Utilidades (Strapi, Firebase)
│   │   ├── pages/      # Páginas del sitio
│   │   └── styles/     # Estilos globales
│   └── public/         # Archivos estáticos
│
└── backend/            # Servidor Strapi
    ├── config/         # Configuración
    ├── src/api/        # Content Types
    └── public/         # Uploads de Strapi
```

## 🛒 Flujo de Compra

1. Usuario navega el catálogo
2. Agrega productos al carrito (cantidad mínima mayorista)
3. Se registra o inicia sesión
4. Completa el formulario de checkout con:
   - Nombre completo
   - Email
   - Nombre de la empresa
   - Número de celular
   - Dirección completa
5. La orden se guarda en Firebase Firestore
6. El carrito se vacía automáticamente

## 🔥 Firebase - Estructura de Datos

### Colección: `ordenes`

```javascript
{
  userId: string,
  fecha: timestamp,
  cliente: {
    nombreCompleto: string,
    email: string,
    empresa: string,
    celular: string,
    direccion: {
      calle: string,
      ciudad: string,
      codigoPostal: string,
      pais: string
    }
  },
  productos: [{
    productoId: number,
    nombre: string,
    cantidad: number,
    precioUnitario: number,
    subtotal: number
  }],
  total: number,
  estado: "pendiente" | "procesando" | "enviado" | "entregado"
}
```

## 🎨 Tecnologías

- **Frontend**: Astro 5, React 18
- **Estilos**: CSS personalizado con sistema de diseño
- **Backend**: Strapi 5 (SQLite en desarrollo)
- **Base de datos**: Firebase Firestore
- **Autenticación**: Firebase Auth
- **Tipografía**: Inter, Outfit (Google Fonts)

## 📝 Scripts Disponibles

### Frontend

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build

### Backend

- `npm run develop` - Servidor de desarrollo (con admin panel)
- `npm run start` - Servidor de producción
- `npm run build` - Build del admin panel

## 🚀 Producción

### Frontend

```bash
cd frontend
npm run build
```

Los archivos estáticos se generarán en `frontend/dist/`

### Backend

Para producción, se recomienda usar PostgreSQL o MySQL en lugar de SQLite:

1. Configura la base de datos en `backend/config/database.js`
2. Ejecuta `npm run build`
3. Despliega con `npm start`
## aca se colocan los cambios para que se pueda hacer un commit
Despliega coommit 1 jaja
## 🤝 Soporte

Para preguntas o problemas, contacta al equipo de desarrollo.

## 📄 Licencia

Privado - Todos los derechos reservados