// RXCORP Daemon client — intégration avec rxcorp-daemon (fork de Wings)
// Daemon: https://github.com/CHATDOO/rxcorp-daemon

const DAEMON_BASE = process.env.RXCORP_DAEMON_URL ?? "http://192.168.1.83:8080";
const DAEMON_TOKEN = process.env.RXCORP_DAEMON_TOKEN ?? "";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DaemonServer {
  uuid: string;
  state: "running" | "starting" | "stopping" | "offline";
  is_suspended: boolean;
  utilization: {
    cpu_absolute: number;
    memory_bytes: number;
    disk_bytes: number;
    uptime: number;
    network: {
      rx_bytes: number;
      tx_bytes: number;
    };
  };
  configuration: {
    egg: { id: number };
    pack: { id: number } | null;
  };
}

export interface DaemonHealth {
  daemon: string;
  version: string;
  timestamp: string;
  status: "ok" | "degraded";
}

export interface DaemonServerStatus {
  uuid: string;
  state: string;
  cpu_absolute: number;
  memory_bytes: number;
  disk_bytes: number;
  suspended: boolean;
}

export interface DaemonServersStatus {
  servers: DaemonServerStatus[];
  count: number;
}

// ─── Client interne ───────────────────────────────────────────────────────────

async function daemonFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${DAEMON_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${DAEMON_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.rxcorp.v1+json",
      ...options.headers,
    },
    // Pas de cache côté Next.js — données temps réel
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Daemon ${path} → HTTP ${res.status}: ${body}`);
  }

  return res.json();
}

// ─── API Standard Wings (compatible rxcorp-daemon) ───────────────────────────

/**
 * Récupère tous les serveurs du daemon.
 */
export async function getDaemonServers(): Promise<DaemonServer[]> {
  try {
    const data = await daemonFetch<{ object: string; data: DaemonServer[] }>(
      "/api/servers"
    );
    return data.data ?? [];
  } catch {
    return [];
  }
}

/**
 * Récupère un serveur spécifique par UUID.
 */
export async function getDaemonServer(uuid: string): Promise<DaemonServer | null> {
  try {
    return await daemonFetch<DaemonServer>(`/api/servers/${uuid}`);
  } catch {
    return null;
  }
}

/**
 * Envoie une action de puissance à un serveur.
 * @param uuid UUID du serveur
 * @param action start | stop | restart | kill
 */
export async function sendPowerAction(
  uuid: string,
  action: "start" | "stop" | "restart" | "kill"
): Promise<void> {
  await daemonFetch(`/api/servers/${uuid}/power`, {
    method: "POST",
    body: JSON.stringify({ action }),
  });
}

/**
 * Envoie une commande console à un serveur.
 */
export async function sendConsoleCommand(
  uuid: string,
  command: string
): Promise<void> {
  await daemonFetch(`/api/servers/${uuid}/commands`, {
    method: "POST",
    body: JSON.stringify({ command }),
  });
}

/**
 * Récupère les logs récents d'un serveur.
 */
export async function getServerLogs(
  uuid: string,
  lines = 100
): Promise<string> {
  try {
    const data = await daemonFetch<{ data: string }>(
      `/api/servers/${uuid}/logs?size=${lines}`
    );
    return data.data ?? "";
  } catch {
    return "";
  }
}

// ─── API Custom RXCORP ────────────────────────────────────────────────────────

/**
 * Vérifie si le daemon est en ligne.
 */
export async function getDaemonHealth(): Promise<DaemonHealth | null> {
  try {
    return await daemonFetch<DaemonHealth>("/api/rxcorp/health");
  } catch {
    return null;
  }
}

/**
 * Récupère le statut (CPU/RAM/disk/état) de tous les serveurs en une requête.
 * Utilisé pour le dashboard admin RXCORP.
 */
export async function getAllServersStatus(): Promise<DaemonServersStatus> {
  try {
    return await daemonFetch<DaemonServersStatus>("/api/rxcorp/servers/status");
  } catch {
    return { servers: [], count: 0 };
  }
}

/**
 * Suspend un serveur (appelé par la facturation quand une facture est impayée).
 * Arrête le serveur + empêche tout redémarrage.
 */
export async function suspendServer(uuid: string): Promise<boolean> {
  try {
    await daemonFetch(`/api/rxcorp/servers/${uuid}/suspend`, {
      method: "POST",
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Lève la suspension d'un serveur (appelé après paiement de la facture).
 */
export async function unsuspendServer(uuid: string): Promise<boolean> {
  try {
    await daemonFetch(`/api/rxcorp/servers/${uuid}/unsuspend`, {
      method: "POST",
    });
    return true;
  } catch {
    return false;
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Formate les bytes en string lisible (ex: 1.2 GB).
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Formate l'uptime en string lisible (ex: 2j 4h 30m).
 */
export function formatUptime(ms: number): string {
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (d > 0) return `${d}j ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

/**
 * Couleur d'état pour le badge UI.
 */
export function stateColor(state: string): "green" | "yellow" | "red" | "gray" {
  switch (state) {
    case "running": return "green";
    case "starting":
    case "stopping": return "yellow";
    case "offline": return "red";
    default: return "gray";
  }
}
