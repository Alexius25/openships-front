export function isMobileUserAgent(userAgent: string): boolean {
  return /mobile|android|iphone|ipad|phone/i.test(userAgent);
}