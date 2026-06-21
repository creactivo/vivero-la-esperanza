import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';

export default function EditProfileModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const handleOpenModal = (e: CustomEvent) => {
            const { user, initialData } = e.detail;
            if (user && initialData) {
                setUser(user);
                setNombre(initialData.nombre || '');
                setApellido(initialData.apellido || '');
                setTelefono(initialData.telefono || '');
                setIsOpen(true);
            }
        };

        window.addEventListener('open-edit-profile-modal', handleOpenModal as EventListener);

        return () => {
            window.removeEventListener('open-edit-profile-modal', handleOpenModal as EventListener);
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setError('No se ha encontrado información del usuario.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const userDocRef = doc(db, 'usuarios', user.uid);
            const updatedData = { nombre, apellido, telefono };
            await updateDoc(userDocRef, updatedData);
            
            window.dispatchEvent(new CustomEvent('profile-updated', { detail: updatedData }));
            handleClose();
        } catch (err) {
            console.error("Error updating profile:", err);
            setError('No se pudo actualizar la información. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Información</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <input id="apellido" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono</label>
                        <input id="telefono" type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="modal-actions">
                        <button type="button" onClick={handleClose} className="btn btn-secondary" disabled={loading}>Cancelar</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
            <style>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
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
                    max-width: 500px;
                }
                .modal-content h2 {
                    margin-top: 0;
                    margin-bottom: 20px;
                }
                .modal-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    margin-top: 20px;
                }
                .form-group {
                  display: flex;
                  flex-direction: column;
                  gap: 6px;
                  margin-bottom: 16px;
                }
                .form-group label {
                  color: var(--color-text);
                  font-weight: 600;
                  font-size: 0.85rem;
                }
                .form-group input {
                  width: 100%;
                  padding: 10px 14px;
                  border: 2px solid #ddd;
                  border-radius: 8px;
                  font-size: 0.95rem;
                  transition: border-color 0.2s;
                }
                .form-group input:focus {
                  outline: none;
                  border-color: var(--color-primary);
                }
                .error-message {
                  background: #fee2e2;
                  color: #991b1b;
                  padding: 12px;
                  border-radius: 8px;
                  text-align: center;
                  font-size: 0.9rem;
                }
            `}</style>
        </div>
    );
}