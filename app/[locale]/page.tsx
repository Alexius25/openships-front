import type { Metadata } from "next";
import MainMap from "@/components/map/main-map";
import "map-gl-style-switcher/dist/map-gl-style-switcher.css";
import { getLocale, getTranslations } from "next-intl/server";

const BASE_URL = "https://openships.de";

const localeConfig = {
    de: {
        ogLocale: "de_DE",
    },
    en: {
        ogLocale: "en_US",
    },
} as const;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("Metadata");
    const locale = await getLocale();

    const config =
        localeConfig[locale as keyof typeof localeConfig] ??
        localeConfig.en;

    const url = `${BASE_URL}/${locale}`;

    return {
        title: t("title"),
        description: t("description"),

        openGraph: {
            type: "website",
            siteName: "OpenShips",
            title: t("title"),
            description: t("description"),
            url,
            locale: config.ogLocale,
            images: [
                {
                    url: `${BASE_URL}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: t("title"),
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
            images: [`${BASE_URL}/og-image.png`],
        },
    };
}

export default function Page() {
    return (
        <div className="h-dvh">
            <MainMap mode={{ type: "normal" }} />
        </div>
    );
}