import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_6TKJ0_KC.mjs';
import { $ as $$Layout } from '../chunks/Layout_D8BJRdtr.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

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
    return /* @__PURE__ */ jsxs("div", { className: "empty-cart-wrapper", children: [
      /* @__PURE__ */ jsxs("div", { className: "empty-cart-container", children: [
        /* @__PURE__ */ jsx("div", { className: "icon-container", children: /* @__PURE__ */ jsx(ShoppingCart, { size: 48, color: "white" }) }),
        /* @__PURE__ */ jsx("h2", { className: "empty-cart-title", children: "TU CARRITO ESTÁ VACÍO" }),
        /* @__PURE__ */ jsx("p", { className: "empty-cart-subtitle", children: "Explora nuestro catálogo y encuentra las plantas perfectas para tu espacio." }),
        /* @__PURE__ */ jsxs("div", { className: "empty-cart-actions", children: [
          /* @__PURE__ */ jsx("a", { href: "/catalogo", className: "btn-explore", children: "Explorar Catálogo" }),
          /* @__PURE__ */ jsx("a", { href: "/", className: "btn-home", children: "Volver al inicio" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("style", { children: `
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
                ` })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "cart-container", children: [
    /* @__PURE__ */ jsx("div", { className: "cart-items", children: cart.map((item) => /* @__PURE__ */ jsxs("div", { className: "cart-item", children: [
      item.imagenUrl && /* @__PURE__ */ jsx("div", { className: "item-image", children: /* @__PURE__ */ jsx("img", { src: item.imagenUrl, alt: item.nombre }) }),
      /* @__PURE__ */ jsxs("div", { className: "item-info", children: [
        /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx("a", { href: `/producto/${item.slug}`, children: item.nombre }) }),
        /* @__PURE__ */ jsxs("p", { className: "item-price", children: [
          "Precio unidad: $",
          item.precioUnitario.toLocaleString("es-CO")
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "item-controls", children: [
        /* @__PURE__ */ jsxs("div", { className: "quantity-controls", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => updateQuantity(item.productoId, item.cantidad - 1),
              className: "qty-btn qty-btn-minus",
              "aria-label": "Disminuir cantidad",
              children: "-"
            }
          ),
          /* @__PURE__ */ jsx(
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
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => updateQuantity(item.productoId, item.cantidad + 1),
              className: "qty-btn qty-btn-plus",
              "aria-label": "Aumentar cantidad",
              children: "+"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "item-subtotal", children: [
          "$",
          (item.cantidad * item.precioUnitario).toLocaleString("es-CO")
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => removeItem(item.productoId),
            className: "btn-remove",
            "aria-label": "Eliminar producto",
            children: /* @__PURE__ */ jsx(Trash2, { size: 18 })
          }
        )
      ] })
    ] }, item.productoId)) }),
    /* @__PURE__ */ jsxs("div", { className: "cart-summary", children: [
      /* @__PURE__ */ jsx("h2", { children: "Resumen del pedido" }),
      /* @__PURE__ */ jsxs("div", { className: "summary-row", children: [
        /* @__PURE__ */ jsx("span", { children: "Subtotal:" }),
        /* @__PURE__ */ jsxs("span", { children: [
          "$",
          total.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "summary-row total", children: [
        /* @__PURE__ */ jsx("span", { children: "Total:" }),
        /* @__PURE__ */ jsxs("span", { children: [
          "$",
          total.toLocaleString("es-CO")
        ] })
      ] }),
      /* @__PURE__ */ jsx("a", { href: "/checkout", className: "btn btn-checkout-primary btn-large btn-full", children: "PROCEDER AL CHECKOUT" })
    ] })
  ] });
}

const $$Carrito = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Carrito de compras", "description": "Revisa tu carrito de compras", "data-astro-cid-vrbpsbwj": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="cart-page" data-astro-cid-vrbpsbwj> <div class="container" data-astro-cid-vrbpsbwj> <h1 data-astro-cid-vrbpsbwj>CARRITO DE COMPRAS</h1> ${renderComponent($$result2, "Cart", Cart, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/Cart", "client:component-export": "default", "data-astro-cid-vrbpsbwj": true })} </div> </div> ` })} <!-- aca comienza el estilo del carrito de compras --> `;
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
