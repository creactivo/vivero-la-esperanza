# Lista de Futuras Características y Tareas

Aquí puedes añadir las ideas y tareas pendientes para que yo pueda implementarlas en el futuro. Usa el formato de checklist para llevar un seguimiento.

## Ideas Generales
- [ ] Implementar un sistema de valoraciones y reseñas para los productos.
- [ ] Optimizar las imágenes para que la web cargue más rápido.
- [x] crear una pagina donde el usuario pueda ver su perfil y pueda acceder a sus pedidos, esta debe ser la pagina del usuario.
- [x] dejar solo un boton de hacer pedidos en el carrito de compras.
- [x] implementar el envio de pedidos por correo electronico para que llegue a nustro correo y podamos despachar.
- [x] implementar la comunicacion por whatsapp desde la pagina.

## Mejoras de Diseño
- [x] Añadir animaciones sutiles a los botones y tarjetas de producto.

## Seguridad y Despliegue
- [x] Configurar reglas de seguridad de Cloud Firestore en Firebase Console para proteger la colección `ordenes` (solo usuarios autenticados pueden crear; solo el dueño puede leer/escribir).
- [x] Asegurarse de que el archivo `.env` esté listado en `.gitignore` para no subir secretos a GitHub.
- [x] Configurar la variable `CORS_ORIGINS` en el panel de control de Strapi Cloud apuntando únicamente al dominio de producción de Vercel.
- [x] Generar un Token de API Read-Only en Strapi Cloud y añadirlo como `STRAPI_API_TOKEN` en Vercel.
- [x] Implementar badges, que solo se activen si el producto es nuevo. quitarlas de las categorias.

