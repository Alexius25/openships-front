import Link from "next/link";

interface NavbarLinkProps {
    href: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

export default function NavbarLink({
    href,
    icon,
    children,
}: NavbarLinkProps) {
    return (
        <Link
            href={href}
            className="flex w-full items-center rounded-md px-2 py-2 hover:bg-accent"
        >
            {icon}

            <span className="ml-4 whitespace-nowrap md:opacity-0 md:transition-opacity md:duration-150 md:group-hover:opacity-100">
                {children}
            </span>
        </Link>
    );
}