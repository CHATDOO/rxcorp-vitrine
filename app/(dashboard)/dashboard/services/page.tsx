"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { formatBytes } from "@/lib/daemon";

type ServiceDaemon = {
  state: string;
  cpu: number;
  memoryBytes: number;
  diskBytes: number;
  suspended: boolean;
} | null;

type Service = {
  id: string;
  name: string;
  game: string;
  status: string;
  wingsUuid: string;
  daemon: ServiceDaemon;
};

type PowerAction = "start" | "stop" | "restart" | "kill";

function StateBadge({ state }: { state: string }) {
  const styles: Record<string, { color: string; bg: string; border: string }> = {
    running: { color: "#00E676", bg: "rgba(0,230,118,0.10)", border: "rgba(0,230,118,0.3)" },
    starting: { color: "#FFD700", bg: "rgba(255,215,0,0.10)", border: "rgba(255,215,0,0.3)" },
    stopping: { color: "#FFD700", bg: "rgba(255,215,0,0.10)", border: "rgba(255,215,0,0.3)" },
    offline: { color: "var(--text-muted)", bg: "rgba(160,160,176,0.08)", border: "rgba(160,160,176,0.15)" },
  };
  const s = styles[state] ?? styles.offline;
  const labels: Record<string, string> = { running: "En ligne", starting: "Démarrage", stopping: "Arrêt", offline: "Hors ligne" };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 12px",
        borderRadius: "99px",
        fontSize: "0.72rem",
        fontWeight: 700,
        color: s.color,
        background: s.bg,
        border: `1px solid ${s.border}`,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
      {labels[state] ?? state}
    </span>
  );
}

function GameIcon({ game }: { game: string }) {
  const icons: Record<string, string> = {
    minecraft: "⛏",
    csgo: "🎯",
    rust: "🏗",
    ark: "🦕",
    terraria: "⚔",
    valheim: "🪓",
  };
  return <span>{icons[game] ?? "🎮"}</span>;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  const loadServices = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard/services");
      const json = await res.json() as { data?: { services?: Service[] } };
      setServices(json.data?.services ?? []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadServices();
    const interval = setInterval(loadServices, 10000);
    return () => clearInterval(interval);
  }, [loadServices]);

  async function handlePowerAction(serviceId: string, action: PowerAction) {
    setActionLoading((prev) => ({ ...prev, [serviceId]: action }));
    setFeedback((prev) => ({ ...prev, [serviceId]: "" }));

    try {
      const res = await fetch(`/api/dashboard/services/${serviceId}/power`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const json = await res.json() as { data?: unknown; error?: string };

      if (!res.ok) {
        setFeedback((prev) => ({ ...prev, [serviceId]: json.error ?? "Erreur" }));
      } else {
        setFeedback((prev) => ({ ...prev, [serviceId]: `Action "${action}" envoyée` }));
        setTimeout(() => {
          setFeedback((prev) => ({ ...prev, [serviceId]: "" }));
          void loadServices();
        }, 2000);
      }
    } catch {
      setFeedback((prev) => ({ ...prev, [serviceId]: "Erreur réseau" }));
    } finally {
      setActionLoading((prev) => {
        const next = { ...prev };
        delete next[serviceId];
        return next;
      });
    }
  }

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className="skeleton" style={{ height: "40px", width: "200px", borderRadius: "8px" }} />
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton" style={{ height: "160px", borderRadius: "16px" }} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1000px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.4rem, 4vw, 1.9rem)",
            letterSpacing: "-0.025em",
            color: "var(--text-primary)",
            marginBottom: "8px",
          }}
        >
          Mes services
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          {services.length} service{services.length !== 1 ? "s" : ""} · Actualisation auto toutes les 10s
        </p>
      </div>

      {services.length === 0 ? (
        <div className="glass" style={{ borderRadius: "16px", padding: "60px 32px", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📦</div>
          <p style={{ color: "var(--text-secondary)", fontWeight: 500, marginBottom: "8px" }}>
            Aucun service actif
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Contactez notre équipe pour commander un serveur
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {services.map((service) => {
            const isLoading = !!actionLoading[service.id];
            const isRunning = service.daemon?.state === "running";
            const isOffline = !service.daemon || service.daemon.state === "offline";

            return (
              <div
                key={service.id}
                className="glass"
                style={{ borderRadius: "16px", padding: "24px", transition: "border-color 0.2s" }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "16px",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "var(--bg-subtle)",
                        border: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                        flexShrink: 0,
                      }}
                    >
                      <GameIcon game={service.game} />
                    </div>
                    <div>
                      <Link
                        href={`/dashboard/services/${service.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <h3
                          style={{
                            fontWeight: 700,
                            fontSize: "1rem",
                            color: "var(--text-primary)",
                            marginBottom: "4px",
                            transition: "color 0.15s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--red-bright)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                        >
                          {service.name}
                        </h3>
                      </Link>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--text-muted)",
                            textTransform: "capitalize",
                          }}
                        >
                          {service.game}
                        </span>
                        <span style={{ color: "var(--border)", fontSize: "0.75rem" }}>·</span>
                        <StateBadge state={service.daemon?.state ?? "offline"} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                {service.daemon && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                      gap: "12px",
                      marginBottom: "20px",
                    }}
                  >
                    {[
                      { label: "CPU", value: `${service.daemon.cpu.toFixed(1)}%` },
                      { label: "RAM", value: formatBytes(service.daemon.memoryBytes) },
                      { label: "Disque", value: formatBytes(service.daemon.diskBytes) },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        style={{
                          background: "var(--bg-subtle)",
                          border: "1px solid var(--border)",
                          borderRadius: "10px",
                          padding: "12px 14px",
                        }}
                      >
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                          {label}
                        </div>
                        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => void handlePowerAction(service.id, "start")}
                    disabled={isLoading || isRunning || service.status !== "ACTIVE"}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid rgba(0,230,118,0.3)",
                      background: "rgba(0,230,118,0.08)",
                      color: "#00E676",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: isLoading || isRunning ? "not-allowed" : "pointer",
                      opacity: isLoading || isRunning ? 0.4 : 1,
                      transition: "all 0.15s",
                    }}
                  >
                    ▶ Démarrer
                  </button>
                  <button
                    onClick={() => void handlePowerAction(service.id, "stop")}
                    disabled={isLoading || isOffline || service.status !== "ACTIVE"}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,23,68,0.3)",
                      background: "rgba(255,23,68,0.08)",
                      color: "var(--red-bright)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: isLoading || isOffline ? "not-allowed" : "pointer",
                      opacity: isLoading || isOffline ? 0.4 : 1,
                      transition: "all 0.15s",
                    }}
                  >
                    ■ Arrêter
                  </button>
                  <button
                    onClick={() => void handlePowerAction(service.id, "restart")}
                    disabled={isLoading || isOffline || service.status !== "ACTIVE"}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,215,0,0.3)",
                      background: "rgba(255,215,0,0.08)",
                      color: "#FFD700",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: isLoading || isOffline ? "not-allowed" : "pointer",
                      opacity: isLoading || isOffline ? 0.4 : 1,
                      transition: "all 0.15s",
                    }}
                  >
                    ↺ Redémarrer
                  </button>
                  <Link
                    href={`/dashboard/services/${service.id}`}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      background: "transparent",
                      color: "var(--text-secondary)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    Détails →
                  </Link>

                  {feedback[service.id] && (
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: feedback[service.id].includes("Erreur")
                          ? "var(--red-bright)"
                          : "#00E676",
                        marginLeft: "4px",
                      }}
                    >
                      {feedback[service.id]}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
