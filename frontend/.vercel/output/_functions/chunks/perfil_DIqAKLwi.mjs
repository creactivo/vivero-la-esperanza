import { c as createComponent } from './astro-component_huBepDft.mjs';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_DMXKRZo6.mjs';
import { d as db, $ as $$Layout, r as renderScript } from './Layout_Bf35xjIb.mjs';
import { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';

function EditProfileModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const handleOpenModal = (e) => {
      const { user: user2, initialData } = e.detail;
      if (user2 && initialData) {
        setUser(user2);
        setNombre(initialData.nombre || "");
        setApellido(initialData.apellido || "");
        setTelefono(initialData.telefono || "");
        setIsOpen(true);
      }
    };
    window.addEventListener("open-edit-profile-modal", handleOpenModal);
    return () => {
      window.removeEventListener("open-edit-profile-modal", handleOpenModal);
    };
  }, []);
  const handleClose = () => {
    setIsOpen(false);
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("No se ha encontrado información del usuario.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const userDocRef = doc(db, "usuarios", user.uid);
      const updatedData = { nombre, apellido, telefono };
      await updateDoc(userDocRef, updatedData);
      window.dispatchEvent(new CustomEvent("profile-updated", { detail: updatedData }));
      handleClose();
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("No se pudo actualizar la información. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ React.createElement("div", { className: "modal-overlay" }, /* @__PURE__ */ React.createElement("div", { className: "modal-content" }, /* @__PURE__ */ React.createElement("h2", null, "Editar Información"), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "nombre" }, "Nombre"), /* @__PURE__ */ React.createElement("input", { id: "nombre", type: "text", value: nombre, onChange: (e) => setNombre(e.target.value), required: true })), /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "apellido" }, "Apellido"), /* @__PURE__ */ React.createElement("input", { id: "apellido", type: "text", value: apellido, onChange: (e) => setApellido(e.target.value), required: true })), /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "telefono" }, "Teléfono"), /* @__PURE__ */ React.createElement("input", { id: "telefono", type: "tel", value: telefono, onChange: (e) => setTelefono(e.target.value), required: true })), error && /* @__PURE__ */ React.createElement("p", { className: "error-message" }, error), /* @__PURE__ */ React.createElement("div", { className: "modal-actions" }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: handleClose, className: "btn btn-secondary", disabled: loading }, "Cancelar"), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn btn-primary", disabled: loading }, loading ? "Guardando..." : "Guardar Cambios")))), /* @__PURE__ */ React.createElement("style", null, `
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
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
                    max-width: 500px;
                }
                .modal-content h2 {
                    margin-top: 0;
                    margin-bottom: 20px;
                }
                .modal-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    margin-top: 20px;
                }
                .form-group {
                  display: flex;
                  flex-direction: column;
                  gap: 6px;
                  margin-bottom: 16px;
                }
                .form-group label {
                  color: var(--color-text);
                  font-weight: 600;
                  font-size: 0.85rem;
                }
                .form-group input {
                  width: 100%;
                  padding: 10px 14px;
                  border: 2px solid #ddd;
                  border-radius: 8px;
                  font-size: 0.95rem;
                  transition: border-color 0.2s;
                }
                .form-group input:focus {
                  outline: none;
                  border-color: var(--color-primary);
                }
                .error-message {
                  background: #fee2e2;
                  color: #991b1b;
                  padding: 12px;
                  border-radius: 8px;
                  text-align: center;
                  font-size: 0.9rem;
                }
            `));
}

function OrderDetailsModal({}) {
  const [isOpen, setIsOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);
  useEffect(() => {
    const handleOpenModal = (e) => {
      const { order } = e.detail;
      if (order) {
        setOrderData(order);
        setIsOpen(true);
      }
    };
    window.addEventListener("open-order-details-modal", handleOpenModal);
    return () => {
      window.removeEventListener("open-order-details-modal", handleOpenModal);
    };
  }, []);
  const handleClose = () => {
    setIsOpen(false);
    setOrderData(null);
  };
  if (!isOpen || !orderData) return null;
  const orderDate = orderData.fecha.toDate().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return /* @__PURE__ */ React.createElement("div", { className: "modal-overlay", onClick: handleClose }, /* @__PURE__ */ React.createElement("div", { className: "modal-content", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("h2", null, "Detalles del Pedido"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "ID del Pedido:"), " #", orderData.id.substring(0, 7)), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Fecha:"), " ", orderDate), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Estado:"), " ", /* @__PURE__ */ React.createElement("span", { className: `status status-${orderData.estado?.toLowerCase()}` }, orderData.estado)), /* @__PURE__ */ React.createElement("div", { className: "order-items-list" }, /* @__PURE__ */ React.createElement("h3", null, "Productos"), orderData.productos?.map((item, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: "product-item" }, /* @__PURE__ */ React.createElement("span", null, item.nombre, " (x", item.cantidad, ")"), /* @__PURE__ */ React.createElement("span", null, "$", (item.precio * item.cantidad).toLocaleString("es-CO"))))), /* @__PURE__ */ React.createElement("div", { className: "order-summary" }, /* @__PURE__ */ React.createElement("h3", null, "Resumen"), /* @__PURE__ */ React.createElement("div", { className: "summary-item" }, /* @__PURE__ */ React.createElement("span", null, "Subtotal:"), /* @__PURE__ */ React.createElement("span", null, "$", orderData.subtotal.toLocaleString("es-CO"))), /* @__PURE__ */ React.createElement("div", { className: "summary-item" }, /* @__PURE__ */ React.createElement("span", null, "Envío:"), /* @__PURE__ */ React.createElement("span", null, "$", orderData.envio.toLocaleString("es-CO"))), /* @__PURE__ */ React.createElement("div", { className: "summary-item total" }, /* @__PURE__ */ React.createElement("span", null, "Total:"), /* @__PURE__ */ React.createElement("span", null, "$", orderData.total.toLocaleString("es-CO")))), /* @__PURE__ */ React.createElement("div", { className: "modal-actions" }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: handleClose, className: "btn btn-secondary" }, "Cerrar"))), /* @__PURE__ */ React.createElement("style", null, `
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
            `));
}

const $$Perfil = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Mi Perfil", "data-astro-cid-7voezwz4": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container" data-astro-cid-7voezwz4> <div class="profile-header" data-astro-cid-7voezwz4> <h1 data-astro-cid-7voezwz4>Mi Perfil</h1> <p data-astro-cid-7voezwz4>Aquí puedes ver tu información y tu historial de pedidos.</p> </div> <div class="profile-layout" data-astro-cid-7voezwz4> <aside class="profile-sidebar" data-astro-cid-7voezwz4> <nav data-astro-cid-7voezwz4> <a href="#perfil" class="active" data-astro-cid-7voezwz4>Información Personal</a> <a href="#pedidos" data-astro-cid-7voezwz4>Mis Pedidos</a> <a href="#" id="logout-btn" data-astro-cid-7voezwz4>Cerrar Sesión</a> </nav> </aside> <main class="profile-content" data-astro-cid-7voezwz4> <section id="perfil" data-astro-cid-7voezwz4> <h2 data-astro-cid-7voezwz4>Información Personal</h2> <div class="card" id="user-info-card" data-astro-cid-7voezwz4> <p data-astro-cid-7voezwz4>Cargando información del usuario...</p> </div> </section> <section id="pedidos" data-astro-cid-7voezwz4> <h2 data-astro-cid-7voezwz4>Mis Pedidos</h2> <div class="card" id="orders-list" data-astro-cid-7voezwz4> <p data-astro-cid-7voezwz4>Cargando pedidos...</p> </div> </section> </main> </div> </div> ${renderComponent($$result2, "EditProfileModal", EditProfileModal, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/EditProfileModal.tsx", "client:component-export": "default", "data-astro-cid-7voezwz4": true })} ${renderComponent($$result2, "OrderDetailsModal", OrderDetailsModal, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/OrderDetailsModal.tsx", "client:component-export": "default", "data-astro-cid-7voezwz4": true })} ` })} ${renderScript($$result, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/pages/perfil.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/pages/perfil.astro", void 0);

const $$file = "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/pages/perfil.astro";
const $$url = "/perfil";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Perfil,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
