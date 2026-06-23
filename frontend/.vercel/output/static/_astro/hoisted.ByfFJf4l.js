import{q as h,c as y,a as f,w as T,g as H,e as $,b as m,d as I,f as M,o as D}from"./firebase.Bbkre47f.js";import"./hoisted.DMrs04lJ.js";function N(){return new Promise((n,o)=>{const a=D(m,e=>{a(),n(e)},e=>{a(),o(e)})})}function C(){document.addEventListener("astro:page-load",async()=>{const n=document.getElementById("user-info-card"),o=document.getElementById("orders-list"),a=document.getElementById("logout-btn");if(!n||!o||!a){console.error("[perfil-logic] A critical element was not found. Aborting.");return}n.innerHTML="<p>Verificando sesión...</p>",o.innerHTML="<p>Cargando pedidos...</p>";try{const e=await N();if(e){let r=null,d=[];const c=t=>{n.innerHTML=`
            <div class="user-data-fields">
              <p><strong>Nombre:</strong> ${t.nombre} ${t.apellido}</p>
              <p><strong>Email:</strong> ${t.email}</p>
              <p><strong>Teléfono:</strong> ${t.telefono}</p>
            </div>
            <button id="edit-profile-btn" class="btn btn-secondary">Editar Información</button>
          `,document.getElementById("edit-profile-btn")?.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-edit-profile-modal",{detail:{user:e,initialData:r}}))})},E=async t=>{try{const s=h(y(f,"pedidos"),T("userId","==",t)),u=await H(s);if(u.empty){o.innerHTML="<p>No tienes pedidos todavía.</p>";return}d=u.docs.map(i=>({id:i.id,...i.data()})),o.innerHTML=d.map(i=>{const b=i.fecha.toDate().toLocaleDateString("es-ES"),p=Number(i.total),v=isNaN(p)?0:p,L=i.items.map(g=>`<li>${g.cantidad} x ${g.nombre}</li>`).join("");return`
                <div class="order-item">
                  <div class="order-details">
                    <p><strong>Pedido #${i.id.substring(0,7)}</strong> - ${b}</p>
                    <ul class="order-items-list">
                      ${L}
                    </ul>
                    <p class="order-total">Total: $${v.toLocaleString("es-CO")}</p>
                  </div>
              `}).join("")}catch(s){console.error("[perfil-logic] Error fetching orders:",s),o.innerHTML="<p>Hubo un error al cargar tus pedidos.</p>"}};window.addEventListener("profile-updated",t=>{r={...r,...t.detail},r&&c(r)}),a.addEventListener("click",async t=>{t.preventDefault();try{await $(m),window.location.href="/"}catch(s){console.error("Error signing out:",s)}});const w=I(f,"usuarios",e.uid),l=await M(w);l.exists()?(r=l.data(),c(r),await E(e.uid)):(console.warn("[perfil-logic] User document does not exist in Firestore."),n.innerHTML="<p>Error: No se encontró el registro del usuario.</p>",o.innerHTML="")}else console.log("[perfil-logic] No user found. Redirecting to /login."),window.location.href="/login"}catch(e){console.error("[perfil-logic] Error getting auth state:",e),n.innerHTML="<p>Error de autenticación. Inténtalo de nuevo.</p>"}})}C();
