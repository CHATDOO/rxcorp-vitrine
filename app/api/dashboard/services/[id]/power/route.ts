import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendPowerAction } from "@/lib/daemon";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { id } = await params;

  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) {
    return NextResponse.json({ error: "Service introuvable" }, { status: 404 });
  }

  if (service.userId !== user.id) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  if (service.status !== "ACTIVE") {
    return NextResponse.json(
      { error: "Ce service n'est pas actif" },
      { status: 400 }
    );
  }

  const body = await request.json() as { action?: string };
  const action = body.action;

  if (!action || !["start", "stop", "restart", "kill"].includes(action)) {
    return NextResponse.json({ error: "Action invalide" }, { status: 400 });
  }

  try {
    await sendPowerAction(
      service.wingsUuid,
      action as "start" | "stop" | "restart" | "kill"
    );
    return NextResponse.json({ data: { success: true } });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur daemon";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
