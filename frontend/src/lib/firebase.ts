import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { 
    getAuth, 
    initializeAuth, 
    onAuthStateChanged, 
    type Auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { 
    getFirestore, 
    type Firestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs,
} from 'firebase/firestore';
import { browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// Evitar la reinicialización en HMR (Hot Module Replacement)
if (getApps().length === 0) {
    if (firebaseConfig.apiKey) {
        try {
            app = initializeApp(firebaseConfig);
            auth = initializeAuth(app, {
                persistence: browserLocalPersistence
            });
            db = getFirestore(app);
        } catch (error) {
            console.error('[firebase] Error en la inicialización:', error);
        }
    } else {
        console.warn('[firebase] La configuración está ausente. Firebase no inicializado.');
    }
} else {
    app = getApp();
    auth = getAuth(app); 
    db = getFirestore(app);
}

export { 
    app, 
    auth, 
    db, 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
};

// Auth functions
export async function registerUser(email: string, password: string) {
    if (!auth) throw new Error('Firebase not initialized');
    return await createUserWithEmailAndPassword(auth, email, password);
}

export async function loginUser(email: string, password: string) {
    if (!auth) throw new Error('Firebase not initialized');
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutUser() {
    if (!auth) throw new Error('Firebase not initialized');
    return await signOut(auth);
}

// Order interface
export interface OrderData {
    userId: string;
    fecha: any;
    cliente: {
        nombreCompleto: string;
        email: string;
        empresa: string;
        celular: string;
        direccion: {
            calle: string;
            ciudad: string;
            codigoPostal: string;
            pais: string;
        };
    };
    productos: Array<{
        productoId: number;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
    }>;
    total: number;
    estado: 'pendiente' | 'procesando' | 'enviado' | 'entregado';
}

// Save order to Firestore
export async function saveOrder(orderData: Omit<OrderData, 'fecha'>) {
    if (!db) throw new Error('Firebase not initialized');

    const ordersCollection = collection(db, 'ordenes');
    const docRef = await addDoc(ordersCollection, {
        ...orderData,
        fecha: serverTimestamp(),
    });

    return docRef.id;
}

// Get user orders
export async function getUserOrders(userId: string) {
    if (!db) throw new Error('Firebase not initialized');

    const ordersCollection = collection(db, 'ordenes');
    const q = query(ordersCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}