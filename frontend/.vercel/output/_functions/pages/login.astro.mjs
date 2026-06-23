import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_6TKJ0_KC.mjs';
import { $ as $$Layout } from '../chunks/Layout_D8BJRdtr.mjs';
import { A as AuthForm } from '../chunks/AuthForm_DGcYK3PH.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Iniciar sesi\xF3n", "description": "Inicia sesi\xF3n en tu cuenta", "data-astro-cid-sgpqyurt": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="auth-header-section text-center" data-astro-cid-sgpqyurt> <span class="detail-badge" data-astro-cid-sgpqyurt>ACCESO MAYORISTA</span> <h1 class="main-title" data-astro-cid-sgpqyurt>INICIAR SESIÓN</h1> <p class="header-subtitle" data-astro-cid-sgpqyurt>Completa tus datos para acceder a tu cuenta</p> </div> <div class="auth-page" data-astro-cid-sgpqyurt> <div class="container" data-astro-cid-sgpqyurt> ${renderComponent($$result2, "AuthForm", AuthForm, { "client:load": true, "mode": "login", "client:component-hydration": "load", "client:component-path": "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/AuthForm", "client:component-export": "default", "data-astro-cid-sgpqyurt": true })} </div> </div> ` })}  `;
}, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/pages/login.astro", void 0);

const $$file = "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
