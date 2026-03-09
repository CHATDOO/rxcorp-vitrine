"use client";
import Link from "next/link";

import { Zap, Twitter, Github, MessageSquare, Shield, Server, ExternalLink } from "lucide-react";

const FOOTER_LINKS = {
    Hébergement: [
        { href: "/serveurs-jeux", label: "Serveurs de Jeux" },
    ],
    Entreprise: [
        { href: "/a-propos", label: "À propos" },
        { href: "/statut", label: "Statut du réseau" },
        { href: "/contact", label: "Contact" },
        { href: "https://clients.rxcorp.fr", label: "Espace client", external: true },
    ],
    Légal: [
        { href: "/mentions-legales", label: "Mentions légales" },
        { href: "/cgv", label: "CGV" },
        { href: "/confidentialite", label: "Politique de confidentialité" },
    ],
};

const SOCIALS = [
    { href: "https://discord.gg/rxcorp", icon: MessageSquare, label: "Discord" },
    { href: "https://twitter.com/rxcorp", icon: Twitter, label: "Twitter" },
    { href: "https://github.com/rxcorp", icon: Github, label: "GitHub" },
];

export default function Footer() {
    return (
        <footer style={{ background: "var(--bg-dark)", borderTop: "1px solid var(--border)" }}>
            {/* Top CTA band */}
            <div style={{
                background: "linear-gradient(135deg, rgba(232,0,45,0.12), rgba(139,0,0,0.08))",
                borderBottom: "1px solid rgba(232,0,45,0.1)",
                padding: "60px 24px",
                textAlign: "center",
            }}>
                <div className="container-xl" style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <div className="badge badge-red" style={{ marginBottom: "16px" }}>
                        🚀 Déploiement en 60 secondes
                    </div>
                    <h2 className="heading-md" style={{ marginBottom: "16px" }}>
                        Prêt à déployer votre infrastructure ?
                    </h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "28px" }}>
                        Rejoignez plus de 1 800 clients qui font confiance à rxcorp pour leurs serveurs.
                    </p>
                    <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="https://clients.rxcorp.fr/auth/register" className="btn-primary" target="_blank" rel="noopener noreferrer">
                            Commencer gratuitement →
                        </a>
                        <Link href="/contact" className="btn-ghost">Nous contacter</Link>
                    </div>
                </div>
            </div>

            {/* Main footer */}
            <div className="container-xl" style={{ padding: "60px 24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px" }}>
                    {/* Brand */}
                    <div>
                        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "20px" }}>
                            <div style={{
                                width: "36px", height: "36px",
                                background: "var(--red-primary)",
                                borderRadius: "8px",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <Zap size={20} color="#fff" fill="#fff" />
                            </div>
                            <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.03em" }}>
                                rx<span style={{ color: "var(--red-primary)" }}>corp</span>
                            </span>
                        </Link>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.7, maxWidth: "280px" }}>
                            Hébergement haute performance avec Anti-DDoS, NVMe SSD et déploiement instantané. Disponible 24/7.
                        </p>

                        {/* Trust badges */}
                        <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                                <Shield size={13} color="var(--red-bright)" /> Anti-DDoS inclus
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                                <Server size={13} color="var(--red-bright)" /> NVMe SSD
                            </div>
                        </div>

                        {/* Socials */}
                        <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
                            {SOCIALS.map(({ href, icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    style={{
                                        width: "36px", height: "36px",
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid var(--border)",
                                        borderRadius: "8px",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "var(--text-secondary)",
                                        transition: "border-color 0.2s, background 0.2s, color 0.2s",
                                        textDecoration: "none",
                                    }}
                                    onMouseEnter={e => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.borderColor = "var(--red-primary)";
                                        el.style.background = "rgba(232,0,45,0.1)";
                                        el.style.color = "var(--red-bright)";
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.borderColor = "var(--border)";
                                        el.style.background = "rgba(255,255,255,0.05)";
                                        el.style.color = "var(--text-secondary)";
                                    }}
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                        <div key={category}>
                            <h3 style={{ fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "16px" }}>
                                {category}
                            </h3>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                                {links.map(link => (
                                    <li key={link.href}>
                                        {"external" in link && link.external ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "4px", transition: "color 0.2s" }}
                                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"}
                                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"}
                                            >
                                                {link.label} <ExternalLink size={10} />
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.88rem", transition: "color 0.2s" }}
                                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"}
                                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"}
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="divider-red" style={{ margin: "40px 0 24px" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                        © {new Date().getFullYear()} rxcorp. Tous droits réservés. Hébergé en France 🇫🇷
                    </p>
                    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00E676", animation: "pulse 2s infinite" }} />
                        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Tous les systèmes opérationnels</span>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          footer > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          footer > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </footer>
    );
}
