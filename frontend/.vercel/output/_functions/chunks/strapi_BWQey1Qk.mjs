import { s as strapiApi } from './api_CZuaGnY8.mjs';

function normalizeCategory(category) {
  if (!category) return null;
  if (category.id && category.nombre) return category;
  if (category.data) {
    return { id: category.data.id, ...category.data.attributes };
  }
  return null;
}
function normalizeProduct(item) {
  const productData = item.attributes || item;
  return {
    id: item.id,
    nombre: productData.nombre,
    descripcion: productData.descripcion,
    precio: productData.precio,
    precioMayorista: productData.precioMayorista,
    cantidadMinima: productData.cantidadMinima,
    stock: productData.stock,
    activo: productData.activo,
    slug: productData.slug,
    imagenes: productData.imagenes || [],
    categoria: normalizeCategory(productData.categoria)
  };
}
async function getProductos() {
  try {
    const response = await strapiApi.get("/productos", {
      params: {
        populate: ["imagenes", "categoria"],
        "filters[activo][$eq]": true
      }
    });
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data.map(normalizeProduct).filter((producto) => producto && producto.slug);
    }
    console.warn("La respuesta de la API de productos no tiene la estructura esperada.");
    return [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
async function getProductoBySlug(slug) {
  try {
    const response = await strapiApi.get("/productos", {
      params: {
        populate: ["imagenes", "categoria"],
        "filters[slug][$eq]": slug,
        "filters[activo][$eq]": true
      }
    });
    if (response.data.data && response.data.data.length > 0) {
      return normalizeProduct(response.data.data[0]);
    }
    return void 0;
  } catch (error) {
    console.error("Error fetching product:", error);
    return void 0;
  }
}
async function getCategorias() {
  try {
    const response = await strapiApi.get("/categorias", {
      params: { populate: "*" }
    });
    return response.data.data.map(normalizeCategory);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
async function getSectionsPage() {
  try {
    const response = await strapiApi.get("/sections-page", {
      params: {
        populate: ["componente.imagenbanner"]
      }
    });
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching sections page:", error);
    return null;
  }
}

export { getProductos as a, getCategorias as b, getSectionsPage as c, getProductoBySlug as g };
