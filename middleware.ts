import { NextRequest, NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {

  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin') {
      return NextResponse.next();
    }
  }

  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    return intlResponse;
  }

}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ]
}