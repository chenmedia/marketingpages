import { NextRequest, NextResponse } from "next/server";

// Norsk er standardspråk: rot-URL sendes til /no.
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/no", request.url));
}

export const config = {
  matcher: ["/"],
};
