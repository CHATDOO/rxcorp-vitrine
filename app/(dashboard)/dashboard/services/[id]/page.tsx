"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatBytes, formatUptime } from "@/lib/daemon";
import ServerConsole from "./console";

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
  createdAt: string;
  expiresAt: string | null;
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
        padding: "5px 14px",
        borderRadius: "99px",
        fontSize: "0.8rem",
        fontWeight: 700,
        color: s.color,
        background: s.bg,
        border: `1px solid ${s.border}`,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
      {labels[state] ?? state}
    </span>
  );
}

type Tab = "console" | "files";

export default function ServiceDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [tab, setTab] = useState<Tab>("console");

  const loadService = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard/services");
      const json = await res.json() as { data?: { services?: Service[] } };
      const found = json.data?.services?.find((s) => s.id === id) ?? null;
      setService(found);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void loadService();
    const interval = setInterval(loadService, 8000);
    return () => clearInterval(interval);
  }, [loadService]);

  async function handlePowerAction(action: PowerAction) {
    if (!service) return;
    setActionLoading(action);
    setFeedback("");

    try {
      const res = await fetch(`/api/dashboard/services/${id}/power`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const json = await res.json() as { data?: unknown; error?: string };

      if (!res.ok) {
        setFeedback(json.error ?? "Erreur");
      } else {
        setFeedback(`Action "${action}" envoyée avec succès`);
        setTimeout(() => {
          setFeedback("");
          void loadService();
        }, 2000);
      }
    } catch {
      setFeedback("Erreur réseau");
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div className="skeleton" style={{ height: "40px", width: "250px", borderRadius: "8px" }} />
        <div className="skeleton" style={{ height: "200px", borderRadius: "16px" }} />
      </div>
    );
  }

  if (!service) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0" }}>
        <p style={{ color: "var(--text-secondary)", marginBottom: "16px" }}>
          Service introuvable
        </p>
        <Link href="/dashboard/services" className="btn-ghost" style={{ fontSize: "0.875rem" }}>
          ← Retour aux services
        </Link>
      </div>
    );
  }

  const isRunning = service.daemon?.state === "running";
  const isOffline = !service.daemon || service.daemon.state === "offline";

  return (
    <div style={{ maxWidth: "900px" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <Link href="/dashboard" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
          Tableau de bord
        </Link>
        <span>›</span>
        <Link href="/dashboard/services" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
          Services
        </Link>
        <span>›</span>
        <span style={{ color: "var(--text-secondary)" }}>{service.name}</span>
      </div>

      {/* Service header */}
      <div
        className="glass"
        style={{ borderRadius: "16px", padding: "28px 28px", marginBottom: "20px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "1.6rem",
                letterSpacing: "-0.025em",
                color: "var(--text-primary)",
                marginBottom: "8px",
              }}
            >
              {service.name}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <StateBadge state={service.daemon?.state ?? "offline"} />
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  textTransform: "capitalize",
                  background: "var(--bg-subtle)",
                  padding: "3px 10px",
                  borderRadius: "99px",
                  border: "1px solid var(--border)",
                }}
              >
                {service.game}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        {service.daemon && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "12px",
            }}
          >
            {[
              {
                label: "CPU",
                value: `${service.daemon.cpu.toFixed(2)}%`,
                color: service.daemon.cpu > 80 ? "var(--red-bright)" : "var(--text-primary)",
              },
              {
                label: "RAM",
                value: formatBytes(service.daemon.memoryBytes),
                color: "var(--text-primary)",
              },
              {
                label: "Disque",
                value: formatBytes(service.daemon.diskBytes),
                color: "var(--text-primary)",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                style={{
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "14px 16px",
                }}
              >
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {label}
                </div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color }}>{value}</div>
              </div>
            ))}
            <div
              style={{
                background: "var(--bg-subtle)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "14px 16px",
              }}
            >
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Uptime
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {service.daemon.state === "running" ? formatUptime(0) : "—"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Power actions */}
      <div
        className="glass"
        style={{ borderRadius: "16px", padding: "20px 24px", marginBottom: "20px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {(
            [
              {
                action: "start" as PowerAction,
                label: "▶ Démarrer",
                disabled: isRunning,
                color: "#00E676",
                borderColor: "rgba(0,230,118,0.3)",
                bg: "rgba(0,230,118,0.08)",
              },
              {
                action: "stop" as PowerAction,
                label: "■ Arrêter",
                disabled: isOffline,
                color: "var(--red-bright)",
                borderColor: "rgba(255,23,68,0.3)",
                bg: "rgba(255,23,68,0.08)",
              },
              {
                action: "restart" as PowerAction,
                label: "↺ Redémarrer",
                disabled: isOffline,
                color: "#FFD700",
                borderColor: "rgba(255,215,0,0.3)",
                bg: "rgba(255,215,0,0.08)",
              },
              {
                action: "kill" as PowerAction,
                label: "✕ Forcer arrêt",
                disabled: isOffline,
                color: "var(--red-bright)",
                borderColor: "rgba(255,23,68,0.2)",
                bg: "transparent",
              },
            ] as const
          ).map(({ action, label, disabled, color, borderColor, bg }) => (
            <button
              key={action}
              onClick={() => void handlePowerAction(action)}
              disabled={!!actionLoading || disabled || service.status !== "ACTIVE"}
              style={{
                padding: "10px 18px",
                borderRadius: "10px",
                border: `1px solid ${borderColor}`,
                background: bg,
                color,
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: actionLoading || disabled ? "not-allowed" : "pointer",
                opacity: actionLoading || disabled ? 0.4 : 1,
                transition: "all 0.15s",
              }}
            >
              {actionLoading === action ? "..." : label}
            </button>
          ))}

          {feedback && (
            <span
              style={{
                fontSize: "0.8rem",
                color: feedback.includes("Erreur") ? "var(--red-bright)" : "#00E676",
              }}
            >
              {feedback}
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: "16px", display: "flex", gap: "4px" }}>
        {(["console", "files"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "8px 20px",
              borderRadius: "8px",
              border: tab === t ? "1px solid var(--border-red)" : "1px solid var(--border)",
              background: tab === t ? "rgba(232, 0, 45, 0.08)" : "transparent",
              color: tab === t ? "var(--red-bright)" : "var(--text-secondary)",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              textTransform: "capitalize",
              transition: "all 0.15s",
            }}
          >
            {t === "console" ? "Console" : "Fichiers"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "console" && <ServerConsole serviceId={id} />}
      {tab === "files" && (
        <div
          className="glass"
          style={{ borderRadius: "16px", padding: "48px 32px", textAlign: "center" }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>📁</div>
          <p style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
            Gestionnaire de fichiers
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "8px" }}>
            Fonctionnalité disponible prochainement
          </p>
        </div>
      )}
    </div>
  );
}
