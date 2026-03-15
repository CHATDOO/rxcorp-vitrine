// Client API Uptime Kuma — rxcorp
const UPTIME_ROOT = "http://192.168.1.93:3001/api/status-page";

export interface Monitor {
    id: number;
    name: string;
    type: string;
    status?: "operational" | "degraded" | "outage";
    latency?: string;
}

export interface Heartbeat {
    status: number;
    time: string;
    msg: string;
    ping: number;
}

export interface StatusPageData {
    config: {
        title: string;
        description: string;
    };
    publicGroupList: {
        id: number;
        name: string;
        monitorList: Monitor[];
    }[];
    heartbeatList: Record<string, Heartbeat[]>;
    uptimeList: Record<string, number>;
}

export async function getStatusData(): Promise<StatusPageData | null> {
    try {
        // Fetch status page config
        const resConfig = await fetch(`${UPTIME_ROOT}/default`, {
            next: { revalidate: 60 },
        });
        if (!resConfig.ok) throw new Error(`Uptime Config error: ${resConfig.status}`);
        const configData = await resConfig.json();

        // Fetch heartbeats
        const resHeartbeat = await fetch(`${UPTIME_ROOT}/heartbeat/default`, {
            next: { revalidate: 60 },
        });
        if (!resHeartbeat.ok) throw new Error(`Uptime Heartbeat error: ${resHeartbeat.status}`);
        const heartbeatData = await resHeartbeat.json();

        return {
            ...configData,
            ...heartbeatData
        };
    } catch (error) {
        console.error("Failed to fetch uptime data:", error);
        return null;
    }
}
