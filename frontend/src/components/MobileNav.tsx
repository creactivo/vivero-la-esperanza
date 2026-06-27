import React, { useState, useEffect } from 'react';
import { X, Menu } from 'lucide-react';

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => setIsOpen(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <>
            <button
                className="mobile-nav-toggle"
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && <div className="mobile-nav-overlay" onClick={() => setIsOpen(false)} />}

            <nav className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`}>
                <div className="mobile-nav-header">
                    <button
                        className="mobile-nav-close"
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={28} />
                    </button>
                </div>
                <div className="mobile-nav-links">
                    <a href="/" onClick={handleLinkClick}>Inicio</a>
                    <a href="/nuestro-vivero" onClick={handleLinkClick}>Nuestro Vivero</a>
                    <a href="/proyectos" onClick={handleLinkClick}>Proyectos</a>
                </div>
            </nav>
        </>
    );
}
