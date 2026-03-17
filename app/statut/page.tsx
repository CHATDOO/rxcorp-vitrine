import type { Metadata } from "next";
import { getStatusData } from "@/lib/uptime";
import { getDaemonHealth } from "@/lib/daemon";

export const metadata: Metadata = {
    title: "Statut du réseau — rxcorp",
    description: "Statut en temps réel de l'infrastructure rxcorp : serveurs, réseau, panel.",
};

const STATUS_META = {
    operational: { label: "Opérationnel", color: "#00E676", bg: "rgba(0,230,118,0.1)", border: "rgba(0,230,118,0.3)" },
    degraded: { label: "Dégradé", color: "#FFD700", bg: "rgba(255,215,0,0.1)", border: "rgba(255,215,0,0.3)" },
    outage: { label: "Panne", color: "#FF1744", bg: "rgba(255,23,68,0.1)", border: "rgba(255,23,68,0.3)" },
};

export default async function StatutPage() {
    const [data, daemonHealth] = await Promise.all([
        getStatusData(),
        getDaemonHealth(),
    ]);

    // Map Uptime Kuma data to our format
    const monitors = data?.publicGroupList[0]?.monitorList.map(m => {
        const heartbeats = data.heartbeatList[m.id] || [];
        const latest = heartbeats[heartbeats.length - 1];
        
        // Uptime Kuma statuses: 0 = Down, 1 = Up, 2 = Pending, 3 = Maintenance
        let status: "operational" | "degraded" | "outage" = "operational";
        if (latest?.status === 0) status = "outage";
        if (latest?.status === 3) status = "degraded";

        return {
            name: m.name,
            status,
            latency: latest?.ping ? `${latest.ping}ms` : "N/A"
        };
    }) || [];

    const allOk = monitors.length > 0 && monitors.every(s => s.status === "operational");
    const avgUptime = data?.uptimeList ? Object.values(data.uptimeList).reduce((a, b) => a + b, 0) / Object.values(data.uptimeList).length : 1;

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

                {/* Daemon RXCORP */}
                <h2 className="heading-md" style={{ marginBottom: "16px", fontSize: "1.4rem" }}>Daemon de jeu</h2>
                <div className="glass" style={{
                    borderRadius: "12px", padding: "20px 24px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: "16px", marginBottom: "36px",
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                            width: "8px", height: "8px", borderRadius: "50%",
                            background: daemonHealth ? "#00E676" : "#FF1744",
                            boxShadow: `0 0 8px ${daemonHealth ? "#00E676" : "#FF1744"}`,
                        }} />
                        <span style={{ fontWeight: 600 }}>RXCORP Daemon</span>
                        {daemonHealth && (
                            <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>
                                v{daemonHealth.version}
                            </span>
                        )}
                    </div>
                    <div style={{
                        padding: "4px 12px",
                        background: daemonHealth ? "rgba(0,230,118,0.1)" : "rgba(255,23,68,0.1)",
                        border: `1px solid ${daemonHealth ? "rgba(0,230,118,0.3)" : "rgba(255,23,68,0.3)"}`,
                        borderRadius: "99px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: daemonHealth ? "#00E676" : "#FF1744",
                    }}>
                        {daemonHealth ? "Opérationnel" : "Hors ligne"}
                    </div>
                </div>

                {/* Services */}
                <h2 className="heading-md" style={{ marginBottom: "24px", fontSize: "1.4rem" }}>Services</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {monitors.map(({ name, status, latency }) => {
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
                    <h2 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "20px" }}>Historique 24 heures</h2>
                    <div style={{ display: "flex", gap: "3px", height: "32px", alignItems: "center" }}>
                        {Array.from({ length: 48 }).map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    flex: 1, height: "100%",
                                    background: "#00E676",
                                    borderRadius: "3px",
                                    opacity: 0.8,
                                }}
                            />
                        ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Il y a 24 heures</span>
                        <span style={{ color: "#00E676", fontSize: "0.75rem", fontWeight: 700 }}>{(avgUptime * 100).toFixed(2)}% uptime</span>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Aujourd&apos;hui</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
