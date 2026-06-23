import { c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate, b as createAstro, d as addAttribute, g as renderHead, h as renderSlot } from './astro/server_6TKJ0_KC.mjs';
/* empty css                           */
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { getApps, initializeApp, getApp } from 'firebase/app';
import { initializeAuth, browserLocalPersistence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { User, Menu, ShoppingBag } from 'lucide-react';
import { siInstagram, siFacebook, siPinterest } from 'simple-icons';

function CartCounter() {
  const [count, setCount] = useState(0);
  const updateCount = () => {
    const savedCart = localStorage.getItem("cart");
    const cart = savedCart ? JSON.parse(savedCart) : [];
    const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
    setCount(totalItems);
  };
  useEffect(() => {
    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    return () => window.removeEventListener("cartUpdated", updateCount);
  }, []);
  if (count === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx("span", { className: "cart-count", children: count });
}

const firebaseConfig = {
  apiKey: "AIzaSyBQkjw9dErFcMV5LcuCcEzPYAoKl6F1dqE",
  authDomain: "mi-proyecto-tienda-esperanza.firebaseapp.com",
  projectId: "mi-proyecto-tienda-esperanza",
  storageBucket: "mi-proyecto-tienda-esperanza.firebasestorage.app",
  messagingSenderId: "1047829297422",
  appId: "1047829297422:web:1992e2638fb7d36a337f5f"
};
let app;
let auth;
let db;
if (getApps().length === 0) {
  if (firebaseConfig.apiKey) {
    try {
      app = initializeApp(firebaseConfig);
      auth = initializeAuth(app, {
        persistence: browserLocalPersistence
      });
      db = getFirestore(app);
    } catch (error) {
      console.error("[firebase] Error en la inicialización:", error);
    }
  } else {
    console.warn("[firebase] La configuración está ausente. Firebase no inicializado.");
  }
} else {
  app = getApp();
  auth = getAuth(app);
  db = getFirestore(app);
}
async function registerUser(email, password) {
  if (!auth) throw new Error("Firebase not initialized");
  return await createUserWithEmailAndPassword(auth, email, password);
}
async function loginUser(email, password) {
  if (!auth) throw new Error("Firebase not initialized");
  return await signInWithEmailAndPassword(auth, email, password);
}

const AuthStatus = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { style: { width: "150px" } });
  }
  return /* @__PURE__ */ jsx("div", { className: "auth-status-container", children: user ? /* @__PURE__ */ jsxs("details", { className: "user-menu-details", children: [
    /* @__PURE__ */ jsxs("summary", { className: "user-info-trigger", children: [
      /* @__PURE__ */ jsx(User, { size: 22, strokeWidth: 1.5 }),
      /* @__PURE__ */ jsx("span", { className: "user-identifier user-email-text", children: user.displayName || user.email })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "user-dropdown-menu", children: [
      /* @__PURE__ */ jsx("a", { href: "/perfil", className: "dropdown-link", children: "Mi Perfil" }),
      /* @__PURE__ */ jsx("button", { onClick: handleSignOut, className: "logout-button", children: "Cerrar Sesión" })
    ] })
  ] }) : /* @__PURE__ */ jsx("a", { href: "/login", className: "icon-link", "aria-label": "Iniciar Sesión", children: /* @__PURE__ */ jsx(User, { size: 22, strokeWidth: 1.5 }) }) });
};

const $$Astro$2 = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<header class="site-header" data-astro-cid-3ef6ksr2> <div class="header-top container" data-astro-cid-3ef6ksr2> <button class="mobile-nav-toggle" aria-label="Abrir menú" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "Menu", Menu, { "size": 24, "data-astro-cid-3ef6ksr2": true })} </button> <nav class="nav-left" data-astro-cid-3ef6ksr2> <a href="/" data-astro-cid-3ef6ksr2>Inicio</a> <a href="/nuestro-vivero" data-astro-cid-3ef6ksr2>Nuestro Vivero</a> <a href="/proyectos" data-astro-cid-3ef6ksr2>Proyectos</a> </nav> <div class="logo-container" data-astro-cid-3ef6ksr2> <a href="/" class="logo-text" data-astro-cid-3ef6ksr2> <img src="../images/Logo-esperanza.png" alt="Logo Esperanza Vivero" class="logo-image" width="120" height="57" data-astro-cid-3ef6ksr2> </a> </div> <div class="nav-right" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "AuthStatus", AuthStatus, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/AuthStatus.tsx", "client:component-export": "default", "data-astro-cid-3ef6ksr2": true })} <a href="/carrito" class="icon-link cart-icon-link" aria-label="Carrito" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "ShoppingBag", ShoppingBag, { "size": 22, "strokeWidth": 1.5, "data-astro-cid-3ef6ksr2": true })} ${renderComponent($$result, "CartCounter", CartCounter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/CartCounter", "client:component-export": "default", "data-astro-cid-3ef6ksr2": true })} </a> </div> </div> <div class="mobile-nav" data-astro-cid-3ef6ksr2> <nav data-astro-cid-3ef6ksr2> <a href="/" data-astro-cid-3ef6ksr2>Inicio</a> <a href="/nuestro-vivero" data-astro-cid-3ef6ksr2>Nuestro Vivero</a> <a href="/proyectos" data-astro-cid-3ef6ksr2>Proyectos</a> </nav> </div> </header>  `;
}, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="site-footer" data-astro-cid-sz7xmlte> <div class="container" data-astro-cid-sz7xmlte> <div class="footer-top" data-astro-cid-sz7xmlte> <div class="footer-col brand-col" data-astro-cid-sz7xmlte> <div class="footer-logo" data-astro-cid-sz7xmlte> <img src="../images/logo-footer-horizontal-blanco.png" alt="Tienda Esperanza Vivero" class="footer-logo-img" width="150" height="auto" data-astro-cid-sz7xmlte> </div> <p class="footer-desc" data-astro-cid-sz7xmlte>
Especialistas en la propagación, cultivo y venta de plantas 
                    ornamentales, frutales y forestales de la mejor calidad para tus 
                    espacios verdes.
</p> </div> <div class="footer-col brand-col" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Contacto</h4> <ul class="contact-list" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte>Dirección: Calle Falsa 123, Bogotá, Colombia</li> <li data-astro-cid-sz7xmlte>Email: contacto@viveroesperanza.com</li> <li data-astro-cid-sz7xmlte>Tel: +57 300 123 4567</li> </ul> </div> <div class="footer-col" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Otros Enlaces</h4> <ul data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/carrito" data-astro-cid-sz7xmlte>Carrito</a></li> <li data-astro-cid-sz7xmlte><a href="/login" data-astro-cid-sz7xmlte>Mi cuenta</a></li> </ul> </div> <div class="footer-col" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Enlaces</h4> <ul data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/nuestro-vivero" data-astro-cid-sz7xmlte>Nuestro Vivero</a></li> </ul> </div> <div class="footer-col brand-col" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Síguenos</h4> <div class="social-icons" data-astro-cid-sz7xmlte> <a href="https://www.instagram.com/laesperanzavivero2026/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte> <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-sz7xmlte> <path${addAttribute(siInstagram.path, "d")} data-astro-cid-sz7xmlte></path> </svg> </a> <a href="https://www.facebook.com/profile.php?id=61586998268034" aria-label="Facebook" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte> <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-sz7xmlte> <path${addAttribute(siFacebook.path, "d")} data-astro-cid-sz7xmlte></path> </svg> </a> <a href="https://www.pinterest.com/laesperanzavivero2026/" aria-label="Pinterest" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte> <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-sz7xmlte> <path${addAttribute(siPinterest.path, "d")} data-astro-cid-sz7xmlte></path> </svg> </a> </div> </div> </div> <div class="footer-bottom" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>
© ${(/* @__PURE__ */ new Date()).getFullYear()} Tienda Esperanza. Todos los derechos
                reservados.
</p> <div class="legal-links" data-astro-cid-sz7xmlte> <a href="#" data-astro-cid-sz7xmlte>Términos y Condiciones</a> <a href="#" data-astro-cid-sz7xmlte>Política de Privacidad</a> </div> </div> </div> </footer> `;
}, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/Footer.astro", void 0);

const $$WhatsAppButton = createComponent(($$result, $$props, $$slots) => {
  const phoneNumber = "3052928927";
  const defaultMessage = encodeURIComponent("¡Hola! Vengo de la página web y me gustaría hacer una consulta.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(whatsappUrl, "href")} target="_blank" rel="noopener noreferrer" class="whatsapp-btn" aria-label="Contactar por WhatsApp" data-astro-cid-iehx2mtc> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="whatsapp-icon" data-astro-cid-iehx2mtc> <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" data-astro-cid-iehx2mtc></path> </svg> </a> `;
}, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/WhatsAppButton.astro", void 0);

const $$Astro$1 = createAstro();
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/node_modules/.pnpm/astro@4.16.19_@types+node@2_32b9b4e7b2fc5a012552db68ecac1746/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Tienda Esperanza",
    description = "Vivero mayorista de plantas"
  } = Astro2.props;
  return renderTemplate`<html lang="es" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title} | Esperanza Vivero</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, { "data-astro-cid-sckkx6r4": true })}${renderHead()}</head> <body data-astro-cid-sckkx6r4> <div class="site-wrapper" data-astro-cid-sckkx6r4> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-sckkx6r4": true })} <!-- Main Content --> <main data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-sckkx6r4": true })} ${renderComponent($$result, "WhatsAppButton", $$WhatsAppButton, { "data-astro-cid-sckkx6r4": true })} </div> </body></html>`;
}, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/layouts/Layout.astro", void 0);

export { $$Layout as $, auth as a, db as d, loginUser as l, registerUser as r };
