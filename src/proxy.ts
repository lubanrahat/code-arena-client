import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {

    
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
