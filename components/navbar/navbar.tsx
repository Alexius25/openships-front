import { Ship, Map, Anchor } from "lucide-react";
import { getTranslations } from "next-intl/server";
import NavbarClient from "./navbar-client";

export async function Navbar() {
    const t = await getTranslations();

    const links = [
        {
            href: "/",
            icon: <Map className="size-5 shrink-0" />,
            label: t("Navbar.Map"),
        },
        {
            href: "/vessels",
            icon: <Ship className="size-5 shrink-0" />,
            label: t("Navbar.Vessels"),
        },
        {
            href: "/ports",
            icon: <Anchor className="size-5 shrink-0" />,
            label: t("Navbar.Ports"),
        },
    ];

    return (
        <NavbarClient
            title={t("Navbar.Navigation")}
            links={links}
        />
    );
}