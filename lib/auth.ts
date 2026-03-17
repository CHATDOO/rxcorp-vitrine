import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET ?? "rxcorp-secret-change-in-prod";
const SESSION_DURATION_DAYS = 30;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: string): Promise<string> {
  const token = jwt.sign({ userId, iat: Date.now() }, JWT_SECRET, {
    expiresIn: `${SESSION_DURATION_DAYS}d`,
  });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS);

  await prisma.session.create({
    data: { userId, token, expiresAt },
  });

  return token;
}

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export async function getSession(token: string): Promise<SessionUser | null> {
  try {
    jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } });
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role,
  };
}

export async function requireAuth(
  request: NextRequest
): Promise<SessionUser | null> {
  const token = request.cookies.get("rxcorp_session")?.value;
  if (!token) return null;
  return getSession(token);
}

export async function deleteSession(token: string): Promise<void> {
  await prisma.session.deleteMany({ where: { token } });
}
