import { Menu, Ship, Map, Anchor } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export async function Navbar() {
    const t = await getTranslations();

    return (
        <aside className="group fixed top-4 bottom-4 left-4 z-[10000] w-14 overflow-hidden rounded-xl border bg-background/95 shadow-lg backdrop-blur transition-[width] duration-200 ease-in-out hover:w-64">
            <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex h-14 shrink-0 items-center px-3">
                    <Menu className="size-6 shrink-0" />

                    <span className="ml-4 whitespace-nowrap opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        Navigation
                    </span>
                </div>

                {/* Navigation */}
                <nav className="space-y-1 p-2">
                    <Link href="/">
                        <button className="flex w-full items-center rounded-md px-2 py-2 hover:bg-accent">
                            <Map className="size-5 shrink-0" />
                            <span className="ml-4 whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
                                {t("Navbar.Map")}
                            </span>
                        </button>
                    </Link>

                    <Link href="/vessels">
                        <button className="flex w-full items-center rounded-md px-2 py-2 hover:bg-accent">
                            <Ship className="size-5 shrink-0" />

                            <span className="ml-4 whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
                                {t("Navbar.Vessels")}
                            </span>
                        </button>
                    </Link>

                    <Link href="/ports">
                    <button className="flex w-full items-center rounded-md px-2 py-2 hover:bg-accent">
                        <Anchor className="size-5 shrink-0" />

                        <span className="ml-4 whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
                            {t("Navbar.Ports")}
                        </span>
                    </button>
                    </Link>
                </nav>
            </div>
        </aside>
    );
}
