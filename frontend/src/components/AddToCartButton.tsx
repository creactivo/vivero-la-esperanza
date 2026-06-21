import { useState } from 'react';

interface AddToCartButtonProps {
    productoId: number;
    nombre: string;
    precioMayorista: number;
    cantidadMinima: number;
    slug: string;
    stock: number;
    imagenUrl?: string;
}

export default function AddToCartButton({
    productoId,
    nombre,
    precioMayorista,
    cantidadMinima,
    slug,
    stock,
    imagenUrl
}: AddToCartButtonProps) {
    const [cantidad, setCantidad] = useState(cantidadMinima);
    const [added, setAdded] = useState(false);

    const isBelowMinimum = cantidad < cantidadMinima;

    const addToCart = () => {
        if (isBelowMinimum) return;

        // Logic to add to cart (using LocalStorage for demo)
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find((item: any) => item.productoId === productoId);

        if (existingItem) {
            existingItem.cantidad += cantidad;
        } else {
            cart.push({
                productoId,
                nombre,
                cantidad,
                precioUnitario: precioMayorista,
                slug,
                imagenUrl: imagenUrl || '',
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated')); // Update cart icon
        
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="add-cart-wrapper">
            <div className="quantity-box">
                <button 
                    className="qty-btn"
                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                >-</button>
                <input 
                    type="number" 
                    value={cantidad} 
                    readOnly
                    className="qty-input"
                />
                <button 
                    className="qty-btn"
                    onClick={() => setCantidad(Math.min(stock, cantidad + 1))}
                >+</button>
            </div>
            
            <div className="subtotal-display">
                Subtotal: ${(cantidad * precioMayorista).toLocaleString('es-CO')}
            </div>

            {isBelowMinimum && (
                <div className="min-qty-warning">
                    La cantidad mínima es de {cantidadMinima} unidades.
                </div>
            )}

            <button 
                onClick={addToCart}
                className={`btn btn-full btn-add ${added ? 'success' : ''}`}
                disabled={added || isBelowMinimum}
            >
                {added ? '¡AGREGADO!' : 'AGREGAR AL CARRITO'} 🛒
            </button>


        </div>
    );
}