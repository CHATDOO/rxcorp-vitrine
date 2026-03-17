import { NextRequest, NextResponse } from "next/server";
import { sendPowerAction } from "@/lib/daemon";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/daemon/power
 * Envoie une action de puissance à un serveur.
 *
 * Body: { uuid: string, action: "start" | "stop" | "restart" | "kill" }
 *
 * SÉCURITÉ: Cette route doit être appelée uniquement depuis les routes API
 * protégées du panel (vérification session + ownership du service).
 * Ne jamais exposer directement côté client.
 */
export async function POST(req: NextRequest) {
  let body: { uuid?: string; action?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { uuid, action } = body;

  if (!uuid || typeof uuid !== "string") {
    return NextResponse.json({ error: "Missing uuid" }, { status: 400 });
  }

  const validActions = ["start", "stop", "restart", "kill"] as const;
  if (!action || !validActions.includes(action as (typeof validActions)[number])) {
    return NextResponse.json(
      { error: `Invalid action. Must be one of: ${validActions.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    await sendPowerAction(uuid, action as (typeof validActions)[number]);
    return NextResponse.json({ success: true, uuid, action });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Daemon error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
