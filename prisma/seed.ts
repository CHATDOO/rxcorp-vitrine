import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import path from "node:path";

const dbPath = path.join(__dirname, "dev.db");
const adapter = new PrismaBetterSqlite3({ url: dbPath });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("Seeding database...");

  // Clean up
  await prisma.session.deleteMany();
  await prisma.service.deleteMany();
  await prisma.user.deleteMany();

  // Admin user
  const adminPassword = await bcrypt.hash("Admin123!", 12);
  const admin = await prisma.user.create({
    data: {
      email: "admin@rxcorp.fr",
      name: "Admin RXCORP",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  console.log("Created admin:", admin.email);

  // Test client
  const testPassword = await bcrypt.hash("Test123!", 12);
  const testUser = await prisma.user.create({
    data: {
      email: "test@rxcorp.fr",
      name: "Test Client",
      password: testPassword,
      role: "CLIENT",
    },
  });

  console.log("Created test user:", testUser.email);

  // Test service
  const service = await prisma.service.create({
    data: {
      name: "Serveur Minecraft Test",
      wingsUuid: "00000000-0000-0000-0000-000000000001",
      game: "minecraft",
      status: "ACTIVE",
      userId: testUser.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  console.log("Created test service:", service.name);
  console.log("\nSeed complete!");
  console.log("  Admin: admin@rxcorp.fr / Admin123!");
  console.log("  Client: test@rxcorp.fr / Test123!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
