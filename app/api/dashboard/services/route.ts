import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAllServersStatus } from "@/lib/daemon";

export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const services = await prisma.service.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const daemonStatus = await getAllServersStatus();
  const statusMap = new Map(
    daemonStatus.servers.map((s) => [s.uuid, s])
  );

  const servicesWithStatus = services.map((service) => {
    const daemonInfo = statusMap.get(service.wingsUuid);
    return {
      id: service.id,
      name: service.name,
      game: service.game,
      status: service.status,
      wingsUuid: service.wingsUuid,
      createdAt: service.createdAt,
      expiresAt: service.expiresAt,
      daemon: daemonInfo
        ? {
            state: daemonInfo.state,
            cpu: daemonInfo.cpu_absolute,
            memoryBytes: daemonInfo.memory_bytes,
            diskBytes: daemonInfo.disk_bytes,
            suspended: daemonInfo.suspended,
          }
        : null,
    };
  });

  return NextResponse.json({ data: { services: servicesWithStatus } });
}
