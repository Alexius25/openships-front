import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);

  response.headers.set('x-is-mobile', isMobile ? 'true' : 'false');

  return response;
}

export const config = {
    matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
