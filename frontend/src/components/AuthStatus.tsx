import { useState, useEffect } from 'react';
import { auth, onAuthStateChanged, signOut } from '../lib/firebase';
import type { User as FirebaseUser } from 'firebase/auth';
import { User as UserIcon } from 'lucide-react';

const AuthStatus = () => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Limpiar el listener cuando el componente se desmonte
        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            // Redirigir a la página de inicio después de cerrar sesión
            window.location.href = '/';
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    // Mientras se verifica el estado de autenticación, no mostrar nada para evitar parpadeos
    if (loading) {
        return <div style={{ width: '150px' }} />; // Placeholder to prevent layout shift
    }

    return (
        <div className="auth-status-container">
            {user ? (
                <details className="user-menu-details">
                    <summary className="user-info-trigger">
                        <UserIcon size={22} strokeWidth={1.5} />
                        <span className="user-identifier user-email-text">{user.displayName || user.email}</span>
                    </summary>
                    <div className="user-dropdown-menu">
                        <a href="/perfil" className="dropdown-link">Mi Perfil</a>
                        <button onClick={handleSignOut} className="logout-button">
                            Cerrar Sesión
                        </button>
                    </div>
                </details>
            ) : (
                <a href="/login" className="icon-link" aria-label="Iniciar Sesión">
                    <UserIcon size={22} strokeWidth={1.5} />
                </a>
            )}
        </div>
    );
};

export default AuthStatus;