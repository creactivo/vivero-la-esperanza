import{j as a}from"./jsx-runtime.TBa3i5EZ.js";import{r as l}from"./index.CVf8TyFT.js";import{c as p}from"./createLucideIcon.Cqm1P10K.js";/**
 * @license lucide-react v0.561.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]],u=p("shopping-cart",m);/**
 * @license lucide-react v0.561.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],v=p("trash-2",x);function b(){const[c,n]=l.useState([]);l.useEffect(()=>{o();const t=()=>o();return window.addEventListener("cartUpdated",t),()=>window.removeEventListener("cartUpdated",t)},[]);const o=()=>{const t=localStorage.getItem("cart");n(t?JSON.parse(t):[])},s=(t,e)=>{const r=c.map(i=>i.productoId===t?{...i,cantidad:Math.max(1,e)}:i);n(r),localStorage.setItem("cart",JSON.stringify(r)),window.dispatchEvent(new Event("cartUpdated"))},h=t=>{const e=c.filter(r=>r.productoId!==t);n(e),localStorage.setItem("cart",JSON.stringify(e)),window.dispatchEvent(new Event("cartUpdated"))},d=c.reduce((t,e)=>t+e.cantidad*e.precioUnitario,0);return c.length===0?a.jsxs("div",{className:"empty-cart-wrapper",children:[a.jsxs("div",{className:"empty-cart-container",children:[a.jsx("div",{className:"icon-container",children:a.jsx(u,{size:48,color:"white"})}),a.jsx("h2",{className:"empty-cart-title",children:"TU CARRITO ESTÁ VACÍO"}),a.jsx("p",{className:"empty-cart-subtitle",children:"Explora nuestro catálogo y encuentra las plantas perfectas para tu espacio."}),a.jsxs("div",{className:"empty-cart-actions",children:[a.jsx("a",{href:"/catalogo",className:"btn-explore",children:"Explorar Catálogo"}),a.jsx("a",{href:"/",className:"btn-home",children:"Volver al inicio"})]})]}),a.jsx("style",{children:`
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
                `})]}):a.jsxs("div",{className:"cart-container",children:[a.jsx("div",{className:"cart-items",children:c.map(t=>a.jsxs("div",{className:"cart-item",children:[t.imagenUrl&&a.jsx("div",{className:"item-image",children:a.jsx("img",{src:t.imagenUrl,alt:t.nombre})}),a.jsxs("div",{className:"item-info",children:[a.jsx("h3",{children:a.jsx("a",{href:`/producto/${t.slug}`,children:t.nombre})}),a.jsxs("p",{className:"item-price",children:["Precio unidad: $",t.precioUnitario.toLocaleString("es-CO")]})]}),a.jsxs("div",{className:"item-controls",children:[a.jsxs("div",{className:"quantity-controls",children:[a.jsx("button",{onClick:()=>s(t.productoId,t.cantidad-1),className:"qty-btn qty-btn-minus","aria-label":"Disminuir cantidad",children:"-"}),a.jsx("input",{type:"number",value:t.cantidad,onChange:e=>{const r=parseInt(e.target.value);!isNaN(r)&&r>=1&&s(t.productoId,r)},onBlur:e=>{const r=parseInt(e.target.value);(isNaN(r)||r<1)&&s(t.productoId,1)},className:"qty-input",min:"1"}),a.jsx("button",{onClick:()=>s(t.productoId,t.cantidad+1),className:"qty-btn qty-btn-plus","aria-label":"Aumentar cantidad",children:"+"})]}),a.jsxs("div",{className:"item-subtotal",children:["$",(t.cantidad*t.precioUnitario).toLocaleString("es-CO")]}),a.jsx("button",{onClick:()=>h(t.productoId),className:"btn-remove","aria-label":"Eliminar producto",children:a.jsx(v,{size:18})})]})]},t.productoId))}),a.jsxs("div",{className:"cart-summary",children:[a.jsx("h2",{children:"Resumen del pedido"}),a.jsxs("div",{className:"summary-row",children:[a.jsx("span",{children:"Subtotal:"}),a.jsxs("span",{children:["$",d.toFixed(2)]})]}),a.jsxs("div",{className:"summary-row total",children:[a.jsx("span",{children:"Total:"}),a.jsxs("span",{children:["$",d.toLocaleString("es-CO")]})]}),a.jsx("a",{href:"/checkout",className:"btn btn-checkout-primary btn-large btn-full",children:"PROCEDER AL CHECKOUT"})]})]})}export{b as default};
