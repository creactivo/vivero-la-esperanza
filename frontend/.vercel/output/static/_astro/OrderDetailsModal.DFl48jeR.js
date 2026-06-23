import{j as e}from"./jsx-runtime.TBa3i5EZ.js";import{r as a}from"./index.CVf8TyFT.js";function x({}){const[l,r]=a.useState(!1),[s,n]=a.useState(null);a.useEffect(()=>{const t=o=>{const{order:i}=o.detail;i&&(n(i),r(!0))};return window.addEventListener("open-order-details-modal",t),()=>{window.removeEventListener("open-order-details-modal",t)}},[]);const d=()=>{r(!1),n(null)};if(!l||!s)return null;const c=s.fecha.toDate().toLocaleDateString("es-ES",{year:"numeric",month:"long",day:"numeric"});return e.jsxs("div",{className:"modal-overlay",onClick:d,children:[e.jsxs("div",{className:"modal-content",onClick:t=>t.stopPropagation(),children:[e.jsx("h2",{children:"Detalles del Pedido"}),e.jsxs("p",{children:[e.jsx("strong",{children:"ID del Pedido:"})," #",s.id.substring(0,7)]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Fecha:"})," ",c]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Estado:"})," ",e.jsx("span",{className:`status status-${s.estado?.toLowerCase()}`,children:s.estado})]}),e.jsxs("div",{className:"order-items-list",children:[e.jsx("h3",{children:"Productos"}),s.productos?.map((t,o)=>e.jsxs("div",{className:"product-item",children:[e.jsxs("span",{children:[t.nombre," (x",t.cantidad,")"]}),e.jsxs("span",{children:["$",(t.precio*t.cantidad).toLocaleString("es-CO")]})]},o))]}),e.jsxs("div",{className:"order-summary",children:[e.jsx("h3",{children:"Resumen"}),e.jsxs("div",{className:"summary-item",children:[e.jsx("span",{children:"Subtotal:"}),e.jsxs("span",{children:["$",s.subtotal.toLocaleString("es-CO")]})]}),e.jsxs("div",{className:"summary-item",children:[e.jsx("span",{children:"Envío:"}),e.jsxs("span",{children:["$",s.envio.toLocaleString("es-CO")]})]}),e.jsxs("div",{className:"summary-item total",children:[e.jsx("span",{children:"Total:"}),e.jsxs("span",{children:["$",s.total.toLocaleString("es-CO")]})]})]}),e.jsx("div",{className:"modal-actions",children:e.jsx("button",{type:"button",onClick:d,className:"btn btn-secondary",children:"Cerrar"})})]}),e.jsx("style",{children:`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                .modal-content {
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    width: 90%;
                    max-width: 600px;
                    max-height: 90vh;
                    overflow-y: auto;
                }
                .modal-content h2 {
                    margin-top: 0;
                    margin-bottom: 20px;
                }
                .modal-actions {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 30px;
                }
                .order-items-list, .order-summary {
                    margin-top: 20px;
                }
                .order-items-list h3, .order-summary h3 {
                    margin-bottom: 10px;
                    font-size: 1rem;
                    color: #555;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 5px;
                }
                .product-item, .summary-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 0;
                }
                .summary-item.total {
                    font-weight: bold;
                    font-size: 1.1rem;
                    padding-top: 10px;
                    border-top: 1px solid #ccc;
                }
                .status {
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-weight: 500;
                    color: white;
                }
                .status-entregado { background-color: #28a745; }
                .status-enviado { background-color: #17a2b8; }
                .status-pendiente { background-color: #ffc107; color: #333; }
                .status-cancelado { background-color: #dc3545; }
            `})]})}export{x as default};
