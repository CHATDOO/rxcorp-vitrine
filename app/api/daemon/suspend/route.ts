import { NextRequest, NextResponse } from "next/server";
import { suspendServer, unsuspendServer } from "@/lib/daemon";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/daemon/suspend
 * Suspend ou lève la suspension d'un serveur.
 * Appelé automatiquement par le système de facturation RXCORP.
 *
 * Body: { uuid: string, action: "suspend" | "unsuspend" }
 *
 * SÉCURITÉ: Route interne uniquement (appels depuis /api/billing/webhooks).
 * Vérifier que l'appel provient bien du serveur Next.js (pas d'un client externe).
 */
export async function POST(req: NextRequest) {
  // Vérification token interne (à définir dans .env)
  const internalToken = req.headers.get("x-internal-token");
  if (internalToken !== process.env.RXCORP_INTERNAL_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  if (action !== "suspend" && action !== "unsuspend") {
    return NextResponse.json(
      { error: 'action must be "suspend" or "unsuspend"' },
      { status: 400 }
    );
  }

  const ok =
    action === "suspend"
      ? await suspendServer(uuid)
      : await unsuspendServer(uuid);

  if (!ok) {
    return NextResponse.json(
      { error: `Failed to ${action} server ${uuid}` },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, uuid, action });
}
