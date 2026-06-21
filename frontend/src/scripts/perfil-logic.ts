import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import type { UserData, Order } from '../types';

function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    }, (error) => {
      unsubscribe();
      reject(error);
    });
  });
}

export function initializeProfilePage() {
  document.addEventListener('astro:page-load', async () => {
    const userInfoCard = document.getElementById('user-info-card');
    const ordersList = document.getElementById('orders-list');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (!userInfoCard || !ordersList || !logoutBtn) {
      console.error('[perfil-logic] A critical element was not found. Aborting.');
      return;
    }

    userInfoCard.innerHTML = '<p>Verificando sesión...</p>';
    ordersList.innerHTML = '<p>Cargando pedidos...</p>';

    try {
      const user = await getCurrentUser();

      if (user) {
        let currentUserData: UserData | null = null;
        let userOrders: Order[] = [];

        const renderUserInfo = (userData: UserData) => {
          userInfoCard.innerHTML = `
            <div class="user-data-fields">
              <p><strong>Nombre:</strong> ${userData.nombre} ${userData.apellido}</p>
              <p><strong>Email:</strong> ${userData.email}</p>
              <p><strong>Teléfono:</strong> ${userData.telefono}</p>
            </div>
            <button id="edit-profile-btn" class="btn btn-secondary">Editar Información</button>
          `;
          document.getElementById('edit-profile-btn')?.addEventListener('click', () => {
             window.dispatchEvent(new CustomEvent('open-edit-profile-modal', {
               detail: { user, initialData: currentUserData }
             }));
          });
        };

        const fetchOrders = async (userId: string) => {
          try {
            const ordersQuery = query(collection(db, "pedidos"), where("userId", "==", userId));
            const querySnapshot = await getDocs(ordersQuery);
            
            if (querySnapshot.empty) {
              ordersList.innerHTML = '<p>No tienes pedidos todavía.</p>';
              return;
            }

            userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
            
            ordersList.innerHTML = userOrders.map(order => {
              const orderDate = order.fecha.toDate().toLocaleDateString('es-ES');
              const numericTotal = Number(order.total);
              const total = !isNaN(numericTotal) ? numericTotal : 0;

              const itemsHtml = order.items.map(item => 
                `<li>${item.cantidad} x ${item.nombre}</li>`
              ).join('');

              return `
                <div class="order-item">
                  <div class="order-details">
                    <p><strong>Pedido #${order.id.substring(0, 7)}</strong> - ${orderDate}</p>
                    <ul class="order-items-list">
                      ${itemsHtml}
                    </ul>
                    <p class="order-total">Total: $${total.toLocaleString('es-CO')}</p>
                  </div>
              `;
            }).join('');


          } catch (error) {
            console.error("[perfil-logic] Error fetching orders:", error);
            ordersList.innerHTML = '<p>Hubo un error al cargar tus pedidos.</p>';
          }
        };
        
        window.addEventListener('profile-updated', (e) => {
          const customEvent = e as CustomEvent<Partial<UserData>>;
          currentUserData = { ...currentUserData!, ...customEvent.detail };
          if (currentUserData) renderUserInfo(currentUserData);
        });

        logoutBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          try {
            await signOut(auth);
            window.location.href = '/';
          } catch (error) {
            console.error('Error signing out:', error);
          }
        });

        const userDocRef = doc(db, 'usuarios', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          currentUserData = userDocSnap.data() as UserData;
          renderUserInfo(currentUserData);
          await fetchOrders(user.uid);
        } else {
          console.warn('[perfil-logic] User document does not exist in Firestore.');
          userInfoCard.innerHTML = '<p>Error: No se encontró el registro del usuario.</p>';
          ordersList.innerHTML = '';
        }

      } else {
        console.log('[perfil-logic] No user found. Redirecting to /login.');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('[perfil-logic] Error getting auth state:', error);
      userInfoCard.innerHTML = '<p>Error de autenticación. Inténtalo de nuevo.</p>';
    }
  });
}