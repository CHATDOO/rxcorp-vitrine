"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";

const NAV_ITEMS = [
    { href: "/serveurs-jeux", label: "Serveurs de Jeux" },
    { href: "/faq", label: "FAQ" },
    { href: "/statut", label: "Statut" },
    { href: "/a-propos", label: "À propos" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                transition: "all 0.3s ease",
                background: scrolled
                    ? "rgba(2, 2, 5, 0.92)"
                    : "transparent",
                backdropFilter: scrolled ? "blur(20px)" : "none",
                borderBottom: scrolled
                    ? "1px solid rgba(232,0,45,0.15)"
                    : "1px solid transparent",
            }}
        >
            <div className="container-xl" style={{ display: "flex", alignItems: "center", height: "70px" }}>
                {/* Logo */}
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                    <div style={{
                        width: "36px", height: "36px",
                        background: "var(--red-primary)",
                        borderRadius: "8px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 0 20px rgba(232,0,45,0.5)",
                    }}>
                        <Zap size={20} color="#fff" fill="#fff" />
                    </div>
                    <span style={{
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 800,
                        fontSize: "1.4rem",
                        color: "var(--text-primary)",
                        letterSpacing: "-0.03em",
                    }}>
                        rx<span style={{ color: "var(--red-primary)" }}>corp</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "40px", flex: 1 }}
                    className="hidden-mobile">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href!}
                            style={{
                                padding: "8px 14px",
                                color: "var(--text-secondary)",
                                textDecoration: "none",
                                fontSize: "0.9rem", fontWeight: 500,
                                borderRadius: "8px",
                                transition: "color 0.2s, background 0.2s",
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "12px" }} className="hidden-mobile">
                    <Link
                        href="/serveurs-jeux"
                        style={{
                            padding: "8px 16px", fontSize: "0.85rem", fontWeight: 700,
                            background: "linear-gradient(135deg, #111, #222)",
                            border: "1px solid rgba(232,0,45,0.4)",
                            color: "#fff", borderRadius: "8px", textDecoration: "none",
                            display: "flex", alignItems: "center", gap: "6px",
                            boxShadow: "0 0 15px rgba(232,0,45,0.2)",
                        }}
                        className="pulse-border"
                    >
                        🎁 1 Semaine Gratuite
                    </Link>

                    <a
                        href="https://clients.rxcorp.fr/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost"
                        style={{ padding: "8px 20px", fontSize: "0.88rem" }}
                    >
                        Connexion
                    </a>
                    <a
                        href="https://clients.rxcorp.fr/register"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ padding: "8px 20px", fontSize: "0.88rem" }}
                    >
                        Commencer →
                    </a>
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    style={{
                        marginLeft: "auto",
                        background: "none", border: "none",
                        color: "var(--text-primary)", cursor: "pointer",
                        display: "none",
                    }}
                    id="mobile-menu-btn"
                    aria-label="Menu mobile"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div style={{
                    background: "rgba(5,5,10,0.98)",
                    backdropFilter: "blur(20px)",
                    borderTop: "1px solid rgba(232,0,45,0.15)",
                    padding: "16px 24px 24px",
                }}>
                    {NAV_ITEMS.map((item: any) => (
                        <Link
                            key={item.href ?? item.label}
                            href={item.href ?? "#"}
                            onClick={() => setOpen(false)}
                            style={{
                                display: "block",
                                padding: "14px 0",
                                color: "var(--text-primary)",
                                textDecoration: "none",
                                fontWeight: 500,
                                borderBottom: "1px solid var(--border)",
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
                        <a href="https://clients.rxcorp.fr/login" className="btn-ghost" style={{ flex: 1, justifyContent: "center" }}>
                            Connexion
                        </a>
                        <a href="https://clients.rxcorp.fr/register" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                            Commencer
                        </a>
                    </div>
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
        </header>
    );
}
