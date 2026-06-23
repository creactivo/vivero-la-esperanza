import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_6TKJ0_KC.mjs';
import { $ as $$Layout } from '../chunks/Layout_D8BJRdtr.mjs';
import { A as AuthForm } from '../chunks/AuthForm_DGcYK3PH.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Registro = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Registro", "description": "Crea tu cuenta mayorista", "data-astro-cid-ohowjl3i": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="auth-header-section text-center" data-astro-cid-ohowjl3i> <span class="detail-badge" data-astro-cid-ohowjl3i>NUEVO USUARIO</span> <h1 class="main-title" data-astro-cid-ohowjl3i>CREAR CUENTA</h1> <p class="header-subtitle" data-astro-cid-ohowjl3i>Regístrate para acceder a precios mayoristas</p> </div> <div class="auth-page" data-astro-cid-ohowjl3i> <div class="container" data-astro-cid-ohowjl3i> ${renderComponent($$result2, "AuthForm", AuthForm, { "client:load": true, "mode": "registro", "client:component-hydration": "load", "client:component-path": "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/AuthForm", "client:component-export": "default", "data-astro-cid-ohowjl3i": true })} </div> </div> ` })}  `;
}, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/pages/registro.astro", void 0);

const $$file = "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/pages/registro.astro";
const $$url = "/registro";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Registro,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
