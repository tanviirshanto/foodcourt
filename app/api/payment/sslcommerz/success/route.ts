import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Optionally: handle saving payment success info here
  return NextResponse.redirect(new URL("/payment/success", req.url));
}

export async function GET(req: NextRequest) {
  // Some gateways use GET redirection
  return NextResponse.redirect(new URL("/payment/success", req.url));
}
