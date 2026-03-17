"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatBytes } from "@/lib/daemon";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

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

type DashboardData = {
  user: User | null;
  services: Service[];
  loading: boolean;
};

function StateBadge({ state }: { state: string }) {
  const styles: Record<string, { color: string; bg: string; border: string; dot: string }> = {
    running: {
      color: "#00E676",
      bg: "rgba(0,230,118,0.10)",
      border: "rgba(0,230,118,0.3)",
      dot: "#00E676",
    },
    starting: {
      color: "#FFD700",
      bg: "rgba(255,215,0,0.10)",
      border: "rgba(255,215,0,0.3)",
      dot: "#FFD700",
    },
    stopping: {
      color: "#FFD700",
      bg: "rgba(255,215,0,0.10)",
      border: "rgba(255,215,0,0.3)",
      dot: "#FFD700",
    },
    offline: {
      color: "var(--text-muted)",
      bg: "rgba(160,160,176,0.08)",
      border: "rgba(160,160,176,0.15)",
      dot: "var(--text-muted)",
    },
  };
  const s = styles[state] ?? styles.offline;
  const label = state === "running" ? "En ligne" : state === "starting" ? "Démarrage" : state === "stopping" ? "Arrêt" : "Hors ligne";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "3px 10px",
        borderRadius: "99px",
        fontSize: "0.72rem",
        fontWeight: 700,
        color: s.color,
        background: s.bg,
        border: `1px solid ${s.border}`,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
      {label}
    </span>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    user: null,
    services: [],
    loading: true,
  });

  useEffect(() => {
    async function load() {
      try {
        const [meRes, servicesRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/dashboard/services"),
        ]);

        const me = await meRes.json() as { data?: { user?: User } };
        const srv = await servicesRes.json() as { data?: { services?: Service[] } };

        setData({
          user: me.data?.user ?? null,
          services: srv.data?.services ?? [],
          loading: false,
        });
      } catch {
        setData((prev) => ({ ...prev, loading: false }));
      }
    }
    void load();
  }, []);

  const activeServices = data.services.filter((s) => s.status === "ACTIVE");
  const runningServices = data.services.filter(
    (s) => s.daemon?.state === "running"
  );

  if (data.loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div className="skeleton" style={{ height: "48px", width: "300px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton" style={{ height: "120px", borderRadius: "16px" }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1100px" }}>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            letterSpacing: "-0.025em",
            color: "var(--text-primary)",
            marginBottom: "8px",
          }}
        >
          Bonjour, {data.user?.name ?? "—"} 👋
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Bienvenue sur votre panel de gestion RXCORP
        </p>
      </div>

      {/* Stats cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        <div
          className="glass"
          style={{ borderRadius: "16px", padding: "24px", position: "relative", overflow: "hidden" }}
        >
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
            Services actifs
          </div>
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "2.5rem",
              fontWeight: 900,
              color: "var(--red-bright)",
              lineHeight: 1,
              marginBottom: "4px",
            }}
          >
            {activeServices.length}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            sur {data.services.length} total
          </div>
        </div>

        <div
          className="glass"
          style={{ borderRadius: "16px", padding: "24px", position: "relative", overflow: "hidden" }}
        >
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
            Serveurs en ligne
          </div>
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "2.5rem",
              fontWeight: 900,
              color: "#00E676",
              lineHeight: 1,
              marginBottom: "4px",
            }}
          >
            {runningServices.length}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            sur {activeServices.length} actifs
          </div>
        </div>

        <div
          className="glass"
          style={{ borderRadius: "16px", padding: "24px" }}
        >
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
            Compte
          </div>
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "4px",
            }}
          >
            {data.user?.role === "ADMIN" ? "Administrateur" : "Client"}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {data.user?.email}
          </div>
        </div>
      </div>

      {/* Services overview */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "var(--text-primary)",
          }}
        >
          Mes services
        </h2>
        <Link
          href="/dashboard/services"
          style={{
            fontSize: "0.85rem",
            color: "var(--red-bright)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Voir tout →
        </Link>
      </div>

      {data.services.length === 0 ? (
        <div
          className="glass"
          style={{
            borderRadius: "16px",
            padding: "48px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>📦</div>
          <p style={{ color: "var(--text-secondary)", marginBottom: "8px", fontWeight: 500 }}>
            Aucun service pour l&apos;instant
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Contactez le support pour activer votre premier serveur
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {data.services.slice(0, 5).map((service) => (
            <Link
              key={service.id}
              href={`/dashboard/services/${service.id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="glass"
                style={{
                  borderRadius: "14px",
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  transition: "border-color 0.2s, transform 0.15s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-red)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--glass-border)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateX(0)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: 0 }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      flexShrink: 0,
                    }}
                  >
                    {service.game === "minecraft" ? "⛏" : service.game === "csgo" ? "🎯" : service.game === "rust" ? "🏗" : "🎮"}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {service.name}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                      {service.game}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "24px", flexShrink: 0 }}>
                  {service.daemon && (
                    <>
                      <div style={{ textAlign: "right", display: "none" }} className="srv-stats">
                        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>RAM</div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                          {formatBytes(service.daemon.memoryBytes)}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>CPU</div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                          {service.daemon.cpu.toFixed(1)}%
                        </div>
                      </div>
                    </>
                  )}
                  <StateBadge state={service.daemon?.state ?? "offline"} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
