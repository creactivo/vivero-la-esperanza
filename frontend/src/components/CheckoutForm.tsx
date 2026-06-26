import React, { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

export default function CheckoutForm() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const [formData, setFormData] = useState({
        nombreCompleto: '',
        email: '',
        empresa: '',
        celular: '',
        direccion: '',
        ciudad: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [wppLink, setWppLink] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                const userDocRef = doc(db, 'usuarios', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const dbUserData = userDocSnap.data();
                    setUserData(dbUserData);
                    setFormData({
                        nombreCompleto: `${dbUserData.nombre} ${dbUserData.apellido}`,
                        email: user.email || '',
                        celular: dbUserData.telefono || '',
                        empresa: '',
                        direccion: dbUserData.direccion || '',
                        ciudad: dbUserData.ciudad || ''
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            if (cart.length === 0) {
                setError('Tu carrito está vacío.');
                setLoading(false);
                return;
            }

            const total = cart.reduce((acc: number, item: any) => acc + item.precioUnitario * item.cantidad, 0);

            const nuevoPedido = {
                userId: currentUser ? currentUser.uid : null,
                cliente: currentUser && userData ? {
                    nombre: userData.nombre,
                    apellido: userData.apellido,
                    email: userData.email,
                    telefono: userData.telefono,
                    direccion: userData.direccion || '',
                    ciudad: userData.ciudad || ''
                } : formData,
                items: cart,
                total: total,
                fecha: new Date(),
                estado: 'Pendiente'
            };

            const orderDoc = await addDoc(collection(db, 'pedidos'), nuevoPedido);

            try {
                const serviceId = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID || 'dummy_service';
                const templateId = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID || 'dummy_template';
                const publicKey = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY || 'dummy_key';
                
                if (serviceId !== 'your_emailjs_service_id' && serviceId !== 'dummy_service') {
                    const adminEmail = import.meta.env.PUBLIC_ADMIN_EMAIL || 'laesperanzavivero2026@gmail.com';
                    const templateParams = {
                        order_id: orderDoc.id,
                        to_name: (nuevoPedido.cliente as any).nombre || (nuevoPedido.cliente as any).nombreCompleto || 'Cliente',
                        to_email: (nuevoPedido.cliente as any).email,
                        address: `${(nuevoPedido.cliente as any).direccion || ''}, ${(nuevoPedido.cliente as any).ciudad || ''}`,
                        total_price: total.toLocaleString('es-CO'),
                        items_summary: cart.map((i: any) => `${i.cantidad}x ${i.nombre}`).join(', ')
                    };

                    await emailjs.send(serviceId, templateId, templateParams, publicKey);
                    
                    await emailjs.send(serviceId, templateId, {
                        ...templateParams,
                        to_name: 'Administrador Tienda Esperanza',
                        to_email: adminEmail
                    }, publicKey);
                }
            } catch (emailErr) {
                console.error('Error sending email:', emailErr);
            }

            const phoneInfo = import.meta.env.PUBLIC_WHATSAPP_NUMBER || '3052928924';
            const clienteAny = nuevoPedido.cliente as any;
            const wppMessage = `¡Hola! Acabo de realizar un pedido en la tienda.
*ID Pedido:* ${orderDoc.id}
*A nombre de:* ${clienteAny.nombre || clienteAny.nombreCompleto}
*Dirección de envío:* ${clienteAny.direccion || 'No especificada'}, ${clienteAny.ciudad || ''}
*Total:* $${total.toLocaleString('es-CO')}
*Artículos:*
${cart.map((i: any) => `- ${i.cantidad}x ${i.nombre}`).join('\n')}`;
            
            setWppLink(`https://wa.me/${phoneInfo}?text=${encodeURIComponent(wppMessage)}`);

            setLoading(false);
            setSuccess(true);
            localStorage.removeItem('cart');
            window.dispatchEvent(new Event('cartUpdated'));

        } catch (err) {
            console.error('Error creating order:', err);
            setError('Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.');
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loadingUser) {
        return <div className="text-center" style={{ padding: '40px' }}><p>Cargando información...</p></div>;
    }

    if (success) {
        return (
            <div className="success-message text-center" style={{ padding: '40px', background: '#f8fdf8', borderRadius: '12px' }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🌿</div>
                <h2>¡Gracias por tu compra!</h2>
                <p>Tu pedido ha sido registrado exitosamente.</p>
                
                {wppLink && (
                    <div style={{ marginTop: '30px', padding: '20px', background: '#e6f4ea', borderRadius: '8px' }}>
                        <p style={{ marginBottom: '15px', fontWeight: '500' }}>
                            Paso final: Envíanos un WhatsApp para coordinar el pago y envío.
                        </p>
                        <a href={wppLink} target="_blank" rel="noopener noreferrer" className="btn btn-checkout" style={{ backgroundColor: '#25d366', display: 'inline-block', maxWidth: '300px' }}>
                            ENVIAR WHATSAPP
                        </a>
                    </div>
                )}
                
                <div style={{ marginTop: '30px' }}>
                    <a href="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>Volver al Inicio</a>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            {currentUser && userData ? (
                <div className="user-info-summary">
                    <h3>Información de Envío</h3>
                    <p>Hola de nuevo, <strong>{userData.nombre}</strong>. Usaremos la información de tu perfil para este pedido.</p>
                    <div className="user-data-display">
                        <p><strong>Nombre:</strong> {userData.nombre} {userData.apellido}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Teléfono:</strong> {userData.telefono || 'No especificado'}</p>
                        <p><strong>Dirección de Envío:</strong> {userData.direccion || 'No especificada'}, {userData.ciudad || 'Sin ciudad'}</p>
                    </div>
                    <p className="info-text">Asegúrate de que tu dirección y datos de contacto estén actualizados en tu perfil.</p>
                </div>
            ) : (
                <>
                    <div className="login-prompt">
                        <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a> para un proceso más rápido.</p>
                    </div>
                    <form id="checkout-form-guest" className="checkout-form">
                        <div className="form-group">
                            <label>Nombre Completo *</label>
                            <input
                                type="text"
                                name="nombreCompleto"
                                required
                                value={formData.nombreCompleto}
                                onChange={handleChange}
                                className="input-field"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>
                            <div className="form-group">
                                <label>Celular *</label>
                                <input
                                    type="tel"
                                    name="celular"
                                    required
                                    value={formData.celular}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Empresa (Opcional)</label>
                            <input
                                type="text"
                                name="empresa"
                                value={formData.empresa}
                                onChange={handleChange}
                                className="input-field"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Dirección de Envío *</label>
                                <input
                                    type="text"
                                    name="direccion"
                                    required
                                    value={formData.direccion}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>
                            <div className="form-group">
                                <label>Ciudad *</label>
                                <input
                                    type="text"
                                    name="ciudad"
                                    required
                                    value={formData.ciudad}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>
                        </div>
                    </form>
                </>
            )}
            
            {error && <p className="error-message">{error}</p>}
            
            <button
                type="button"
                className="btn-checkout"
                disabled={loading}
                onClick={handleSubmit}
            >
                {loading ? 'PROCESANDO...' : 'CONFIRMAR PEDIDO'}
            </button>


        </div>
    );
}
