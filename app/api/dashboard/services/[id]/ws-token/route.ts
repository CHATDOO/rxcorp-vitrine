import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
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

  const daemonToken = process.env.RXCORP_DAEMON_TOKEN ?? "";
  const wsUrl = process.env.NEXT_PUBLIC_DAEMON_WS_URL ?? "ws://192.168.1.83:8080";

  return NextResponse.json({
    data: {
      wingsUuid: service.wingsUuid,
      wsUrl: `${wsUrl}/api/servers/${service.wingsUuid}/ws`,
      token: daemonToken,
    },
  });
}
