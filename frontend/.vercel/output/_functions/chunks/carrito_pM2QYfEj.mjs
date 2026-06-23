import { c as createComponent } from './astro-component_huBepDft.mjs';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_DMXKRZo6.mjs';
import { $ as $$Layout } from './Layout_Bf35xjIb.mjs';
import { useState, useEffect } from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';

function Cart() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    loadCart();
    const handleCartUpdate = () => loadCart();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);
  const loadCart = () => {
    const savedCart = localStorage.getItem("cart");
    setCart(savedCart ? JSON.parse(savedCart) : []);
  };
  const updateQuantity = (productoId, newQuantity) => {
    const updatedCart = cart.map(
      (item) => item.productoId === productoId ? { ...item, cantidad: Math.max(1, newQuantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };
  const removeItem = (productoId) => {
    const updatedCart = cart.filter((item) => item.productoId !== productoId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };
  const total = cart.reduce((sum, item) => sum + item.cantidad * item.precioUnitario, 0);
  if (cart.length === 0) {
    return /* @__PURE__ */ React.createElement("div", { className: "empty-cart-wrapper" }, /* @__PURE__ */ React.createElement("div", { className: "empty-cart-container" }, /* @__PURE__ */ React.createElement("div", { className: "icon-container" }, /* @__PURE__ */ React.createElement(ShoppingCart, { size: 48, color: "white" })), /* @__PURE__ */ React.createElement("h2", { className: "empty-cart-title" }, "TU CARRITO ESTÁ VACÍO"), /* @__PURE__ */ React.createElement("p", { className: "empty-cart-subtitle" }, "Explora nuestro catálogo y encuentra las plantas perfectas para tu espacio."), /* @__PURE__ */ React.createElement("div", { className: "empty-cart-actions" }, /* @__PURE__ */ React.createElement("a", { href: "/catalogo", className: "btn-explore" }, "Explorar Catálogo"), /* @__PURE__ */ React.createElement("a", { href: "/", className: "btn-home" }, "Volver al inicio"))), /* @__PURE__ */ React.createElement("style", null, `
                    .empty-cart-wrapper {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 60vh;
                        padding: var(--space-8);
                    }
                    .empty-cart-container {
                        background: #f8fdf8;
                        border: 1px solid rgba(58, 90, 64, 0.1);
                        border-radius: var(--radius-xl);
                        padding: var(--space-12);
                        max-width: 500px;
                        width: 100%;
                        display: grid;
                        justify-items: center;
                        gap: var(--space-8);
                        text-align: center;
                    }
                    .icon-container {
                        background-color: #34D399;
                        border-radius: var(--radius-lg);
                        padding: var(--space-6);
                        display: inline-flex;
                    }
                    .empty-cart-title {
                        font-size: 1.25rem;
                        font-weight: 700;
                        color: var(--color-primary-dark);
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                    }
                    .empty-cart-subtitle {
                        color: var(--color-text-light);
                        max-width: 350px;
                        line-height: 1.6;
                    }
                    .empty-cart-actions {
                        display: flex;
                        flex-direction: column;
                        gap: var(--space-4);
                        width: 100%;
                        max-width: 300px;
                    }
                    .btn-explore {
                            background: var(--color-primary);
                            color: white;
                            padding: var(--space-3) var(--space-6);
                            border-radius: var(--radius-md);
                            text-decoration: none;
                            font-weight: 600;
                            transition: background 0.2s;
                        }
                    .btn-explore:hover {
                        background: var(--color-primary-dark);
                    }
                    .btn-home {
                        color: var(--color-primary);
                        text-decoration: none;
                        font-weight: 500;
                        padding: var(--space-2);
                        transition: background 0.2s;
                    }
                    .btn-home:hover {
                        background: rgba(58, 90, 64, 0.08);
                        border-radius: var(--radius-md);
                    }
                `));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "cart-container" }, /* @__PURE__ */ React.createElement("div", { className: "cart-items" }, cart.map((item) => /* @__PURE__ */ React.createElement("div", { key: item.productoId, className: "cart-item" }, item.imagenUrl && /* @__PURE__ */ React.createElement("div", { className: "item-image" }, /* @__PURE__ */ React.createElement("img", { src: item.imagenUrl, alt: item.nombre })), /* @__PURE__ */ React.createElement("div", { className: "item-info" }, /* @__PURE__ */ React.createElement("h3", null, /* @__PURE__ */ React.createElement("a", { href: `/producto/${item.slug}` }, item.nombre)), /* @__PURE__ */ React.createElement("p", { className: "item-price" }, "Precio unidad: $", item.precioUnitario.toLocaleString("es-CO"))), /* @__PURE__ */ React.createElement("div", { className: "item-controls" }, /* @__PURE__ */ React.createElement("div", { className: "quantity-controls" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => updateQuantity(item.productoId, item.cantidad - 1),
      className: "qty-btn qty-btn-minus",
      "aria-label": "Disminuir cantidad"
    },
    "-"
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      value: item.cantidad,
      onChange: (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1) {
          updateQuantity(item.productoId, value);
        }
      },
      onBlur: (e) => {
        const value = parseInt(e.target.value);
        if (isNaN(value) || value < 1) {
          updateQuantity(item.productoId, 1);
        }
      },
      className: "qty-input",
      min: "1"
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => updateQuantity(item.productoId, item.cantidad + 1),
      className: "qty-btn qty-btn-plus",
      "aria-label": "Aumentar cantidad"
    },
    "+"
  )), /* @__PURE__ */ React.createElement("div", { className: "item-subtotal" }, "$", (item.cantidad * item.precioUnitario).toLocaleString("es-CO")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => removeItem(item.productoId),
      className: "btn-remove",
      "aria-label": "Eliminar producto"
    },
    /* @__PURE__ */ React.createElement(Trash2, { size: 18 })
  ))))), /* @__PURE__ */ React.createElement("div", { className: "cart-summary" }, /* @__PURE__ */ React.createElement("h2", null, "Resumen del pedido"), /* @__PURE__ */ React.createElement("div", { className: "summary-row" }, /* @__PURE__ */ React.createElement("span", null, "Subtotal:"), /* @__PURE__ */ React.createElement("span", null, "$", total.toFixed(2))), /* @__PURE__ */ React.createElement("div", { className: "summary-row total" }, /* @__PURE__ */ React.createElement("span", null, "Total:"), /* @__PURE__ */ React.createElement("span", null, "$", total.toLocaleString("es-CO"))), /* @__PURE__ */ React.createElement("a", { href: "/checkout", className: "btn btn-checkout-primary btn-large btn-full" }, "PROCEDER AL CHECKOUT")));
}

const $$Carrito = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Carrito de compras", "description": "Revisa tu carrito de compras", "data-astro-cid-vrbpsbwj": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="cart-page" data-astro-cid-vrbpsbwj> <div class="container" data-astro-cid-vrbpsbwj> <h1 data-astro-cid-vrbpsbwj>CARRITO DE COMPRAS</h1> ${renderComponent($$result2, "Cart", Cart, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/Cart", "client:component-export": "default", "data-astro-cid-vrbpsbwj": true })} </div> </div> ` })} <!-- aca comienza el estilo del carrito de compras -->`;
}, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/pages/carrito.astro", void 0);

const $$file = "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/pages/carrito.astro";
const $$url = "/carrito";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Carrito,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
