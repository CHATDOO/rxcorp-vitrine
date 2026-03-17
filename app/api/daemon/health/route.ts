import { NextResponse } from "next/server";
import { getDaemonHealth } from "@/lib/daemon";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/daemon/health
 * Vérifie si le daemon RXCORP est en ligne.
 * Utilisé par la page statut et le dashboard admin.
 */
export async function GET() {
  const health = await getDaemonHealth();

  if (!health) {
    return NextResponse.json(
      { status: "offline", error: "Daemon unreachable" },
      { status: 503 }
    );
  }

  return NextResponse.json(health);
}
