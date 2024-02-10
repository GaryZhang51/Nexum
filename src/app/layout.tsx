import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import "./globals.scss";
import "@radix-ui/themes/styles.css";
import { AppContextProvider } from "@/components/AppContext";

const ibmPlexSans = IBM_Plex_Sans({
    weight: ["400", "600", "700"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Nexum",
    description: "Connections for the future",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={ibmPlexSans.className}>
                <AppContextProvider>
                    <Theme accentColor="teal">{children}</Theme>
                </AppContextProvider>
            </body>
        </html>
    );
}
