"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import NavbarLink from "./navbar-link";

interface NavbarItem {
    href: string;
    icon: React.ReactNode;
    label: string;
}

interface NavbarClientProps {
    title: string;
    links: NavbarItem[];
}

export default function NavbarClient({
    title,
    links,
}: NavbarClientProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Mobile menu button */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="
                        fixed
                        left-3
                        top-3
                        z-[10001]
                        flex
                        size-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        bg-background/95
                        shadow-lg
                        backdrop-blur
                        md:hidden
                    "
                    aria-label="Navigation öffnen"
                >
                    <Menu className="size-6" />
                </button>
            )}

            {/* Mobile backdrop */}
            {open && (
                <button
                    onClick={() => setOpen(false)}
                    className="
                        fixed
                        inset-0
                        z-[9998]
                        bg-black/40
                        md:hidden
                    "
                    aria-label="Navigation schließen"
                />
            )}

            <aside
                className={`
                    group
                    fixed
                    z-[10002]
                    overflow-hidden
                    border
                    bg-background/95
                    shadow-lg
                    backdrop-blur
                    transition-all
                    duration-200
                    ease-in-out

                    /* Desktop */
                    md:top-4
                    md:bottom-4
                    md:left-4
                    md:w-14
                    md:rounded-xl
                    md:hover:w-64

                    /* Mobile */
                    max-md:top-0
                    max-md:bottom-0
                    max-md:left-0
                    max-md:rounded-r-xl
                    max-md:w-[75vw]

                    ${
                        open
                            ? "max-md:translate-x-0"
                            : "max-md:-translate-x-full"
                    }
                `}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex h-14 shrink-0 items-center px-3">
                        <button
                            onClick={() => setOpen(false)}
                            className="flex size-8 shrink-0 items-center justify-center rounded-md hover:bg-accent"
                            aria-label="Navigation schließen"
                        >
                            <X className="size-6 md:hidden" />
                            <Menu className="hidden size-6 md:block" />
                        </button>

                        <span className="ml-4 whitespace-nowrap md:opacity-0 md:transition-opacity md:duration-150 md:group-hover:opacity-100">
                            {title}
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1 p-2">
                        {links.map((link) => (
                            <NavbarLink
                                key={link.href}
                                href={link.href}
                                icon={link.icon}
                            >
                                {link.label}
                            </NavbarLink>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
}