import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return;
  }

  if (pathname.startsWith("/en") || pathname.startsWith("/id")) {
    return;
  }

  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname}`;

  return NextResponse.redirect(url);
}
