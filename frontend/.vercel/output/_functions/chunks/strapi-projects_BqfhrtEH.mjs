import { s as strapiApi } from './api_CZuaGnY8.mjs';

function normalizeProject(item) {
  const projectData = item.attributes || item;
  return {
    id: item.id,
    documentId: projectData.documentId || item.id.toString(),
    nombre: projectData.nombre,
    descripcion: projectData.descripcion,
    activo: projectData.activo,
    slug: projectData.slug,
    imagenes: projectData.imagenes || []
  };
}
async function getProjects() {
  try {
    const response = await strapiApi.get("/proyectos", {
      params: {
        populate: ["imagenes"],
        "filters[activo][$eq]": true
      }
    });
    const proyectos = response.data.data.map(normalizeProject);
    return proyectos.filter(
      (proyecto) => Boolean(proyecto && proyecto.slug)
    );
  } catch (error) {
    console.error("[strapi-projects] Error al obtener proyectos:", error);
    return [];
  }
}
async function getProjectsBySlug(slug) {
  try {
    const response = await strapiApi.get("/proyectos", {
      params: {
        populate: ["imagenes"],
        "filters[slug][$eq]": slug,
        "filters[activo][$eq]": true
      }
    });
    if (response.data.data && response.data.data.length > 0) {
      return normalizeProject(response.data.data[0]);
    }
    return void 0;
  } catch (error) {
    console.error("Error fetching project:", error);
    return void 0;
  }
}

export { getProjectsBySlug as a, getProjects as g };
