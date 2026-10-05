import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["192.168.0.137", "192.168.0.146"],
    experimental: {
        rootParams: true,
    },
    output: "standalone",
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
