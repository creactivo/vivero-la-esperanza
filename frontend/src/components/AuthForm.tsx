import React, { useState } from 'react';
import { registerUser, loginUser, db } from '../lib/firebase';
import { Lock } from 'lucide-react';
import { collection, doc, setDoc } from 'firebase/firestore';

interface AuthFormProps {
    mode: 'login' | 'registro';
}

interface FormErrors {
    nombre?: string;
    apellido?: string;
    email?: string;
    telefono?: string;
    password?: string;
    confirmPassword?: string;
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
    const [generalError, setGeneralError] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({});

    // Validaciones
    const validateEmail = (value: string) => {
        if (!value) return 'El email es obligatorio';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'El email no es válido';
        return '';
    };

    const validatePassword = (value: string) => {
        if (!value) return 'La contraseña es obligatoria';
        if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
        return '';
    };

    const validatePhone = (value: string) => {
        if (!value) return 'El teléfono es obligatorio';
        const phoneRegex = /^(\+57)?\s?3\d{9}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'El teléfono debe tener 10 dígitos (ej: 3001234567)';
        return '';
    };

    const validateRequired = (value: string, fieldName: string) => {
        if (!value.trim()) return `${fieldName} es obligatorio`;
        return '';
    };

    const validateField = (name: string, value: string) => {
        let error = '';
        switch (name) {
            case 'nombre':
                error = validateRequired(value, 'El nombre');
                break;
            case 'apellido':
                error = validateRequired(value, 'El apellido');
                break;
            case 'email':
                error = validateEmail(value);
                break;
            case 'telefono':
                error = validatePhone(value);
                break;
            case 'password':
                error = validatePassword(value);
                break;
            case 'confirmPassword':
                if (mode === 'registro' && value !== password) {
                    error = 'Las contraseñas no coinciden';
                }
                break;
        }
        return error;
    };

    const handleBlur = (name: string, value: string) => {
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleChange = (name: string, value: string) => {
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setGeneralError('');
        setLoading(true);

        // Validar todos los campos antes de enviar
        const allErrors: FormErrors = {};
        const fieldsToValidate = mode === 'registro' 
            ? ['nombre', 'apellido', 'email', 'telefono', 'password', 'confirmPassword'] 
            : ['email', 'password'];
        
        fieldsToValidate.forEach(name => {
            const value = 
                name === 'nombre' ? nombre :
                name === 'apellido' ? apellido :
                name === 'email' ? email :
                name === 'telefono' ? telefono :
                name === 'password' ? password :
                name === 'confirmPassword' ? confirmPassword : '';
            
            const error = validateField(name, value);
            if (error) allErrors[name as keyof FormErrors] = error;
        });

        if (Object.keys(allErrors).length > 0) {
            setErrors(allErrors);
            setTouched(fieldsToValidate.reduce((acc, name) => ({ ...acc, [name]: true }), {}));
            setLoading(false);
            return;
        }

        try {
            if (mode === 'registro') {
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

            setGeneralError(errorMessages[err.code] || errorMessages[err.message] || 'Error al procesar la solicitud');
        } finally {
            setLoading(false);
        }
    };

    const getFieldClasses = (name: string) => {
        return touched[name] && errors[name as keyof FormErrors] ? 'error' : '';
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
                                <div className={`form-group ${getFieldClasses('nombre')}`}>
                                    <label htmlFor="nombre">Nombre *</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        value={nombre}
                                        onChange={(e) => { setNombre(e.target.value); handleChange('nombre', e.target.value); }}
                                        onBlur={(e) => handleBlur('nombre', e.target.value)}
                                        placeholder="Tu nombre"
                                    />
                                    {touched.nombre && errors.nombre && <span className="field-error">{errors.nombre}</span>}
                                </div>
                                <div className={`form-group ${getFieldClasses('apellido')}`}>
                                    <label htmlFor="apellido">Apellido *</label>
                                    <input
                                        type="text"
                                        id="apellido"
                                        value={apellido}
                                        onChange={(e) => { setApellido(e.target.value); handleChange('apellido', e.target.value); }}
                                        onBlur={(e) => handleBlur('apellido', e.target.value)}
                                        placeholder="Tu apellido"
                                    />
                                    {touched.apellido && errors.apellido && <span className="field-error">{errors.apellido}</span>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className={`form-group ${getFieldClasses('email')}`}>
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); handleChange('email', e.target.value); }}
                                        onBlur={(e) => handleBlur('email', e.target.value)}
                                        placeholder="tu@email.com"
                                    />
                                    {touched.email && errors.email && <span className="field-error">{errors.email}</span>}
                                </div>
                                <div className={`form-group ${getFieldClasses('telefono')}`}>
                                    <label htmlFor="telefono">Teléfono *</label>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        value={telefono}
                                        onChange={(e) => { setTelefono(e.target.value); handleChange('telefono', e.target.value); }}
                                        onBlur={(e) => handleBlur('telefono', e.target.value)}
                                        placeholder="300 123 4567"
                                    />
                                    {touched.telefono && errors.telefono && <span className="field-error">{errors.telefono}</span>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className={`form-group ${getFieldClasses('password')}`}>
                                    <label htmlFor="password">Contraseña *</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); handleChange('password', e.target.value); }}
                                        onBlur={(e) => handleBlur('password', e.target.value)}
                                        placeholder="••••••••"
                                    />
                                    {touched.password && errors.password && <span className="field-error">{errors.password}</span>}
                                </div>
                                <div className={`form-group ${getFieldClasses('confirmPassword')}`}>
                                    <label htmlFor="confirmPassword">Confirmar contraseña *</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => { setConfirmPassword(e.target.value); handleChange('confirmPassword', e.target.value); }}
                                        onBlur={(e) => handleBlur('confirmPassword', e.target.value)}
                                        placeholder="••••••••"
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={`form-group ${getFieldClasses('email')}`}>
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); handleChange('email', e.target.value); }}
                                    onBlur={(e) => handleBlur('email', e.target.value)}
                                    placeholder="tu@email.com"
                                />
                                {touched.email && errors.email && <span className="field-error">{errors.email}</span>}
                            </div>
                            <div className={`form-group ${getFieldClasses('password')}`}>
                                <label htmlFor="password">Contraseña *</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); handleChange('password', e.target.value); }}
                                    onBlur={(e) => handleBlur('password', e.target.value)}
                                    placeholder="••••••••"
                                />
                                {touched.password && errors.password && <span className="field-error">{errors.password}</span>}
                            </div>
                        </>
                    )}

                    {generalError && (
                        <div className="error-message">
                            {generalError}
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