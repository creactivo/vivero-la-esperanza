<<<<<<< HEAD
export { C as default } from './chunks/entrypoint_DMXKRZo6.mjs';
=======
import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_D3b1CVW0.mjs';
import { manifest } from './manifest_CWHYjKlQ.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/carrito.astro.mjs');
const _page2 = () => import('./pages/checkout.astro.mjs');
const _page3 = () => import('./pages/login.astro.mjs');
const _page4 = () => import('./pages/nuestro-vivero.astro.mjs');
const _page5 = () => import('./pages/perfil.astro.mjs');
const _page6 = () => import('./pages/producto/_slug_.astro.mjs');
const _page7 = () => import('./pages/proyectos/_slug_.astro.mjs');
const _page8 = () => import('./pages/proyectos.astro.mjs');
const _page9 = () => import('./pages/registro.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["../node_modules/.pnpm/astro@4.16.19_@types+node@2_32b9b4e7b2fc5a012552db68ecac1746/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/carrito.astro", _page1],
    ["src/pages/checkout.astro", _page2],
    ["src/pages/login.astro", _page3],
    ["src/pages/nuestro-vivero.astro", _page4],
    ["src/pages/perfil.astro", _page5],
    ["src/pages/producto/[slug].astro", _page6],
    ["src/pages/proyectos/[slug].astro", _page7],
    ["src/pages/proyectos.astro", _page8],
    ["src/pages/registro.astro", _page9],
    ["src/pages/index.astro", _page10]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "d28b1992-f79a-48cf-a030-e4dfc0c74d1d",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
>>>>>>> 0f5c0d939d18cdc9b9eb675d68782164c4f21f90
