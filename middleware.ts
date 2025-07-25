import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/utils/supabase/middleware";

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin") {
      return NextResponse.next();
    }
    if (req.url.includes("/admin")) {
      return await updateSession(req);
    }
  }

  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    return intlResponse;
  }
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
