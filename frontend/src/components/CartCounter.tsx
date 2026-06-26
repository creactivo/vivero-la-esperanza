import { useState, useEffect } from 'react';

interface CartItem {
    productoId: number;
    cantidad: number;
    [key: string]: any;
}

export default function CartCounter() {
    const [count, setCount] = useState(0);

    const updateCount = () => {
        try {
            const savedCart = localStorage.getItem('cart');
            const cart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
            const totalItems = cart.reduce((sum, item) => sum + (item.cantidad || 0), 0);
            setCount(totalItems);
        } catch (e) {
            console.error('Error parsing cart:', e);
            setCount(0);
        }
    };

    useEffect(() => {
        updateCount();
        
        window.addEventListener('cartUpdated', updateCount);
        document.addEventListener('astro:page-load', updateCount);
        window.addEventListener('storage', updateCount);

        return () => {
            window.removeEventListener('cartUpdated', updateCount);
            document.removeEventListener('astro:page-load', updateCount);
            window.removeEventListener('storage', updateCount);
        };
    }, []);

    return (
        <span className="cart-count" style={{ display: count > 0 ? 'flex' : 'none' }}>{count}</span>
    );
}