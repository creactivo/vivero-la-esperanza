# Guía de Configuración de Strapi - Tienda Esperanza

Esta guía te ayudará a configurar Strapi correctamente para la tienda mayorista de plantas.

## Paso 1: Iniciar Strapi

```bash
cd backend
npm run develop
```

Strapi se abrirá automáticamente en http://localhost:1337/admin

## Paso 2: Crear Usuario Administrador

1. Completa el formulario de registro del administrador
2. Usa un email y contraseña que recuerdes

## Paso 3: Crear Content Types

### Content Type: Categoria

1. Ve a **Content-Type Builder** en el menú lateral
2. Haz clic en **"Create new collection type"**
3. Display name: `Categoria`
4. Agrega los siguientes campos:

   - **nombre** 
     - Type: Text (Short text)
     - Required: ✓
     
   - **descripcion**
     - Type: Text (Long text)
     - Required: ✗
     
   - **slug**
     - Type: UID
     - Attached field: nombre
     - Required: ✓

5. Haz clic en **"Save"** (Strapi se reiniciará automáticamente)

### Content Type: Producto

1. Ve a **Content-Type Builder**
2. Haz clic en **"Create new collection type"**
3. Display name: `Producto`
4. Agrega los siguientes campos:

   - **nombre**
     - Type: Text (Short text)
     - Required: ✓
     
   - **descripcion**
     - Type: Rich text
     - Required: ✓
     
   - **precio**
     - Type: Number
     - Number format: decimal
     - Required: ✓
     
   - **precioMayorista**
     - Type: Number
     - Number format: decimal
     - Required: ✓
     
   - **cantidadMinima**
     - Type: Number
     - Number format: integer
     - Required: ✓
     
   - **stock**
     - Type: Number
     - Number format: integer
     - Required: ✓
     - Default value: 0
     
   - **slug**
     - Type: UID
     - Attached field: nombre
     - Required: ✓
     
   - **activo**
     - Type: Boolean
     - Required: ✗
     - Default value: true
     
   - **imagenes**
     - Type: Media
     - Type: Multiple files
     - Allowed types: Images
     
   - **categoria**
     - Type: Relation
     - Many productos to One categoria

5. Haz clic en **"Save"**

## Paso 4: Configurar Permisos

1. Ve a **Settings > Users & Permissions Plugin > Roles**
2. Haz clic en **"Public"**
3. En la sección **Permissions**:
   
   **Categoria:**
   - ✓ find
   - ✓ findOne
   
   **Producto:**
   - ✓ find
   - ✓ findOne

4. Haz clic en **"Save"**

## Paso 5: Agregar Contenido de Prueba

### Crear Categorías

1. Ve a **Content Manager > Categoria**
2. Haz clic en **"Create new entry"**
3. Agrega categorías de ejemplo:

   **Categoría 1:**
   - Nombre: Plantas de Interior
   - Descripción: Plantas perfectas para interiores
   - (El slug se generará automáticamente: `plantas-de-interior`)

   **Categoría 2:**
   - Nombre: Plantas de Exterior
   - Descripción: Plantas resistentes para exteriores

   **Categoría 3:**
   - Nombre: Suculentas
   - Descripción: Plantas suculentas de bajo mantenimiento

4. **¡IMPORTANTE!** Haz clic en **"Publish"** para cada categoría

### Crear Productos

1. Ve a **Content Manager > Producto**
2. Haz clic en **"Create new entry"**
3. Agrega productos de ejemplo:

   **Producto 1:**
   - Nombre: Monstera Deliciosa
   - Descripción: Hermosa planta tropical de interior con hojas grandes y perforadas
   - Precio: 25.00
   - Precio Mayorista: 18.00
   - Cantidad Mínima: 10
   - Stock: 100
   - Activo: ✓
   - Categoría: Plantas de Interior
   - Imágenes: (sube una imagen o usa placeholder)

   **Producto 2:**
   - Nombre: Pothos Dorado
   - Descripción: Planta trepadora de fácil cuidado, ideal para principiantes
   - Precio: 15.00
   - Precio Mayorista: 10.00
   - Cantidad Mínima: 20
   - Stock: 200
   - Activo: ✓
   - Categoría: Plantas de Interior

   **Producto 3:**
   - Nombre: Echeveria Mix
   - Descripción: Variedad de suculentas echeveria en diferentes colores
   - Precio: 8.00
   - Precio Mayorista: 5.00
   - Cantidad Mínima: 50
   - Stock: 500
   - Activo: ✓
   - Categoría: Suculentas

4. **¡IMPORTANTE!** Haz clic en **"Publish"** para cada producto

## Paso 6: Verificar la API

Abre tu navegador y prueba estos endpoints:

- Categorías: http://localhost:1337/api/categorias?populate=*
- Productos: http://localhost:1337/api/productos?populate=deep

Deberías ver los datos en formato JSON.

## Paso 7: Probar el Frontend

Con Strapi corriendo, en otra terminal:

```bash
cd frontend
npm run dev
```

Visita http://localhost:4321 y verifica:
- ✓ Los productos aparecen en la página principal
- ✓ El catálogo muestra todos los productos
- ✓ Las categorías aparecen en el filtro
- ✓ Puedes ver el detalle de cada producto

## ¡Listo!

Tu tienda está configurada y lista para usar. Ahora solo falta configurar Firebase para habilitar el sistema de órdenes.
