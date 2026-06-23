import { c as createComponent } from './astro-component_huBepDft.mjs';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_DMXKRZo6.mjs';
import { a as auth, d as db, $ as $$Layout } from './Layout_Bf35xjIb.mjs';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

function CheckoutForm() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    empresa: "",
    celular: "",
    direccion: "",
    ciudad: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [wppLink, setWppLink] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userDocRef = doc(db, "usuarios", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const dbUserData = userDocSnap.data();
          setUserData(dbUserData);
          setFormData({
            nombreCompleto: `${dbUserData.nombre} ${dbUserData.apellido}`,
            email: user.email || "",
            celular: dbUserData.telefono || "",
            empresa: "",
            direccion: dbUserData.direccion || "",
            ciudad: dbUserData.ciudad || ""
          });
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
      }
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (cart.length === 0) {
        setError("Tu carrito está vacío.");
        setLoading(false);
        return;
      }
      const total = cart.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0);
      const nuevoPedido = {
        userId: currentUser ? currentUser.uid : null,
        cliente: currentUser && userData ? {
          nombre: userData.nombre,
          apellido: userData.apellido,
          email: userData.email,
          telefono: userData.telefono,
          direccion: userData.direccion || "",
          ciudad: userData.ciudad || ""
        } : formData,
        items: cart,
        total,
        fecha: /* @__PURE__ */ new Date(),
        estado: "Pendiente"
      };
      const orderDoc = await addDoc(collection(db, "pedidos"), nuevoPedido);
      try {
        const serviceId = undefined                                          || "dummy_service";
        const templateId = undefined                                           || "dummy_template";
        const publicKey = undefined                                          || "dummy_key";
        if (serviceId !== "your_emailjs_service_id" && serviceId !== "dummy_service") ;
      } catch (emailErr) {
        console.error("Error enviando email:", emailErr);
      }
      const phoneInfo = "3052928927";
      const clienteAny = nuevoPedido.cliente;
      const wppMessage = `¡Hola! Acabo de realizar un pedido en la tienda.
*ID Pedido:* ${orderDoc.id}
*A nombre de:* ${clienteAny.nombre || clienteAny.nombreCompleto}
*Dirección de envío:* ${clienteAny.direccion || "No especificada"}, ${clienteAny.ciudad || ""}
*Total:* $${total.toLocaleString("es-CO")}
*Artículos:*
${cart.map((i) => `- ${i.cantidad}x ${i.nombre}`).join("\n")}`;
      setWppLink(`https://wa.me/${phoneInfo}?text=${encodeURIComponent(wppMessage)}`);
      setLoading(false);
      setSuccess(true);
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Error al crear el pedido: ", err);
      setError("Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.");
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  if (loadingUser) {
    return /* @__PURE__ */ React.createElement("div", { className: "text-center", style: { padding: "40px" } }, /* @__PURE__ */ React.createElement("p", null, "Cargando información..."));
  }
  if (success) {
    return /* @__PURE__ */ React.createElement("div", { className: "success-message text-center", style: { padding: "40px", background: "#f8fdf8", borderRadius: "12px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "4rem", marginBottom: "20px" } }, "🌿"), /* @__PURE__ */ React.createElement("h2", null, "¡Gracias por tu compra!"), /* @__PURE__ */ React.createElement("p", null, "Tu pedido ha sido registrado exitosamente."), wppLink && /* @__PURE__ */ React.createElement("div", { style: { marginTop: "30px", padding: "20px", background: "#e6f4ea", borderRadius: "8px" } }, /* @__PURE__ */ React.createElement("p", { style: { marginBottom: "15px", fontWeight: "500" } }, "Paso final: Envíanos un WhatsApp para coordinar el pago y envío."), /* @__PURE__ */ React.createElement("a", { href: wppLink, target: "_blank", rel: "noopener noreferrer", className: "btn btn-checkout", style: { backgroundColor: "#25d366", display: "inline-block", maxWidth: "300px" } }, "ENVIAR WHATSAPP")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "30px" } }, /* @__PURE__ */ React.createElement("a", { href: "/", className: "btn btn-primary", style: { textDecoration: "none" } }, "Volver al Inicio")));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "checkout-container" }, currentUser && userData ? /* @__PURE__ */ React.createElement("div", { className: "user-info-summary" }, /* @__PURE__ */ React.createElement("h3", null, "Información de Envío"), /* @__PURE__ */ React.createElement("p", null, "Hola de nuevo, ", /* @__PURE__ */ React.createElement("strong", null, userData.nombre), ". Usaremos la información de tu perfil para este pedido."), /* @__PURE__ */ React.createElement("div", { className: "user-data-display" }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Nombre:"), " ", userData.nombre, " ", userData.apellido), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Email:"), " ", userData.email), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Teléfono:"), " ", userData.telefono || "No especificado"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Dirección de Envío:"), " ", userData.direccion || "No especificada", ", ", userData.ciudad || "Sin ciudad")), /* @__PURE__ */ React.createElement("p", { className: "info-text" }, "Asegúrate de que tu dirección y datos de contacto estén actualizados en tu perfil.")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "login-prompt" }, /* @__PURE__ */ React.createElement("p", null, "¿Ya tienes una cuenta? ", /* @__PURE__ */ React.createElement("a", { href: "/login" }, "Inicia sesión aquí"), " para un proceso más rápido.")), /* @__PURE__ */ React.createElement("form", { id: "checkout-form-guest", className: "checkout-form" }, /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", null, "Nombre Completo *"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      name: "nombreCompleto",
      required: true,
      value: formData.nombreCompleto,
      onChange: handleChange,
      className: "input-field"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "form-row" }, /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", null, "Email *"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "email",
      name: "email",
      required: true,
      value: formData.email,
      onChange: handleChange,
      className: "input-field"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", null, "Celular *"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "tel",
      name: "celular",
      required: true,
      value: formData.celular,
      onChange: handleChange,
      className: "input-field"
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", null, "Empresa (Opcional)"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      name: "empresa",
      value: formData.empresa,
      onChange: handleChange,
      className: "input-field"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "form-row" }, /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", null, "Dirección de Envío *"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      name: "direccion",
      required: true,
      value: formData.direccion,
      onChange: handleChange,
      className: "input-field"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", null, "Ciudad *"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      name: "ciudad",
      required: true,
      value: formData.ciudad,
      onChange: handleChange,
      className: "input-field"
    }
  ))))), error && /* @__PURE__ */ React.createElement("p", { className: "error-message" }, error), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: "btn-checkout",
      disabled: loading,
      onClick: handleSubmit
    },
    loading ? "PROCESANDO..." : "CONFIRMAR PEDIDO"
  ));
}

const $$Checkout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Checkout", "description": "Finaliza tu compra", "data-astro-cid-ojox7d5b": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="checkout-header-section text-center" data-astro-cid-ojox7d5b> <span class="detail-badge" data-astro-cid-ojox7d5b>PROCESAR PEDIDO</span> <h1 class="main-title" data-astro-cid-ojox7d5b>FINALIZAR COMPRA</h1> <p class="header-subtitle" data-astro-cid-ojox7d5b>Completa tus datos para procesar el pedido</p> </div> <div class="checkout-page" data-astro-cid-ojox7d5b> <div class="container" data-astro-cid-ojox7d5b> ${renderComponent($$result2, "CheckoutForm", CheckoutForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/CheckoutForm", "client:component-export": "default", "data-astro-cid-ojox7d5b": true })} </div> </div> ` })}`;
}, "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/pages/checkout.astro", void 0);

const $$file = "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/pages/checkout.astro";
const $$url = "/checkout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Checkout,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
