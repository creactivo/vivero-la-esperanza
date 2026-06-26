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
        
        // Listener para actualizaciones en la misma página
        window.addEventListener('cartUpdated', updateCount);
        
        // Listener para resincronizar después de la navegación de Astro
        document.addEventListener('astro:page-load', updateCount);

        // Limpieza de ambos listeners al desmontar el componente
        return () => {
            window.removeEventListener('cartUpdated', updateCount);
            document.removeEventListener('astro:page-load', updateCount);
        };
    }, []);

    if (count === 0) {
        return null;
    }

    return (
        <span className="cart-count">{count}</span>
    );
}