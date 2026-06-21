import { useState, useEffect } from 'react';

interface CartItem {
    productoId: number;
    cantidad: number;
}

export default function CartCounter() {
    const [count, setCount] = useState(0);

    const updateCount = () => {
        const savedCart = localStorage.getItem('cart');
        const cart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
        const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
        setCount(totalItems);
    };

    useEffect(() => {
        updateCount();
        window.addEventListener('cartUpdated', updateCount);
        return () => window.removeEventListener('cartUpdated', updateCount);
    }, []);

    if (count === 0) {
        return null;
    }

    return (
        <span className="cart-count">{count}</span>
    );
}
