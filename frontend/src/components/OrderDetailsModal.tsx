import { useState, useEffect } from 'react';
import type { DocumentData } from 'firebase/firestore';

interface OrderDetailsModalProps {
    // Props can be added here if needed in the future
}

export default function OrderDetailsModal({}: OrderDetailsModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [orderData, setOrderData] = useState<DocumentData | null>(null);

    useEffect(() => {
        const handleOpenModal = (e: CustomEvent) => {
            const { order } = e.detail;
            if (order) {
                setOrderData(order);
                setIsOpen(true);
            }
        };

        window.addEventListener('open-order-details-modal', handleOpenModal as EventListener);

        return () => {
            window.removeEventListener('open-order-details-modal', handleOpenModal as EventListener);
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        setOrderData(null);
    };

    if (!isOpen || !orderData) return null;

    const orderDate = orderData.fecha.toDate().toLocaleDateString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Detalles del Pedido</h2>
                <p><strong>ID del Pedido:</strong> #{orderData.id.substring(0, 7)}</p>
                <p><strong>Fecha:</strong> {orderDate}</p>
                <p><strong>Estado:</strong> <span className={`status status-${orderData.estado?.toLowerCase()}`}>{orderData.estado}</span></p>
                
                <div className="order-items-list">
                    <h3>Productos</h3>
                    {orderData.productos?.map((item: any, index: number) => (
                        <div key={index} className="product-item">
                            <span>{item.nombre} (x{item.cantidad})</span>
                            <span>${(item.precio * item.cantidad).toLocaleString('es-CO')}</span>
                        </div>
                    ))}
                </div>

                <div className="order-summary">
                    <h3>Resumen</h3>
                    <div className="summary-item">
                        <span>Subtotal:</span>
                        <span>${orderData.subtotal.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="summary-item">
                        <span>Envío:</span>
                        <span>${orderData.envio.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="summary-item total">
                        <span>Total:</span>
                        <span>${orderData.total.toLocaleString('es-CO')}</span>
                    </div>
                </div>

                <div className="modal-actions">
                    <button type="button" onClick={handleClose} className="btn btn-secondary">Cerrar</button>
                </div>
            </div>
            <style>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                .modal-content {
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    width: 90%;
                    max-width: 600px;
                    max-height: 90vh;
                    overflow-y: auto;
                }
                .modal-content h2 {
                    margin-top: 0;
                    margin-bottom: 20px;
                }
                .modal-actions {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 30px;
                }
                .order-items-list, .order-summary {
                    margin-top: 20px;
                }
                .order-items-list h3, .order-summary h3 {
                    margin-bottom: 10px;
                    font-size: 1rem;
                    color: #555;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 5px;
                }
                .product-item, .summary-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 0;
                }
                .summary-item.total {
                    font-weight: bold;
                    font-size: 1.1rem;
                    padding-top: 10px;
                    border-top: 1px solid #ccc;
                }
                .status {
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-weight: 500;
                    color: white;
                }
                .status-entregado { background-color: #28a745; }
                .status-enviado { background-color: #17a2b8; }
                .status-pendiente { background-color: #ffc107; color: #333; }
                .status-cancelado { background-color: #dc3545; }
            `}</style>
        </div>
    );
}