import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Background } from "@/components/Background";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Terminal } from "@/components/Terminal";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: `${site.name} — Healthtech builder & medical student`,
  description:
    "Portfolio of Snehangshu Roy: MBBS student at AIIMS Kalyani building assistive AI, health-data infrastructure and medical devices.",
  openGraph: {
    title: `${site.name} — Healthtech builder`,
    description: "Assistive AI, health-data infrastructure and medical devices.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Background />
        <Cursor />
        <Nav />
        {children}
        <Terminal />
      </body>
    </html>
  );
}
