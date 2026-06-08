import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { authResult } = await req.json();
  
  const res = await fetch("https://api.minepi.com/v2/me", {
    headers: { Authorization: `Bearer ${authResult.accessToken}` },
  });
  
  if (!res.ok) return NextResponse.json({ error: "Auth failed" }, { status: 401 });
  
  const user = await res.json();
  return NextResponse.json({ user, success: true });
}
