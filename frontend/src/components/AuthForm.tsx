import React, { useState } from 'react';
import { registerUser, loginUser, db } from '../lib/firebase';
import { Lock } from 'lucide-react';
import { collection, doc, setDoc } from 'firebase/firestore';

interface AuthFormProps {
    mode: 'login' | 'registro';
}

async function saveUserData(userId: string, userData: { nombre: string; apellido: string; telefono: string; email: string }) {
    if (!db) throw new Error('Firebase not initialized');
    const userRef = doc(collection(db, 'usuarios'), userId);
    await setDoc(userRef, {
        ...userData,
        createdAt: new Date().toISOString()
    });
}

export default function AuthForm({ mode }: AuthFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (mode === 'registro') {
                if (password !== confirmPassword) {
                    setError('Las contraseñas no coinciden');
                    setLoading(false);
                    return;
                }
                if (!nombre || !apellido || !telefono) {
                    setError('Por favor completa todos los campos');
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

            window.location.href = '/perfil';
        } catch (err: any) {
            console.error('[AuthForm] Error de autenticación:', err.code || err.message);
            
            const errorMessages: { [key: string]: string } = {
                'auth/email-already-in-use': 'Este email ya está registrado',
                'auth/invalid-email': 'Email inválido',
                'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
                'auth/user-not-found': 'Usuario no encontrado',
                'auth/wrong-password': 'Contraseña incorrecta',
                'auth/invalid-credential': 'Las credenciales son incorrectas. Por favor, verifica tu email y contraseña.',
                'auth/too-many-requests': 'Has intentado iniciar sesión demasiadas veces. Por favor, inténtalo de nuevo más tarde.',
                'auth/network-request-failed': 'Error de red. Por favor, comprueba tu conexión a internet.',
                'Firebase not initialized': 'Por favor configura Firebase primero'
            };

            setError(errorMessages[err.code] || errorMessages[err.message] || 'Error al procesar la solicitud');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-icon-wrapper">
                    <Lock size={32} />
                </div>
                <h2 className="auth-card-title">
                    {mode === 'login' ? 'INICIO DE SESIÓN REQUERIDO' : 'REGISTRO REQUERIDO'}
                </h2>
                <p className="auth-subtitle">
                    {mode === 'login'
                        ? 'Debes iniciar sesión para realizar un pedido'
                        : 'Completa el formulario para crear tu cuenta mayorista'}
                </p>

                <form onSubmit={handleSubmit} className="auth-form">
                    {mode === 'registro' ? (
                        <>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        required
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="apellido">Apellido</label>
                                    <input
                                        type="text"
                                        id="apellido"
                                        required
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                        placeholder="Tu apellido"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="tu@email.com"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="telefono">Teléfono</label>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        required
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        placeholder="+57 300 123 4567"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="password">Contraseña</label>
                                    <input
                                        type="password"
                                        id="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirmar contraseña</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    minLength={6}
                                />
                            </div>
                        </>
                    )}

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary btn-large btn-submit" disabled={loading}>
                        {loading ? 'Procesando...' : (mode === 'login' ? 'INICIAR SESIÓN' : 'CREAR CUENTA')}
                    </button>

                    <div className="auth-toggle">
                        {mode === 'login' ? (
                            <p>
                                ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
                            </p>
                        ) : (
                            <p>
                                ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
                            </p>
                        )}
                    </div>
                </form>
            </div>


        </div>
    );
}