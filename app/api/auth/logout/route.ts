import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("rxcorp_session")?.value;
    if (token) {
      await deleteSession(token);
    }

    const response = NextResponse.json({ data: { success: true } });
    response.cookies.set("rxcorp_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
