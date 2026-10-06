import { Geist, Geist_Mono, Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import QueryClientProvider from "@/components/query-provider";
import { NextIntlClientProvider } from "next-intl";
import "flag-icons/css/flag-icons.min.css";
import Script from "next/script";

import { Navbar } from "@/components/navbar/navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn(
                "antialiased",
                fontMono.variable,
                "font-sans",
                inter.variable
            )}
        >
            <body>
                <Script src="/runtime-config.js" strategy="beforeInteractive" />
                <NextIntlClientProvider>
                    <ThemeProvider>
                        <QueryClientProvider>
                            <Navbar />
                            {children}
                        </QueryClientProvider>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
