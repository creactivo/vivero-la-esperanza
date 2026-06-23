import { useState } from 'react';
import { b as registerUser, l as loginUser, d as db } from './Layout_Bf35xjIb.mjs';
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
  return /* @__PURE__ */ React.createElement("div", { className: "auth-container" }, /* @__PURE__ */ React.createElement("div", { className: "auth-card" }, /* @__PURE__ */ React.createElement("div", { className: "auth-icon-wrapper" }, /* @__PURE__ */ React.createElement(Lock, { size: 32 })), /* @__PURE__ */ React.createElement("h2", { className: "auth-card-title" }, mode === "login" ? "INICIO DE SESIÓN REQUERIDO" : "REGISTRO REQUERIDO"), /* @__PURE__ */ React.createElement("p", { className: "auth-subtitle" }, mode === "login" ? "Debes iniciar sesión para realizar un pedido" : "Completa el formulario para crear tu cuenta mayorista"), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, className: "auth-form" }, mode === "registro" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "form-row" }, /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "nombre" }, "Nombre"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      id: "nombre",
      required: true,
      value: nombre,
      onChange: (e) => setNombre(e.target.value),
      placeholder: "Tu nombre"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "apellido" }, "Apellido"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      id: "apellido",
      required: true,
      value: apellido,
      onChange: (e) => setApellido(e.target.value),
      placeholder: "Tu apellido"
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "form-row" }, /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "email" }, "Email"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "email",
      id: "email",
      required: true,
      value: email,
      onChange: (e) => setEmail(e.target.value),
      placeholder: "tu@email.com"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "telefono" }, "Teléfono"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "tel",
      id: "telefono",
      required: true,
      value: telefono,
      onChange: (e) => setTelefono(e.target.value),
      placeholder: "+57 300 123 4567"
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "form-row" }, /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "password" }, "Contraseña"), /* @__PURE__ */ React.createElement(
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
  )), /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "confirmPassword" }, "Confirmar contraseña"), /* @__PURE__ */ React.createElement(
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
  )))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "email" }, "Email"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "email",
      id: "email",
      required: true,
      value: email,
      onChange: (e) => setEmail(e.target.value),
      placeholder: "tu@email.com"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "form-group" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "password" }, "Contraseña"), /* @__PURE__ */ React.createElement(
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
  ))), error && /* @__PURE__ */ React.createElement("div", { className: "error-message" }, error), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn btn-primary btn-large btn-submit", disabled: loading }, loading ? "Procesando..." : mode === "login" ? "INICIAR SESIÓN" : "CREAR CUENTA"), /* @__PURE__ */ React.createElement("div", { className: "auth-toggle" }, mode === "login" ? /* @__PURE__ */ React.createElement("p", null, "¿No tienes cuenta? ", /* @__PURE__ */ React.createElement("a", { href: "/registro" }, "Regístrate aquí")) : /* @__PURE__ */ React.createElement("p", null, "¿Ya tienes cuenta? ", /* @__PURE__ */ React.createElement("a", { href: "/login" }, "Inicia sesión aquí"))))));
}

export { AuthForm as A };
