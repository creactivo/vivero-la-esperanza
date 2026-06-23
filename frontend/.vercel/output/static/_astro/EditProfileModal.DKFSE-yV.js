import{j as e}from"./jsx-runtime.TBa3i5EZ.js";import{r as t}from"./index.CVf8TyFT.js";import{d as w,a as N,u as E}from"./firebase.Bbkre47f.js";function D(){const[v,l]=t.useState(!1),[d,j]=t.useState(null),[u,c]=t.useState(""),[p,m]=t.useState(""),[f,x]=t.useState(""),[i,b]=t.useState(!1),[g,n]=t.useState("");t.useEffect(()=>{const o=r=>{const{user:a,initialData:s}=r.detail;a&&s&&(j(a),c(s.nombre||""),m(s.apellido||""),x(s.telefono||""),l(!0))};return window.addEventListener("open-edit-profile-modal",o),()=>{window.removeEventListener("open-edit-profile-modal",o)}},[]);const h=()=>{l(!1),n("")},y=async o=>{if(o.preventDefault(),!d){n("No se ha encontrado información del usuario.");return}b(!0),n("");try{const r=w(N,"usuarios",d.uid),a={nombre:u,apellido:p,telefono:f};await E(r,a),window.dispatchEvent(new CustomEvent("profile-updated",{detail:a})),h()}catch(r){console.error("Error updating profile:",r),n("No se pudo actualizar la información. Inténtalo de nuevo.")}finally{b(!1)}};return v?e.jsxs("div",{className:"modal-overlay",children:[e.jsxs("div",{className:"modal-content",children:[e.jsx("h2",{children:"Editar Información"}),e.jsxs("form",{onSubmit:y,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"nombre",children:"Nombre"}),e.jsx("input",{id:"nombre",type:"text",value:u,onChange:o=>c(o.target.value),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"apellido",children:"Apellido"}),e.jsx("input",{id:"apellido",type:"text",value:p,onChange:o=>m(o.target.value),required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"telefono",children:"Teléfono"}),e.jsx("input",{id:"telefono",type:"tel",value:f,onChange:o=>x(o.target.value),required:!0})]}),g&&e.jsx("p",{className:"error-message",children:g}),e.jsxs("div",{className:"modal-actions",children:[e.jsx("button",{type:"button",onClick:h,className:"btn btn-secondary",disabled:i,children:"Cancelar"}),e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:i,children:i?"Guardando...":"Guardar Cambios"})]})]})]}),e.jsx("style",{children:`
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
            `})]}):null}export{D as default};
