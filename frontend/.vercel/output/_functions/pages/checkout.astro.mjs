import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_6TKJ0_KC.mjs';
import { a as auth, d as db, $ as $$Layout } from '../chunks/Layout_D8BJRdtr.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

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
    return /* @__PURE__ */ jsx("div", { className: "text-center", style: { padding: "40px" }, children: /* @__PURE__ */ jsx("p", { children: "Cargando información..." }) });
  }
  if (success) {
    return /* @__PURE__ */ jsxs("div", { className: "success-message text-center", style: { padding: "40px", background: "#f8fdf8", borderRadius: "12px" }, children: [
      /* @__PURE__ */ jsx("div", { style: { fontSize: "4rem", marginBottom: "20px" }, children: "🌿" }),
      /* @__PURE__ */ jsx("h2", { children: "¡Gracias por tu compra!" }),
      /* @__PURE__ */ jsx("p", { children: "Tu pedido ha sido registrado exitosamente." }),
      wppLink && /* @__PURE__ */ jsxs("div", { style: { marginTop: "30px", padding: "20px", background: "#e6f4ea", borderRadius: "8px" }, children: [
        /* @__PURE__ */ jsx("p", { style: { marginBottom: "15px", fontWeight: "500" }, children: "Paso final: Envíanos un WhatsApp para coordinar el pago y envío." }),
        /* @__PURE__ */ jsx("a", { href: wppLink, target: "_blank", rel: "noopener noreferrer", className: "btn btn-checkout", style: { backgroundColor: "#25d366", display: "inline-block", maxWidth: "300px" }, children: "ENVIAR WHATSAPP" })
      ] }),
      /* @__PURE__ */ jsx("div", { style: { marginTop: "30px" }, children: /* @__PURE__ */ jsx("a", { href: "/", className: "btn btn-primary", style: { textDecoration: "none" }, children: "Volver al Inicio" }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "checkout-container", children: [
    currentUser && userData ? /* @__PURE__ */ jsxs("div", { className: "user-info-summary", children: [
      /* @__PURE__ */ jsx("h3", { children: "Información de Envío" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Hola de nuevo, ",
        /* @__PURE__ */ jsx("strong", { children: userData.nombre }),
        ". Usaremos la información de tu perfil para este pedido."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "user-data-display", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Nombre:" }),
          " ",
          userData.nombre,
          " ",
          userData.apellido
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Email:" }),
          " ",
          userData.email
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Teléfono:" }),
          " ",
          userData.telefono || "No especificado"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Dirección de Envío:" }),
          " ",
          userData.direccion || "No especificada",
          ", ",
          userData.ciudad || "Sin ciudad"
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "info-text", children: "Asegúrate de que tu dirección y datos de contacto estén actualizados en tu perfil." })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "login-prompt", children: /* @__PURE__ */ jsxs("p", { children: [
        "¿Ya tienes una cuenta? ",
        /* @__PURE__ */ jsx("a", { href: "/login", children: "Inicia sesión aquí" }),
        " para un proceso más rápido."
      ] }) }),
      /* @__PURE__ */ jsxs("form", { id: "checkout-form-guest", className: "checkout-form", children: [
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { children: "Nombre Completo *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "nombreCompleto",
              required: true,
              value: formData.nombreCompleto,
              onChange: handleChange,
              className: "input-field"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-row", children: [
          /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsx("label", { children: "Email *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                name: "email",
                required: true,
                value: formData.email,
                onChange: handleChange,
                className: "input-field"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsx("label", { children: "Celular *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                name: "celular",
                required: true,
                value: formData.celular,
                onChange: handleChange,
                className: "input-field"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { children: "Empresa (Opcional)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "empresa",
              value: formData.empresa,
              onChange: handleChange,
              className: "input-field"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-row", children: [
          /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsx("label", { children: "Dirección de Envío *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "direccion",
                required: true,
                value: formData.direccion,
                onChange: handleChange,
                className: "input-field"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsx("label", { children: "Ciudad *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "ciudad",
                required: true,
                value: formData.ciudad,
                onChange: handleChange,
                className: "input-field"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    error && /* @__PURE__ */ jsx("p", { className: "error-message", children: error }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "btn-checkout",
        disabled: loading,
        onClick: handleSubmit,
        children: loading ? "PROCESANDO..." : "CONFIRMAR PEDIDO"
      }
    )
  ] });
}

const $$Checkout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Checkout", "description": "Finaliza tu compra", "data-astro-cid-ojox7d5b": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="checkout-header-section text-center" data-astro-cid-ojox7d5b> <span class="detail-badge" data-astro-cid-ojox7d5b>PROCESAR PEDIDO</span> <h1 class="main-title" data-astro-cid-ojox7d5b>FINALIZAR COMPRA</h1> <p class="header-subtitle" data-astro-cid-ojox7d5b>Completa tus datos para procesar el pedido</p> </div> <div class="checkout-page" data-astro-cid-ojox7d5b> <div class="container" data-astro-cid-ojox7d5b> ${renderComponent($$result2, "CheckoutForm", CheckoutForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/ASUS/Documents/Pruebas-Astro/tienda-esperanza/frontend/src/components/CheckoutForm", "client:component-export": "default", "data-astro-cid-ojox7d5b": true })} </div> </div> ` })} `;
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
