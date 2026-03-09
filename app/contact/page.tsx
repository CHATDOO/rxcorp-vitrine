import type { Metadata } from "next";
import { Mail, MessageSquare, Phone, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact — rxcorp",
    description: "Contactez l'équipe rxcorp pour toute question sur nos offres d'hébergement.",
};

export default function ContactPage() {
    return (
        <section style={{
            background: "var(--bg-void)",
            minHeight: "100vh",
            paddingTop: "140px",
            paddingBottom: "100px",
            position: "relative",
            overflow: "hidden",
        }}>
            <div className="grid-bg" />
            <div className="orb orb-red" style={{ width: "600px", height: "600px", top: "100px", right: "-200px", opacity: 0.2 }} />

            <div className="container-xl" style={{ position: "relative", zIndex: 1, maxWidth: "1000px" }}>
                <div style={{ textAlign: "center", marginBottom: "60px" }}>
                    <div className="badge badge-red" style={{ marginBottom: "16px" }}>Support 24/7</div>
                    <h1 className="heading-lg" style={{ marginBottom: "16px" }}>
                        Comment pouvons-nous{" "}
                        <span className="gradient-text">vous aider ?</span>
                    </h1>
                    <p style={{ color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
                        Notre équipe est disponible 24h/24, 7j/7. Choisissez le canal qui vous convient le mieux.
                    </p>
                </div>

                {/* Channels */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "60px" }}>
                    {[
                        { icon: MessageSquare, label: "Discord", desc: "Rejoignez notre serveur Discord pour une aide en temps réel.", cta: "Rejoindre Discord", href: "https://discord.gg/rxcorp", color: "#5865F2" },
                        { icon: Mail, label: "Email", desc: "Envoyez-nous un email, réponse sous 4h ouvrées.", cta: "support@rxcorp.fr", href: "mailto:support@rxcorp.fr", color: "var(--red-bright)" },
                        { icon: Phone, label: "Ticket", desc: "Ouvrez un ticket dans votre espace client.", cta: "Ouvrir un ticket", href: "https://clients.rxcorp.fr", color: "#00E676" },
                    ].map(({ icon: Icon, label, desc, cta, href, color }) => (
                        <div key={label} className="glass" style={{ borderRadius: "20px", padding: "32px", textAlign: "center" }}>
                            <div style={{
                                width: "56px", height: "56px",
                                background: `${color}18`,
                                border: `1px solid ${color}40`,
                                borderRadius: "14px",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                margin: "0 auto 16px",
                            }}>
                                <Icon size={24} color={color} />
                            </div>
                            <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "8px" }}>{label}</h3>
                            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "20px" }}>{desc}</p>
                            <a
                                href={href}
                                target="_blank" rel="noopener noreferrer"
                                className="btn-ghost"
                                style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem" }}
                                id={`contact-${label.toLowerCase()}-btn`}
                            >
                                {cta}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Info boxes */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                    {[
                        { icon: Clock, label: "Horaires", value: "24h/24, 7j/7" },
                        { icon: MapPin, label: "Localisation", value: "Paris, France 🇫🇷" },
                        { icon: Mail, label: "Email", value: "support@rxcorp.fr" },
                    ].map(({ icon: Icon, label, value }) => (
                        <div key={label} style={{
                            background: "var(--bg-card)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            padding: "20px",
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                        }}>
                            <div style={{
                                width: "40px", height: "40px",
                                background: "rgba(232,0,45,0.1)",
                                borderRadius: "10px",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <Icon size={18} color="var(--red-bright)" />
                            </div>
                            <div>
                                <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginBottom: "2px" }}>{label}</div>
                                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
