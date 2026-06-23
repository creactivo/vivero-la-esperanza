import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { r as registerUser, l as loginUser, d as db } from './Layout_D8BJRdtr.mjs';
import { Lock } from 'lucide-react';
import { doc, collection, setDoc } from 'firebase/firestore';

async function saveUserData(userId, userData) {
  if (!db) throw new Error("Firebase not initialized");
  const userRef = doc(collection(db, "usuarios"), userId);
  await setDoc(userRef, {
    ...userData,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  });
}
function AuthForm({ mode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "registro") {
        if (password !== confirmPassword) {
          setError("Las contraseñas no coinciden");
          setLoading(false);
          return;
        }
        if (!nombre || !apellido || !telefono) {
          setError("Por favor completa todos los campos");
          setLoading(false);
          return;
        }
        const userCredential = await registerUser(email, password);
        if (userCredential?.user) {
          await saveUserData(userCredential.user.uid, {
            nombre,
            apellido,
            telefono,
            email
          });
        }
      } else {
        await loginUser(email, password);
      }
      window.location.href = "/perfil";
    } catch (err) {
      console.error("[AuthForm] Error de autenticación:", err.code || err.message);
      const errorMessages = {
        "auth/email-already-in-use": "Este email ya está registrado",
        "auth/invalid-email": "Email inválido",
        "auth/weak-password": "La contraseña debe tener al menos 6 caracteres",
        "auth/user-not-found": "Usuario no encontrado",
        "auth/wrong-password": "Contraseña incorrecta",
        "auth/invalid-credential": "Las credenciales son incorrectas. Por favor, verifica tu email y contraseña.",
        "auth/too-many-requests": "Has intentado iniciar sesión demasiadas veces. Por favor, inténtalo de nuevo más tarde.",
        "auth/network-request-failed": "Error de red. Por favor, comprueba tu conexión a internet.",
        "Firebase not initialized": "Por favor configura Firebase primero"
      };
      setError(errorMessages[err.code] || errorMessages[err.message] || "Error al procesar la solicitud");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "auth-container", children: /* @__PURE__ */ jsxs("div", { className: "auth-card", children: [
    /* @__PURE__ */ jsx("div", { className: "auth-icon-wrapper", children: /* @__PURE__ */ jsx(Lock, { size: 32 }) }),
    /* @__PURE__ */ jsx("h2", { className: "auth-card-title", children: mode === "login" ? "INICIO DE SESIÓN REQUERIDO" : "REGISTRO REQUERIDO" }),
    /* @__PURE__ */ jsx("p", { className: "auth-subtitle", children: mode === "login" ? "Debes iniciar sesión para realizar un pedido" : "Completa el formulario para crear tu cuenta mayorista" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "auth-form", children: [
      mode === "registro" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "form-row", children: [
          /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "nombre", children: "Nombre" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "nombre",
                required: true,
                value: nombre,
                onChange: (e) => setNombre(e.target.value),
                placeholder: "Tu nombre"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "apellido", children: "Apellido" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "apellido",
                required: true,
                value: apellido,
                onChange: (e) => setApellido(e.target.value),
                placeholder: "Tu apellido"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-row", children: [
          /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                id: "email",
                required: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "tu@email.com"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "telefono", children: "Teléfono" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                id: "telefono",
                required: true,
                value: telefono,
                onChange: (e) => setTelefono(e.target.value),
                placeholder: "+57 300 123 4567"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-row", children: [
          /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "Contraseña" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "password",
                id: "password",
                required: true,
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "••••••••",
                minLength: 6
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "confirmPassword", children: "Confirmar contraseña" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "password",
                id: "confirmPassword",
                required: true,
                value: confirmPassword,
                onChange: (e) => setConfirmPassword(e.target.value),
                placeholder: "••••••••",
                minLength: 6
              }
            )
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              id: "email",
              required: true,
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "tu@email.com"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "Contraseña" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              id: "password",
              required: true,
              value: password,
              onChange: (e) => setPassword(e.target.value),
              placeholder: "••••••••",
              minLength: 6
            }
          )
        ] })
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "error-message", children: error }),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary btn-large btn-submit", disabled: loading, children: loading ? "Procesando..." : mode === "login" ? "INICIAR SESIÓN" : "CREAR CUENTA" }),
      /* @__PURE__ */ jsx("div", { className: "auth-toggle", children: mode === "login" ? /* @__PURE__ */ jsxs("p", { children: [
        "¿No tienes cuenta? ",
        /* @__PURE__ */ jsx("a", { href: "/registro", children: "Regístrate aquí" })
      ] }) : /* @__PURE__ */ jsxs("p", { children: [
        "¿Ya tienes cuenta? ",
        /* @__PURE__ */ jsx("a", { href: "/login", children: "Inicia sesión aquí" })
      ] }) })
    ] })
  ] }) });
}

export { AuthForm as A };
