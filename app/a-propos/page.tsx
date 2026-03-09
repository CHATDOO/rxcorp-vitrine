import type { Metadata } from "next";
import { Shield, Zap, Users2, Award } from "lucide-react";

export const metadata: Metadata = {
    title: "À propos de rxcorp",
    description: "Découvrez l'histoire et les valeurs de rxcorp, votre hébergeur haute performance basé en France.",
};

const VALUES = [
    { icon: Shield, title: "Fiabilité", desc: "99.9% SLA garanti contractuellement. Votre infrastructure ne dort jamais." },
    { icon: Zap, title: "Performance", desc: "NVMe Gen4, réseau 10 Gbps, hardware dernier cri. Zéro compromis." },
    { icon: Users2, title: "Proximité", desc: "Une équipe humaine, disponible 24/7. Pas de chatbot, de vraies personnes." },
    { icon: Award, title: "Transparence", desc: "Prix clairs, sans frais cachés. Vous savez exactement ce que vous payez." },
];

export default function AProposPage() {
    return (
        <>
            {/* Hero */}
            <section style={{
                background: "var(--bg-void)", paddingTop: "140px", paddingBottom: "100px",
                position: "relative", overflow: "hidden",
            }}>
                <div className="grid-bg" />
                <div className="orb orb-red" style={{ width: "700px", height: "700px", top: "-200px", left: "50%", transform: "translateX(-50%)", opacity: 0.15 }} />
                <div className="container-xl" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                    <div className="badge badge-red" style={{ marginBottom: "20px" }}>🇫🇷 Made in France</div>
                    <h1 className="heading-xl" style={{ maxWidth: "800px", margin: "0 auto 24px" }}>
                        Nous croyons en un<br />
                        hébergement <span className="gradient-text">sans compromis</span>
                    </h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: 1.8 }}>
                        rxcorp est né d&apos;une frustration simple : les hébergeurs existants sacrifiaient soit la performance,
                        soit le support, soit la transparence des prix. On a décidé de faire les trois.
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="section" style={{ background: "var(--bg-dark)" }}>
                <div className="container-xl">
                    <h2 className="heading-md" style={{ textAlign: "center", marginBottom: "60px" }}>
                        Nos <span className="gradient-text">valeurs</span>
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                        {VALUES.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="glass" style={{ borderRadius: "20px", padding: "36px" }}>
                                <div style={{
                                    width: "56px", height: "56px",
                                    background: "rgba(232,0,45,0.1)",
                                    border: "1px solid rgba(232,0,45,0.2)",
                                    borderRadius: "14px",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    marginBottom: "20px",
                                }}>
                                    <Icon size={24} color="var(--red-bright)" />
                                </div>
                                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.3rem", marginBottom: "10px" }}>{title}</h3>
                                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Infrastructure */}
            <section className="section" style={{ background: "var(--bg-void)" }}>
                <div className="container-xl" style={{ maxWidth: "800px" }}>
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <h2 className="heading-md" style={{ marginBottom: "16px" }}>Notre infrastructure</h2>
                        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                            Tous nos serveurs sont hébergés dans un datacenter Tier 3 à Paris, France.
                            Connexion directe aux principaux IXP européens pour des latences exceptionnelles.
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                        {[
                            { label: "Datacenter", value: "Paris, FR 🇫🇷" },
                            { label: "Certification", value: "Tier 3+" },
                            { label: "Réseau", value: "10 Gbps" },
                            { label: "Anti-DDoS", value: "1 Tbps" },
                            { label: "Stockage", value: "NVMe Gen4" },
                            { label: "Uptime SLA", value: "99.9%" },
                        ].map(({ label, value }) => (
                            <div key={label} style={{
                                background: "var(--bg-card)",
                                border: "1px solid var(--border)",
                                borderRadius: "12px",
                                padding: "20px",
                                textAlign: "center",
                            }}>
                                <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
                                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "var(--red-bright)" }}>{value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
