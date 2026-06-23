import { c as createComponent } from './astro-component_huBepDft.mjs';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_DMXKRZo6.mjs';
import { $ as $$Layout } from './Layout_Bf35xjIb.mjs';
import { g as getProjects, $ as $$ProjectCarousel } from './ProjectCarousel_lACuzskp.mjs';
import { g as getImageUrl } from './api_CZuaGnY8.mjs';

const $$Proyectos = createComponent(async ($$result, $$props, $$slots) => {
  const allProjects = await getProjects();
  const projectsWithImages = allProjects.slice(0, 4).map((project) => ({
    ...project,
    imageUrl: project.imagenes.length > 0 ? getImageUrl(project.imagenes[0].url) : "/images/Jardin-1.jpg"
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Proyectos", "data-astro-cid-arbd3op2": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="hero-section projects-hero" data-astro-cid-arbd3op2> <div class="container text-center" data-astro-cid-arbd3op2> <span class="hero-subtitle" data-astro-cid-arbd3op2>NUESTRO PORTAFOLIO</span> <h1 class="hero-title" data-astro-cid-arbd3op2>Explora Nuestros Proyectos</h1> <p class="hero-desc" data-astro-cid-arbd3op2>
Desde pequeños jardines privados hasta grandes paisajes urbanos,
                cada proyecto es una obra de arte viva. Descubre cómo hemos
                transformado espacios y creado belleza natural.
</p> </div> </section> <section class="all-projects section-padding" data-astro-cid-arbd3op2> ${renderComponent($$result2, "ProjectCarousel", $$ProjectCarousel, { "title": "PROYECTOS", "projects": projectsWithImages, "visibleItems": 3, "data-astro-cid-arbd3op2": true })} </section> ` })}`;
}, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/pages/proyectos.astro", void 0);

const $$file = "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/pages/proyectos.astro";
const $$url = "/proyectos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Proyectos,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
