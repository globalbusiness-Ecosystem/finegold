import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, { params }: { params: Promise<{ paymentId: string }> }) {
  const { paymentId } = await params;
  const res = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
    method: "POST",
    headers: { "Authorization": `Key ${process.env.PI_API_KEY}`, "Content-Type": "application/json" },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
