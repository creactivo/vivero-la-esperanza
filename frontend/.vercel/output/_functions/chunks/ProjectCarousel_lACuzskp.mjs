import { s as strapiApi, g as getImageUrl } from './api_CZuaGnY8.mjs';
import { c as createComponent } from './astro-component_huBepDft.mjs';
import { m as maybeRenderHead, h as addAttribute, p as renderTransition, k as renderTemplate, o as renderComponent } from './entrypoint_DMXKRZo6.mjs';
import { r as renderScript } from './Layout_Bf35xjIb.mjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

const $$ProjectCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProjectCard;
  const { proyecto } = Astro2.props;
  if (!proyecto?.slug) {
    return null;
  }
  const { nombre, descripcion, slug, imagenes } = proyecto;
  const imageUrl = imagenes?.[0] ? getImageUrl(imagenes[0].url) : "/images/Jardin-2.jpg";
  return renderTemplate`${maybeRenderHead()}<article class="project-card" data-astro-cid-mspuyifq> <a${addAttribute(`/proyectos/${slug}`, "href")} class="block img-link" data-astro-cid-mspuyifq> <div class="image-wrapper" data-astro-cid-mspuyifq> <img${addAttribute(imageUrl, "src")}${addAttribute(nombre, "alt")} loading="lazy" data-astro-cid-mspuyifq${addAttribute(renderTransition($$result, "i567zdxh", "", `image-${slug}`), "data-astro-transition-scope")}> </div> </a> <div class="card-content text-center" data-astro-cid-mspuyifq> <h3 class="project-title" data-astro-cid-mspuyifq> <a${addAttribute(`/proyectos/${slug}`, "href")} data-astro-cid-mspuyifq>${nombre}</a> </h3> <p class="project-description" data-astro-cid-mspuyifq> ${descripcion} </p> <a${addAttribute(`/proyectos/${slug}`, "href")} class="btn btn-secondary btn-sm btn-view-project" data-astro-cid-mspuyifq>
VER PROYECTO
</a> </div> </article>`;
}, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/ProjectCard.astro", "self");

const $$ProjectCarousel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProjectCarousel;
  const {
    title = "",
    projects = [],
    visibleItems = 2,
    showHeader = true
  } = Astro2.props;
  const displayProjects = projects.length > 1 ? [...projects, ...projects, ...projects] : projects;
  const gapSize = 30;
  return renderTemplate`${maybeRenderHead()}<section class="project-section"${addAttribute(visibleItems, "data-visible-items")} data-astro-cid-n2fcsbob> <div class="container" data-astro-cid-n2fcsbob> <div class="section-header" data-astro-cid-n2fcsbob> ${showHeader && title && renderTemplate`<h2 data-astro-cid-n2fcsbob>${title}</h2>`} <div class="nav-arrows"${addAttribute(!showHeader || !title ? "margin-left: auto;" : "", "style")} data-astro-cid-n2fcsbob> <button class="arrow-btn prev-btn" aria-label="Anterior" data-astro-cid-n2fcsbob> ${renderComponent($$result, "ChevronLeft", ChevronLeft, { "size": 24, "data-astro-cid-n2fcsbob": true })} </button> <button class="arrow-btn next-btn" aria-label="Siguiente" data-astro-cid-n2fcsbob> ${renderComponent($$result, "ChevronRight", ChevronRight, { "size": 24, "data-astro-cid-n2fcsbob": true })} </button> </div> </div> <div class="project-carousel" data-astro-cid-n2fcsbob> <div class="project-grid"${addAttribute(`--visible-items: ${visibleItems}; --gap-size: ${gapSize}px;`, "style")} data-astro-cid-n2fcsbob> ${displayProjects.map((project) => renderTemplate`${renderComponent($$result, "ProjectCard", $$ProjectCard, { "proyecto": project, "data-astro-cid-n2fcsbob": true })}`)} </div> </div> </div> </section>  ${renderScript($$result, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/ProjectCarousel.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/ProjectCarousel.astro", void 0);

export { $$ProjectCarousel as $, getProjects as g };
