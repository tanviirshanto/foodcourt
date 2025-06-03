import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // No DB updates here — IPN handles it
  return NextResponse.redirect(new URL("/payment/success", req.url));
}
