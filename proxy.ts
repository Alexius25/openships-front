import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";
import { isMobileUserAgent } from "./lib/device";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const response = intlMiddleware(request);

  const userAgent = request.headers.get("user-agent") ?? "";
  const isMobile = isMobileUserAgent(userAgent);

  response.headers.set("x-is-mobile", String(isMobile));

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};