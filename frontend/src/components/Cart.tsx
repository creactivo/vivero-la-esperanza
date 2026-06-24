import { useState, useEffect } from 'react';
import { Trash2, ShoppingCart } from 'lucide-react';

interface CartItem {
    productoId: number;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
    slug: string;
    imagenUrl?: string;
}

export default function Cart() {
    console.log('Componente Cart.tsx renderizando...');
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        // This code now runs only in the browser, after the component has mounted.
        const savedCart = localStorage.getItem('cart');
        setCart(savedCart ? JSON.parse(savedCart) : []);

        const handleCartUpdate = () => {
            const updatedCart = localStorage.getItem('cart');
            setCart(updatedCart ? JSON.parse(updatedCart) : []);
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, []);

    const updateQuantity = (productoId: number, newQuantity: number) => {
        const updatedCart = cart.map(item =>
            item.productoId === productoId
                ? { ...item, cantidad: Math.max(1, newQuantity) }
                : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const removeItem = (productoId: number) => {
        const updatedCart = cart.filter(item => item.productoId !== productoId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };



    const total = cart.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);

    if (cart.length === 0) {
        return (
            <div className="empty-cart-wrapper">
                <div className="empty-cart-container">
                    <div className="icon-container">
                        <ShoppingCart size={48} color="white" />
                    </div>
                    <h2 className="empty-cart-title">TU CARRITO ESTÁ VACÍO</h2>
                    <p className="empty-cart-subtitle">
                        Explora nuestro catálogo y encuentra las plantas perfectas para tu espacio.
                    </p>
                    <div className="empty-cart-actions">
                        <a href="/catalogo" className="btn-explore">
                            Explorar Catálogo
                        </a>
                        <a href="/" className="btn-home">
                            Volver al inicio
                        </a>
                    </div>
                </div>
                <style>{`
                    .empty-cart-wrapper {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 60vh;
                        padding: var(--space-8);
                    }
                    .empty-cart-container {
                        background: #f8fdf8;
                        border: 1px solid rgba(58, 90, 64, 0.1);
                        border-radius: var(--radius-xl);
                        padding: var(--space-12);
                        max-width: 500px;
                        width: 100%;
                        display: grid;
                        justify-items: center;
                        gap: var(--space-8);
                        text-align: center;
                    }
                    .icon-container {
                        background-color: #34D399;
                        border-radius: var(--radius-lg);
                        padding: var(--space-6);
                        display: inline-flex;
                    }
                    .empty-cart-title {
                        font-size: 1.25rem;
                        font-weight: 700;
                        color: var(--color-primary-dark);
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                    }
                    .empty-cart-subtitle {
                        color: var(--color-text-light);
                        max-width: 350px;
                        line-height: 1.6;
                    }
                    .empty-cart-actions {
                        display: flex;
                        flex-direction: column;
                        gap: var(--space-4);
                        width: 100%;
                        max-width: 300px;
                    }
                    .btn-explore {
                            background: var(--color-primary);
                            color: white;
                            padding: var(--space-3) var(--space-6);
                            border-radius: var(--radius-md);
                            text-decoration: none;
                            font-weight: 600;
                            transition: background 0.2s;
                        }
                    .btn-explore:hover {
                        background: var(--color-primary-dark);
                    }
                    .btn-home {
                        color: var(--color-primary);
                        text-decoration: none;
                        font-weight: 500;
                        padding: var(--space-2);
                        transition: background 0.2s;
                    }
                    .btn-home:hover {
                        background: rgba(58, 90, 64, 0.08);
                        border-radius: var(--radius-md);
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-items">
                {cart.map((item) => (
                    <div key={item.productoId} className="cart-item">
                        {item.imagenUrl && (
                            <div className="item-image">
                                <img src={item.imagenUrl} alt={item.nombre} />
                            </div>
                        )}
                        <div className="item-info">
                            <h3>
                                <a href={`/producto/${item.slug}`}>{item.nombre}</a>
                            </h3>
                            <p className="item-price">Precio unidad: ${item.precioUnitario.toLocaleString('es-CO')}</p>
                        </div>

                        <div className="item-controls">
                            <div className="quantity-controls">
                                <button
                                    onClick={() => updateQuantity(item.productoId, item.cantidad - 1)}
                                    className="qty-btn qty-btn-minus"
                                    aria-label="Disminuir cantidad"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={item.cantidad}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        if (!isNaN(value) && value >= 1) {
                                            updateQuantity(item.productoId, value);
                                        }
                                    }}
                                    onBlur={(e) => {
                                        const value = parseInt(e.target.value);
                                        if (isNaN(value) || value < 1) {
                                            updateQuantity(item.productoId, 1);
                                        }
                                    }}
                                    className="qty-input"
                                    min="1"
                                />
                                <button
                                    onClick={() => updateQuantity(item.productoId, item.cantidad + 1)}
                                    className="qty-btn qty-btn-plus"
                                    aria-label="Aumentar cantidad"
                                >
                                    +
                                </button>
                            </div>

                            <div className="item-subtotal">
                                ${(item.cantidad * item.precioUnitario).toLocaleString('es-CO')}
                            </div>

                            <button
                                onClick={() => removeItem(item.productoId)}
                                className="btn-remove"
                                aria-label="Eliminar producto"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <h2>Resumen del pedido</h2>

                <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                <div className="summary-row total">
                    <span>Total:</span>
                    <span>${total.toLocaleString('es-CO')}</span>
                </div>

                <a href="/checkout" className="btn btn-checkout-primary btn-large btn-full">
                    PROCEDER AL CHECKOUT
                </a>
            </div>


        </div>
    );
}