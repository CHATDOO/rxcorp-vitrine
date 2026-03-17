import { NextResponse } from "next/server";
import { getAllServersStatus, getDaemonServers } from "@/lib/daemon";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/daemon/servers
 * Retourne tous les serveurs avec leur statut CPU/RAM/disk.
 * Utilisé par le dashboard admin RXCORP.
 *
 * Query params:
 *   ?full=true  → retourne la config complète (plus lent)
 *   ?full=false → retourne seulement status/ressources (défaut, rapide)
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const full = searchParams.get("full") === "true";

  if (full) {
    const servers = await getDaemonServers();
    return NextResponse.json({ servers, count: servers.length });
  }

  const data = await getAllServersStatus();
  return NextResponse.json(data);
}
