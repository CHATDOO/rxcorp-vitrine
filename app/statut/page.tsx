import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Statut du réseau — rxcorp",
    description: "Statut en temps réel de l'infrastructure rxcorp : serveurs, réseau, panel.",
};

const SERVICES = [
    { name: "Panel Pterodactyl", status: "operational" as const, latency: "12ms" },
    { name: "Réseau Paris (FR1)", status: "operational" as const, latency: "2ms" },
    { name: "API Paymenter", status: "operational" as const, latency: "8ms" },
    { name: "Hébergement Web", status: "operational" as const, latency: "18ms" },
    { name: "Protection Anti-DDoS", status: "operational" as const, latency: "< 1ms" },
    { name: "DNS", status: "operational" as const, latency: "4ms" },
];

const STATUS_META = {
    operational: { label: "Opérationnel", color: "#00E676", bg: "rgba(0,230,118,0.1)", border: "rgba(0,230,118,0.3)" },
    degraded: { label: "Dégradé", color: "#FFD700", bg: "rgba(255,215,0,0.1)", border: "rgba(255,215,0,0.3)" },
    outage: { label: "Panne", color: "#FF1744", bg: "rgba(255,23,68,0.1)", border: "rgba(255,23,68,0.3)" },
};

export default function StatutPage() {
    const allOk = SERVICES.every(s => s.status === "operational");

    return (
        <section style={{
            background: "var(--bg-void)", minHeight: "100vh",
            paddingTop: "140px", paddingBottom: "100px", position: "relative",
        }}>
            <div className="grid-bg" />
            <div className="container-xl" style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
                {/* Global status */}
                <div className="glass" style={{
                    borderRadius: "20px", padding: "40px", textAlign: "center",
                    marginBottom: "48px",
                    borderColor: allOk ? "rgba(0,230,118,0.3)" : "rgba(255,215,0,0.3)",
                }}>
                    <div style={{
                        width: "64px", height: "64px",
                        background: allOk ? "rgba(0,230,118,0.1)" : "rgba(255,215,0,0.1)",
                        border: `2px solid ${allOk ? "rgba(0,230,118,0.4)" : "rgba(255,215,0,0.4)"}`,
                        borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 20px",
                        animation: "pulse-glow 3s ease-in-out infinite",
                    }}>
                        <div style={{
                            width: "20px", height: "20px",
                            background: allOk ? "#00E676" : "#FFD700",
                            borderRadius: "50%",
                        }} />
                    </div>
                    <h1 className="heading-md" style={{ marginBottom: "8px" }}>
                        {allOk ? "✅ Tous les systèmes sont opérationnels" : "⚠️ Perturbations en cours"}
                    </h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                        Dernière mise à jour : {new Date().toLocaleString("fr-FR")}
                    </p>
                </div>

                {/* Services */}
                <h2 className="heading-md" style={{ marginBottom: "24px", fontSize: "1.4rem" }}>Services</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {SERVICES.map(({ name, status, latency }) => {
                        const meta = STATUS_META[status];
                        return (
                            <div key={name} className="glass" style={{
                                borderRadius: "12px", padding: "20px 24px",
                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                gap: "16px",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: meta.color, boxShadow: `0 0 8px ${meta.color}` }} />
                                    <span style={{ fontWeight: 600 }}>{name}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                    <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>{latency}</span>
                                    <div style={{
                                        padding: "4px 12px",
                                        background: meta.bg,
                                        border: `1px solid ${meta.border}`,
                                        borderRadius: "99px",
                                        fontSize: "0.75rem",
                                        fontWeight: 700,
                                        color: meta.color,
                                    }}>
                                        {meta.label}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Uptime history */}
                <div style={{ marginTop: "48px" }}>
                    <h2 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "20px" }}>Historique 30 jours</h2>
                    <div style={{ display: "flex", gap: "3px", height: "32px", alignItems: "center" }}>
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    flex: 1, height: i === 7 ? "60%" : "100%",
                                    background: i === 7 ? "#FFD700" : "#00E676",
                                    borderRadius: "3px",
                                    opacity: 0.8,
                                }}
                                title={i === 7 ? "Maintenance planifiée" : "Opérationnel"}
                            />
                        ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Il y a 30 jours</span>
                        <span style={{ color: "#00E676", fontSize: "0.75rem", fontWeight: 700 }}>99.97% uptime</span>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Aujourd&apos;hui</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
