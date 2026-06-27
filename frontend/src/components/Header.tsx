import React, { useState, useEffect } from "react";
import CartCounter from "./CartCounter";
import AuthStatus from "./AuthStatus";
import { ShoppingBag, Menu, X } from "lucide-react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handlePageLoad = () => {
            setIsScrolled(window.scrollY > 50);
            setIsMobileNavOpen(false);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        document.addEventListener("astro:page-load", handlePageLoad);
        document.addEventListener("DOMContentLoaded", handlePageLoad);
        
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("astro:page-load", handlePageLoad);
            document.removeEventListener("DOMContentLoaded", handlePageLoad);
        };
    }, []);

    const toggleMobileNav = () => {
        setIsMobileNavOpen(prev => !prev);
    };

    const closeMobileNav = () => {
        setIsMobileNavOpen(false);
    };

    const handleOutsideClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeMobileNav();
        }
    };

    return (
        <header className={`site-header ${isScrolled ? "scrolled" : ""} ${isMobileNavOpen ? "nav-open" : ""}`}>
            <div className="header-top container">
                <button 
                    className="mobile-nav-toggle" 
                    aria-label={isMobileNavOpen ? "Cerrar menú" : "Abrir menú"}
                    onClick={toggleMobileNav}
                >
                    {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <nav className="nav-left">
                    <a href="/" onClick={closeMobileNav}>Inicio</a>
                    <a href="/nuestro-vivero" onClick={closeMobileNav}>Nuestro Vivero</a>
                    <a href="/proyectos" onClick={closeMobileNav}>Proyectos</a>
                </nav>

                <div className="logo-container">
                    <a href="/" className="logo-text" onClick={closeMobileNav}>
                        <img
                            src="../images/Logo-esperanza.png"
                            alt="Logo Esperanza Vivero"
                            className="logo-image"
                            width={120}
                            height={57}
                        />
                    </a>
                </div>

                <div className="nav-right">
                    <AuthStatus />
                    <a
                        href="/carrito"
                        className="icon-link cart-icon-link"
                        aria-label="Carrito"
                        onClick={closeMobileNav}
                    >
                        <ShoppingBag size={22} strokeWidth={1.5} />
                        <CartCounter />
                    </a>
                </div>
            </div>

            {/* Mobile Nav Sidebar */}
            <div className={`mobile-nav-overlay ${isMobileNavOpen ? "open" : ""}`} onClick={handleOutsideClick}>
                <div className="mobile-nav-sidebar">
                    <div className="mobile-nav-header">
                        <a href="/" className="mobile-nav-logo" onClick={closeMobileNav}>
                            <img
                                src="../images/Logo-esperanza.png"
                                alt="Logo Esperanza Vivero"
                                width={100}
                                height={48}
                            />
                        </a>
                        <button 
                            className="mobile-nav-close" 
                            aria-label="Cerrar menú"
                            onClick={closeMobileNav}
                        >
                            <X size={28} />
                        </button>
                    </div>
                    <nav className="mobile-nav-links">
                        <a href="/" onClick={closeMobileNav}>Inicio</a>
                        <a href="/nuestro-vivero" onClick={closeMobileNav}>Nuestro Vivero</a>
                        <a href="/proyectos" onClick={closeMobileNav}>Proyectos</a>
                    </nav>
                    <div className="mobile-nav-footer">
                        <p>© 2025 Vivero La Esperanza</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
