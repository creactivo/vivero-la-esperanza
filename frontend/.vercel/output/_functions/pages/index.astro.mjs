import { c as createComponent, m as maybeRenderHead, d as addAttribute, r as renderComponent, a as renderTemplate, b as createAstro, F as Fragment } from '../chunks/astro/server_6TKJ0_KC.mjs';
import { $ as $$Layout } from '../chunks/Layout_D8BJRdtr.mjs';
import { g as getImageUrl } from '../chunks/api_CZuaGnY8.mjs';
import { Heart, ChevronLeft, ChevronRight, Leaf, Gift, Sprout, Scissors, Grid, List } from 'lucide-react';
/* empty css                                 */
import { a as getProductos, b as getCategorias, c as getSectionsPage } from '../chunks/strapi_BWQey1Qk.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro();
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const { producto } = Astro2.props;
  if (!producto?.slug) {
    return null;
  }
  const { nombre, precio, stock, slug, imagenes } = producto;
  const imageUrl = imagenes?.[0] ? getImageUrl(imagenes[0].url) : "/images/Jardin-2.jpg";
  return renderTemplate`${maybeRenderHead()}<article class="product-card" data-astro-cid-tjdfhdqb> <div class="card-badges" data-astro-cid-tjdfhdqb> <span class="badge-new" data-astro-cid-tjdfhdqb>NUEVO</span> </div> <a${addAttribute(`/producto/${slug}`, "href")} class="block img-link" data-astro-cid-tjdfhdqb> <div class="image-wrapper" data-astro-cid-tjdfhdqb> <img${addAttribute(imageUrl, "src")}${addAttribute(nombre, "alt")} loading="lazy"${addAttribute(slug, "data-product-slug")} data-astro-cid-tjdfhdqb> </div> </a> <div class="card-content" data-astro-cid-tjdfhdqb> <div class="product-info-col" data-astro-cid-tjdfhdqb> <h3 class="product-title" data-astro-cid-tjdfhdqb> <a${addAttribute(`/producto/${slug}`, "href")} data-astro-cid-tjdfhdqb>${nombre}</a> </h3> <div class="rating" data-astro-cid-tjdfhdqb> ${Array(5).fill(0).map((_) => renderTemplate`${renderComponent($$result, "Heart", Heart, { "size": 14, "fill": "#00FF85", "color": "#00FF85", "data-astro-cid-tjdfhdqb": true })}`)} </div> </div> <div class="product-details-col" data-astro-cid-tjdfhdqb> <div class="stock-info" data-astro-cid-tjdfhdqb> ${stock > 0 ? `${stock} disp.` : "Agotado"} </div> <div class="product-price" data-astro-cid-tjdfhdqb>
$${precio.toLocaleString("es-CO")} </div> <a${addAttribute(`/producto/${slug}`, "href")} class="btn btn-primary btn-sm btn-order product-button-col" data-astro-cid-tjdfhdqb>
Ver Más
</a> </div> </div> </article> `;
}, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/ProductCard.astro", void 0);

const $$Astro$1 = createAstro();
const $$ProductCarousel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProductCarousel;
  const { title, products } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="product-section" data-astro-cid-iflggugw> <div class="container" data-astro-cid-iflggugw> <div class="section-header" data-astro-cid-iflggugw> <h2 data-astro-cid-iflggugw>${title}</h2> <div class="nav-arrows" data-astro-cid-iflggugw> <button class="arrow-btn prev-btn" aria-label="Anterior" data-astro-cid-iflggugw>${renderComponent($$result, "ChevronLeft", ChevronLeft, { "size": 24, "data-astro-cid-iflggugw": true })}</button> <button class="arrow-btn next-btn" aria-label="Siguiente" data-astro-cid-iflggugw>${renderComponent($$result, "ChevronRight", ChevronRight, { "size": 24, "data-astro-cid-iflggugw": true })}</button> </div> </div> <div class="product-carousel" data-astro-cid-iflggugw> <div class="product-grid" data-astro-cid-iflggugw> ${products.map((product) => renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, { "producto": product, "data-astro-cid-iflggugw": true })}`)} </div> </div> </div> </section>  `;
}, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/ProductCarousel.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const [productos, categorias, sectionsPage] = await Promise.all([
    getProductos(),
    getCategorias(),
    getSectionsPage()
  ]);
  const heroData = sectionsPage?.componente;
  const heroBgImage = heroData?.imagenbanner?.[0] ? getImageUrl(heroData.imagenbanner[0].url) : "/images/bg-hero-b.jpg";
  const heroTitle = heroData?.heading || "CATALOGO";
  const heroSubtitle = sectionsPage?.title || "BIENVENIDO A NUESTRO";
  const heroDesc = heroData?.subheading || "Descubre nuestra amplia variedad de plantas ornamentales, frutales y forestales. Cultivadas con amor para darle vida a tus espacios.";
  const productosPorCategoria = /* @__PURE__ */ new Map();
  for (const producto of productos) {
    if (producto.categoria) {
      const categoriaNombre = producto.categoria.nombre;
      if (!productosPorCategoria.has(categoriaNombre)) {
        productosPorCategoria.set(categoriaNombre, []);
      }
      productosPorCategoria.get(categoriaNombre)?.push(producto);
    }
  }
  const carruseles = Array.from(productosPorCategoria.entries());
  return renderTemplate(_a || (_a = __template(["", ` <script>
    function initIndexPage() {
        const gridViewBtn = document.getElementById("grid-view-btn");
        const listViewBtn = document.getElementById("list-view-btn");
        const gridViewContent = document.getElementById("grid-view-content");
        const listViewContent = document.getElementById("list-view-content");
        const searchInput = document.querySelector(".search-input");
        const productWrappers = document.querySelectorAll(
            "#list-view-content .product-wrapper",
        );

                        const savedView = localStorage.getItem("homeView") === "list" ? "list" : "grid";

        /** @param {'grid' | 'list'} view */
        function updateTransitionNames(view) {
            const images = document.querySelectorAll("img[data-product-slug]");
            images.forEach((el) => {
                const img = /** @type {HTMLElement} */ (el);
                const slug = img.getAttribute("data-product-slug");
                if (!slug) return;

                // Determinar si esta imagen est\xE1 dentro de la vista activa
                const isInActiveView =
                    view === "list"
                        ? img.closest("#list-view-content") !== null
                        : img.closest("#grid-view-content") !== null;

                if (isInActiveView) {
                    img.style.setProperty(
                        "view-transition-name",
                        \`image-\${slug}\`,
                    );
                } else {
                    img.style.removeProperty("view-transition-name");
                }
            });
        }

                /** @param {'grid' | 'list'} view */
        function applyView(view) {
            if (view === "list") {
                if (gridViewContent) gridViewContent.style.display = "none";
                if (listViewContent) listViewContent.style.display = "block";
                if (listViewBtn) listViewBtn.classList.add("active");
                if (gridViewBtn) gridViewBtn.classList.remove("active");
            } else {
                if (gridViewContent) gridViewContent.style.display = "block";
                if (listViewContent) listViewContent.style.display = "none";
                if (gridViewBtn) gridViewBtn.classList.add("active");
                if (listViewBtn) listViewBtn.classList.remove("active");
            }
            updateTransitionNames(view);
        }

        /** @param {string} searchTerm */
        function filterProducts(searchTerm) {
            const term = searchTerm.toLowerCase();
            productWrappers.forEach((wrapper) => {
                const el = /** @type {HTMLElement} */ (wrapper);
                const name = el.dataset.name || "";
                if (name.includes(term)) {
                    el.style.display = "block";
                } else {
                    el.style.display = "none";
                }
            });
        }

        applyView(savedView);

        if (gridViewBtn) {
            gridViewBtn.addEventListener("click", () => {
                applyView("grid");
                localStorage.setItem("homeView", "grid");
            });
        }

        if (listViewBtn) {
            listViewBtn.addEventListener("click", () => {
                applyView("list");
                localStorage.setItem("homeView", "list");
            });
        }

        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                const input = /** @type {HTMLInputElement} */ (e.target);
                const searchTerm = input.value;
                if (searchTerm.length > 0) {
                    applyView("list"); // Forzar vista de lista al buscar
                }
                filterProducts(searchTerm);
            });
        }
    }

    // Inicializar tanto en carga inicial como en navegaciones de Astro ClientRouter
    document.addEventListener("astro:page-load", initIndexPage);
<\/script> `], ["", ` <script>
    function initIndexPage() {
        const gridViewBtn = document.getElementById("grid-view-btn");
        const listViewBtn = document.getElementById("list-view-btn");
        const gridViewContent = document.getElementById("grid-view-content");
        const listViewContent = document.getElementById("list-view-content");
        const searchInput = document.querySelector(".search-input");
        const productWrappers = document.querySelectorAll(
            "#list-view-content .product-wrapper",
        );

                        const savedView = localStorage.getItem("homeView") === "list" ? "list" : "grid";

        /** @param {'grid' | 'list'} view */
        function updateTransitionNames(view) {
            const images = document.querySelectorAll("img[data-product-slug]");
            images.forEach((el) => {
                const img = /** @type {HTMLElement} */ (el);
                const slug = img.getAttribute("data-product-slug");
                if (!slug) return;

                // Determinar si esta imagen est\xE1 dentro de la vista activa
                const isInActiveView =
                    view === "list"
                        ? img.closest("#list-view-content") !== null
                        : img.closest("#grid-view-content") !== null;

                if (isInActiveView) {
                    img.style.setProperty(
                        "view-transition-name",
                        \\\`image-\\\${slug}\\\`,
                    );
                } else {
                    img.style.removeProperty("view-transition-name");
                }
            });
        }

                /** @param {'grid' | 'list'} view */
        function applyView(view) {
            if (view === "list") {
                if (gridViewContent) gridViewContent.style.display = "none";
                if (listViewContent) listViewContent.style.display = "block";
                if (listViewBtn) listViewBtn.classList.add("active");
                if (gridViewBtn) gridViewBtn.classList.remove("active");
            } else {
                if (gridViewContent) gridViewContent.style.display = "block";
                if (listViewContent) listViewContent.style.display = "none";
                if (gridViewBtn) gridViewBtn.classList.add("active");
                if (listViewBtn) listViewBtn.classList.remove("active");
            }
            updateTransitionNames(view);
        }

        /** @param {string} searchTerm */
        function filterProducts(searchTerm) {
            const term = searchTerm.toLowerCase();
            productWrappers.forEach((wrapper) => {
                const el = /** @type {HTMLElement} */ (wrapper);
                const name = el.dataset.name || "";
                if (name.includes(term)) {
                    el.style.display = "block";
                } else {
                    el.style.display = "none";
                }
            });
        }

        applyView(savedView);

        if (gridViewBtn) {
            gridViewBtn.addEventListener("click", () => {
                applyView("grid");
                localStorage.setItem("homeView", "grid");
            });
        }

        if (listViewBtn) {
            listViewBtn.addEventListener("click", () => {
                applyView("list");
                localStorage.setItem("homeView", "list");
            });
        }

        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                const input = /** @type {HTMLInputElement} */ (e.target);
                const searchTerm = input.value;
                if (searchTerm.length > 0) {
                    applyView("list"); // Forzar vista de lista al buscar
                }
                filterProducts(searchTerm);
            });
        }
    }

    // Inicializar tanto en carga inicial como en navegaciones de Astro ClientRouter
    document.addEventListener("astro:page-load", initIndexPage);
<\/script> `])), renderComponent($$result, "Layout", $$Layout, { "title": "Inicio", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="hero-section"${addAttribute(`background-image: url('${heroBgImage}');`, "style")} data-astro-cid-j7pv25f6> <div class="container text-center" data-astro-cid-j7pv25f6> <span class="hero-subtitle" data-astro-cid-j7pv25f6>${heroSubtitle}</span> <h1 class="hero-title" data-astro-cid-j7pv25f6>${heroTitle}</h1> <p class="hero-desc" data-astro-cid-j7pv25f6> ${heroDesc} </p> <!-- Buscador --> <div class="search-container" data-astro-cid-j7pv25f6> <form action="/" method="get" class="search-form" data-astro-cid-j7pv25f6> <input type="text" name="q" placeholder="Buscar..." class="search-input" data-astro-cid-j7pv25f6> <button type="submit" class="search-btn" data-astro-cid-j7pv25f6>BUSCAR</button> </form> </div> </div> </section>  <section class="quick-filters container" data-astro-cid-j7pv25f6> <div class="filter-grid" data-astro-cid-j7pv25f6> ${categorias.slice(0, 4).map((categoria, index) => {
    const icons = [
      renderTemplate`${renderComponent($$result2, "Leaf", Leaf, { "color": "#3A5A40", "size": 24, "data-astro-cid-j7pv25f6": true })}`,
      renderTemplate`${renderComponent($$result2, "Gift", Gift, { "color": "#3A5A40", "size": 24, "data-astro-cid-j7pv25f6": true })}`,
      renderTemplate`${renderComponent($$result2, "Sprout", Sprout, { "color": "#3A5A40", "size": 24, "data-astro-cid-j7pv25f6": true })}`,
      renderTemplate`${renderComponent($$result2, "Scissors", Scissors, { "color": "#3A5A40", "size": 24, "data-astro-cid-j7pv25f6": true })}`
    ];
    return renderTemplate`<a${addAttribute(`/categoria/${categoria.slug}`, "href")} class="filter-item" data-astro-cid-j7pv25f6> <span class="badg-disc" data-astro-cid-j7pv25f6>NUEVO</span> <span class="icon" data-astro-cid-j7pv25f6> ${icons[index % icons.length]} </span> <span data-astro-cid-j7pv25f6>${categoria.nombre}</span> </a>`;
  })} </div> </section> <div class="container" data-astro-cid-j7pv25f6> <div class="products-header" data-astro-cid-j7pv25f6> <p class="products-count" data-astro-cid-j7pv25f6> ${`${productos.length} productos`} </p> <div class="view-switcher" data-astro-cid-j7pv25f6> <button id="grid-view-btn" class="view-btn active" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Grid", Grid, { "size": 20, "data-astro-cid-j7pv25f6": true })} <span data-astro-cid-j7pv25f6>Grid</span> </button> <button id="list-view-btn" class="view-btn" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "List", List, { "size": 20, "data-astro-cid-j7pv25f6": true })} <span data-astro-cid-j7pv25f6>List</span> </button> </div> </div> </div>  <div id="products-container" data-astro-cid-j7pv25f6> <!-- Vista de Grid (Carruseles) --> <div id="grid-view-content" data-astro-cid-j7pv25f6> ${carruseles.map(
    ([nombreCategoria, productosDeCategoria], index) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "ProductCarousel", $$ProductCarousel, { "title": nombreCategoria, "products": productosDeCategoria, "data-astro-cid-j7pv25f6": true })} ${index === 1 && renderTemplate`<section class="promo-banner" data-astro-cid-j7pv25f6> <div class="container banner-content" data-astro-cid-j7pv25f6> <div class="banner-text" data-astro-cid-j7pv25f6> <span class="promo-badge" data-astro-cid-j7pv25f6>
NUEVO
</span> <h2 data-astro-cid-j7pv25f6>COLECCIÓN SUCULENTAS</h2> <p data-astro-cid-j7pv25f6>
Descubre nuestra nueva selección
                                                de suculentas exóticas. Fáciles
                                                de cuidar, hermosas y perfectas
                                                para espacios interiores.
</p> <a href="/" class="btn btn-primary" data-astro-cid-j7pv25f6>
QUIERO COMPRAR
</a> </div> </div> </section>`}` })}`
  )} </div> <!-- Vista de Lista (Simple pero genial y comodo) --> <div id="list-view-content" class="container" style="display: none;" data-astro-cid-j7pv25f6> <div class="list-view" data-astro-cid-j7pv25f6> ${productos.map((producto) => renderTemplate`<div class="product-wrapper"${addAttribute(producto.categoria?.slug, "data-category")}${addAttribute(producto.nombre.toLowerCase(), "data-name")} data-astro-cid-j7pv25f6> ${renderComponent($$result2, "ProductCard", $$ProductCard, { "producto": producto, "data-astro-cid-j7pv25f6": true })} </div>`)} </div> </div> </div> ` }));
}, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/pages/index.astro", void 0);

const $$file = "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
