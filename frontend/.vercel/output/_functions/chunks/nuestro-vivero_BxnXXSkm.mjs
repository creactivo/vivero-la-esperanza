import { c as createComponent } from './astro-component_huBepDft.mjs';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_DMXKRZo6.mjs';
import { $ as $$Layout } from './Layout_Bf35xjIb.mjs';
import { g as getProjects, $ as $$ProjectCarousel } from './ProjectCarousel_lACuzskp.mjs';
import { g as getImageUrl } from './api_CZuaGnY8.mjs';

const $$NuestroVivero = createComponent(async ($$result, $$props, $$slots) => {
  const SAMPLE_PROJECTS = [
    {
      id: 1,
      documentId: "sample-1",
      nombre: "Jardín Residencial",
      descripcion: "Diseño y ejecución de jardín para vivienda privada.",
      activo: true,
      slug: "jardin-residencial",
      imagenes: [{ id: 1, documentId: "img-1", nombre: "Jardín", alternativeText: "Jardín de ejemplo", url: "/images/Jardin-1.jpg" }]
    }
  ];
  const allProjects = await getProjects();
  const usingFallback = allProjects.length === 0;
  const featuredSource = usingFallback ? SAMPLE_PROJECTS : allProjects;
  const featuredProjects = featuredSource.slice(0, 3).map((project) => ({
    ...project,
    imageUrl: project.imagenes && project.imagenes.length > 0 ? getImageUrl(project.imagenes[0].url) : "/images/Jardin-1.jpg"
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Nuestro Vivero", "data-astro-cid-4vz3d24h": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="hero-section about-hero" data-astro-cid-4vz3d24h> <div class="container text-center" data-astro-cid-4vz3d24h> <span class="hero-subtitle" data-astro-cid-4vz3d24h>SOBRE NOSOTROS</span> <h1 class="hero-title" data-astro-cid-4vz3d24h>Vivero Esperanza</h1> <p class="hero-desc" data-astro-cid-4vz3d24h>
En Vivero Esperanza, cultivamos más que plantas; cultivamos
                sueños y espacios verdes que inspiran. Con años de experiencia y
                una pasión inquebrantable por la naturaleza, somos su aliado
                perfecto para transformar cualquier ambiente en un refugio de
                belleza y serenidad.
</p> </div> </section> <section class="about-content section-padding" data-astro-cid-4vz3d24h> <div class="container grid-2-cols" data-astro-cid-4vz3d24h> <div class="about-image" data-astro-cid-4vz3d24h> <!-- Placeholder image for about section --> <img src="/images/about-nuestro-vivero-con-planta-suculentas.jpg" alt="Nuestro Vivero" class="responsive-image" data-astro-cid-4vz3d24h> <div class="about-image-right" data-astro-cid-4vz3d24h> <!-- Placeholder image for about section --> <img src="/images/sembrando.jpg" alt="Nuestro Vivero" class="responsive-image" data-astro-cid-4vz3d24h> </div> </div> <div class="about-text" data-astro-cid-4vz3d24h> <h2 data-astro-cid-4vz3d24h>Creando Obras Maestras</h2> <p data-astro-cid-4vz3d24h>
Nuestra misión es proveer plantas de la más alta calidad y
                    ofrecer soluciones innovadoras de diseño paisajístico.
                    Queremos fomentar la conexión con la naturaleza, mejorar la
                    calidad de vida y embellecer el mundo, un jardín a la vez.
</p> <div class="mt-6" data-astro-cid-4vz3d24h> <a href="/proyectos" class="btn btn-primary btn-lg" data-astro-cid-4vz3d24h>Catalogo</a> </div> </div> </div> </section> <section class="services-content section-padding" data-astro-cid-4vz3d24h> <div class="container services-column" data-astro-cid-4vz3d24h> <h2 class="section-title" data-astro-cid-4vz3d24h>Proveedores de Grandes Servicios</h2> <p class="services-desc" data-astro-cid-4vz3d24h>
La venta de plantas al por mayor es un servicio que ofrece la
                venta de una gran cantidad de plantas a otras empresas o
                particulares.
</p> </div> <div class="container services-grid" role="list" data-astro-cid-4vz3d24h> <div class="service-item filter-item" role="listitem" data-astro-cid-4vz3d24h> <img src="/images/Jardin-1.jpg" alt="Proyectos de Construcción" data-astro-cid-4vz3d24h> <h4 class="service-name" data-astro-cid-4vz3d24h>Proyectos de Construcción</h4> <p class="service-text" data-astro-cid-4vz3d24h>
La venta de plantas al por mayor es un servicio que ofrece
                    la venta de una gran cantidad de plantas a otras empresas o
                    particulares. Estas plantas pueden ser utilizadas para
                    reforestar áreas, para proyectos de paisajismo o para la
                    venta minorista en centros de jardinería y tiendas
                    especializadas.
</p> </div> <div class="service-item filter-item" role="listitem" data-astro-cid-4vz3d24h> <img src="/images/diseño.jpg" alt="Diseño de Jardines" data-astro-cid-4vz3d24h> <h4 class="service-name" data-astro-cid-4vz3d24h>Diseño de Jardines</h4> <p class="service-text" data-astro-cid-4vz3d24h>
El diseño de jardines es un servicio que se enfoca en la
                    planificación y creación de un espacio exterior que sea
                    atractivo y funcional. El objetivo final es crear un espacio
                    exterior que refleje el estilo y la personalidad del
                    cliente.
</p> </div> <div class="service-item filter-item" role="listitem" data-astro-cid-4vz3d24h> <img src="/images/sembrando.jpg" alt="Proveedores para Viveros" data-astro-cid-4vz3d24h> <h4 class="service-name" data-astro-cid-4vz3d24h>Proveedores para Viveros</h4> <p class="service-text" data-astro-cid-4vz3d24h>
El mantenimiento de jardines es un servicio que se enfoca en
                    mantener la salud y belleza de los jardines. Esto puede
                    incluir cortar el césped, podar los arbustos y árboles,
                    fertilizar las plantas y flores, y controlar las malas
                    hierbas y plagas.
</p> </div> <div class="service-item filter-item" role="listitem" data-astro-cid-4vz3d24h> <img src="/images/mantenimiento.jpg" alt="Mantenimiento de Jardines" data-astro-cid-4vz3d24h> <h4 class="service-name" data-astro-cid-4vz3d24h>Mantenimiento de Jardines</h4> <p class="service-text" data-astro-cid-4vz3d24h>
La reforestación es un servicio que consiste en plantar
                    árboles y plantas en áreas previamente deforestadas o donde
                    la vegetación ha sido eliminada por alguna razón. Los
                    expertos en reforestación pueden determinar qué especies de
                    árboles y plantas son adecuadas para la región y el clima.
</p> </div> </div> </section> <section class="featured-projects section-padding" data-astro-cid-4vz3d24h> <div class="container mb-5" data-astro-cid-4vz3d24h> <h2 class="section-title text-center" data-astro-cid-4vz3d24h>
Nuestros Proyectos Destacados
</h2> <p class="section-description text-center" data-astro-cid-4vz3d24h>
Descubre algunas de nuestras creaciones más recientes que
                transforman espacios y vidas.
</p> ${usingFallback && renderTemplate`<div class="fallback-notice text-center" data-astro-cid-4vz3d24h> <em data-astro-cid-4vz3d24h>
Mostrando proyectos de ejemplo porque la API no
                            respondió o no hay proyectos publicados.
</em> </div>`} </div> ${renderComponent($$result2, "ProjectCarousel", $$ProjectCarousel, { "projects": featuredProjects, "visibleItems": 2, "showHeader": false, "data-astro-cid-4vz3d24h": true })} <div class="container text-center mt-4" data-astro-cid-4vz3d24h> <a href="/proyectos" class="btn btn-primary btn-lg" data-astro-cid-4vz3d24h>VER MÁS PROYECTOS</a> </div> </section> ` })}`;
}, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/pages/nuestro-vivero.astro", void 0);

const $$file = "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/pages/nuestro-vivero.astro";
const $$url = "/nuestro-vivero";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$NuestroVivero,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
